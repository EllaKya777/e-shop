
import { getProducts } from "../api.js";
import { parseUrl } from "../utiles.js";

import AbstractScreen from "./AbstractScreen.js";




export default class extends AbstractScreen{
    constructor(params) {
        super(params);
        this.setTitle("Products");
    }

    async render() {
    const {value} = parseUrl();

          const products = await getProducts({searchKeyword: value});
          if(products.error) {
            return `<div class = "error">${products.error}</div>`;
      
          }
        return `
        <ul class="products">
          ${products.map(product => `
            <li class = "product-view">
              <div class="product">
                <div class="product-name">
                  <a href="/product/${product._id}">
                    <img src="${product.image}" alt="${product.name}" />
                  </a>
                <div class="product-name">
                    <a href="/product/${product._id}" data-link>
                      ${product.name}
                    </a>
                </div> 
                <div class="product-brand">
                  ${product.brand}
                </div>
                <div class="product-price">
                  $${product.price}
                </div>
              </div>               
             </li>
            `).join('\n')
          }
        </ul>
    `;
    }
}

