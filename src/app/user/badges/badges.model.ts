export class BadgesModel {
  events: Array<{ status: string, image: string, name: string, goal: string }> = [
    {
      status: 'locked',
      image: '',
      name: '',
      goal: ''
    },
    {
      status: 'locked',
      image: '',
      name: '',
      goal: ''
    },
    {
      status: 'locked',
      image: '',
      name: '',
      goal: ''
    }
  ];

  constructor(readonly isShell: boolean) { }
}
