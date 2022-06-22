import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SearchService } from '../search.service';

import { SearchSectionComponent } from './search-section.component';

describe('SearchSectionComponent', () => {
  let component: SearchSectionComponent;
  let searchService: SearchService;
  let rowChangesSubject;

  beforeEach(() => {
    searchService = jasmine.createSpyObj(SearchService, ['rowSelected', 'registerSection']);
    rowChangesSubject = new Subject<any[]>();
    component = new SearchSectionComponent(searchService);
    component.rows = {
      toArray: () => {
        return [];
      },
      changes: rowChangesSubject.asObservable(),
    } as any;
    component.ngAfterViewInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set columnNames when columns are set with the data properties', () => {
    component.columns = [
      {
        headerText: 'col 1',
        dataProperty: 'col1',
      },
      {
        headerText: 'col 2',
        dataProperty: 'col2',
      },
    ];
    expect(component.columnNames).toEqual(['col1', 'col2']);
  });

  it('should call registerSection when ngAfterViewInit is called', () => {
    expect(searchService.registerSection).toHaveBeenCalled();
  });

  it('should call rowSelected on the search service when a row is clicked', () => {
    const row = { foo: 'bark' };
    component.rowClick(row);
    expect(searchService.rowSelected).toHaveBeenCalledOnceWith(row);
  });

  it('should emit data$ whenever data is set', () => {
    const spy = jasmine.createSpy();
    const sub = component.data$.subscribe(spy);
    component.data = ['first'];
    component.data = ['second'];
    component.data = ['third'];
    // called one more than specified above due to the initial emit when subscribing
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should not show the overlow section by default', async () => {
    const result = await component.showOverflowSection$.pipe(take(1)).toPromise();
    expect(result).toEqual(false);
  });

  it('should not show the overlow section when data length is less than 10', async () => {
    component.data = [1];
    const result = await component.showOverflowSection$.pipe(take(1)).toPromise();
    expect(result).toEqual(false);
  });

  it('should show the overlow section when data length is 10', async () => {
    component.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = await component.showOverflowSection$.pipe(take(1)).toPromise();
    expect(result).toEqual(true);
  });

  it('should show the overlow section when data length is more than 10', async () => {
    component.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const result = await component.showOverflowSection$.pipe(take(1)).toPromise();
    expect(result).toEqual(true);
  });
});
