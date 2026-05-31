const menu = [
  { name: "Set Dosa", price: 90, image: "set-dosa-luxury.png", desc: "Soft dosas with chutney and sambar." },
  { name: "Bisi Bele Bath", price: 120, image: "bisi-bele-bath-luxury.png", desc: "Karnataka rice-lentil comfort bowl." },
  { name: "Lemon Rice", price: 80, image: "lemon-rice-luxury.png", desc: "Bright rice with peanuts and curry leaves." },
  { name: "Masala Dosa", price: 95, image: "masala-dosa-luxury.png", desc: "Crisp dosa with potato masala." },
  { name: "Paneer Butter Masala", price: 180, image: "paneer-butter-masala-luxury.png", desc: "Paneer in silky tomato-butter gravy." },
  { name: "Lassi", price: 60, image: "lassi-luxury.png", desc: "Chilled creamy yogurt drink." }
];

const credentials = {
  customer: { id: "customer@npl.com", password: "customer123" },
  admin: { id: "admin@npl.com", password: "admin123" }
};

const funnyQuotes = [
  "Diet starts tomorrow. Today we feast.",
  "Our dosa is crispier than Monday morning excuses.",
  "Calories do not count inside a luxury lounge.",
  "Good memories are best served with extra chutney.",
  "If happiness had a plate, it would ask for seconds.",
  "Bisi Bele Bath: proof that comfort can be royal.",
  "Life is short. Order the extra lassi."
];

const heroFunnyHeadlines = [
  "Our dosa is so crisp, even your attendance shortage will forget its sadness.",
  "Come hungry. Leave royal. Blame the extra chutney.",
  "When life gives you deadlines, we give you Masala Dosa.",
  "Food so good, your diet will politely resign.",
  "One bite here and your Monday becomes a festival."
];

const welcomeQuotes = [
  "Good memories are best served hot.",
  "Five years of taste, one lounge full of stories.",
  "From Karnataka kitchens to luxury tables.",
  "Grand opening in Bengaluru: 19.06.2026.",
  "Authentic South Indian taste, served with modern elegance."
];

const state = JSON.parse(localStorage.getItem("npl-app-state") || "null") || {
  cart: [],
  orders: [],
  reservations: [],
  auth: { customer: false, admin: false },
  lastReceipt: null,
  lastBillReceipt: null,
  billItems: [
    { name: "Masala Dosa", price: 95, qty: 1 },
    { name: "Paneer Butter Masala", price: 180, qty: 1 }
  ]
};
state.auth ||= { customer: false, admin: false };
state.auth.customer ||= false;
state.auth.admin ||= false;
state.lastReceipt ||= null;
state.lastBillReceipt ||= null;

function save() {
  localStorage.setItem("npl-app-state", JSON.stringify(state));
  renderAll();
}

function rupees(value) {
  return `₹${Math.round(value)}`;
}

function gstFor(subtotal) {
  return Math.round(subtotal * 0.05);
}

function setView(view) {
  document.querySelectorAll(".view").forEach((item) => item.classList.toggle("active", item.id === view));
  document.querySelectorAll("[data-view]").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  const titles = {
    home: "Namana & Preethi's Lounge",
    customer: "Customer Ordering Portal",
    reservation: "Table Reservation System",
    admin: "Admin Management Suite",
    billing: "Namana & Preethi's Lounge Billing"
  };
  document.querySelector("#viewTitle").textContent = titles[view];
  document.body.classList.remove("menu-open");
  renderAuth();
}

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) setView(viewButton.dataset.view);
});

document.querySelector(".mobile-menu").addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

