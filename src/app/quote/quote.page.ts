import { Component, OnInit, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuoteModel } from './quote.model';

import { IonSlides, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: [
    './styles/quote.page.scss',
    './styles/quote.shell.scss',
    './styles/quote.responsive.scss'
  ]
})
export class QuotePage implements OnInit, AfterViewInit {
  quotes: QuoteModel;
  selectedQuotes: { lang: string, list: Array<string> };
  quote = '';

  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  @ViewChild(IonSlides) slides: IonSlides;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

  constructor(
    public menu: MenuController,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.menu.enable(false);
    this.initShellData();
  }

  ngAfterViewInit(): void {
    // ViewChild is set
    this.slides.isBeginning().then(isBeginning => {
      this.isFirstSlide = isBeginning;
    });
    this.slides.isEnd().then(isEnd => {
      this.isLastSlide = isEnd;
    });

    // Subscribe to changes
    this.slides.ionSlideWillChange.subscribe(changes => {
      this.slides.isBeginning().then(isBeginning => {
        this.isFirstSlide = isBeginning;
      });
      this.slides.isEnd().then(isEnd => {
        this.isLastSlide = isEnd;
      });
    });
  }

  skipWalkthrough(): void {
    // Skip to the last slide
    this.slides.length().then(length => {
      this.slides.slideTo(length);
    });
  }

  @HostBinding('class.is-shell') get isShell() {
    return (this.quotes && this.quotes.isShell) ? true : false;
  }

  initShellData(): void {
    console.warn('Initialising shell data');
    if (this.route && this.route.data) {
      // We resolved a promise for the data Observable
      const promiseObservable = this.route.data;
      console.log('Route Resolve Observable => promiseObservable: ', promiseObservable);

      if (promiseObservable) {
        promiseObservable.subscribe(promiseValue => {
          const dataObservable = promiseValue['data'];
          console.log('Subscribe to promiseObservable => dataObservable: ', dataObservable);

          if (dataObservable) {
            dataObservable.subscribe(observableValue => {
              const pageData: QuoteModel = observableValue;
              // tslint:disable-next-line:max-line-length
              console.log('Subscribe to dataObservable (can emmit multiple values) => PageData (' + ((pageData && pageData.isShell) ? 'SHELL' : 'REAL') + '): ', pageData);
              // As we are implementing an App Shell architecture, pageData will be firstly an empty shell model,
              // and the real remote data once it gets fetched
              if (pageData) {
                this.quotes = pageData;
                this.selectQuoteFromLanguage();
              }
            });
          } else {
            console.warn('No dataObservable coming from Route Resolver promiseObservable');
          }
        });
      } else {
        console.warn('No promiseObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }
  }

  selectQuoteFromLanguage(): void {
    const lang = 'en';
    this.selectedQuotes = this.quotes.quotes.find(x => x.lang === lang);
    console.warn('Selected quotes for ' + lang + ': ', this.selectedQuotes);
    this.nextQuote();
  }

  nextQuote(): void {
    let idx = Math.floor(Math.random() * this.selectedQuotes.list.length);
    this.quote = this.selectedQuotes.list[idx];
    setInterval(() => {
      idx = Math.floor(Math.random() * this.selectedQuotes.list.length);
      this.quote = this.selectedQuotes.list[idx];
    }, 5000);
  }

}
