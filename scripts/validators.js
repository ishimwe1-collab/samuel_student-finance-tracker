export const patterns = {
  description: /^\S(?:.*\S)?$/,
  amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  duplicateWord: /\b(\w+)\s+\1\b/
};

export function validateRecord(rec) {
  const errors = {};
  if (!patterns.description.test(rec.description)) errors.description = 'Invalid description';
  if (!patterns.amount.test(String(rec.amount))) errors.amount = 'Invalid amount (max 2 decimals)';
  if (!patterns.date.test(rec.date)) errors.date = 'Invalid date (YYYY-MM-DD)';
  if (!patterns.category.test(rec.category)) errors.category = 'Invalid category';
  return errors;
}
