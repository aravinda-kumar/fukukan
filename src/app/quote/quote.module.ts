import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';

import { QuotePage } from './quote.page';
import { QuoteResolver } from './quote.resolver';
import { QuoteService } from './quote.service';

const routes: Routes = [
  {
    path: '',
    component: QuotePage,
    resolve: {
      data: QuoteResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [QuotePage],
  providers: [
    QuoteResolver,
    QuoteService
  ]
})
export class QuotePageModule { }
