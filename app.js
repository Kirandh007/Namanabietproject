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

const ownerEmail = "namanapreethi.lounge@gmail.com";

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
  customers: [],
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
state.customers ||= [];
state.lastReceipt ||= null;
state.lastBillReceipt ||= null;

let autoLocationRequested = false;
let lastNotifiedOrderId = state.orders[0]?.id || null;

function enhanceRealtimeUi() {
  const topActions = document.querySelector(".top-actions");
  if (topActions && !document.querySelector("#topCartCount")) {
    const customerButton = topActions.querySelector('[data-view="customer"]');
    customerButton?.insertAdjacentHTML("afterend", `
      <button class="ghost-btn cart-top-btn" data-view="customer" type="button"><i data-lucide="shopping-cart"></i>Cart <span id="topCartCount">0</span></button>
    `);
  }
  const deliveryForm = document.querySelector("#deliveryForm");
  if (deliveryForm && !deliveryForm.querySelector('[name="address"]')) {
    const locationLabel = deliveryForm.querySelector('[name="location"]')?.closest("label");
    if (locationLabel) {
      locationLabel.insertAdjacentHTML("beforebegin", `
        <label class="full-span">Full Address<textarea name="address" required placeholder="House / hostel / department / street address"></textarea></label>
        <label>Nearby Place<input name="nearby" required placeholder="Near library, hostel, canteen..." /></label>
        <label>Area<input name="area" required placeholder="Auto-detected area or type manually" /></label>
      `);
      locationLabel.classList.add("full-span");
      locationLabel.firstChild.textContent = "Google Location";
    }
  }
  const orderPanel = document.querySelector("#orderList")?.closest(".record-panel");
  if (orderPanel && !document.querySelector("#liveAlert")) {
    const heading = orderPanel.querySelector("h3");
    if (heading) {
      heading.insertAdjacentHTML("beforebegin", `
        <div class="live-head">
          <div><p class="eyebrow">Real Time Information</p><h3>Recent Orders</h3></div>
          <button class="ghost-btn" id="enableNotify" type="button"><i data-lucide="bell-ring"></i>Enable Alerts</button>
        </div>
        <div class="live-alert" id="liveAlert">Waiting for the next customer order...</div>
      `);
      heading.remove();
    }
  }
  if (!document.querySelector("#realtimeStyles")) {
    document.head.insertAdjacentHTML("beforeend", `<style id="realtimeStyles">
      .delivery-form{grid-template-columns:repeat(2,minmax(0,1fr))}
      .delivery-form .full-span,.delivery-form .map-btn{grid-column:1/-1}
      .live-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:14px}
      .live-head h3{margin-top:4px}.live-alert{margin-bottom:14px;padding:14px;border:1px solid rgba(241,210,138,.28);border-radius:8px;color:var(--gold-light);background:linear-gradient(135deg,rgba(214,168,79,.16),rgba(117,31,42,.14));font-weight:850;line-height:1.5;animation:rise .35s ease both}.live-alert strong{color:var(--cream)}
      .cart-top-btn span{min-width:26px;min-height:26px;display:inline-grid;place-items:center;padding:0 7px;border-radius:999px;color:#180b05;background:var(--gold-light);font-size:.78rem;line-height:1}body.light-mode .cart-top-btn span{color:#fffaf0;background:#7b4b10}.welcome-screen{overflow-y:auto;overscroll-behavior:contain}.welcome-content{max-height:calc(100dvh - 48px);overflow-y:auto}.welcome-content h1{font-size:clamp(2.4rem,6vw,5.8rem);line-height:.96}.food-card-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0}.food-card-footer strong{color:var(--gold-light);font-family:Cinzel,serif;font-size:1.05rem}.qty-stepper{display:inline-grid;grid-template-columns:38px 44px 38px;align-items:center;min-width:120px;border:1px solid rgba(241,210,138,.28);border-radius:999px;overflow:hidden;background:rgba(5,3,2,.32)}.qty-stepper span{display:grid;place-items:center;min-height:38px;color:var(--cream);font-weight:950}.qty-btn{width:38px!important;min-width:38px;height:38px;min-height:38px;padding:0;border:0;border-radius:0;color:var(--cream);background:rgba(255,244,221,.08)}.qty-btn svg{width:17px;height:17px}.qty-btn.gold-mini{color:#180b05;background:linear-gradient(135deg,var(--gold-light),var(--gold))}body.light-mode .qty-stepper{background:rgba(255,255,255,.55)}body.light-mode .qty-btn.gold-mini{color:#fffaf0;background:linear-gradient(135deg,#7b4b10,#bf8b35)}.cart-line{align-items:center}.cart-line small{display:block;margin-top:3px;color:var(--muted);font-size:.78rem;font-weight:800}.cart-line-actions{display:flex;align-items:center;justify-content:flex-end;gap:10px}.qty-stepper.compact{grid-template-columns:34px 36px 34px;min-width:104px}.qty-stepper.compact span,.qty-stepper.compact .qty-btn{min-height:34px;height:34px}.qty-stepper.compact .qty-btn{width:34px!important;min-width:34px}
      @media(max-width:680px){.delivery-form{grid-template-columns:1fr}.live-head{align-items:stretch;flex-direction:column}.food-card-footer{align-items:stretch;flex-direction:column}.qty-stepper{width:100%;grid-template-columns:1fr 1fr 1fr}.qty-btn{width:100%!important}.cart-line-actions{align-items:stretch;justify-content:stretch;flex-direction:column}.qty-stepper.compact{width:100%;grid-template-columns:1fr 1fr 1fr}.welcome-content{max-height:calc(100dvh - 24px);overflow:auto}.welcome-content h1{font-size:clamp(1.75rem,9.2vw,2.65rem);line-height:1.05}}
    </style>`);
  }
}

enhanceRealtimeUi();

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

function getCartQty(name) {
  return state.cart.find((entry) => entry.name === name)?.qty || 0;
}

function cartTotalQty() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

function changeCartQty(name, change) {
  const item = menu.find((entry) => entry.name === name);
  if (!item) return;
  const existing = state.cart.find((entry) => entry.name === name);
  if (!existing && change > 0) {
    state.cart.push({ name: item.name, price: item.price, qty: change });
    save();
    return;
  }
  if (!existing) return;
  existing.qty += change;
  if (existing.qty <= 0) {
    state.cart = state.cart.filter((entry) => entry.name !== name);
  }
  save();
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
  if (view === "customer") requestGoogleLocation(true);
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
        <div class="food-card-footer">
          <strong>${rupees(item.price)}</strong>
          <div class="qty-stepper" aria-label="${item.name} quantity">
            <button class="qty-btn" data-cart-dec="${item.name}" type="button" aria-label="Remove one ${item.name}"><i data-lucide="minus"></i></button>
            <span>${getCartQty(item.name)}</span>
            <button class="qty-btn gold-mini" data-cart-inc="${item.name}" type="button" aria-label="Add one ${item.name}"><i data-lucide="plus"></i></button>
          </div>
        </div>
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
    const registeredCustomer = role === "customer"
      ? state.customers.find((customer) => customer.email.toLowerCase() === data.loginId.trim().toLowerCase() && customer.password === data.password)
      : null;
    if ((data.loginId.trim() === credentials[role].id && data.password === credentials[role].password) || registeredCustomer) {
      state.auth[role] = true;
      if (role === "admin") state.auth.billing = true;
      message.textContent = registeredCustomer
        ? `Login successful. Welcome ${registeredCustomer.name}.`
        : "Login successful. Welcome to Namana & Preethi's Lounge.";
      save();
      renderAuth();
      return;
    }
    message.textContent = "Wrong login ID or password. Please use the locked demo credentials.";
  });
});

document.querySelector("#customerRegisterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  const message = document.querySelector("#registerMessage");
  if (data.password !== data.confirmPassword) {
    message.textContent = "Password and confirm password do not match.";
    return;
  }
  const exists = state.customers.some((customer) => customer.email.toLowerCase() === data.email.trim().toLowerCase() || customer.mobile === data.mobile.trim());
  if (exists) {
    message.textContent = "This email or mobile number is already registered. Please login with your registered details.";
    return;
  }
  const customer = {
    id: `CUS-${Date.now().toString().slice(-5)}`,
    name: data.name.trim(),
    mobile: data.mobile.trim(),
    email: data.email.trim(),
    password: data.password,
    message: data.message.trim(),
    time: new Date().toLocaleString()
  };
  state.customers.unshift(customer);
  state.auth.customer = true;
  save();
  const subject = encodeURIComponent(`New customer registration - ${customer.name}`);
  const body = encodeURIComponent([
    `Customer ID: ${customer.id}`,
    `Name: ${customer.name}`,
    `Mobile: ${customer.mobile}`,
    `Email: ${customer.email}`,
    `Issue / Message: ${customer.message}`,
    "",
    "Security note: customer password is not sent by email. It is created for login in this demo."
  ].join("\n"));
  const mailLink = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  message.innerHTML = `Registration successful. Your customer login is your email ID. <a href="${mailLink}">Send issue message to lounge email</a>`;
  form.reset();
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

document.addEventListener("click", (event) => {
  const inc = event.target.closest("[data-cart-inc]");
  const dec = event.target.closest("[data-cart-dec]");
  if (!inc && !dec) return;
  changeCartQty((inc || dec).dataset.cartInc || (inc || dec).dataset.cartDec, inc ? 1 : -1);
});

async function fillAreaFromCoordinates(latitude, longitude) {
  const areaField = document.querySelector('#deliveryForm [name="area"]');
  const nearbyField = document.querySelector('#deliveryForm [name="nearby"]');
  const message = document.querySelector("#orderMessage");
  if (!areaField) return;
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    const address = data.address || {};
    const area = address.suburb || address.neighbourhood || address.quarter || address.city_district || address.city || address.town || address.village || data.display_name;
    const nearby = address.road || address.amenity || address.building || address.college || address.university || "";
    if (area && !areaField.value.trim()) areaField.value = area;
    if (nearby && nearbyField && !nearbyField.value.trim()) nearbyField.value = nearby;
  } catch {
    if (message) message.textContent = "Google location added. Area auto-detect needs internet, so please type area manually if it is blank.";
  }
}

