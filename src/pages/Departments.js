import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";

export function Departments(){

    const navigate = useNavigate();
    const {inventory} = useContext(InventoryContext); 

    const [departments, setDepartments] = useState([]);

    const getDepartments = () => {
        const allDepartments = inventory.map((x) => x.department);
        const uniqueDepartments = allDepartments.filter((x, i) => allDepartments.indexOf(x) === i);
        setDepartments(uniqueDepartments);
    }

    useEffect(()=>{
        getDepartments();
    }, [])

    return(
        <div className="row p-5">{departments && departments.map((x) => {
            return(
                <div class="card m-auto mt-auto cursor-pointer" style={{width: "18rem"}} key={x} onClick={() => navigate(`/products/${x.toLowerCase()}`)}>
                <div class="card-body text-center bg-light">
                    <h2 class="card-title">{x}</h2>
                </div>
            </div>
            )
        })}</div>
    )
}