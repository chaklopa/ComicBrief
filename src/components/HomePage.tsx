import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload, Link as LinkIcon, Mic, Sparkles, Zap, BookOpen, Share2 } from 'lucide-react';
import InputForm from './InputForm';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    text: '',
    type: 'text' as 'text' | 'pdf' | 'url' | 'audio',
    style: 'minimalist' as 'minimalist' | 'manga' | 'western'
  });

  const handleGenerate = () => {
    if (inputData.text.trim()) {
      navigate('/generate', { state: inputData });
    }
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Generate comics in under 10 seconds"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Smart Extraction",
      description: "AI identifies the 5 most important points"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Multiple Styles",
      description: "Choose from minimalist, manga, or western styles"
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Easy Sharing",
      description: "Export as PNG, PDF, or share instantly"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="relative inline-block mb-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-accent-500 bg-clip-text text-transparent">
            ComicBrief
          </h1>
          <div className="absolute -top-4 -right-4">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-400 rounded-full animate-ping opacity-75"></div>
              <Sparkles className="h-8 w-8 text-accent-500 relative z-10 animate-pulse" />
            </div>
          </div>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform any text into engaging <span className="font-semibold text-primary-600">4-6 panel comic strips</span> instantly. 
          Make complex information <span className="font-semibold text-accent-600">digestible and shareable</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary-600">{feature.icon}</div>
              <span className="text-sm font-medium text-gray-700">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="max-w-4xl mx-auto animate-slide-up">
        <InputForm 
          inputData={inputData}
          setInputData={setInputData}
          onGenerate={handleGenerate}
        />
      </div>

      {/* Examples Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Perfect for...</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Meeting Notes",
              description: "Transform lengthy meeting transcripts into digestible comic summaries",
              color: "bg-blue-50 border-blue-200 text-blue-700"
            },
            {
              title: "Research Papers",
              description: "Make complex academic papers accessible with visual storytelling",
              color: "bg-purple-50 border-purple-200 text-purple-700"
            },
            {
              title: "News Articles",
              description: "Convert breaking news into shareable comic formats for social media",
              color: "bg-green-50 border-green-200 text-green-700"
            }
          ].map((example, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl border-2 ${example.color} animate-fade-in hover:scale-105 transition-transform duration-200`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="font-semibold mb-3">{example.title}</h3>
              <p className="text-sm opacity-80">{example.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;