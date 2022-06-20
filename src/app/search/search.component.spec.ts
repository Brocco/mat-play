import { Subject } from 'rxjs';

import { SearchComponent } from './search.component';

import { take } from 'rxjs/operators';
import { SearchService } from './search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let searchService;
  let searchActionSubject: Subject<string>;

  beforeEach(async () => {
    searchService = jasmine.createSpyObj(SearchService, ['actionClicked']);
    searchActionSubject = new Subject();
    searchService.actions$ = searchActionSubject.asObservable();

    component = new SearchComponent(searchService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an action when an action is triggered', async () => {
    const actionId = 'action id';
    const result = component.action.pipe(take(1)).toPromise();
    searchActionSubject.next(actionId);
    expect(await result).toEqual(actionId);
  });
});
