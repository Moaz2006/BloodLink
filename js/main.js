/* BloodLink - Unified JavaScript File
    Author: Moaz Wael
    Includes: Toggle Menu, Active State, Qty Control, and Form Validation
*/

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. تشغيل منيو الموبايل (Toggle Menu) ---
    const toggleBtn = document.querySelector(".toggle-menu");
    const navLinks = document.querySelector("header nav ul");

    if (toggleBtn && navLinks) {
        toggleBtn.onclick = function (e) {
            e.stopPropagation();
            navLinks.classList.toggle("show");
        };

        document.addEventListener("click", (e) => {
            if (e.target !== toggleBtn && e.target !== navLinks) {
                navLinks.classList.remove("show");
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.onclick = () => navLinks.classList.remove("show");
        });
    }


    // --- 2. تفعيل "الحتة البيضا" (Active State) تلقائياً ---
    let currentFile = window.location.pathname.split("/").pop();
    if (currentFile === "" || currentFile === "index.html") {
        currentFile = "index.html";
    }

    const allNavLinks = document.querySelectorAll("header nav ul li a");
    allNavLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentFile) {
            link.classList.add("active");
        }
    });


    // --- 3. كود صفحة طلب الدم (الزائد والناقص) ---
    const plusBtn = document.querySelector(".plus");
    const minusBtn = document.querySelector(".minus");
    const qtyInput = document.querySelector(".qty-control input");

    if (plusBtn && minusBtn && qtyInput) {
        plusBtn.onclick = function() {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        };
        minusBtn.onclick = function() {
            let val = parseInt(qtyInput.value);
            if (val > 1) {
                qtyInput.value = val - 1;
            }
        };
    }

    // --- 4. كود الـ Validation لصفحة الاستمارة (الجديد) ---
    const donationForm = document.querySelector(".main-form");

    if (donationForm) {
        donationForm.onsubmit = function (e) {
            // 1. التأكد من الاسم (لازم يكون موجود وطويل كفاية)
            let fullName = document.querySelector('input[name="full_name"]');
            if (fullName && (fullName.value.trim() === "" || fullName.value.trim().length < 8)) {
                e.preventDefault();
                alert("من فضلك أدخل الاسم بالكامل (ثلاثي على الأقل)");
                fullName.focus();
                return false;
            }

            // 2. التأكد من اختيار فصيلة الدم (Radio Button)
            let bloodType = document.querySelector('input[name="blood_type"]:checked');
            if (!bloodType) {
                e.preventDefault();
                alert("يرجى اختيار فصيلة الدم");
                return false;
            }

            // 3. التأكد من رقم الهاتف (لازم يبدأ بـ 01 ومكون من 11 رقم)
            let phone = document.querySelector('input[name="phone"]');
            let phonePattern = /^01[0125][0-9]{8}$/;
            if (phone && !phonePattern.test(phone.value)) {
                e.preventDefault();
                alert("يرجى إدخال رقم هاتف صحيح مكون من 11 رقم (موبايل)");
                phone.focus();
                return false;
            }

            // 4. التأكد من اختيار تاريخ الميلاد
            let birthDate = document.querySelector('input[name="birth_date"]');
            if (birthDate && birthDate.value === "") {
                e.preventDefault();
                alert("يرجى تحديد تاريخ الميلاد");
                birthDate.focus();
                return false;
            }

            // لو كل حاجة تمام
            alert("تم التحقق من البيانات وإرسال الاستمارة بنجاح!");
        };
    }
});