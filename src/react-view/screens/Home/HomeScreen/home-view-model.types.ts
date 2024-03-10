export type ViewModelBlockSession = {
  id: string
  name: string
  minutesLeft: string
  blocklists: number
  devices: number
}

export enum HomeViewModel {
  WithoutActiveNorScheduledSessions = 'WITHOUT_ACTIVE_NOR_SCHEDULED_SESSIONS',
  WithActiveWithoutScheduledSessions = 'WITH_ACTIVE_WITHOUT_SCHEDULED_SESSIONS',
  WithoutActiveWithScheduledSessions = 'WITHOUT_ACTIVE_WITH_SCHEDULED_SESSIONS',
  WithActiveAndScheduledSessions = 'WITH_ACTIVE_AND_SCHEDULED_SESSIONS',
}

export enum Greetings {
  GoodMorning = 'Good Morning',
  GoodAfternoon = 'Good Afternoon',
  GoodEvening = 'Good Evening',
  GoodNight = 'Good Night',
}

export type WithoutActiveNorScheduledSessions = {
  type: HomeViewModel.WithoutActiveNorScheduledSessions
  greetings: Greetings
  activeSessions: {
    title: 'NO ACTIVE SESSIONS'
    message: "Starting a session allows you to quickly focus on a task at hand and do what's important to you."
  }
  scheduledSessions: {
    title: 'NO SCHEDULED SESSIONS'
    message: "Starting a session allows you to quickly focus on a task at hand and do what's important to you."
  }
}

export type WithActiveWithoutScheduledSessions = {
  type: HomeViewModel.WithActiveWithoutScheduledSessions
  greetings: Greetings
  activeSessions: {
    title: 'ACTIVE SESSIONS'
    blockSessions: ViewModelBlockSession[]
  }
  scheduledSessions: {
    title: 'NO SCHEDULED SESSIONS'
    message: "Starting a session allows you to quickly focus on a task at hand and do what's important to you."
  }
}

export type WithoutActiveWithScheduledSessions = {
  type: HomeViewModel.WithoutActiveWithScheduledSessions
  greetings: Greetings
  activeSessions: {
    title: 'NO ACTIVE SESSIONS'
    message: "Starting a session allows you to quickly focus on a task at hand and do what's important to you."
  }
  scheduledSessions: {
    title: 'SCHEDULED SESSIONS'
    blockSessions: ViewModelBlockSession[]
  }
}

export type HomeViewModelType =
  | WithoutActiveNorScheduledSessions
  | WithActiveWithoutScheduledSessions
  | WithoutActiveWithScheduledSessions
