function isJson(item: any) {
  if (typeof item !== 'string') return false;

  let value = item;

  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return typeof value === 'object' && value !== null;
}

function tryGetJson(item: any) {
  return isJson(item) ? JSON.parse(item) : null;
}

export { isJson, tryGetJson };
