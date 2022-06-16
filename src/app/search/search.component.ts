import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { SearchActionComponent } from './search-action/search-action.component';
import { SearchService } from './search.service';

@Component({
  selector: 'rcm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  providers: [SearchService],
})
export class SearchComponent<T> {
  @Input() searchQuery = '';
  @Input() placeholder = '';

  @Output() selected = new EventEmitter<T>();
  @Output() action = this.searchService.actions$.pipe(
    tap(() => {
      this.overlayOpen = false;
    })
  );

  @ViewChild('overlayTemplate') overlayTemplate: TemplateRef<any> | undefined =
    undefined;
  @ContentChildren(SearchActionComponent)
  searchActions: SearchActionComponent[] = [];

  public overlayOpen = false;

  constructor(private searchService: SearchService) {}

  public searchFocused(): void {
    this.overlayOpen = true;
    this.searchActions.forEach((action) => {
      // console.log(`search action: ${action.actionId}`);
    });
  }

  public searchQueryChanged(query: string): void {
    console.log(`search query changed to ${query}`);
  }

  public clickOutsideOverlay(
    event: MouseEvent,
    search: CdkOverlayOrigin
  ): void {
    // do not close if the click event is the search box
    const isInput = event.target === search.elementRef.nativeElement;
    if (!isInput) {
      this.overlayOpen = false;
    }
  }

  public actionClicked(action: any): void {
    console.log(action);
  }
}
