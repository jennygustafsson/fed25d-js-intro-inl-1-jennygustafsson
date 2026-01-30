import './style.scss';

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
    { id: "choko-donut", namn: "Choklad", price: 10,
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
    { id: "blueberry-donut", namn: "Blåbärsglazyr", price: 17,
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

    { id: "choko-muffin", namn: "chokladmuffin", price: 30,
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
const productGrid = document.getElementById("productGrid");
console.log("productGrid,", productGrid);
console.log("antal produkter:", PRODUCTS.length);

const sortContainer = document.querySelector(".sort");
const categoryContainer = document.querySelector(".categories");

let currentCategory = "all";

sortContainer.addEventListener("click", handleSortClick);
function handleSortClick(e) {
    //  Hitta knapp, Hämta sorteringstyp, Spara och Uppdatera lista
    
    const btn = e.target.closest("button");
    if (!btn) return;

    const sorttype = btn.dataset.sort;
    if (!sorttype) return;

    currentSortType = sorttype;
    renderProducts();
    resetInactivityTimer();
}

categoryContainer.addEventListener("click", handleCategoryClick);
function handleCategoryClick(e) {
    // Hitta knapp, Hämta kategori, Spara och Uppdatera lista
    
    const btn = e.target.closest("button");
    if (!btn) return;

    const category = btn.dataset.category;
    if (!category) return;

    currentCategory = category;
    renderProducts();
    resetInactivityTimer();
}


const cartList = document.getElementById("cartList");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkOut");
const cartBtn = document.querySelector(".cartBtn");
const cartEl = document.getElementById("cart");
const checkoutPopup = document.getElementById("checkoutPopup");
const thankYouPopup = document.getElementById("thankYouPopup");
const orderForm = document.getElementById("orderForm");
const closeCheckoutBtn = document.getElementById("closeCheckout");
const closeThankYouBtn = document.getElementById("closeThankYou");
const clearOrderBtn = document.getElementById("clearOrder");
const invoiceFields = document.getElementById("invoiceFields");
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const personnummerInput = document.getElementById("personnummer");
const mondayRow = document.getElementById("mondayRow");
const bulkRow = document.getElementById("bulkRow");
const weekendRow = document.getElementById("weekendRow");
const shippingEl = document.getElementById("shipping");
const invoiceInfo = document.getElementById("inovoiceInfo");

const cart = [];
let inactivityTimer = null;

function handleCartBtnClick() {
  cartEl.classList.toggle("is-open");
  renderCart();
}

if (cartBtn) {
  cartBtn.addEventListener ("click", handleCartBtnClick)
}

// Starta timer vid sidladdning
resetInactivityTimer();

function isMondayBefore10() {
  // Kontrollera om det är måndag före kl 10
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  return day === 1 && hour < 10;
}

function isWeekendSurcharge() {
  // Kontrollera om helgpåslag ska gälla (fredag efter 15 till måndag 03)
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  if (day === 5 && hour >= 15) {
    return true;
  }
  if (day === 6 || day === 0) {
    return true; 
  }
  if (day === 1 && hour < 3) {
    return true;
  }
  return false;
}

function calculateDiscounts() {
  // Beräkna alla rabatter
  const subtotal = cart.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);
  
  let mondayDiscount = 0;
  let bulkDiscount = 0;
  
  // Måndagsrabatt 10% på hela beställningen
  if (isMondayBefore10()) {
    mondayDiscount = subtotal * 0.1;
  }
  
  // Rabatt för minst 10 av samma munksort (10%)
  // Kontrollera baserat på originalpriset, inte priset i varukorgen
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const product = findProductById(item.id);
    if (product && product.category === "donut" && item.quantity >= 10) {
      // Använd originalpriset från produktobjektet för rabattberäkning
      const originalPrice = product.price;
      bulkDiscount += originalPrice * item.quantity * 0.1;
    }
  }
  
  // Helgpåslag är redan applicerat i priset när produkter läggs i varukorgen
  // Så vi behöver inte lägga till det här igen
  const weekendSurcharge = 0;
  
  return {
    mondayDiscount: mondayDiscount,
    bulkDiscount: bulkDiscount,
    weekendSurcharge: weekendSurcharge
  };
}

function calculateShipping() {
  // Beräkna frakt: fri om mer än 15 munkar, annars 25kr + 10% av total
  let donutCount = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const product = findProductById(item.id);
    if (product && product.category === "donut") {
      donutCount += item.quantity;
    }
  }
  
  if (donutCount > 15) {
    return 0;
  }
  
  const subtotal = cart.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);
  
  const discounts = calculateDiscounts();
  const totalAfterDiscounts = subtotal - discounts.mondayDiscount - discounts.bulkDiscount;
  
  return 25 + (totalAfterDiscounts * 0.1);
}

