import { describe, expect, it, test } from 'vitest'
import {
  Greetings,
  HomeViewModelType,
  selectHomeViewModel,
} from './home.view-model.ts'
import { createTestStore } from '../../../../core/_tests_/createTestStore.ts'
import { PreloadedState } from '../../../../core/_redux_/createStore.ts'
import { stateBuilder } from '../../../../core/_tests_/state-builder.ts'
import { buildBlockSession } from '../../../../core/_tests_/data-builders/block-session.builder.ts'

describe('Home View Model', () => {
  test.each([
    [
      'no session',
      {},
      {
        type: HomeViewModelType.WithoutActiveNorScheduledSessions,
        greetings: Greetings.GoodAfternoon,
        activeSessions: {
          title: 'NO ACTIVE SESSIONS',
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
        },
        scheduledSessions: {
          title: 'NO SCHEDULED SESSIONS',
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
        },
      },
    ],

    [
      'one session',
      stateBuilder()
        .withBlockSessions([
          buildBlockSession({
            id: 'block-session-id',
            name: 'Sleeping time',
            start: '03:48:00',
            end: '13:58:00',
          }),
        ])
        .build(),
      {
        type: HomeViewModelType.WithActiveWithoutScheduledSessions,
        greetings: Greetings.GoodAfternoon,
        activeSessions: {
          title: 'ACTIVE SESSIONS',
          blockSessions: [
            {
              id: 'block-session-id',
              name: 'Sleeping time',
              minutesLeft: 'Ends in 10 minutes',
              blocklists: 1,
              devices: 2,
            },
          ],
        },
        scheduledSessions: {
          title: 'NO SCHEDULED SESSIONS',
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
        },
      },
    ],

    [
      'one session',
      stateBuilder()
        .withBlockSessions([
          buildBlockSession({
            id: 'block-session-id',
            name: 'Sleeping time',
            start: '03:48:00',
            end: '14:58:00',
          }),
        ])
        .build(),
      {
        type: HomeViewModelType.WithActiveWithoutScheduledSessions,
        greetings: Greetings.GoodAfternoon,
        activeSessions: {
          title: 'ACTIVE SESSIONS',
          blockSessions: [
            {
              id: 'block-session-id',
              name: 'Sleeping time',
              minutesLeft: 'Ends in about 1 hour',
              blocklists: 1,
              devices: 2,
            },
          ],
        },
        scheduledSessions: {
          title: 'NO SCHEDULED SESSIONS',
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
        },
      },
    ],

    [
      'two sessions',
      stateBuilder()
        .withBlockSessions([
          buildBlockSession({
            id: 'block-session-id-1',
            name: 'Sleeping time',
            start: '10:48:00',
            end: '13:58:00',
          }),
          buildBlockSession({
            id: 'block-session-id-2',
            name: 'Working time',
            start: '10:48:00',
            end: '17:58:00',
          }),
        ])
        .build(),
      {
        type: HomeViewModelType.WithActiveWithoutScheduledSessions,
        greetings: Greetings.GoodAfternoon,
        activeSessions: {
          title: 'ACTIVE SESSIONS',
          blockSessions: [
            {
              id: 'block-session-id-1',
              name: 'Sleeping time',
              minutesLeft: 'Ends in 10 minutes',
              blocklists: 1,
              devices: 2,
            },
            {
              id: 'block-session-id-2',
              name: 'Working time',
              minutesLeft: 'Ends in about 4 hours',
              blocklists: 1,
              devices: 2,
            },
          ],
        },
        scheduledSessions: {
          title: 'NO SCHEDULED SESSIONS',
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
        },
      },
    ],
  ])(
    'Example: there is %s going on',
    (_, preloadedState: PreloadedState, expectedViewModel) => {
      const store = createTestStore({}, preloadedState)
      const now = '2023-06-07T13:48:00.000Z'

      const homeViewModel = selectHomeViewModel(store.getState(), () => now)

      expect(homeViewModel).toStrictEqual(expectedViewModel)
    },
  )

  it.each([
    [Greetings.GoodMorning, 'from 06:00 to 11:59', '2023-06-07T06:00:00.000Z'],
    [Greetings.GoodMorning, 'from 06:00 to 11:59', '2023-06-07T08:50:00.000Z'],
    [Greetings.GoodMorning, 'from 06:00 to 11:59', '2023-06-07T11:59:00.000Z'],
    [
      Greetings.GoodAfternoon,
      'from 12:00 to 17:59',
      '2023-06-07T12:00:00.000Z',
    ],
    [
      Greetings.GoodAfternoon,
      'from 12:00 to 17:59',
      '2023-06-07T13:50:00.000Z',
    ],
    [
      Greetings.GoodAfternoon,
      'from 12:00 to 17:59',
      '2023-06-07T17:59:00.000Z',
    ],
    [Greetings.GoodEvening, 'from 18:00 to 21:59', '2023-06-07T18:00:00.000Z'],
    [Greetings.GoodEvening, 'from 18:00 to 21:59', '2023-06-07T21:00:00.000Z'],
    [Greetings.GoodEvening, 'from 18:00 to 21:59', '2023-06-07T21:59:00.000Z'],
    [Greetings.GoodNight, 'from 22:00 to 06:00', '2023-06-07T22:50:00.000Z'],
    [Greetings.GoodNight, 'from 22:00 to 06:00', '2023-06-07T00:50:00.000Z'],
    [Greetings.GoodNight, 'from 22:00 to 06:00', '2023-06-07T04:50:00.000Z'],
    [Greetings.GoodNight, 'from 22:00 to 06:00', '2023-06-07T05:59:00.000Z'],
  ])(
    'should greet the user with %s %s',
    (greetings: Greetings, _, now: string) => {
      const store = createTestStore({}, {})

      const homeViewModel = selectHomeViewModel(store.getState(), () => now)

      expect(homeViewModel.greetings).toStrictEqual(greetings)
    },
  )
})
