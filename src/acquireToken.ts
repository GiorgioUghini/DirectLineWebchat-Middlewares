/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

type TokenResponse = {
  token: string,
  conversationId?: string
}

export async function acquireToken (tokenEndpoint: string): Promise<TokenResponse> {
  // Make a GET request to the token service endpoint
  const response = await fetch(tokenEndpoint)

  if (!response.ok) {
    throw new Error(`Failed to acquire token: ${response.status} ${response.statusText}`)
  }

  const data = await response.json() as TokenResponse
  
  if (!data.token) {
    throw new Error('Token service response: missing token')
  }

  return {
    token: data.token,
    conversationId: data.conversationId
  }
}
