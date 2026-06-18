export function compileRegex(input, flags='i') {
  try { return input ? new RegExp(input, flags) : null; } catch { return null; }
}

export function highlight(text, re) {
  if (!re) return escapeHtml(text);
  return escapeHtml(text).replace(re, m => `<mark>${m}</mark>`);
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
