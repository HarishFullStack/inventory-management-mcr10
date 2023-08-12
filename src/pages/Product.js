import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";

export function Product(){
    const {productId} = useParams();
    const {inventory} = useContext(InventoryContext); 

    const [product, setProduct] = useState({});

    const getProductsById = () => {
        const product = inventory.filter((product) => product.id === Number(productId));
        setProduct(product);
    }

    useEffect(() => {
        getProductsById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div><h1>{product.name}</h1>
            <img className="big-image" src={product.imageUrl} alt="not found"></img>

        </div>
    )
}