import { JSX } from "react";
import { CasinoGameStates } from "./gameData";

export enum UserRoles {
    Admin = 0x1,
    User = 0x2,
}


export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRoles;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
    UserRoles: UserRoles;
    casinoRollChance: number;
}

export interface iCartWishlist {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    type: "CART" | "WISHLIST";
}
export interface IReview {
    id: number;
    review: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    product_id: number;
    UserId: number;
    type: "ALCOHOL" | "CAR" | "SITE";
    name: string;
}

export interface IProduct {
    product_id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    CarDetailsId?: number;
    AlcoholDetailsId?: number;
}

export interface ICarDetails {
    id: number;
    carMake: string;
    carModel: string;
    carYear: number;
    carMileage: number;
    createdAt: Date;
    updatedAt: Date;
    productId: number;
    productDetails: IProduct;
}

export interface IAlcoholDetails {
    id: number;
    alcoholType: string;
    alcoholBrand: string;
    alcoholVolume: number;
    alcoholYear: number;
    createdAt: Date;
    updatedAt: Date;
    product_id: number;
    productDetails: IProduct;
}








/*+++
Casino game interface
---*/

export enum CasinoGameCategory {
    Slot = "Slot",
    Blackjack = "Blackjack",
    Roulette = "Roulette",
    CaseOpening = "Cases",
    SportBetting = "Sport games",
    Lotto = "Lottery"
}

export interface SoundEffect {
    Roll: string;           // Roll sound effect url
    Win: string;            // Win sound effect url
    Lose: string;           // Lose sound effect url
}

export interface CasinoGame {
    name: string;                   // Game name
    description: string;            // Description of the game
    slug: string;                   // Slug of the game
    image: string;                  // Image url
    category: CasinoGameCategory;   // Category of the game
    SlotGameData?: ISlotGame;       // Slot game data, not required
    // Add more game data here
    SoundEffects: SoundEffect;      // Sound effects for the game

    MasterElement: ({props}: 
        SlotGameProps |             // Add more game props here 
        any
    ) => JSX.Element;
}

/*+++
Slot game data
---*/
export interface SlotGameProps {
    props: {
        setState: (state: CasinoGameStates) => void;
        gameData: ISlotGame;
        casinoGame: CasinoGame;
    }
}
export interface ISlotGameImages {
    url: string,        // Image url
    multiplier: number, // Bet multiplier
    imageId:number,     // CANNOT BE 0
    chance: number,     // Chance of getting this image. 0.0 - 1.0
}
export interface ISlotGame {
    marginOfError: number;
    grid: number[][];       // Grid of the slot game
    empty_grid: number[][]; // Empty grid of the slot game
    images: ISlotGameImages[]; // Images of the slot game
}