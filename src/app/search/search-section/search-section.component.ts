import { Component, Input, OnInit } from '@angular/core';

export interface SearchSectionColumn {
  headerText: string;
  dataProperty: string;
  weight?: number;
}

@Component({
  selector: 'rcm-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.less'],
})
export class SearchSectionComponent {
  @Input() title = '';
  private _columns: SearchSectionColumn[] = [];
  @Input('columns')
  public get columns(): SearchSectionColumn[] {
    return this._columns;
  }
  public set columns(value: SearchSectionColumn[]) {
    this._columns = value;
    this.columnNames = this._columns.map((c) => c.dataProperty);
  }
  @Input() data: any[] = [];

  public columnNames: string[] = [];

  constructor() {}

  public rowClick(row: any): void {
    console.log(row);
  }
}
