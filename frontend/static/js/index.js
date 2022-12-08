
import HomeScreen from './screens/HomeScreen.js';

import ProductScreen from './screens/ProductScreen.js';
// import Error404Screen from './screens/Error404Screen.js';
import CartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import RegisterScreen from './screens/registerScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import Header from './components/Header.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import DashboardScreen from './screens/DashboardScreen.js';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import OrderListScreen from './screens/OrderListScreen.js';
import Aside from './components/Aside.js';





const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
        
    }));
  
};

const router = async() => {
    const routes = [
        
        {path: "/", screen: HomeScreen},
        {path: "/product/:id/edit", screen: ProductEditScreen},
        {path: "/product/:id", screen: ProductScreen},
        {path:"/cart", screen: CartScreen},
        {path:"/cart/:id", screen: CartScreen},
        {path:"/signin", screen: SigninScreen},
        {path:"/register", screen: RegisterScreen},
        {path:"/profile", screen: ProfileScreen},
        {path:"/shipping", screen: ShippingScreen},
        {path:"/payment", screen: PaymentScreen},
        {path:"/placeorder", screen: PlaceOrderScreen},  
        {path:"/order/:id", screen: OrderScreen}, 
        {path:"/dashboard", screen: DashboardScreen},
        {path:"/productlist", screen: ProductListScreen},
        {path:"/orderlist", screen: OrderListScreen},
    ];
const potentialMatches = routes.map(route => {
    return {
        route: route,
        result: location.pathname.match(pathToRegex(route.path))
    };
});

let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
if(!match) {
    match = {
        route: routes[0],
        result: [location.pathname]
    };
}
const screen= new match.route.screen(getParams(match))

const header = document.getElementById('header-container');
 header.innerHTML = await Header.render();
await Header.after_render();

const aside = document.getElementById('aside-container');
  aside.innerHTML = await Aside.render();
  await Aside.after_render();
 
 
  document.querySelector("#main-container").innerHTML = await screen.render();
    if(screen.after_render) await screen.after_render();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    router();
});

