const menuData = {
  south: [
    ["Idli", "Soft steamed rice cakes served with aromatic sambar and coconut chutney.", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=85"],
    ["Vada", "Golden lentil fritters with a crisp edge, fluffy center, and classic chutneys.", "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=85"],
    ["Masala Dosa", "Paper-crisp dosa wrapped around spiced potato masala and served hot.", "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=85"],
    ["Plain Dosa", "A refined classic: crisp, light, and made for sambar and chutney.", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85"],
    ["Set Dosa", "Soft stacked dosas with a gentle tang and warm, comforting texture.", "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=85"],
    ["Onion Dosa", "Crisp dosa layered with caramelized onion notes and fragrant spices.", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85"],
    ["Rava Dosa", "Delicate semolina dosa with lace-like crunch and peppery aroma.", "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=85"],
    ["Poori", "Puffed golden breads paired with gently spiced potato curry.", "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=85"],
    ["Pongal", "Creamy rice and lentils finished with ghee, pepper, cumin, and cashews.", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85"],
    ["Upma", "Savory semolina with vegetables, curry leaves, and roasted cashew accents.", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85"],
    ["Bisi Bele Bath", "Karnataka-style rice, lentils, vegetables, and spice blend in one rich bowl.", "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=85"],
    ["Lemon Rice", "Bright turmeric rice with lemon, peanuts, curry leaves, and mild spice.", "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=85"],
    ["Curd Rice", "Cool, creamy rice tempered with mustard, curry leaves, and comfort.", "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=85"],
    ["South Indian Meals", "A generous traditional plate with rice, sambar, rasam, curries, and sweets.", "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=85"]
  ],
  north: [
    ["Roti", "Soft whole-wheat Indian bread served warm for comforting pairings.", "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85"],
    ["Butter Naan", "Tandoor-style naan brushed with butter and served pillowy soft.", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"],
    ["Paneer Butter Masala", "Paneer cubes in a silky tomato-butter gravy with restaurant-style finish.", "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85"],
    ["Dal Fry", "Yellow lentils tempered with ghee, cumin, garlic, and fresh coriander.", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85"],
    ["Dal Tadka", "Comforting dal finished with a smoky, aromatic tadka.", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85"],
    ["Chana Masala", "Chickpeas simmered in a bold masala with tangy North Indian flavor.", "https://images.unsplash.com/photo-1601050690117-64b6f424d496?auto=format&fit=crop&w=900&q=85"],
    ["Veg Kolhapuri", "Vegetables in a bold, spicy Kolhapuri gravy with a luxurious finish.", "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85"],
    ["Jeera Rice", "Aromatic basmati rice tossed with toasted cumin and light ghee.", "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=85"],
    ["Veg Biryani", "Fragrant rice layered with vegetables, spices, herbs, and slow-cooked aroma.", "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85"],
    ["Gobi Manchurian", "Crisp cauliflower tossed in a glossy Indo-Chinese sauce.", "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=85"],
    ["North Indian Thali", "A complete plate of breads, curries, rice, dal, accompaniments, and dessert.", "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=85"]
  ],
  beverages: [
    ["Tea", "Freshly brewed Indian tea with warming spice and a smooth finish.", "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=85"],
    ["Coffee", "Rich, aromatic coffee served warm for easy conversations.", "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85"],
    ["Lime Juice", "A crisp citrus refresher balanced with sweetness and sparkle.", "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=85"],
    ["Badam Milk", "Creamy almond milk infused with saffron notes and gentle sweetness.", "https://images.unsplash.com/photo-1600788907416-456578634209?auto=format&fit=crop&w=900&q=85"],
    ["Lassi", "Smooth yogurt drink served chilled with a classic creamy body.", "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=900&q=85"],
    ["Soft Drinks", "Chilled favorites for quick refreshment alongside every meal.", "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=900&q=85"]
  ]
};

const exactFoodImages = {
  "Idli": "https://commons.wikimedia.org/wiki/Special:FilePath/Idli_Sambar.JPG",
  "Vada": "https://commons.wikimedia.org/wiki/Special:FilePath/Medu_Vadas.JPG",
  "Masala Dosa": "https://commons.wikimedia.org/wiki/Special:FilePath/Rameshwaram_Cafe_Dosa.jpg",
  "Plain Dosa": "https://commons.wikimedia.org/wiki/Special:FilePath/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg",
  "Set Dosa": "set-dosa-luxury.png",
  "Onion Dosa": "https://loremflickr.com/900/650/onion,dosa,south,indian,food?lock=4102",
  "Rava Dosa": "https://commons.wikimedia.org/wiki/Special:FilePath/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg",
  "Poori": "https://commons.wikimedia.org/wiki/Special:FilePath/Fluffy_Poori_%28cropped%29.JPG",
  "Pongal": "https://commons.wikimedia.org/wiki/Special:FilePath/Ven_pongal_with_sambar_and_chutney.jpg",
  "Upma": "https://commons.wikimedia.org/wiki/Special:FilePath/A_photo_of_Upma.jpg",
  "Bisi Bele Bath": "bisi-bele-bath-luxury.png",
  "Lemon Rice": "lemon-rice-luxury.png",
  "Curd Rice": "https://loremflickr.com/900/650/curd,rice,indian,food?lock=4105",
  "South Indian Meals": "https://commons.wikimedia.org/wiki/Special:FilePath/South_Indian_Meals.jpg",
  "Roti": "https://commons.wikimedia.org/wiki/Special:FilePath/Chapati_being_made_in_a_pan.jpg",
  "Butter Naan": "https://loremflickr.com/900/650/butter,naan,indian,bread?lock=4106",
  "Paneer Butter Masala": "https://commons.wikimedia.org/wiki/Special:FilePath/Paneer_Butter_Masala.jpg",
  "Dal Fry": "https://loremflickr.com/900/650/dal,fry,indian,food?lock=4107",
  "Dal Tadka": "https://loremflickr.com/900/650/dal,tadka,indian,food?lock=4108",
  "Chana Masala": "https://commons.wikimedia.org/wiki/Special:FilePath/Chana_masala.jpg",
  "Veg Kolhapuri": "https://loremflickr.com/900/650/veg,kolhapuri,indian,curry?lock=4109",
  "Jeera Rice": "https://loremflickr.com/900/650/jeera,rice,indian,food?lock=4110",
  "Veg Biryani": "https://loremflickr.com/900/650/vegetable,biryani,indian,rice?lock=4115",
  "Gobi Manchurian": "https://loremflickr.com/900/650/gobi,manchurian,indian,food?lock=4111",
  "North Indian Thali": "https://commons.wikimedia.org/wiki/Special:FilePath/Indian_Thali.jpg",
  "Tea": "https://commons.wikimedia.org/wiki/Special:FilePath/Masala_Chai.JPG",
  "Coffee": "https://commons.wikimedia.org/wiki/Special:FilePath/Latte_and_dark_coffee.jpg",
  "Lime Juice": "https://loremflickr.com/900/650/lime,juice,drink?lock=4112",
  "Badam Milk": "https://loremflickr.com/900/650/badam,milk,almond,drink?lock=4113",
  "Lassi": "https://commons.wikimedia.org/wiki/Special:FilePath/Lassi_sweet.jpg",
  "Soft Drinks": "https://loremflickr.com/900/650/soft,drink,cold,beverage?lock=4114"
};

function fallbackDishImage(name) {
  return `https://placehold.co/900x650/2d170d/f1d28a?text=${encodeURIComponent(name)}`;
}

const galleryImages = [
  ["Restaurant Interiors", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"],
  ["Dining Tables", "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"],
  ["Premium Food", "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=85"],
  ["Family Dining", "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85"],
  ["South Indian Cuisine", "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=1200&q=85"],
  ["North Indian Cuisine", "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=85"],
  ["Celebration Plates", "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85"],
  ["Dessert Moment", "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85"]
];

const loader = document.querySelector(".loader");
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const heroSlides = [...document.querySelectorAll(".hero-bg")];
const quoteSlides = [...document.querySelectorAll(".quote-slide")];
const menuGrid = document.querySelector("#menuGrid");
const galleryGrid = document.querySelector("#galleryGrid");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const reservationForm = document.querySelector(".reservation-card");
const reservationNote = document.querySelector(".reservation-note");
const orderTotal = document.querySelector("#orderTotal");
const orderNote = document.querySelector("#orderNote");
const billingForm = document.querySelector(".billing-system");
const billSubtotal = document.querySelector("#billSubtotal");
const billGst = document.querySelector("#billGst");
const billTotal = document.querySelector("#billTotal");
const billNote = document.querySelector(".bill-note");
const addItemButton = document.querySelector(".add-item-button");
let currentOrderTotal = 0;
let currentOrderItems = [];

function finishLoading() {
  loader.classList.add("hidden");
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.addEventListener("DOMContentLoaded", () => setTimeout(finishLoading, 700));
window.addEventListener("load", () => setTimeout(finishLoading, 250));
setTimeout(finishLoading, 2200);

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-portal-target]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const target = trigger.dataset.portalTarget;
    activatePortal(target);
  });
});

function activatePortal(target) {
  document.querySelectorAll("[data-portal-card]").forEach((card) => {
    card.classList.toggle("active", card.dataset.portalCard === target);
  });
  document.querySelectorAll("[data-portal-target]").forEach((item) => {
    item.classList.toggle("active", item.dataset.portalTarget === target);
  });
}

function updateBill() {
  const checkedItems = [...document.querySelectorAll("[data-bill-item]:checked")];
  const subtotal = checkedItems.reduce((sum, item) => {
    const price = Number(item.dataset.billPrice);
    const qty = Number(item.dataset.billQty || 1);
    return sum + price * qty;
  }, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  billSubtotal.textContent = `₹${subtotal}`;
  billGst.textContent = `₹${gst}`;
  billTotal.textContent = `₹${total}`;
  return { checkedItems, subtotal, gst, total };
}

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(reservationForm);
  const guestName = form.get("name") || "Guest";
  const guests = form.get("guests") || "2 Guests";
  reservationNote.textContent = `${guestName}, your ${guests.toString().toLowerCase()} table request has been received with luxury priority.`;
});

document.querySelectorAll(".portal-login").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isAdmin = form.classList.contains("admin-login");
    const card = form.closest("[data-portal-card]");
    const existing = card.querySelector(".login-note");
    if (existing) existing.remove();
    const note = document.createElement("p");
    note.className = "order-note login-note";
    note.textContent = isAdmin
      ? "Admin suite unlocked for preview: reservations, orders, menu and gallery controls are ready."
      : "Customer lounge unlocked for preview: you can reserve tables and place online food orders.";
    form.after(note);
  });
});

