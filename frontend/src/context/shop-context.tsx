import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetProducts } from "../hooks/useGetProducts";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IProduct } from "../models/interfaces";


export interace IShopContext {
    addToCart: (itemID: string) => void;
    removeFromCart: (itemID: string) => void;
    updateCartItemCount: (newAmount: number, itemId: string) => void;
    getTotalCartAmount: () => number;
    checkout: () => void;
    availableMoney: number;
    purchasedItems: IProduct[];
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
    const [availableMoney, setAvailableMoney] = useState<number>(0);
    const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(cookies.access_token !== null);

    const { products } = useGetProducts();
    const { headers } = useGetToken();
    const navigate = useNavigate();

    const fetchAvailableMoney = () => {
        try {

        } catch (err) {

        }
    }

    const fetchPurchasedItems = () => {
        try {

        } catch (err) {

        }
    }

    const getCartItemCount = () => {

    }

    const addToCart = () => {

    }

    const removeFromCart = () => {

    }

    const updateCartItemCount = () => {

    }

    const getTotalCartAmount = () => {

    }

    const checkout = () => {

    }

    return (
        <ShopContext.Provider>
            {props.children}
        </ShopContext.Provider>
    )
}