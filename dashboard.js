/* =============================================================
   شركة المذاق العصري — Shared admin shell logic
   - auth check
   - sidebar active state
   - user info population
   - logout
   - mobile drawer toggle
   ============================================================= */

(function () {
  "use strict";

  const cfg = window.APP_CONFIG || {};
  const storage = cfg.storage || {};

  /* ---------- أدوات مساعدة ---------- */
  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { window.localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }
  function safeRemove(key) {
    try { window.localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }
  function safeGetJSON(key) {
    const raw = safeGet(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  /* ---------- التحقق من الجلسة ---------- */
  const token = safeGet(storage.sessionKey || "mazaq.session");
  if (!token) {
    window.location.replace("./index.html");
    return;
  }

  const profile = safeGetJSON(storage.profileKey || "mazaq.profile") || {
    username: "1111",
    displayName: "المدير العام",
    role: "مدير",
  };

  /* ---------- ملء بيانات المستخدم ---------- */
  function fillUserInfo() {
    const nameEl = document.querySelector("[data-user-name]");
    const roleEl = document.querySelector("[data-user-role]");
    const avatarEls = document.querySelectorAll("[data-user-avatar]");

    if (nameEl) nameEl.textContent = profile.displayName || "المستخدم";
    if (roleEl) roleEl.textContent = profile.role || "مدير";

    const initial = (profile.displayName || "م").charAt(0);
    avatarEls.forEach((el) => { el.textContent = initial; });
  }

  /* ---------- تسجيل الخروج ---------- */
  function bindLogout() {
    document.querySelectorAll("[data-action='logout']").forEach((btn) => {
      btn.addEventListener("click", () => {
        safeRemove(storage.sessionKey || "mazaq.session");
        safeRemove(storage.profileKey || "mazaq.profile");
        window.location.replace("./index.html");
      });
    });
  }

  /* ---------- تمييز الرابط النشط في الـ Sidebar ---------- */
  function highlightActiveNav() {
    const currentPath = window.location.pathname.split("/").pop() || "dashboard.html";
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const target = link.getAttribute("data-nav");
      if (target === currentPath || (currentPath === "" && target === "dashboard.html")) {
        link.classList.add("is-active");
      }
    });
  }

  /* ---------- إضافة رابط "الإقفال والورديات" إذا غير موجود ---------- */
  function injectClosingNav() {
    if (document.querySelector('[data-nav="closing.html"]')) return;
    const staffLink = document.querySelector('[data-nav="staff.html"]');
    if (!staffLink) return;
    const li = staffLink.parentElement; // <li> الذي يحتوي staff
    if (!li || !li.parentElement) return;
    const closingLi = document.createElement("li");
    closingLi.innerHTML =
      '<a class="nav-item" href="./closing.html" data-nav="closing.html">' +
      '<svg class="nav-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="2" y="3" width="20" height="14" rx="2"/>' +
      '<line x1="8" y1="21" x2="16" y2="21"/>' +
      '<line x1="12" y1="17" x2="12" y2="21"/>' +
      '</svg>الإقفال والورديات</a>';
    li.parentElement.insertBefore(closingLi, li.nextSibling);
  }

  /* ---------- قائمة الجوال ---------- */
  function bindMobileMenu() {
    const btn = document.querySelector("[data-action='toggle-menu']");
    const sidebar = document.querySelector(".sidebar");
    const backdrop = document.querySelector(".sidebar-backdrop");

    if (!btn || !sidebar) return;

    function open() {
      sidebar.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-open");
    }
    function close() {
      sidebar.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-open");
    }

    btn.addEventListener("click", () => {
      if (sidebar.classList.contains("is-open")) close();
      else open();
    });
    if (backdrop) backdrop.addEventListener("click", close);

    // إغلاق القائمة بعد النقر على رابط (في الجوال)
    sidebar.querySelectorAll("[data-nav]").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 960) close();
      });
    });
  }

  /* ---------- تهيئة عامة ---------- */
  function init() {
    fillUserInfo();
    bindLogout();
    injectClosingNav();
    highlightActiveNav();
    bindMobileMenu();

    // ملء رقم الإصدار في الفوتر
    const versionEl = document.getElementById("app-version");
    if (versionEl && cfg.ui && cfg.ui.version) {
      versionEl.textContent = cfg.ui.version;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* =============================================================
   تنسيقات مشتركة للتنسيقات
   ============================================================= */
window.UI = {
  formatCurrency(value, currency) {
    const num = Number(value) || 0;
    const formatted = num.toLocaleString("ar-SA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return currency ? `${formatted} ${currency}` : formatted;
  },

  formatNumber(value) {
    const num = Number(value) || 0;
    return num.toLocaleString("ar-SA");
  },

  statusBadge(status) {
    const map = {
      completed: { label: "مكتمل", className: "badge--success" },
      preparing: { label: "قيد التحضير", className: "badge--warning" },
      pending: { label: "بالانتظار", className: "badge--info" },
      cancelled: { label: "ملغي", className: "badge--danger" },
      refunded: { label: "مسترد", className: "badge--neutral" },
      active: { label: "نشط", className: "badge--success" },
      leave: { label: "في إجازة", className: "badge--warning" },
      good: { label: "جيد", className: "badge--success" },
      low: { label: "منخفض", className: "badge--warning" },
      critical: { label: "حرج", className: "badge--danger" },
    };
    const cfg = map[status] || { label: status, className: "badge--neutral" };
    return `<span class="badge ${cfg.className}"><span class="badge__dot"></span>${cfg.label}</span>`;
  },
};