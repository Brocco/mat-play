import { Subject } from 'rxjs';

import { SearchComponent } from './search.component';

import { take } from 'rxjs/operators';
import { SearchService } from './search.service';
import { ENTER } from '@angular/cdk/keycodes';
import { SelectableRow } from './selectable-row/selectable-row.directive';

describe('SearchComponent', () => {
  let component: SearchComponent<any>;
  let searchService: SearchService;
  let searchActionSubject: Subject<void>;
  let searchSelectSubject: Subject<any>;
  let searchSelectableRowsSubject: Subject<any>;

  beforeEach(async () => {
    searchService = jasmine.createSpyObj(SearchService, ['actionClicked']);
    searchActionSubject = new Subject();
    searchService.actionClick$ = searchActionSubject.asObservable();
    searchSelectSubject = new Subject();
    searchService.rowSelected$ = searchSelectSubject.asObservable();
    searchSelectableRowsSubject = new Subject();
    searchService.selectableRows$ = searchSelectableRowsSubject.asObservable();

    component = new SearchComponent(searchService);
    component.ngOnInit();
    component.ngAfterViewInit();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should init the overlay to be closed', () => {
    expect(component.overlayOpen).toEqual(false);
  });

  it('should init the search query to be blank', () => {
    expect(component.searchQuery).toEqual('');
  });

  it('should emit selected when an item is selected', async () => {
    const selection = { foo: 'bar' };
    const result = component.selected.pipe(take(1)).toPromise();
    searchSelectSubject.next(selection);
    expect(await result).toEqual(selection);
  });

  it('should open the overlay when the input is focused', () => {
    component.searchFocused();
    expect(component.overlayOpen).toEqual(true);
  });

  it('should open the overlay and emit a change event when the query changes', async () => {
    const searchQuery = 'new value';
    const result = component.searchQueryChange.pipe(take(1)).toPromise();
    component.searchQueryChanged(searchQuery);
    expect(await result).toEqual(searchQuery);
    expect(component.overlayOpen).toEqual(true);
  });

  it('should close the overlay when clicking outside of the overlay', () => {
    const evt = { target: 'target' } as any;
    const search = { elementRef: { nativeElement: 'something else' } };
    component.overlayOpen = true;
    component.clickOutsideOverlay(evt, search);
    expect(component.overlayOpen).toEqual(false);
  });

  it('should not close the overlay when clicking outside of the overlay in the input', () => {
    const evt = { target: 'target' } as any;
    const search = { elementRef: { nativeElement: evt.target } };
    component.overlayOpen = true;
    component.clickOutsideOverlay(evt, search);
    expect(component.overlayOpen).toEqual(true);
  });

  it('should emit selection when enter is pressed', async () => {
    const rows = [new SelectableRow({} as any), new SelectableRow({} as any)];
    searchSelectableRowsSubject.next(rows);

    const result = component.selected.pipe(take(1)).toPromise();

    const enterEvent = { keyCode: ENTER } as KeyboardEvent;
    component.onKeydown(enterEvent);

    expect(await result).toEqual(undefined);
  });
});
