
import { clearUser, getUserInfo, setUserInfo } from "../LocalStorage";
import { getMyOrders, update } from "../api";
import { showMessage } from "../utiles";
import AbstractScreen from "./AbstractScreen";

export default class ProfileScreen extends AbstractScreen{
    constructor(params) {
        super(params);
       
        this.setTitle("UserProfile");
    }
        async after_render() {
            document.getElementById('signout-button').addEventListener('click', () => {
                clearUser();
                location.pathname = '/';
            });
                document.getElementById('profile-form')
                .addEventListener("submit", async(e) =>{
                    e.preventDefault();
                    const data = await update({
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                    });
                    if(data.error){
                        showMessage(data.error);
                    } else {
                        setUserInfo(data);
                        location.pathname = '/';
                    }
                });
        }
    async render() {
        const {name, email} = getUserInfo();
        if(!name){
            location.pathname = '/';
        }
        const orders = await getMyOrders();
        return `
        <div class="content profile">
            <div class="profile-info">
                <div class="form-container">
                    <form id="profile-form">
                    <ul class="form-items">
                        <li>
                        <h1>User Profile</h1>
                        </li>
                        <li>
                        <label for="name">Name</label>
                        <input type="name" name="name" id="name" value="${name}" />
                        </li>
                        <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value="${email}" />
                        </li>
                        <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                        </li>
                        <li>
                        <button type="submit" class="primary">Update</button>
                        </li>
                        <li>
                        <button type="button" id="signout-button" >Sign Out</button>
                    </li>        
                    </ul>
                    </form>
                </div>
            </div>
            <div class="profile-orders">
                <h2>Order History</h2>
                <table>
                <thead>
                    <tr>
                    <th>ORDER ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.length === 0 ? `<tr><td colspan="6">No Order Found.</td></tr>` : orders
                    .map(
                        (order) => `
                                <tr>
                                    <td>${order._id}</td>
                                    <td>${order.createdAt}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>${order.paidAt || 'No'}</td>
                                    <td>${order.deliveryAt || 'No'}</td>
                                    <td><a href="/order/${order._id}">DETIALS</a> </td>
                                </tr>
                    `).join('\n')}
                </tbody>
                </table>
            </div>
        </div>
        `;
    }
};

