import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Octokit } from "https://esm.sh/@octokit/core@5"

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
    const { owner, repo } = await req.json()
    
    // Get GitHub token from Supabase secrets
    const githubToken = Deno.env.get('GITHUB_TOKEN')
    
    if (!githubToken) {
      throw new Error('GitHub token not configured')
    }

    const octokit = new Octokit({ auth: githubToken })

    // Fork the repository
    const response = await octokit.request('POST /repos/{owner}/{repo}/forks', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        forkUrl: response.data.html_url,
        message: 'Repository forked successfully' 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Fork failed:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to fork repository' 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})