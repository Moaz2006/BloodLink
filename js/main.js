/* =====================================================
   BloodLink — main.js
   Sections:
   1. Utility Functions
   2. Navigation Toggle
   3. Login Page
   4. Blood Request Page
   5. Donate Page
   6. Search / Donation Centers Page
   ===================================================== */


/* ══════════════════════════════════════════
   1. UTILITY FUNCTIONS
   ══════════════════════════════════════════ */

/**
 * Show a floating toast message
 * @param {string} message
 * @param {'success'|'warning'} type
 */
function showMessage(message, type = "success") {
  const existing = document.getElementById("bl-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "bl-toast";
  toast.textContent = message;

  Object.assign(toast.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "14px 28px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    zIndex: "99999",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
    transition: "opacity 0.4s ease",
    background: type === "success" ? "#27ae60" : "#e74c3c",
    direction: "rtl",
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/**
 * Check if a radio group has any selection
 * @param {Element} container
 * @param {string} radioName
 * @returns {boolean}
 */
function isRadioGroupSelected(container, radioName) {
  return container.querySelector(`input[name="${radioName}"]:checked`) !== null;
}


/* ══════════════════════════════════════════
   2. NAVIGATION TOGGLE  (all pages)
   ══════════════════════════════════════════ */
const toggleBtn = document.querySelector(".toggle-menu");
const navLinks  = document.querySelector(".links");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}


/* ══════════════════════════════════════════
   3. LOGIN PAGE  (login.html)
   ══════════════════════════════════════════ */
const loginContainer = document.querySelector(".login-container");

if (loginContainer) {
  const emailInput    = loginContainer.querySelector('input[type="email"]');
  const passwordInput = loginContainer.querySelector('input[type="password"]');
  const loginBtn      = loginContainer.querySelector(".btn-login");

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email    = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showMessage("⚠️ يرجى ملء جميع الحقول (البريد الإلكتروني وكلمة المرور)", "warning");
      return;
    }

    showMessage("✅ تم تسجيل الدخول بنجاح! جاري التحويل...", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1800);
  });
}


/* ══════════════════════════════════════════
   4. BLOOD REQUEST PAGE  (blood-request.html)
   ══════════════════════════════════════════ */
const requestPage = document.querySelector(".request-page");

if (requestPage) {

  /* ── Quantity +/- controls ── */
  const qtyInput = requestPage.querySelector(".qty-control input[type='number']");
  const plusBtn  = requestPage.querySelector(".qty-control .plus");
  const minusBtn = requestPage.querySelector(".qty-control .minus");

  if (plusBtn && minusBtn && qtyInput) {
    plusBtn.addEventListener("click", () => {
      qtyInput.value = parseInt(qtyInput.value || 0) + 1;
    });
    minusBtn.addEventListener("click", () => {
      const current = parseInt(qtyInput.value || 0);
      if (current > 0) qtyInput.value = current - 1;
    });
  }

  /* ── "ارسال الاستمارة" button ── */
  const submitAnchor = requestPage.querySelector(".card-header .btn-back");
  const requestForm  = document.getElementById("main-request-form");

  if (submitAnchor && requestForm) {
    submitAnchor.addEventListener("click", function (e) {
      e.preventDefault();

      const textInputs = requestForm.querySelectorAll(
        'input[type="text"], input[type="tel"], input[type="age"], input[type="number"]'
      );

      let allFilled = true;

      textInputs.forEach((input) => {
        if (input.value.trim() === "") {
          allFilled = false;
          input.style.borderColor = "#e74c3c";
        } else {
          input.style.borderColor = "";
        }
      });

      const genderSelected    = isRadioGroupSelected(requestForm, "gender");
      const bloodTypeSelected = isRadioGroupSelected(requestForm, "type");
      const qty               = parseInt(qtyInput ? qtyInput.value : 0);

      if (!genderSelected || !bloodTypeSelected || qty <= 0) allFilled = false;

      if (!allFilled) {
        showMessage("⚠️ يرجى ملء جميع الحقول واختيار فصيلة الدم والجنس وعدد الأكياس", "warning");
        return;
      }

      showMessage("✅ تم إرسال الاستمارة بنجاح!", "success");

      setTimeout(() => {
        requestForm.reset();
        if (qtyInput) qtyInput.value = 0;
      }, 1800);
    });
  }

  /* ── "الرجوع" button ── */
  const backBtn = requestPage.querySelector(".card-header .btn-submit");
  if (backBtn) {
    backBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.history.back();
    });
  }
}


/* ══════════════════════════════════════════
   5. DONATE PAGE  (donate.html)
   ══════════════════════════════════════════ */
const donationSection = document.querySelector(".donation-form-section");

