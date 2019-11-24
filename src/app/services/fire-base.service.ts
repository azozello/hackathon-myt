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

//{
//       'dietID': 12345,
//       'description': 'Diet description',
//       'timelist': [
//         {
//           'description': 'Some activity description',
//           'time': '12:00',
//           'products': [
//             {
//               'name': 'Product name 1',
//               'calories': '12345',
//               'description': 'some description',
//               'price': '1.99'
//             },
//             {
//               'name': 'Product name 2',
//               'calories': '12345',
//               'description': 'some description',
//               'price': '1.99'
//             },
//             {
//               'name': 'Product name 3',
//               'calories': '12345',
//               'description': 'some description',
//               'price': '1.99'
//             }
//           ]
//         },
//         {
//           'description': 'Some activity description 2',
//           'time': '15:00',
//           'products': [
//             {
//               'name': 'Product name 1',
//               'calories': '12345',
//               'description': 'some description',
//               'price': '1.99'
//             },
//             {
//               'name': 'Product name 2',
//               'calories': '12345',
//               'description': 'some description',
//               'price': '1.99'
//             }
//           ]
//         }
//       ]
//     }
