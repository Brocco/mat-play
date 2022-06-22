import { SearchService } from '../search.service';

import { SearchActionComponent } from './search-action.component';

describe('SearchActionComponent', () => {
  let component: SearchActionComponent;
  let searchService: SearchService;

  beforeEach(() => {
    searchService = jasmine.createSpyObj(SearchService, ['actionClicked']);
    component = new SearchActionComponent(searchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call actionClicked on the search service when clicked', () => {
    component.onClick();
    expect(searchService.actionClicked).toHaveBeenCalled();
  });
});
