document.addEventListener('DOMContentLoaded', () => {
    // --- APPLICATION STATE & CONFIGURATION ---
    let appState = {
        periods: [],
        tiers: [],
        activePeriodId: null
    };

    const unitStructure = [
        { floor: 'طبقه اول', units: Array.from({length: 7}, (_, i) => `واحد ${i + 1}`) },
        { floor: 'طبقه دوم', units: Array.from({length: 7}, (_, i) => `واحد ${i + 8}`) },
        { floor: 'طبقه سوم', units: Array.from({length: 7}, (_, i) => `واحد ${i + 15}`) },
        { floor: 'طبقه چهارم', units: Array.from({length: 7}, (_, i) => `واحد ${i + 22}`) },
        { floor: 'طبقه پنجم', units: Array.from({length: 7}, (_, i) => `واحد ${i + 29}`) },
        { floor: 'طبقه ششم', units: Array.from({length: 7}, (_, i) => `واحد ${i + 36}`) },
        { floor: 'طبقه هفتم', units: Array.from({length: 7}, (_, i) => `واحد ${i + 43}`) },
        { floor: 'طبقه هشتم', units: Array.from({length: 7}, (_, i) => `واحد ${i + 50}`) },
        { floor: 'طبقه نهم', units: Array.from({length: 7}, (_, i) => `واحد ${i + 57}`) },
        { floor: 'همکف', units: ['واحد ۶۴'] },
        { floor: 'مشاعات', units: ['بخش عمومی', 'بخش تجاری'] }
    ];
    
    // Base64 for Vazir font to embed in PDF
    const vazirFontBase64 = 'AAEAAAARAQAABAAQR0RFRgQsBBMAAAE4AAAAHkdQT1O5VIX/AAAEyAAAAGxHU1VCv1L+qgAABRAAAABYQlBLVGFyAAAA/AAAAD5PUy8y+jtoLgAAAVgAAABgY21hcCAA9/MAAAGYAAABUmdhc3AAAAAQAAAEwAAAAAhnbHlmwsmuegAAAagAAADwaGVhZBNu2dsAAAEcAAAANmhoZWEH3gOFAAABPAAAACRobXR4DAAAAAAAAbAAAAAQbG9jYQAKADIAAAGQAAAADG1heHABGgBuAAABKAAAACBuYW1lRchzIAAABJAAAAIxcG9zdL4o/lUAABwAAAAAvgABAAAAAQAA1YG9y18PPPUACwQAAAAAANiVn+IAAAAA2JWf4gAAAAAD3/MAAAAAAAQAAgAAAAAAAAABAAAEAAAAAAAAAAQAAUAAAAAEAIAAAAEAAAAAywAAAEsAAwABAAAALAADAAoAAQAgA5AABAAQAAAACgAIAAIAAgAgA5AAT//f//AAAAAAAgA5AA3//v//8AAAAAAQAEAAUACAADAAQABQAGAAcACAAJAAoACwAMAA0ABgACAAAAAAoAfgADAAEECQAAADYAAAADAAEECQABACgANAADAAEECQACAA4ANgADAAEECQADADgAQgADAAEECQAEADgAUgADAAEECQAFABYAYgADAAEECQAGACYAcgADAAEECQAIADgA2gADAAEECQAKADAA+gADAAEECQALAEAA/gADAAEECQAMAEgBBAADAAEECQANADgBGAADAAEECQAAAAgAFAAcAFAAaACgAKgAsAC4AMAAyADgAOgA8AD4AQgBEAEgASgBMAE4AUABSAFQAVgBYAFoAXABeAGIAZABoAGoAbABuAHAAdAB2AHgAegB8AIAAggCEAIYAjACSAJQAlgCYAJoAnACiAKQAqgCsALoAwADMANAA2ADgAOgA8AD4AQQBDAEUARwBJAEsATQBPAGIBkgAAABQAFAA4AFAAcACAAIgAkACYAQIBigGKAQIBiwGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQIBigGKAQ-';

    // --- DOM ELEMENTS ---
    const DOMElements = {
        mainTableBody: document.getElementById('main-table-body'),
        totalConsumptionEl: document.getElementById('total-consumption'),
        totalCalculatedCostEl: document.getElementById('total-calculated-cost'),
        totalUnitsEl: document.getElementById('total-units'),
        averageConsumptionEl: document.getElementById('average-consumption'),
        currentPeriodTitle: document.getElementById('current-period-title'),
        currentPeriodDates: document.getElementById('current-period-dates'),
        mainContent: document.getElementById('main-content'),
        noPeriodSelected: document.getElementById('no-period-selected'),
        exportPdfBtn: document.getElementById('export-pdf-btn'),
        exportExcelBtn: document.getElementById('export-excel-btn'),
        searchInput: document.getElementById('search-input'),
        
        // Modals
        periodsModal: document.getElementById('periods-modal'),
        settingsModal: document.getElementById('settings-modal'),
        confirmModal: document.getElementById('confirm-modal'),
        
        // Settings Menu
        settingsMenuButton: document.getElementById('settings-menu-button'),
        settingsMenu: document.getElementById('settings-menu'),
        
        // Toast
        toast: document.getElementById('toast'),
        toastMessage: document.getElementById('toast-message'),
    };

    // --- UTILITY FUNCTIONS ---
    const showToast = (message, type = 'success') => {
        DOMElements.toastMessage.textContent = message;
        DOMElements.toast.className = `toast fixed bottom-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg z-50 show ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
        setTimeout(() => {
            DOMElements.toast.classList.remove('show');
        }, 3000);
    };

    const openModal = (modal) => {
        modal.classList.add('active');
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.remove('scale-95', 'opacity-0');
        }, 10);
    };

    const closeModal = (modal) => {
        modal.querySelector('.modal-content').classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.remove('active');
        }, 300);
    };

    // --- DATA & STATE MANAGEMENT ---
    function loadState() {
        appState.periods = JSON.parse(localStorage.getItem('waterBillPeriods_v5')) || [];
        appState.tiers = JSON.parse(localStorage.getItem('waterBillTiers_v5')) || getDefaultTiers();
        appState.activePeriodId = localStorage.getItem('waterBillActivePeriodId_v5') || null;
    }

    function saveState() {
        localStorage.setItem('waterBillPeriods_v5', JSON.stringify(appState.periods));
        localStorage.setItem('waterBillTiers_v5', JSON.stringify(appState.tiers));
        localStorage.setItem('waterBillActivePeriodId_v5', appState.activePeriodId);
    }
    
    function getDefaultTiers() {
        return [
            { from: 0, to: 7, rate: 1200 },
            { from: 7, to: 15, rate: 1800 },
            { from: 15, to: 25, rate: 3000 },
            { from: 25, to: Infinity, rate: 5000 }
        ];
    }

    // --- CORE LOGIC ---
    function calculateUnitCost(consumption) {
        let cost = 0;
        const sortedTiers = [...appState.tiers].sort((a, b) => a.from - b.from);
        let remainingConsumption = consumption;

        for (const tier of sortedTiers) {
            if (remainingConsumption <= 0) break;
            
            if (consumption > tier.from) {
                const tierRange = tier.to === Infinity ? remainingConsumption : tier.to - tier.from;
                const consumptionInTier = Math.min(remainingConsumption, tierRange);
                if (consumptionInTier > 0) {
                   cost += consumptionInTier * tier.rate;
                   remainingConsumption -= consumptionInTier;
                }
            }
        }
        return cost;
    }
    
    function getConsumptionTierName(consumption) {
        if (consumption <= 0) return '-';
        const sortedTiers = [...appState.tiers].sort((a, b) => a.from - b.from);
        for (let i = 0; i < sortedTiers.length; i++) {
            const tier = sortedTiers[i];
            if (consumption > tier.from && consumption <= tier.to) {
                return `پلکان ${i + 1}`;
            }
        }
        if (consumption > sortedTiers[sortedTiers.length - 1].from) {
            return `پلکان ${sortedTiers.length}`;
        }
        return '-';
    }

    function calculateAll() {
        const period = appState.periods.find(p => p.id == appState.activePeriodId);
        if (!period) return;

        let totalConsumption = 0;
        let totalCost = 0;
        let unitCount = 0;

        period.readings.forEach(r => {
            r.consumption = r.currentReading - r.prevReading;
            if (r.consumption < 0) r.consumption = 0;
            r.cost = calculateUnitCost(r.consumption);
            r.tierName = getConsumptionTierName(r.consumption);
            totalConsumption += r.consumption;
            totalCost += r.cost;
            unitCount++;
        });
        
        updateDashboard(totalConsumption, totalCost, unitCount);
        renderTable();
        saveState();
    }

    // --- RENDERING FUNCTIONS ---
    function updateDashboard(totalConsumption, totalCost, unitCount) {
        DOMElements.totalConsumptionEl.textContent = `${totalConsumption.toFixed(2)} m³`;
        DOMElements.totalCalculatedCostEl.textContent = `${Math.round(totalCost).toLocaleString('fa-IR')} تومان`;
        DOMElements.totalUnitsEl.textContent = unitCount;
        DOMElements.averageConsumptionEl.textContent = unitCount > 0 ? `${(totalConsumption / unitCount).toFixed(2)} m³` : '0 m³';
    }

    function renderTable(filter = '') {
        const period = appState.periods.find(p => p.id == appState.activePeriodId);
        if (!period) return;

        DOMElements.mainTableBody.innerHTML = '';
        const allConsumptions = period.readings.map(r => r.consumption);
        const maxConsumption = Math.max(...allConsumptions, 1);
        const filterText = filter.trim().toLowerCase();

        unitStructure.forEach(floor => {
            const floorUnits = floor.units.filter(unitName => {
                const unitReading = period.readings.find(r => r.name === unitName);
                return unitReading && unitName.toLowerCase().includes(filterText);
            });

            if (floorUnits.length === 0) return;

            const floorHeaderRow = document.createElement('tr');
            floorHeaderRow.className = 'bg-gray-100 sticky top-0 z-10';
            floorHeaderRow.innerHTML = `<td colspan="6" class="p-2 text-right pr-4 font-bold text-gray-600">${floor.floor}</td>`;
            DOMElements.mainTableBody.appendChild(floorHeaderRow);

            floorUnits.forEach(unitName => {
                const unitReading = period.readings.find(r => r.name === unitName);
                
                const ratio = Math.min(unitReading.consumption / (maxConsumption * 0.75), 1);
                const r = Math.round(255 - (255 - 239) * ratio); // from 255 to 239
                const g = Math.round(255 - (255 - 68) * ratio);  // from 255 to 68
                const b = Math.round(255 - (255 - 68) * ratio);  // from 255 to 68
                const color = `rgb(${r}, ${g}, ${b})`;

                const row = document.createElement('tr');
                row.className = 'border-b hover:bg-gray-50';
                row.style.backgroundColor = color;

                row.innerHTML = `
                    <td class="p-3 font-medium text-gray-900">${unitReading.name}</td>
                    <td class="p-3"><input type="number" class="w-24 p-1 text-center border rounded-md bg-white" value="${unitReading.prevReading}" data-name="${unitReading.name}" data-field="prevReading"></td>
                    <td class="p-3"><input type="number" class="w-24 p-1 text-center border rounded-md bg-white" value="${unitReading.currentReading}" data-name="${unitReading.name}" data-field="currentReading"></td>
                    <td class="p-3 font-bold">${unitReading.consumption.toFixed(2)}</td>
                    <td class="p-3 text-sm">${unitReading.tierName}</td>
                    <td class="p-3 font-bold text-indigo-700">${Math.round(unitReading.cost).toLocaleString('fa-IR')}</td>
                `;
                DOMElements.mainTableBody.appendChild(row);
            });
        });
    }
    
    function renderActivePeriod() {
        const period = appState.periods.find(p => p.id == appState.activePeriodId);
        if (!period) {
            showNoPeriodView();
            return;
        }
        
        DOMElements.mainContent.style.display = 'block';
        DOMElements.noPeriodSelected.style.display = 'none';
        DOMElements.exportPdfBtn.disabled = false;
        DOMElements.exportExcelBtn.disabled = false;
        DOMElements.currentPeriodTitle.textContent = `دوره فعال: ${period.name}`;
        DOMElements.currentPeriodDates.textContent = `از ${period.startDate} تا ${period.endDate}`;
        
        calculateAll();
    }

    function showNoPeriodView() {
        DOMElements.mainContent.style.display = 'none';
        DOMElements.noPeriodSelected.style.display = 'block';
        DOMElements.exportPdfBtn.disabled = true;
        DOMElements.exportExcelBtn.disabled = true;
        DOMElements.currentPeriodTitle.textContent = 'هیچ دوره‌ای انتخاب نشده است';
        DOMElements.currentPeriodDates.textContent = '';
        updateDashboard(0, 0, 0);
    }

    // --- PERIODS MODAL LOGIC ---
    function renderPeriodsList() {
        const periodsList = document.getElementById('periods-list');
        periodsList.innerHTML = '';
        if (appState.periods.length === 0) {
            periodsList.innerHTML = '<p class="text-center text-gray-500">هیچ دوره‌ای ساخته نشده است.</p>';
        } else {
            [...appState.periods].sort((a, b) => b.id - a.id).forEach(period => {
                const periodEl = document.createElement('div');
                periodEl.className = `border-b p-3 flex justify-between items-center hover:bg-gray-50 transition-colors ${period.id == appState.activePeriodId ? 'bg-indigo-50 border-r-4 border-indigo-500' : ''}`;
                periodEl.innerHTML = `
                    <div>
                        <p class="font-bold text-gray-800">${period.name}</p>
                        <p class="text-sm text-gray-500">${period.startDate} - ${period.endDate}</p>
                    </div>
                    <div class="flex gap-1">
                        <button class="p-2 text-gray-500 hover:text-blue-600" data-action="select" data-id="${period.id}" title="انتخاب دوره"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></button>
                        <button class="p-2 text-gray-500 hover:text-yellow-600" data-action="edit" data-id="${period.id}" title="ویرایش دوره"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg></button>
                        <button class="p-2 text-gray-500 hover:text-red-600" data-action="delete" data-id="${period.id}" title="حذف دوره"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg></button>
                    </div>
                `;
                periodsList.appendChild(periodEl);
            });
        }
    }

    function resetPeriodForm() {
        document.getElementById('period-form').reset();
        document.getElementById('edit-period-id').value = '';
        document.getElementById('period-form-title').textContent = 'ایجاد دوره جدید';
        document.getElementById('save-period-btn-text').textContent = 'ایجاد دوره';
        document.getElementById('cancel-edit-period-btn').classList.add('hidden');
    }

    // --- SETTINGS MODAL LOGIC ---
     function openSettingsModal() {
        const tiersContainer = document.getElementById('tiers-container');
        tiersContainer.innerHTML = '';
        appState.tiers.forEach((tier, index) => {
            const tierEl = document.createElement('div');
            tierEl.className = 'grid grid-cols-10 gap-2 items-center';
            tierEl.innerHTML = `
                <span class="col-span-1 text-sm text-gray-500">از:</span>
                <input type="number" placeholder="m³" class="col-span-2 p-1 border rounded-md" value="${tier.from}" data-index="${index}" data-field="from">
                <span class="col-span-1 text-sm text-gray-500">تا:</span>
                <input type="number" placeholder="m³" class="col-span-2 p-1 border rounded-md" value="${tier.to === Infinity ? '' : tier.to}" data-index="${index}" data-field="to">
                <span class="col-span-1 text-sm text-gray-500">نرخ:</span>
                <input type="number" placeholder="تومان" class="col-span-2 p-1 border rounded-md" value="${tier.rate}" data-index="${index}" data-field="rate">
                <button class="col-span-1 bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600 flex justify-center items-center" data-index="${index}" data-action="remove-tier">-</button>
            `;
            tiersContainer.appendChild(tierEl);
        });
        openModal(DOMElements.settingsModal);
    }
    
    // --- CONFIRM MODAL ---
    function showConfirmModal(title, message, onConfirm) {
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = message;
        openModal(DOMElements.confirmModal);

        const okBtn = document.getElementById('confirm-ok-btn');
        const cancelBtn = document.getElementById('confirm-cancel-btn');

        const confirmHandler = () => {
            onConfirm();
            closeModal(DOMElements.confirmModal);
            cleanup();
        };

        const cancelHandler = () => {
            closeModal(DOMElements.confirmModal);
            cleanup();
        };
        
        const cleanup = () => {
            okBtn.removeEventListener('click', confirmHandler);
            cancelBtn.removeEventListener('click', cancelHandler);
        }

        okBtn.addEventListener('click', confirmHandler, { once: true });
        cancelBtn.addEventListener('click', cancelHandler, { once: true });
    }

    // --- EVENT HANDLERS SETUP ---
    function attachEventListeners() {
        // Main table input changes
        DOMElements.mainTableBody.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
                const period = appState.periods.find(p => p.id == appState.activePeriodId);
                if (!period) return;
                
                const unitName = e.target.dataset.name;
                const field = e.target.dataset.field;
                const unitReading = period.readings.find(r => r.name === unitName);

                if (unitReading) {
                    unitReading[field] = parseFloat(e.target.value) || 0;
                    calculateAll();
                }
            }
        });
        
        // Main control buttons
        document.getElementById('manage-periods-btn').addEventListener('click', () => {
            renderPeriodsList();
            resetPeriodForm();
            openModal(DOMElements.periodsModal);
        });
        document.getElementById('settings-btn').addEventListener('click', openSettingsModal);
        DOMElements.exportPdfBtn.addEventListener('click', exportToPDF);
        DOMElements.exportExcelBtn.addEventListener('click', exportToExcel);
        DOMElements.searchInput.addEventListener('input', (e) => renderTable(e.target.value));

        // Settings Menu Dropdown
        DOMElements.settingsMenuButton.addEventListener('click', () => {
            DOMElements.settingsMenu.classList.toggle('hidden');
        });
        document.addEventListener('click', (e) => {
            if (!DOMElements.settingsMenuButton.contains(e.target) && !DOMElements.settingsMenu.contains(e.target)) {
                DOMElements.settingsMenu.classList.add('hidden');
            }
        });

        // Periods Modal
        document.getElementById('close-periods-btn').addEventListener('click', () => closeModal(DOMElements.periodsModal));
        document.getElementById('period-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('period-name').value;
            const startDate = document.getElementById('period-start-date').value;
            const endDate = document.getElementById('period-end-date').value;
            const editId = document.getElementById('edit-period-id').value;

            if (editId) { // Update existing period
                const period = appState.periods.find(p => p.id == editId);
                if(period) {
                    period.name = name;
                    period.startDate = startDate;
                    period.endDate = endDate;
                    showToast('دوره با موفقیت ویرایش شد.');
                }
            } else { // Create new period
                const newPeriod = { id: Date.now(), name, startDate, endDate, readings: [] };
                const lastPeriod = appState.periods.length > 0 ? appState.periods.sort((a,b) => a.id - b.id)[appState.periods.length - 1] : null;

                unitStructure.forEach(floor => {
                    floor.units.forEach(unitName => {
                        const lastUnitReading = lastPeriod ? lastPeriod.readings.find(r => r.name === unitName) : null;
                        const prevReading = lastUnitReading ? lastUnitReading.currentReading : 0;
                        newPeriod.readings.push({ name: unitName, prevReading, currentReading: prevReading, consumption: 0, tierName: '-', cost: 0 });
                    });
                });
                appState.periods.push(newPeriod);
                appState.activePeriodId = newPeriod.id;
                showToast('دوره جدید با موفقیت ایجاد شد.');
            }
            
            saveState();
            renderActivePeriod();
            renderPeriodsList();
            resetPeriodForm();
        });

        document.getElementById('cancel-edit-period-btn').addEventListener('click', resetPeriodForm);

        document.getElementById('periods-list').addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;
            
            const action = button.dataset.action;
            const id = button.dataset.id;

            if (action === 'select') {
                appState.activePeriodId = id;
                saveState();
                renderActivePeriod();
                closeModal(DOMElements.periodsModal);
            } else if (action === 'delete') {
                showConfirmModal('حذف دوره', `آیا از حذف دوره "${appState.periods.find(p=>p.id==id).name}" مطمئن هستید؟`, () => {
                    appState.periods = appState.periods.filter(p => p.id != id);
                    if (appState.activePeriodId == id) {
                        const latestPeriod = appState.periods.sort((a,b) => b.id - a.id)[0] || null;
                        appState.activePeriodId = latestPeriod ? latestPeriod.id : null;
                        renderActivePeriod();
                    }
                    saveState();
                    renderPeriodsList();
                    showToast('دوره با موفقیت حذف شد.');
                });
            } else if (action === 'edit') {
                const period = appState.periods.find(p => p.id == id);
                if (period) {
                    document.getElementById('edit-period-id').value = period.id;
                    document.getElementById('period-name').value = period.name;
                    document.getElementById('period-start-date').value = period.startDate;
                    document.getElementById('period-end-date').value = period.endDate;
                    document.getElementById('period-form-title').textContent = 'ویرایش دوره';
                    document.getElementById('save-period-btn-text').textContent = 'ذخیره تغییرات';
                    document.getElementById('cancel-edit-period-btn').classList.remove('hidden');
                }
            }
        });

        // Settings Modal
        document.getElementById('close-settings-btn').addEventListener('click', () => closeModal(DOMElements.settingsModal));
        document.getElementById('cancel-settings-btn').addEventListener('click', () => closeModal(DOMElements.settingsModal));
        document.getElementById('add-tier-btn').addEventListener('click', () => {
            const lastTier = appState.tiers.length > 0 ? appState.tiers[appState.tiers.length - 1] : { to: 0 };
            appState.tiers.push({ from: lastTier.to, to: Infinity, rate: 0 });
            openSettingsModal();
        });

        document.getElementById('tiers-container').addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button && button.dataset.action === 'remove-tier') {
                appState.tiers.splice(button.dataset.index, 1);
                openSettingsModal();
            }
        });

        document.getElementById('save-settings-btn').addEventListener('click', () => {
            const newTiers = [];
            document.querySelectorAll('#tiers-container > div').forEach(tierEl => {
                const from = parseFloat(tierEl.querySelector('[data-field="from"]').value) || 0;
                let to = parseFloat(tierEl.querySelector('[data-field="to"]').value);
                if (isNaN(to) || to === 0) to = Infinity;
                const rate = parseFloat(tierEl.querySelector('[data-field="rate"]').value) || 0;
                newTiers.push({ from, to, rate });
            });
            appState.tiers = newTiers.sort((a,b) => a.from - b.from);
            if (appState.activePeriodId) calculateAll();
            else saveState();
            closeModal(DOMElements.settingsModal);
            showToast('تنظیمات با موفقیت ذخیره شد.');
        });

        // Backup and Restore
        document.getElementById('backup-btn').addEventListener('click', backupData);
        document.getElementById('restore-btn').addEventListener('click', restoreData);
    }
    
    // --- EXPORT, BACKUP & RESTORE FUNCTIONS ---
    function exportToPDF() {
        const period = appState.periods.find(p => p.id == appState.activePeriodId);
        if (!period) return;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.addFileToVFS("Vazirmatn-Regular.ttf", vazirFontBase64);
        doc.addFont("Vazirmatn-Regular.ttf", "Vazirmatn", "normal");
        doc.setFont("Vazirmatn");

        const head = [[ 'هزینه نهایی (تومان)', 'پله مصرف', 'مصرف (m³)', 'قرائت فعلی', 'قرائت قبلی', 'نام واحد' ]];
        const body = period.readings.map(r => [
            Math.round(r.cost).toLocaleString('fa-IR'),
            r.tierName,
            r.consumption.toFixed(2),
            r.currentReading,
            r.prevReading,
            r.name
        ]);

        const title = `گزارش آب بها برای: ${period.name}`;
        const dates = `از ${period.startDate} تا ${period.endDate}`;
        doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
        doc.setFontSize(10);
        doc.text(dates, doc.internal.pageSize.getWidth() / 2, 22, { align: 'center' });

        doc.autoTable({
            head: head, body: body, startY: 30,
            styles: { font: "Vazirmatn", halign: 'center', fontSize: 9 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            columnStyles: { 5: { halign: 'right' } }
        });
        
        doc.save(`گزارش-آب-بها-${period.name.replace(/[\s/]/g, '-')}.pdf`);
    }
    
    function exportToExcel() {
        const period = appState.periods.find(p => p.id == appState.activePeriodId);
        if (!period) return;

        const worksheetData = period.readings.map(r => ({
            "نام واحد": r.name,
            "قرائت قبلی": r.prevReading,
            "قرائت فعلی": r.currentReading,
            "میزان مصرف (m³)": r.consumption,
            "پله مصرف": r.tierName,
            "هزینه نهایی (تومان)": r.cost
        }));
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, period.name);
        
        XLSX.writeFile(workbook, `داده-های-آب-بها-${period.name.replace(/[\s/]/g, '-')}.xlsx`);
    }

    function backupData() {
        const dataToBackup = {
            periods: appState.periods,
            tiers: appState.tiers,
            activePeriodId: appState.activePeriodId
        };
        const dataStr = JSON.stringify(dataToBackup, null, 2);
        const dataBlob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        const date = new Date();
        const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        link.download = `water-bill-backup-${dateString}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast('فایل پشتیبان با موفقیت دانلود شد.');
    }

    function restoreData() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const restoredData = JSON.parse(event.target.result);
                    if (restoredData.periods && restoredData.tiers) {
                        showConfirmModal('بازیابی اطلاعات', 'تمام داده‌های فعلی با اطلاعات فایل پشتیبان جایگزین خواهند شد. آیا ادامه می‌دهید؟', () => {
                            appState.periods = restoredData.periods;
                            appState.tiers = restoredData.tiers;
                            appState.activePeriodId = restoredData.activePeriodId || (restoredData.periods.length > 0 ? restoredData.periods[0].id : null);
                            saveState();
                            initializeApp();
                            showToast('اطلاعات با موفقیت بازیابی شد.');
                        });
                    } else {
                        throw new Error('Invalid backup file format');
                    }
                } catch (err) {
                    showToast('فایل پشتیبان نامعتبر است.', 'error');
                    console.error("Restore error:", err);
                }
            };
            reader.readAsText(file);
        };
        fileInput.click();
    }
    
    // --- INITIALIZATION ---
    function initializeApp() {
        loadState();
        attachEventListeners();
        jalaliDatepicker.startWatch({
            selector: '[data-jdp]',
            time: false,
            persianDigits: true,
            showEmptyBtn: false,
            top: 'auto',
            bottom: 'auto'
        });
        if (appState.activePeriodId && appState.periods.some(p => p.id == appState.activePeriodId)) {
            renderActivePeriod();
        } else {
            // If active ID is invalid, reset it
            if (appState.periods.length > 0) {
                appState.activePeriodId = appState.periods.sort((a,b) => b.id - a.id)[0].id;
                saveState();
                renderActivePeriod();
            } else {
                appState.activePeriodId = null;
                saveState();
                showNoPeriodView();
            }
        }
    }

    initializeApp();
});
