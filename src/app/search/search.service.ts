import { Injectable } from '@angular/core';
import { combineLatest, BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs';
import { SelectableRow } from './selectable-row/selectable-row.directive';

@Injectable()
export class SearchService {
  private selectableRowsSubject = new BehaviorSubject<Observable<SelectableRow[]>[]>([]);
  public registerSection(rows: Observable<SelectableRow[]>) {
    this.selectableRowsSubject.next([...this.selectableRowsSubject.value, rows]);
  }

  public selectableRows$ = this.selectableRowsSubject.pipe(
    switchMap((selectableRows) => combineLatest(selectableRows)),
    map((searchRows) => searchRows.flat(1))
  );

  private rowSelectedSubject = new Subject<any>();
  public rowSelected$ = this.rowSelectedSubject.asObservable();
  public rowSelected(row: any): void {
    this.rowSelectedSubject.next(row);
  }

  private actionClickSubject = new Subject<void>();
  public actionClick$ = this.actionClickSubject.asObservable();
  public actionClicked(): void {
    this.actionClickSubject.next();
  }
}
