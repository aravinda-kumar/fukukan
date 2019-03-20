import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ShellProvider } from '../utils/shell-provider';

import { UserProfileModel, UserProfileInterface } from '../datamodel/user-profile.model';
import { UserFriendsModel } from './friends/user-friends.model';
import { EventBadgesModel } from './eventbadges/event-badges.model';
import { BadgesModel } from './badges/badges.model';

import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class UserService {
  private _profileDataWithShellCache: ShellProvider<UserProfileModel>;
  private _userProfileDataWithShellCache: ShellProvider<UserProfileModel>;
  private _friendsDataWithShellCache: ShellProvider<UserFriendsModel>;
  private _eventBadgesDataWithShellCache: ShellProvider<EventBadgesModel>;
  private _badgesDataWithShellCache: ShellProvider<BadgesModel>;

  constructor(
    private http: HttpClient,
    private fbService: FirebaseService
    ) { }

  public getBadgesDataWithShell(): Observable<BadgesModel> {
    // Use cache if we have it.
    if (!this._badgesDataWithShellCache) {
      // Initialize the model specifying that it is a shell model
      const shellModel: BadgesModel = new BadgesModel(true);
      const dataObservable = this.http.get<BadgesModel>('./assets/sample-data/badges/badges.json');

      this._badgesDataWithShellCache = new ShellProvider(
        shellModel,
        dataObservable
      );
    }
    return this._badgesDataWithShellCache.observable;
  }

  public getEventBadgesDataWithShell(): Observable<EventBadgesModel> {
    // Use cache if we have it.
    if (!this._eventBadgesDataWithShellCache) {
      // Initialize the model specifying that it is a shell model
      const shellModel: EventBadgesModel = new EventBadgesModel(true);
      const dataObservable = this.http.get<EventBadgesModel>('./assets/sample-data/events/event-badges.json');

      this._eventBadgesDataWithShellCache = new ShellProvider(
        shellModel,
        dataObservable
      );
    }
    return this._eventBadgesDataWithShellCache.observable;
  }

  public getProfileDataWithShell(): Observable<UserProfileModel> {
    // Use cache if we have it.
    if (!this._profileDataWithShellCache) {
      // Initialize the model specifying that it is a shell model
      const shellModel: UserProfileModel = new UserProfileModel(true);
      const dataObservable = this.http.get<UserProfileModel>('./assets/sample-data/user/user-profile.json');

      this._profileDataWithShellCache = new ShellProvider(
        shellModel,
        dataObservable
      );
    }
    return this._profileDataWithShellCache.observable;
  }

  public getUserProfileData(): Promise<any> {
    return this.fbService.getUserProfile();
  }

  public getFriendsDataWithShell(): Observable<UserFriendsModel> {
    // Use cache if we have it.
    if (!this._friendsDataWithShellCache) {
      // Initialize the model specifying that it is a shell model
      const shellModel: UserFriendsModel = new UserFriendsModel(true);
      const dataObservable = this.http.get<UserFriendsModel>('./assets/sample-data/user/user-friends.json');

      this._friendsDataWithShellCache = new ShellProvider(
        shellModel,
        dataObservable
      );
    }
    return this._friendsDataWithShellCache.observable;
  }

}
