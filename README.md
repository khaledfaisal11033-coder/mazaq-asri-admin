# شركة المذاق العصري — لوحة الإدارة الداخلية

صفحة دخول عربية احترافية للوحة الإدارة الداخلية، مبنية كصفحة Static جاهزة للنشر على **Cloudflare Pages** مع رفع الكود إلى **GitHub**.

## نظرة سريعة

- **الواجهة**: صفحة دخول (RTL) بهوية عربية، خلفية `#F9FAFC`، نصوص `#151A29`، حقول إدخال بلون Navy غامق.
- **الخطوط**: Cairo للنصوص وTajawal للعناوين.
- **التقنيات**: HTML5 + CSS3 + Vanilla JS — لا يوجد Builder ولا Backend مدمج.

## هيكل المشروع

```
mazaq-asri-admin/
├─ index.html        # صفحة الدخول
├─ styles.css        # نظام التصميم الكامل
├─ app.js            # منطق الفورم + طلب الدخول للـ API
├─ config.js         # إعدادات قابلة للتعديل (الـ API، الإصدار، الدومين…)
├─ logo.svg          # شعار نصي SVG
├─ package.json      # سكربتات الرفع والبناء
└─ README.md
```

## التشغيل المحلي

```bash
# من داخل المجلد
python3 -m http.server 8080
# ثم افتح
open http://localhost:8080
```

## تخصيص الإعدادات

افتح ملف `config.js` وغيّر:

- `api.loginUrl` — رابط الـ endpoint الخاص بـ backend (مطلوب)
- `api.method` — طريقة الإرسال (POST/GET)
- `api.payload` — مفاتيح اسم المستخدم وكلمة المرور في جسم الطلب
- `ui.version` — الإصدار الظاهر في الفوتر
- `ui.domain` — الدومين الظاهر في الفوتر
- `ui.managerEmail` — بريد المدير المعروض في نص المساعدة

## النشر على Cloudflare Pages

1. ارفع المشروع إلى GitHub
2. من لوحة Cloudflare Pages اربط الـ repo
3. إعدادات البناء:
   - **Build command**: (فارغ — موقع Static)
   - **Build output directory**: `/` (الجذر)
4. بعد أول نشر، عدّل `config.js` وادفع التغييرات ليتم النشر تلقائياً

### بديل عبر CLI

```bash
# أول مرة
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=modrtn-taste-company
```

## الرفع إلى GitHub

```bash
git init
git add .
git commit -m "feat: initial login page for Modrtn Taste Company"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## الترخيص

© 2026 شركة المذاق العصري — جميع الحقوق محفوظة.