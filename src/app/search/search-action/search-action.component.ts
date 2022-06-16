import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'rcm-search-action',
  templateUrl: './search-action.component.html',
  styleUrls: ['./search-action.component.less'],
})
export class SearchActionComponent implements OnInit {
  @Input() actionId = '';

  @HostListener('click', ['$event.target'])
  onClick() {
    this.searchService.actionClicked(this.actionId);
  }

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}
}
