import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FireBaseService} from '../../services/fire-base.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-diet-edit',
  templateUrl: './diet-edit.component.html',
  styleUrls: ['./diet-edit.component.scss']
})
export class DietEditComponent implements OnInit, OnDestroy {

  private subs = [];

  patientList = [];
  productList = [];

  dietItemList = [];
  newProductsList = [];

  userFrom: FormGroup;
  productForm: FormGroup;
  dietItemForm: FormGroup;
  descriptionForm: FormGroup;

  constructor(private fireBase: FireBaseService,
              private fb: FormBuilder) {
    this.initForms();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  addProduct(): void {
    if (this.productForm.valid) {
      this.newProductsList.push({
        name: this.productForm.controls.name.value
      });
    }
  }

  removeProduct(name): void {
    this.newProductsList = this.newProductsList.filter(np => np.name !== name);
  }

  addDietItem(): void {
    this.dietItemList.push({
      description: this.dietItemForm.controls.description.value,
      time: this.dietItemForm.controls.time.value,
      products: this.newProductsList.filter(p => p.name)
    });

    this.newProductsList = [];
    this.dietItemForm.reset();
  }

  removeDietItem(description): void {
    this.dietItemList = this.dietItemList.filter(di => di.description !== description);
  }

  saveDiet(): void {
    this.fireBase.saveDiet()
      .then(
        (success) => {
          console.log(success);
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }

  private initForms(): void {
    this.dietItemForm = this.fb.group({
      description: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.descriptionForm = this.fb.group({
      description: ['', Validators.required]
    });
    this.userFrom = this.fb.group({
      name: ['', Validators.required]
    });

    this.userFrom.valueChanges.subscribe(
      (changes) => {
        this.resetView();
      }
    );
  }

  private resetView(): void {
    this.newProductsList = [];
    this.dietItemList = [];
    this.descriptionForm.reset();
    this.dietItemForm.reset();
    this.productForm.reset();
  }

  private loadData(): void {
    this.subs.push(
      this.fireBase.getPatientsList().subscribe(users => this.patientList = users),
      this.fireBase.getProduct().subscribe(products => this.productList = products)
    );
  }
}
