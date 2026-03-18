
// index and login page

// 1. تحديد العناصر اللي هنشتغل عليها
let toggleBtn = document.querySelector(".toggle-menu");
let navLinks = document.querySelector(".links");

// 2. وظيفة الفتح والقفل عند الضغط على الأيقونة
toggleBtn.onclick = function (e) {
    // منع انتشار الضغطة عشان المتصفح ميفهمش إنك بتدوس بره المنيو
    e.stopPropagation();

    // إضافة أو حذف كلاس "show" اللي عملناه في الـ CSS
    navLinks.classList.toggle("show");
};

// 3. قفل القائمة لو ضغطت في أي مكان بره (عشان تجربة مستخدم أفضل)
document.addEventListener("click", (e) => {
    // لو الضغطة مش على الزرار ولا على القائمة، اقفلها
    if (e.target !== toggleBtn && e.target !== navLinks) {
        if (navLinks.classList.contains("show")) {
            navLinks.classList.remove("show");
        }
    }
});

// 4. قفل القائمة بمجرد الضغط على أي لينك جوه المنيو
// دي بتحل مشكلة إنك لما تضغط على "الرئيسية" المنيو تفضل مفتوحة
let allLinks = document.querySelectorAll("header nav ul li a");
allLinks.forEach((link) => {
    link.onclick = function () {
        navLinks.classList.remove("show");
    };
});

// end index and login page



    // blood-request page??
// 1. تحديد العناصر (تأكد من مطابقة الكلاسات للـ HTML بتاعك)
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const qtyInput = document.querySelector(".qty-control input");

// تأكد إن العناصر موجودة في الصفحة قبل ما نشغل الكود
if (plusBtn && minusBtn && qtyInput) {

    // 2. برمجة زرار الزائد (+)
    plusBtn.onclick = function() {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    };

    // 3. برمجة زرار الناقص (-)
    minusBtn.onclick = function() {
        let currentValue = parseInt(qtyInput.value);
        // شرط عشان م ينزلش تحت الصفر (أو تحت 1 حسب رغبتك)
        if (currentValue > 0) {
            qtyInput.value = currentValue - 1;
        }
    };
}
// end blood-request page