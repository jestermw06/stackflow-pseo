import { error } from 'next/navigation';

export type AIProvider = 'openai' | 'xai' | 'anthropic';

interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  baseUrl?: string;
}

interface ChatResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
  };
}

/**
 * The Multi-Brain Client handles requests to different LLM providers.
 * It is designed to be lightweight, using native fetch for maximum compatibility 
 * with Vercel Edge and Serverless environments.
 */
export async function getAIResponse(
  prompt: string, 
  config: AIConfig
): Promise<ChatResponse> {
  const { provider, apiKey, baseUrl } = config;

  // 1. Handle xAI (Grok) - OpenAI Compatible
  if (provider === 'xai') {
    return fetchXAIResponse(prompt, apiKey, baseUrl);
  }

  // 2. Handle OpenAI - OpenAI Compatible
  if (provider === 'openai') {
    return fetchOpenAIResponse(prompt, apiKey, baseUrl);
  }

  // 3. Handle Anthropic - Note: This would require a different payload structure.
  // For this phase, we implement the logic for the OpenAI-compatible providers.
  if (provider === 'anthropic') {
    throw new Error("Anthropic provider is currently being implemented in the next sprint.");
  }

  throw new Error(`Unsupported AI Provider: ${provider}`);
}

/**
 * Generic fetcher for OpenAI-compatible APIs (includes xAI/Grok)
 */
async function fetchOpenAICompatibleResponse(
  prompt: string, 
  apiKey: string, 
  baseUrl: string | undefined,
  model: string = 'gpt-4o'
): Promise<ChatResponse> {
  const url = baseUrl || 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2, // Low temperature for structured data reliability
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
    }
  };
}

async function fetchXAIResponse(prompt: string, apiKey: string, baseUrl?: string): Promise<ChatResponse> {
  // xAI uses the same structure as OpenAI but with its own endpoint
  const xaiBaseUrl = baseUrl || 'https://api.x.ai/v1/chat/completions';
  return fetchOpenAICompatibleResponse(prompt, apiKey, xaiBaseUrl, 'grok-4.5'); 
}

async function fetchOpenAIResponse(prompt: string, apiKey: string, baseUrl?: string): Promise<ChatResponse> {
  const openAIBaseUrl = baseUrl || 'https://api.openai.com/v1/chat/completions';
  return fetchOpenAICompatibleResponse(prompt, apiKey, openAIBaseUrl, 'gpt-4o');
}
