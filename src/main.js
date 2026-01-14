import './styles/style.scss';

console.log ("Main.js körs");

const PRODUCTS = [

    { id: "classic", namn: "Klassisk Munk", price: 10 },
    { id: "Vanilla", namn: "Vanilj", price: 10 },
    { id: "choko", namn: "Choklad", price: 10 },
    { id: "lemon", namn: "Citronglazyr", price: 10 },
    { id: "caramel", namn: "Salt Karamell", price: 10 },
    { id: "raspberry", namn: "Hallonglazyr", price: 10 },
    { id: "strawberry", namn: "Jordgubbsglazyr", price: 10 },
    { id: "Blueberry", namn: "Blåbärsglazyr", price: 10 },
    { id: "ore", namn: "Oreo", price: 10 },
    { id: "biscoff", namn: "Biscoff-kross", price: 10 },


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
        <h3>${product.namn}</h3>
        <p>${product.price}kr</p>
        <button>Lägg i</button>
        </article>
`).join("");
