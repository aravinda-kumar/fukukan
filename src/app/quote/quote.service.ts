import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShellProvider } from '../utils/shell-provider';
import { QuoteModel } from './quote.model';
@Injectable()
export class QuoteService {
    private _quotesDataWithShellCache: ShellProvider<QuoteModel>;
    constructor(private http: HttpClient) { }
    public getQuotesDataWithShell(): Observable<QuoteModel> {
        // Use cache if we have it.
        if (!this._quotesDataWithShellCache) {
            // Initialize the model specifying that it is a shell model
            const shellModel: QuoteModel = new QuoteModel(true);
            const dataObservable = this.http.get<QuoteModel>('./assets/data/quotes.json');
            this._quotesDataWithShellCache = new ShellProvider(shellModel, dataObservable);
        }
        return this._quotesDataWithShellCache.observable;
    }
}
