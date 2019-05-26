    
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DetailsFlatbondComponent } from './details-flatbond.component';

@NgModule({
  declarations: [
    DetailsFlatbondComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailsFlatbondComponent
      }
    ])
  ],
  exports: [
    DetailsFlatbondComponent
  ]
})
export class DetailsFlatbondModule { }