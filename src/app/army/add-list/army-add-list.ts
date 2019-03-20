import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { UsernameValidator } from '../../validators/username.validator';
import { PasswordValidator } from '../../validators/password.validator';
import { PhoneValidator } from '../../validators/phone.validator';

import { counterRangeValidator } from '../../components/counter-input/counter-input.component';
import { CountryPhone } from './country-phone.model';

import {ArmyListInterface} from '../../datamodel/army.model';

import { AppDataService } from '../../services/appdata.service';
import { AppSettingsModel } from '../../datamodel/settings.model';


@Component({
  selector: 'army-add-list-page',
  templateUrl: './army-add-list.page.html',
  styleUrls: [
    './styles/army-add-list.page.scss'
  ]
})
export class ArmyAddListPage implements OnInit {

  appSettings: AppSettingsModel;

  armyList: ArmyListInterface = {
    game: 'Warhammer 40K',
    name: '',
    faction: '',
    point: 0,
    level: 0,
    list: '',
    media: '',
    mediatype: 'image'
  };

  armylistForm: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;
  genders: Array<string>;

  validator = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Name must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Name cannot be more than 25 characters long.' }
    ],
    'faction': [
      { type: 'required', message: 'Faction is required.' },
      { type: 'minlength', message: 'Faction must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Faction cannot be more than 25 characters long.' }
    ],
    'list': [
      { type: 'required', message: 'List is required.' }
    ],
    'level': [
      { type: 'rangeError', message: 'Number must be between: ' }
    ],
    'point': [
      { type: 'rangeError', message: 'Number must be between: ' }
    ]
  };

  constructor(
    private appData: AppDataService
  ) { }

  ngOnInit(): void {

    this.appData.appSettings.subscribe(settings => this.appSettings = settings );

    this.armylistForm = new FormGroup({
      'name': new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      'game': new FormControl(this.armyList.game, Validators.required),
      'faction': new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      'level': new FormControl(50, counterRangeValidator(0, 500)),
      'point': new FormControl(1500, counterRangeValidator(0, 10000)),
      'list': new FormControl('', Validators.required)
    });
  }

  onSubmit(values) {
    console.log(values);
  }
}
