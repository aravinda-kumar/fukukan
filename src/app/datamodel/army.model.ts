// ----------------------------------------------------------------------------
// Army list interface
// Corresponds to values stored in Firestore DB
export interface ArmyListInterface {
  game: string;
  name: string;
  faction: string;
  point: number;
  level: number;
  list: string;
  media: string;
  mediatype: string;
}

// ----------------------------------------------------------------------------
// Army list model
// Corresponds to values displayed in UX
export class ArmyListShellModel {
  listArray: Array<ArmyListInterface>;

  // Constructor to support shell loading
  constructor(public isShell: boolean) { }

  // Mapping data from interface to model
  public mapFromInterface(list: ArmyListInterface[]): void {
    this.listArray = list;
    this.isShell = false;
  }
}
