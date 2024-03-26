import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { Sirens } from '../sirens.ts'

export const fetchAvailableSirens = createAppAsyncThunk(
  'siren/fetchAvailableSirens',
  async (_, { extra: { installedAppRepository } }) => {
    const installedApps = await installedAppRepository.getInstalledApps()
    const availableSirens: Sirens = {
      android: installedApps.map((app) => app.packageName),
      ios: [],
      windows: [],
      macos: [],
      linux: [],
      websites: [],
      keywords: [],
    }
    console.log(availableSirens)
    return availableSirens
  },
)
