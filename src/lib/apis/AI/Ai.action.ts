import type { ChatModelAdapter } from '@assistant-ui/react';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const createOpenRouterAdapter = (model: string): ChatModelAdapter => ({
  async *run({ messages, abortSignal }) {
    // 1. Sanitize messages: OpenRouter free models crash if content is empty or undefined
    const sanitizedMessages = messages.map((m) => {
      const textContent = m.content
        .map((c) => (c.type === 'text' ? c.text : ''))
        .join('')
        .trim();

      return {
        role: m.role,
        content: textContent || ' ', // Ensure there's at least a space
      };
    });

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'React AI App',
      },
      signal: abortSignal,
      body: JSON.stringify({
        model: model,
        stream: true,
        messages: sanitizedMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter Error:', errorData);

      // Provide a user-friendly error message based on the status
      if (response.status === 429) {
        throw new Error(
          'This free model is overloaded. Please switch to Llama 3.2 or Qwen.'
        );
      }
      throw new Error(errorData.error?.message || 'The model is currently unavailable.');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';

    if (!reader) throw new Error('No response body');

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6);
          if (data === '[DONE]') break;

          try {
            const json = JSON.parse(data);
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              accumulatedText += content;
              yield {
                content: [{ type: 'text', text: accumulatedText }],
              };
            }
          } catch (e) {
            /* partial chunk */
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  },
});

export const generateChatTitle = async (message: string, model: string): Promise<string> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'React AI App',
      },
      body: JSON.stringify({
        model: model,
        stream: false,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant. Generate a short, concise title (max 5 words) for the chat based on the following user message. Do not use quotes or prefixes. Just the title.',
          },
          { role: 'user', content: message },
        ],
      }),
    });

    if (!response.ok) return 'New Chat';

    const json = await response.json();
    return json.choices?.[0]?.message?.content?.trim().slice(0, 50) || 'New Chat';
  } catch (error) {
    console.error('Error generating title:', error);
    return 'New Chat';
  }
};
