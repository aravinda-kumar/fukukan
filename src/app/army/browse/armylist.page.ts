import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';

import { ArmyListInterface } from '../../datamodel/army.model';
import { ArmyService } from '../army.service';

@Component({
  selector: 'app-armylist',
  templateUrl: './armylist.page.html',
  styleUrls: [
    './styles/armylist.page.scss',
    './styles/armylist.shell.scss',
    './styles/armylist.responsive.scss'
  ]
})
export class ArmyListPage implements OnInit {
  armyLst: Observable<ArmyListInterface[]>;

  constructor(
    private armyDataService: ArmyService
    ) {
  }

  ngOnInit(): void {
    this.getArmyLst();
  }

  getArmyLst(): void {
    this.armyLst = this.armyDataService.getArmyList();
  }
}
