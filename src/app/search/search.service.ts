import { ElementRef, Injectable, QueryList } from '@angular/core';
import { map, Observable, scan, switchMap, Subject, mergeMap, throwIfEmpty, merge, combineLatest, tap, BehaviorSubject } from 'rxjs';
import { SelectableRow } from './selectable-row/selectable-row.directive';

export interface SearchRows {ref: any, rows: SelectableRow[]}

@Injectable()
export class SearchService {
  private queryLists = new BehaviorSubject<Observable<SearchRows>[]>([]);
  public registerSection(rows: Observable<SearchRows>) {
    this.queryLists.next([...this.queryLists.value, rows]);
    // searchRows.push
  }


  public selectableRows$ = this.queryLists.pipe(
    switchMap(queryLists => combineLatest(queryLists)),
    map(searchRows => searchRows.reduce((all, searchRow) => [...all, ...searchRow.rows], [] as SelectableRow[])),
  );
}