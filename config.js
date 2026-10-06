/* =============================================================
   شركة المذاق العصري — إعدادات الصفحة
   عدّل القيم هنا لتغيير سلوك لوحة الدخول أو بيانات الواجهة
   ============================================================= */

window.APP_CONFIG = Object.freeze({
  brand: {
    name: "شركة المذاق العصري",
    shortName: "المذاق العصري",
  },

  // ============================================================
  // وضع الدخول — Demo Mode
  // فعّل هذا الخيار للدخول التجريبي بدون backend
  // ============================================================
  demo: {
    // true = أي دخول يمر محلياً عبر البيانات المعرّفة هنا
    // false = يستخدم api.loginUrl لإجراء طلب حقيقي
    enabled: true,
    // بيانات الدخول المسموح بها (username:password)
    credentials: [
      { username: "1111", password: "1111", role: "مدير", displayName: "المدير العام" },
    ],
    // المدة (بالملي ثانية) قبل التحويل إلى لوحة التحكم بعد الدخول
    redirectDelayMs: 700,
  },

  // ============================================================
  // إعدادات الـ API الحقيقي (يُستخدم فقط عندما demo.enabled = false)
  // ============================================================
  api: {
    loginUrl: "https://api.example.com/v1/auth/login",
    method: "POST",
    payload: {
      username: "username",
      password: "password",
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeoutMs: 12000,
  },

  // مفاتيح localStorage
  storage: {
    rememberKey: "mazaq.remember",
    sessionKey: "mazaq.session",
    profileKey: "mazaq.profile",
  },

  // بيانات العرض
  ui: {
    version: "v1.0.0",
    domain: "alkukh-mateam.workers.dev",
    copyrightHolder: "شركة المذاق العصري",
    copyrightYear: 2026,
    managerEmail: "manager@mazaq-asri.example",
  },
});