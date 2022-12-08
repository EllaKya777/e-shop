import { getUserInfo } from "../LocalStorage";
import { parseUrl } from "../utiles";


const Header = {
  
  async render() {
 const { name, isAdmin } = getUserInfo();
   const { value } = parseUrl();
     return ` 
     <div class = "brand">
       <button id="aside-open-button">
         &#9776;
       </button>
         <a href = "/ ">E-shop</a>
     </div>
     <div class = "search">
         <form class = "search-form" id = "search-form">
           <input type = "text" name = "q" id = "q" value = "${value || ''}"/>
           <button type = "submit"><i class = "fa fa-search "></i></button>
         </form>
     </div>
     <div>
       ${name ? `<a href = "/profile">${name}</a>`:`<a href = "/signin">Sign-In</a>`}        
       <a href = "/cart">Cart</a>
       ${isAdmin ? `<a href = "/dashboard">Dashboard</a>`: ''}       
     </div>
     `;
   },
  after_render: () => {
      document
        .getElementById('search-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          const searchKeyword = document.getElementById('q').value;
          location.href = `/?q=${searchKeyword}`;
        });
  
      document
        .getElementById('aside-open-button')
        .addEventListener('click', async () => {
          document.getElementById('aside-container').classList.add('open');
        });
        
    },
  };

  export default Header;


  

