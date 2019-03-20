import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BadgesPage } from './badges.page';
import { UserService } from '../user.service';
import { BadgesResolver } from './badges.resolver';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: BadgesPage,
    resolve: {
      data: BadgesResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BadgesPage],
  providers: [
    BadgesResolver,
    UserService
  ]
})
export class BadgesPageModule {}
