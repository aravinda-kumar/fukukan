import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EventBadgesPage } from './event-badges.page';
import { UserService } from '../user.service';
import { EventBadgesResolver } from './event-badges.resolver';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: EventBadgesPage,
    resolve: {
      data: EventBadgesResolver
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
  declarations: [EventBadgesPage],
  providers: [
    EventBadgesResolver,
    UserService
  ]
})
export class EventBadgesPageModule {}
