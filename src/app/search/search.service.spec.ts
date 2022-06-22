import { Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SearchService } from './search.service';
import { SelectableRow } from './selectable-row/selectable-row.directive';

describe('SearchService', () => {
  let svc: SearchService;

  beforeEach(() => {
    svc = new SearchService();
  });

  describe('Section Rows', () => {
    it('should emit rows via selectableRows$ when initially registered', async () => {
      const rows = new Subject<SelectableRow[]>();
      svc.registerSection(rows);
      const result = svc.selectableRows$.pipe(take(1)).toPromise();
      const selectableRows = [new SelectableRow({} as any), new SelectableRow({} as any)];
      rows.next(selectableRows);
      expect(await result).toEqual(selectableRows);
    });

    it('should re-emit rows via selectableRows$ when rows re-emits', async () => {
      const rows = new Subject<SelectableRow[]>();
      svc.registerSection(rows);
      const spy = jasmine.createSpy();
      const sub = svc.selectableRows$.pipe().subscribe(spy);
      const selectableRows = [new SelectableRow({} as any), new SelectableRow({} as any)];
      rows.next(selectableRows);
      rows.next(selectableRows);
      expect(spy).toHaveBeenCalledTimes(2);
      sub.unsubscribe();
    });

    it('should concat rows via selectableRows$ when multiple sections are registered', async () => {
      const rows = new Subject<SelectableRow[]>();
      svc.registerSection(rows);
      const rows2 = new Subject<SelectableRow[]>();
      svc.registerSection(rows2);
      const result = svc.selectableRows$
        .pipe(
          take(1),
          map((r) => r.length)
        )
        .toPromise();
      const selectableRows = [new SelectableRow({} as any), new SelectableRow({} as any)];
      rows.next(selectableRows);
      rows2.next([selectableRows[0]]);
      expect(await result).toEqual(3);
    });
  });

  describe('Row Selected', () => {
    it('should emit a value passed to rowSelected', async () => {
      const row = { foo: 'bar' };
      const result = svc.rowSelected$.pipe(take(1)).toPromise();
      svc.rowSelected(row);
      expect(await result).toEqual(row);
    });
  });

  describe('Action Click', () => {
    it('should emit after actionClicked is called', async () => {
      const spy = jasmine.createSpy();
      const result = svc.actionClick$.pipe(take(1), tap(spy)).toPromise();
      svc.actionClicked();
      expect(await result).toEqual(undefined);
      expect(spy).toHaveBeenCalled();
    });
  });
});
