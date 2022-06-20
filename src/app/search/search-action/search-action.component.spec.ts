import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchService } from '../search.service';

import { SearchActionComponent } from './search-action.component';

describe('SearchActionComponent', () => {
  let component: SearchActionComponent;
  let searchService: SearchService;

  beforeEach(() => {
    searchService = jasmine.createSpyObj(SearchService, ['actionClicked']);
    component = new SearchActionComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
