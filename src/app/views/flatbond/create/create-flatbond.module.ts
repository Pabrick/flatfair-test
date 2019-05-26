import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateFlatbondComponent } from './create-flatbond.component';
import { NumericDirective } from './directives/numeric.directive';

@NgModule({
  declarations: [
    CreateFlatbondComponent,
    NumericDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateFlatbondComponent
      }
    ]),
    ReactiveFormsModule
  ],
  exports: [ CreateFlatbondComponent ]
})
export class CreateFlatbondModule { }