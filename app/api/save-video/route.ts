// /app/api/save-video/route.ts
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // Check auth
  const { user, error } = await supabase.auth.getUser();
  if (error || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { playback_url, title } = body;

  const { error: insertError } = await supabase.from('videos').insert({
    user_id: user.id,
    title,
    playback_url,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
