import { ContentType } from '../../interfaces/interfaces';
import validateQuery from '../validateQuery';
import { artistModelMock } from './artistModelMock';

describe('validateQuery', () => {
  const contentType = {
    model: artistModelMock,
    fuzzysortOptions: {
      keys: [
        {
          name: 'Name',
          weight: 100,
        },
        {
          name: 'description',
          weight: 100,
        },
      ],
    },
  };

  test('can validate a query without relations', async () => {
    await validateQuery(contentType as any, null as any);
  });

  test("can validate a query with a relation, like 'project.projectName'", async () => {
    contentType.fuzzysortOptions.keys.push({
      name: 'artist_type.title',
      weight: 100,
    });

    await validateQuery(contentType as any, null as any);
  });
});
