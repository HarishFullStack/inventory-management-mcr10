import { createContext, useState } from "react";
import { inventoryData } from "../db/inventoryData";

export const InventoryContext = createContext();

export function InventoryProvider({children}){

    const [inventory, setInventory] = useState(inventoryData);

    const addProduct = (product) => {
        setInventory([...inventory, product]);
        console.log(inventory)
    }

    return(
        <InventoryContext.Provider value={{inventory, addProduct}}>{children}</InventoryContext.Provider>
    )
}