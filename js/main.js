/* =====================================================
   BloodLink — main.js (Unified Version)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ══════════════════════════════════════════
       1. UTILITY FUNCTIONS (أدوات مساعدة)
       ══════════════════════════════════════════ */

    // وظيفة لإظهار رسائل التنبيه (Toast)
    window.showMessage = function(message, type = "success") {
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
    };

    // التحقق من اختيار Radio Button
    function isRadioGroupSelected(container, radioName) {
        return container.querySelector(`input[name="${radioName}"]:checked`) !== null;
    }


    /* ══════════════════════════════════════════
       2. NAVIGATION & TOGGLE MENU (التنقل والقائمة)
       ══════════════════════════════════════════ */

    // التعامل مع كل أنواع الـ Toggle Menu في جميع الصفحات
    const menus = [
        { btn: 'header .toggle-menu', nav: 'header nav ul', activeClass: 'show' }, // الهيدر العادي
        { btn: '.mobile-menu-btn', nav: '.nav-links', activeClass: 'show' },        // صفحة البحث
        { btn: '.toggle-menu', nav: '.links', activeClass: 'open' }                // النسخة الثانية من الهيدر
    ];

    menus.forEach(menu => {
        const btn = document.querySelector(menu.btn);
        const nav = document.querySelector(menu.nav);

        if (btn && nav) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                nav.classList.toggle(menu.activeClass);
                
                // تحديث الأيقونة (Bars / Times)
                const icon = btn.querySelector('i') || btn;
                if (nav.classList.contains(menu.activeClass)) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });

            // إغلاق المنيو عند الضغط على أي رابط بالداخل
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove(menu.activeClass);
                    const icon = btn.querySelector('i') || btn;
                    icon.classList.replace('fa-times', 'fa-bars');
                });
            });
        }
    });

    // إغلاق المنيو عند الضغط في أي مكان خارجها
    document.addEventListener('click', function (e) {
        menus.forEach(menu => {
            const nav = document.querySelector(menu.nav);
            const btn = document.querySelector(menu.btn);
            if (nav && nav.classList.contains(menu.activeClass)) {
                if (!nav.contains(e.target) && !btn.contains(e.target)) {
                    nav.classList.remove(menu.activeClass);
                    const icon = btn.querySelector('i') || btn;
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });


    /* ══════════════════════════════════════════
       3. BLOOD QUANTITY CONTROLS (عداد الأكياس)
       ══════════════════════════════════════════ */

    const qtyControls = document.querySelectorAll('.qty-control');
    qtyControls.forEach(ctrl => {
        const plusBtn = ctrl.querySelector('.plus');
        const minusBtn = ctrl.querySelector('.minus');
        const qtyInput = ctrl.querySelector('input[type="number"]');

        if (plusBtn && minusBtn && qtyInput) {
            plusBtn.onclick = () => { qtyInput.value = parseInt(qtyInput.value || 0) + 1; };
            minusBtn.onclick = () => {
                const val = parseInt(qtyInput.value || 0);
                if (val > 0) qtyInput.value = val - 1;
            };
        }
    });


    /* ══════════════════════════════════════════
       4. FORM SUBMISSIONS (تسجيل الدخول / الطلبات / التبرع)
       ══════════════════════════════════════════ */

    // --- صفحة تسجيل الدخول ---
    const loginBtn = document.querySelector(".btn-login");
    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const email = document.querySelector('input[type="email"]').value.trim();
            const pass = document.querySelector('input[type="password"]').value.trim();

            if (!email || !pass) {
                showMessage("⚠️ يرجى ملء جميع الحقول", "warning");
            } else {
                showMessage("✅ تم تسجيل الدخول بنجاح!", "success");
                setTimeout(() => window.location.href = "index.html", 1500);
            }
        });
    }

    // --- صفحة طلب الدم (Blood Request) ---
    const requestForm = document.getElementById("main-request-form");
    const submitRequestBtn = document.querySelector(".request-page .btn-back"); // الزر المستخدم للإرسال في تصميمك

    if (requestForm && submitRequestBtn) {
        submitRequestBtn.addEventListener("click", function (e) {
            e.preventDefault();
            let allFilled = true;
            
            const inputs = requestForm.querySelectorAll('input[required], input[type="text"], input[type="tel"]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allFilled = false;
                    input.style.borderColor = "#e74c3c";
                } else {
                    input.style.borderColor = "";
                }
            });

            const qtyInput = requestForm.querySelector(".qty-control input");
            if (!isRadioGroupSelected(requestForm, "gender") || 
                !isRadioGroupSelected(requestForm, "type") || 
                parseInt(qtyInput.value) <= 0) {
                allFilled = false;
            }

            if (!allFilled) {
                showMessage("⚠️ يرجى استكمال كافة البيانات واختيار الكمية", "warning");
            } else {
                showMessage("✅ تم إرسال طلبك بنجاح", "success");
                requestForm.reset();
                if(qtyInput) qtyInput.value = 0;
            }
        });
    }

    // --- صفحة التبرع (Donate Page) ---
    const donateForm = document.querySelector(".donation-form-section .main-form");
    const sendDonateBtn = document.querySelector(".send-btn");

    if (donateForm && sendDonateBtn) {
        sendDonateBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const required = ["full_name", "birth_date", "address", "phone", "height", "weight"];
            let isValid = true;

            required.forEach(name => {
                const input = donateForm.querySelector(`[name="${name}"]`);
                if (!input || !input.value.trim()) {
                    isValid = false;
                    if(input) input.style.borderColor = "#e74c3c";
                } else {
                    if(input) input.style.borderColor = "";
                }
            });

            if (!isValid || !isRadioGroupSelected(donateForm, "blood_type") || !isRadioGroupSelected(donateForm, "is_healthy")) {
                showMessage("⚠️ يرجى ملء كافة البيانات المطلوبة", "warning");
            } else {
                showMessage("✅ شكراً لك! تم إرسال بيانات التبرع", "success");
                donateForm.reset();
            }
        });
    }

    // زر الرجوع الموحد
    const backButtons = document.querySelectorAll(".btn-submit, .back-btn");
    backButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (btn.innerText.includes("رجوع") || btn.innerText.includes("الرجوع")) {
                e.preventDefault();
                window.history.back();
            }
        });
    });

});


