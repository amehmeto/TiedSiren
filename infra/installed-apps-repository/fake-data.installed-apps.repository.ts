import {
  AmazonPrimeIcon,
  TikTokAppIcon,
  YouTubeAppIcon,
} from '../../assets/fakeBase64AppIcons'
import { InstalledAppRepository } from '../../core/installed-app/ports/installed-app.repository'
import { InstalledApp } from '../../core/installed-app/InstalledApp'

export class FakeDataInstalledAppsRepository implements InstalledAppRepository {
  getInstalledApps(): Promise<InstalledApp[]> {
    return Promise.resolve([
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
    ])
  }
}
