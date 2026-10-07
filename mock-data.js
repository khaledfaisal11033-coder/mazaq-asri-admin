/* =============================================================
   شركة المذاق العصري — بيانات المحاسبة المالية
   بيانات للعرض فقط، تُستبدل بـ API calls لاحقاً
   ============================================================= */

window.MOCK_DATA = Object.freeze({
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

  /* حركة الخزينة المركزية (إيداعات الكاش من الفروع) */
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

  /* إعدادات محاسبة المطعم */
  settings: {
    restaurant: {
      name: "شركة المذاق العصري",
      shortName: "المذاق العصري",
      phone: "+966 11 234 5678",
      email: "info@mazaq-asri.com",
      address: "حي العليا، الرياض، المملكة العربية السعودية",
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
  },

  /* التقرير اليومي لكل فرع (مثل ورقة الإكسل) */
  dailyFinancials: [
    // فرع العليا (branchId: 1)
    { id: 1, branchId: 1, date: "2026-10-01", day: "الأربعاء", cash: 160.00, network: 348.00, outDescription: "حريف + ماء", outAmount: 74.00 },
    { id: 2, branchId: 1, date: "2026-10-02", day: "الخميس", cash: 145.00, network: 472.00, outDescription: "حريف", outAmount: 69.00 },
    { id: 3, branchId: 1, date: "2026-10-03", day: "الجمعة", cash: 340.00, network: 452.00, outDescription: "حريف", outAmount: 81.00 },
    { id: 4, branchId: 1, date: "2026-10-04", day: "السبت", cash: 405.00, network: 353.00, outDescription: "حريف", outAmount: 156.00 },
    { id: 5, branchId: 1, date: "2026-10-05", day: "الأحد", cash: 100.00, network: 313.00, outDescription: "حريف", outAmount: 54.00 },
    { id: 6, branchId: 1, date: "2026-10-06", day: "الإثنين", cash: 400.00, network: 515.00, outDescription: "حريف", outAmount: 123.00 },
    { id: 7, branchId: 1, date: "2026-10-07", day: "الثلاثاء", cash: 350.00, network: 330.00, outDescription: "حريف", outAmount: 76.00 },

    // فرع الملز (branchId: 2)
    { id: 8, branchId: 2, date: "2026-10-01", day: "الأربعاء", cash: 245.00, network: 30.00, outDescription: "حريف", outAmount: 25.00 },
    { id: 9, branchId: 2, date: "2026-10-02", day: "الخميس", cash: 230.00, network: 371.00, outDescription: "حريف + ماء", outAmount: 98.00 },
    { id: 10, branchId: 2, date: "2026-10-03", day: "الجمعة", cash: 490.00, network: 300.00, outDescription: "حريف", outAmount: 117.00 },
    { id: 11, branchId: 2, date: "2026-10-04", day: "السبت", cash: 400.00, network: 344.00, outDescription: "حريف", outAmount: 81.00 },
    { id: 12, branchId: 2, date: "2026-10-05", day: "الأحد", cash: 255.00, network: 332.00, outDescription: "حريف", outAmount: 132.00 },
    { id: 13, branchId: 2, date: "2026-10-06", day: "الإثنين", cash: 305.00, network: 313.00, outDescription: "حريف + ماء", outAmount: 99.00 },
    { id: 14, branchId: 2, date: "2026-10-07", day: "الثلاثاء", cash: 345.00, network: 391.00, outDescription: "حريف", outAmount: 62.00 },

    // فرع جدة (branchId: 3)
    { id: 15, branchId: 3, date: "2026-10-01", day: "الأربعاء", cash: 255.00, network: 723.00, outDescription: "حريف", outAmount: 16.00 },
    { id: 16, branchId: 3, date: "2026-10-02", day: "الخميس", cash: 135.00, network: 291.00, outDescription: "حريف", outAmount: 0.00 },
    { id: 17, branchId: 3, date: "2026-10-03", day: "الجمعة", cash: 200.00, network: 285.00, outDescription: "حريف", outAmount: 173.00 },
    { id: 18, branchId: 3, date: "2026-10-04", day: "السبت", cash: 418.00, network: 338.00, outDescription: "حريف", outAmount: 37.00 },
    { id: 19, branchId: 3, date: "2026-10-05", day: "الأحد", cash: 200.00, network: 360.00, outDescription: "حريف", outAmount: 2009.00 },
    { id: 20, branchId: 3, date: "2026-10-06", day: "الإثنين", cash: 215.00, network: 215.00, outDescription: "حريف", outAmount: 0.00 },
    { id: 21, branchId: 3, date: "2026-10-07", day: "الثلاثاء", cash: 240.00, network: 105.00, outDescription: "حريف", outAmount: 78.00 },
  ],
});