import { SelectableRow } from './selectable-row.directive';

describe('SelectableRowDirective', () => {
  let directive: SelectableRow;
  let host: any;

  beforeEach(() => {
    host = {};
    directive = new SelectableRow(host);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should return the innerText from the host native element via getLabel', () => {
    const text = 'inner text';
    host.nativeElement = {
      innerText: text,
    };
    const result = directive.getLabel();
    expect(result).toEqual(text);
  });

  describe('isActive', () => {
    it('should default  to false', () => {
      expect(directive.isActive).toEqual(false);
    });

    it('should set to true after calling setActiveStyles', () => {
      directive.setActiveStyles();
      expect(directive.isActive).toEqual(true);
    });

    it('should set to false after calling setInactiveStyles', () => {
      directive.setInactiveStyles();
      expect(directive.isActive).toEqual(false);
    });
  });
});
