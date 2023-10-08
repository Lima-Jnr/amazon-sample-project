import { products } from '../data/products.js';
import { cart, removeFromCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';



checkOutDisplay();


function checkOutDisplay (){

let cartSummmaryHTML = '';

 cart.forEach((cartItem) => {
//     const productName = cartItem.name;

    let matchingItem;

    products.forEach((product) => {
        if (cartItem.id === product.id) {
            matchingItem = product;

            return matchingItem;
}});


    cartSummmaryHTML += `<div class="order-summary">
    <div class="cart-item-container 
    js-item-container-${matchingItem.id}">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingItem.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">
           ${matchingItem.name}
          </div>
          <div class="product-price">$${formatCurrency(matchingItem.priceCents)}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-delete-id="${matchingItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}"
            />
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}"
            />
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}"
            />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
 `
 return matchingItem;
}
);




document.querySelector('.js-order-summary')
.innerHTML = cartSummmaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach( (link) => {
  link.addEventListener('click', () => {
  const linkId = link.dataset.deleteId;

  //call the fx from cart.js
  removeFromCart(linkId);
  // Picking up the class to remove using matchingItemID and linkId
 const container = document.querySelector(`.js-item-container-${linkId}`) 
    container.remove();
    headerQty();
    checkOutDisplay();
  });

});
calculateOrder();

}




function headerQty (){
// Changing the Header Qty
if(cart.length < 2 ){
  document.querySelector('.js-checkout-header').innerHTML = `Checkout (${cart.length} item )`;

}
else {
document.querySelector('.js-checkout-header').innerHTML = `Checkout (${cart.length} items )`;
}
};

headerQty();

export function calculateOrder () {

// Adding the total price.
let totalCost = 0;
cart.forEach((cartItem) => {
  let matchingItem;

  products.forEach((product) => {
      if (cartItem.id === product.id) {
          matchingItem = product;

          return matchingItem;
}});
    totalCost += matchingItem.priceCents;

});


 let tax = 0;
 let shippingAndHandling = 0;
 let totalBeforeTax = 0;
 let orderTotal = 0



  if (cart.length >= 1) {

  tax = (totalCost * 0.1);
 shippingAndHandling = 499;
 totalBeforeTax = (totalCost + 499);
 orderTotal = totalBeforeTax + tax;

  }



document.querySelector('.js-payment-summary')
.innerHTML = `
<div class="payment-summary-title">Order Summary</div>

<div class="payment-summary-row">
  <div>Items (${cart.length}):</div>
  <div class="payment-summary-money">${formatCurrency(totalCost)}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">${formatCurrency(shippingAndHandling)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">${formatCurrency(totalBeforeTax)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">${formatCurrency(tax)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
</div>

<a class="place-order-button header-link" href="orders.html">
<button class="place-order-button button-primary js-place-order-button">
  Place your order
</button>
</a>

`

};

//

calculateOrder();

 checkOutDisplay();



//  document.querySelector('.js-place-order-button')
// .addEventListener('click',  () => {
//   pushToOrder();
//   console.log(orderArray);
  

// });
// export let orderArray = [];

// export function pushToOrder () {
//   cart.forEach((cartItem) => {
//     let matchingItem;
  
//     products.forEach((product) => {
//         if (cartItem.id === product.id) {
//             matchingItem = product;
  
//             return matchingItem;
//   }})
//   let orderObj = {
//     name: matchingItem.name,
//     quatity: cartItem.quantity,
//     price: matchingItem.priceCents,
//     id: matchingItem.id
//    };

   
  
//     orderArray.push(orderObj);
   
  
    

// });


//  return orderArray;

// };




// document.querySelector('.js-place-order-button')
// .addEventListener('click',  () => {
//   pushToOrder();
//   console.log(orderArray);
  

// });


// export  let myOrder = orderArray;

