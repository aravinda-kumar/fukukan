import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../user.service';

@Injectable()
export class BadgesResolver implements Resolve<any> {

  constructor(private userService: UserService) { }

  resolve() {
    // Get the Shell Provider from the service
    const shellProviderObservable = this.userService.getBadgesDataWithShell();

    // Resolve with Shell Provider
    const observablePromise = new Promise((resolve, reject) => {
      resolve(shellProviderObservable);
    });
    return observablePromise;
  }
}
