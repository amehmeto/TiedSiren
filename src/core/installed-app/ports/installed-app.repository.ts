import { InstalledApp } from '../InstalledApp.ts'

export interface InstalledAppRepository {
  getInstalledApps(): Promise<InstalledApp[]>
}
