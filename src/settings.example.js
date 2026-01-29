/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// Flag to enable debug mode, which will store the debug information in localStorage.
// Copilot Studio Client uses the "debug" library for logging (https://github.com/debug-js/debug?tab=readme-ov-file#browser-support).
window.localStorage.debug = 'copilot-studio:*'

// Token service endpoint that exchanges credentials for a Direct Line token.
export const directLineUrl = 'YOUR_TOKEN_URL'
// I.E. https://abcdefabcedfabcedf.00.environment.api.powerplatform.com/powervirtualagents/botsbyschema/AGENT_SCHEMA_NAME/directline/token?api-version=2022-03-01-preview

// Host portion of the Direct Line regional endpoint (omit protocol). Use
// 'directline.botframework.com' for global or replace with e.g.
// 'directline.botframework.azure.us' or 'europe.directline.botframework.com'.
// Leave empty to fall back to global.
export const directLineRegion = 'europe.directline.botframework.com'
