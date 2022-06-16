import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SearchService {
  public actionClicked(actionId: string): void {
    this.actionsSubject.next(actionId);
  }

  private actionsSubject = new Subject<string>();
  public readonly actions$ = this.actionsSubject.asObservable();
}
