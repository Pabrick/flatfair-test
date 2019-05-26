import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadChildren: './views/flatbond/create/create-flatbond.module#CreateFlatbondModule'
  },
  {
    path: 'details',
    loadChildren: './views/flatbond/details/details-flatbond.module#DetailsFlatbondModule'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
