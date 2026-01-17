import './styles/style.scss';

console.log ("Main.js körs"); 

const PRODUCTS = [

    { id: "classic", namn: "Klassisk Munk", price: 10,
      rating: 4.7,
      image: "./images/classic.jpg",
      quantity: 0,
      category: "donut"
    },
    { id: "vanilla", namn: "Vanilj", price: 10,
      rating: 4.3,
      image: "./images/vanilla.jpg",
      quantity: 0,
      category: "donut"
     },
    { id: "choko", namn: "Choklad", price: 10,
      rating: 4.9,
      image: "./images/choko.jpg",
      quantity: 0,
      category: "donut"
    },
    { id: "lemon", namn: "Citronglazyr", price: 12,
      rating: 3.8,
      image: "./images/lemon.jpg", 
      quantity: 0,
      category: "donut"
    },
    { id: "caramel", namn: "Salt Karamell", price: 15, 
      rating:5.0,
      image: "./images/caramel.jpg", 
      quantity: 0,
      category: "donut"
     },
    { id: "raspberry", namn: "Hallonglazyr", price: 10,
      rating: 4.7,
      image: "./images/raspberry.jpg",
      quantity: 0,
      category: "donut"
     },
    { id: "strawberry", namn: "Jordgubbsglazyr", price: 10,
      rating:4.7,
      image: "./images/strawberry.jpg",
      quantity: 0,
      category: "donut"
     },
    { id: "Blueberry", namn: "Blåbärsglazyr", price: 17,
      rating: 3.8,
      image: "./images/blueberry.jpg",
      quantity: 0,
      category: "donut"
     },
    { id: "ore", namn: "Oreo", price: 20,
      rating:4.9,
      image: "./images/oreo.jpg",
      quantity: 0,
      category: "donut"
     },
    { id: "nuts", namn: "nötter", price: 20,
      rating:4.5,
      image: "./images/nuts.jpg",
      quantity: 0,
      category: "donut"
    },

    { id: "blueberry", namn: "Blåbärsmuffin", price: 27,
      rating:4.9,
      image: "./images/blueberrymuffin.jpg",
      quantity: 0,
      category: "muffin"
    },

    { id: "choko", namn: "chokladmuffin", price: 30,
      rating:4.6,
      image: "./images/muffinchoko.jpg",
      quantity: 0,
      category: "muffin"
    },

    { id: "coffee", namn: "Kaffe", price: 22,
      rating:5.0,
      image: "./images/coffe.jpg",
      quantity: 0,
      category: "drink"
    },

    { id: "latte", namn: "Latte", price: 35,
      rating:5.0,
      image: "./images/latte1.jpg",
      quantity: 0,
      category: "drink"
    },
    { id: "cola", namn: "Cola Zero", price: 18,
      rating:5.0,
      image: "./images/colazero.jpg",
      quantity: 0,
      category: "drink"
    },



];

/* Hämta element från HTML */
const productGrid = document.getElementById ("productGrid");
console.log ("productGrid,", productGrid);
console.log ("antal produkter:", PRODUCTS.length);

const sortContainer = document.querySelector (".sort");
const categoryContainer = document.querySelector (".categories");

let currentCategory = "all";

sortContainer.addEventListener ("click", handleSortClick) ;
function handleSortClick (e) {
    //  Hitta knapp, Hämta sorteringstyp, Spara och Uppdatera lista
    
    const btn = e.target.closest ("button");
    if (!btn) return;

    const sorttype = btn.dataset.sort;
    if (!sorttype) return;

    currentSortType = sorttype;
    renderProducts();
}

categoryContainer.addEventListener ("click", handleCategoryClick);
function handleCategoryClick (e) {
    // Hitta knapp, Hämta kategori, Spara och Uppdatera lista
    
    const btn = e.target.closest ("button");
    if (!btn) return;

    const category = btn.dataset.category;
    if (!category) return;

    currentCategory = category;
    renderProducts();
}


const cartList = document.getElementById ("cartList");
const cartCountEl = document.getElementById ("cartCount");
const cartTotalEl = document.getElementById ("cartTotal");
const clearCartBtn = document.getElementById ("clearCart");
const checkoutBtn = document.getElementById ("checkOut");
const cartBtn = document.querySelector (".cartBtn");
const cartEl = document.getElementById ("cart");
const checkoutPopup = document.getElementById ("checkoutPopup");
const thankYouPopup = document.getElementById ("thankYouPopup");
const orderForm = document.getElementById ("orderForm");
const closeCheckoutBtn = document.getElementById ("closeCheckout");
const closeThankYouBtn = document.getElementById ("closeThankYou");
const clearOrderBtn = document.getElementById ("clearOrder");
const invoiceFields = document.getElementById ("invoiceFields");
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const personnummerInput = document.getElementById ("personnummer");

