// custom hook to get the products from mongo db
import axios from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "../models/interfaces";

export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([])

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get("http://localhost:3001/products");
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