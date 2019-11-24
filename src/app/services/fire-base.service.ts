import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DietDTO} from '../dto/diet-dto';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(private db: AngularFirestore) {
  }

  public getPatientsList(): Observable<any> {
    return this.db.collection('user').snapshotChanges()
      .pipe(
        map((response) => response.map(r => r.payload.doc.data()))
      );
  }

  public getHistoryList(): Observable<any> {
    return this.db.collection('history').snapshotChanges()
      .pipe(
        map((response) => response.map(r => r.payload.doc.data()))
      );
  }

  public getProduct(): Observable<any> {
    return this.db.collection('products').snapshotChanges()
      .pipe(
        map(response => response.map(r => r.payload.doc.data()))
      );
  }

  public saveDiet(newDiet: DietDTO): Promise<any> {
    return this.db.collection('diet').add(newDiet);
  }
}
