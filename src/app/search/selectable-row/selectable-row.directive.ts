import { Highlightable } from '@angular/cdk/a11y';
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[rcmSelectableRow]',
})
export class SelectableRow implements Highlightable {
  @Input('rcmSelectableRow') item: any;

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  }
  private _isActive = false;

  public disabled?: boolean | undefined;

  constructor(private host: ElementRef) {
  }

  // focus() {
  //   this.host.nativeElement.focus();
  // }

  getLabel(): string {
    return this.host.nativeElement.innerText;
  }

  public setActiveStyles() {
    this._isActive = true;
  }

  public setInactiveStyles() {
    this._isActive = false;
  }
}
