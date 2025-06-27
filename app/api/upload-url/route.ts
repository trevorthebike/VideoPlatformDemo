import { NextResponse } from 'next/server';
import Mux from '@mux/mux-node';

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function POST() {
  try {
    const upload = await mux.video.uploads.create({
        new_asset_settings: { playback_policies: ['public' ]},
        cors_origin: '*',
      });

    return NextResponse.json({ url: upload.url });
  } catch (error) {
    console.error('Mux upload URL error:', error);
    return NextResponse.json({ error: 'Failed to create upload URL' }, { status: 500 });
  }
}
