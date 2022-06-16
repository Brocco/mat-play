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

  private data = [
    { x: 'X1', y: 'Y1', z: 'Z1' },
    { x: 'X2', y: 'Y2', z: 'Z2' },
    { x: 'X3', y: 'Y3', z: 'Z3' },
    { x: 'X4', y: 'Y4', z: 'Z4' },
    { x: 'X5', y: 'Y5', z: 'Z5' },
  ];

  public section1 = {
    title: 'section 1',
    columns: [
      {
        headerText: 'col 1',
        dataProperty: 'x',
        weight: 2,
      },
      {
        headerText: 'col 2',
        dataProperty: 'y',
      },
      {
        headerText: 'col 3',
        dataProperty: 'z',
      },
    ],
    data: this.data,
  };

  public section2 = {
    title: 'section 2',
    columns: [
      {
        headerText: 'Column number 1',
        dataProperty: 'x',
        weight: 2,
      },
      {
        headerText: 'Column number2',
        dataProperty: 'y',
      },
      {
        headerText: 'Column number3',
        dataProperty: 'z',
      },
    ],
    data: this.data,
  };

  actionHandler(id: string): void {
    console.log(`app component actionHandler: ${id}`);
  }
}
