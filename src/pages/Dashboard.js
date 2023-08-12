import { useContext, useState } from "react"
import { InventoryContext } from "../context/InventoryContext";

export function Dashboard(){

    const {inventory} = useContext(InventoryContext); 

    return(
        <div className="row p-3">
            <div class="card m-auto mt-auto" style={{width: "18rem"}}>
                <div class="card-body text-center bg-light">
                    <h2 class="card-title text-success">{inventory.reduce((totalStocks, stock) => totalStocks + stock.stock, 0)}</h2>
                    <h5>Total Stock</h5>

                </div>
            </div>
            <div class="card m-auto" style={{width: "18rem"}}>
                <div class="card-body text-center bg-light">
                    <h2 class="card-title text-warning">{inventory.reduce((totalDelivered, stock) => totalDelivered + stock.delivered, 0)}</h2>
                    <h5>Total Stock</h5>

                </div>
            </div>
            <div class="card m-auto" style={{width: "18rem"}}>
                <div class="card-body text-center bg-light">
                    <h2 class="card-title text-danger">{inventory.filter((stock) => stock.stock <= 10).length}</h2>
                    <h5>Total Stock</h5>

                </div>
            </div>
        </div>
    )
}