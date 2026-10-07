/* =============================================================
   شركة المذاق العصري — Data Store
   يدير كل البيانات (فروع، ورديات، اقفالات، خزينة، عُهد)
   ويحفظها تلقائياً في localStorage
   ============================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "mazaq.data.v1";

  function defaultData() {
    return {
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
    };
  }

  function load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultData();
      const data = JSON.parse(raw);
      // ضمان وجود المفاتيح
      const def = defaultData();
      return Object.assign({}, def, data);
    } catch (e) {
      return defaultData();
    }
  }

  function save(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("localStorage غير متاح");
    }
  }

  function get() {
    if (!window.STATE) window.STATE = load();
    return window.STATE;
  }

  function persist() {
    if (window.STATE) save(window.STATE);
  }

  /* ---------- فروع ---------- */
  function addBranch(branch) {
    const data = get();
    const nextId = data.branches.length > 0 ? Math.max(...data.branches.map((b) => b.id)) + 1 : 1;
    const newBranch = Object.assign({ id: nextId, open: true }, branch);
    data.branches.push(newBranch);
    persist();
    return newBranch;
  }

  function updateBranch(id, updates) {
    const data = get();
    const idx = data.branches.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    data.branches[idx] = Object.assign({}, data.branches[idx], updates);
    persist();
    return true;
  }

  function deleteBranch(id) {
    const data = get();
    data.branches = data.branches.filter((b) => b.id !== id);
    data.openShifts = data.openShifts.filter((s) => s.branchId !== id);
    data.closings = data.closings.filter((c) => c.branchId !== id);
    data.treasuryMovements = data.treasuryMovements.filter((t) => t.branchId !== id);
    data.custodyRecords = data.custodyRecords.filter((c) => c.branchId !== id);
    data.dailyFinancials = data.dailyFinancials.filter((d) => d.branchId !== id);
    persist();
    return true;
  }

  function resetAll() {
    window.STATE = defaultData();
    persist();
  }

  /* ---------- ورديات ---------- */
  function startShift(branchId, shiftType, worker, openingBalance, custodyAmount) {
    const data = get();
    const nextId = data.openShifts.length > 0 ? Math.max(...data.openShifts.map((s) => s.id)) + 1 : 1;
    const shift = {
      id: nextId,
      branchId,
      shiftType: shiftType || "صباحية",
      worker: worker || "—",
      startedAt: new Date().toTimeString().slice(0, 5),
      date: new Date().toISOString().slice(0, 10),
      openingBalance: openingBalance || 0,
      custodyAmount: custodyAmount || 0,
      status: "open",
    };
    data.openShifts.push(shift);
    persist();
    return shift;
  }

  function closeShift(shiftId, payload) {
    const data = get();
    const idx = data.openShifts.findIndex((s) => s.id === shiftId);
    if (idx === -1) return null;
    const shift = data.openShifts[idx];
    const opening = shift.openingBalance;
    const expected = opening + (payload.cashSales || 0) - (payload.cashOut || 0);
    const diff = (payload.actualCash || 0) - expected;

    const nextClosingId = data.closings.length > 0 ? Math.max(...data.closings.map((c) => c.id)) + 1 : 1;
    const closing = {
      id: nextClosingId,
      branchId: shift.branchId,
      shiftType: shift.shiftType,
      date: new Date().toISOString().slice(0, 10),
      worker: shift.worker,
      closedBy: payload.closedBy || "المدير العام",
      openingBalance: opening,
      cashSales: payload.cashSales || 0,
      networkSales: payload.networkSales || 0,
      cashOut: payload.cashOut || 0,
      custodyStart: shift.custodyAmount,
      custodyUsed: payload.custodyUsed || 0,
      custodyEnd: Math.max(0, shift.custodyAmount - (payload.custodyUsed || 0)),
      actualCash: payload.actualCash || 0,
      expectedCash: expected,
      difference: diff,
      transferredToTreasury: payload.actualCash || 0,
      treasuryConfirmed: true,
      closedAt: new Date().toTimeString().slice(0, 5),
      notes: payload.notes || "",
    };
    data.closings.unshift(closing);

    // إضافة للخزينة (الكاش فقط)
    const nextTreasuryId = data.treasuryMovements.length > 0 ? Math.max(...data.treasuryMovements.map((t) => t.id)) + 1 : 1;
    data.treasuryMovements.unshift({
      id: nextTreasuryId,
      branchId: shift.branchId,
      date: new Date().toISOString().slice(0, 10),
      amount: payload.actualCash || 0,
      type: "deposit",
      source: `إقفال وردية ${shift.shiftType}`,
      status: "confirmed",
    });

    // حذف الوردية من المفتوحة
    data.openShifts.splice(idx, 1);

    persist();
    return closing;
  }

  /* ---------- عُهد ---------- */
  function addCustody(branchId, manager, worker, amount, purpose) {
    const data = get();
    const nextId = data.custodyRecords.length > 0 ? Math.max(...data.custodyRecords.map((c) => c.id)) + 1 : 1;
    const custody = {
      id: nextId,
      branchId,
      manager: manager || "—",
      amount: amount || 0,
      purpose: purpose || "مصاريف تشغيلية",
      status: "active",
      givenAt: new Date().toISOString().slice(0, 10),
      toWorker: worker || "—",
    };
    data.custodyRecords.push(custody);
    persist();
    return custody;
  }

  /* ---------- تسجيل مالي يومي ---------- */
  function addDailyEntry(branchId, date, day, cash, network, outDescription, outAmount) {
    const data = get();
    const nextId = data.dailyFinancials.length > 0 ? Math.max(...data.dailyFinancials.map((d) => d.id)) + 1 : 1;
    const entry = {
      id: nextId,
      branchId,
      date: date || new Date().toISOString().slice(0, 10),
      day: day || "",
      cash: cash || 0,
      network: network || 0,
      outDescription: outDescription || "",
      outAmount: outAmount || 0,
    };
    data.dailyFinancials.push(entry);
    persist();
    return entry;
  }

  function deleteDailyEntry(id) {
    const data = get();
    data.dailyFinancials = data.dailyFinancials.filter((d) => d.id !== id);
    persist();
  }

  /* ---------- تصدير CSV ---------- */
  function exportCSV(table, filename) {
    const data = get();
    let rows = [];
    let headers = [];

    if (table === "branches") {
      headers = ["الرقم", "الاسم", "الموقع", "المدير", "الهاتف"];
      rows = data.branches.map((b) => [b.id, b.name, b.location, b.manager, b.phone]);
    } else if (table === "closings") {
      headers = ["الفرع", "التاريخ", "الوردية", "كاش", "شبكة", "خرج", "عهدة", "للخزينة", "الفرق"];
      rows = data.closings.map((c) => [
        data.branches.find((b) => b.id === c.branchId)?.name || "—",
        c.date,
        c.shiftType,
        c.cashSales,
        c.networkSales,
        c.cashOut,
        c.custodyUsed,
        c.transferredToTreasury,
        c.difference,
      ]);
    } else if (table === "daily") {
      headers = ["الفرع", "التاريخ", "اليوم", "كاش", "شبكة", "وصف الخروج", "المبلغ"];
      rows = data.dailyFinancials.map((d) => [
        data.branches.find((b) => b.id === d.branchId)?.name || "—",
        d.date,
        d.day,
        d.cash,
        d.network,
        d.outDescription,
        d.outAmount,
      ]);
    } else if (table === "treasury") {
      headers = ["التاريخ", "الفرع", "المبلغ", "المصدر", "الحالة"];
      rows = data.treasuryMovements.map((t) => [
        t.date,
        data.branches.find((b) => b.id === t.branchId)?.name || "—",
        t.amount,
        t.source,
        t.status,
      ]);
    }

    if (rows.length === 0) {
      alert("لا توجد بيانات للتصدير");
      return;
    }

    const csv = [headers, ...rows].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename || `${table}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /* ---------- الواجهة العامة ---------- */
  window.Store = {
    get,
    persist,
    resetAll,
    addBranch,
    updateBranch,
    deleteBranch,
    startShift,
    closeShift,
    addCustody,
    addDailyEntry,
    deleteDailyEntry,
    exportCSV,
  };
})();