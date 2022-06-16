import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService;
  let searchActionSubject: ReplaySubject<string>;

  beforeEach(async () => {
    searchActionSubject = new ReplaySubject(1);
    searchService = jasmine.createSpyObj(SearchService, ['actionClicked']);
    searchService.action$ = searchActionSubject.asObservable();

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {
          provide: SearchService,
          useValue: searchService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(true).toEqual(false);
  });
});
