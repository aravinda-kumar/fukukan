export class QuoteModel {
    quotes: Array<{ lang: string, list: Array<string> }> = [
        {
        lang: 'en',
        list: []
        }
    ];

    constructor(readonly isShell: boolean) { }
}
