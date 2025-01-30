"use client";

import { server } from "@/Utils/consts";
import { useAuth } from "@/Utils/context/contextUser";
import { CasinoGameStates } from "@/Utils/gameData";
import { ISlotGame, ISlotGameImages, SlotGameProps } from "@/Utils/Interfaces";
import { useState, useRef, useEffect } from "react";

const SlotGame = ({ props }: SlotGameProps) => {
    const { gameData, casinoGame } = props;
    const [innerState, setInnerState] = useState<CasinoGameStates>(CasinoGameStates.Idle);
    const [bet, setBet] = useState<string>("");
    const [gridState, setGridState] = useState<number[][]>(gameData.grid);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const { user, authenticated, setUser, token } = useAuth();  
    const [winText, setWinText] = useState<string>("");
    const rollAudioRef = useRef<HTMLAudioElement | null>(null);
    const winAudioRef = useRef<HTMLAudioElement | null>(null);
    const loseAudioRef = useRef<HTMLAudioElement | null>(null);
    
    if (!authenticated) return <p>Not logged in!</p>;
    if (!casinoGame || !gameData) {
        return <p>Game data is missing</p>;
    }

    const RollImage = (Images: ISlotGameImages[]): number => {
        let SortedImages = Images.sort((a, b) => a.chance - b.chance);
    
        const randomChance = Math.round(Math.random() * 10) / 10;
        const MarginOfError = gameData.marginOfError;
    
        const rollChance = user?.casinoRollChance === undefined ? 0.6 : user.casinoRollChance;
        const rollChanceCalculated = Math.min(randomChance * rollChance, 1);
    
        const lowerBound = Math.max(0, rollChanceCalculated - MarginOfError);
        const upperBound = Math.min(1, rollChanceCalculated + MarginOfError);
    
        const selectedImage = SortedImages.find((image) => 
            image.chance >= lowerBound && image.chance <= upperBound
        );
    
        const fallbackImage = SortedImages.reduce((prev, current) =>
            prev.chance > current.chance ? prev : current
        );
    
        return selectedImage ? selectedImage.imageId : fallbackImage.imageId;
    };

    const handleTopAndBottomRow = () => {
        let topRow: number[] = gridState[0];
        let bottomRow: number[] = gridState[gridState.length - 1];
        
        setGridState((prevGrid) => prevGrid.slice(0, -1));
        setGridState((prevGrid) => [[...gameData.empty_grid[0]], ...prevGrid]);
        
        const newTopRow: number[] = topRow.map(() => RollImage(gameData.images));
        setGridState((prevGrid) => [newTopRow, ...prevGrid.slice(1)]);
    }

    const handleSpin = () => {  
        if (isSpinning) return; 

        setIsSpinning(true);
        setInnerState(CasinoGameStates.Rolling);

        // Play roll sound effect
        if (casinoGame.SoundEffects?.Roll) {
            if (rollAudioRef.current) {
                rollAudioRef.current.pause(); // Pause the previous audio if any
                rollAudioRef.current.currentTime = 0; // Reset audio time
            }
            rollAudioRef.current = new Audio(casinoGame.SoundEffects.Roll);
            rollAudioRef.current.loop = true;
            rollAudioRef.current.play();
        }
        
        setGridState(gameData.empty_grid);

        const rollingInterval = setInterval(() => {
            setGridState((prevGrid) =>
                prevGrid.map((row) =>
                    row.map(() => Math.floor(Math.random() * gameData.images.length + 1))
                )
            );
            handleTopAndBottomRow();
        }, 100);
        
        setGridState(gameData.empty_grid);
        
        setTimeout(() => {
            clearInterval(rollingInterval);
            for (let i = 0; i < gridState.length; i++) {
                handleTopAndBottomRow();
            }

            setIsSpinning(false);
            setInnerState(CasinoGameStates.CalculateWin);

            // Stop roll sound effect after the spin completes
            if (rollAudioRef.current) {
                rollAudioRef.current.pause();
                rollAudioRef.current.currentTime = 0; // Reset audio
            }
        }, 2000);
    };

    

useEffect(() => {
    if (innerState === CasinoGameStates.CalculateWin) {
        if(!user || !user.balance) return;
        if (isNaN(Number(bet))) {
            alert("Please enter a valid number for the bet!");
            return;
        }

        let winLines: { imageId: number; line: number }[] = [];
        let totalWin = 0;

        for (let k = 0; k < gameData.images.length; k++) {
            const currentId = gameData.images[k].imageId;
            const imageValue = Number(bet);
            let won_this_image: boolean = false;
            for (let i = 0; i < gridState.length; i++) {
                const row = gridState[i];
                if (row.every((cell) => cell === currentId)) {
                    winLines.push({ imageId: currentId, line: i });
                    totalWin += imageValue;
                    won_this_image = true;
                }
            }
            
            for (let j = 0; j < gridState[0].length; j++) {
                if (gridState.every((row) => row[j] === currentId)) {
                    winLines.push({ imageId: currentId, line: j });
                    totalWin += imageValue;
                    won_this_image = true;
                }
            }
            if(won_this_image) totalWin *= (gameData.images[k].multiplier * 10)
        }
        
        if (winLines.length > 0) {
            setWinText(`You won ${totalWin}!`);                
            setTimeout(() => {
                // Play win sound
                if (casinoGame.SoundEffects?.Win) {
                    if (winAudioRef.current) {
                        winAudioRef.current.pause();
                        winAudioRef.current.currentTime = 0;
                    }
                    winAudioRef.current = new Audio(casinoGame.SoundEffects.Win);
                    winAudioRef.current.play();
                }
            }, 500);
            //@ts-ignore
            setUser({ ...user, balance: user.balance + totalWin });
        } else {
            // Play lose sound
            if (casinoGame.SoundEffects?.Lose) {
                if (loseAudioRef.current) {
                    loseAudioRef.current.pause();
                    loseAudioRef.current.currentTime = 0;
                }
                loseAudioRef.current = new Audio(casinoGame.SoundEffects.Lose);
                loseAudioRef.current.play();
            }
            setWinText("You lost!");
            //@ts-ignore
            setUser({ ...user, balance: user.balance - Number(bet) });
        }
        fetch(`${server}/api/update-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        })
        .then(async (res) => await res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));

        setInnerState(CasinoGameStates.Idle);
    }
}, [innerState]);

    
    
    
    return (
        <div>
            <h1>{casinoGame.name}</h1>
            <p>{casinoGame.description}</p>


            <div>
                <table>
                    <tbody>
                        {gridState.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} style={{ width: "100px", height: "100px", overflow: "hidden", border: "1px solid #ccc", position: "relative" }}>
                                        <img
                                            src={casinoGame.SlotGameData?.images.find((image) => image.imageId === cell)?.url || undefined}
                                            alt="Slot"
                                            style={{ width: "100%", height: "100%", animation: isSpinning ? "spin 0.1s linear infinite" : "none" }}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p
            style={{
                animation: winText ? "fadeScale 1.5s ease-in-out" : "none",
                fontSize: "24px",
                fontWeight: "bold",
                color: "gold",
                textShadow: "0px 0px 10px rgba(255, 215, 0, 0.8)",
                textAlign: "center",
                marginTop: "10px",
            }}
        >
            {winText}
        </p>
            <div style={{ marginTop: "1rem", marginBottom: "1rem", gap: "1rem", display: "flex", alignItems: "center" }}>
                <label htmlFor="bet">Bet:</label>
                <input
                    id="bet"
                    type="text"
                    value={String(bet)}
                    onChange={(e) => setBet(e.target.value)}
                />
                <button onClick={handleSpin} disabled={isSpinning}>
                    {isSpinning ? "Spinning..." : "Spin"}
                </button>
            </div>
        </div>
    );
};

export default SlotGame;
