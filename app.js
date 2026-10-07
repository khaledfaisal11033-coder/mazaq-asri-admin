/* =============================================================
   شركة المذاق العصري — لوحة الإدارة الداخلية
   منطق الدخول + تفاعلات النموذج + إدارة الحالة
   ============================================================= */

(function () {
  "use strict";

  const cfg = window.APP_CONFIG || {};
  const demoCfg = cfg.demo || {};
  const apiCfg = cfg.api || {};
  const ui = cfg.ui || {};
  const storage = cfg.storage || {};

  /* ---------- عناصر DOM ---------- */
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberInput = document.getElementById("remember");
  const submitBtn = document.getElementById("submit-btn");
  const togglePasswordBtn = document.getElementById("toggle-password");
  const alertEl = document.getElementById("form-alert");
  const versionEl = document.getElementById("app-version");

  /* ---------- تهيئة أولية ---------- */
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";

  if (versionEl && ui.version) {
    versionEl.textContent = ui.version;
  }

  // استرجاع اسم المستخدم المحفوظ (تذكّرني)
  const rememberedUser = safeLocalGet(storage.rememberKey);
  if (rememberedUser && usernameInput) {
    usernameInput.value = rememberedUser;
    if (rememberInput) rememberInput.checked = true;
  }

  /* ---------- أحداث الواجهة ---------- */
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePasswordBtn.classList.toggle("is-active", isHidden);
      togglePasswordBtn.setAttribute("aria-pressed", isHidden ? "true" : "false");
      togglePasswordBtn.setAttribute(
        "aria-label",
        isHidden ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
      );
      passwordInput.focus();
      const len = passwordInput.value.length;
      try {
        passwordInput.setSelectionRange(len, len);
      } catch (e) {
        /* ignore */
      }
    });
  }

  [usernameInput, passwordInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
      clearAlert();
    });
  });

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  /* ---------- معالج تقديم النموذج ---------- */
  async function handleSubmit(event) {
    event.preventDefault();
    clearAlert();

    const username = (usernameInput?.value || "").trim();
    const password = passwordInput?.value || "";
    const remember = !!rememberInput?.checked;

    let firstInvalid = null;
    if (!username) {
      markInvalid(usernameInput);
      firstInvalid = firstInvalid || usernameInput;
    }
    if (!password) {
      markInvalid(passwordInput);
      firstInvalid = firstInvalid || passwordInput;
    }

    if (firstInvalid) {
      showAlert("يرجى إدخال اسم المستخدم وكلمة المرور.", "error");
      firstInvalid.focus();
      return;
    }

    setLoading(true);

    try {
      const result = demoCfg.enabled
        ? await demoLogin(username, password)
        : await apiLogin({
            [apiCfg.payload?.username || "username"]: username,
            [apiCfg.payload?.password || "password"]: password,
          });

      // حفظ اسم المستخدم إذا طلب تذكّرني
      if (remember) {
        safeLocalSet(storage.rememberKey, username);
      } else {
        safeLocalRemove(storage.rememberKey);
      }

      // حفظ التوكن / الجلسة
      if (result && result.token) {
        safeLocalSet(storage.sessionKey, result.token);
      }
      if (result && result.profile) {
        safeLocalSet(storage.profileKey, JSON.stringify(result.profile));
      }

      showAlert("تم تسجيل الدخول بنجاح. جاري التحويل…", "success");

      const redirectUrl =
        (result && (result.redirect || result.redirectUrl)) || "./closing.html";
      setTimeout(() => {
        window.location.assign(redirectUrl);
      }, demoCfg.redirectDelayMs || 700);
    } catch (err) {
      const message =
        (err && err.message) ||
        "تعذّر إكمال تسجيل الدخول. يرجى التحقق من البيانات والمحاولة لاحقاً.";
      showAlert(message, "error");

      if (err && (err.status === 401 || err.status === 403)) {
        markInvalid(usernameInput);
        markInvalid(passwordInput);
      }
    } finally {
      setLoading(false);
    }
  }

  /* ---------- وضع الدخول التجريبي ---------- */
  async function demoLogin(username, password) {
    // محاكاة بسيطة لزمن الاستجابة
    await delay(400);

    const credentials = Array.isArray(demoCfg.credentials) ? demoCfg.credentials : [];
    const matched = credentials.find(
      (c) => c.username === username && c.password === password
    );

    if (!matched) {
      const err = new Error("اسم المستخدم أو كلمة المرور غير صحيحة.");
      err.status = 401;
      throw err;
    }

    // إنشاء توكن تجريبي (ليس JWT حقيقي — مجرد معرّف جلسة)
    const token = "demo_" + randomToken();

    return {
      token,
      redirect: "./dashboard.html",
      profile: {
        username: matched.username,
        role: matched.role || "مدير",
        displayName: matched.displayName || matched.username,
        demo: true,
        loginAt: new Date().toISOString(),
      },
    };
  }

  /* ---------- طلب الدخول الحقيقي عبر API ---------- */
  async function apiLogin(payload) {
    const url = apiCfg.loginUrl;
    const method = (apiCfg.method || "POST").toUpperCase();

    if (!url || url.includes("example.com")) {
      throw new Error(
        "لم يتم ضبط رابط الـ API. عطّل demo.enabled في config.js أو ضع رابط الـ backend الحقيقي."
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiCfg.timeoutMs || 12000);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(apiCfg.headers || {}),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: "same-origin",
      });

      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        data = null;
      }

      if (!response.ok) {
        const error = new Error(
          (data && (data.message || data.error)) ||
            "اسم المستخدم أو كلمة المرور غير صحيحة."
        );
        error.status = response.status;
        error.payload = data;
        throw error;
      }

      return data;
    } catch (err) {
      if (err && err.name === "AbortError") {
        const e = new Error("انتهت مهلة الاتصال بالخادم. يرجى المحاولة مجدداً.");
        e.status = 0;
        throw e;
      }
      if (!err.status) {
        const e = new Error(
          "تعذّر الاتصال بالخادم. يرجى التحقق من الشبكة والمحاولة لاحقاً."
        );
        e.status = 0;
        throw e;
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /* ---------- مساعدات الواجهة ---------- */
  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle("is-loading", isLoading);
  }

  function markInvalid(input) {
    if (!input) return;
    input.classList.add("is-invalid");
  }

  function showAlert(message, type) {
    if (!alertEl) return;
    alertEl.textContent = message;
    alertEl.classList.remove("is-error", "is-success");
    if (type === "error") alertEl.classList.add("is-error");
    if (type === "success") alertEl.classList.add("is-success");
  }

  function clearAlert() {
    if (!alertEl) return;
    alertEl.textContent = "";
    alertEl.classList.remove("is-error", "is-success");
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function randomToken() {
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      const arr = new Uint8Array(16);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  /* ---------- مساعدات التخزين المحلي ---------- */
  function safeLocalGet(key) {
    if (!key) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeLocalSet(key, value) {
    if (!key) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* ignore */
    }
  }

  function safeLocalRemove(key) {
    if (!key) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      /* ignore */
    }
  }
})();