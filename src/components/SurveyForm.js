import React, { useState } from 'react';
import FloatingIcons from './FloatingIcons';
import './Survey.css';

const SurveyForm = () => {
  // Questões combinadas dos dois dicionários
  const questions = [
    "Você tem interesse em analisar documentos, elaborar contratos e defender interesses legais?",
    "Você se vê desenvolvendo estratégias para resolver conflitos, mediar negociações ou assessorar clientes?",
    "Gosta de trabalhar com planejamento de projetos, análise de custos e gestão de recursos em obras ou empreendimentos?",
    "Tem interesse em realizar diagnósticos, prescrever tratamentos e acompanhar a evolução de pacientes?",
    "Prefere atividades que envolvem pesquisa, análise técnica e elaboração de relatórios detalhados?",
    "Você se interessa por atuar em equipe, coordenar ações e implementar soluções inovadoras?",
    "Tem aptidão para lidar com aspectos jurídicos, interpretar leis e representar clientes em questões legais?",
    "Você gosta de atividades práticas como inspeções, execução de projetos técnicos e uso de equipamentos especializados?",
    "Tem interesse em atuar com ética, responsabilidade social e mediação de conflitos em ambientes corporativos?",
    "Prefere trabalhar com educação em saúde, prevenção de doenças e promoção de bem-estar coletivo?",
  ];

  // Palavras-chave relacionadas a cada carreira
  const careerKeywords = {
    direito: [
      "analisar", "contratos", "defender", "legais", "processos", "juridica", 
      "parecer", "argumentar", "documentacao", "normas", "tribunal", "leis", 
      "representar", "legislacao", "etico", "contestacao", "juridico", "interpretar"
    ],
    medicina: [
      "diagnosticar", "prescrever", "tratamentos", "pacientes", "monitorar", 
      "medicamentos", "exames", "urgencia", "clinica", "saude", "bem-estar", 
      "prevencao", "terapias", "acolhimento", "humanizado"
    ],
    desenvolvedor: [
      "desenvolver", "implementar", "solucoes", "projetos", "inovacao", 
      "criatividade", "tecnologicas", "metodos", "tecnico", "dados", "analise",
      "sistemas", "programacao", "algoritmos", "tecnologia"
    ],
    arquitetura: [
      "planejar", "projetos", "obras", "construcao", "viabilidade", "custos", 
      "cronograma", "equipamentos", "gerenciar", "execucao", "desenho", 
      "espacos", "levantamentos", "materiais", "estruturas"
    ]
  };

  const [currentPage, setCurrentPage] = useState(0); // 0 para teste, 1 para resultados
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [careerScores, setCareerScores] = useState({
    direito: 0,
    medicina: 0,
    desenvolvedor: 0,
    arquitetura: 0
  });
  const [recommendedCareer, setRecommendedCareer] = useState("");
  const [careerDescription, setCareerDescription] = useState("");

  const handleResponse = (questionIndex, value) => {
    setResponses({ ...responses, [questionIndex]: value });
  };

  const calculateResults = () => {
    // Calculando a pontuação para cada carreira com base nas palavras-chave
    // Cada pergunta tem palavras-chave e a pontuação da resposta (0-4) multiplica a contribuição
    
    const newScores = {
      direito: 0,
      medicina: 0,
      desenvolvedor: 0,
      arquitetura: 0
    };
    
    // Pesos das perguntas para cada carreira
    const questionWeights = {
      0: { direito: 2, medicina: 0, desenvolvedor: 0, arquitetura: 0 },
      1: { direito: 1.5, medicina: 0, desenvolvedor: 0.5, arquitetura: 0 },
      2: { direito: 0, medicina: 0, desenvolvedor: 0.5, arquitetura: 2 },
      3: { direito: 0, medicina: 2, desenvolvedor: 0, arquitetura: 0 },
      4: { direito: 0.5, medicina: 0.5, desenvolvedor: 1, arquitetura: 0.5 },
      5: { direito: 0, medicina: 0, desenvolvedor: 1.5, arquitetura: 1 },
      6: { direito: 2, medicina: 0, desenvolvedor: 0, arquitetura: 0 },
      7: { direito: 0, medicina: 0, desenvolvedor: 0.5, arquitetura: 1.5 },
      8: { direito: 1, medicina: 0.5, desenvolvedor: 0, arquitetura: 0 },
      9: { direito: 0, medicina: 2, desenvolvedor: 0, arquitetura: 0 },
    };
    
    // Calculando pontuação
    Object.keys(responses).forEach(questionIndex => {
      const responseValue = responses[questionIndex]; // Valor de 0-4
      const normalizedValue = (responseValue + 1) / 5; // Normalizar para 0.2-1.0
      
      Object.keys(questionWeights[questionIndex]).forEach(career => {
        const weight = questionWeights[questionIndex][career];
        newScores[career] += normalizedValue * weight;
      });
    });
    
    // Normalizar pontuações para percentuais
    const total = Object.values(newScores).reduce((sum, score) => sum + score, 0);
    if (total > 0) {
      Object.keys(newScores).forEach(career => {
        newScores[career] = Math.round((newScores[career] / total) * 100);
      });
    }
    
    setCareerScores(newScores);
    
    // Encontrando a carreira recomendada
    let maxScore = 0;
    let recommended = "";
    
    Object.keys(newScores).forEach(career => {
      if (newScores[career] > maxScore) {
        maxScore = newScores[career];
        recommended = career;
      }
    });
    
    setRecommendedCareer(recommended);
    
    // Definindo descrição da carreira recomendada
    const descriptions = {
      direito: "Você demonstra grande aptidão para a área jurídica! Suas respostas mostram interesse por análise de documentos, interpretação de leis e defesa de interesses legais. Uma carreira em Direito permitiria que você utilizasse suas habilidades de argumentação e raciocínio lógico para resolver conflitos e buscar justiça.",
      medicina: "Suas respostas indicam uma forte vocação para a Medicina! Você demonstra interesse em diagnosticar, tratar e cuidar do bem-estar das pessoas. Uma carreira médica permitiria que você utilizasse suas habilidades para promover saúde e salvar vidas.",
      desenvolvedor: "O mundo da tecnologia parece ser seu caminho! Suas respostas mostram afinidade com desenvolvimento de soluções, implementação de projetos e inovação. Como Desenvolvedor de Software, você poderia criar tecnologias que transformam a vida das pessoas.",
      arquitetura: "Você tem um perfil ideal para Arquitetura! Suas respostas demonstram interesse por planejamento de projetos, análise de viabilidade e gestão de obras. Como Arquiteto, você poderia criar espaços que combinam estética e funcionalidade."
    };
    
    setCareerDescription(descriptions[recommended]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
      setCurrentPage(1); // Mostrar resultados
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartTest = () => {
    setCurrentPage(0);
    setCurrentQuestion(0);
    setResponses({});
    setCareerScores({
      direito: 0,
      medicina: 0,
      desenvolvedor: 0,
      arquitetura: 0
    });
  };

  // Formatando nomes das carreiras para exibição
  const formatCareerName = (career) => {
    const names = {
      direito: "Direito",
      medicina: "Medicina",
      desenvolvedor: "Desenvolvedor de Software",
      arquitetura: "Arquitetura"
    };
    return names[career] || career;
  };

  return (
    <div className="test-container" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <FloatingIcons />
      
      {currentPage === 0 ? (
        // Página do questionário
        <div className="container">
          <header className="header">
            <h1 className="title">Teste Vocacional</h1>
            <div className="subtitle">Questão {currentQuestion + 1} de {questions.length}</div>
          </header>

          <div className="survey-form">
            <div className={`question-card question-${(currentQuestion % 5) + 1}`}>
              <p className="question-text">{questions[currentQuestion]}</p>
              <div className="options-container">
                {['Discordo Totalmente', 'Discordo', 'Neutro', 'Concordo', 'Concordo Totalmente'].map((option, optIndex) => (
                  <div key={optIndex} className="option">
                    <input
                      type="radio"
                      id={`option-${optIndex}`}
                      name={`question-${currentQuestion}`}
                      value={optIndex}
                      checked={responses[currentQuestion] === optIndex}
                      onChange={() => handleResponse(currentQuestion, optIndex)}
                      className="radio-input"
                    />
                    <label htmlFor={`option-${optIndex}`} className="radio-label">{option}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer">
              <div className="progress">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</div>
              <div className="button-container">
                {currentQuestion > 0 && (
                  <button 
                    type="button" 
                    onClick={handlePrevious} 
                    className="previous-btn"
                  >
                    Anterior
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={handleNext} 
                  className="continue-btn"
                  disabled={responses[currentQuestion] === undefined}
                >
                  {currentQuestion < questions.length - 1 ? 'Continuar' : 'Ver Resultados'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Página de resultados
        <div className="container results-container">
          <header className="header">
            <h1 className="title">Seus Resultados</h1>
            <div className="subtitle">Descubra sua carreira ideal!</div>
          </header>

          <div className="results-content">
            <div className="recommended-career">
              <h2>Carreira Recomendada: {formatCareerName(recommendedCareer)}</h2>
              <p className="career-description">{careerDescription}</p>
            </div>

            <div className="all-careers">
              <h3>Compatibilidade com diferentes carreiras:</h3>
              <div className="career-bars">
                {Object.keys(careerScores).map(career => (
                  <div key={career} className="career-score">
                    <div className="career-name">{formatCareerName(career)}</div>
                    <div className="score-bar-container">
                      <div 
                        className="score-bar" 
                        style={{ 
                          width: `${careerScores[career]}%`,
                          backgroundColor: career === recommendedCareer ? '#4CAF50' : '#F5002D'
                        }}
                      ></div>
                    </div>
                    <div className="score-percentage">{careerScores[career]}%</div>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" onClick={restartTest} className="restart-btn">
              Refazer o Teste
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;