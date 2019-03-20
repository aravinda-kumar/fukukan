import { Component, OnInit, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { IonSlides, MenuController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { UserProfileInterface } from '../datamodel/user-profile.model';
import { LoadingController, ToastController } from '@ionic/angular';

import { Router } from '@angular/router';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.page.html',
  styleUrls: [
    './styles/getting-started.page.scss',
    './styles/getting-started.shell.scss',
    './styles/getting-started.responsive.scss'
  ]
})

export class GettingStartedPage implements OnInit, AfterViewInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @HostBinding('class.last-slide-active') isLastSlide = false;

  gettingStartedForm: FormGroup;
  image: any;
  imageDump: any;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public menu: MenuController,
    private fbService: FirebaseService,
    private imagePicker: ImagePicker,
    private webview: WebView
  ) {
    this.gettingStartedForm = new FormGroup({
      languageCategory: new FormControl('en'),
      lastname: new FormControl(),
      firstname: new FormControl(),
      motto: new FormControl(),
      about: new FormControl(),
      games: new FormGroup({
        w40k: new FormControl(true),
        killteam: new FormControl(),
        aos: new FormControl(),
        shadespire: new FormControl()
      }),
      geoCategory: new FormControl('usa'),
      userType: new FormGroup({
        player: new FormControl(true),
        event: new FormControl()
      })
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
    this.resetFields();
  }

  resetFields() {
    this.image = './assets/images/default-profile.jpg';
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
      .then((result) => {
        if (result === false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        } else if (result === true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.imageDump = results[i];
                // this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  async uploadImageToFirebase(image) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    const image_src = this.webview.convertFileSrc(image);
    const randomId = Math.random().toString(36).substr(2, 5);

    // uploads img to firebase storage
    this.fbService.uploadImage(image_src, randomId)
      .then(photoURL => {
        this.image = photoURL;
        loading.dismiss();
        toast.present();
      }, err => {
        console.log(err);
      })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  ngAfterViewInit(): void {
    // ViewChild is set
    this.slides.isEnd().then(isEnd => {
      this.isLastSlide = isEnd;
    });

    // Subscribe to changes
    this.slides.ionSlideWillChange.subscribe(changes => {
      this.slides.isEnd().then(isEnd => {
        this.isLastSlide = isEnd;
      });
    });
  }

  createProfile(): void {
    let profile: UserProfileInterface = {
      userImage: '',
      lastname: this.gettingStartedForm.value.lastname,
      firstname: this.gettingStartedForm.value.firstname,
      membership: 'free',
      games: [],
      motto: this.gettingStartedForm.value.motto,
      about: this.gettingStartedForm.value.about,
      category: [],
      language: this.gettingStartedForm.value.languageCategory,
      geo: this.gettingStartedForm.value.geoCategory
    };
    // Add games
    if (this.gettingStartedForm.value.games.w40k) { profile.games.push('40k'); }
    if (this.gettingStartedForm.value.games.killteam) { profile.games.push('killteam'); }
    if (this.gettingStartedForm.value.games.aos) { profile.games.push('aos'); }
    if (this.gettingStartedForm.value.games.shadespire) { profile.games.push('shadespire'); }

    // Add categories
    if (this.gettingStartedForm.value.userType.player) { profile.category.push('player'); }
    if (this.gettingStartedForm.value.userType.event) { profile.category.push('event'); }

    // Add it now
    this.fbService.createUserProfile(profile).then(
      res => {
        this.router.navigate(['app/user']);
      }
    );

  }
}
