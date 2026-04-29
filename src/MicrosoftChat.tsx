/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Components } from 'botframework-webchat'
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme'
import React, { useState, useEffect } from 'react'
import { ConnectionSettings, CopilotStudioClient, CopilotStudioWebChat, CopilotStudioWebChatConnection } from '@microsoft/agents-copilotstudio-client'

import { acquireTokenMsal } from './acquireTokenMsal'
import { microsoftSettings } from './settings.js'

const { BasicWebChat, Composer } = Components

function MicrosoftChat () {
  const [connection, setConnection] = useState<CopilotStudioWebChatConnection | null>(null)
  const [error, setError] = useState<string | null>(null)
  const webchatSettings = { showTyping: true }

  useEffect(() => {
    let isCancelled = false

    const initializeConnection = async () => {
      if (!microsoftSettings.appClientId || !microsoftSettings.tenantId ||
          !microsoftSettings.environmentId || !microsoftSettings.agentIdentifier) {
        setError('Update microsoftSettings in settings.js with your App Registration and Copilot details.')
        return
      }

      try {
        const agentSettings = new ConnectionSettings(microsoftSettings)
        const token = await acquireTokenMsal(agentSettings)
        const client = new CopilotStudioClient(agentSettings, token)

        if (isCancelled) return

        setConnection(CopilotStudioWebChat.createConnection(client, webchatSettings))
      } catch (err) {
        console.error('Unable to initialize Microsoft auth connection', err)
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unable to initialize Microsoft auth connection.')
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
        <Composer directLine={connection}>
          <BasicWebChat />
        </Composer>
      </FluentThemeProvider>
      )
    : null
}

export default MicrosoftChat
