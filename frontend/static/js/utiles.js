import { getCartItems, getPayment, getShipping, setCartItems } from "./LocalStorage";
import { getPaypalClientId, payOrder } from "./api";


export function parseUrl(){
    const queryString = location.href.split('?').length === 2
    ? Object.values(location.href.split('?').slice(1)).toString()
    : '';
      const q = queryString.split('=');
    return {
      name: q[0],
          value: q[1],
    }
    }

    export const addToCart = (item, forceUpdate = false) => {
        let cartItems = getCartItems();
        const existItem = cartItems.find((x) => x.product === item.product);
        if (existItem) {
          if (forceUpdate) {
            cartItems = cartItems.map((x) =>
              x.product === existItem.product ? item : x
            );
          }
        } else {
          cartItems = [...cartItems, item];
        }
        setCartItems(cartItems);
        if (forceUpdate) {
          history.go();
        }
    };

export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
  };
  export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
  };
  export const showMessage = (message, callback) => {
    document.getElementById('message-overlay').innerHTML = `
    <div>
      <div id="message-overlay-content">${message}</div>
      <button id="message-overlay-close-button">OK</button>
    </div>
    `;
    document.getElementById('message-overlay').classList.add('active');
    document
      .getElementById('message-overlay-close-button')
      .addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
        if (callback) {
          callback();
        }
      });
  };

export const redirectUser = () => {
    if(getCartItems().length !== 0) {
       location.pathname = `/shipping`
    } else {
        location.pathname = '/';
    }
}

export const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
      location.pathname = '/cart';
    }
    const shipping = getShipping();
    if (!shipping.address) {
     location.pathname = '/shipping';
    }
    const payment = getPayment();
    if (!payment.paymentMethod) {
        location.pathname = '/payment';
    }
    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  };

  export function handlePayment(clientId, totalPrice) {
    window.paypal.Button.render(
      {
        env: 'sandbox',
        client: {
          sandbox: clientId,
          production: '',
        },
        locale: 'en_US',
        style: {
          size: 'responsive',
          color: 'gold',
          shape: 'pill',
        },
  
        commit: true,
        payment(data, actions) {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: totalPrice,
                  currency: 'USD',
                },
              },
            ],
          });
        },
        onAuthorize(data, actions) {
          return actions.payment.execute().then(async () => {
            showLoading();
            await payOrder(this._id, {
              orderID: data.orderID,
              payerID: data.payerID,
              paymentID: data.paymentID,
            });
            hideLoading();
            showMessage('Payment was successfull.', () => {
              history.go();
            });
          });
        },
      },
      '#paypal-button'
    ).then(() => {
      hideLoading();
    });
  };

export const addPaypalSdk = async (totalPrice) => {
    const clientId= await getPaypalClientId();  
    if (!window.paypal) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.paypalobjects.com/api/checkout.js';
      script.async = true;
      script.onload = () => handlePayment(clientId, totalPrice);
      document.body.appendChild(script);
    } else {
      handlePayment(clientId, totalPrice);
    }
  };