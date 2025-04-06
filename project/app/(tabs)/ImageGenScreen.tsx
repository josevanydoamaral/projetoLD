import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Loader as Loader2, ZoomIn, ZoomOut } from 'lucide-react-native';

interface GenerationStatus {
  status: 'idle' | 'generating' | 'upscaling' | 'finished';
  progress: number;
  imageUrl?: string;
  resourceId?: string;
  jobId?: string;
}

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>({
    status: 'idle',
    progress: 0
  });

  const generateImage = async () => {
    try {
      setGenerationStatus({ status: 'generating', progress: 0 });
      
      const generateResponse = await fetch('http://127.0.0.1:8080/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text_prompt: prompt })
      });
      
      const { job_id } = await generateResponse.json();
      
      const checkStatus = async () => {
        const statusResponse = await fetch(`http://127.0.0.1:8080/api/status/${job_id}`);
        const statusData = await statusResponse.json();
        
        if (statusData.status === 'finished') {
          const resultResponse = await fetch(`http://127.0.0.1:8080/api/result/${job_id}`);
          const resultData = await resultResponse.json();
          
          setGenerationStatus({
            status: 'finished',
            progress: 100,
            resourceId: resultData.resource_id,
            imageUrl: resultData.image_url,
            jobId: job_id
          });
        } else {
          setGenerationStatus(prev => ({
            ...prev,
            progress: statusData.progress || prev.progress,
            imageUrl: statusData.image_url || prev.imageUrl
          }));
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
    if (!generationStatus.resourceId) {
      console.log('No resource ID available');
      return;
    } 
    
    try {
      const currentImageUrl = generationStatus.imageUrl;
      
      setGenerationStatus(prev => ({ 
        ...prev, 
        status: 'upscaling',
        imageUrl: currentImageUrl 
      }));
      
      const response = await fetch(`http://127.0.0.1:8080/api/image/zoom/${direction}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource_id: generationStatus.resourceId })
      });
      
      const { job_id } = await response.json();
      
      const checkZoomStatus = async () => {
        const statusResponse = await fetch(`http://127.0.0.1:8080/api/status/${job_id}`);
        const statusData = await statusResponse.json();
        
        
        if (statusData.status === 'finished') {
          console.log(statusData);
          const resultResponse = await fetch(`http://127.0.0.1:8080/api/result/${job_id}`);
          const resultData = await resultResponse.json();
          console.log()
          console.log(resultData);
          
          setGenerationStatus(prev => ({
            ...prev,
            status: 'finished',
            resourceId: resultData.resource_id,
            imageUrl: statusData.image_url,
            jobId: job_id
          }));
        } else {
          console.log(statusData);
          setGenerationStatus(prev => ({
            ...prev,
            imageUrl: statusData.image_url,
            progress: statusData.progress || prev.progress
          }));
          setTimeout(checkZoomStatus, 1000);
        }
      };
      
      checkZoomStatus();
    } catch (error) {
      console.error('Error zooming image:', error);
      setGenerationStatus(prev => ({ 
        ...prev, 
        status: 'finished'
      }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>AI Image Generator</Text>
          <Text style={styles.subtitle}>Create amazing images with AI</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Describe the image you want to create..."
              style={styles.input}
              multiline
              numberOfLines={4}
            />
            
            <TouchableOpacity
              onPress={generateImage}
              disabled={generationStatus.status === 'generating' || generationStatus.status === 'upscaling' || !prompt.trim()}
              style={[
                styles.generateButton,
                (generationStatus.status === 'generating' || generationStatus.status === 'upscaling' || !prompt.trim()) && styles.generateButtonDisabled
              ]}
            >
              {generationStatus.status === 'generating' ? (
                <View style={styles.loadingContainer}>
                  <Loader2 style={[styles.loadingIcon, { transform: [{ rotate: '360deg' }] }]} size={20} color="#fff" />
                  <Text style={styles.buttonText}>
                    Generating... {generationStatus.progress}%
                  </Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Generate Image</Text>
              )}
            </TouchableOpacity>
          </View>

          {generationStatus.imageUrl && (
            <View style={styles.imageContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: generationStatus.imageUrl }}
                  style={styles.generatedImage}
                  resizeMode="contain"
                  onError={(e) => console.error('Image loading error:', e.nativeEvent.error)}
                />
                {generationStatus.status === 'upscaling' && (
                  <View style={styles.upscalingOverlay}>
                    <Loader2 size={40} color="#fff" style={{ transform: [{ rotate: '360deg' }] }} />
                    <Text style={styles.upscalingText}>Zooming... {generationStatus.progress}%</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.zoomButtonsContainer}>
                <TouchableOpacity
                  onPress={() => handleZoom('in')}
                  disabled={generationStatus.status !== 'finished'}
                  style={[
                    styles.zoomButton,
                    generationStatus.status !== 'finished' && styles.zoomButtonDisabled
                  ]}
                >
                  <ZoomIn size={20} color="#000" />
                  <Text style={styles.zoomButtonText}>Zoom In</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleZoom('out')}
                  disabled={generationStatus.status !== 'finished'}
                  style={[
                    styles.zoomButton,
                    generationStatus.status !== 'finished' && styles.zoomButtonDisabled
                  ]}
                >
                  <ZoomOut size={20} color="#000" />
                  <Text style={styles.zoomButtonText}>Zoom Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 20,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  generateButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    marginTop: 32,
    gap: 16,
  },
  imageWrapper: {
    position: 'relative',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  generatedImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  upscalingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upscalingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  zoomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  zoomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  zoomButtonDisabled: {
    opacity: 0.5,
  },
  zoomButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000000',
  },
});