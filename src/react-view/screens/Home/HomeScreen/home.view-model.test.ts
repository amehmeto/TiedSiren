import { describe, expect, test } from 'vitest'
import { selectHomeViewModel } from './home.view-model.ts'
import { createTestStore } from '../../../../core/createTestStore.ts'
import { PreloadedState } from '../../../../core/createStore.ts'

describe('Home View Model', () => {
  test.each([
    [
      'no session',
      {},
      {
        type: 'NO_BLOCK_SESSIONS',
        sessionBoardTitle: 'No active sessions',
        message:
          "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
        blockSessions: null,
      },
    ],

    [
      'one session',
      {
        blockSession: {
          ids: ['block-session-id'],
          entities: {
            'block-session-id': {
              id: 'block-session-id',
              name: 'Sleeping time',
              start: '2023-06-07T17:00:00.000Z',
              end: '2023-06-07T17:30:00.000Z',
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
          },
        },
      },
      {
        type: 'ONE_OR_MORE_BLOCK_SESSIONS',
        sessionBoardTitle: 'Active sessions',
        blockSessions: [
          {
            id: 'block-session-id',
            name: 'Sleeping time',
            minutesLeft: '10 minutes left',
            blocklists: 1,
            devices: 2,
          },
        ],
      },
    ],

    [
      'two sessions',
      {
        blockSession: {
          ids: ['block-session-id-1', 'block-session-id-2'],
          entities: {
            'block-session-id-1': {
              id: 'block-session-id-1',
              name: 'Sleeping time',
              start: '2023-06-07T17:00:00.000Z',
              end: '2023-06-07T17:30:00.000Z',
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
            'block-session-id-2': {
              id: 'block-session-id-2',
              name: 'Working time',
              start: '2023-06-07T17:00:00.000Z',
              end: '2023-06-07T17:30:00.000Z',
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
          },
        },
      },
      {
        type: 'ONE_OR_MORE_BLOCK_SESSIONS',
        sessionBoardTitle: 'Active sessions',
        blockSessions: [
          {
            id: 'block-session-id-1',
            name: 'Sleeping time',
            minutesLeft: '10 minutes left',
            blocklists: 1,
            devices: 2,
          },
          {
            id: 'block-session-id-2',
            name: 'Working time',
            minutesLeft: '10 minutes left',
            blocklists: 1,
            devices: 2,
          },
        ],
      },
    ],
  ])(
    'Example: there is %s going on',
    (_, preloadedState: PreloadedState, expectedViewModel) => {
      const store = createTestStore({}, preloadedState)

      const homeViewModel = selectHomeViewModel(store.getState())

      expect(homeViewModel).toEqual(expectedViewModel)
    },
  )
})
