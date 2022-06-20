import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject, map, merge, Observable, of } from 'rxjs';
import { SearchRows, SearchService } from '../search.service';
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
  public data$ = this.dataSubject.asObservable();

  @Input('data')
  public set data(value: any[]) {
    this.dataSubject.next(value);
  }


  @Output() selected = new EventEmitter<any>();

  public columnNames: string[] = [];

  constructor(private elementRef: ElementRef,private searchService: SearchService) {}

  public rowClick(row: any): void {
    this.selected.emit(row);
  }

  @ViewChildren(SelectableRow) rows!: QueryList<SelectableRow>;

  public rowChanges$: Observable<SelectableRow[]> | undefined;// = this.rows.changes;

  ngAfterViewInit() {
    const componentReferenceId = Math.random();
    const searchRows: Observable<SearchRows> = merge(
      of(this.rows.toArray()),
      this.rows.changes.pipe(
        map(
          rows => rows.toArray()
        )
      )
    ).pipe(
      map((rows: SelectableRow[]) => {
        return {
          ref: componentReferenceId,
          rows: rows
        }
      })
    );
    this.searchService.registerSection(searchRows);
  }
}
