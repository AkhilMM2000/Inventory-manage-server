/**
 * Recursively flattens a nested object into a single-level object with dot-notated keys.
 * Used for MongoDB partial updates to avoid overwriting nested documents.
 * 
 * Example:
 * Input: { name: 'Manoj', address: { city: 'Kochi', pin: 123 } }
 * Output: { 'name': 'Manoj', 'address.city': 'Kochi', 'address.pin': 123 }
 */
export const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? `${prefix}.` : '';
    
    // If it's a nested object (and not null/array), recurse
    if (
      typeof obj[k] === 'object' && 
      obj[k] !== null && 
      !Array.isArray(obj[k]) &&
      Object.keys(obj[k]).length > 0
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    
    return acc;
  }, {});
};
