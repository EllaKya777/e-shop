
import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../LocalStorage";
import { redirectUser, showMessage } from "../utiles";
import AbstractScreen from "./AbstractScreen";

export default class SigninScreen extends AbstractScreen{
    constructor(params) {
        super(params);
      
       
        this.setTitle("Sign In Screen");
    }
    async render() {
        if(getUserInfo().name){
            redirectUser();
        }
        return `
        <div class = "form-container">
        <form id = "signin-form">
        <ul class = "form-items">
        <li><h1>Sign-In</h1></li>
        <li>
        <label for = "email">Email</label>
        <input type = "email" name = "email" id = "email"/>
        </li>
        <li>
        <label for = "password">Password</label>
        <input type = "password" name = "password" id = "password"/>
        </li>
        <li>
        <button type = "submit" class = "primary">Sign-In</button>
        </li>
           <li>
              <div>
                New User?
                <a href="/register">Create your account </a>
              </div>
            </li>
        </ul>
        </form>
        </div>
        `;
    }
    async after_render() {
            document.getElementById('signin-form')
        .addEventListener("submit", async(e) =>{
            e.preventDefault();
         
            const data = await signin({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
          
            if(data.error){
                showMessage(data.error);
            } else {
                setUserInfo(data);
                redirectUser();         
             };
    });
    }
    
    
}