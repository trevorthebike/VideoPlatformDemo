'use client';

import { useEffect, useState } from 'react';
import  MuxUploader  from '@mux/mux-uploader-react';

export default function HomePage() {
  const [uploadUrl, setUploadUrl] = useState('');

  useEffect(() => {
    const getUrl = async () => {
      const res = await fetch('/api/upload-url', { method: 'POST' });
      const data = await res.json();
      setUploadUrl(data.url);
    };
    getUrl();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Simple Mux Uploader</h1>

      {uploadUrl ? (
        <MuxUploader
          endpoint={uploadUrl}
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px dashed #ccc',
            borderRadius: '8px',
          }}
          onSuccess={() => alert('Upload complete!')}
          onError={() => alert('Upload failed.')}
        />
      ) : (
        <p>Loading upload URL...</p>
      )}
    </main>
  );
}
