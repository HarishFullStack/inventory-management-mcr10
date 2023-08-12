import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";

export function Product(){
    const {productId} = useParams();
    const {inventory} = useContext(InventoryContext); 

    const [product, setProduct] = useState({});

    const getProductsById = () => {
        const selectedProduct = inventory.find((product) => product.id === Number(productId));
        setProduct(selectedProduct);
    }

    useEffect(() => {
        getProductsById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="mt-5 px-5"><h1>{product.name}</h1>
            <img className="big-image" src={product.imageUrl} alt="not found"></img>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Supplier: {product.supplier}</p>
            <p>Department: {product.department}</p>
            <p>SKU: {product.stock}</p>
            <p>Delivered: {product.delivered}</p>
            <p>Description: {product.description}</p>
        </div>
    )
}