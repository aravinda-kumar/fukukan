// ----------------------------------------------------------------------------
// User Profile interface
// Corresponds to values stored in Firestore DB
export interface UserProfileInterface {
    userImage: string;
    lastname: string;
    firstname: string;
    membership: string;
    games: Array<string>;
    motto: string;
    about: string;
    category: Array<string>;
    language: string;
    geo: string;
}

// ----------------------------------------------------------------------------
// User Profile Model
// Representation of processed data used inside application
export class UserProfileModel {
    userImage: string;
    name: string;
    proMember: string;
    games: Array<string> = [''];
    motto: string;
    about: string;
    isPlayer: boolean;
    isOrganizer: boolean;
    isPainter: boolean;
    isShop: boolean;
    language: string;
    geo: string;

    // Constructor to support shell loading
    constructor(public isShell: boolean) { }

    // Mapping data from interface to model
    public mapFromInterface(user: UserProfileInterface): void {
        this.userImage = user.userImage;
        this.name = user.firstname + ' ' + user.lastname;
        this.proMember = (user.membership === 'free') ? '' : 'pro';
        this.games = user.games;
        this.motto = user.motto;
        this.about = user.about;
        this.isPlayer = user.category.find(x => x === 'player') ? true : false;
        this.isOrganizer = user.category.find(x => x === 'event') ? true : false;
        this.isPainter = user.category.find(x => x === 'painter') ? true : false;
        this.isShop = user.category.find(x => x === 'shop') ? true : false;
        this.language = user.language;
        this.geo = user.geo;
        this.isShell = false;
    }
}

