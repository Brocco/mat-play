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

@Component({
  selector: 'rcm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  providers: [SearchService]
})
export class SearchComponent implements AfterViewInit {
  @Input() searchQuery = '';
  @Input() placeholder = '';

  @Output() selected = new EventEmitter<any>();
  @Output() searchQueryChange = new EventEmitter<string>();

  @ViewChild('overlayTemplate') overlayTemplate: TemplateRef<any> | undefined = undefined;
  @ContentChildren(SearchSectionComponent) sections!: QueryList<SearchSectionComponent>;
  private keyManager!: ActiveDescendantKeyManager<SelectableRow>;

  public overlayOpen = false;

  constructor(private searchService: SearchService) {
  }

  ngAfterViewInit(): void {
    this.searchService.selectableRows$.subscribe(allRows => {
      this.keyManager = new ActiveDescendantKeyManager(allRows).withWrap().withTypeAhead();
    })
  }

  public searchFocused(): void {
    this.overlayOpen = true;
  }

  public searchQueryChanged(query: string): void {
    this.searchQueryChange.emit(query);
  }

  public clickOutsideOverlay(event: MouseEvent, search: CdkOverlayOrigin): void {
    // do not close if the click event is the search box
    const isInput = event.target === search.elementRef.nativeElement;
    if (!isInput) {
      this.overlayOpen = false;
    }
  }

  onKeydown(event: any) {
    if (event.keyCode === ENTER) {
      console.log(`SELECTED VIA KB: ${JSON.stringify(this.keyManager.activeItem?.item)}`);
    } else {
      this.keyManager.onKeydown(event);
    }
  }
}
