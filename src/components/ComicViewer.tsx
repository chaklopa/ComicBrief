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

  // Mock comic panels data with cartoon-style illustrations
  const mockPanels = [
    {
      id: 1,
      scene: "A businessman looking at charts and graphs on a computer screen",
      character: "Business Analyst",
      dialogue: "Our Q3 results show a 15% increase in revenue compared to last quarter.",
      imageUrl: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      scene: "Team members celebrating around a conference table",
      character: "Team Lead",
      dialogue: "This growth is driven by our new product launch and improved customer retention!",
      imageUrl: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      scene: "Person pointing to a declining graph with concern",
      character: "Financial Advisor",
      dialogue: "However, we need to address the 8% increase in operational costs this quarter.",
      imageUrl: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      scene: "Group discussion with people taking notes",
      character: "Project Manager",
      dialogue: "Our action plan includes optimizing supply chain and renegotiating vendor contracts.",
      imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      scene: "Handshake between two people with positive expressions",
      character: "CEO",
      dialogue: "With these improvements, we're projecting 20% growth for Q4. Great work, team!",
      imageUrl: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400"
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Comic Strip</h1>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
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
      </div>

      {/* Comic Panels */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockPanels.map((panel, index) => (
          <ComicPanel
            key={panel.id}
            panel={panel}
            index={index}
            style={comicData.style}
          />
        ))}
      </div>

      {/* Share Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Share2 className="h-5 w-5 mr-2" />
          Share Your Comic
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