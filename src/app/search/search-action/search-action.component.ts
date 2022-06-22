import { Component, HostListener } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'rcm-search-action, [rcm-search-action]',
  templateUrl: './search-action.component.html',
  styleUrls: ['./search-action.component.less'],
})
export class SearchActionComponent {
  constructor(private searchService: SearchService) {}
  @HostListener('click')
  onClick() {
    this.searchService.actionClicked();
  }
}
