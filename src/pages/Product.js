import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    }, [])

    return(
        <div><h1>{product.name}</h1>
            <img className="big-image" src={product.imageUrl}></img>

        </div>
    )
}