import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  AfterViewInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { SelectableRow } from './selectable-row/selectable-row.directive';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SearchSectionComponent } from './search-section/search-section.component';
import { SearchService } from './search.service';
import {
  tap,
  merge,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  BehaviorSubject,
} from 'rxjs';

@Component({
  selector: 'rcm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  providers: [SearchService],
})
export class SearchComponent<T> implements AfterViewInit {
  private selectionSubscription: Subscription | undefined;
  private selectableRowsChangedSubscriptoin: Subscription | undefined;
  private keyboardSelection = new Subject<T>();
  private selection$ = merge(this.keyboardSelection, this.searchService.rowSelected$);
  private lastActiveItem = new BehaviorSubject<any>(undefined);

  @Input() searchQuery = '';
  @Input() placeholder = '';

  @Input() maxHeight = '';

  @Output() selected: EventEmitter<T> = this.selection$ as EventEmitter<T>;
  @Output() searchQueryChange = new EventEmitter<string>();

  @ViewChild('overlayTemplate') overlayTemplate: TemplateRef<any> | undefined = undefined;
  @ContentChildren(SearchSectionComponent) sections!: QueryList<SearchSectionComponent>;
  private keyManager!: ActiveDescendantKeyManager<SelectableRow>;

  public overlayOpen = false;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.selectionSubscription = merge(this.selection$, this.searchService.actionClick$).subscribe(
      () => {
        this.overlayOpen = false;
        this.searchQuery = '';
      }
    );
  }

  ngAfterViewInit(): void {
    this.selectableRowsChangedSubscriptoin = this.searchService.selectableRows$.subscribe(
      (allRows) => {
        const activeItemIndex = allRows.findIndex((row) =>
          this.propsMatch(row.item, this.lastActiveItem.getValue())
        );
        this.keyManager = new ActiveDescendantKeyManager(allRows).withWrap().withTypeAhead();
        if (activeItemIndex >= 0) {
          this.keyManager.updateActiveItem(activeItemIndex);
        }
      }
    );
  }

  ngOnDelete(): void {
    this.selectionSubscription?.unsubscribe();
    this.selectableRowsChangedSubscriptoin?.unsubscribe();
    this.lastActiveItem.complete();
  }

  public searchFocused(): void {
    this.overlayOpen = true;
  }

  public searchQueryChanged(query: string): void {
    this.overlayOpen = true;
    this.searchQueryChange.emit(query);
  }

  public clickOutsideOverlay(event: MouseEvent, search: CdkOverlayOrigin): void {
    // do not close if the click event is the search box
    const isInput = event.target === search.elementRef.nativeElement;
    if (!isInput) {
      this.overlayOpen = false;
    }
  }

  private propsMatch(a: any, b: any): boolean {
    if (!a || !b) {
      return false;
    }
    return Object.keys(a).every((key) => {
      return a[key] == b[key];
    });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === ENTER) {
      this.keyboardSelection.next(this.keyManager.activeItem?.item);
    } else {
      this.keyManager.onKeydown(event);
      this.lastActiveItem.next(this.keyManager.activeItem?.item);
    }
  }
}
