import { cart, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productTHML = "";
// let cartBtn;

products.forEach((item) => {
  productTHML += `
    <div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${item.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
        ${item.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${item.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${item.rating.count}</div>
    </div>

    <div class="product-price">$${formatCurrency(item.priceCents)}</div>

    <div class="product-quantity-container">
      <select class="js-select-qty selected-qty" id="selected-qty">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary add-to-cart" 
    data-add-to-cart="${item.id}" 
    >Add to Cart</button>
  </div>
     `;
  // cartBtn += document.querySelectorAll('.add-to-cart-button');
});

// Adding HTML back to the page

const grid = document.querySelector(".products-grid");
grid.innerHTML = productTHML;

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart();
  });

  function addToCart() {
    // function getOption() {
    //    selectedElement =  document.getElementById("selected-qty");

    //    console.log(selectedElement.value);

    //   //  selectedElement.value
    //   // console.log( selectElement.value);

    // }

    //  getOption();

    let cartQty = 0;

    let cartItem = {
      id: "",
      quantity: 1,
    };
    cartItem.id = button.dataset.addToCart;

    let matchingItem;
    //Looping through the cart to scan for mattching items
    cart.forEach((item) => {
      if (item.id === cartItem.id) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push(cartItem);
    }

    saveToStorage();

    //Adding Cart quantity to the display through loop

    cart.forEach((item) => {
      cartQty += item.quantity;
      document.querySelector(".js-cart-qty").innerHTML = `${cartQty}`;
    });
  }
});

// export function cartDisplay () {
//   cart.forEach((item) => {
//     cartQty += item.quantity;
//     document.querySelector('.js-cart-qty').innerHTML = `${cartQty}`;

//   });
// }
