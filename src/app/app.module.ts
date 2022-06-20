import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTableModule } from '@angular/cdk/table';

import { MultiSelectAutocompleteComponent } from './multi-select-autocomplete/multi-select-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { SearchSectionComponent } from './search/search-section/search-section.component';
import { SearchActionComponent } from './search/search-action/search-action.component';

import { A11yModule } from '@angular/cdk/a11y';
import { SelectableRow } from './search/selectable-row/selectable-row.directive';

@NgModule({
  declarations: [
    AppComponent,
    MultiSelectAutocompleteComponent,
    SearchComponent,
    SearchSectionComponent,
    SearchActionComponent,
    SelectableRow,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    OverlayModule,
    CdkTableModule,
    A11yModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
