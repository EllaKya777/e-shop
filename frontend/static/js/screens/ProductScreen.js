import { getProduct} from "../api.js";
import AbstractScreen from "./AbstractScreen.js";

export default class extends AbstractScreen{
    constructor(params) {
        super(params);
        this._id = params.id;
      
       
        this.setTitle("Product Screen");
    }
    async after_render () {
        document.getElementById('add-button').addEventListener('click',
        () => {location.pathname = `/cart/${this._id}`
           
        })
    }
  
    async render() {
    const product = await getProduct(this._id);
      
        return `  
        <div class="content">
        <div class="back-to-result">
           <a href="/">Back to result </a>
         </div>
         <div class="details">
          <div class="details-image">
             <img src="${product.image}" alt="${product.name}" />
           </div>
           <div class="details-info">
           <ul>
             <li>
             <h1>${product.name}</h1>
             </li>
             <li>
                 Price: <strong>$${product.price}</strong>
               </li>
               <li>
                 Description:
                 <div>
                   ${product.description}
                 </div>
               </li>
           </ul>
           </div>
           <div class="details-action">
           <ul>
             <li>
               Price: <strong>$${product.price}</strong>
             </li>
             <li>
               Status : 
                 ${
                   product.countInStock > 0
                     ? `<span class="success">In Stock</span>`
                     : `<span class="error">Unavailable</span>`
                 }
             </li>
             <li>
                 <button id="add-button" class="fw primary">Add to Cart </div>
           </ul>
         </div>
         
       </div>`;
       
     }
    };


