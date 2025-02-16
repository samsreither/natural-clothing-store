import { IProduct } from "../../models/interfaces"


interface Props {
    product: IProduct
}

export const Product = (props: Props) => {
    const {_id, productName, price, description, imageURL, stockQuantity} = props.product;


    return (
        <div className="product">
            <img src={imageURL} alt={productName} />
            <div className="description">
                <h3>{productName}</h3>
                <p>{description}</p>
                <p>{price}</p>
            </div>

            <div className="stock-quantity">
                {stockQuantity}
            </div>
        </div>
    )
}