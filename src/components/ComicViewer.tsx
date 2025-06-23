import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Download, Share2, RefreshCw, ArrowLeft, Copy, Facebook, Twitter } from 'lucide-react';
import ComicPanel from './ComicPanel';
import ExportOptions from './ExportOptions';

const ComicViewer: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const comicData = location.state || {
    text: 'Sample content',
    style: 'minimalist',
    type: 'text',
    generatedAt: new Date().toISOString(),
    id: id
  };

  // Enhanced mock comic panels with GPT-style conversational content
  const mockPanels = [
    {
      id: 1,
      scene: "AI analysis of business data with charts and graphs",
      character: "ComicBrief AI",
      dialogue: "Based on your Q3 report, I can see that revenue increased by 15% compared to last quarter. This growth is primarily driven by strong performance in your core product lines and improved customer retention rates.",
      imageUrl: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      userQuestion: "Can you analyze this Q3 business report for me?",
      aiResponse: "Based on your Q3 report, I can see that revenue increased by 15% compared to last quarter. This growth is primarily driven by strong performance in your core product lines and improved customer retention rates."
    },
    {
      id: 2,
      scene: "Team celebration and success metrics visualization",
      character: "ComicBrief AI",
      dialogue: "The key success factor here is your new product launch strategy. It's contributing significantly to customer acquisition, with a 23% increase in new user signups and improved market penetration in target demographics.",
      imageUrl: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400",
      userQuestion: "What's driving this growth?",
      aiResponse: "The key success factor here is your new product launch strategy. It's contributing significantly to customer acquisition, with a 23% increase in new user signups and improved market penetration in target demographics."
    },
    {
      id: 3,
      scene: "Financial analysis showing cost concerns and budget review",
      character: "ComicBrief AI",
      dialogue: "However, there's an important challenge to address: operational costs have risen by 8% this quarter. This is mainly due to increased marketing spend and supply chain adjustments, which need strategic optimization.",
      imageUrl: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
      userQuestion: "Are there any concerns I should know about?",
      aiResponse: "However, there's an important challenge to address: operational costs have risen by 8% this quarter. This is mainly due to increased marketing spend and supply chain adjustments, which need strategic optimization."
    },
    {
      id: 4,
      scene: "Strategic planning session with action items and solutions",
      character: "ComicBrief AI",
      dialogue: "The recommended action plan includes three key initiatives: optimizing your supply chain partnerships, renegotiating vendor contracts for better terms, and implementing cost-effective digital marketing strategies to maintain growth momentum.",
      imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
      userQuestion: "What should we do to address these issues?",
      aiResponse: "The recommended action plan includes three key initiatives: optimizing your supply chain partnerships, renegotiating vendor contracts for better terms, and implementing cost-effective digital marketing strategies to maintain growth momentum."
    },
    {
      id: 5,
      scene: "Future outlook with positive projections and team alignment",
      character: "ComicBrief AI",
      dialogue: "With these strategic improvements in place, the projections look very promising. I estimate a potential 20% growth trajectory for Q4, positioning your company for strong year-end performance and sustainable expansion.",
      imageUrl: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400",
      userQuestion: "What's the outlook for next quarter?",
      aiResponse: "With these strategic improvements in place, the projections look very promising. I estimate a potential 20% growth trajectory for Q4, positioning your company for strong year-end performance and sustainable expansion."
    }
  ];

  const handleShare = async (platform: string) => {
    const shareUrl = `${window.location.origin}/comic/${id}`;
    const shareText = "Check out this comic strip created with ComicBrief!";
    
    switch (platform) {
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage('Link copied to clipboard!');
        setTimeout(() => setShareMessage(''), 3000);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
    }
  };

  const handleRegenerate = () => {
    navigate('/generate', { state: comicData });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRegenerate}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Regenerate</span>
          </button>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Comic Title and Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your AI Comic Brief</h1>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            {comicData.style} style
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            {mockPanels.length} panels
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            Generated {new Date(comicData.generatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🤖</span>
            <span className="font-semibold text-blue-800">AI-Generated Conversation</span>
          </div>
          <p className="text-sm text-blue-700">
            Your content has been transformed into an interactive dialogue between you and ComicBrief AI, 
            making complex information easy to understand through conversational comic panels.
          </p>
        </div>
      </div>

      {/* Comic Panels */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockPanels.map((panel, index) => (
          <ComicPanel
            key={panel.id}
            panel={panel}
            index={index}
            style={comicData.style}
            inputType={comicData.type}
            isConversational={true}
          />
        ))}
      </div>

      {/* Share Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Share2 className="h-5 w-5 mr-2" />
          Share Your AI Comic Brief
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleShare('copy')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Link</span>
          </button>
          
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </button>
          
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </button>
          
          {shareMessage && (
            <span className="text-green-600 font-medium animate-fade-in">
              {shareMessage}
            </span>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportOptions
          panels={mockPanels}
          comicData={comicData}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default ComicViewer;