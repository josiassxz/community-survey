import React from 'react';

const ImprovedProgressBar = () => {
  // Esta é apenas uma demonstração, então vamos definir valores fixos
  const currentQuestion = 3;
  const questionKeys = [1, 2, 3, 4, 5, 6, 7];
  
  const progress = currentQuestion === 0 ? 0 : Math.round(((currentQuestion) / (questionKeys.length - 1)) * 100);
  
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span>0%</span>
        <span>{progress}%</span>
        <span>100%</span>
      </div>
      
      <div className="progress-bar-container w-full h-6 bg-gray-200 rounded-md border border-gray-300 overflow-hidden relative">
        {/* Marcadores de progresso (linhas verticais) */}
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between px-0">
          {questionKeys.map((_, index) => (
            <div 
              key={index}
              className="w-px h-full bg-gray-400"
              style={{opacity: index === 0 || index === questionKeys.length - 1 ? 0 : 0.5}}
            />
          ))}
        </div>
        
        {/* Barra de progresso real */}
        <div 
          className="h-full bg-red-600 rounded-l-md flex items-center justify-end pr-1"
          style={{
            width: `${progress}%`,
            transition: 'width 0.5s ease'
          }}
        >
          {progress > 10 && (
            <span className="text-white text-xs font-bold">{progress}%</span>
          )}
        </div>
        

        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gray-800 rounded-l-md" />
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-gray-800 rounded-r-md" />
      </div>
      
      <div className="flex justify-between text-xs font-medium mt-1">
        <span>Início</span>
        <span>Fim</span>
      </div>
    </div>
  );
};

export default ImprovedProgressBar;