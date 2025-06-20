import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, Zap } from 'lucide-react';

const ComicGenerator: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Analyzing text...');
  const inputData = location.state;

  const steps = [
    { label: 'Analyzing text...', duration: 1500 },
    { label: 'Extracting key points...', duration: 2000 },
    { label: 'Creating comic script...', duration: 1500 },
    { label: 'Generating illustrations...', duration: 3000 },
    { label: 'Adding speech bubbles...', duration: 1000 },
    { label: 'Finalizing comic strip...', duration: 500 },
  ];

  useEffect(() => {
    if (!inputData) {
      navigate('/');
      return;
    }

    let stepIndex = 0;
    let progressValue = 0;
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let elapsedTime = 0;

    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        elapsedTime += 100;
        progressValue = (elapsedTime / totalDuration) * 100;
        setProgress(Math.min(progressValue, 100));

        if (elapsedTime >= steps.slice(0, stepIndex + 1).reduce((sum, step) => sum + step.duration, 0)) {
          stepIndex++;
          if (stepIndex < steps.length) {
            setCurrentStep(steps[stepIndex].label);
          }
        }
      } else {
        clearInterval(interval);
        // Generate mock comic ID and navigate
        const comicId = Math.random().toString(36).substr(2, 9);
        setTimeout(() => {
          navigate(`/comic/${comicId}`, { 
            state: { 
              ...inputData, 
              generatedAt: new Date().toISOString(),
              id: comicId
            } 
          });
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [inputData, navigate]);

  if (!inputData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20"></div>
          <Zap className="h-16 w-16 text-primary-600 relative z-10" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Creating Your Comic Strip</h1>
        <p className="text-xl text-gray-600">Transforming your content into an engaging visual story...</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Loader2 className="h-6 w-6 text-primary-600 animate-spin" />
            <span className="text-lg font-semibold text-gray-800">{currentStep}</span>
          </div>
        </div>

        {/* Step Progress */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const isCompleted = progress > (index / steps.length) * 100;
            const isCurrent = currentStep === step.label;
            
            return (
              <div 
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isCompleted 
                    ? 'border-green-200 bg-green-50' 
                    : isCurrent
                    ? 'border-primary-200 bg-primary-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-primary-600 animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                  )}
                  <span className={`text-sm font-medium ${
                    isCompleted ? 'text-green-700' : isCurrent ? 'text-primary-700' : 'text-gray-500'
                  }`}>
                    {step.label.replace('...', '')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Generating comic for:</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="px-2 py-1 bg-white rounded-md font-medium">
              {inputData.type.toUpperCase()}
            </span>
            <span className="px-2 py-1 bg-white rounded-md font-medium">
              {inputData.style} style
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicGenerator;