  export let cart = JSON.parse(localStorage.getItem('cart'));
 if (!cart){
  
  cart = [
    {id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity:2},
    {id:"3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity:1} ];
}

 export function saveToStorage(){
   localStorage.setItem('cart', JSON.stringify(cart));
 };

  export function removeFromCart (linkId){
   let newCart = [];
   
   cart.forEach((cartItem) =>{
      if (linkId !== cartItem.id){
         newCart.push(cartItem)}
         return newCart

   })
   cart = newCart;
   
   saveToStorage();
   
  }


 


