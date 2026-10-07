/* =============================================================
   شركة المذاق العصري — Default data (يُستبدل بـ store.js)
   البيانات الفعلية تُحفظ في localStorage عبر Store
   ============================================================= */

// هذي مجرد بيانات افتراضية للعرض الأولي قبل أن يضيف المستخدم بياناته
window.MOCK_DATA = Object.freeze({
  branches: [
    { id: 1, name: "فرع 1", location: "الرياض", phone: "", manager: "", open: true },
    { id: 2, name: "فرع 2", location: "الرياض", phone: "", manager: "", open: true },
    { id: 3, name: "فرع 3", location: "جدة", phone: "", manager: "", open: true },
    { id: 4, name: "فرع 4", location: "الدمام", phone: "", manager: "", open: true },
  ],
  openShifts: [],
  closings: [],
  treasuryMovements: [],
  custodyRecords: [],
  dailyFinancials: [],
});