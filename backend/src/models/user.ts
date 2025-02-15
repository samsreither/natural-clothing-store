import {Schema, model} from "mongoose";

export interface IUser {
    _id?: string;
    username: string;
    password: string;
    availableMoney: number;
    // purchasedItems: string[];
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        availableMoney: {
            type: Number, 
            default: 5000,
        },
        // purchasedItems: {
        //     type: Array,

        // }
    }
)

export const UserModel = model<IUser>("user", UserSchema);