function updatePaymentOptions() {
  // Disable faktura om total > 800kr
  const subtotal = cart.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);
  
  const discounts = calculateDiscounts();
  const shipping = calculateShipping();
  const total = subtotal - discounts.mondayDiscount - discounts.bulkDiscount + shipping;
  
  const invoiceRadio = document.querySelector('input[name="payment"][value="invoice"]');
  
  if (total > 800) {
    if (invoiceRadio) {
      invoiceRadio.disabled = true;
      if (invoiceInfo) {
        invoiceInfo.textContent = "Faktura kan inte väljas för beställningar över 800kr";
        invoiceInfo.style.color = "red";
      }
      // Om faktura är valt, välj kort istället
      if (invoiceRadio.checked) {
        const cardRadio = document.querySelector('input[name="payment"][value="card"]');
        if (cardRadio) {
          cardRadio.checked = true;
          handlePaymentChange();
        }
      }
      handlePaymentChange();
    }
  } else {
    if (invoiceRadio) {
      invoiceRadio.disabled = false;
      if (invoiceInfo) {
        invoiceInfo.textContent = "";
      }
    }
  }
}

function resetInactivityTimer() {
  // Rensa gammal timer och starta ny
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  inactivityTimer = setTimeout(function() {
    // Rensa formulär och varukorg efter 15 minuter
    if (orderForm) {
      orderForm.reset();
    }
    cart.length = 0;
    renderCart();
    renderProducts();
    
    if (checkoutPopup) {
      checkoutPopup.classList.add("hidden");
    }
    if (thankYouPopup) {
      thankYouPopup.classList.add("hidden");
    }
    
    const slowMsg = document.getElementById("slowMsg");
    if (slowMsg) {
      slowMsg.textContent = "Du är för långsam. Beställningsformuläret har rensats.";
      slowMsg.classList.remove("hidden");
      setTimeout(function() {
        slowMsg.classList.add("hidden");
      }, 5000);
    }
  }, 15 * 60 * 1000); // 15 minuter
}

