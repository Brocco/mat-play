import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, map, merge, Observable, of } from 'rxjs';
import { SearchService } from '../search.service';
import { SelectableRow } from '../selectable-row/selectable-row.directive';

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
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.pipe(
    map((data) => data.filter((_, i) => i < this.maxNumberRows))
  );

  @Input() maxNumberRows = 10;

  @Input('data')
  public set data(value: any[]) {
    this.dataSubject.next(value);
  }

  @Input() overflowMessage: string = 'hi mom';

  // TODO: update with correct overflow message
  public defaultOverflowMessage = 'Bruh, refine your search';

  public showOverflowSection$ = this.dataSubject.pipe(
    map((data) => data.length >= this.maxNumberRows)
  );

  public columnNames: string[] = [];

  constructor(private searchService: SearchService) {}

  public rowClick(row: any): void {
    this.searchService.rowSelected(row);
  }

  @ViewChildren(SelectableRow) rows!: QueryList<SelectableRow>;

  public rowChanges$: Observable<SelectableRow[]> | undefined; // = this.rows.changes;

  ngAfterViewInit() {
    const searchRows: Observable<SelectableRow[]> = merge(
      of(this.rows.toArray()),
      this.rows.changes.pipe(map((rows) => rows.toArray()))
    );
    this.searchService.registerSection(searchRows);
  }
}
