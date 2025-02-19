import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetProducts } from "../hooks/useGetProducts";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IProduct } from "../models/interfaces";


export interface IShopContext {
    addToCart: (itemID: string) => void;
    removeFromCart: (itemID: string) => void;
    updateCartItemCount: (newAmount: number, itemId: string) => void;
    getCartItemCount: (itemId: string) => number;
    getTotalCartAmount: () => number;
    checkout: () => void;
    availableMoney: number;
    purchasedItems: IProduct[];
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const defaultVal: IShopContext = {
    addToCart: () => null,
    removeFromCart: () => null,
    updateCartItemCount: () => null,
    getCartItemCount: () => 0,
    getTotalCartAmount: () => 0,
    checkout: () => null,
    availableMoney: 0,
    purchasedItems: [],
    isAuthenticated: false,
    setIsAuthenticated: () => null,
  };

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

    const fetchAvailableMoney = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/user/available-money/${localStorage.getItem("userID")}`, { headers });
            setAvailableMoney(res.data.availableMoney);
        } catch (err) {
            alert ("ERROR: Something went wrong.")
        }
    }

    const fetchPurchasedItems = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/products/purchased-items${localStorage.getItem("userID")}`, { headers });
            setPurchasedItems(res.data.purchasedItems);
        } catch (err) {
            alert ("ERROR: Something went wrong")
        }
    }

    // get the amount of an item in the cart
    const getCartItemCount = (itemId: string): number => {
        if (itemId in cartItems) {
            return cartItems[itemId];
        }

        return 0;
    }

    const addToCart = (itemId: string) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1 }))
        }
        else {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
            console.log('trying to add to cart')
        }
    }

    const removeFromCart = (itemId: string) => {
        if (!cartItems[itemId]) return;
        if (cartItems[itemId] == 0) return;
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1}))
    }

    const updateCartItemCount = (newAmount: number, itemId: string) => {
        if (newAmount < 0) return;
        setCartItems((prev) => ({...prev, [itemId]: newAmount}));
    }

    const getTotalCartAmount = ():number => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo: IProduct = products.find(
                    (product) => product._id === item
                );

                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }

    const checkout = async () => {
        const body = { customerID: localStorage.getItem("userID"), cartItems}
        try {
            await axios.post("http://localhost:3001/products/checkout", body, { headers })
        
        setCartItems({});
        fetchAvailableMoney();
        fetchPurchasedItems();
        navigate("/");
    } catch (err) {
        console.log(err);
    }}

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.clear();
            setCookies("access_token", null);
        }
    }, [isAuthenticated])

    // pass all these values to children
    const contextValue: IShopContext = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getCartItemCount,
        getTotalCartAmount,
        checkout,
        availableMoney,
        purchasedItems,
        isAuthenticated,
        setIsAuthenticated,
      };



    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )}