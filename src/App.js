// src/App.js (SHOWCASE VERSION)
import React, { useState, useEffect } from 'react';
import { Clock, Hash, ExternalLink, Database, FileText, Star, Shield, Zap } from 'lucide-react';
import './App.css';

function App() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    // Load existing uploads from localStorage for demo
    const existingUploads = JSON.parse(localStorage.getItem('ipfsUploads') || '[]');
    setUploads(existingUploads);
  }, []);

  const getFileTypeIcon = (fileType) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    return '📄';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateUsageStats = () => {
    const totalSize = uploads.reduce((sum, upload) => sum + upload.fileSize, 0);
    const totalSizeMB = totalSize / (1024 * 1024);
    const freeTierLimitMB = 1024; // 1GB free tier
    const usagePercentage = (totalSizeMB / freeTierLimitMB) * 100;
    const remainingMB = freeTierLimitMB - totalSizeMB;
    
    return {
      totalSizeMB: totalSizeMB.toFixed(2),
      remainingMB: remainingMB.toFixed(2),
      usagePercentage: Math.min(usagePercentage, 100).toFixed(1),
      isNearLimit: usagePercentage > 80,
      freeTierLimitMB
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Showcase Banner */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 text-center font-medium">
          🎨 This is a real creator's 100% human-created protected library • Art, Music & Creative Content • 
          <a href="#waitlist" className="ml-2 underline font-bold hover:text-yellow-200">
            Get early access →
          </a>
        </div>

        {/* Library Clarification */}
        <div className="bg-white/10 backdrop-blur-sm p-3 text-center text-white/90 text-sm border-b border-white/10">
          ℹ️ This library contains 100% human-created work - Art, Music, Writing & More
        </div>

        {/* Header */}
        <header className="text-center pt-16 pb-8 px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl mb-8 shadow-xl border border-white/20">
            <Database className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Protect Your Human-Created Work
          </h1>
          
          {/* Value Proposition */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-6 mx-auto max-w-4xl mb-8 border border-white/10">
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-4">
              For real artists, by real artists. Protect your authentic creativity in a world of AI content.
            </p>
            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-yellow-100">
                <span className="text-2xl">🖌️</span>
                <span className="font-semibold">100% Human-Created Content Only</span>
              </div>
            
            {/* 3D Gallery Teaser */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mt-8 border border-white/20">
              <p className="text-center text-white/90 text-lg font-medium">
                🏛️ Coming Soon: Experience your protected art in immersive 3D galleries
              </p>
            </div>
              <p className="text-yellow-200 text-sm text-center mt-2">
                Join a community that values authentic human artistry
              </p>
            </div>
            <p className="text-white/70 text-sm text-center italic max-w-3xl mx-auto">
              "I use AI for social media reach, but protect my pure artistry here. This is where authentic creativity lives." - KC Touch
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <Shield className="w-8 h-8 text-green-300 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Authentic Protection</h3>
                <p className="text-white/80 text-sm">Permanent timestamps for real human creativity</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Monetization Ready</h3>
                <p className="text-white/80 text-sm">Prepared for when your content goes viral</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Future-Proof Protection</h3>
                <p className="text-white/80 text-sm">Ready for digital ownership platforms</p>
              </div>
            </div>
            
            {/* Additional Benefits Row */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="text-center">
                <div className="w-8 h-8 text-blue-300 mx-auto mb-2 text-2xl">💎</div>
                <h3 className="text-white font-semibold">Investment in Your Art</h3>
                <p className="text-white/80 text-sm">Build value as digital art markets grow</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 text-pink-300 mx-auto mb-2 text-2xl">🎨</div>
                <h3 className="text-white font-semibold">Artist Community</h3>
                <p className="text-white/80 text-sm">Join creators who value human artistry</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-white/90 flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-yellow-300">🎨</span>
              <span className="font-medium">Visual Art</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-blue-300">🎵</span>
              <span className="font-medium">Music & Audio</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-green-300">📝</span>
              <span className="font-medium">Writing & Lyrics</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-purple-300" />
              <span className="font-medium">Instant Timestamps</span>
            </div>
          </div>
        </header>

        {/* Real Creator Library */}
        {uploads.length > 0 && (
          <div className="container mx-auto px-4 mt-16 pb-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Real Creator's Protected Library
                </h3>
                <p className="text-white/80 text-lg">
                  {uploads.length} pieces of authentic human creativity - Art, Music, Writing & More
                </p>
              </div>

              {/* Usage Dashboard */}
              {(() => {
                const stats = calculateUsageStats();
                return (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Usage Progress */}
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold">Storage Usage Example</h4>
                          <span className="text-white/80 text-sm">
                            {stats.totalSizeMB} MB protected
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500 bg-green-400"
                            style={{ width: `${stats.usagePercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-white/70 text-sm mt-2">
                          <span>Active creator library</span>
                          <span>Growing collection</span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-xl p-4">
                          <div className="text-white/80 text-sm">Protected Assets</div>
                          <div className="text-white text-xl font-bold">{uploads.length}</div>
                        </div>
                        
                        <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
                          <div className="text-green-100 text-sm font-medium">
                            ✅ Fully Protected
                          </div>
                          <div className="text-green-200 text-xs mt-1">
                            Legal-grade timestamps
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploads.map((upload, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Card Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <span className="text-2xl flex-shrink-0">{getFileTypeIcon(upload.fileType)}</span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 leading-tight break-words">
                              {upload.metadata.title || upload.fileName}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatFileSize(upload.fileSize)}
                            </p>
                            <div className="flex items-center mt-2 space-x-3">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-xs text-green-600 font-medium">Protected</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs text-blue-600 font-medium">🖌️ Human-Created</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a 
                          href={upload.ipfsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full text-blue-500 hover:bg-blue-100 transition-colors flex-shrink-0 ml-3"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      {upload.metadata.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {upload.metadata.description}
                        </p>
                      )}
                      
                      {upload.metadata.storyContext && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="w-3 h-3 text-gray-400" />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Story Context</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {upload.metadata.storyContext}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 bg-gray-50">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Hash className="w-3 h-3" />
                          <span className="font-mono break-all">
                            {upload.ipfsHash}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(upload.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="text-center">
                          <span className="inline-flex items-center px-3 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-lg">
                            ✓ Ownership Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div id="waitlist" className="text-center mt-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Ready to Protect Your Human Artistry?
                  </h3>
                  <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                    Help us build the perfect tool for authentic creators. Share your feedback and get early access.
                  </p>
                  
                  <div className="max-w-md mx-auto mb-6">
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdDpTLiDwly74MIAfn0CyDMKMcFwozUtJto9jAlmtX_NSqbIg/viewform?usp=header"  
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-center text-lg"
                    >
                      📝 Share Feedback & Join Waitlist
                    </a>
                    <p className="text-white/60 text-sm mt-3 text-center">
                      Takes 2 minutes • Help shape the platform
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-white/80 text-sm">
                    <div>✅ Musicians, artists & writers welcome</div>
                    <div>✅ No AI-generated content</div>
                    <div>✅ Join creators who value the distinction between tools and creativity</div>
                    <div>✅ Support authentic human talent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 text-white/60">
          <p>© 2025 Authentic Artist Protection Platform • Celebrating human creativity</p>
        </footer>
      </div>
    </div>
  );
}

export default App;