import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, conversation = [] } = await req.json()
    
    // Get Anthropic API key from Supabase secrets
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    
    if (!anthropicApiKey) {
      throw new Error('Anthropic API key not configured')
    }

    // Build conversation history
    const messages = [
      {
        role: 'system',
        content: `You are Claude Code Sim, an AI coding assistant integrated into a terminal interface for ClaudeCode Mastery. 

Guidelines:
- Keep responses concise and terminal-friendly (avoid long paragraphs)
- Focus on practical coding help, explanations, and examples
- Use code snippets when helpful
- Be encouraging and educational
- Format responses to work well in a terminal environment
- If asked about code, provide clear, executable examples
- Help users learn step by step

Current context: User is learning to code in the ClaudeCode Mastery program.`
      },
      ...conversation,
      {
        role: 'user',
        content: prompt
      }
    ]

    console.log('Sending request to Anthropic API...')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anthropicApiKey}`,
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: messages.filter(msg => msg.role !== 'system').concat([
          { role: 'user', content: `${messages[0].content}\n\nUser prompt: ${prompt}` }
        ])
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API error:', response.status, errorText)
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Anthropic API response received')

    const assistantMessage = data.content[0]?.text || 'I apologize, but I could not generate a response.'

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: assistantMessage,
        conversation: [...conversation, 
          { role: 'user', content: prompt },
          { role: 'assistant', content: assistantMessage }
        ]
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Claude chat failed:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to get response from Claude',
        message: 'Sorry, I encountered an error. Please try again.'
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})