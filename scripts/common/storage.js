const storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // хранит массив всех событий
  events: [
    {
      id: 0.7520027086457333,
      title: 'Probviewed',
      description: 'Some description',
      start: new Date('2021-12-06T01:10:00.000Z'),
      end: new Date('2021-12-06T04:30:00.000Z'),
    },
    {
      id: 0.6820027086457333,
      title: 'Ackbrogrum Syric',
      description: 'Some description',
      start: new Date('2021-12-07T02:45:00.000Z'),
      end: new Date('2021-12-07T04:30:00.000Z'),
    },
    {
      id: 0.6920027086457333,
      title: 'Schelper',
      description: 'Some description',
      start: new Date('2021-12-09T17:15:00.000Z'),
      end: new Date('2021-12-09T19:10:00.000Z'),
    },
    {
      id: 0.9320027086457333,
      title: 'Possions Corridge',
      description: 'Some description',
      start: new Date('2021-12-08T03:10:00.000Z'),
      end: new Date('2021-12-08T05:30:00.000Z'),
    },
    {
      id: 0.9020027086457333,
      title: 'Soluciling',
      description: 'Some description',
      start: new Date('2021-12-13T01:55:00.000Z'),
      end: new Date('2021-12-13T04:30:00.000Z'),
    },
    {
      id: 0.9920027086447333,
      title: 'Resica iraquant',
      description: 'Some description',
      start: new Date('2021-12-15T03:10:00.000Z'),
      end: new Date('2021-12-15T04:30:00.000Z'),
    },
    {
      id: 0.7023027086457033,
      title: 'Pendussiting quasion',
      description: 'Some description',
      start: new Date('2021-12-13T23:10:00.000Z'),
      end: new Date('2021-12-13T04:30:00.000Z'),
    },
  ],
  // это все данные, которые вам нужно хранить для работы приложения
};

export const setItem = (key, value) => {
  storage[key] = value;
};

export const getItem = (key) => {
  return storage[key];
};

// пример объекта события
// const eventExample = {
//     id: 0.7520027086457333, // id понадобится для работы с событиями
//     title: 'Title',
//     description: 'Some description',
//     start: new Date('2020-03-17T01:10:00.000Z'),
//     end: new Date('2020-03-17T04:30:00.000Z'),
// }
