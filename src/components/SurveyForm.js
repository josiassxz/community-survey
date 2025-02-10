import React, { useState } from 'react';
import FloatingIcons from './FloatingIcons';
import './Survey.css';

const SurveyForm = () => {
  const questions = [
    "Me interesso por descobertas científicas e avanços tecnológicos.",
    "Gosto de ajudar pessoas e fazer a diferença na vida delas.",
    "Tenho facilidade com números e resolução de problemas.",
    "Me identifico com atividades criativas e artísticas.",
    "Gosto de entender como funcionam as leis e a justiça."
  ];

  const [responses, setResponses] = useState({});

  const handleResponse = (questionIndex, value) => {
    setResponses({ ...responses, [questionIndex]: value });
  };

  return (
    <nav role="navigation" tabIndex={0} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <FloatingIcons />
      <div className="container">
        <header className="header">
          <h1 className="title">Teste Vocacional</h1>
          <div className="subtitle">Questões 1-5 de 25</div>
        </header>

        <form className="survey-form">
          {questions.map((question, index) => (
            <div key={index} className={`question-card question-${index + 1}`}>
              <p className="question-text">{question}</p>
              <div className="options-container">
                {['Discordo Totalmente', 'Discordo', 'Neutro', 'Concordo', 'Concordo Totalmente'].map((option, optIndex) => (
                  <div key={optIndex} className="option">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optIndex}
                      onChange={() => handleResponse(index, optIndex)}
                      className="radio-input"
                    />
                    <label className="radio-label">{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="footer">
            <div className="progress">20%</div>
            <button type="submit" className="continue-btn">
              Continuar
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            width: 95%;
            padding: 10px;
          }
          .options-container {
            flex-direction: column;
            gap: 10px;
          }
          .option {
            flex-direction: row;
            justify-content: flex-start;
            gap: 10px;
            width: 100%;
          }
          .radio-label {
            margin-top: 0;
          }
          .continue-btn {
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .title {
            font-size: 1.25rem;
          }
          .question-text {
            font-size: 1rem;
          }
          .radio-label {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default SurveyForm;