import { cart, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";

saveToStorage();

export let orderArray = JSON.parse(localStorage.getItem("myOrder"));

if (!orderArray) {
  orderArray = [
    {
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      price: 799,
      quantity: 2,
    },

    {
      id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
      image: "images/products/luxury-tower-set-6-piece.jpg",
      name: "Luxury Towel Set - Graphite Gray",
      price: 3599,
      quantity: 1,
    },
  ];
}

export function pushToOrder() {
  cart.forEach((cartItem) => {
    let matchingItem;

    products.forEach((product) => {
      if (cartItem.id === product.id) {
        matchingItem = product;

        return matchingItem;
      }
    });

    let orderObj = {
      name: matchingItem.name,
      quantity: cartItem.quantity,
      price: matchingItem.priceCents,
      id: matchingItem.id,
      image: matchingItem.image,
    };

    //   let existingOrder;
    // just to push

    //   orderArray.forEach((orderedItem)=> {
    //     if (orderedItem.id === matchingItem.id){
    //       existingOrder = orderedItem;
    //       console.log(existingOrder);
    //       return existingOrder

    // }});

    //  orderArray.push(orderObj);

    //
    orderArray.push(orderObj);
    //}
  });

  console.log(orderArray);

  //
  localStorage.setItem("myOrder", JSON.stringify(orderArray));
}

pushToOrder();

let orderHTML = "";

orderArray.forEach((orderItem) => {
  orderHTML += `
<div class="orders-grid">
    
            <div class="order-details-grid">
            <div class="product-image-container">
            <img src="${orderItem.image}" />
            </div>
            <div class="product-details">
              <div class="product-name">
                ${orderItem.name}
              </div>
              <div class="product-delivery-date">Arriving on: August 15</div>
              <div class="product-quantity">Quantity: ${orderItem.quantity}</div>
              <button class="buy-again-button button-primary js-sample">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        
        </div>

`;
});

// localStorage.setItem('myOrder', JSON.stringify(orderArray));

document.querySelector(".js-order-details-grid").innerHTML = orderHTML;

// };

//  pushToOrder();

// document.querySelector('.js-sample')
// .addEventListener('click', ()=>{
//      console.log(myOrder);
// });
