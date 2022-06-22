# rcm-search (name change pending)

## Description

This search component is a real-time search component which allows querying of an API based upon events of the component.

## Sub components

There are three components to use this component `rcm-search` which is the parent component and two child components `rcm-search-section` and `rcm-search-action`.

`rcm-search-section` is used to create a section of search results. `rcm-search-action` is used to create actionable items below all of the search results. Both components support any number of instances inside the `rcm-search` component (yes, zero is OK).

## API

### `rcm-search` API

#### Inputs

- `searchQuery` - sets the default search query
- `placeholder` - default text that appears as a message when no value is present
- `maxHeight` - the height of the results overlay before a scrollbar is used

#### Outputs

- `selected` - triggered when a search result is selected (via mouse or keyboard)
- `searchQueryChange` - triggered when the search query is changed (use this to re-query for search results data)

### `rcm-search-section` API

#### Inputs

- `title` - the title to show above the section (`string`)
- `columns` - the definition of the columns to show the results in (`SearchSectionColumn`)

```
export interface SearchSectionColumn {
  headerText: string;
  dataProperty: string;
  weight?: number;
}
```

- `data` - the data to be displayed (`any[]`)

### `rcm-search-action` API

There is no API for actions, simply use the native `(click)` event to capture when an action is clicked
