import './styles/style.scss';

console.log ("Main.js körs"); 

const PRODUCTS = [

    { id: "classic", namn: "Klassisk Munk", price: 10,
      rating: 4.7,
      image: "./images/classic.jpg",
      quantity: 0
    },
    { id: "vanilla", namn: "Vanilj", price: 10,
      rating: 4.3,
      image: "./images/vanilla.jpg",
      quantity: 0
     },
    { id: "choko", namn: "Choklad", price: 10,
      rating: 4.9,
      image: "./images/choko.jpg",
      quantity: 0
    },
    { id: "lemon", namn: "Citronglazyr", price: 10,
      rating: 3.8,
      image: "./images/lemon.jpg", 
      quantity: 0
    },
    { id: "caramel", namn: "Salt Karamell", price: 10, 
      rating:5.0,
      image: "./images/caramel.jpg", 
      quantity: 0
     },
    { id: "raspberry", namn: "Hallonglazyr", price: 10,
      rating: 4.7,
      image: "./images/raspberry.jpg",
      quantity: 0
     },
    { id: "strawberry", namn: "Jordgubbsglazyr", price: 10,
      rating:4.7,
      image: "./images/strawberry.jpg",
      quantity: 0
     },
    { id: "Blueberry", namn: "Blåbärsglazyr", price: 10,
      rating: 3.8,
      image: "./images/blueberry.jpg",
      quantity: 0
     },
    { id: "ore", namn: "Oreo", price: 10,
      rating:4.9,
      image: "./images/oreo.jpg",
      quantity: 0
     },
    { id: "nuts", namn: "nötter", price: 10,
      rating:4.5,
      image: "./images/nuts.jpg",
      quantity: 0
    },


];

/* Hämta element från HTML */
const productGrid = document.getElementById ("productGrid");
console.log ("productGrid,", productGrid);
console.log ("antal produkter:", PRODUCTS.length);

const sortContainer = document.querySelector (".sort");

sortContainer.addEventListener ("click", handleSortClick) ;
function handleSortClick (e) {
    const btn = e.target.closest ("button");
    if (!btn) return;

    const sorttype = btn.dataset.sort;

    sortProducts(sorttype);
    renderProducts();
}


const cartList = document.getElementById ("cartList");
const cartCountEl = document.getElementById ("cartCount");
const cartTotalEl = document.getElementById ("cartTotal");
const clearCartBtn = document.getElementById ("clearCart");
const checkoutBtn = document.getElementById ("checkOut");
const cartBtn = document.querySelector (".cartBtn");
const cartEl = document.getElementById ("cart");

const cart = [];

function handleCartBtnClick () {
  cartEl.classList.toggle ("is-open");
  renderCart ();
}

if (cartBtn) {
  cartBtn.addEventListener ("click", handleCartBtnClick)
}


function renderCart() { 
    if (cart.length === 0) {
        cartList.innerHTML = "<li>Kundvagnen är tom</li>";
    } else {
        cartList.innerHTML = cart.map (item => `
            <li> 
                <strong>${item.namn}</strong><br>
                <span>${item.quantity} st × ${item.price}kr = ${item.price * item.quantity}kr</span>
            </li>
        `).join ("");
    }

    /* antal i kundvagn */
    const totalCount = cart.reduce ((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalCount;

    /* total pris i kundvagn */
    const totalprice = cart.reduce ((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalEl.textContent = totalprice;
    
}

if (clearCartBtn) {
  clearCartBtn.addEventListener ("click", handleClearCartClick); 
}

if (checkoutBtn) {
  checkoutBtn.addEventListener ("click", handleCheckoutClick);
}

function handleClearCartClick () {
  cart.length = 0; 
  renderCart (); 
}

function handleCheckoutClick () {
  if (cart.length === 0) {
    alert ("kundvagnen är tom!");
    return;
  }

  alert ("Tack för ditt köp!");
  cart.length = 0;
  renderCart ();
}


/* render products */

function renderProducts() {
   productGrid.innerHTML = PRODUCTS.map(renderProductCard).join (""); }
   
    function renderProductCard (product) { 
      return `
      <article class="card">
      <img src="${product.image}" alt="${product.namn}">

      <div class="card__info">
        <h3>${product.namn}</h3>
        <p>${product.price}kr</p>
        <p>Betyg: ${product.rating}</p>
        
        <div class="qty">
          <button onclick="increase('${product.id}')">+</button>
          <span>${product.quantity}</span>
          <button onclick="decrease('${product.id}')">-</button>
        </div>

        <button class="btn btn--primary" type="button" data-id="${product.id}">Lägg i</button>
        </article>
`;
}


renderProducts();

/* Hantera klick på knappen lägg i varukorg */

productGrid.addEventListener ("click", handleAddClick); 

  function handleAddClick (e) { 
    
    var btn = e.target.closest ('button.btn--primary[data-id]');
    if (!btn) return;
    

    var id = btn.getAttribute ("data-id");

    var product = findProductById (id);
    if (!product) return;

    var qtyToAdd = product.quantity;
    if (qtyToAdd <= 0) return; 

    var existing = findCartItemById (id);

    if (existing) {
      existing.quantity += qtyToAdd; 
     } else { 
      cart.push ({ 
        id: product.id,
        namn: product.namn,
        price: product.price,
        quantity: qtyToAdd 
      });
     }

     product.quantity = 0;

    renderProducts();
    renderCart();

    } 
  function findProductById (id) {
  for (var i=0; i<PRODUCTS.length; i++) {
       if (String(PRODUCTS[i].id) === String (id)) {
        return PRODUCTS[i];
       }
    }

    return null;
  }
  
  
  function findCartItemById (id) {
  for (var j=0; j<cart.length; j++) {
        if (String(cart[j].id) === String (id)) {
          return cart[j];
        }
    }

    return null;
  }



function increase (id) {
    const product = PRODUCTS.find (p => p.id === id);
    if (!product) return;
       product.quantity++;
       renderProducts();
}

function decrease  (id)  {
    const product = PRODUCTS.find (p => p.id === id);
    if (!product) return;
    if (product.quantity > 0) {
        product.quantity--;
        renderProducts();
    }  
}




window.increase = increase;
window.decrease = decrease;

function sortProducts (type) {
  if (type === "name-asc") {
    PRODUCTS.sort (compareByName);
    }
  if (type === "price-desc") {
    PRODUCTS.sort (compareByPriceDesc);
  }
  
  if (type === "rating-desc") {
    PRODUCTS.sort (compareByRatingDesk);
  }
}

function compareByName (a,b) {
  return a.namn.localeCompare (b.namn);
}

function compareByPriceDesc (a,b) {
  return b.price - a.price;
}

function compareByRatingDesk (a,b) {
  return b.rating - a.rating; 
}