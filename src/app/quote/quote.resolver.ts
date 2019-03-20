import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { QuoteService } from './quote.service';
@Injectable()
export class QuoteResolver implements Resolve<any> {
    constructor(private dataService: QuoteService) { }
    resolve() {
        // Get the Shell Provider from the service
        const shellProviderObservable = this.dataService.getQuotesDataWithShell();
        // Resolve with Shell Provider
        const observablePromise = new Promise((resolve, reject) => {
            resolve(shellProviderObservable);
        });
        return observablePromise;
    }
}