document.querySelectorAll("[data-order-name]").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.orderName;
    const price = Number(button.dataset.orderPrice);
    currentOrderTotal += price;
    currentOrderItems.push(name);
    orderTotal.textContent = `₹${currentOrderTotal}`;
    orderNote.textContent = `Added ${name}. Order: ${currentOrderItems.join(", ")}.`;
    activatePortal("customer");
  });
});

document.querySelectorAll("[data-bill-item]").forEach((item) => {
  item.addEventListener("change", updateBill);
});

addItemButton.addEventListener("click", () => {
  const form = new FormData(billingForm);
  const name = String(form.get("newBillItem") || "").trim();
  const price = Number(form.get("newBillPrice"));
  const qty = Math.max(Number(form.get("newBillQty") || 1), 1);

  if (!name || !price || price < 1) {
    billNote.textContent = "Enter item name and price to add it to the bill.";
    return;
  }

  const row = document.createElement("label");
  const lineTotal = price * qty;
  row.innerHTML = `
    <input type="checkbox" data-bill-item="${name}" data-bill-price="${price}" data-bill-qty="${qty}" checked />
    <span>${name} × ${qty}</span>
    <strong>₹${lineTotal}</strong>
  `;
  billingForm.querySelector(".bill-items").append(row);
  row.querySelector("[data-bill-item]").addEventListener("change", updateBill);
  billingForm.elements.newBillItem.value = "";
  billingForm.elements.newBillPrice.value = "";
  billingForm.elements.newBillQty.value = "1";
  billNote.textContent = `${name} added to the bill.`;
  updateBill();
});

billingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(billingForm);
  const name = form.get("billCustomer") || "Customer";
  const mobile = form.get("billMobile") || "mobile number";
  const bill = updateBill();
  const items = bill.checkedItems
    .map((item) => `${item.dataset.billItem} × ${item.dataset.billQty || 1}`)
    .join(", ") || "No items";
  billNote.textContent = `Bill generated for ${name} (${mobile}) - ${items}. Grand total ${billTotal.textContent} including GST.`;
});

let heroIndex = 0;
let quoteIndex = 0;

setInterval(() => {
  heroSlides[heroIndex].classList.remove("active");
  heroIndex = (heroIndex + 1) % heroSlides.length;
  heroSlides[heroIndex].classList.add("active");
}, 5000);

setInterval(() => {
  quoteSlides[quoteIndex].classList.remove("active");
  quoteIndex = (quoteIndex + 1) % quoteSlides.length;
  quoteSlides[quoteIndex].classList.add("active");
}, 5000);

function starMarkup() {
  return Array.from({ length: 5 }, () => '<i data-lucide="star"></i>').join("");
}

function renderMenu(category) {
  menuGrid.innerHTML = menuData[category]
    .map(([name, description, originalImage], index) => {
      const image = exactFoodImages[name] || originalImage;
      return `
      <article class="menu-card reveal" style="transition-delay:${Math.min(index * 35, 280)}ms">
        <div class="food-photo">
          <img src="${image}" alt="${name}" loading="eager" onerror="this.onerror=null;this.src='${fallbackDishImage(name)}';">
          <span>${name}</span>
        </div>
        <div class="menu-card-body">
          <h3>${name}</h3>
          <p>${description}</p>
          <div class="stars" aria-label="Five star rating">${starMarkup()}</div>
        </div>
      </article>
    `;
    })
    .join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
  observeReveals();
}

document.querySelectorAll(".menu-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".menu-tab").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderMenu(tab.dataset.category);
  });
});

galleryGrid.innerHTML = galleryImages
  .map(([title, image]) => `
    <button class="gallery-item reveal" type="button" data-title="${title}" data-image="${image}">
      <img src="${image}" alt="${title}" loading="lazy">
    </button>
  `)
  .join("");

galleryGrid.addEventListener("click", (event) => {
  const item = event.target.closest(".gallery-item");
  if (!item) return;
  lightboxImg.src = item.dataset.image;
  lightboxImg.alt = item.dataset.title;
  lightbox.classList.add("open");
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function observeReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach((element) => {
    revealObserver.observe(element);
  });
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const number = entry.target.querySelector("[data-count]");
      const target = Number(number.dataset.count);
      const duration = 1300;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        number.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      statObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll(".stat").forEach((stat) => statObserver.observe(stat));
renderMenu("south");
updateBill();
activatePortal("welcome");
observeReveals();
