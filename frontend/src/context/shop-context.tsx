import { createContext, useState, useEffect } from "react";


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