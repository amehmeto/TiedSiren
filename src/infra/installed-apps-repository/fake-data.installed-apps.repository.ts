import {
  AmazonPrimeIcon,
  TikTokAppIcon,
  YouTubeAppIcon,
} from '../../../assets/fakeBase64AppIcons.ts'
import { InstalledAppRepository } from '../../core/installed-app/ports/installed-app.repository.ts'
import { InstalledApp } from '../../core/installed-app/InstalledApp.ts'
import { faker } from '@faker-js/faker'

export function buildInstalledApp(
  wantedInstalledApp: Partial<InstalledApp>,
): InstalledApp {
  const randomIcon = faker.helpers.arrayElement([
    AmazonPrimeIcon,
    TikTokAppIcon,
    YouTubeAppIcon,
  ])

  const randomInstalledApp = {
    packageName: faker.internet.domainName(),
    versionName: faker.system.semver(),
    versionCode: faker.number.int(),
    firstInstallTime: faker.date.anytime().getTime(),
    lastUpdateTime: faker.date.anytime().getTime(),
    appName: faker.commerce.productName(),
    icon: randomIcon,
    apkDir: `/data/app/${faker.system.fileName()}`,
    size: faker.number.int(),
  }
  return { ...randomInstalledApp, ...wantedInstalledApp }
}
export class FakeDataInstalledAppsRepository implements InstalledAppRepository {
  installedApps = new Map<string, InstalledApp>([
    [
      'com.example.youtube',
      {
        packageName: 'com.example.youtube',
        versionName: '1.0.0',
        versionCode: 1,
        firstInstallTime: 1616161616161,
        lastUpdateTime: 1626262626262,
        appName: 'YouTube',
        icon: YouTubeAppIcon,
        apkDir: '/data/app/youtube-1/base.apk',
        size: 52428800,
      },
    ],
    [
      'com.example.amazonprime',
      {
        packageName: 'com.example.amazonprime',
        versionName: '1.0.0',
        versionCode: 1,
        firstInstallTime: 1616161616161,
        lastUpdateTime: 1626262626262,
        appName: 'Amazon Prime',
        icon: AmazonPrimeIcon,
        apkDir: '/data/app/amazonprime-1/base.apk',
        size: 52428800,
      },
    ],
    [
      'com.example.tiktok',
      {
        packageName: 'com.example.tiktok',
        versionName: '1.0.0',
        versionCode: 1,
        firstInstallTime: 1616161616161,
        lastUpdateTime: 1626262626262,
        appName: 'TikTok',
        icon: TikTokAppIcon,
        apkDir: '/data/app/tiktok-1/base.apk',
        size: 52428800,
      },
    ],
    [
      'com.example.youtube-1',
      {
        packageName: 'com.example.youtube-1',
        versionName: '1.0.0',
        versionCode: 1,
        firstInstallTime: 1616161616161,
        lastUpdateTime: 1626262626262,
        appName: 'YouTube 1',
        icon: YouTubeAppIcon,
        apkDir: '/data/app/youtube-1/base.apk',
        size: 52428800,
      },
    ],
    [
      'com.example.amazonprime-1',
      {
        packageName: 'com.example.amazonprime-1',
        versionName: '1.0.0',
        versionCode: 1,
        firstInstallTime: 1616161616161,
        lastUpdateTime: 1626262626262,
        appName: 'Amazon Prime 1',
        icon: AmazonPrimeIcon,
        apkDir: '/data/app/amazonprime-1/base.apk',
        size: 52428800,
      },
    ],
    [
      'com.example.tiktok-1',
      {
        packageName: 'com.example.tiktok-1',
        versionName: '1.0.0',
        versionCode: 1,
        firstInstallTime: 1616161616161,
        lastUpdateTime: 1626262626262,
        appName: 'TikTok 1',
        icon: TikTokAppIcon,
        apkDir: '/data/app/tiktok-1/base.apk',
        size: 52428800,
      },
    ],
  ])

  getInstalledApps(): Promise<InstalledApp[]> {
    return Promise.resolve(Array.from(this.installedApps.values()))
  }
}
