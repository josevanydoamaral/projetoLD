import React, { useState, useEffect } from 'react';
import { Loader2, ZoomIn, ZoomOut } from 'lucide-react';

interface GenerationStatus {
  status: 'idle' | 'generating' | 'upscaling' | 'finished';
  progress: number;
  imageUrl?: string;
  resourceId?: string;
  jobId?: string;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>({
    status: 'idle',
    progress: 0
  });

  const generateImage = async () => {
    try {
      setGenerationStatus({ status: 'generating', progress: 0 });
      
      // Initial generation request
      const generateResponse = await fetch('http://127.0.0.1:8080/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text_prompt: prompt })
      });
      
      const { job_id } = await generateResponse.json();
      
      // Poll for status
      const checkStatus = async () => {
        const statusResponse = await fetch(`http://127.0.0.1:8080/api/status/${job_id}`);
        const statusData = await statusResponse.json();
        
        setGenerationStatus(prev => ({
          ...prev,
          progress: statusData.progress,
          imageUrl: statusData.image_url
        }));
        
        if (statusData.status === 'finished') {
          const resultResponse = await fetch(`http://127.0.0.1:8080/api/result/${job_id}`);
          const resultData = await resultResponse.json();
          
          setGenerationStatus(prev => ({
            ...prev,
            status: 'finished',
            resourceId: resultData.resource_id,
            imageUrl: resultData.image_url
          }));
        } else {
          setTimeout(checkStatus, 1000);
        }
      };
      
      checkStatus();
    } catch (error) {
      console.error('Error generating image:', error);
      setGenerationStatus({ status: 'idle', progress: 0 });
    }
  };

  const handleZoom = async (direction: 'in' | 'out') => {
    if (!generationStatus.resourceId) return;
    
    try {
      setGenerationStatus(prev => ({ ...prev, status: 'upscaling' }));
      
      const response = await fetch(`http://127.0.0.1:8080/api/image/zoom/${direction}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource_id: generationStatus.resourceId })
      });
      
      const data = await response.json();
      setGenerationStatus(prev => ({
        ...prev,
        status: 'finished',
        resourceId: data.resource_id,
        imageUrl: data.image_url
      }));
    } catch (error) {
      console.error('Error zooming image:', error);
      setGenerationStatus(prev => ({ ...prev, status: 'finished' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Image Generator</h1>
          <p className="text-gray-600 mb-6">Create amazing images with AI</p>
          
          <div className="space-y-4">
            <div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={4}
              />
            </div>
            
            <button
              onClick={generateImage}
              disabled={generationStatus.status !== 'idle' || !prompt.trim()}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {generationStatus.status === 'generating' ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Generating... {generationStatus.progress}%
                </span>
              ) : 'Generate Image'}
            </button>
          </div>

          {generationStatus.imageUrl && (
            <div className="mt-8 space-y-4">
              <div className="relative">
                <img
                  src={generationStatus.imageUrl}
                  alt="Generated"
                  className="w-full rounded-lg shadow-md"
                />
                {generationStatus.status === 'upscaling' && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <Loader2 className="animate-spin text-white" size={40} />
                  </div>
                )}
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleZoom('in')}
                  disabled={generationStatus.status !== 'finished'}
                  className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ZoomIn size={20} className="mr-2" />
                  Zoom In
                </button>
                <button
                  onClick={() => handleZoom('out')}
                  disabled={generationStatus.status !== 'finished'}
                  className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ZoomOut size={20} className="mr-2" />
                  Zoom Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;