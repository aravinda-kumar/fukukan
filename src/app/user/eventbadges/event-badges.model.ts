export class EventBadgesModel {
  events: Array<{
    name: string,
    total: number,
    unlocked: number,
    image: string,
    list: Array<{ status: string, image: string, name: string, goal: string }>
  }> = [
      {
        name: '',
        total: 0,
        unlocked: 0,
        image: '',
        list: [
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
        ]
      },
      {
        name: '',
        total: 0,
        unlocked: 0,
        image: '',
        list: [
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
        ]
      }
    ];

  constructor(readonly isShell: boolean) { }
}
