/* =============================================================
   شركة المذاق العصري — بيانات تجريبية (Mock Data)
   بيانات للعرض فقط، تُستبدل بـ API calls لاحقاً
   ============================================================= */

window.MOCK_DATA = Object.freeze({
  /* إحصائيات لوحة التحكم */
  stats: {
    revenueToday: { value: 8420.50, currency: "ر.س", delta: 12.4, trend: "up" },
    ordersToday: { value: 87, delta: 5.2, trend: "up" },
    avgOrderValue: { value: 96.80, currency: "ر.س", delta: -1.8, trend: "down" },
    profitMargin: { value: 28.4, suffix: "%", delta: 2.1, trend: "up" },
  },

  /* رسم بياني: مبيعات آخر 7 أيام */
  weeklySales: {
    labels: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
    revenue: [6200, 7100, 5800, 7400, 8200, 9100, 8420],
    orders: [62, 71, 58, 74, 82, 91, 87],
  },

  /* رسم بياني: مبيعات آخر 6 أشهر */
  monthlySales: {
    labels: ["مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر"],
    revenue: [185000, 198000, 215000, 232000, 248000, 256000],
  },

  /* توزيع فئات الإيراد */
  categoryBreakdown: [
    { name: "وجبات رئيسية", value: 48, color: "#151A29" },
    { name: "مشروبات", value: 22, color: "#2A3550" },
    { name: "حلويات", value: 14, color: "#5B6B95" },
    { name: "مقبلات", value: 10, color: "#8A95AE" },
    { name: "أخرى", value: 6, color: "#BFC4D2" },
  ],

  /* أحدث الطلبات */
  recentOrders: [
    { id: "#10248", customer: "محمد العتيبي", items: 4, total: 142.50, status: "completed", time: "قبل 5 دقائق" },
    { id: "#10247", customer: "فاطمة الزهراني", items: 2, total: 68.00, status: "preparing", time: "قبل 12 دقيقة" },
    { id: "#10246", customer: "خالد القحطاني", items: 6, total: 215.00, status: "completed", time: "قبل 18 دقيقة" },
    { id: "#10245", customer: "سارة الحربي", items: 3, total: 96.75, status: "completed", time: "قبل 25 دقيقة" },
    { id: "#10244", customer: "عبدالله الشهري", items: 1, total: 32.00, status: "cancelled", time: "قبل 32 دقيقة" },
    { id: "#10243", customer: "نورة الدوسري", items: 5, total: 184.50, status: "preparing", time: "قبل 41 دقيقة" },
  ],

  /* قائمة الطلبات (للصفحة orders.html) */
  orders: [
    { id: "#10248", customer: "محمد العتيبي", phone: "0501234567", items: 4, total: 142.50, status: "completed", payment: "مدفوع", type: "محلي", time: "قبل 5 دقائق", date: "2026-10-07" },
    { id: "#10247", customer: "فاطمة الزهراني", phone: "0509876543", items: 2, total: 68.00, status: "preparing", payment: "مدفوع", type: "محلي", time: "قبل 12 دقيقة", date: "2026-10-07" },
    { id: "#10246", customer: "خالد القحطاني", phone: "0556789012", items: 6, total: 215.00, status: "completed", payment: "مدفوع", type: "توصيل", time: "قبل 18 دقيقة", date: "2026-10-07" },
    { id: "#10245", customer: "سارة الحربي", phone: "0534567890", items: 3, total: 96.75, status: "completed", payment: "مدفوع", type: "محلي", time: "قبل 25 دقيقة", date: "2026-10-07" },
    { id: "#10244", customer: "عبدالله الشهري", phone: "0545678901", items: 1, total: 32.00, status: "cancelled", payment: "مسترد", type: "توصيل", time: "قبل 32 دقيقة", date: "2026-10-07" },
    { id: "#10243", customer: "نورة الدوسري", phone: "0567890123", items: 5, total: 184.50, status: "preparing", payment: "مدفوع", type: "محلي", time: "قبل 41 دقيقة", date: "2026-10-07" },
    { id: "#10242", customer: "أحمد البلوي", phone: "0578901234", items: 3, total: 108.00, status: "completed", payment: "مدفوع", type: "توصيل", time: "قبل 1 ساعة", date: "2026-10-07" },
    { id: "#10241", customer: "هند الغامدي", phone: "0589012345", items: 2, total: 76.50, status: "completed", payment: "مدفوع", type: "محلي", time: "قبل 1 ساعة", date: "2026-10-07" },
    { id: "#10240", customer: "سعود المطيري", phone: "0590123456", items: 4, total: 152.00, status: "completed", payment: "مدفوع", type: "توصيل", time: "قبل ساعتين", date: "2026-10-06" },
    { id: "#10239", customer: "ريم العمري", phone: "0500987654", items: 7, total: 246.00, status: "completed", payment: "مدفوع", type: "محلي", time: "قبل ساعتين", date: "2026-10-06" },
    { id: "#10238", customer: "يوسف الزايدي", phone: "0512345678", items: 2, total: 84.00, status: "refunded", payment: "مسترد", type: "توصيل", time: "قبل 3 ساعات", date: "2026-10-06" },
    { id: "#10237", customer: "ليلى السبيعي", phone: "0523456789", items: 5, total: 178.50, status: "completed", payment: "مدفوع", type: "محلي", time: "قبل 4 ساعات", date: "2026-10-06" },
  ],

  /* قائمة المنيو */
  menu: [
    { id: 1, name: "برجر لحم أنجوس", category: "وجبات رئيسية", price: 38.00, cost: 14.50, available: true, sold: 142, image: "🍔" },
    { id: 2, name: "دجاج مشوي مع الأرز", category: "وجبات رئيسية", price: 42.00, cost: 16.00, available: true, sold: 98, image: "🍗" },
    { id: 3, name: "ستيك ريب آي", category: "وجبات رئيسية", price: 78.00, cost: 32.00, available: true, sold: 64, image: "🥩" },
    { id: 4, name: "سلطة سيزر", category: "مقبلات", price: 22.00, cost: 7.50, available: true, sold: 87, image: "🥗" },
    { id: 5, name: "حمص بالزيت", category: "مقبلات", price: 18.00, cost: 5.00, available: true, sold: 124, image: "🥙" },
    { id: 6, name: "كولا بارد", category: "مشروبات", price: 8.00, cost: 2.00, available: true, sold: 256, image: "🥤" },
    { id: 7, name: "لاتيه", category: "مشروبات", price: 16.00, cost: 4.50, available: true, sold: 178, image: "☕" },
    { id: 8, name: "عصير برتقال طازج", category: "مشروبات", price: 14.00, cost: 4.00, available: true, sold: 92, image: "🍊" },
    { id: 9, name: "كيك شوكولاتة", category: "حلويات", price: 24.00, cost: 8.00, available: true, sold: 73, image: "🍰" },
    { id: 10, name: "تشيز كيك", category: "حلويات", price: 26.00, cost: 9.50, available: true, sold: 56, image: "🍮" },
    { id: 11, name: "باستا ألفريدو", category: "وجبات رئيسية", price: 36.00, cost: 12.00, available: false, sold: 81, image: "🍝" },
    { id: 12, name: "بيتزا مارجريتا", category: "وجبات رئيسية", price: 45.00, cost: 15.00, available: true, sold: 112, image: "🍕" },
  ],

  /* المخزون */
  inventory: [
    { name: "لحم أنجوس طازج", category: "لحوم", stock: 24, min: 15, max: 80, unit: "كجم", status: "good" },
    { name: "دجاج كامل", category: "لحوم", stock: 8, min: 15, max: 60, unit: "كجم", status: "low" },
    { name: "أرز بسمتي", category: "حبوب", stock: 65, min: 30, max: 150, unit: "كجم", status: "good" },
    { name: "زيت زيتون", category: "زيوت", stock: 12, min: 10, max: 50, unit: "لتر", status: "good" },
    { name: "حليب طازج", category: "ألبان", stock: 4, min: 20, max: 100, unit: "لتر", status: "critical" },
    { name: "جبنة موزاريلا", category: "ألبان", stock: 18, min: 10, max: 40, unit: "كجم", status: "good" },
    { name: "طماطم", category: "خضروات", stock: 32, min: 20, max: 80, unit: "كجم", status: "good" },
    { name: "خس", category: "خضروات", stock: 6, min: 10, max: 40, unit: "كجم", status: "low" },
    { name: "قهوة عربية", category: "مشروبات", stock: 22, min: 10, max: 50, unit: "كجم", status: "good" },
    { name: "كولا (علب)", category: "مشروبات", stock: 96, min: 100, max: 500, unit: "علبة", status: "low" },
    { name: "شوكولاتة", category: "حلويات", stock: 14, min: 10, max: 30, unit: "كجم", status: "good" },
    { name: "دقيق", category: "حبوب", stock: 45, min: 30, max: 120, unit: "كجم", status: "good" },
  ],

  /* الموظفين */
  staff: [
    { id: 1, name: "أحمد الراشد", role: "مدير المطعم", phone: "0501234567", email: "ahmed@mazaq-asri.com", status: "active", shift: "صباحي", joined: "2023-03-15" },
    { id: 2, name: "سارة الحربي", role: "محاسبة", phone: "0502345678", email: "sara@mazaq-asri.com", status: "active", shift: "صباحي", joined: "2023-05-22" },
    { id: 3, name: "محمد العتيبي", role: "شيف رئيسي", phone: "0503456789", email: "mohammed@mazaq-asri.com", status: "active", shift: "مسائي", joined: "2022-11-08" },
    { id: 4, name: "فاطمة الزهراني", role: "نادلة", phone: "0504567890", email: "fatima@mazaq-asri.com", status: "active", shift: "مسائي", joined: "2024-01-14" },
    { id: 5, name: "خالد القحطاني", role: "مساعد شيف", phone: "0505678901", email: "khaled@mazaq-asri.com", status: "active", shift: "صباحي", joined: "2023-09-03" },
    { id: 6, name: "نورة الدوسري", role: "كاشير", phone: "0506789012", email: "noura@mazaq-asri.com", status: "active", shift: "صباحي", joined: "2024-02-20" },
    { id: 7, name: "عبدالله الشهري", role: "موصل", phone: "0507890123", email: "abdullah@mazaq-asri.com", status: "active", shift: "مسائي", joined: "2023-07-11" },
    { id: 8, name: "هند الغامدي", role: "نادلة", phone: "0508901234", email: "hind@mazaq-asri.com", status: "leave", shift: "صباحي", joined: "2023-12-05" },
  ],

  /* النشاط الأخير */
  recentActivity: [
    { type: "success", icon: "✓", title: "تم استلام دفعة من المورد — ٣,٤٠٠ ر.س", meta: "قبل ١٠ دقائق" },
    { type: "warning", icon: "!", title: "مخزون الحليب أقل من الحد الأدنى", meta: "قبل ٢٥ دقيقة" },
    { type: "info", icon: "i", title: "طلب جديد #10248 من محمد العتيبي", meta: "قبل ٥ دقائق" },
    { type: "success", icon: "✓", title: "تم إغلاق وردية الصباح — ربح ٤,٢٨٠ ر.س", meta: "قبل ساعة" },
    { type: "danger", icon: "×", title: "تم إلغاء الطلب #10244 من قبل العميل", meta: "قبل ٣٢ دقيقة" },
    { type: "info", icon: "i", title: "انضم موظف جديد — يوسف الزايدي", meta: "قبل ساعتين" },
  ],

  /* أهم المنتجات مبيعاً */
  topItems: [
    { name: "كولا بارد", sold: 256, revenue: 2048, share: 100 },
    { name: "لاتيه", sold: 178, revenue: 2848, share: 78 },
    { name: "برجر لحم أنجوس", sold: 142, revenue: 5396, share: 65 },
    { name: "حمص بالزيت", sold: 124, revenue: 2232, share: 56 },
    { name: "بيتزا مارجريتا", sold: 112, revenue: 5040, share: 51 },
  ],

  /* المعاملات المالية الأخيرة */
  transactions: [
    { date: "2026-10-07", type: "إيراد", description: "مبيعات اليوم", amount: 8420.50, status: "completed" },
    { date: "2026-10-07", type: "مصروف", description: "شراء خضروات من السوق", amount: -420.00, status: "completed" },
    { date: "2026-10-06", type: "إيراد", description: "مبيعات الأمس", amount: 9120.00, status: "completed" },
    { date: "2026-10-06", type: "مصروف", description: "فاتورة الكهرباء", amount: -1850.00, status: "completed" },
    { date: "2026-10-05", type: "إيراد", description: "مبيعات", amount: 7800.00, status: "completed" },
    { date: "2026-10-05", type: "مصروف", description: "رواتب الموظفين", amount: -28500.00, status: "completed" },
    { date: "2026-10-04", type: "إيراد", description: "مبيعات", amount: 6500.00, status: "completed" },
    { date: "2026-10-04", type: "مصروف", description: "شراء لحوم", amount: -2400.00, status: "completed" },
  ],

  /* فروع الشركة */
  branches: [
    { id: 1, name: "فرع العليا", location: "الرياض - حي العليا", phone: "+966 11 234 5678", manager: "أحمد الراشد", open: true },
    { id: 2, name: "فرع الملز", location: "الرياض - حي الملز", phone: "+966 11 234 5679", manager: "خالد القحطاني", open: true },
    { id: 3, name: "فرع جدة", location: "جدة - الكورنيش", phone: "+966 12 234 5680", manager: "محمد العتيبي", open: true },
    { id: 4, name: "فرع الدمام", location: "الدمام - الواجهة البحرية", phone: "+966 13 234 5681", manager: "سعد المطيري", open: true },
  ],

  /* الورديات الحالية (المفتوحة) */
  openShifts: [
    { id: 1, branchId: 1, shiftType: "صباحية", worker: "فاطمة الزهراني", startedAt: "10:00", date: "2026-10-07", openingBalance: 1500, custodyAmount: 500, status: "open" },
    { id: 2, branchId: 2, shiftType: "صباحية", worker: "نورة الدوسري", startedAt: "10:00", date: "2026-10-07", openingBalance: 1500, custodyAmount: 500, status: "open" },
    { id: 3, branchId: 3, shiftType: "صباحية", worker: "أحمد البلوي", startedAt: "10:30", date: "2026-10-07", openingBalance: 1500, custodyAmount: 500, status: "open" },
    { id: 4, branchId: 4, shiftType: "مسائية", worker: "عبدالله الشهري", startedAt: "16:00", date: "2026-10-07", openingBalance: 1000, custodyAmount: 300, status: "open" },
  ],

  /* سجل الإقفالات السابقة */
  closings: [
    {
      id: 1, branchId: 1, shiftType: "مسائية", date: "2026-10-06", worker: "عبدالله الشهري",
      closedBy: "أحمد الراشد",
      openingBalance: 1500,
      cashSales: 4200, networkSales: 2800,
      cashOut: 350, custodyStart: 500, custodyUsed: 280, custodyEnd: 220,
      actualCash: 7290, expectedCash: 7290, difference: 0,
      transferredToTreasury: 7070, treasuryConfirmed: true,
      closedAt: "23:45", notes: "إقفال سلس بدون ملاحظات"
    },
    {
      id: 2, branchId: 2, shiftType: "مسائية", date: "2026-10-06", worker: "هند الغامدي",
      closedBy: "خالد القحطاني",
      openingBalance: 1500,
      cashSales: 3850, networkSales: 2100,
      cashOut: 180, custodyStart: 500, custodyUsed: 410, custodyEnd: 90,
      actualCash: 6760, expectedCash: 6760, difference: 0,
      transferredToTreasury: 6670, treasuryConfirmed: true,
      closedAt: "23:30", notes: ""
    },
    {
      id: 3, branchId: 3, shiftType: "مسائية", date: "2026-10-06", worker: "سعود المطيري",
      closedBy: "محمد العتيبي",
      openingBalance: 1500,
      cashSales: 5200, networkSales: 3450,
      cashOut: 600, custodyStart: 500, custodyUsed: 200, custodyEnd: 300,
      actualCash: 8400, expectedCash: 8400, difference: 0,
      transferredToTreasury: 8100, treasuryConfirmed: true,
      closedAt: "23:55", notes: ""
    },
    {
      id: 4, branchId: 1, shiftType: "صباحية", date: "2026-10-07", worker: "فاطمة الزهراني",
      closedBy: "أحمد الراشد",
      openingBalance: 1500,
      cashSales: 2950, networkSales: 1820,
      cashOut: 120, custodyStart: 500, custodyUsed: 180, custodyEnd: 320,
      actualCash: 5950, expectedCash: 5950, difference: 0,
      transferredToTreasury: 5630, treasuryConfirmed: true,
      closedAt: "16:15", notes: ""
    },
    {
      id: 5, branchId: 2, shiftType: "صباحية", date: "2026-10-07", worker: "نورة الدوسري",
      closedBy: "خالد القحطاني",
      openingBalance: 1500,
      cashSales: 2680, networkSales: 1540,
      cashOut: 90, custodyStart: 500, custodyUsed: 220, custodyEnd: 280,
      actualCash: 5370, expectedCash: 5400, difference: -30,
      transferredToTreasury: 5090, treasuryConfirmed: true,
      closedAt: "16:20", notes: "عجز 30 ر.س - تم التنويه"
    },
  ],

  /* حركة الخزينة المركزية (إيداعات الفروع) */
  treasuryMovements: [
    { id: 1, branchId: 1, date: "2026-10-06", amount: 7070, type: "deposit", source: "إقفال وردية مسائية", status: "confirmed" },
    { id: 2, branchId: 2, date: "2026-10-06", amount: 6670, type: "deposit", source: "إقفال وردية مسائية", status: "confirmed" },
    { id: 3, branchId: 3, date: "2026-10-06", amount: 8100, type: "deposit", source: "إقفال وردية مسائية", status: "confirmed" },
    { id: 4, branchId: 1, date: "2026-10-07", amount: 5630, type: "deposit", source: "إقفال وردية صباحية", status: "confirmed" },
    { id: 5, branchId: 2, date: "2026-10-07", amount: 5090, type: "deposit", source: "إقفال وردية صباحية", status: "confirmed" },
    { id: 6, branchId: 4, date: "2026-10-06", amount: 4250, type: "deposit", source: "إقفال وردية مسائية", status: "confirmed" },
    { id: 7, branchId: 3, date: "2026-10-05", amount: 6800, type: "deposit", source: "إقفال وردية مسائية", status: "confirmed" },
  ],

  /* العُهد الحالية (المبالغ المتروكة عند الفروع) */
  custodyRecords: [
    { id: 1, branchId: 1, manager: "أحمد الراشد", amount: 500, purpose: "مصاريف تشغيلية", status: "active", givenAt: "2026-10-07", toWorker: "فاطمة الزهراني" },
    { id: 2, branchId: 2, manager: "خالد القحطاني", amount: 500, purpose: "مصاريف تشغيلية", status: "active", givenAt: "2026-10-07", toWorker: "نورة الدوسري" },
    { id: 3, branchId: 3, manager: "محمد العتيبي", amount: 500, purpose: "مصاريف تشغيلية", status: "active", givenAt: "2026-10-07", toWorker: "أحمد البلوي" },
    { id: 4, branchId: 4, manager: "سعد المطيري", amount: 300, purpose: "مصاريف مسائية", status: "active", givenAt: "2026-10-07", toWorker: "عبدالله الشهري" },
  ],

  /* إعدادات المطعم */
  settings: {
    restaurant: {
      name: "شركة المذاق العصري",
      shortName: "المذاق العصري",
      phone: "+966 11 234 5678",
      email: "info@mazaq-asri.com",
      address: "حي العليا، الرياض، المملكة العربية السعودية",
      workingHours: "١٠:٠٠ ص — ١١:٠٠ م",
      taxNumber: "300123456700003",
      currency: "SAR",
    },
    financial: {
      currency: "ر.س",
      taxRate: 15,
      serviceCharge: 10,
      fiscalYearStart: "01-01",
      autoBackup: true,
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: true,
      lowStockAlerts: true,
      dailyReport: true,
      weeklyReport: true,
    },
  },
});