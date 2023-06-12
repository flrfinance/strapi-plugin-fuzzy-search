import buildResult from '../buildResult';

describe('buildResult', () => {
  const model = {
    uid: 'api::play.play',
    pluralName: 'plays',
    modelName: 'play',
    schemaInfo: {
      singularName: 'play',
      pluralName: 'plays',
      displayName: 'Play',
      description: '',
    },
    transliterate: true,
    fuzzysortOptions: {
      characterLimit: 300,
      threshold: -600,
      limit: 10,
      keys: [
        { name: 'name', weight: 100 },
        { name: 'play_type.title', weight: 100 },
        { name: 'artists.Name', weight: 100 },
        { name: 'artists', weight: 100 },
      ],
    },
    plays: [
      {
        id: 1,
        name: 'ququmber',
        spotify_link: null,
        createdAt: '2023-06-07T12:31:55.550Z',
        updatedAt: '2023-06-12T13:46:41.429Z',
        publishedAt: '2023-06-12T13:46:41.424Z',
        play_type: null,
        image: null,
        artists: [
          {
            id: 1,
            Name: 'John Wick',
            description: 'yeah, that one',
            createdAt: '2023-04-05T15:03:15.660Z',
            updatedAt: '2023-04-05T17:01:17.867Z',
            publishedAt: '2023-04-05T15:03:21.793Z',
          },
        ],
      },
    ],
  } as any;

  const keys = ['name', 'play_type.title', 'artists.Name', 'artists'];
  const query = 'John';

  test('can search by name', () => {
    const result = buildResult({ model, keys, query: 'ququ' });

    expect(result.fuzzysortResults.length).toBe(1);
  });

  test('can search nested array', () => {
    const result = buildResult({ model, keys, query });
    console.dir(result, { depth: null });

    expect(result.fuzzysortResults.length).toBe(1);
  });
});
