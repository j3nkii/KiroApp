/**
 * Utility functions for transforming data between snake_case (database) and camelCase (API)
 */

export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function transformObjectToCamelCase<T>(obj: any): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => transformObjectToCamelCase(item)) as T;
  }

  if (typeof obj === 'object') {
    const transformed: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = toCamelCase(key);
        transformed[camelKey] = transformObjectToCamelCase(obj[key]);
      }
    }
    return transformed;
  }

  return obj;
}

export function transformObjectToSnakeCase<T>(obj: any): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => transformObjectToSnakeCase(item)) as T;
  }

  if (typeof obj === 'object') {
    const transformed: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const snakeKey = toSnakeCase(key);
        transformed[snakeKey] = transformObjectToSnakeCase(obj[key]);
      }
    }
    return transformed;
  }

  return obj;
}