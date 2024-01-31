import { InstalledApp } from '../InstalledApp'

export interface InstalledAppsRepository {
  getInstalledApps(): Promise<InstalledApp[]>
}
