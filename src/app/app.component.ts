import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridAngular],
  template: `
  <ag-grid-angular
  style="width: 100%; height: 500px;"
  class="ag-theme-alpine"
  [rowData]="rowData"
  [columnDefs]="columnDefs"
  [defaultColDef]="{ sortable: true, filter: true }">
</ag-grid-angular>
  `,
  styleUrl: './app.component.scss',
  providers: [DataService]
})
export class AppComponent {
  title = 'ag-grid-example';

  columnDefs = [
    { headerName: 'Name', field: 'name', filter: 'agTextColumnFilter' },
    { headerName: 'Age', field: 'age', filter: 'agNumberColumnFilter' },
    { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter', valueFormatter: this.dateFormatter },
    { headerName: 'Value', field: 'value', filter: 'agNumberColumnFilter' }
  ];

  rowData: any;

  constructor(private mockDataService: DataService) {
    this.rowData = this.mockDataService.getMockData();
  }

  dateFormatter(params: any) {
    const date = new Date(params.value);
    return date.toLocaleDateString();
  }
}
