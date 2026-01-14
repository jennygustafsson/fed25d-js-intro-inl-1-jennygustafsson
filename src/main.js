import './styles/style.scss';

console.log ("Main.js körs"); 

const PRODUCTS = [

    { id: "classic", namn: "Klassisk Munk", price: 10,
      image: "./images/classic.jpg",
      quantity: 0
    },
    { id: "vanilla", namn: "Vanilj", price: 10,
      image: "./images/vanilla.jpg",
      quantity: 0
     },
    { id: "choko", namn: "Choklad", price: 10,
      image: "./images/choko.jpg",
      quantity: 0
    },
    { id: "lemon", namn: "Citronglazyr", price: 10,
      image: "./images/lemon.jpg",
      quantity: 0
    },
    { id: "caramel", namn: "Salt Karamell", price: 10, 
      image: "./images/caramel.jpg", 
      quantity: 0
     },
    { id: "raspberry", namn: "Hallonglazyr", price: 10,
      image: "./images/raspberry.jpg",
      quantity: 0
     },
    { id: "strawberry", namn: "Jordgubbsglazyr", price: 10,
      image: "./images/strawberry.jpg",
      quantity: 0
     },
    { id: "Blueberry", namn: "Blåbärsglazyr", price: 10,
      image: "./images/blueberry.jpg",
      quantity: 0
     },
    { id: "ore", namn: "Oreo", price: 10,
      image: "./images/oreo.jpg",
      quantity: 0
     },
    { id: "nuts", namn: "nötter", price: 10,
      image: "./images/nuts.jpg",
      quantity: 0
    },


];

/* Hämta element från HTML */
const productGrid = document.getElementById ("productGrid");
console.log ("productGrid,", productGrid);
console.log ("antal produkter:", PRODUCTS.length);


const cartList = document.getElementById ("cartList");
const cartCountEl = document.getElementById ("cartCount");
const cartTotalEl = document.getElementById ("cartTotal");
const clearCartBtn = document.getElementById ("clearCart");


productGrid.innerHTML = PRODUCTS.map(product => `  
      <article class="card">
      <img src="${product.image}" alt="${product.namn}">
      <div class="card__info">
        <h3 class=card__title">${product.namn}</h3>
        <p class=card__price">${product.price}kr</p>
        
        <div class="qty">
          <button onclick="decrease('$product.id')">+</button>
          <span>${product.quantity}</span>
          <button onclick="increase('${product.id}')">-</button>
        </div>
      </div>
        <button class="btn btn--primary" type="button" data-id="${product.id}">
        Lägg i</button>
        </article>
`).join("");

function increase (id) {
    const product = PRODUCTS.find (p => p.id === id);
    product.quantity++;
    render( )
}
function decrease  (id)  {
    const product = PRODUCTS.find (p => p.id === id);
    if (product.quantity > 0) {
        product.quantity--;
    }
    render( )
}