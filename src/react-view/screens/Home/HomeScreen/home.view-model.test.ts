import { describe, expect, test, it } from 'vitest'
import { Greetings, selectHomeViewModel } from './home.view-model.ts'
import { createTestStore } from '../../../../core/createTestStore.ts'
import { PreloadedState } from '../../../../core/createStore.ts'
import { stateBuilder } from '../../../../core/state-builder.ts'

describe('Home View Model', () => {
  test.each([
    [
      'no session',
      {},
      {
        type: 'NO_BLOCK_SESSIONS',
        greetings: Greetings.GoodAfternoon,
        activeSessions: {
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
          title: 'NO ACTIVE SESSIONS',
        },
      },
    ],

    [
      'one session',
      stateBuilder()
        .withBlockSessions([
          {
            id: 'block-session-id',
            name: 'Sleeping time',
            start: '03:48:00',
            end: '13:58:00',
            blocklists: [
              {
                id: 'blocklist-id',
                name: 'Distractions',
                totalBlocks: 10,
              },
            ],
            devices: [
              {
                id: 'device-id',
                type: 'android',
                name: 'Huawei P30',
              },
              {
                id: 'device-id-2',
                type: 'android',
                name: 'Google Pixel 3a',
              },
            ],
          },
        ])
        .build(),
      {
        type: 'ONE_OR_MORE_BLOCK_SESSIONS',
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
      },
    ],

    [
      'one session',
      stateBuilder()
        .withBlockSessions([
          {
            id: 'block-session-id',
            name: 'Sleeping time',
            start: '03:48:00',
            end: '14:58:00',
            blocklists: [
              {
                id: 'blocklist-id',
                name: 'Distractions',
                totalBlocks: 10,
              },
            ],
            devices: [
              {
                id: 'device-id',
                type: 'android',
                name: 'Huawei P30',
              },
              {
                id: 'device-id-2',
                type: 'android',
                name: 'Google Pixel 3a',
              },
            ],
          },
        ])
        .build(),
      {
        type: 'ONE_OR_MORE_BLOCK_SESSIONS',
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
      },
    ],

    [
      'two sessions',
      stateBuilder()
        .withBlockSessions([
          {
            id: 'block-session-id-1',
            name: 'Sleeping time',
            start: '10:48:00',
            end: '13:58:00',
            blocklists: [
              {
                id: 'blocklist-id',
                name: 'Distractions',
                totalBlocks: 10,
              },
            ],
            devices: [
              {
                id: 'device-id',
                type: 'android',
                name: 'Huawei P30',
              },
              {
                id: 'device-id-2',
                type: 'android',
                name: 'Google Pixel 3a',
              },
            ],
          },
          {
            id: 'block-session-id-2',
            name: 'Working time',
            start: '10:48:00',
            end: '13:58:00',
            blocklists: [
              {
                id: 'blocklist-id',
                name: 'Distractions',
                totalBlocks: 10,
              },
            ],
            devices: [
              {
                id: 'device-id',
                type: 'android',
                name: 'Huawei P30',
              },
              {
                id: 'device-id-2',
                type: 'android',
                name: 'Google Pixel 3a',
              },
            ],
          },
        ])
        .build(),

      {
        type: 'ONE_OR_MORE_BLOCK_SESSIONS',
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
              minutesLeft: 'Ends in 10 minutes',
              blocklists: 1,
              devices: 2,
            },
          ],
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

      expect(homeViewModel).toStrictEqual({
        type: 'NO_BLOCK_SESSIONS',
        greetings,
        activeSessions: {
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
          title: 'NO ACTIVE SESSIONS',
        },
      })
    },
  )
})
