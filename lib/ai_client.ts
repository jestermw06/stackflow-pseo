export type AIProvider = 'openai' | 'xai' | 'anthropic';

interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

interface ChatResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
  };
}

/**
 * Multi-provider LLM client using native fetch (Edge / Serverless friendly).
 * OpenAI-compatible providers (OpenAI, xAI) share one request shape.
 */
export async function getAIResponse(
  prompt: string,
  config: AIConfig
): Promise<ChatResponse> {
  const { provider, apiKey, baseUrl, model } = config;

  if (provider === 'xai') {
    return fetchOpenAICompatibleResponse(
      prompt,
      apiKey,
      baseUrl || 'https://api.x.ai/v1/chat/completions',
      model || 'grok-3'
    );
  }

  if (provider === 'openai') {
    return fetchOpenAICompatibleResponse(
      prompt,
      apiKey,
      baseUrl || 'https://api.openai.com/v1/chat/completions',
      model || 'gpt-4o'
    );
  }

  if (provider === 'anthropic') {
    throw new Error(
      'Anthropic provider is not implemented yet. Use openai or xai.'
    );
  }

  throw new Error(`Unsupported AI Provider: ${provider}`);
}

async function fetchOpenAICompatibleResponse(
  prompt: string,
  apiKey: string,
  url: string,
  model: string
): Promise<ChatResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API Error (${url}): ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    usage: {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
    },
  };
}
