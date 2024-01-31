import { InstalledApp } from '../InstalledApp'

export interface InstalledAppRepository {
  getInstalledApps(): Promise<InstalledApp[]>
}
