import { highlight } from './search.js';

export function renderTable(records, container, options = {}) {
  const { re } = options;
  if (!records.length) {
    container.innerHTML = '<p>No records yet.</p>';
    return;
  }
  const rows = records.map(r => `
    <tr data-id="${r.id}">
      <td>${highlight(r.date, re)}</td>
      <td>${highlight(r.description, re)}</td>
      <td>${highlight(r.category, re)}</td>
      <td>${r.amount.toFixed(2)}</td>
      <td>
        <button data-action="edit">Edit</button>
        <button data-action="delete">Delete</button>
      </td>
    </tr>
  `).join('');
  container.innerHTML = `<table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table>`;
}

export function renderStats(records, container, settings = {}) {
  const total = records.reduce((sum, r) => sum + Number(r.amount), 0);
  const count = records.length;
  const counts = records.reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + 1; return acc; }, {});
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  container.innerHTML = `
    <div class="stat">Total: <strong>${total.toFixed(2)} ${settings.currency || 'USD'}</strong></div>
    <div class="stat">Records: <strong>${count}</strong></div>
    <div class="stat">Top category: <strong>${top ? top[0] : '—'}</strong></div>
  `;
}

export function fillForm(formEl, record) {
  formEl.querySelector('#record-id').value = record.id || '';
  formEl.querySelector('#description').value = record.description || '';
  formEl.querySelector('#amount').value = record.amount || '';
  formEl.querySelector('#category').value = record.category || '';
  formEl.querySelector('#date').value = record.date || '';
}
