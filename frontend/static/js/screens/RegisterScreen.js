
import { getUserInfo, setUserInfo } from "../LocalStorage";
import { register } from "../api";
import { redirectUser, showMessage } from "../utiles";
import AbstractScreen from "./AbstractScreen";

export default class RegisterScreen extends AbstractScreen{
    constructor(params) {
        super(params);
      
        this.setTitle("Register");
    }
        async after_render() {
            document.getElementById('register-form')
            .addEventListener("submit", async(e) =>{
                e.preventDefault();
                const data = await register({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                });
                if(data.error){
                showMessage(data.error);
                } else {
                    setUserInfo(data);
                    redirectUser();
                }
            });
        }
    async render() {
        if(getUserInfo().name){
            redirectUser();
        }
        return `
        <div class = "form-container">
            <form id = "register-form">
                <ul class = "form-items">
                <li><h1>Create account</h1></li>
                <li>
                    <label for = "name">Name</label>
                    <input type = "name" name = "name" id = "name"/>
                </li>
                <li>
                    <label for = "email">Email</label>
                    <input type = "email" name = "email" id = "email"/>
                </li>
                <li>
                    <label for = "password">Password</label>
                    <input type = "password" name = "password" id = "password"/>
                </li>
                <li>
                    <label for = "repassword">Re-Enter Password</label>
                    <input type = "password" name = "repassword" id = "repassword"/>
                </li>
                <li>
                    <button type = "submit" class = "primary">Register</button>
                </li>
                <li>
                    <div>
                        Already have an account?
                        <a href="/signin">Sign-In </a>
                    </div>
                    </li>
                </ul>
            </form>
        </div>
        `;
    }
};

