import React, { useRef } from 'react';
import { FileText, Upload, Link as LinkIcon, Mic, Palette } from 'lucide-react';

interface InputFormProps {
  inputData: {
    text: string;
    type: 'text' | 'pdf' | 'url' | 'audio';
    style: 'minimalist' | 'manga' | 'western';
  };
  setInputData: React.Dispatch<React.SetStateAction<{
    text: string;
    type: 'text' | 'pdf' | 'url' | 'audio';
    style: 'minimalist' | 'manga' | 'western';
  }>>;
  onGenerate: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ inputData, setInputData, onGenerate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputTypes = [
    { type: 'text' as const, icon: <FileText className="h-5 w-5" />, label: 'Paste Text' },
    { type: 'pdf' as const, icon: <Upload className="h-5 w-5" />, label: 'Upload PDF' },
    { type: 'url' as const, icon: <LinkIcon className="h-5 w-5" />, label: 'Enter URL' },
    { type: 'audio' as const, icon: <Mic className="h-5 w-5" />, label: 'Audio Clip' },
  ];

  const artStyles = [
    { 
      value: 'minimalist' as const, 
      label: 'Minimalist', 
      description: 'Clean line art with simple shapes',
      preview: '🎨'
    },
    { 
      value: 'manga' as const, 
      label: 'Manga', 
      description: 'Japanese comic book style',
      preview: '🌸'
    },
    { 
      value: 'western' as const, 
      label: 'Western', 
      description: 'Classic American comic style',
      preview: '💥'
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock file processing - in a real app, this would extract text from PDF
      setInputData(prev => ({
        ...prev,
        text: `[PDF Content from: ${file.name}]\n\nThis is mock content representing the extracted text from your PDF file. In the actual implementation, this would contain the real extracted text content.`
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Input Type Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary-600" />
            Choose Input Method
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {inputTypes.map((type) => (
              <button
                key={type.type}
                type="button"
                onClick={() => {
                  setInputData(prev => ({ ...prev, type: type.type }));
                  if (type.type === 'pdf') {
                    fileInputRef.current?.click();
                  }
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  inputData.type === type.type
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300 text-gray-600'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {type.icon}
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
              </button>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Text Input Area */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            {inputData.type === 'url' ? 'Enter URL' : 
             inputData.type === 'audio' ? 'Upload Audio File' :
             inputData.type === 'pdf' ? 'PDF Content' : 'Your Content'}
          </label>
          {inputData.type === 'text' && (
            <textarea
              value={inputData.text}
              onChange={(e) => setInputData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Paste your article, meeting notes, research paper, or any text you want to transform into a comic strip..."
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-0 resize-none transition-colors"
              required
            />
          )}
          {inputData.type === 'url' && (
            <input
              type="url"
              value={inputData.text}
              onChange={(e) => setInputData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="https://example.com/article"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-0 transition-colors"
              required
            />
          )}
          {inputData.type === 'pdf' && (
            <div className="w-full h-40 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center">
              {inputData.text ? (
                <div className="text-center">
                  <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">PDF content loaded successfully!</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click "Upload PDF" above to select a file</p>
                </div>
              )}
            </div>
          )}
          {inputData.type === 'audio' && (
            <div className="w-full h-40 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <Mic className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Audio transcription coming soon!</p>
              </div>
            </div>
          )}
        </div>

        {/* Art Style Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Palette className="h-5 w-5 mr-2 text-primary-600" />
            Choose Art Style
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {artStyles.map((style) => (
              <button
                key={style.value}
                type="button"
                onClick={() => setInputData(prev => ({ ...prev, style: style.value }))}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 text-left ${
                  inputData.style === style.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{style.preview}</span>
                  <div>
                    <h4 className={`font-semibold ${
                      inputData.style === style.value ? 'text-primary-700' : 'text-gray-800'
                    }`}>
                      {style.label}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!inputData.text.trim()}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <span>✨ Generate Comic Strip</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;