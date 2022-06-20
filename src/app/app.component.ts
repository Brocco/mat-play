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
  }

  private data = [
    { x: 'x1', y: 'y1', z: 'z1' },
    { x: 'x2', y: 'y2', z: 'z2' },
    { x: 'x3', y: 'y3', z: 'z3' },
    { x: 'x4', y: 'y4', z: 'z4' },
    { x: 'x5', y: 'y5', z: 'z5' },
  ];

  ngOnInit() {
    setInterval(() => {
      const index = this.data.length + 1;
      this.data = [...this.data, { x: `x${index}`, y: `y${index}`, z: `z${index}` }];
      this.section1.data = this.data;
    }, 10000)
  }

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
    data: this.data.map((d) => ({
      x: d.x.toUpperCase(),
      y: d.y.toUpperCase(),
      z: d.z.toUpperCase(),
    })),
  };

  searchQueryChangeHandler(query: string) {

  }

  selectionMade(selection: any): void {
    console.log(`app component selection made handler: ${JSON.stringify(selection)}`);
  }

  actionHandler(id: string): void {
    console.log(`app component actionHandler: ${id}`);
  }
}
