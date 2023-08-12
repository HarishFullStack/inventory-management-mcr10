import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";

export function Products(){

    const navigate = useNavigate();

    const {department} = useParams();
    const {inventory} = useContext(InventoryContext); 

    const [products, setProducts] = useState([]);
    const [departments, setDepartments] = useState([]);

    const getProductsByDepartment = () => {
        const products = inventory.filter((product) => product.department.toLowerCase() === department.toLowerCase());
        
        const allDepartments = inventory.map((x) => x.department);
        const uniqueDepartments = allDepartments.filter((x, i) => allDepartments.indexOf(x) === i);

        setDepartments(uniqueDepartments);
        setProducts(products);
    }

    useEffect(() => {
        getProductsByDepartment();
    }, []);

    return(
        <div>
            <div className="row mt-5"><h1 className=" col-md-2">Products</h1> 
            <div className="col-md-2">
            <div className="form-floating mb-3">
            {/* onChange={(event) => dispatch({ type: "DEPARTMENT", value: event.target.value})} */}
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
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
                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btncheck1">Low Stock Items</label>

                </div>
                </div>
                <div className="col-md-2">

                <div className="form-floating mb-3">
            {/* onChange={(event) => dispatch({ type: "DEPARTMENT", value: event.target.value})} */}
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
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
                    <table class="table">
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
                            {products && products.map((x) => {
                                return(
                                <tr>
                                    <td><img src={x.imageUrl}/></td>
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