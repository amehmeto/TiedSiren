import { describe, it, beforeEach } from 'vitest'
import { fetchAvailableSirensFixture } from './fetch-available-sirens.fixture.ts'
import { buildInstalledApp } from '../../../infra/installed-apps-repository/fake-data.installed-apps.repository.ts'

describe('Feature: Fetching available sirens', () => {
  let fixture: ReturnType<typeof fetchAvailableSirensFixture>

  beforeEach(() => {
    fixture = fetchAvailableSirensFixture()
  })

  it('should fetch the available sirens', async () => {
    fixture.given.installedApps([
      buildInstalledApp({
        packageName: 'com.instagram.android',
      }),
      buildInstalledApp({
        packageName: 'com.facebook.katana',
      }),
    ])

    await fixture.when.fetchingAvailableSirens()

    fixture.then.availableSirensShouldBeStoredAs({
      android: ['com.instagram.android', 'com.facebook.katana'],
      ios: [],
      linux: [],
      macos: [],
      windows: [],
      websites: [],
      keywords: [],
    })
  })
})
