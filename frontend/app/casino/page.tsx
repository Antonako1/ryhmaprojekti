'use client'

import { casinoGames, CasinoGameStates, DefaultCasinoGameState } from "@/Utils/gameData";
import { CasinoGame } from "@/Utils/Interfaces";
import { useState } from "react";

const HomeElement = () => {
    return(
        <h1>Welcome to Alc & Autos casino!</h1>
    )
}

const CasinoPage = () => {
    const [gameState, setGameState] = useState<CasinoGameStates>(DefaultCasinoGameState);
    const [activeGame, setActiveGame] = useState<CasinoGame | null>(null);
    const [error, setError] = useState<string | null>(null);


    const startGame = (game: CasinoGame) => {
        setGameState(CasinoGameStates.Loading);
        setActiveGame(game);
    }

    switch (gameState) {
        case CasinoGameStates.Loading:
            if(!activeGame) {
                setGameState(CasinoGameStates.Error);
                setError("Game not found");
            }

            setGameState(CasinoGameStates.Idle);
            return (
                <div>Loading...</div>
            )
        case CasinoGameStates.Error:
            return (
                <div>
                    <p>
                        {error}
                    </p>
                    <button onClick={() => setGameState(CasinoGameStates.ShowMain)}>    
                        Go back to home
                    </button>
                </div>
            )
        case CasinoGameStates.Idle:
            if(
                !activeGame 
                || 
                !activeGame.SlotGameData
            ) {
                console.error("Active game:", activeGame);
                console.error("Slot game:", activeGame?.SlotGameData);
                setError("Game not found");
                setGameState(CasinoGameStates.Error);
                break;
            }
            return (
                <activeGame.MasterElement 
                    props={{
                        setState: setGameState,
                        gameData: activeGame.SlotGameData,
                        casinoGame: activeGame
                    }}
                />
            );      
        case CasinoGameStates.Shutdown:
        default:
        case CasinoGameStates.ShowMain:
            return(
                <div>
                    <HomeElement />
                    <div
                    style={{display: "flex", flexWrap: "wrap"}}
                    >
                        {casinoGames.map((game) => (
                            <div 
                            key={game.slug}
                            style={{border: "1px solid black", padding: "1rem", margin: "1rem"}}
                            >
                                <h2>{game.name}</h2>
                                <p>{game.description}</p>
                                <button onClick={() => startGame(game)}>Play</button>
                            </div>
                        ))}
                    </div>
                </div>
            )
    }
}

export default CasinoPage;