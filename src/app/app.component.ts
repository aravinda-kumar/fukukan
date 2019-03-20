import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from './services/auth.service';

// User Data Model
import { UserProfileInterface, UserProfileModel } from './datamodel/user-profile.model';
import { AppSettingsModel } from './datamodel/settings.model';

// User Data Service
import { AppDataService } from './services/appdata.service';
import { UserFirebaseService } from './services/user.firebase.service';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    './side-menu/styles/side-menu.scss',
    './side-menu/styles/side-menu.shell.scss',
    './side-menu/styles/side-menu.responsive.scss'
  ]
})
export class AppComponent {

  // Application categories
  pageCategories = [
    {
      header: 'Army',
      pages: [
        {
          title: 'Browse',
          url: '/app/army',
          type: 'pro',
          icon: './assets/icons/side-menu/list-2.svg'
        },
        {
          title: 'Make & Play',
          url: '/app/user',
          type: 'pro',
          icon: './assets/icons/side-menu/loyalty.svg'
        },
        {
          title: 'Ranking',
          url: '/contact-card',
          type: 'pro',
          icon: './assets/icons/side-menu/badge.svg'
        },
        {
          title: 'Create',
          url: '/app/notifications',
          type: 'pro',
          icon: './assets/icons/side-menu/list.svg'
        }
      ]
    },
    {
      header: 'Tools',
      pages: [
        {
          title: '40K Attack Simulator',
          url: '/app/40k-soldier-attack/new',
          type: 'pro',
          icon: './assets/icons/side-menu/soldier-2.svg'
        },
        {
          title: 'Japanese English Lexicon',
          url: '/app/40k-soldier-attack/new',
          type: 'pro',
          icon: './assets/icons/side-menu/translator.svg'
        }
      ]
    },
    {
      header: 'Community',
      pages: [
        {
          title: 'News',
          url: '/app/categories',
          type: 'pro',
          icon: './assets/icons/side-menu/news.svg'
        },
        {
          title: 'Buddies',
          url: '/app/user',
          type: 'pro',
          icon: './assets/icons/side-menu/global-voting.svg'
        },
        {
          title: 'Tokyo Tactical',
          url: '/contact-card',
          type: 'pro',
          icon: './assets/icons/side-menu/rank.svg'
        },
        {
          title: 'ITC',
          url: '/app/notifications',
          type: 'pro',
          icon: './assets/icons/side-menu/badge-2.svg'
        }
      ]
    },
    {
      header: 'Events',
      pages: [
        {
          title: 'Calendar',
          url: '/app/categories',
          type: 'pro',
          icon: './assets/icons/side-menu/calendar.svg'
        },
        {
          title: 'My Events',
          url: '/app/user',
          type: 'pro',
          icon: './assets/icons/side-menu/calendar-2.svg'
        },
        {
          title: 'Search',
          url: '/contact-card',
          type: 'pro',
          icon: './assets/icons/side-menu/search.svg'
        }
      ]
    },
    {
      header: 'Profile',
      pages: [
        {
          title: 'My Profile',
          url: '/app/categories',
          type: 'pro',
          icon: './assets/icons/side-menu/user-2.svg'
        },
        {
          title: 'My Ladder',
          url: '/app/user',
          type: 'pro',
          icon: './assets/icons/side-menu/chevron.svg'
        },
        {
          title: 'Settings',
          url: '/app/notifications',
          type: 'pro',
          icon: './assets/icons/side-menu/gears.svg'
        }
      ]
    },
    {
      header: 'About',
      pages: [
        {
          title: 'About',
          url: '/app/categories',
          type: 'pro',
          icon: './assets/icons/side-menu/information.svg'
        },
        {
          title: 'Contributors',
          url: '/app/user',
          type: 'pro',
          icon: './assets/icons/side-menu/companionship.svg'
        },
        {
          title: 'Support',
          url: '/contact-card',
          type: 'pro',
          icon: './assets/icons/side-menu/customer-support.svg'
        }
      ]
    }

  ];

  appPages = [
    {
      title: 'Quote',
      url: '/quote',
      icon: './assets/sample-icons/side-menu/categories.svg'
    },
    {
      title: 'Categories',
      url: '/app/categories',
      icon: './assets/sample-icons/side-menu/categories.svg'
    },
    {
      title: 'Profile',
      url: '/app/user',
      icon: './assets/sample-icons/side-menu/profile.svg'
    },
    {
      title: 'Contact Card',
      url: '/contact-card',
      icon: './assets/sample-icons/side-menu/contact-card.svg'
    },
    {
      title: 'Notifications',
      url: '/app/notifications',
      icon: './assets/sample-icons/side-menu/notifications.svg'
    }
  ];
  accountPages = [
    {
      title: 'Log In',
      url: '/auth/login',
      icon: './assets/sample-icons/side-menu/login.svg'
    },
    {
      title: 'Sign Up',
      url: '/auth/signup',
      icon: './assets/sample-icons/side-menu/signup.svg'
    },
    {
      title: 'Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    },
    {
      title: 'Getting Started',
      url: '/getting-started',
      icon: './assets/sample-icons/side-menu/getting-started.svg'
    },
    {
      title: '404 page',
      url: '/page-not-found',
      icon: './assets/sample-icons/side-menu/warning.svg'
    }
  ];

  // Application attributes
  appUser: firebase.User;
  userProfile: UserProfileModel;
  appSettings: AppSettingsModel;

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private appData: AppDataService,
    private userService: UserFirebaseService
  ) {
    this.initializeApp();
    // Subscribe to user Data profile
    this.appData.currentUserProfile.subscribe(profile => this.userProfile = profile);
    this.appData.appSettings.subscribe(settings => this.appSettings = settings);
  }

  // --------------------------------------------------------------------------
  // Initialize app
  initializeApp() {
    // Setup general applications settings
    this.appData.changeAppSettings({games: [ 'Warhammer 40K', 'KillTeam', 'Age of Sigmar', 'ShadeSpire']});

    // First display the waiting quote page
    this.router.navigate(['/quote']);

    // Check platform is ready before starting
    this.platform.ready().then(() => {

      // Is user subscribed?
      this.afAuth.user.subscribe(user => {

        // Save Firebase auth user data
        this.appUser = user;
        if (user) {
          // Check if first time the user did log-in, in that case we need to fill its information
          if (user.metadata.creationTime === user.metadata.lastSignInTime) {
            this.router.navigate(['/getting-started']);
          } else {
            // Get all information from the user, and populate the UserDataService of it
            this.userService.getUserProfile().then((data) => {
              console.warn('[AppComponent] Successfully got user profile information', data);
              this.appData.changeUserProfile(data);
              this.router.navigate(['/app/user']);
            }, (err) => {
              console.warn('[AppCompoenent] Cannot read profile from user');
              this.router.navigate(['/walkthrough']);
            });

          }
        } else {
          // No user, so need to show the walkthrough route for either sign-in or sign-up
          this.router.navigate(['/walkthrough']);
        }
      }, err => {
        // In case of error, show the walkthrough route for either sign-in or sign-up
        this.router.navigate(['/walkthrough']);
      }, () => {
        // Always hide the splashscreen when app is ready
        this.splashScreen.hide();
      });
      this.statusBar.styleDefault();
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  logout(): void {
    this.authService.doLogout()
      .then(res => {
        this.router.navigate(['/auth/login']);
      }, err => {
        console.log(err);
      });
  }
}
