// ============================================
// Toggle Menu - Works for all pages
// ============================================
document.addEventListener('DOMContentLoaded', function () {

  // --- Header 1: للصفحات اللي فيها header > nav > .links ---
  const toggleBtn = document.querySelector('header .toggle-menu');
  const navUl = document.querySelector('header nav ul');

  if (toggleBtn && navUl) {
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      navUl.classList.toggle('show');
      // بدّل الأيقونة بين البارات والـ X
      if (navUl.classList.contains('show')) {
        toggleBtn.classList.remove('fa-bars');
        toggleBtn.classList.add('fa-times');
      } else {
        toggleBtn.classList.remove('fa-times');
        toggleBtn.classList.add('fa-bars');
      }
    });

    // إغلاق لما تضغط على أي لينك
    navUl.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navUl.classList.remove('show');
        toggleBtn.classList.remove('fa-times');
        toggleBtn.classList.add('fa-bars');
      });
    });
  }

  // --- Header 2: صفحة search.html اللي فيها .main-nav و .nav-links ---
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('show');
      const icon = mobileBtn.querySelector('i');
      if (navLinks.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('show');
        const icon = mobileBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // --- إغلاق أي منيو لما تضغط برّه ---
  document.addEventListener('click', function (e) {
    if (!e.target.closest('header') && !e.target.closest('.main-nav')) {
      if (navUl) {
        navUl.classList.remove('show');
        if (toggleBtn) {
          toggleBtn.classList.remove('fa-times');
          toggleBtn.classList.add('fa-bars');
        }
      }
      if (navLinks) {
        navLinks.classList.remove('show');
        if (mobileBtn) {
          const icon = mobileBtn.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    }
  });

  // ============================================
  // Blood Request - عداد الأكياس
  // ============================================
  const plusBtn = document.querySelector('.qty-control .plus');
  const minusBtn = document.querySelector('.qty-control .minus');
  const qtyInput = document.querySelector('.qty-control input[type="number"]');

  if (plusBtn && minusBtn && qtyInput) {
    plusBtn.addEventListener('click', function () {
      qtyInput.value = parseInt(qtyInput.value || 0) + 1;
    });
    minusBtn.addEventListener('click', function () {
      const current = parseInt(qtyInput.value || 0);
      if (current > 0) qtyInput.value = current - 1;
    });
  }

});