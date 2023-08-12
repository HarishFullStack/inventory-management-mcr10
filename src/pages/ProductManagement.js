import { useContext, useEffect, useReducer, useState } from "react";
import { InventoryContext } from "../context/InventoryContext";

export function ProductManagement(){

    const {inventory, addProduct} = useContext(InventoryContext);

    const [departments, setDepartments] = useState(0);

    const getDepartments = () => {
        const allDepartments = inventory.map((x) => x.department);
        const uniqueDepartments = allDepartments.filter((x, i) => allDepartments.indexOf(x) === i);
        setDepartments(uniqueDepartments);
    }

    useEffect(()=>{
        getDepartments();
    }, [])

    const reducer = (state, action) => {
        switch(action.type){
            case "DEPARTMENT":
                return {...state, department: action.value}
            case "NAME":
                return {...state, name: action.value}
            case "DESCRIPTION":
                return {...state, description: action.value}
            case "PRICE":
                return {...state, price: Number(action.value)}
            case "STOCK":
                return {...state, stock: Number(action.value)}
            case "SKU":
                return {...state, sku: action.value}
            case "SUPPLIER":
                return {...state, supplier: action.value}
            case "DELIVERED":
                return {...state, delivered: Number(action.value)}
            case "IMAGE":
                return {...state, imageUrl: action.value}
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        id: 0,
        department: '',
        name: '',
        description:
            '',
        price: 0,
        stock: 0,
        sku: '',
        supplier: '',
        delivered: 0,
        imageUrl: ''
    });

    const handleAddProduct = () => {
        console.log({...state, id: inventory.length + 1});
        addProduct({...state, id: inventory.length + 1});
        console.log(inventory);
    }


    return(
        <div>
            <h1>Add New Product</h1>
            <div className="col-sm-12 col-md-4 col-lg-4 col-12">
                <div className="form-floating mb-3">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(event) => dispatch({ type: "DEPARTMENT", value: event.target.value})}>
                        <option selected>Select Department</option>
                        {
                            departments && departments.map((x) => {
                                return(
                                    <option key={x} value={x}>{x}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="floatingSelect">Department</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" placeholder="Name" onChange={(event) => dispatch({ type: "NAME", value: event.target.value})}/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="description" rows={6} placeholder="Description" onChange={(event) => dispatch({ type: "DESCRIPTION", value: event.target.value})}/>
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="price" placeholder="Price" onChange={(event) => dispatch({ type: "PRICE", value: event.target.value})}/>
                    <label htmlFor="price">Price</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="stock" placeholder="Stock" onChange={(event) => dispatch({ type: "STOCK", value: event.target.value})}/>
                    <label htmlFor="stock">Stock</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="sku" placeholder="SKU" onChange={(event) => dispatch({ type: "SKU", value: event.target.value})}/>
                    <label htmlFor="sku">SKU</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="supplier" placeholder="Supplier" onChange={(event) => dispatch({ type: "SUPPLIER", value: event.target.value})}/>
                    <label htmlFor="supplier">Supplier</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="delivered" placeholder="Delivered" onChange={(event) => dispatch({ type: "DELIVERED", value: event.target.value})}/>
                    <label htmlFor="delivered">Delivered</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="imageUrl" placeholder="Image URL" onChange={(event) => dispatch({ type: "IMAGE", value: event.target.value})}/>
                    <label htmlFor="imageUrl">Image URL</label>
                </div>
            </div>
            <div className=""><button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button></div>
        </div>
        
    )
}