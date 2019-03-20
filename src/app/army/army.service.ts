import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ShellProvider } from '../utils/shell-provider';

import { ArmyListInterface } from '../datamodel/army.model';
import { ArmyFirebaseService } from '../services/armylist.service';
import { ArmyListPageModule } from './browse/armylist.module';

@Injectable()
export class ArmyService {
  constructor(private armyDb: ArmyFirebaseService) { }

  public getArmyList(): Observable<ArmyListInterface[]> {
     return this.armyDb.getCurrentUserArmyList();
  }
}
