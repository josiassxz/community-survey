import React, { useState } from 'react';
import './Survey.css';

const SurveyForm = () => {
  const questions = [
    "Gosto de passar tempo com animais de estimação em casa.",
    "Prefiro gatos a cães como animais de companhia.",
    "Eu consideraria adotar de um abrigo de animais.",
    "Acredito que os animais têm vidas emocionais complexas.",
    "Levo regularmente meu animal de estimação para consultas veterinárias."
  ];

  const [responses, setResponses] = useState({});

  const handleResponse = (questionIndex, value) => {
    setResponses({ ...responses, [questionIndex]: value });
  };

  return (
    <nav role="navigation" tabIndex={0} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className="container">
        <header className="header">
          <h1 className="title">Community Survey</h1>
          <div className="subtitle">Questions 1-5 of 25</div>
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
              Continue
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
  }
`}</style>
    </nav>
  );
};

export default SurveyForm;