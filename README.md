# Direct Line WebChat Middleware Sample

This sample demonstrates how to use **Redux middleware** with [Bot Framework WebChat](https://www.npmjs.com/package/botframework-webchat) (Fluent theme) and Direct Line. It shows how to intercept, modify, and log both incoming and outgoing messages in a chat application.

## Overview

The sample is a React application that connects to a bot via Direct Line and showcases middleware patterns for:
- Intercepting incoming messages from the bot
- Intercepting and modifying outgoing messages from the user
- Maintaining a global message history
- Filtering unwanted messages from display

The application is embedded in a demo website about European cities to demonstrate how WebChat can be integrated into a real-world single-page application.

## Middleware Architecture

WebChat uses Redux for state management. Middleware sits between dispatched actions and reducers, allowing you to intercept, modify, or block actions.

```
User Input → POST_ACTIVITY → [Outgoing Middleware] → Direct Line → Bot
Bot Response → INCOMING_ACTIVITY → [Incoming Middleware] → WebChat UI
```

### Middleware Implementation

The middleware is defined in `src/middleware.ts`:

#### 1. Incoming Activity Middleware

Intercepts messages received from the bot via `DIRECT_LINE/INCOMING_ACTIVITY`:

```typescript
export const incomingActivityMiddleware = ({ dispatch }) => (next) => (action) => {
  if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
    const { activity } = action.payload

    // Store bot messages in global history
    if (activity.type === 'message' && activity.text && activity.from.role === 'bot') {
      window.messageHistory.push({
        id: activity.id,
        timestamp: activity.timestamp,
        from: activity.from?.name || 'bot',
        text: activity.text
      })
    }

    // Filter out JSON messages from display
    if (activity.type === 'message' && activity.text?.startsWith('{')) {
      return // Block the action - message won't be displayed
    }
  }
  return next(action)
}
```

**What it does:**
- Logs all incoming activities to the console
- Stores bot messages in `window.messageHistory` for external access
- Filters out messages that start with `{` (JSON payloads) from being displayed

#### 2. Outgoing Activity Middleware

Intercepts messages sent by the user via `DIRECT_LINE/POST_ACTIVITY`:

```typescript
export const outgoingActivityMiddleware = () => (next) => (action) => {
  if (action.type === 'DIRECT_LINE/POST_ACTIVITY') {
    const { activity } = action.payload

    // Modify outgoing messages
    if (activity.type === 'message' && activity.text) {
      activity.text = activity.text + ' !!!!!'

      window.messageHistory.push({
        id: activity.id,
        timestamp: new Date().toISOString(),
        from: 'user',
        text: activity.text
      })
    }
  }
  return next(action)
}
```

**What it does:**
- Logs all outgoing activities to the console
- Modifies the message text by appending exclamation marks
- Stores the modified message in `window.messageHistory`
- The modified text is both displayed in the chat and sent to the bot

### Global Message History

Both middlewares contribute to a global `window.messageHistory` array that can be accessed from the browser console or other parts of your application:

```javascript
// Access from browser console
window.messageHistory          // All messages (both directions)
window.messageHistory.length   // Total message count
window.messageHistory.at(-1)   // Most recent message
```

Each message entry contains:
```typescript
{
  id: string        // Unique message identifier
  timestamp: string // ISO 8601 timestamp
  from: string      // 'user' or bot name
  text: string      // Message content
}
```

### Registering Middleware

Middleware is registered when creating the Redux store in `src/Chat.tsx`:

```typescript
const store = useMemo(
  () =>
    createStore(
      {},
      incomingActivityMiddleware,
      outgoingActivityMiddleware,
      // Additional middleware...
    ),
  []
)
```

## Common Middleware Use Cases

| Use Case | Action Type | Example |
|----------|-------------|---------|
| Log messages | Both | Analytics, debugging |
| Modify outgoing text | `POST_ACTIVITY` | Add signatures, translate |
| Filter incoming messages | `INCOMING_ACTIVITY` | Hide system messages, JSON |
| Store history | Both | Persist to localStorage, send to server |
| Add metadata | `POST_ACTIVITY` | Attach user context, session info |
| Transform responses | `INCOMING_ACTIVITY` | Format dates, sanitize HTML |

## Project Structure

```
src/
  index.tsx        # App entry point with demo website
  Chat.tsx         # WebChat component with store setup
  middleware.ts    # Incoming and outgoing middleware
  acquireToken.ts  # Token acquisition for Direct Line
  settings.js      # Configuration (Direct Line URL, region)
public/
  index.html       # HTML template
  index.css        # Styling for demo website
```

## Prerequisites

- [Node.js](https://nodejs.org) version 20+
- A Direct Line token endpoint (configured in `settings.js`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Rename `src/settings.example.js` to `src/settings.js` and update it with your Direct Line token URL (found under Copilot Studio -> Channels -> Email, even if you're not going to use emails) and the geography:
   ```javascript
   export const directLineUrl = 'YOUR_TOKEN_URL'
   export const directLineRegion = 'europe.directline.botframework.com'
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Key Dependencies

- **React 16.8.6** - UI framework
- **botframework-webchat** - Chat UI components and Direct Line integration
- **botframework-webchat-fluent-theme** - Microsoft Fluent UI styling
- **esbuild** - Fast bundling and development server

## Further Reading

- [Bot Framework WebChat GitHub](https://github.com/microsoft/BotFramework-WebChat)
- [WebChat API Reference](https://github.com/microsoft/BotFramework-WebChat/blob/main/docs/API.md)
- [Redux Middleware Documentation](https://redux.js.org/understanding/history-and-design/middleware)
