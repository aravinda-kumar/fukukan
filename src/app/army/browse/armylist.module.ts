import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';

import { ArmyListPage } from './armylist.page';
import { ArmyService } from '../army.service';

const armyRoutes: Routes = [
  {
    path: '',
    component: ArmyListPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(armyRoutes),
    ComponentsModule
    ],
  declarations: [ ArmyListPage ],
  providers: [
    ArmyService
  ]
})
export class ArmyListPageModule {}
