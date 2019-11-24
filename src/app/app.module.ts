import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {DietEditComponent} from './components/diet-edit/diet-edit.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FireBaseService} from './services/fire-base.service';
import {ReactiveFormsModule} from '@angular/forms';
import { HistoryComponent } from './components/diet-edit/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DietEditComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAmMAyStNf3AmN1bp1HK7l5Y4OznjrU808',
      authDomain: 'smart-258619.firebaseapp.com',
      databaseURL: 'https://smart-258619.firebaseio.com',
      projectId: 'smart-258619',
      storageBucket: 'smart-258619.appspot.com',
      messagingSenderId: '1082325939343',
      appId: '1:1082325939343:web:b2fcc6f3259d0ef1732cfa'
    }),
    AngularFirestoreModule,
  ],
  providers: [
    FireBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