const cart = [];

function handleCartBtnClick () {
  cartEl.classList.toggle ("is-open");
  renderCart ();
}

if (cartBtn) {
  cartBtn.addEventListener ("click", handleCartBtnClick)
}


function renderCart() {
    // Visa produkter + Beräkna antal + Beräkna pris och Uppdatera
    
    if (cart.length === 0) {
        cartList.innerHTML = "<li>Kundvagnen är tom</li>";
    } else {
        cartList.innerHTML = cart.map(function(item) {
            return "<li> <strong>" + item.namn + "</strong><br><span>" + item.quantity + " st × " + item.price + "kr = " + (item.price * item.quantity) + "kr</span></li>";
        }).join ("");
    }

    /* antal varor i kundvagn */
    const totalCount = cart.reduce(function(sum, item) {
        return sum + item.quantity;
    }, 0);
    cartCountEl.textContent = totalCount;

    /* total pris i kundvagn */
    const totalprice = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);
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

function handleClearOrderClick () {
  // Rensa alla produkter, Återställ formulär och Töm kundvagn
  
  // Återställ alla produkter kvantitet till 0
  for (var i = 0; i < PRODUCTS.length; i++) {
    PRODUCTS[i].quantity = 0;
  }
  
  // Återställ formuläret
  if (orderForm) {
    orderForm.reset();
  }
  
  // Töm kundvagnen
  cart.length = 0;
  
  // Uppdatera renderingen
  renderProducts();
  renderCart();
}

if (clearOrderBtn) {
  clearOrderBtn.addEventListener("click", handleClearOrderClick);
}

function handleCheckoutClick () {
  // OM tom så visa en varning annars Visa popup
  
  if (cart.length === 0) {
    alert ("kundvagnen är tom!");
    return;
  }

  checkoutPopup.classList.remove("hidden");
}

function closeCheckoutPopup () {
  checkoutPopup.classList.add("hidden");
}

function showThankYouPopup () {
  checkoutPopup.classList.add("hidden");
  thankYouPopup.classList.remove("hidden");
}

function closeThankYouPopup () {
  thankYouPopup.classList.add("hidden");
  cart.length = 0;
  renderCart();
}

if (closeCheckoutBtn) {
  closeCheckoutBtn.addEventListener("click", closeCheckoutPopup);
}

if (closeThankYouBtn) {
  closeThankYouBtn.addEventListener("click", closeThankYouPopup);
}

if (checkoutPopup) {
  checkoutPopup.addEventListener("click", function(e) {
    if (e.target === checkoutPopup) {
      closeCheckoutPopup();
    }
  });
}

if (thankYouPopup) {
  thankYouPopup.addEventListener("click", function(e) {
    if (e.target === thankYouPopup) {
      closeThankYouPopup();
    }
  });
}

if (orderForm) {
  orderForm.addEventListener("submit", function(e) {
    e.preventDefault();
    showThankYouPopup();
  });
}


/* render products */

let currentSortType = null;

function getFilteredProducts() {
    // Filtrera efter kategori, Sortera och Returnera
    
    var products;
    if (currentCategory === "all") {
        products = PRODUCTS.slice();
    } else {
        products = PRODUCTS.filter(function(product) {
            return product.category === currentCategory;
        });
    }
    
    if (currentSortType) {
        sortProducts(currentSortType, products);
    }
    
    return products;
}

function renderProducts() {
   const filteredProducts = getFilteredProducts();
   productGrid.innerHTML = filteredProducts.map(renderProductCard).join (""); }
   
    function renderProductCard (product) {
      return "<article class=\"card\">" +
        "<img src=\"" + product.image + "\" alt=\"" + product.namn + "\">" +
        "<div class=\"card__info\">" +
        "<h3>" + product.namn + "</h3>" +
        "<p>" + product.price + "kr</p>" +
        "<p>Betyg: " + product.rating + "</p>" +
        "<div class=\"qty\">" +
        "<button onclick=\"increase('" + product.id + "')\">+</button>" +
        "<span>" + product.quantity + "</span>" +
        "<button onclick=\"decrease('" + product.id + "')\">-</button>" +
        "</div>" +
        "<button class=\"btn btn--primary\" type=\"button\" data-id=\"" + product.id + "\">Lägg i Kundvagn</button>" +
        "</div>" +
        "</article>";
    }


renderProducts();

/* Hantera klick på knappen lägg i varukorg */

