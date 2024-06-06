import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridAngular, FormsModule],
  templateUrl: './app.component.html',
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
  uniqueNames: string[] = [];

  private gridApi: any;
  private gridColumnApi: any;

  constructor(private mockDataService: DataService) {
    this.rowData = this.mockDataService.getMockData();
  }

  ngOnInit() {
    this.getUniqueNames();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  dateFormatter(params: any) {
    const date = new Date(params.value);
    return date.toLocaleDateString();
  }

  applyFilter() {
    const nameFilterInstance = this.gridApi.getFilterInstance('name');
    const ageFilterInstance = this.gridApi.getFilterInstance('age');
    const dateFilterInstance = this.gridApi.getFilterInstance('date');
    const valueFilterInstance = this.gridApi.getFilterInstance('value');

    nameFilterInstance.setModel({
      type: 'equals',
      filter: this.nameFilter
    });
    ageFilterInstance.setModel({
      type: 'greaterThan',
      filter: this.ageFilter
    });
    dateFilterInstance.setModel({
      type: 'equals',
      dateFrom: this.dateFilter ? this.dateFilter.toISOString().split('T')[0] : null
    });
    valueFilterInstance.setModel({
      type: 'greaterThan',
      filter: this.valueFilter
    });

    this.gridApi.onFilterChanged();
  }

  clearFilter() {
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  }

  getUniqueNames() {
    const data = this.mockDataService.getMockData();
    const names = data.map(item => item.name);
    this.uniqueNames = Array.from(new Set(names));
  }

  nameFilter: string = '';
  ageFilter: number | null = null;
  dateFilter: Date | null = null;
  valueFilter: number | null = null;
}
