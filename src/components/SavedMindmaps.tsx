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
    <div className="w-64 h-screen bg-gray-50 p-6 overflow-y-auto border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Saved Mindmaps</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {mindmaps.map((mindmap) => (
            <div
              key={mindmap.id}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out border border-gray-100 hover:border-blue-200"
            >
              <h3 className="font-medium text-gray-800 truncate mb-1">{mindmap.title}</h3>
              <p className="text-xs text-gray-500 truncate mb-3">{mindmap.youtubeUrl}</p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-24 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
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