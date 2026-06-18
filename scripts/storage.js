const KEY = 'finance:data:v1';
export const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
};
export const save = (data) => localStorage.setItem(KEY, JSON.stringify(data));
export const nowISO = () => new Date().toISOString();
export const genId = (prefix='txn') => `${prefix}_${Math.random().toString(36).slice(2,9)}`;
