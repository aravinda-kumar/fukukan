import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../user.service';

@Injectable()
export class UserProfileResolver implements Resolve<any> {

  constructor(private userService: UserService) { }

  resolve() {
    // Get the Shell Provider from the service
    return new Promise((resolve, reject) => {
      this.userService.getUserProfileData()
      .then(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
}
