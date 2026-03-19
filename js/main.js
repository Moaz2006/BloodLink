/* BloodLink - Unified JavaScript File
    Author: Moaz Wael
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

        // قفل المنيو عند الضغط في أي مكان بره
        document.addEventListener("click", (e) => {
            if (e.target !== toggleBtn && e.target !== navLinks) {
                navLinks.classList.remove("show");
            }
        });

        // قفل المنيو عند الضغط على أي لينك جوه
        navLinks.querySelectorAll("a").forEach(link => {
            link.onclick = () => navLinks.classList.remove("show");
        });
    }


    // --- 2. تفعيل "الحتة البيضا" (Active State) تلقائياً ---
    // الكود ده بيشوف اسم الصفحة اللي مفتوحة حالياً في المتصفح
    let currentFile = window.location.pathname.split("/").pop();
    
    // لو الصفحة الرئيسية (index) أو لو الرابط فاضي
    if (currentFile === "" || currentFile === "index.html") {
        currentFile = "index.html";
    }

    const allNavLinks = document.querySelectorAll("header nav ul li a");
    
    allNavLinks.forEach(link => {
        // بنشيل أي كلاس active قديم عشان نضمن النضافة
        link.classList.remove("active");

        // لو الـ href بتاع اللينك هو هو اسم الملف المفتوح حالياً
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
            if (val > 1) { // عشان م ينزلش عن كيس دم واحد
                qtyInput.value = val - 1;
            }
        };
    }

});