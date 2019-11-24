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

  imageLoaded;

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
      this.newProductsList.push(this.productList.filter(p => p.Name === this.productForm.controls.name.value)[0]);
    }
  }

  removeProduct(name): void {
    this.newProductsList = this.newProductsList.filter(np => np.name !== name);
  }

  addDietItem(): void {
    this.dietItemList.push({
      description: this.dietItemForm.controls.description.value,
      time: this.dietItemForm.controls.time.value,
      products: this.newProductsList.filter(p => p.Name)
    });

    this.newProductsList = [];
    this.dietItemForm.reset();
  }

  removeDietItem(description): void {
    this.dietItemList = this.dietItemList.filter(di => di.description !== description);
  }

  saveDiet(): void {
    console.log({
      title: this.dietItemForm.controls.title.value,
      description: this.descriptionForm.controls.description.value,
      image: this.imageLoaded,
      items: this.dietItemList
    });
    this.fireBase.saveDiet({
      title: this.dietItemForm.controls.title.value,
      description: this.descriptionForm.controls.description.value,
      image: this.imageLoaded,
      items: this.dietItemList
    })
      .then(() => {
        console.log('SUCCESS');
        this.resetView();
      })
      .catch((err) => console.log(err));
  }

  onFileInputChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.imageLoaded = e.target.result;
        console.log(e.target.result);
      };
    }
  }

  private initForms(): void {
    this.dietItemForm = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
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
    this.dietItemForm.controls.description.setValue('');
    this.dietItemForm.controls.time.setValue('');
    this.productForm.reset();
  }

  private loadData(): void {
    this.subs.push(
      this.fireBase.getPatientsList().subscribe(users => this.patientList = users),
      this.fireBase.getProduct().subscribe(products => {
        this.productList = products;
        console.log(products);
      })
    );
  }
}
