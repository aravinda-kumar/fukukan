export class UserProfileModel {
  userImage: string;
  name: string;
  membership: string;
  games: Array<string>;
  subtitle: string;
  ranking: Array<{ game: string, rank: { global: string, country: string, continent: string } }> = [];
  statistics: {
    global: {
      match: string,
      loss: string,
      win: string,
      draw: string
    }
  } = {
      global: {
        match: '',
        loss: '',
        win: '',
        draw: ''
      }
    };
  likes: string;
  followers: string;
  following: string;
  about: string;
  eventbadges: Array<{ image: string, event: string, unlocked: number }> = [
    {
      image: '',
      event: '',
      unlocked: 1
    },
    {
      image: '',
      event: '',
      unlocked: 1
    },
    {
      image: '',
      event: '',
      unlocked: 1
    },
    {
      image: '',
      event: '',
      unlocked: 1
    }
  ];
  badges: {
    total: number,
    unlocked: number,
    list: Array<{ image: string, name: string }>
  } = {
      total: 1,
      unlocked: 1,
      list: [
        {
          image: '',
          name: ''
        },
        {
          image: '',
          name: ''
        },
        {
          image: '',
          name: ''
        },
        {
          image: '',
          name: ''
        }
      ]
    };
  friends: Array<{ image: string, name: string }> = [
    {
      image: '',
      name: ''
    },
    {
      image: '',
      name: ''
    },
    {
      image: '',
      name: ''
    },
    {
      image: '',
      name: ''
    }
  ];
  armies: Array<{ image: string, faction: string }> = [
    { image: '', faction: '' }
  ];

  constructor(readonly isShell: boolean) { }
}
