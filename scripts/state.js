import * as storage from './storage.js';
import { validateRecord } from './validators.js';
import { compileRegex } from './search.js';
import { renderTable, renderStats, fillForm } from './ui.js';

let records = storage.load();
const tableWrapper = document.getElementById('table-wrapper');
const statsEl = document.getElementById('stats');
const form = document.getElementById('record-form');
const searchInput = document.getElementById('search');
const ignoreCase = document.getElementById('ignore-case');
const sortSel = document.getElementById('sort');

function getSorted(list, mode) {
  const copy = [...list];
  switch (mode) {
    case 'date_asc': return copy.sort((a,b) => a.date.localeCompare(b.date));
    case 'date_desc': return copy.sort((a,b) => b.date.localeCompare(a.date));
    case 'desc_asc': return copy.sort((a,b) => a.description.localeCompare(b.description));
    case 'desc_desc': return copy.sort((a,b) => b.description.localeCompare(a.description));
    case 'amount_asc': return copy.sort((a,b) => a.amount - b.amount);
    case 'amount_desc': return copy.sort((a,b) => b.amount - a.amount);
    default: return copy;
  }
}

function saveAndRefresh() {
  storage.save(records);
  render();
}

function render() {
  const flags = ignoreCase.checked ? 'i' : '';
  const re = compileRegex(searchInput.value, flags);
  const sorted = getSorted(records, sortSel.value);
  renderTable(sorted, tableWrapper, { re });
renderStats(records, statsEl, {
  currency: document.getElementById('base-currency').value,
  budgetCap: document.getElementById('budget-cap').value
});
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const rec = {
    id: form.querySelector('#record-id').value || storage.genId('txn'),
    description: form.querySelector('#description').value.trim().replace(/\s+/g, ' '),
    amount: Number(form.querySelector('#amount').value),
    category: form.querySelector('#category').value.trim(),
    date: form.querySelector('#date').value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const errs = validateRecord(rec);
  ['description','amount','date','category'].forEach(key => {
    document.getElementById('err-' + key).textContent = '';
  });
  if (Object.keys(errs).length) {
    Object.entries(errs).forEach(([key, message]) => {
      document.getElementById('err-' + key).textContent = message;
    });
    return;
  }
  const idx = records.findIndex(r => r.id === rec.id);
  if (idx >= 0) {
    rec.createdAt = records[idx].createdAt;
    records[idx] = rec;
  } else {
    records.push(rec);
  }
  saveAndRefresh();
  form.reset();
});

document.getElementById('reset-form').addEventListener('click', () => form.reset());

tableWrapper.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const tr = e.target.closest('tr');
  if (!tr) return;
  const id = tr.dataset.id;
  if (btn.dataset.action === 'edit') {
    const rec = records.find(r => r.id === id);
    if (rec) {
      fillForm(form, rec);
      window.location.hash = '#add';
    }
  }
  if (btn.dataset.action === 'delete') {
    if (confirm('Delete this record?')) {
      records = records.filter(r => r.id !== id);
      saveAndRefresh();
    }
  }
});

searchInput.addEventListener('input', render);
ignoreCase.addEventListener('change', render);
sortSel.addEventListener('change', render);

document.getElementById('export-json').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'export.json';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('import-json').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed)) throw new Error('Invalid format');
        parsed.forEach(item => {
          if (!item.id) item.id = storage.genId('txn');
          if (!item.createdAt) item.createdAt = new Date().toISOString();
          if (!item.updatedAt) item.updatedAt = new Date().toISOString();
        });
        records = parsed;
        saveAndRefresh();
      } catch (err) {
        alert('Invalid JSON import: ' + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
});

document.getElementById('settings-form').addEventListener('submit', e => {
  e.preventDefault();
  render();
  alert('Settings saved');
});

if (!records.length) {
  fetch('seed.json')
    .then(response => response.json())
    .then(data => {
      records = data;
      saveAndRefresh();
    })
    .catch(() => render());
} else {
  render();
}
