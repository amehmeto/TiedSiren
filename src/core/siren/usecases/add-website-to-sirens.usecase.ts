import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const addWebsiteToSirens = createAppAsyncThunk(
  'siren/addWebsiteToSirens',
  async (website: string, { extra: { sirensRepository } }) => {
    await sirensRepository.addWebsiteToSirens(website)
    return website
  },
)
