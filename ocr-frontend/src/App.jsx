import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ImagePreview from './components/ImagePreview';
import OcrOutput from './components/OcrOutput';
import './index.css';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (file) => {
    setUploadedImage(file);
    setExtractedText('');
    setProgress(0);
  };

  const handleProcessImage = async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    
    // Simulate processing progress
    for (let i = 0; i <= 100; i += 20) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // TODO: Replace with your actual OCR API call
    setExtractedText('Sample extracted text will appear here after processing your image.');
    setIsProcessing(false);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setExtractedText('');
    setProgress(0);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📸</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-600">ImageText Pro</h1>
                <p className="text-sm text-gray-600">Extract text from images ✨</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FileUpload onImageUpload={handleImageUpload} />
            {uploadedImage && (
              <ImagePreview 
                image={uploadedImage}
                onProcess={handleProcessImage}
                onReset={handleReset}
                isProcessing={isProcessing}
                progress={progress}
              />
            )}
          </div>
          <OcrOutput text={extractedText} isProcessing={isProcessing} />
        </div>
      </main>
    </div>
  );
}

export default App;