if (donationSection) {
  const donateForm = donationSection.querySelector(".main-form");
  const sendBtn    = donationSection.querySelector(".send-btn");

  if (sendBtn && donateForm) {
    sendBtn.addEventListener("click", function (e) {
      e.preventDefault();

      let allFilled = true;

      const requiredNames = ["full_name", "birth_date", "address", "phone", "height", "weight"];

      requiredNames.forEach((name) => {
        const input = donateForm.querySelector(`[name="${name}"]`);
        if (!input || input.value.trim() === "") {
          allFilled = false;
          if (input) input.style.borderColor = "#e74c3c";
        } else {
          if (input) input.style.borderColor = "";
        }
      });

      const bloodTypeSelected = isRadioGroupSelected(donateForm, "blood_type");
      const genderSelected    = isRadioGroupSelected(donateForm, "gender");
      const healthSelected    = isRadioGroupSelected(donateForm, "is_healthy");

      if (!bloodTypeSelected || !genderSelected || !healthSelected) allFilled = false;

      if (!allFilled) {
        showMessage("⚠️ يرجى ملء جميع الحقول المطلوبة قبل الإرسال", "warning");
        return;
      }

      showMessage("✅ تم إرسال الاستمارة بنجاح! شكراً لتبرعك", "success");

      setTimeout(() => {
        donateForm.reset();
      }, 1800);
    });

    /* ── "الرجوع" anchor ── */
    const backAnchor = donationSection.querySelector(".back-btn");
    if (backAnchor) {
      backAnchor.addEventListener("click", function (e) {
        e.preventDefault();
        window.history.back();
      });
    }
  }
}


/* ══════════════════════════════════════════
   6. SEARCH / DONATION CENTERS  (search.html)
   ══════════════════════════════════════════ */

// ── مفتاح خرائط جوجل ──
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';

// ── بيانات مراكز التبرع ──
const centers = [
  {
    id: 1,
    name: 'مركز القصر العيني للتبرع',
    address: 'شارع القصر العيني، السيدة زينب، القاهرة',
    region: 'القاهرة',
    hours: '08:00 ص - 10:00 م',
    distance: '1.2 كم',
    donors: 128,
    rating: 4.8,
    status: 'متاح',
    bloodTypes: ['A+', 'B+', 'O+', 'AB+'],
    urgentBlood: ['O-'],
    coords: { lat: 30.0286, lng: 31.2327 },
  },
  {
    id: 2,
    name: 'مركز أجوزة للتبرع بالدم',
    address: 'شارع الجيش، أجوزة، الجيزة',
    region: 'الجيزة',
    hours: '09:00 ص - 09:00 م',
    distance: '2.4 كم',
    donors: 96,
    rating: 4.5,
    status: 'متاح',
    bloodTypes: ['A-', 'B-', 'O-'],
    urgentBlood: ['B-'],
    coords: { lat: 30.0624, lng: 31.2041 },
  },
  {
    id: 5,
    name: 'مركز إسكندرية الدولي للتبرع',
    address: 'شارع طريق النصر، سيدي جابر، الإسكندرية',
    region: 'الإسكندرية',
    hours: '07:00 ص - 09:00 م',
    distance: '2.7 كم',
    donors: 89,
    rating: 4.4,
    status: 'متاح',
    bloodTypes: ['A+', 'A-', 'B+', 'AB+'],
    urgentBlood: ['A-'],
    coords: { lat: 31.2156, lng: 29.9553 },
  },
  // يمكن إضافة المزيد هنا...
];

// ── فتح الاتجاهات على خرائط جوجل ──
function openDirections(lat, lng) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, '_blank');
}

// ── بناء بطاقة مركز واحد ──
function buildCard(center, delay) {
  const bloodBadges = [
    ...center.urgentBlood.map(b => `<span class="blood-badge urgent" title="مطلوب بإلحاح">${b}</span>`),
    ...center.bloodTypes.map(b  => `<span class="blood-badge">${b}</span>`)
  ].join('');

  const isClosed = center.status === 'مغلق';

  return `
    <div class="card" style="animation-delay:${delay}ms">
      <div class="card-header">
        <span class="card-name">${center.name}</span>
        <span class="badge-available" style="${isClosed ? 'background:#fef2f2;color:#ef4444;' : ''}">
          ${center.status} الآن
        </span>
      </div>
      <div class="info-row">${center.address}</div>
      <div class="info-row">${center.hours}</div>
      <div class="blood-types">${bloodBadges}</div>
      <div style="display:flex; gap:10px; margin-top:15px;">
        <button class="btn btn-outline" onclick="openDirections(${center.coords.lat}, ${center.coords.lng})">الاتجاهات</button>
        <button class="btn btn-primary" onclick="alert('تفاصيل المركز: ${center.name}')">التفاصيل</button>
      </div>
    </div>`;
}

// ── تطبيق الفلاتر والبحث ──
function applyFilters() {
  const blood  = document.getElementById('filterBlood')?.value  || '';
  const region = document.getElementById('filterRegion')?.value || '';
  const status = document.getElementById('filterStatus')?.value || '';
  const query  = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';

  const filtered = centers.filter(c => {
    const allBloods = [...c.bloodTypes, ...c.urgentBlood];
    if (blood  && !allBloods.includes(blood)) return false;
    if (region && c.region !== region)         return false;
    if (status && c.status !== status)         return false;
    if (query  && !c.name.toLowerCase().includes(query)) return false;
    return true;
  });

  renderCards(filtered);
}

// ── رسم البطاقات في الصفحة ──
function renderCards(data) {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;

  const resultCount = document.getElementById('resultCount');
  if (resultCount) resultCount.textContent = data.length;

  grid.innerHTML = data.map((c, i) => buildCard(c, i * 60)).join('');
}

// ── التشغيل الأولي لصفحة البحث ──
if (document.getElementById('cardsGrid')) {
  renderCards(centers);
}