/* ══════════════════════════════════════════
   5. SEARCH & CENTERS (صفحة البحث والمراكز)
   ══════════════════════════════════════════ */

const centers = [
    { id: 1, name: 'مركز القصر العيني', address: 'السيدة زينب، القاهرة', region: 'القاهرة', hours: '08:00 ص - 10:00 م', status: 'متاح', bloodTypes: ['A+', 'B+', 'O+'], urgentBlood: ['O-'], coords: { lat: 30.0286, lng: 31.2327 } },
    { id: 2, name: 'مركز العجوزة', address: 'الدقي، الجيزة', region: 'الجيزة', hours: '09:00 ص - 09:00 م', status: 'متاح', bloodTypes: ['A-', 'O-'], urgentBlood: ['B-'], coords: { lat: 30.0524, lng: 31.2141 } },
    { id: 3, name: 'مركز إسكندرية الدولي', address: 'سيدي جابر، الإسكندرية', region: 'الإسكندرية', hours: '07:00 ص - 09:00 م', status: 'متاح', bloodTypes: ['A+', 'AB+'], urgentBlood: ['A-'], coords: { lat: 31.2156, lng: 29.9553 } }
];

function openDirections(lat, lng) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}

function buildCard(center, delay) {
    const badges = [
        ...center.urgentBlood.map(b => `<span class="blood-badge urgent">${b}</span>`),
        ...center.bloodTypes.map(b => `<span class="blood-badge">${b}</span>`)
    ].join('');

    return `
        <div class="card" style="animation-delay:${delay}ms">
            <div class="card-header">
                <span class="card-name">${center.name}</span>
                <span class="badge-available">${center.status}</span>
            </div>
            <div class="info-row"><i class="fas fa-map-marker-alt"></i> ${center.address}</div>
            <div class="info-row"><i class="fas fa-clock"></i> ${center.hours}</div>
            <div class="blood-types">${badges}</div>
            <div style="display:flex; gap:10px; margin-top:15px;">
                <button class="btn btn-outline" onclick="openDirections(${center.coords.lat}, ${center.coords.lng})">الاتجاهات</button>
                <button class="btn btn-primary" onclick="alert('مركز: ${center.name}')">التفاصيل</button>
            </div>
        </div>`;
}

function renderCards(data) {
    const grid = document.getElementById('cardsGrid');
    if (!grid) return;
    grid.innerHTML = data.map((c, i) => buildCard(c, i * 60)).join('');
    const countEl = document.getElementById('resultCount');
    if (countEl) countEl.textContent = data.length;
}

function applyFilters() {
    const blood = document.getElementById('filterBlood')?.value || '';
    const region = document.getElementById('filterRegion')?.value || '';
    const query = document.getElementById('searchInput')?.value.toLowerCase() || '';

    const filtered = centers.filter(c => {
        const allBloods = [...c.bloodTypes, ...c.urgentBlood];
        return (!blood || allBloods.includes(blood)) &&
               (!region || c.region === region) &&
               (!query || c.name.toLowerCase().includes(query));
    });
    renderCards(filtered);
}

// التشغيل الأولي للبطاقات إذا كنا في صفحة البحث
if (document.getElementById('cardsGrid')) {
    renderCards(centers);
}