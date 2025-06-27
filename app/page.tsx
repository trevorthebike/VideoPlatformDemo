'use client';

import { useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import MuxUploader from '@mux/mux-uploader-react';

export default function Home() {
  const [uploadUrl, setUploadUrl] = useState('');
  const [videos, setVideos] = useState([]);

  // Get upload URL from backend
  const getUploadUrl = async () => {
    const res = await fetch('/api/upload-url', { method: 'POST' });
    const data = await res.json();
    setUploadUrl(data.url);
  };

   useEffect(() => {
    getUploadUrl();
  }, []);
  
  // Get uploaded videos
  const fetchVideos = async () => {
    const res = await fetch('/api/videos');
    const data = await res.json();
    setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Video App</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <section className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Upload a Video</h2>
          {uploadUrl ? (
            <MuxUploader
              key = {uploadUrl} 
              endpoint={uploadUrl}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px dashed #ccc',
                borderRadius: '8px',
              }}
              onSuccess={() => {
                alert('Upload complete!');
                fetchVideos();
                getUploadUrl(); // Refresh video list after upload
              }}
              onError={() => alert('Upload failed.')}
            />
          ) : (
            <p>Loading upload URL...</p>
          )}
        </section>

        {/* Uploaded Videos Section */}
        <section className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Uploaded Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.length === 0 && <p>No videos yet.</p>}
            {(videos as { id: string; playbackId: string }[]).map((video) => (
            <div key={video.id} className="aspect-video border rounded-lg overflow-hidden">
              <MuxPlayer
                playbackId={video.playbackId}
                            streamType="on-demand"
                  //controls
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
