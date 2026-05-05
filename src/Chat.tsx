/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { createStore } from 'botframework-webchat'
import React, { useMemo } from 'react'

import { authMode } from './settings.js'
import { incomingActivityMiddleware, outgoingActivityMiddleware, connectionMiddleware } from './middleware'
import DirectLineChat from './DirectLineChat'
import MicrosoftChat from './MicrosoftChat'

// Chat routes to the correct implementation based on authMode in settings.js
function Chat () {
  const store = useMemo(
    () =>
      createStore(
        {},
        incomingActivityMiddleware,
        outgoingActivityMiddleware,
        connectionMiddleware
      ),
    []
  )

  if (authMode === 'microsoft') {
    return <MicrosoftChat store={store} />
  }
  return <DirectLineChat store={store} />
}

export default Chat
