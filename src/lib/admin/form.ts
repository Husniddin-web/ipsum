export function formString(form: FormData, key: string) {
  const value = String(form.get(key) ?? '').trim();
  return value || undefined;
}

export function formNumber(form: FormData, key: string) {
  const value = formString(form, key);
  return value === undefined ? undefined : Number(value);
}

export function formBoolean(form: FormData, key: string) {
  return form.get(key) === 'on';
}

export function withRequired<T extends Record<string, unknown>>(payload: T) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== ''),
  ) as T;
}
