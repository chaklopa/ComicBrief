import React, { useState } from 'react';
import { X, Download, FileImage, FileText, Link as LinkIcon, CheckCircle } from 'lucide-react';

interface Panel {
  id: number;
  scene: string;
  character: string;
  dialogue: string;
  imageUrl: string;
}

interface ExportOptionsProps {
  panels: Panel[];
  comicData: any;
  onClose: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ panels, comicData, onClose }) => {
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | 'link'>('png');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const exportOptions = [
    {
      format: 'png' as const,
      icon: <FileImage className="h-5 w-5" />,
      title: 'PNG Image',
      description: 'High-quality image file perfect for social media',
      size: '~2MB'
    },
    {
      format: 'pdf' as const,
      icon: <FileText className="h-5 w-5" />,
      title: 'PDF Document',
      description: 'Professional document format for presentations',
      size: '~1.5MB'
    },
    {
      format: 'link' as const,
      icon: <LinkIcon className="h-5 w-5" />,
      title: 'Shareable Link',
      description: 'Generate a link to share your comic online',
      size: 'No download'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (exportFormat === 'link') {
      const shareUrl = `${window.location.origin}/comic/${comicData.id}`;
      await navigator.clipboard.writeText(shareUrl);
    } else {
      // In a real app, this would generate and download the actual file
      const link = document.createElement('a');
      link.href = '#';
      link.download = `comic-brief-${comicData.id}.${exportFormat}`;
      link.click();
    }
    
    setIsExporting(false);
    setExportComplete(true);
    
    setTimeout(() => {
      setExportComplete(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Export Your Comic</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Export Format Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Export Format</h3>
            <div className="space-y-3">
              {exportOptions.map((option) => (
                <button
                  key={option.format}
                  onClick={() => setExportFormat(option.format)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${
                    exportFormat === option.format
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      exportFormat === option.format ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        exportFormat === option.format ? 'text-primary-700' : 'text-gray-800'
                      }`}>
                        {option.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      <span className="text-xs text-gray-500 mt-2 inline-block">{option.size}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Comic Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {panels.slice(0, 6).map((panel, index) => (
                  <div key={panel.id} className="aspect-square bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <img
                      src={panel.imageUrl}
                      alt={`Panel ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-3 text-sm text-gray-600">
                {panels.length} panels • {comicData.style} style
              </div>
            </div>
          </div>

          {/* Export Settings */}
          {exportFormat !== 'link' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Quality</span>
                  <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                    <option>High (Recommended)</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Layout</span>
                  <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                    <option>Grid Layout</option>
                    <option>Strip Layout</option>
                    <option>Single Page</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Export Button */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || exportComplete}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-all duration-200 flex items-center space-x-2 min-w-[140px] justify-center"
            >
              {exportComplete ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Exported!</span>
                </>
              ) : isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  <span>
                    {exportFormat === 'link' ? 'Copy Link' : `Export ${exportFormat.toUpperCase()}`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;