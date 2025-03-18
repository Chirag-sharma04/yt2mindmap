'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SavedMindmap {
  id: string;
  title: string;
  youtubeUrl: string;
  createdAt: string;
}

export default function SavedMindmaps() {
  const { data: session } = useSession();
  const [mindmaps, setMindmaps] = useState<SavedMindmap[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetchSavedMindmaps();
    }
  }, [session]);

  const fetchSavedMindmaps = async () => {
    if (!session?.user?.email) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/mindmaps?email=${encodeURIComponent(session.user.email)}`);
      if (response.ok) {
        const data = await response.json();
        setMindmaps(data);
      }
    } catch (error) {
      console.error('Error fetching mindmaps:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Saved Mindmaps</h2>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {mindmaps.map((mindmap) => (
            <div key={mindmap.id} className="p-3 bg-white rounded-lg shadow-sm">
              <h3 className="font-medium text-sm truncate">{mindmap.title}</h3>
              <p className="text-xs text-gray-500 truncate">{mindmap.youtubeUrl}</p>
              <div className="mt-2 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.location.href = `/mindmap?id=${mindmap.id}`}
                >
                  Open
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}