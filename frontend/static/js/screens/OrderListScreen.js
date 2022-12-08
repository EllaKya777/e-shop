import {deleteOrder, getOrders} from "../api";
import dashboardMenu from "../components/dashboardMenu";
import { hideLoading, showLoading, showMessage } from "../utiles";
import AbstractScreen from "./AbstractScreen";

export default class OrderListScreen extends AbstractScreen{
    constructor(params) {
        super(params);
     this._id = params.id;
      
       
        this.setTitle("OrderList");
    }

    async after_render() {
      
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async() => {
                if(confirm('Are you sure you whant to delete this order?')) {
                    showLoading();
                    const data = await deleteOrder(deleteButton.id);
                    if(data.error) {
                        showMessage(data.error)
                    } else {
                        history.go();
                    }
                    hideLoading();                    
                }
            });
        });

        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach((editButton) => {
            editButton.addEventListener('click', async() => {
                location.pathname = `/order/${editButton.id}`;                
            });
        });
    }
    async render() {
        const orders = await getOrders();
        return `
        <div class = "dashboard">
     ${dashboardMenu.render({selected: 'orders'})}
        <div class = "dashboard-content">
            <h1>orders</h1>
           
                <div class= "order-list">
                    <table>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>USER</th>
                            <th>PAID AT</th>
                            <th>DELIVERED AT</th>
                            <th class = "tr-action">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(
                                (order) => `
                                <tr>
                                    <td>${order._id}</td>
                                    <td>${order.createdAt}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>${order.user.name}</td>
                                    <td>${order.paidAt || 'No'}</td>
                                    <td>${order.deliveredAt || 'No'}</td>
                                    <td>
                                        <button id = ${order._id} class = "edit-button">Edit</button>
                                        <button id = ${order._id}  class = "delete-button">Delete</button>                                   
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
};