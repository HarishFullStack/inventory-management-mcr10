import { useContext, useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";

export function Products(){

    const navigate = useNavigate();

    const {department} = useParams();
    const {inventory} = useContext(InventoryContext); 

    const [departments, setDepartments] = useState([]);

    const getProductsByDepartment = () => {
        const products = inventory.filter((product) => product.department.toLowerCase() === department.toLowerCase());
        
        const allDepartments = inventory.map((x) => x.department);
        const uniqueDepartments = allDepartments.filter((x, i) => allDepartments.indexOf(x) === i);

        setDepartments(uniqueDepartments);
        dispatch({type: "INITIAL", value: products});

    }

    useEffect(() => {
        getProductsByDepartment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setState = (state) => {
        let sortedData = state.initialProducts

        // DEPARTMENT
        sortedData = sortedData.filter((item) => item.department === state.department)
    
        // LOWSTOCKITEMS
        sortedData = state.lowStockItems
            ? sortedData.filter((item) => item.stock <= 10)
            : sortedData;
        
        //SORT BY
        sortedData =
        state.sortBy !== ""
        ? sortedData.sort((a, b) =>
            state.sortBy === "name"
                ? b.name - a.name : state.sortBy === "price" ? Number(a.price) - Number(b.price) : Number(a.stock) - Number(b.stock)
            )
        : sortedData;
    
        return { ...state, filteredProducts: sortedData };
        };
        
    const reducer = (state, action) => {

        switch (action.type) {
            case "INITIAL":
                    return setState({
                        ...state,
                        filteredProducts: action.value,
                        initialProducts: action.value
                    });

            case "DEPARTMENT":
                return setState({...state, department: action.value});
        
            case "LOWSTOCKITEMS":
                return setState({...state, lowStockItems: action.value});

            case "SORT":
                return setState({
                    ...state,
                    sortBy: action.value
            });

            case "CLEAR":
                return setState({
                    ...state, 
                    price: Number(Math.max(...state.initialProducts.map(o => o.price))),
                    categories: [],
                    ratings: "",
                    sortBy: ""
                })
            default:

            return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        department: "",
        lowStockItems: false,
        sortBy: "",
        initialProducts: inventory,
        filteredProducts: []
    });

    return(
        <div>
            <div className="row mt-5"><h1 className=" col-md-2">Products</h1> 
            <div className="col-md-2">
            <div className="form-floating mb-3">
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(event) => dispatch({ type: "DEPARTMENT", value: event.target.value})}>
                    <option selected>Select Department</option>
                    {
                        departments && departments.map((x) => {
                            return(
                                <option key={x} value={x.toLowerCase()}>{x}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor="floatingSelect">Department</label>
                </div>
                </div>
            <div className="col-md-2 m-auto">
                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off"  onChange={(event) => dispatch({ type: "LOWSTOCKITEMS", value: event.target.value})}/>
                <label className="btn btn-outline-primary" htmlFor="btncheck1">Low Stock Items</label>

                </div>
                </div>
                <div className="col-md-2">

                <div className="form-floating mb-3">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example"  onChange={(event) => dispatch({ type: "SORTBY", value: event.target.value})}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="stock">Stock</option>
                    </select>
                    <label htmlFor="floatingSelect">Sort By</label>
                </div>
                </div>

            <div className=" mb-3 col-md-2 m-auto text-end">
                <button className="btn btn-primary" onClick={() => navigate('/product-management')}>New</button>
            </div>
            </div>
            <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Supplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.filteredProducts && state.filteredProducts.map((x) => {
                                return(
                                <tr key={x.id}>
                                    <td><img src={x.imageUrl} alt="not found"/></td>
                                    <td><a href={`/product/${x.id}`}>{x.name}</a></td>
                                    <td>{x.description}</td>
                                    <td>{x.price}</td>
                                    <td>{x.stock}</td>
                                    <td>{x.supplier}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    
            </div>
        </div>
    )
}