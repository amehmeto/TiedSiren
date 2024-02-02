import { CurrentSession } from '../current-session'

export interface CurrentSessionRepository {
  getCurrentSessions(): Promise<CurrentSession[]>
}
