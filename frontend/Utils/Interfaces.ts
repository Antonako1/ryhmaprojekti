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
}

export interface iCartWishlist {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface IReview {
    id: number;
    review: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    product_id: number;
    UserId: number;
    type: "alcohol" | "car";
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

export interface ICarDetails extends IProduct {
    id: number;
    carMake: string;
    carModel: string;
    carYear: number;
    carMileage: number;
    createdAt: Date;
    updatedAt: Date;
    productId: number;
}

export interface IAlcoholDetails extends IProduct {
    id: number;
    alcoholType: string;
    alcoholBrand: string;
    alcoholVolume: number;
    alcoholYear: number;
    createdAt: Date;
    updatedAt: Date;
    product_id: number;
}