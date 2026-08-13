export function cx(...args) {
  const out = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === 'string' || typeof arg === 'number') {
      out.push(arg);
    } else if (Array.isArray(arg)) {
      const nested = cx(...arg);
      if (nested) out.push(nested);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) out.push(key);
      }
    }
  }
  return out.join(' ');
}

export default cx;
