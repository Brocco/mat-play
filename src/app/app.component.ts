import { Component } from '@angular/core';

export interface Thing {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  fullList = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'orange' },
    { id: 3, name: 'lemon' },
    { id: 4, name: 'pear' },
    { id: 5, name: 'kiwi' },
  ];
  selectedList = [this.fullList[0], this.fullList[3]];

  public uniqueIdentifierString = 'id';
  // public uniqueIdentifierFn(t: Thing) {
  //   return t.id;
  // }
  // public labelString = 'name';
  public labelFn(t: Thing) {
    return t.name;
  }

  listChanged(things: Thing[]) {
    this.selectedList = things;
    console.log(things);
  }
}
