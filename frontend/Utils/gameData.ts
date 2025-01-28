/* 
Slotti
Blackjack
Ruletti
Case openingit
Sporttipelit
Lotto
*/

import SlotGame from "@/casino_games/SlotGame/SlotGame";
import { CasinoGame, CasinoGameCategory } from "./Interfaces";

export enum CasinoGameStates {
    Idle = "Idle",
    Loading = "Loading",
    Error = "Error",
    Shutdown = "Shutdown",
    ShowMain = "ShowMain",
    SpinAction = "SpinAction",
    Rolling = "Rolling",
}

export const DefaultCasinoGameState:CasinoGameStates = CasinoGameStates.ShowMain;



/*+++

ImageID laitetaan nollan tilalle

---*/
export const SlotGrid_3X3:number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

export const SlotGrid_4X4:number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]

export const SlotGrid_5X5:number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
]

export const casinoGames:CasinoGame[] = [
    {
        name: "Slot",
        category: CasinoGameCategory.Slot,
        description: "Slot game",
        slug: "slot_game",
        image: "",
        MasterElement: SlotGame,
        SoundEffects: {
            Roll: "/shuffle-cards-46455.mp3",
            Win: "",
            BigWin: "",
            MegaWin: "",
            Lose: "",
        },
        SlotGameData: {
            marginOfError: 0.15,
            grid: SlotGrid_5X5,
            empty_grid: SlotGrid_5X5,
            images: [
                {
                    // Spades
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/01_of_spades_A.svg/1200px-01_of_spades_A.svg.png",
                    multiplier: 2,
                    imageId: 1,
                    chance: 0.7, // 0.0 - 1.0
                },
                {
                    // King
                    url: "https://static.wikia.nocookie.net/aliceinborderland/images/4/4c/King_of_Hearts.png",
                    multiplier: 0.1,
                    imageId: 2,
                    chance: 0.4, // 0.0 - 1.0
                },
                {
                    // 2
                    url: "https://static.wikia.nocookie.net/aliceinborderland/images/a/a7/Two_of_Hearts.png",
                    multiplier: 1.3,
                    imageId: 3,
                    chance: 0.2, // 0.0 - 1.0
                },
                {
                    url: "https://media.istockphoto.com/id/543347592/vector/why-god-why-emoticon.jpg?s=612x612&w=0&k=20&c=gukkiZ3mBsm4qWZaZu_KLbwFhWdteeME0cLoEbo4yMw=",
                    multiplier: 0,
                    imageId: 4,
                    chance: 0
                }
            ],
        }
    }
]