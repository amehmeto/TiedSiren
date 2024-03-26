import { selectAvailableSirens } from '../selectors/selectAvailableSirens.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { Sirens } from '../sirens.ts'
import { fetchAvailableSirens } from './fetch-available-sirens.usecase.ts'
import { expect } from 'vitest'
import { FakeDataInstalledAppsRepository } from '../../../infra/installed-apps-repository/fake-data.installed-apps.repository.ts'
import { AppStore } from '../../_redux_/createStore.ts'
import { InstalledApp } from '../../installed-app/InstalledApp.ts'
import { FakeDataSirensRepository } from '../../../infra/fake-data.sirens-repository.ts'

export function fetchAvailableSirensFixture() {
  let store: AppStore
  const installedAppRepository = new FakeDataInstalledAppsRepository()
  const sirensRepository = new FakeDataSirensRepository()

  return {
    given: {
      installedApps: (installedApps: InstalledApp[]) => {
        installedAppRepository.installedApps = new Map(
          installedApps.map((app) => [app.packageName, app]),
        )
      },
      existingRemoteSirens(existingRemoteSirens: Partial<Sirens>) {
        sirensRepository.sirens = {
          android: existingRemoteSirens.android ?? [],
          ios: existingRemoteSirens.ios ?? [],
          linux: existingRemoteSirens.linux ?? [],
          macos: existingRemoteSirens.macos ?? [],
          windows: existingRemoteSirens.windows ?? [],
          websites: existingRemoteSirens.websites ?? [],
          keywords: existingRemoteSirens.keywords ?? [],
        }
      },
    },
    when: {
      fetchingAvailableSirens: async () => {
        store = createTestStore({
          installedAppRepository,
          sirensRepository,
        })
        await store.dispatch(fetchAvailableSirens())
      },
    },
    then: {
      availableSirensShouldBeStoredAs: (expectedSirens: Sirens) => {
        const retrievedSirens = selectAvailableSirens(store.getState())
        expect(retrievedSirens).toStrictEqual(expectedSirens)
      },
    },
  }
}
