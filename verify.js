// Mock DOM
global.document = {
    createElement: (tag) => {
        return {
            tagName: tag,
            textContent: '',
            className: '',
            style: {},
            children: [],
            appendChild: function(child) {
                this.children.push(child);
            }
        };
    },
    createDocumentFragment: () => {
        return {
            isFragment: true,
            children: [],
            appendChild: function(child) {
                this.children.push(child);
            }
        };
    }
};

const Calculator = require('./js/calculator.js').default;

// Test data
const pctData = [
    { percent: 60, weight: 120 },
    { percent: 65, weight: 130 }
];

const warmupData = [
    { percent: 40, weight: 40, reps: 5 },
    { percent: 55, weight: 55, reps: 5 }
];

const advWarmupData = [
    { stage: 1, purposeStr: "Joint Prep", percent: "-", weight: 20, reps: "10-15", notes: "Pause" },
    { stage: 2, purposeStr: "Activation", percent: 45, weight: 45, reps: 5, notes: "Explosive" }
];

let globalCurrentUnit = 'kg';

// Mock function bodies from main.js to test rendering
function renderPercentageTable(data, tableBodyPct, currentUnit) {
    tableBodyPct.textContent = '';
    tableBodyPct.children = [];
    const fragment = document.createDocumentFragment();
    data.forEach(row => {
        const tr = document.createElement('tr');

        const tdPercent = document.createElement('td');
        tdPercent.textContent = `${row.percent}%`;

        const tdWeight = document.createElement('td');
        tdWeight.textContent = `${row.weight} `;
        const spanUnit = document.createElement('span');
        spanUnit.className = 'unit-display';
        spanUnit.textContent = currentUnit;
        tdWeight.appendChild(spanUnit);

        tr.appendChild(tdPercent);
        tr.appendChild(tdWeight);
        fragment.appendChild(tr);
    });
    tableBodyPct.appendChild(fragment);
}

function renderWarmupTable(data, tableBodyWarmup, currentUnit) {
    tableBodyWarmup.textContent = '';
    tableBodyWarmup.children = [];
    const fragment = document.createDocumentFragment();
    data.forEach(row => {
        const tr = document.createElement('tr');

        const tdPercent = document.createElement('td');
        tdPercent.textContent = `${row.percent}%`;

        const tdWeight = document.createElement('td');
        tdWeight.textContent = `${row.weight} `;
        const spanUnit = document.createElement('span');
        spanUnit.className = 'unit-display';
        spanUnit.textContent = currentUnit;
        tdWeight.appendChild(spanUnit);

        const tdReps = document.createElement('td');
        tdReps.textContent = row.reps;

        tr.appendChild(tdPercent);
        tr.appendChild(tdWeight);
        tr.appendChild(tdReps);
        fragment.appendChild(tr);
    });
    tableBodyWarmup.appendChild(fragment);
}

function renderAdvWarmupTable(data, tableBodyAdvWarmup, currentUnit) {
    tableBodyAdvWarmup.textContent = '';
    tableBodyAdvWarmup.children = [];
    const fragment = document.createDocumentFragment();
    data.forEach(row => {
        const tr = document.createElement('tr');

        const tdStage = document.createElement('td');
        tdStage.textContent = row.stage;

        const tdPurpose = document.createElement('td');
        tdPurpose.textContent = row.purposeStr;

        const tdPercent = document.createElement('td');
        tdPercent.textContent = row.percent === '-' ? '-' : `${row.percent}%`;

        const tdWeight = document.createElement('td');
        tdWeight.textContent = `${row.weight} `;
        if (row.percent !== '-') {
            const spanUnit = document.createElement('span');
            spanUnit.className = 'unit-display';
            spanUnit.textContent = currentUnit;
            tdWeight.appendChild(spanUnit);
        }

        const tdReps = document.createElement('td');
        tdReps.textContent = row.reps;

        const tdNotes = document.createElement('td');
        tdNotes.style.fontSize = '0.9em';
        tdNotes.style.opacity = '0.8';
        tdNotes.textContent = row.notes;

        tr.appendChild(tdStage);
        tr.appendChild(tdPurpose);
        tr.appendChild(tdPercent);
        tr.appendChild(tdWeight);
        tr.appendChild(tdReps);
        tr.appendChild(tdNotes);
        fragment.appendChild(tr);
    });
    tableBodyAdvWarmup.appendChild(fragment);
}

// Tests
console.log("Testing renderPercentageTable...");
const mockTableBodyPct = document.createElement('tbody');
renderPercentageTable(pctData, mockTableBodyPct, 'kg');
if (mockTableBodyPct.children.length === 1 && mockTableBodyPct.children[0].isFragment && mockTableBodyPct.children[0].children.length === 2) {
    console.log("✅ renderPercentageTable passed");
} else {
    console.error("❌ renderPercentageTable failed", mockTableBodyPct);
}

console.log("Testing renderWarmupTable...");
const mockTableBodyWarmup = document.createElement('tbody');
renderWarmupTable(warmupData, mockTableBodyWarmup, 'kg');
if (mockTableBodyWarmup.children.length === 1 && mockTableBodyWarmup.children[0].isFragment && mockTableBodyWarmup.children[0].children.length === 2) {
    console.log("✅ renderWarmupTable passed");
} else {
    console.error("❌ renderWarmupTable failed", mockTableBodyWarmup);
}

console.log("Testing renderAdvWarmupTable...");
const mockTableBodyAdvWarmup = document.createElement('tbody');
renderAdvWarmupTable(advWarmupData, mockTableBodyAdvWarmup, 'kg');
if (mockTableBodyAdvWarmup.children.length === 1 && mockTableBodyAdvWarmup.children[0].isFragment && mockTableBodyAdvWarmup.children[0].children.length === 2) {
    console.log("✅ renderAdvWarmupTable passed");
} else {
    console.error("❌ renderAdvWarmupTable failed", mockTableBodyAdvWarmup);
}
