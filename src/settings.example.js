/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// Flag to enable debug mode, which will store the debug information in localStorage.
// Copilot Studio Client uses the "debug" library for logging (https://github.com/debug-js/debug?tab=readme-ov-file#browser-support).
window.localStorage.debug = 'copilot-studio:*'

// ─── Authentication Mode ────────────────────────────────────────────
// Set to 'directline' for anonymous Direct Line token auth (no login required),
// or 'microsoft' for Microsoft Entra ID (MSAL) login with an App Registration.
export const authMode = 'microsoft' // 'directline' | 'microsoft'


// ─── Direct Line Settings (used when authMode === 'directline') ─────
// Token service endpoint that exchanges credentials for a Direct Line token.
// I.E. https://abcdefabcedfabcedf.00.environment.api.powerplatform.com/powervirtualagents/botsbyschema/AGENT_SCHEMA_NAME/directline/token?api-version=2022-03-01-preview
export const directLineUrl = 'YOUR_TOKEN_URL'

// Host portion of the Direct Line regional endpoint (omit protocol). Use
// 'directline.botframework.com' for global or replace with e.g.
// 'directline.botframework.azure.us' or 'europe.directline.botframework.com'.
// Leave empty to fall back to global.
export const directLineRegion = 'europe.directline.botframework.com'

// ─── Microsoft Auth Settings (used when authMode === 'microsoft') ───
export const microsoftSettings = {
  // App ID of the App Registration used to log in (must be in the same tenant as the Copilot).
  appClientId: '',
  // Tenant ID of the App Registration used to log in (must be in the same tenant as the Copilot).
  tenantId: '',
  // Authority endpoint for Azure AD login. Default is 'https://login.microsoftonline.com'.
  authority: '',
  // Environment ID of the environment with the Copilot Studio App.
  environmentId: '',
  // Schema Name of the Copilot to use.
  agentIdentifier: '',
  // PowerPlatformCloud enum key (optional).
  cloud: undefined,
  // Power Platform API endpoint to use if Cloud is configured as "Other" (optional).
  customPowerPlatformCloud: undefined,
  // AgentType enum key (optional).
  copilotAgentType: undefined,
  // URL used to connect to the Copilot Studio service (optional).
  directConnectUrl: undefined,
  // Flag to use the "x-ms-d2e-experimental" header URL on subsequent calls (optional).
  useExperimentalEndpoint: false
}