function requestGoogleLocation(isAuto = false) {
  const locationField = document.querySelector('#deliveryForm [name="location"]');
  const mapLink = document.querySelector("#openGoogleMaps");
  const message = document.querySelector("#orderMessage");
  if (isAuto) {
    if (autoLocationRequested || locationField.value.trim()) return;
    autoLocationRequested = true;
  }
  if (!navigator.geolocation) {
    message.textContent = "Google location is not supported in this browser. Please paste your Google Maps link or type your address.";
    return;
  }
  message.textContent = isAuto
    ? "Please allow location permission so we can auto-detect your delivery location."
    : "Getting your Google location. Please allow location permission.";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      locationField.value = mapsUrl;
      mapLink.href = mapsUrl;
      mapLink.textContent = "Open Your Google Location";
      fillAreaFromCoordinates(latitude, longitude);
      message.textContent = "Google location added successfully. Area and nearby place will auto-fill if available.";
    },
    () => {
      message.textContent = "Location permission was blocked. Open Google Maps, copy your location link, and paste it in the delivery location box.";
      mapLink.href = "https://www.google.com/maps";
      mapLink.textContent = "Open Google Maps";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

document.querySelector("#useGoogleLocation").addEventListener("click", () => {
  requestGoogleLocation(false);
});

function renderCart() {
  document.querySelector("#cartItems").innerHTML = state.cart.length
    ? state.cart.map((item) => `
      <div class="line-item cart-line">
        <span>${item.name}<small>${rupees(item.price)} each</small></span>
        <div class="cart-line-actions">
          <div class="qty-stepper compact" aria-label="${item.name} cart quantity">
            <button class="qty-btn" data-cart-dec="${item.name}" type="button" aria-label="Remove one ${item.name}"><i data-lucide="minus"></i></button>
            <span>${item.qty}</span>
            <button class="qty-btn gold-mini" data-cart-inc="${item.name}" type="button" aria-label="Add one ${item.name}"><i data-lucide="plus"></i></button>
          </div>
          <strong>${rupees(item.price * item.qty)}</strong>
        </div>
      </div>
    `).join("")
    : `<p class="eyebrow">Cart is empty</p>`;
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = gstFor(subtotal);
  document.querySelector("#cartSubtotal").textContent = rupees(subtotal);
  document.querySelector("#cartGst").textContent = rupees(gst);
  document.querySelector("#cartTotal").textContent = rupees(subtotal + gst);
  const topCartCount = document.querySelector("#topCartCount");
  if (topCartCount) topCartCount.textContent = cartTotalQty();
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
    address: delivery.address.trim(),
    nearby: delivery.nearby.trim(),
    area: delivery.area.trim(),
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
  triggerLiveOrderAlert(receipt);
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
  document.querySelector("#receiptDetails").textContent = `${receipt.customer}, your order total is ${rupees(receipt.total)}. Delivery: ${receipt.address}, ${receipt.nearby}, ${receipt.area}. Google location: ${receipt.location}. Thank you for ordering.`;
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
    ? state.orders.map((order) => `<div class="record"><span><strong>${order.id}</strong> ${order.type ? `<em>${order.type}</em>` : ""}<br>${order.customer ? `${order.customer} | ${order.mobile || ""}<br>` : ""}${order.address ? `Address: ${order.address}<br>` : ""}${order.nearby ? `Nearby: ${order.nearby}<br>` : ""}${order.area ? `Area: ${order.area}<br>` : ""}${order.location ? `Google Location: ${order.location}<br>` : ""}${order.items.map((i) => `${i.name} x ${i.qty}`).join(", ")}<br>${order.time}</span><b>${rupees(order.total)}</b></div>`).join("")
    : `<p class="eyebrow">No orders yet</p>`;
}

function renderLiveAlert() {
  const alert = document.querySelector("#liveAlert");
  if (!alert) return;
  const latest = state.orders[0];
  if (!latest) {
    alert.textContent = "Waiting for the next customer order...";
    return;
  }
  alert.innerHTML = `<strong>New order live:</strong> ${latest.id} from ${latest.customer || "Guest"} | ${latest.mobile || "No mobile"} | ${latest.area || "Area pending"} | ${rupees(latest.total)}`;
}

function triggerLiveOrderAlert(order) {
  lastNotifiedOrderId = order.id;
  renderLiveAlert();
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("New Namana & Preethi's Lounge order", {
      body: `${order.customer} ordered ${order.items.map((item) => item.name).join(", ")}. Total ${rupees(order.total)}.`,
      tag: order.id
    });
  }
}

document.addEventListener("click", async (event) => {
  if (!event.target.closest("#enableNotify")) return;
  const alert = document.querySelector("#liveAlert");
  if (!("Notification" in window)) {
    alert.textContent = "Browser notifications are not supported here. Keep the Admin Suite open for live order alerts.";
    return;
  }
  const permission = await Notification.requestPermission();
  alert.textContent = permission === "granted"
    ? "Real-time browser alerts enabled. Keep this admin page open to receive new order notifications."
    : "Notification permission blocked. Keep the Admin Suite open to watch live order alerts.";
});

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
  enhanceRealtimeUi();
  renderCustomerMenu();
  renderCart();
  renderReservations();
  renderOrders();
  renderLiveAlert();
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
