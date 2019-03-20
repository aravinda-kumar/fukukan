import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserProfileModel } from '../datamodel/user-profile.model';
import { AppSettingsModel } from '../datamodel/settings.model';

@Injectable()
export class AppDataService {

  private userProfileObs = new BehaviorSubject(new UserProfileModel(true));
  currentUserProfile = this.userProfileObs.asObservable();

  private appSettingsObs = new BehaviorSubject(new AppSettingsModel());
  appSettings = this.appSettingsObs.asObservable();

  constructor() { }

  changeUserProfile(profile: UserProfileModel) {
    this.userProfileObs.next(profile);
  }

  changeAppSettings(settings: AppSettingsModel) {
    this.appSettingsObs.next(settings);
  }
}
