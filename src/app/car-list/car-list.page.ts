import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CarListPage implements OnInit {
  cars: any[] = [];

  constructor() {}

  async ngOnInit() {
    await this.loadCars();
  }

  async loadCars() {
    const db = getFirestore();
    const carCollection = collection(db, 'cars');

    try {
      const snapshot = await getDocs(carCollection);
      this.cars = snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Erreur lors du chargement des voitures :', error);
    }
  }
}
