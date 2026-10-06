/* =============================================================
   شركة المذاق العصري — إعدادات الصفحة
   عدّل القيم هنا لتغيير سلوك لوحة الدخول أو بيانات الواجهة
   ============================================================= */

window.APP_CONFIG = Object.freeze({
  brand: {
    name: "شركة المذاق العصري",
    shortName: "المذاق العصري",
  },

  // نقطة استدعاء الدخول إلى الـ API — ضع رابط الـ endpoint الخاص بك هنا
  api: {
    // مثال افتراضي — استبدله بالرابط الفعلي لـ backend الخاص بك
    loginUrl: "https://api.example.com/v1/auth/login",
    method: "POST",
    // الحقول المرسلة في جسم الطلب
    payload: {
      username: "username",
      password: "password",
    },
    // رؤوس إضافية تُرسل مع كل طلب
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // مهلة الانتظار قبل إلغاء الطلب
    timeoutMs: 12000,
  },

  // مفاتيح localStorage
  storage: {
    rememberKey: "mazaq.remember",
    sessionKey: "mazaq.session",
  },

  // بيانات العرض
  ui: {
    // الإصدار الظاهر في الفوتر
    version: "v1.0.0",
    // الدومين المعروض في الفوتر
    domain: "alkukh-mateam.workers.dev",
    // اسم جهة حقوق الملكية
    copyrightHolder: "شركة المذاق العصري",
    copyrightYear: 2026,
    // بريد المدير لطلب بيانات الدخول
    managerEmail: "manager@mazaq-asri.example",
  },
});