function renderCustomerMenu() {
  document.querySelector("#customerMenu").innerHTML = menu.map((item) => `
    <article class="food-card">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <button class="gold-btn" data-add-cart="${item.name}"><i data-lucide="plus"></i>Add ${rupees(item.price)}</button>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll("[data-login-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const role = form.dataset.loginForm;
    const data = Object.fromEntries(new FormData(form));
    const message = document.querySelector(`[data-login-message="${role}"]`);
    if (data.loginId.trim() === credentials[role].id && data.password === credentials[role].password) {
      state.auth[role] = true;
      if (role === "admin") state.auth.billing = true;
      message.textContent = "Login successful. Welcome to Namana & Preethi's Lounge.";
      save();
      renderAuth();
      return;
    }
    message.textContent = "Wrong login ID or password. Please use the locked demo credentials.";
  });
});

function renderAuth() {
  const customerUnlocked = Boolean(state.auth.customer);
  const adminUnlocked = Boolean(state.auth.admin);
  document.querySelectorAll('[data-lock="customer"]').forEach((item) => item.classList.toggle("active", !customerUnlocked));
  document.querySelectorAll('[data-content="customer"]').forEach((item) => item.classList.toggle("hidden", !customerUnlocked));
  document.querySelectorAll('[data-lock="admin"]').forEach((item) => item.classList.toggle("active", !adminUnlocked));
  document.querySelectorAll('[data-lock="billing"]').forEach((item) => item.classList.toggle("active", !adminUnlocked));
  document.querySelectorAll('[data-content="admin"], [data-content="billing"]').forEach((item) => item.classList.toggle("hidden", !adminUnlocked));
}

document.querySelector("#customerMenu").addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-cart]");
  if (!button) return;
  const item = menu.find((entry) => entry.name === button.dataset.addCart);
  const existing = state.cart.find((entry) => entry.name === item.name);
  if (existing) existing.qty += 1;
  else state.cart.push({ name: item.name, price: item.price, qty: 1 });
  save();
});

function renderCart() {
  document.querySelector("#cartItems").innerHTML = state.cart.length
    ? state.cart.map((item) => `<div class="line-item"><span>${item.name} x ${item.qty}</span><strong>${rupees(item.price * item.qty)}</strong></div>`).join("")
    : `<p class="eyebrow">Cart is empty</p>`;
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = gstFor(subtotal);
  document.querySelector("#cartSubtotal").textContent = rupees(subtotal);
  document.querySelector("#cartGst").textContent = rupees(gst);
  document.querySelector("#cartTotal").textContent = rupees(subtotal + gst);
  renderCustomerReceipt();
}

document.querySelector("#checkoutBtn").addEventListener("click", () => {
  if (!state.cart.length) return;
  const form = document.querySelector("#deliveryForm");
  if (!form.reportValidity()) return;
  const delivery = Object.fromEntries(new FormData(form));
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + gstFor(subtotal);
  const receipt = {
    id: `ORD-${Date.now().toString().slice(-5)}`,
    type: "Online Food Order",
    customer: delivery.customerName.trim(),
    mobile: delivery.mobile.trim(),
    location: delivery.location.trim(),
    items: [...state.cart],
    subtotal,
    gst: gstFor(subtotal),
    total,
    time: new Date().toLocaleString()
  };
  state.orders.unshift(receipt);
  state.lastReceipt = receipt;
  state.cart = [];
  form.reset();
  save();
  document.querySelector("#orderMessage").textContent = "Thank you for ordering from Namana & Preethi's Lounge. Your receipt is confirmed and our lounge team is preparing your food.";
});

function renderCustomerReceipt() {
  const receipt = state.lastReceipt;
  const card = document.querySelector("#customerReceipt");
  if (!receipt) {
    card.classList.add("hidden");
    document.querySelector("#orderMessage").textContent = "";
    return;
  }
  card.classList.remove("hidden");
  document.querySelector("#receiptId").textContent = receipt.id;
  document.querySelector("#receiptDetails").textContent = `${receipt.customer}, your order total is ${rupees(receipt.total)}. Delivery location: ${receipt.location}. Thank you for ordering.`;
}

document.querySelector("#reservationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  state.reservations.unshift({ ...data, id: `RSV-${Date.now().toString().slice(-5)}` });
  event.currentTarget.reset();
  save();
});

function renderReservations() {
  document.querySelector("#reservationList").innerHTML = state.reservations.length
    ? state.reservations.map((item) => `<div class="record"><span><strong>${item.name}</strong><br>${item.mobile} | ${item.date} ${item.time} | ${item.guests} guests</span><b>${item.occasion}</b></div>`).join("")
    : `<p class="eyebrow">No reservations yet</p>`;
}

function renderOrders() {
  document.querySelector("#orderList").innerHTML = state.orders.length
    ? state.orders.map((order) => `<div class="record"><span><strong>${order.id}</strong> ${order.type ? `<em>${order.type}</em>` : ""}<br>${order.customer ? `${order.customer} | ${order.mobile || ""}<br>` : ""}${order.location ? `Location: ${order.location}<br>` : ""}${order.items.map((i) => `${i.name} x ${i.qty}`).join(", ")}<br>${order.time}</span><b>${rupees(order.total)}</b></div>`).join("")
    : `<p class="eyebrow">No orders yet</p>`;
}

function renderMetrics() {
  const revenue = state.orders.reduce((sum, order) => sum + order.total, 0);
  ["metricOrders", "adminOrders"].forEach((id) => document.querySelector(`#${id}`).textContent = state.orders.length);
  ["metricReservations", "adminBookings"].forEach((id) => document.querySelector(`#${id}`).textContent = state.reservations.length);
  ["metricRevenue", "adminRevenue"].forEach((id) => document.querySelector(`#${id}`).textContent = rupees(revenue));
}

function renderBill() {
  document.querySelector("#billRows").innerHTML = state.billItems.map((item, index) => `
    <div class="line-item"><span>${item.name} x ${item.qty}</span><strong>${rupees(item.price * item.qty)}</strong></div>
  `).join("");
  const subtotal = state.billItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = gstFor(subtotal);
  document.querySelector("#billSubtotal").textContent = rupees(subtotal);
  document.querySelector("#billGst").textContent = rupees(gst);
  document.querySelector("#billTotal").textContent = rupees(subtotal + gst);
  const billMeta = document.querySelector("#billReceiptMeta");
  const billConfirm = document.querySelector("#billConfirm");
  if (state.lastBillReceipt) {
    billMeta.textContent = `${state.lastBillReceipt.id} | ${state.lastBillReceipt.time}`;
    billConfirm.textContent = `Receipt confirmed for ${state.lastBillReceipt.customer}. Total paid: ${rupees(state.lastBillReceipt.total)}. Thank you for dining with us.`;
  } else {
    billMeta.textContent = "Receipt preview ready";
    billConfirm.textContent = "Receipt confirmation will appear here after billing.";
  }
}

document.querySelector("#addBillItem").addEventListener("click", () => {
  const form = document.querySelector("#billingForm");
  const data = Object.fromEntries(new FormData(form));
  const name = data.item.trim();
  const price = Number(data.price);
  const qty = Math.max(Number(data.qty || 1), 1);
  if (!name || !price) return;
  state.billItems.push({ name, price, qty });
  form.elements.item.value = "";
  form.elements.price.value = "";
  form.elements.qty.value = "1";
  save();
});

document.querySelector("#saveBill").addEventListener("click", () => {
  const subtotal = state.billItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (!state.billItems.length) return;
  const form = document.querySelector("#billingForm");
  const data = Object.fromEntries(new FormData(form));
  const receipt = {
    id: `BILL-${Date.now().toString().slice(-5)}`,
    type: "Counter Billing Receipt",
    customer: data.customer.trim() || "Guest Customer",
    mobile: data.mobile.trim(),
    items: [...state.billItems],
    subtotal,
    gst: gstFor(subtotal),
    total: subtotal + gstFor(subtotal),
    time: new Date().toLocaleString()
  };
  state.orders.unshift(receipt);
  state.lastBillReceipt = receipt;
  state.billItems = [];
  save();
  document.querySelector("#billConfirm").textContent = `Receipt confirmed for ${receipt.customer}. Total paid: ${rupees(receipt.total)}. Thank you for dining with Namana & Preethi's Lounge.`;
});

document.querySelector("#resetDemo").addEventListener("click", () => {
  localStorage.removeItem("npl-app-state");
  location.reload();
});

function renderAll() {
  renderCustomerMenu();
  renderCart();
  renderReservations();
  renderOrders();
  renderMetrics();
  renderBill();
  renderAuth();
  if (window.lucide) window.lucide.createIcons();
}

function applyTheme(mode) {
  const isLight = mode === "light";
  document.body.classList.toggle("light-mode", isLight);
  const toggle = document.querySelector("#themeToggle");
  if (toggle) {
    toggle.innerHTML = `<i data-lucide="${isLight ? "moon" : "sun"}"></i><span>${isLight ? "Dark Mode" : "White Mode"}</span>`;
  }
  localStorage.setItem("npl-theme", isLight ? "light" : "dark");
  if (window.lucide) window.lucide.createIcons();
}

document.querySelector("#themeToggle").addEventListener("click", () => {
  applyTheme(document.body.classList.contains("light-mode") ? "dark" : "light");
});

function startQuoteSlides() {
  let index = 0;
  const funny = document.querySelector("#funnyQuote");
  const heroHeadline = document.querySelector("#heroFunnyHeadline");
  const welcome = document.querySelector("#welcomeQuote");
  const rotate = () => {
    if (funny) funny.textContent = funnyQuotes[index % funnyQuotes.length];
    if (heroHeadline) heroHeadline.textContent = heroFunnyHeadlines[index % heroFunnyHeadlines.length];
    if (welcome) welcome.textContent = welcomeQuotes[index % welcomeQuotes.length];
    index += 1;
  };
  rotate();
  setInterval(rotate, 4000);
}

function startWelcome() {
  const screen = document.querySelector("#welcomeScreen");
  const timer = document.querySelector("#welcomeTimer");
  const enter = document.querySelector("#enterApp");
  let seconds = 10;
  const close = () => {
    screen.classList.add("hide");
    setTimeout(() => screen.remove(), 650);
  };
  const tick = setInterval(() => {
    seconds -= 1;
    if (timer) timer.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(tick);
      close();
    }
  }, 1000);
  enter.addEventListener("click", () => {
    clearInterval(tick);
    close();
  });
}

renderAll();
applyTheme(localStorage.getItem("npl-theme") || "dark");
startQuoteSlides();
startWelcome();
setView("home");
