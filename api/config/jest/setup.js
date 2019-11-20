import { cleanDatabase } from './helpers/utils';

beforeEach(async () => {
  await cleanDatabase();
});
