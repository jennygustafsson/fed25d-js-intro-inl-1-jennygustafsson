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

const cart = [];

function rendercart() { 
    cartList.innerHTML = cart.map (item => ` )
        <li> ${item.namn} x ${item.quantity} = ${item.price * item.quantity}kr </li>
        `).join ("");

    /* antal i kundvagn */
    const totalCount = cart.reduce ((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalCount;

    /* total pris i kundvagn */
    const totalprice = cart.reduce ((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalEl.textContent = totalprice;
    
}

function renderProducts() {
productGrid.innerHTML = PRODUCTS.map(product => `  
      <article class="card">
      <img src="${product.image}" alt="${product.namn}">

      <div class="card__info">
        <h3>${product.namn}</h3>
        <p>${product.price}kr</p>
        
        <div class="qty">
          <button onclick="increase('${product.id}')">+</button>
          <span>${product.quantity}</span>
          <button onclick="decrease('${product.id}')">-</button>
        </div>

        <button class="btn btn--primary" type="button" data-id="${product.id}">Lägg i</button>
        </div>
        </article>
`).join("");
}


renderProducts();

productGrid.addEventListener ("click", (e) => {
    const btn = e.target.closest ("button.btn--primary");
    if (!btn) return;

    const id = btn.dataset.id;
    const product = PRODUCTS.find (p => p.id === id);

    /* hur många vill man lägga till */
    const quantity = product.quantity;
    if (quantity === 0) return;

    /* finns produkten i varukorgen? */
    const existing = cart.find (item => item.id === id);
    if (existing) {
        existing.quantity += qtyToAdd;
    } else {
        cart.push ({
            id: product.id,
            namn: product.namn,
            price: product.price,
            quantity: qtyToAdd,
        });
    }

    /* Nollställ antal produkter i varukorgen */
    product.quantity = 0;

    renderProducts();
    renderCart();
  });



function increase (id) {
    const product = PRODUCTS.find (p => p.id === id);
       product.quantity++;
       renderProducts();
}
function decrease  (id)  {
    const product = PRODUCTS.find (p => p.id === id);
    if (product.quantity > 0) {
        product.quantity--;
        renderProducts();
    }
}


window.increase = increase;
window.decrease = decrease;

clearCartBtn.addEventListener ("click", () => {
    cart.length = 0; //tömmer arrayen
    renderCart (); //uppdaterar kundvagnen
});