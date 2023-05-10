import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any;

  constructor() {}

  setData(data: any): void {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}
