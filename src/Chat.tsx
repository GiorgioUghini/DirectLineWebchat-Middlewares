/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Components, createDirectLine, createStore, createBrowserWebSpeechPonyfillFactory } from 'botframework-webchat'
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme'
import React, { useEffect, useState, useMemo } from 'react'

import { acquireToken } from './acquireToken'
import { incomingActivityMiddleware, outgoingActivityMiddleware } from './middleware'
import { directLineRegion, directLineUrl } from './settings.js'

const { BasicWebChat, Composer } = Components

const DIRECT_LINE_PATH = '/v3/directline'

const buildDirectLineDomain = (region?: string | null) => {
  const trimmed = region?.trim()

  if (!trimmed || trimmed === 'directline.botframework.com') {
    return undefined
  }

  const base = trimmed.replace(/^https?:\/\//i, '').replace(/\/$/, '')

  return `https://${base}${DIRECT_LINE_PATH}`
}

function Chat () {
  const [connection, setConnection] = useState<ReturnType<typeof createDirectLine> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const webchatSettings = { showTyping: true }
  const webSpeechPonyfillFactory = createBrowserWebSpeechPonyfillFactory()

  const store = useMemo(
    () =>
      createStore(
        {},
        incomingActivityMiddleware,
        outgoingActivityMiddleware,
        ({ dispatch }: any) => (next: any) => (action: any) => {
          if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
            dispatch({
              type: 'DIRECT_LINE/POST_ACTIVITY',
              meta: { method: 'keyboard' },
              payload: {
                activity: {
                  channelData: { postBack: true },
                  name: 'startConversation',
                  type: 'event'
                }
              }
            })
          }
          return next(action)
        }
      ),
    []
  )

  useEffect(() => {
    let isCancelled = false

    const initializeConnection = async () => {
      if (!directLineUrl || directLineUrl === 'YOUR_DIRECTLINE_URL') {
        setError('Update directLineUrl in settings.js with your Direct Line endpoint.')
        return
      }

      try {
        const { token } = await acquireToken(directLineUrl)
        const domain = buildDirectLineDomain(directLineRegion)

        if (isCancelled) {
          return
        }

        const directLineOptions = domain ? { token, domain } : { token }

        setConnection(createDirectLine(directLineOptions))
      } catch (err) {
        console.error('Unable to initialize Direct Line', err)
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unable to initialize Direct Line connection.')
        }
      }
    }

    initializeConnection()

    return () => {
      isCancelled = true
    }
  }, [])

  if (error) {
    return (
      <div role='alert'>
        {error}
      </div>
    )
  }

  return connection
    ? (
      <FluentThemeProvider>
        <Composer directLine={connection} store={store}>
          <BasicWebChat {...webchatSettings} />
        </Composer>
      </FluentThemeProvider>
      )
    : null
}

export default Chat
