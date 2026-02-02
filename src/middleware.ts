// Declare global message history on window
declare global {
  interface Window {
    messageHistory: Array<{
      id: string
      timestamp: string
      from: string
      text: string
    }>
  }
}

export const connectionMiddleware = ({ dispatch }: any) => (next: any) => (action: any) => {
  if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
    // Send startConversation event when connection is established
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

// Initialize the global message history array
if (typeof window !== 'undefined' && !window.messageHistory) {
  window.messageHistory = []
}

export const incomingActivityMiddleware = ({ dispatch }: any) => (next: any) => (action: any) => {
  if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
    const { activity } = action.payload

    window.console.log('Incoming activity:', activity)

    // Store incoming messages in global history
    if (activity.type === 'message' && activity.text && activity.from.role === 'bot') {
      window.messageHistory.push({
        id: activity.id || crypto.randomUUID(),
        timestamp: activity.timestamp || new Date().toISOString(),
        from: activity.from?.name || activity.from?.id || 'unknown',
        text: activity.text
      })
    }

    // Filter out JSON messages from display
    if (activity.type === 'message' && activity.text && activity.text.startsWith('{')) {
      return
    }

    
  }
  return next(action)
}

export const outgoingActivityMiddleware = () => (next: any) => (action: any) => {
  if (action.type === 'DIRECT_LINE/POST_ACTIVITY') {
    const { activity } = action.payload

    window.console.log('Outgoing activity:', activity)

    // Modify and store outgoing messages
    if (activity.type === 'message' && activity.text) {

      window.messageHistory.push({
        id: activity.id || crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        from: 'user',
        text: activity.text
      })
    }
  }
  return next(action)
}
