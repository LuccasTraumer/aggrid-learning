import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getMockData() {
    return [
      { name: 'John Doe', age: 30, date: '2023-06-01', salary: 50000 },
      { name: 'Jane Smith', age: 25, date: '2023-01-15', salary: 60000 },
      { name: 'Alice Johnson', age: 35, date: '2023-03-22', salary: 55000 },
      { name: 'Bob Brown', age: 45, date: '2023-02-10', salary: 70000 },
      // adicione mais registros conforme necessário
    ];
  }
}
