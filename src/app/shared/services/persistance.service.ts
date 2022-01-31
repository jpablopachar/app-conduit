import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  constructor() {}

  public set(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage', data);
    }
  }

  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) as string);
    } catch (error) {
      console.error('Error getting data from localStorage', error);

      return null;
    }
  }
}
