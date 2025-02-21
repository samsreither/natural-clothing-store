import { useContext } from "react";
import { ShopContext, IShopContext } from "../../context/shop-context";

export const PurchasedItemsPage = () => {
    const { purchasedItems, addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);

    return (
        <div className="purchased-items-page">
            <h1> Previously Purchased Items </h1>
            <div className="purchased-items">

            </div>
        </div>
    )
}