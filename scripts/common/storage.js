const storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: [
    // {
    //   id: 0.7520027086457333,
    //   title: 'Probviewed',
    //   description: 'Some description',
    //   start: new Date('2021-12-20T01:15:00.000Z'),
    //   end: new Date('2021-12-20T04:30:00.000Z'),
    // },
    // {
    //   id: 0.6820027086457333,
    //   title: 'Ackbrogrum Syric',
    //   description: 'Some description',
    //   start: new Date('2021-12-21T02:45:00.000Z'),
    //   end: new Date('2021-12-21T04:30:00.000Z'),
    // },
    // {
    //   id: 0.6920027086457333,
    //   title: 'Schelper',
    //   description: 'Some description',
    //   start: new Date('2021-12-09T17:15:00.000Z'),
    //   end: new Date('2021-12-09T19:30:00.000Z'),
    // },
    // {
    //   id: 0.9320027086457333,
    //   title: 'Possions Corridge',
    //   description: 'Some description',
    //   start: new Date('2021-12-08T03:00:00.000Z'),
    //   end: new Date('2021-12-08T05:30:00.000Z'),
    // },
    // {
    //   id: 0.9020027086457333,
    //   title: 'Soluciling',
    //   description: 'Some description',
    //   start: new Date('2021-12-13T01:45:00.000Z'),
    //   end: new Date('2021-12-13T04:30:00.000Z'),
    // },
    // {
    //   id: 0.9920027086447333,
    //   title: 'Resica iraquant',
    //   description: 'Some description',
    //   start: new Date('2021-12-15T03:00:00.000Z'),
    //   end:   new Date('2021-12-15T04:00:00.000Z'),
    // },
    {
      id: 0.7023027086457033,
      title: 'Pendussiting quasion',
      description: 'Some description',
      start: new Date('2021-12-13T23:15:00.000Z'),
      end: new Date('2021-12-13T04:45:00.000Z'),
    },
  ],
};

export const setItem = (key, value) => {
  storage[key] = value;
};

export const getItem = (key) => {
  return storage[key];
};