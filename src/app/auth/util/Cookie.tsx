// utils/cookie.ts
import Cookies from 'js-cookie';

export const Cookie = {
  set: (name: string, value: string, days?: number, path?: string): void => {
    const options: Cookies.CookieAttributes = {
      expires: days,
      path: path || '/',
    };
    Cookies.set(name, value, options);
  },

  get: (name: string): string | undefined => {
    return Cookies.get(name);
  },

  delete: (name: string): void => {
    Cookies.remove(name);
  },

  check: (name: string): boolean => {
    return !!Cookies.get(name);
  },
};
