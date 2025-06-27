import { NextResponse } from 'next/server';
import Mux from '@mux/mux-node';

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function GET() {
  try {
    const result = await mux.video.assets.list({ limit: 20 });
    const assets = result.data; 

    const playbackList = assets
      .map((asset) => ({
        id: asset.id,
        playbackId: asset.playback_ids?.[0]?.id,
        status: asset.status,
      }))
      .filter((v) => v.playbackId); // only include playable ones

    return NextResponse.json(playbackList);
  } catch (error) {
    console.error('Mux list error:', error);
    return NextResponse.json({ error: 'Failed to list videos' }, { status: 500 });
  }
}
