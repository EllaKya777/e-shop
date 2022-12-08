import { createProduct, deleteProduct, getProducts } from "../api";
import dashboardMenu from "../components/dashboardMenu";
import { hideLoading, showLoading, showMessage } from "../utiles";
import AbstractScreen from "./AbstractScreen";

export default class ProductListScreen extends AbstractScreen{
    constructor(params) {
        super(params);
        this.setTitle("ProductList");
    }

    async after_render() {
     
        document.getElementById("create-product-button")
        .addEventListener('click', async () => {
            const data = await createProduct();
           location.pathname= `/product/${data.product._id}/edit`;
           
        });
        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach(editButton => {
            editButton.addEventListener('click', () => {
                location.pathname = `/product/${editButton.id}/edit`;
            });
        });
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async() => {
                if(confirm("Are you sure you want to delete this product?")) {
                    showLoading();
                    const data = await deleteProduct(deleteButton.id);
                    if(data.error) {
                        showMessage(data.error)
                    } else {
                        history.go();
                    }
                    hideLoading();                    
                }
            });
        });
    }
    async render() {
        const products = await getProducts();
        return `
        <div class = "dashboard">
         ${dashboardMenu.render({selected: 'products'})}
            <div class = "dashboard-content">
    
                <h1>Products</h1>
                <button id = "create-product-button" class="primary">Create Product</button>
                    <div class= "product-list">
                        <table>
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th class = "tr-action">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${products.map(
                                    (product) => `
                                    <tr>
                                        <td>${product._id}</td>
                                        <td>${product.name}</td>
                                        <td>${product.price}</td>
                                        <td>${product.category}</td>
                                        <td>${product.brand}</td>
                                        <td>
                                            <button id = ${product._id} class = "edit-button">Edit</button>
                                            <button id = ${product._id}  class = "delete-button">Delete</button>                                   
                                        </td>
                                    </tr>
                                    `).join('\n')}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
        `;
    }
}