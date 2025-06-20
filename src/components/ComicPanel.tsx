import React from 'react';

interface Panel {
  id: number;
  scene: string;
  character: string;
  dialogue: string;
  imageUrl: string;
}

interface ComicPanelProps {
  panel: Panel;
  index: number;
  style: 'minimalist' | 'manga' | 'western';
}

const ComicPanel: React.FC<ComicPanelProps> = ({ panel, index, style }) => {
  const styleClasses = {
    minimalist: 'border-2 border-gray-800 bg-white',
    manga: 'border-4 border-black bg-gradient-to-b from-white to-gray-50',
    western: 'border-4 border-red-600 bg-gradient-to-b from-yellow-50 to-orange-50'
  };

  const bubbleStyles = {
    minimalist: 'bg-white border-2 border-gray-400 text-gray-800',
    manga: 'bg-white border-2 border-black text-black rounded-2xl',
    western: 'bg-yellow-100 border-3 border-red-600 text-black'
  };

  // Create cartoon-style placeholder based on scene description
  const createCartoonPlaceholder = (scene: string, panelStyle: string) => {
    const colors = {
      minimalist: 'from-gray-100 to-gray-200',
      manga: 'from-purple-100 to-pink-100',
      western: 'from-yellow-100 to-orange-200'
    };

    const icons = {
      business: '👔',
      chart: '📊',
      celebration: '🎉',
      meeting: '💼',
      handshake: '🤝',
      discussion: '💬',
      graph: '📈',
      team: '👥'
    };

    // Determine icon based on scene content
    let sceneIcon = '💼'; // default
    if (scene.includes('chart') || scene.includes('graph')) sceneIcon = icons.chart;
    if (scene.includes('celebrat')) sceneIcon = icons.celebration;
    if (scene.includes('handshake')) sceneIcon = icons.handshake;
    if (scene.includes('discussion') || scene.includes('meeting')) sceneIcon = icons.discussion;
    if (scene.includes('team') || scene.includes('group')) sceneIcon = icons.team;

    return (
      <div className={`w-full h-full bg-gradient-to-br ${colors[panelStyle]} flex items-center justify-center relative overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>
        
        {/* Main scene icon */}
        <div className="text-6xl mb-4 animate-pulse">{sceneIcon}</div>
        
        {/* Style-specific decorative elements */}
        {panelStyle === 'western' && (
          <>
            <div className="absolute top-2 left-2 text-2xl animate-bounce">⭐</div>
            <div className="absolute bottom-2 right-2 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>💥</div>
          </>
        )}
        {panelStyle === 'manga' && (
          <>
            <div className="absolute top-3 right-3 text-xl opacity-60">🌸</div>
            <div className="absolute bottom-3 left-3 text-xl opacity-60">✨</div>
          </>
        )}
        {panelStyle === 'minimalist' && (
          <div className="absolute inset-0 border-2 border-dashed border-gray-300 m-4 rounded-lg opacity-30"></div>
        )}
        
        {/* Scene description overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 opacity-0 hover:opacity-100 transition-opacity">
          {scene}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-bounce-in ${styleClasses[style]}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Panel Number */}
      <div className="absolute top-2 left-2 z-20">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          style === 'minimalist' ? 'bg-gray-800 text-white' :
          style === 'manga' ? 'bg-black text-white' :
          'bg-red-600 text-white'
        }`}>
          {index + 1}
        </div>
      </div>

      {/* Cartoon Illustration */}
      <div className="relative h-48 overflow-hidden">
        {createCartoonPlaceholder(panel.scene, style)}
      </div>

      {/* Speech Bubble */}
      <div className="p-4">
        <div className={`relative p-3 rounded-lg max-w-full ${bubbleStyles[style]} shadow-md`}>
          {/* Speech bubble tail */}
          <div className={`absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent ${
            style === 'minimalist' ? 'border-b-gray-400' :
            style === 'manga' ? 'border-b-black' :
            'border-b-red-600'
          }`}></div>
          
          {/* Character name */}
          {style !== 'minimalist' && (
            <div className={`text-xs font-bold mb-1 ${
              style === 'manga' ? 'text-purple-600' : 'text-red-700'
            }`}>
              {panel.character}:
            </div>
          )}
          
          {/* Dialogue */}
          <p className={`text-sm leading-relaxed ${
            style === 'western' ? 'font-comic' : 'font-medium'
          }`}>
            {panel.dialogue}
          </p>
        </div>
      </div>

      {/* Style-specific decorative elements */}
      {style === 'western' && (
        <div className="absolute top-3 right-3">
          <div className="text-2xl animate-pulse">💥</div>
        </div>
      )}
      {style === 'manga' && (
        <div className="absolute bottom-3 right-3 opacity-20">
          <div className="text-4xl">🌸</div>
        </div>
      )}
    </div>
  );
};

export default ComicPanel;