// custom hook to get the products from mongo db
import axios from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "../models/interfaces";
import { useGetToken } from "./useGetToken"

export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { headers } = useGetToken();

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get("http://localhost:3001/products", {
                headers,
            });
            setProducts(fetchedProducts.data.products);
        } catch (err) {
            alert("Error. Something went wrong.")
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products }
}