function renderCart() {
    // Visa produkter + Beräkna antal + Beräkna pris och Uppdatera
    
    if (cart.length === 0) {
        cartList.innerHTML = "<li>Kundvagnen är tom</li>";
        if (mondayRow) mondayRow.classList.add("hidden");
        if (bulkRow) bulkRow.classList.add("hidden");
        if (weekendRow) weekendRow.classList.add("hidden");
        if (shippingEl) shippingEl.textContent = "0";
        if (cartTotalEl) cartTotalEl.textContent = "0";
        cartCountEl.textContent = "0";
        updatePaymentOptions();
        resetInactivityTimer();
        return;
    }
    
    // Visa produkter med korrekt pris (helgpåslag är redan inkluderat i priset)
    cartList.innerHTML = cart.map(function(item) {
        const itemPrice = Math.round(item.price * 100) / 100; // Avrunda till 2 decimaler
        const itemTotal = Math.round(item.price * item.quantity * 100) / 100;
        return "<li> <strong>" + item.namn + "</strong><br><span>" + item.quantity + " st × " + itemPrice.toFixed(2) + "kr = " + itemTotal.toFixed(2) + "kr</span></li>";
    }).join("");

    /* antal varor i kundvagn */
    const totalCount = cart.reduce(function(sum, item) {
        return sum + item.quantity;
    }, 0);
    cartCountEl.textContent = totalCount;

    /* Beräkna rabatter och frakt */
    const subtotal = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);
    
    const discounts = calculateDiscounts();
    const shipping = calculateShipping();
    
    // Visa/dölj rabatter och påslag
    if (mondayRow) {
      if (discounts.mondayDiscount > 0) {
        mondayRow.classList.remove("hidden");
      } else {
        mondayRow.classList.add("hidden");
      }
    }
    
    if (bulkRow) {
      if (discounts.bulkDiscount > 0) {
        bulkRow.classList.remove("hidden");
      } else {
        bulkRow.classList.add("hidden");
      }
    }
    
    // Helgpåslag ska inte visas som en separat rad - det är redan inkluderat i priset
    if (weekendRow) {
      weekendRow.classList.add("hidden");
    }
    
    // Visa frakt
    if (shippingEl) {
      shippingEl.textContent = Math.round(shipping);
    }
    
    // Beräkna totalt pris (helgpåslag är redan inkluderat i subtotal)
    const total = subtotal - discounts.mondayDiscount - discounts.bulkDiscount + shipping;
    
    if (cartTotalEl) {
      // Ta bort gammal animation-klass om den finns
      cartTotalEl.classList.remove("updated");
      
      // Uppdatera texten
      cartTotalEl.textContent = Math.round(total);
      
      // Trigger reflow för att säkerställa att klassen tas bort innan den läggs till igen
      void cartTotalEl.offsetWidth;
      
      // Lägg till animation-klass
      cartTotalEl.classList.add("updated");
      
      // Ta bort klassen efter animationen är klar
      setTimeout(function() {
        cartTotalEl.classList.remove("updated");
      }, 600);
    }
    
    // Uppdatera betalningsalternativ
    updatePaymentOptions();
    
    // Återställ timer vid aktivitet
    resetInactivityTimer();
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", handleClearCartClick); 
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", handleCheckoutClick);
}

function handleClearCartClick() {
  cart.length = 0; 
  renderCart();
  resetInactivityTimer();
}

