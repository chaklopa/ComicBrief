import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Eye, Download, Trash2, RefreshCw, Search, Filter } from 'lucide-react';

const HistoryDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStyle, setFilterStyle] = useState<string>('all');

  // Mock history data with cartoon-style thumbnails
  const mockHistory = [
    {
      id: 'comic-1',
      title: 'Q3 Business Report Summary',
      style: 'minimalist',
      type: 'pdf',
      panels: 5,
      createdAt: new Date('2024-01-15'),
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LXNpemU9IjQ4Ij7wn5OQPC90ZXh0Pgo8L3N2Zz4K'
    },
    {
      id: 'comic-2',
      title: 'Team Meeting Notes - Product Launch',
      style: 'western',
      type: 'text',
      panels: 4,
      createdAt: new Date('2024-01-12'),
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGM0M3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTI0MDA2IiBmb250LXNpemU9IjQ4Ij7wn46JPC90ZXh0Pgo8L3N2Zz4K'
    },
    {
      id: 'comic-3',
      title: 'Research Article: AI in Healthcare',
      style: 'manga',
      type: 'url',
      panels: 6,
      createdAt: new Date('2024-01-10'),
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkFFNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzAyNDU5IiBmb250LXNpemU9IjQ4Ij7wn4yYPC90ZXh0Pgo8L3N2Zz4K'
    },
    {
      id: 'comic-4',
      title: 'Weekly Newsletter Highlights',
      style: 'minimalist',
      type: 'text',
      panels: 4,
      createdAt: new Date('2024-01-08'),
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LXNpemU9IjQ4Ij7wn5OCPC90ZXh0Pgo8L3N2Zz4K'
    },
    {
      id: 'comic-5',
      title: 'Conference Presentation Summary',
      style: 'western',
      type: 'pdf',
      panels: 5,
      createdAt: new Date('2024-01-05'),
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGM0M3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTI0MDA2IiBmb250LXNpemU9IjQ4Ij7wn6SEPC90ZXh0Pgo8L3N2Zz4K'
    }
  ];

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStyle === 'all' || item.style === filterStyle;
    return matchesSearch && matchesFilter;
  });

  const handleView = (comic: any) => {
    navigate(`/comic/${comic.id}`, { 
      state: { 
        ...comic, 
        text: 'Sample content for history item',
        generatedAt: comic.createdAt.toISOString()
      } 
    });
  };

  const handleRegenerate = (comic: any) => {
    navigate('/generate', { 
      state: { 
        text: 'Sample content for regeneration',
        style: comic.style,
        type: comic.type
      } 
    });
  };

  const handleDelete = (comicId: string) => {
    // In a real app, this would delete from the backend
    console.log('Deleting comic:', comicId);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'minimalist': return 'bg-gray-100 text-gray-700';
      case 'manga': return 'bg-purple-100 text-purple-700';
      case 'western': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'url': return '🔗';
      case 'audio': return '🎵';
      default: return '📝';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Comic History</h1>
        <p className="text-xl text-gray-600">
          View, manage, and regenerate your previously created comic strips
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search your comics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={filterStyle}
              onChange={(e) => setFilterStyle(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors bg-white"
            >
              <option value="all">All Styles</option>
              <option value="minimalist">Minimalist</option>
              <option value="manga">Manga</option>
              <option value="western">Western</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comics Grid */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {searchTerm || filterStyle !== 'all' ? 'No comics found' : 'No comics yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStyle !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start creating your first comic strip!'
            }
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Create Your First Comic
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((comic, index) => (
            <div 
              key={comic.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={comic.thumbnail}
                  alt={comic.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStyleColor(comic.style)}`}>
                      {comic.style}
                    </span>
                    <span className="text-xs bg-black/30 px-2 py-1 rounded-full">
                      {comic.panels} panels
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1">
                    {comic.title}
                  </h3>
                  <span className="text-lg ml-2">{getTypeIcon(comic.type)}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(comic.createdAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleView(comic)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  
                  <button
                    onClick={() => handleRegenerate(comic)}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => {}}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(comic.id)}
                    className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryDashboard;