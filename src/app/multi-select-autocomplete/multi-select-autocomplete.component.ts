import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface Item<T> {
  id: unknown;
  label: string;
  original: T;
}

@Component({
  selector: 'xxx-multi-select-autocomplete',
  templateUrl: './multi-select-autocomplete.component.html',
  styleUrls: ['./multi-select-autocomplete.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiSelectAutocompleteComponent,
      multi: true,
    },
  ],
})
export class MultiSelectAutocompleteComponent<T>
  implements ControlValueAccessor
{
  @Input()
  public set all(values: T[]) {
    this.allSubject.next(values);
  }

  @Input()
  public set value(values: T[]) {
    this.selectedSubject.next(values);
  }

  @Input()
  public uniqueIdentifier!: string | ((t: T) => string | T); // = (t: T) => t;

  @Input()
  public label!: string | ((t: T) => string); // = () => '';

  @Input() placeholder = '';

  @Output()
  public selectedListChange = new EventEmitter<T[]>();

  public displayList$!: Observable<Item<T>[]>;
  public selectedList$!: Observable<Item<T>[]>;
  public isDisabled = false;

  private allSubject = new BehaviorSubject<T[]>([]);
  private selectedSubject = new BehaviorSubject<T[]>([]);
  private filterSubject = new BehaviorSubject('');

  private onChange: ((items: T[]) => void) | undefined;
  private onTouched: (() => void) | undefined;

  constructor() {
    this.displayList$ = combineLatest([
      this.allSubject,
      this.selectedSubject,
      this.filterSubject,
    ]).pipe(
      filter(([all, selected]) => !!all && !!selected),
      map(([all, selected, filter]) =>
        all
          .map((item) => this.mapToItem(item))
          .filter(
            (item) =>
              !selected
                .map((selectedItem) => this.mapToItem(selectedItem))
                .find((selectedItem) => item.id === selectedItem.id)
          )
          .filter(
            (item) =>
              item.label.toLowerCase().indexOf(filter.toLowerCase()) >= 0
          )
      )
    );

    this.selectedList$ = this.selectedSubject.pipe(
      filter((items) => !!items),
      map((items) => items.map((item) => this.mapToItem(item)))
    );
  }

  public inputChanged(filter: string): void {
    this.filterSubject.next(filter);
  }

  public addOption(
    item: MatAutocompleteSelectedEvent,
    input: HTMLInputElement
  ): void {
    input.value = '';
    const items = [...this.selectedSubject.value, item.option.value.original];
    this.setSelectedItems(items);
    this.filterSubject.next('');
  }

  public removeOption(item: Item<T>): void {
    const items = this.selectedSubject.value.filter(
      (i) => this.mapToItem(i).id !== item.id
    );
    this.setSelectedItems(items);
  }

  public blurred() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  // ControlValueAccessor functions
  public writeValue(values: T[]): void {
    this.selectedSubject.next(values);
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
  }

  private setSelectedItems(items: T[]): void {
    this.selectedSubject.next(items);
    this.selectedListChange.next(items);
    if (this.onChange) {
      this.onChange(items);
    }
  }

  private getLabel(t: T): string {
    if (typeof this.label === 'string') {
      const entry = Object.entries(t).find(([key]) => key === this.label);
      if (entry === undefined) {
        return '';
      }
      return entry[1];
    }
    return this.label(t);
  }

  private getIdenfitier(t: T): string | T {
    if (typeof this.uniqueIdentifier === 'string') {
      const entry = Object.entries(t).find(
        ([key]) => key === this.uniqueIdentifier
      );
      if (entry === undefined) {
        return t;
      }
      return entry[1];
    }
    return this.uniqueIdentifier(t);
  }

  private mapToItem(item: T) {
    const temp = {
      id: this.getIdenfitier(item),
      label: this.getLabel(item),
      original: item,
    };
    return temp;
  }
}
