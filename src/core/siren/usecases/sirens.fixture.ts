import { selectAvailableSirens } from '../selectors/selectAvailableSirens.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { Sirens } from '../sirens.ts'
import { fetchAvailableSirens } from './fetch-available-sirens.usecase.ts'
import { expect } from 'vitest'
import { FakeDataInstalledAppsRepository } from '../../../infra/installed-apps-repository/fake-data.installed-apps.repository.ts'
import { AppStore } from '../../_redux_/createStore.ts'
import { InstalledApp } from '../../installed-app/InstalledApp.ts'
import { FakeDataSirensRepository } from '../../../infra/fake-data.sirens-repository.ts'
import { addKeywordToSirens } from './add-keyword-to-sirens.usecase.ts'
import { stateBuilderProvider } from '../../_tests_/state-builder.ts'

export function sirensFixture(
  testStateBuilderProvider = stateBuilderProvider(),
) {
  let store: AppStore
  const installedAppRepository = new FakeDataInstalledAppsRepository()
  const sirensRepository = new FakeDataSirensRepository()

  return {
    given: {
      existingAvailableSirens: (sirens: Sirens) => {
        testStateBuilderProvider.setState((builder) =>
          builder.withAvailableSirens(sirens),
        )
      },
      installedApps: (installedApps: InstalledApp[]) => {
        installedAppRepository.installedApps = new Map(
          installedApps.map((app) => [app.packageName, app]),
        )
      },
      existingRemoteSirens(existingRemoteSirens: Partial<Sirens>) {
        sirensRepository.selectableSirens = {
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
      addingKeywordToSirens: async (keyword: string) => {
        store = createTestStore(
          {
            installedAppRepository,
            sirensRepository,
          },
          testStateBuilderProvider.getState(),
        )

        await store.dispatch(addKeywordToSirens(keyword))
      },
      fetchingAvailableSirens: async () => {
        store = createTestStore({
          installedAppRepository,
          sirensRepository,
        })
        await store.dispatch(fetchAvailableSirens())
      },
    },
    then: {
      keywordShouldBeSaved: async (expectedKeyword: string) => {
        const retrievedKeywords = await sirensRepository.getSelectableSirens()
        expect(retrievedKeywords.keywords).toContain(expectedKeyword)
      },
      availableSirensShouldBeStoredAs: (expectedSirens: Sirens) => {
        const retrievedSirens = selectAvailableSirens(store.getState())
        expect(retrievedSirens).toStrictEqual(expectedSirens)
      },
    },
  }
}