function handleClearOrderClick() {
  // Rensa alla produkter, Återställ formulär och Töm kundvagn
  
  // Återställ alla produkter kvantitet till 0
  for (let i = 0; i < PRODUCTS.length; i++) {
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

function handleCheckoutClick() {
  // OM tom så visa en varning annars Visa popup
  
  if (cart.length === 0) {
    alert("kundvagnen är tom!");
    return;
  }

  checkoutPopup.classList.remove("hidden");
}

function closeCheckoutPopup() {
  checkoutPopup.classList.add("hidden");
}

function showThankYouPopup() {
  checkoutPopup.classList.add("hidden");
  thankYouPopup.classList.remove("hidden");
}

function closeThankYouPopup() {
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
    
    let products;
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
   productGrid.innerHTML = filteredProducts.map(renderProductCard).join("");
}
   
function renderProductCard(product) {
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

productGrid.addEventListener("click", handleAddClick); 

function handleAddClick(e) {
    //Hitta produkt, Lägg i kundvagn, Nollställ och Uppdatera
    
    const btn = e.target.closest('button.btn--primary[data-id]');
    if (!btn) return;
    

    const id = btn.getAttribute("data-id");

    const product = findProductById(id);
    if (!product) return;

    const qtyToAdd = product.quantity;
    if (qtyToAdd <= 0) return; 

    // Beräkna pris med helgpåslag om det gäller
    let finalPrice = product.price;
    if (isWeekendSurcharge() && product.category === "donut") {
      finalPrice = product.price * 1.15; // Lägg till 15% på priset
    }
    
    const existing = findCartItemById(id);

    if (existing) {
      existing.quantity += qtyToAdd; 
    } else { 
      cart.push({ 
        id: product.id,
        namn: product.namn,
        price: finalPrice,
        quantity: qtyToAdd 
      });
    }

    product.quantity = 0;

    renderProducts();
    renderCart();
    resetInactivityTimer();
}

function findProductById(id) {
    //Sök igenom lista och Returnera produkt om ID matchar
    
    for (let i = 0; i < PRODUCTS.length; i++) {
       if (String(PRODUCTS[i].id) === String(id)) {
        return PRODUCTS[i];
       }
    }

    return null;
}

function findCartItemById(id) {
    //Sök i kundvagn och Returnera produkt om ID matchar
    
    for (let j = 0; j < cart.length; j++) {
        if (String(cart[j].id) === String(id)) {
          return cart[j];
        }
    }

    return null;
}



function increase(id) {
    // Hitta produkt,Öka kvantitet och Uppdatera
    
    const product = findProductById(id);
    if (!product) return;
    product.quantity++;
    renderProducts();
    resetInactivityTimer();
}

function decrease(id) {
    //  Hitta produkt, Minska kvantitet om > 0 och Uppdatera
    
    const product = findProductById(id);
    if (!product) return;
    if (product.quantity > 0) {
        product.quantity--;
        renderProducts();
        resetInactivityTimer();
    }  
}




window.increase = increase;
window.decrease = decrease;

function sortProducts(type, productsArray) {
  if (!productsArray) {
    productsArray = PRODUCTS;
  }
  
  if (type === "name-asc") {
    productsArray.sort(compareByName);
  }
  if (type === "price-desc") {
    productsArray.sort(compareByPriceDesc);
  }
  
  if (type === "rating-desc") {
    productsArray.sort(compareByRatingDesk);
  }
}

function compareByName(a, b) {
  return a.namn.localeCompare(b.namn);
}

function compareByPriceDesc(a, b) {
  return b.price - a.price;
}

function compareByRatingDesk(a, b) {
  return b.rating - a.rating; 
}

function handlePaymentChange() {
  // Visa personnummerfält om faktura är valt, dölj annars
  
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  
  if (selectedPayment && selectedPayment.value === "invoice") {
    if (invoiceFields) {
      invoiceFields.classList.remove("hidden");
    }
  } else {
    if (invoiceFields) {
      invoiceFields.classList.add("hidden");
    }
  }
  
  resetInactivityTimer();
}

function validatePersonnummer(personnummer) {
  // Validera svenskt personnummer
  let cleaned = personnummer.replace(/[-\s]/g, "");
  
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
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(cleaned[i]);
    const multiplier = (i % 2 === 0) ? 2 : 1;
    const product = digit * multiplier;
    sum += (product > 9) ? product - 9 : product;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(cleaned[9]);
}

if (paymentRadios) {
  for (let i = 0; i < paymentRadios.length; i++) {
    paymentRadios[i].addEventListener("change", handlePaymentChange);
  }
}

if (orderForm) {
  orderForm.addEventListener("submit", handleOrderSubmit);
  
  // Återställ timer vid formulärinteraktion
  const formInputs = orderForm.querySelectorAll("input, textarea, select");
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", resetInactivityTimer);
    formInputs[i].addEventListener("change", resetInactivityTimer);
  }
}

function handleOrderSubmit(e) {
  // Validera formulärfält och personnummer om faktura valt
  
  e.preventDefault();
  
  resetInactivityTimer();

  let isValid = true;
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lasttname");
  const address = document.getElementById("adress");
  const gdpr = document.getElementById("gdpr");
  const selectedPayment = document.querySelector('input[name="payment"]:checked');

  function validate(input, message) {
    const error = input.nextElementSibling;
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
    const personnummerError = personnummerInput.nextElementSibling;
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
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    showThankYouPopup();
  }
}