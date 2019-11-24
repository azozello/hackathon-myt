import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DietEditComponent} from './components/diet-edit/diet-edit.component';

const routes: Routes = [
  {
    path: 'diet-edit',
    component: DietEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
