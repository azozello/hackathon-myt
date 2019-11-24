import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DietEditComponent} from './components/diet-edit/diet-edit.component';
import {HistoryComponent} from './components/diet-edit/history/history.component';

const routes: Routes = [
  {
    path: 'diet-edit',
    component: DietEditComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
