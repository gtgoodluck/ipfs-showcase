// src/components/FileUpload.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadToPinata } from '../services/ipfsService';
import { Upload, CheckCircle, AlertCircle, FileImage, Video, Sparkles } from 'lucide-react';

const FileUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    storyContext: '',
    contentType: 'artwork',
    sloganData: {
      slogan: '',
      firstUsed: '',
      platforms: '',
      variations: ''
    }
  });
  const [copied, setCopied] = useState('');

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setUploadResult(null);

    try {
      const result = await uploadToPinata(file, metadata);
      
      if (result.success) {
        const uploadData = {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          ipfsHash: result.ipfsHash,
          ipfsUrl: result.url,
          uploadDate: new Date().toISOString(),
          metadata: metadata
        };

        // Save to local storage
        const existingUploads = JSON.parse(localStorage.getItem('ipfsUploads') || '[]');
        existingUploads.push(uploadData);
        localStorage.setItem('ipfsUploads', JSON.stringify(existingUploads));

        setUploadResult({ success: true, data: uploadData });
        
        // Reset form
        setMetadata({ 
          title: '', 
          description: '', 
          storyContext: '',
          contentType: 'artwork',
          sloganData: {
            slogan: '',
            firstUsed: '',
            platforms: '',
            variations: ''
          }
        });
        
        // Notify parent component
        if (onUploadSuccess) onUploadSuccess(uploadData);
      } else {
        setUploadResult({ success: false, error: result.error });
      }
    } catch (error) {
      setUploadResult({ success: false, error: error.message });
    }

    setUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md']
    },
    maxFiles: 1,
    disabled: uploading
  });

  const copyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Upload to IPFS
        </h2>
        <p className="text-gray-600 text-lg">
          Create permanent, verifiable records of your creative content
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Metadata Form */}
        <div className="p-10 bg-gradient-to-br from-gray-50 to-white">
          <h3 className="text-xl font-semibold text-gray-800 mb-8 flex items-center">
            <FileImage className="w-5 h-5 mr-3 text-blue-500" />
            Content Details
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Title
                </label>
                <input
                  type="text"
                  value={metadata.title}
                  onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                  className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                  placeholder="e.g., Character Portrait - Hero"
                />
              </div>

              {/* Content Type Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Content Type
                </label>
                <select
                  value={metadata.contentType}
                  onChange={(e) => setMetadata({ ...metadata, contentType: e.target.value })}
                  className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                >
                  <option value="artwork">Artwork</option>
                  <option value="video">Video Content</option>
                  <option value="slogan">Slogan/Tagline</option>
                  <option value="script">Script/Text</option>
                  <option value="design">Design File</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Description
                </label>
                <input
                  type="text"
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                  placeholder="Brief description of the content"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Conditional Slogan Fields */}
              {metadata.contentType === 'slogan' && (
                <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold text-blue-800 text-lg">Slogan Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Slogan Text</label>
                      <input
                        type="text"
                        value={metadata.sloganData.slogan}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          sloganData: { ...metadata.sloganData, slogan: e.target.value }
                        })}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your exact slogan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Used Date</label>
                      <input
                        type="date"
                        value={metadata.sloganData.firstUsed}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          sloganData: { ...metadata.sloganData, firstUsed: e.target.value }
                        })}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platforms Used</label>
                      <input
                        type="text"
                        value={metadata.sloganData.platforms}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          sloganData: { ...metadata.sloganData, platforms: e.target.value }
                        })}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="TikTok, Instagram, YouTube, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Story Context
                </label>
                <textarea
                  value={metadata.storyContext}
                  onChange={(e) => setMetadata({ ...metadata, storyContext: e.target.value })}
                  className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-lg placeholder-gray-400"
                  rows="6"
                  placeholder="How this relates to your story, characters, or creative universe..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="p-8">
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 transform ${
              isDragActive
                ? 'border-blue-400 bg-blue-50 scale-[1.02] shadow-lg'
                : uploading
                ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:scale-[1.01] hover:shadow-md'
            }`}
          >
            <input {...getInputProps()} />
            
            {uploading ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-500 animate-bounce" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Uploading to IPFS...</p>
                  <p className="text-gray-500 text-sm">Creating permanent record</p>
                </div>
                <div className="max-w-xs mx-auto">
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            ) : isDragActive ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-blue-600 font-medium text-lg">Drop your file here!</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <Upload className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium text-lg mb-2">
                    Drag & drop your content here
                  </p>
                  <p className="text-gray-500">
                    or <span className="text-blue-500 font-medium">click to browse</span>
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <FileImage className="w-4 h-4" />
                    <span>Images</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4" />
                    <span>Videos</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Supports: PNG, JPG, GIF, WebP, MP4, MOV, AVI, WebM, PDF, TXT • Max 100MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Result */}
        {uploadResult && (
          <div className="p-8 border-t border-gray-100">
            {uploadResult.success ? (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-green-800 font-semibold text-lg">Upload Successful!</h3>
                    <p className="text-green-600 text-sm">Your content is now permanently stored on IPFS</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* IPFS Hash - Full Width for Better Display */}
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600 font-medium text-sm">IPFS Hash</span>
                      <button
                        onClick={() => copyToClipboard(uploadResult.data.ipfsHash, 'hash')}
                        className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 font-medium"
                      >
                        <span className="text-sm">{copied === 'hash' ? '✓ Copied!' : '📋 Copy'}</span>
                      </button>
                    </div>
                    <code className="text-sm bg-gray-100 px-4 py-3 rounded-lg block font-mono break-all leading-relaxed">
                      {uploadResult.data.ipfsHash}
                    </code>
                  </div>

                  {/* Access URL - Full Width */}
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600 font-medium text-sm">Access URL</span>
                      <div className="flex items-center space-x-2">
                        <a 
                          href={uploadResult.data.ipfsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 font-medium transition-colors px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100"
                        >
                          🔗 View File
                        </a>
                        <button
                          onClick={() => copyToClipboard(uploadResult.data.ipfsUrl, 'url')}
                          className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 font-medium"
                        >
                          <span className="text-sm">{copied === 'url' ? '✓ Copied!' : '📋 Copy'}</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 break-all bg-gray-50 px-4 py-3 rounded-lg">
                      {uploadResult.data.ipfsUrl}
                    </div>
                  </div>

                  {/* File Details */}
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="text-gray-600 font-medium text-sm mb-3">File Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-500">Name:</span>
                          <div className="text-gray-800 font-medium break-all">{uploadResult.data.fileName}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <div className="text-gray-800">{(uploadResult.data.fileSize / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <div className="text-gray-800">{uploadResult.data.fileType}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Uploaded:</span>
                          <div className="text-gray-800">{new Date(uploadResult.data.uploadDate).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-red-800 font-semibold">Upload Failed</h3>
                    <p className="text-red-600 text-sm mt-1">{uploadResult.error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;