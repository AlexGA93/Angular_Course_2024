export const saveToLocalStorage = (payload: string, flag: string): void => localStorage.setItem(flag, payload); 

export const getFromLocalStorage = (flag: string): string | null => localStorage.getItem(flag);

export const deleteFromLocalStorage = (flag: string) => localStorage.removeItem(flag);