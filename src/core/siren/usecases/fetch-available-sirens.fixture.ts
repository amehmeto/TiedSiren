import { selectAvailableSirens } from '../selectors/selectAvailableSirens.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { Sirens } from '../sirens.ts'
import { fetchAvailableSirens } from './fetch-available-sirens.usecase.ts'
import { expect } from 'vitest'
import { FakeDataInstalledAppsRepository } from '../../../infra/installed-apps-repository/fake-data.installed-apps.repository.ts'
import { AppStore } from '../../_redux_/createStore.ts'
import { InstalledApp } from '../../installed-app/InstalledApp.ts'

export function fetchAvailableSirensFixture() {
  let store: AppStore
  const installedAppRepository = new FakeDataInstalledAppsRepository()

  return {
    given: {
      installedApps: (installedApps: InstalledApp[]) => {
        installedAppRepository.installedApps = new Map(
          installedApps.map((app) => [app.packageName, app]),
        )
      },
    },
    when: {
      fetchingAvailableSirens: async () => {
        store = createTestStore({
          installedAppRepository,
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