productGrid.addEventListener ("click", handleAddClick); 

  function handleAddClick (e) {
    //Hitta produkt, Lägg i kundvagn, Nollställ och Uppdatera
    
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
    //Sök igenom lista och Returnera produkt om ID matchar
    
    for (var i=0; i<PRODUCTS.length; i++) {
       if (String(PRODUCTS[i].id) === String (id)) {
        return PRODUCTS[i];
       }
    }

    return null;
  }
  
  
  function findCartItemById (id) {
    //Sök i kundvagn och Returnera produkt om ID matchar
    
    for (var j=0; j<cart.length; j++) {
        if (String(cart[j].id) === String (id)) {
          return cart[j];
        }
    }

    return null;
  }



function increase (id) {
    // Hitta produkt,Öka kvantitet och Uppdatera
    
    var product = findProductById(id);
    if (!product) return;
    product.quantity++;
    renderProducts();
}

function decrease (id) {
    //  Hitta produkt, Minska kvantitet om > 0 och Uppdatera
    
    var product = findProductById(id);
    if (!product) return;
    if (product.quantity > 0) {
        product.quantity--;
        renderProducts();
    }  
}




window.increase = increase;
window.decrease = decrease;

function sortProducts (type, productsArray) {
  if (!productsArray) {
    productsArray = PRODUCTS;
  }
  
  if (type === "name-asc") {
    productsArray.sort (compareByName);
  }
  if (type === "price-desc") {
    productsArray.sort (compareByPriceDesc);
  }
  
  if (type === "rating-desc") {
    productsArray.sort (compareByRatingDesk);
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

function handlePaymentChange() {
  // Visa personnummerfält om faktura är valt, dölj annars
  
  var selectedPayment = document.querySelector('input[name="payment"]:checked');
  
  if (selectedPayment && selectedPayment.value === "invoice") {
    invoiceFields.classList.remove("hidden");
  } else {
    invoiceFields.classList.add("hidden");
  }
}

function validatePersonnummer(personnummer) {
  // Validera svenskt personnummer
    var cleaned = personnummer.replace(/[-\s]/g, "");
  
  // Kontrollera att det bara är siffror
  if (!/^\d+$/.test(cleaned)) {
    return false;
  }
  // Kontrollera längd, antingen 10 eller 12 siffror 
  if (cleaned.length !== 10 && cleaned.length !== 12) {
    return false;
  }
  
  // Om  12 siffror, använd de 10 sista siffrorna
  if (cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  }
  
  // Kontrollera kontrollsiffra med Luhn-algoritm
  var sum = 0;
  for (var i = 0; i < 9; i++) {
    var digit = parseInt(cleaned[i]);
    var multiplier = (i % 2 === 0) ? 2 : 1;
    var product = digit * multiplier;
    sum += (product > 9) ? product - 9 : product;
  }
  
  var checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(cleaned[9]);
}

if (paymentRadios) {
  for (var i = 0; i < paymentRadios.length; i++) {
    paymentRadios[i].addEventListener("change", handlePaymentChange);
  }
}

if (orderForm) {
  orderForm.addEventListener("submit", handleOrderSubmit);
}

function handleOrderSubmit(e) {
  // Validera formulärfält och personnummer om faktura valt
  
  e.preventDefault();

  var isValid = true;
  var firstName = document.getElementById("firstname");
  var lastName = document.getElementById("lasttname");
  var address = document.getElementById("adress");
  var gdpr = document.getElementById("gdpr");
  var selectedPayment = document.querySelector('input[name="payment"]:checked');

  function validate(input, message) {
    var error = input.nextElementSibling;
    if (!input.value.trim()) {
      error.textContent = message;
      isValid = false;
    } else {
      error.textContent = "";
    }
  }

  validate(firstName, "Förnamn krävs");
  validate(lastName, "Efternamn krävs");
  validate(address, "Adress krävs");

  if (!gdpr.checked) {
    gdpr.nextElementSibling.textContent = "Du måste godkänna vilkoren";
    isValid = false;
  } else {
    gdpr.nextElementSibling.textContent = "";
  }

  // Validera personnummer om faktura är valt
  if (selectedPayment && selectedPayment.value === "invoice") {
    var personnummerError = personnummerInput.nextElementSibling;
    if (!personnummerInput.value.trim()) {
      personnummerError.textContent = "Personnummer krävs";
      isValid = false;

    } else if (!validatePersonnummer(personnummerInput.value.trim())) {
      personnummerError.textContent = "Ogiltigt personnummer";
      isValid = false;
    } else {
      personnummerError.textContent = "";
    }
  }

  if (isValid) {
    showThankYouPopup();
  }
}