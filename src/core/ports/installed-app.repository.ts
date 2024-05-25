import { InstalledApp } from '../installed-app/InstalledApp.ts'

export interface InstalledAppRepository {
  getInstalledApps(): Promise<InstalledApp[]>
}
