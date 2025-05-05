import React, { useState, useEffect } from 'react';
import FloatingIcons from './FloatingIcons';
import './Survey.css';

// Estilos adicionais para corrigir a quebra de layout
const styles = {
  scoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '20px',
  },
  scoreBarContainer: {
    width: '100%',
    height: '24px',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '5px',
  },
  scorePercentage: {
    textAlign: 'center',
    fontSize: '14px',
    marginTop: '5px',
  },
  courseRecommendation: {
    marginBottom: '25px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  // Estilos para o modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    position: 'relative',
  },
  modalTitle: {
    color: '#F5002D',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
  },
  modalText: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  checkbox: {
    margin: '0 10px 0 0',
    transform: 'scale(1.2)',
    accentColor: '#F5002D',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  primaryButton: {
    backgroundColor: '#F5002D',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '50px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: '1',
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#F5002D',
    padding: '12px 20px',
    borderRadius: '50px',
    border: '1px solid #F5002D',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: '1',
  }
};

// Lista de 50 dicas para escolha de carreira
const careerTips = [
  "Considere fazer testes de aptidão vocacional para descobrir áreas que combinam com suas habilidades naturais.",
  "Converse com profissionais que já atuam na área que você está considerando seguir.",
  "Visite universidades e participe de feiras de profissões para conhecer melhor os cursos.",
  "Reflita sobre o que você gosta de fazer no seu tempo livre - seus hobbies podem indicar carreiras potenciais.",
  "Avalie o mercado de trabalho da profissão desejada, mas não deixe que seja o único fator na sua decisão.",
  "Pense no estilo de vida que a carreira proporcionará: carga horária, ambiente de trabalho, nível de estresse.",
  "Considere suas forças pessoais e escolha uma carreira onde elas possam ser valorizadas.",
  "Faça um estágio ou trabalho voluntário na área para ter uma experiência prática antes de decidir.",
  "Não tenha medo de mudar de ideia - muitas pessoas bem-sucedidas já trocaram de carreira.",
  "Procure conhecer as diferentes especializações dentro de cada área profissional.",
  "Avalie se você prefere trabalhar mais com pessoas, dados, objetos ou ideias.",
  "Questione-se sobre o impacto que você deseja causar no mundo através da sua profissão.",
  "Leve em consideração seus valores pessoais ao escolher uma carreira.",
  "Busque informações sobre a remuneração média e as perspectivas de crescimento na área.",
  "Considere a possibilidade de empreender na área que você gosta.",
  "Pense nas habilidades transferíveis que você já possui e como elas se aplicariam a diferentes carreiras.",
  "Avalie o quanto você está disposto a estudar - algumas carreiras exigem educação continuada.",
  "Lembre-se que a primeira graduação nem sempre determina toda a sua trajetória profissional.",
  "Considere programas de dupla graduação ou formações interdisciplinares.",
  "Analise se você se adapta melhor a ambientes estruturados ou mais flexíveis e criativos.",
  "Pense no equilíbrio entre vida profissional e pessoal que cada carreira pode proporcionar.",
  "Considere suas limitações e como cada carreira se adequaria a elas.",
  "Avalie se você prefere uma carreira com rotinas previsíveis ou desafios variados.",
  "Leia biografias de profissionais inspiradores na área que você está considerando.",
  "Acompanhe blogs, podcasts e canais sobre as profissões que te interessam.",
  "Considere fazer disciplinas eletivas ou cursos livres para explorar áreas diferentes.",
  "Avalie se você se identifica mais com trabalho em equipe ou individual.",
  "Pense nas possibilidades de atuação internacional que a carreira oferece.",
  "Leve em conta o tempo de formação e o investimento financeiro necessário para se estabelecer na área.",
  "Observe as tendências tecnológicas e como elas podem afetar as carreiras no futuro.",
  "Reflita sobre como você se vê daqui a 5, 10 e 20 anos em cada carreira considerada.",
  "Não subestime a importância da saúde mental na escolha profissional.",
  "Avalie se você prefere trabalhar em grandes organizações, pequenas empresas ou de forma autônoma.",
  "Identifique seus pontos fracos e avalie como eles poderiam impactar cada escolha de carreira.",
  "Crie um mapa mental ou diário de reflexões sobre suas opções de carreira.",
  "Considere as possibilidades de conciliar diferentes interesses em uma única carreira.",
  "Pense na sua relação com a tecnologia ao escolher uma área de atuação.",
  "Avalie o quanto cada carreira permitirá você expressar sua criatividade.",
  "Considere como diferentes profissões se alinham com seu desejo por estabilidade ou por inovação.",
  "Não ignore seus instintos e intuições sobre o que parece certo para você.",
  "Considere o nível de interação social que cada carreira exige e se isso combina com seu perfil.",
  "Pense na possibilidade de trabalhar remotamente, se isso for importante para você.",
  "Reflita sobre como suas habilidades de comunicação se adequam às diferentes carreiras.",
  "Considere fazer um ano sabático para explorar diferentes possibilidades antes de decidir.",
  "Avalie se você se identifica mais com profissões que exigem raciocínio analítico ou criativo.",
  "Pergunte-se o que você faria mesmo sem receber por isso - pode ser um indicador da sua vocação.",
  "Considere como as diferentes carreiras se alinham com suas crenças e valores éticos.",
  "Pense em como cada profissão permitirá que você continue aprendendo ao longo da vida.",
  "Lembre-se que é possível combinar diferentes áreas de interesse ao longo da sua carreira.",
  "Pergunte-se: 'O que o mundo precisa que eu adoraria fazer?'"
];

const SurveyForm = () => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(0);
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
  const [apiRecommendations, setApiRecommendations] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [formattedResponses, setFormattedResponses] = useState(null);
  
  // Estados para o modal de consentimento
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);
  
  // Estado para armazenar a dica atual
  const [currentTip, setCurrentTip] = useState("");

  // Função para selecionar uma dica aleatória
  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * careerTips.length);
    return careerTips[randomIndex];
  };

  // Palavras-chave relacionadas a cada carreira (mantido do código original)
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

  // Pesos das perguntas para cada carreira
  // Este objeto será adaptado após o carregamento das perguntas da API
  const [questionWeights, setQuestionWeights] = useState({});

  // Atualizar a dica quando a pergunta mudar
  useEffect(() => {
    setCurrentTip(getRandomTip());
  }, [currentQuestion]);

  // Buscar perguntas da API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        // Adicionando opções para lidar com CORS e tratando possíveis erros
        try {
          const response = await fetch('http://localhost:8000/questions', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            // mode: 'cors' 
          });
          
          if (!response.ok) {
            throw new Error('Erro ao buscar perguntas: ' + response.statusText);
          }
          
          const data = await response.json();
        setQuestions(data.questions);
        
        // Criar pesos para cada questão com base nas palavras-chave
        const weights = {};
        Object.keys(data.questions).forEach((qId, index) => {
          const question = data.questions[qId];
          const keywords = question["palavras-chave"] || [];
          
          // Inicializar pesos para esta questão
          weights[index] = { direito: 0, medicina: 0, desenvolvedor: 0, arquitetura: 0 };
          
          // Para cada palavra-chave, verificar se está associada a alguma carreira
          keywords.forEach(keyword => {
            Object.keys(careerKeywords).forEach(career => {
              if (careerKeywords[career].includes(keyword.toLowerCase())) {
                // Aumentar o peso desta carreira para esta questão
                weights[index][career] += 0.5;
              }
            });
          });
          
          // Se não houver palavras-chave correspondentes, aplicar pesos padrão
          const totalWeight = Object.values(weights[index]).reduce((a, b) => a + b, 0);
          if (totalWeight === 0) {
            weights[index] = { direito: 0.25, medicina: 0.25, desenvolvedor: 0.25, arquitetura: 0.25 };
          }
        });
        
          setQuestionWeights(weights);
          setIsLoading(false);
        } catch (fetchError) {
          console.error("Erro na requisição:", fetchError);
          throw new Error("Erro na comunicação com o servidor: " + fetchError.message);
        }
      } catch (error) {
        console.error("Erro geral:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    
    fetchQuestions();
  }, []);

  const handleResponse = (questionIndex, value) => {
    setResponses({ ...responses, [questionIndex]: value });
  };

  const calculateResults = async () => {
    // Formatar as respostas para o formato esperado pela API
    const formatted = {};
    const questionKeys = Object.keys(questions);
    
    // Certifique-se de que todas as questões estão sendo enviadas
    questionKeys.forEach((qstKey, index) => {
      if (responses[index] !== undefined) {
        formatted[qstKey] = responses[index];
      } else {
        // Caso alguma questão não tenha sido respondida (não deveria acontecer)
        // Definimos um valor padrão (3 = neutro)
        formatted[qstKey] = 3;
      }
    });
    
    // Guarda as respostas formatadas para usar posteriormente no salvamento
    setFormattedResponses(formatted);
    
    // Enviar respostas para a API
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/answers?top_degrees=5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatted)
      });
      
      if (!response.ok) {
        throw new Error('Erro ao enviar respostas: ' + response.statusText);
      }
      
      const apiData = await response.json();
      setApiRecommendations(apiData.recommendations);
      
      // Mostrar o modal de consentimento após receber os resultados
      setShowConsentModal(true);
      
      setApiError(null);
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      setApiError("Não foi possível obter recomendações da API: " + error.message);
    } finally {
      setIsLoading(false);
    }
    
    // Continuar com o cálculo local também (como backup)
    const newScores = {
      direito: 0,
      medicina: 0,
      desenvolvedor: 0,
      arquitetura: 0
    };
    
    // Calculando pontuação com base nas respostas e pesos
    Object.keys(responses).forEach(questionIndex => {
      const responseValue = responses[questionIndex]; // Valor de 1-5
      const normalizedValue = responseValue / 5; // Normalizar para 0.2-1.0
      
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

  // Função para salvar os resultados na API
  const saveResults = async () => {
    if (!consentChecked || !formattedResponses || !apiRecommendations) {
      return;
    }
    
    try {
      const saveResponse = await fetch('http://localhost:8000/save_results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: formattedResponses,
          recommendations: apiRecommendations
        })
      });
      
      if (!saveResponse.ok) {
        throw new Error('Erro ao salvar resultados: ' + saveResponse.statusText);
      }
      
      // Feedback de sucesso
      setSaveSuccess(true);
      
      // Fechar o modal após um breve delay
      setTimeout(() => {
        setShowConsentModal(false);
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar resultados:", error);
      setSaveSuccess(false);
    }
  };

  const handleNext = async () => {
    // Convertendo Object.keys(questions) para array para poder acessar pelo índice
    const questionKeys = Object.keys(questions);
    
    // Atualizar a dica para a próxima pergunta
    setCurrentTip(getRandomTip());
    
    if (currentQuestion < questionKeys.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await calculateResults();
      setCurrentPage(1); // Mostrar resultados
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Também mudar a dica ao voltar
      setCurrentTip(getRandomTip());
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
    setApiRecommendations(null);
    setApiError(null);
    setCurrentTip(getRandomTip());
    setFormattedResponses(null);
    setSaveSuccess(null);
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

  // Se estiver carregando, mostrar spinner
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando perguntas...</p>
      </div>
    );
  }

  // Se houver erro, mostrar mensagem e também adicionar um fallback para as perguntas
  if (error) {
    // Se não conseguirmos obter da API, usar perguntas de fallback
    if (Object.keys(questions).length === 0) {
      const fallbackQuestions = {
        "QST_01": {
          "text": "Você se sente confortável em analisar dados complexos, identificar problemas e propor soluções lógicas e bem fundamentadas?",
          "palavras-chave": ["analisar"]
        },
        "QST_02": {
          "text": "Você prefere trabalhar em equipe, interagir com diferentes públicos, apresentar ideias e mediar discussões, ou prefere tarefas mais individuais?",
          "palavras-chave": ["comunicar", "interagir", "equipes"]
        },
        "QST_03": {
          "text": "Você tem facilidade para planejar tarefas, organizar recursos, gerenciar cronogramas e monitorar o progresso de projetos?",
          "palavras-chave": ["logistica"]
        },
        "QST_04": {
          "text": "Você se considera uma pessoa criativa, com interesse em design, estética, artes visuais ou na criação de conceitos e soluções originais?",
          "palavras-chave": ["criar", "grafico"]
        },
        "QST_05": {
          "text": "Você tem interesse em atividades práticas que envolvam manuseio de ferramentas, equipamentos, tecnologia, softwares ou a construção e manutenção de sistemas?",
          "palavras-chave": ["equipamentos", "tecnologia"]
        }
      };
      
      setQuestions(fallbackQuestions);
      
      // Criar pesos para cada questão
      const weights = {};
      Object.keys(fallbackQuestions).forEach((qId, index) => {
        weights[index] = { direito: 0.25, medicina: 0.25, desenvolvedor: 0.25, arquitetura: 0.25 };
      });
      setQuestionWeights(weights);
      
      return (
        <div className="error-container">
          <p>Aviso: Usando perguntas locais devido a um erro de conexão com a API.</p>
          <p>Erro: {error}</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      );
    }
    
    return (
      <div className="error-container">
        <p>Erro ao carregar perguntas: {error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  // Convertendo Object.keys(questions) para array para poder acessar pelo índice
  const questionKeys = Object.keys(questions);
  const currentQuestionKey = questionKeys[currentQuestion];
  const currentQuestionObj = questions[currentQuestionKey];
  
  return (
    <div className="test-container" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <FloatingIcons />
      
      {/* Modal de consentimento */}
      {showConsentModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Salvar Resultados do Teste (Maiores de 18 anos)</h3>
            
            {saveSuccess === null ? (
              <>
                <p style={styles.modalText}>
                  Gostaríamos de salvar os resultados do seu teste para fins de pesquisa, melhoria do sistema.
                  Ao clicar em "Concordo", você confirma que tem 18 anos ou mais e aceita que seus dados sejam salvos para este fim.
                </p>
                
                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <label htmlFor="consent-checkbox">Concordo e confirmo ter 18 anos ou mais</label>
                </div>
                
                <div style={styles.buttonContainer}>
                  <button 
                    style={styles.secondaryButton}
                    onClick={() => setShowConsentModal(false)}
                  >
                    Não concordo
                  </button>
                  <button 
                    style={{
                      ...styles.primaryButton,
                      opacity: consentChecked ? 1 : 0.5,
                      cursor: consentChecked ? 'pointer' : 'not-allowed'
                    }}
                    onClick={saveResults}
                    disabled={!consentChecked}
                  >
                    Concordo
                  </button>
                </div>
              </>
            ) : saveSuccess ? (
              <p style={{...styles.modalText, color: '#4CAF50', fontWeight: 'bold'}}>
                Resultados salvos com sucesso! Obrigado pela sua contribuição.
              </p>
            ) : (
              <p style={{...styles.modalText, color: '#F5002D', fontWeight: 'bold'}}>
                Ocorreu um erro ao salvar os resultados. Por favor, tente novamente mais tarde.
              </p>
            )}
          </div>
        </div>
      )}
      
      {currentPage === 0 ? (
        // Página do questionário
        <div className="container">
          <header className="header">
            <h1 className="title" style={{
              color: '#F5002D',
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>Teste Vocacional</h1>
            <div className="subtitle" style={{
              fontSize: '16px',
              color: '#555',
              marginBottom: '10px'
            }}>Questão {currentQuestion + 1} de {questionKeys.length}</div>
            <div className="instructions" style={{
              backgroundColor: '#f5f5f5',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '15px',
              lineHeight: '1.5',
              color: '#444'
            }}>
              <p>Em uma escala de 1 a 5, avalie quanto cada afirmação se aplica a você:</p>
              <p><strong>1</strong> = Menos relevante para mim | <strong>5</strong> = Mais relevante para mim</p>
            </div>
          </header>

          <div className="survey-form">
            <div className={`question-card question-${(currentQuestion % 5) + 1}`} style={{
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              marginBottom: '20px'
            }}>
              <p className="question-text" style={{
                fontSize: '18px',
                fontWeight: '500',
                marginBottom: '20px',
                lineHeight: '1.5',
                color: '#333'
              }}>{currentQuestionObj.text}</p>
              
              <div className="scale-description" style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                color: '#666',
                fontSize: '14px'
              }}>
                <span>Menos relevante para mim</span>
                <span>Mais relevante para mim</span>
              </div>
              
              <div className="options-container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="option" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '50px'
                  }}>
                    <input
                      type="radio"
                      id={`option-${value}`}
                      name={`question-${currentQuestion}`}
                      value={value}
                      checked={responses[currentQuestion] === value}
                      onChange={() => handleResponse(currentQuestion, value)}
                      className="radio-input"
                      style={{
                        transform: 'scale(1.5)',
                        marginBottom: '8px',
                        accentColor: '#3498db'
                      }}
                    />
                    <label 
                      htmlFor={`option-${value}`} 
                      className="radio-label"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: responses[currentQuestion] === value ? '#3498db' : '#666'
                      }}
                    >
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer" style={{marginTop: '25px'}}>
                <div className="progress-container" style={{
                  marginBottom: '10px',
                  width: '100%'
                }}>
                  <div className="progress-label" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    <span>Progresso</span>
                    <span>{currentQuestion === 0 ? '0' : Math.round(((currentQuestion) / (questionKeys.length - 1)) * 100)}%</span>
                  </div>
                  
                  {/* Barra de progresso com indicadores de início e fim */}
                  <div className="progress-bar-container" style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    border: '2px solid #CCCCCC',
                    position: 'relative'
                  }}>
                    {/* Barra de progresso */}
                    <div className="progress-bar" style={{
                      width: `${currentQuestion === 0 ? '0' : Math.round(((currentQuestion) / (questionKeys.length - 1)) * 100)}%`,
                      height: '100%',
                      backgroundColor: '#F5002D',
                      borderRadius: '5px',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                  
                  {/* Indicadores textuais de início e fim */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '4px'
                  }}>
                    <span>Início</span>
                    <span>Fim</span>
                  </div>
                </div>
                
                
              </div>
              <div className="button-container" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '10px',
                  marginTop: '20px'
                }}>
                  {currentQuestion > 0 ? (
                    <button 
                      type="button" 
                      onClick={handlePrevious} 
                      className="previous-btn"
                      style={{
                        padding: '14px 24px',
                        borderRadius: '50px',
                        border: '1px solid #F5002D',
                        backgroundColor: 'white',
                        color: '#F5002D',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        width: '100%'
                      }}
                    >
                      Anterior
                    </button>
                  ) : null}
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="continue-btn"
                    disabled={responses[currentQuestion] === undefined}
                    style={{
                      padding: '14px 24px',
                      borderRadius: '50px',
                      border: 'none',
                      backgroundColor: responses[currentQuestion] === undefined ? '#ccc' : '#F5002D',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: responses[currentQuestion] === undefined ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      width: '100%'
                    }}
                  >
                    {currentQuestion < questionKeys.length - 1 ? 'Continuar' : 'Ver Resultados'}
                  </button>
                </div>
          </div>
        </div>
      ) : (
        // Página de resultados
        <div className="container results-container" style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
          padding: '30px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <header className="header" style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h1 className="title" style={{
              color: '#F5002D',
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>Seus Resultados</h1>
            <div className="subtitle" style={{
              fontSize: '18px',
              color: '#555',
              fontStyle: 'italic'
            }}>Descubra sua carreira ideal!</div>
          </header>

          <div className="results-content" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {apiRecommendations ? (
              <div className="api-recommendations" style={{
                width: '100%', 
                maxWidth: '700px', 
                margin: '0 auto',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                padding: '25px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <h2 style={{
                  margin: '0 0 25px 0', 
                  textAlign: 'center',
                  color: '#333',
                  fontSize: '24px',
                  position: 'relative',
                  paddingBottom: '15px'
                }}>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    Cursos Recomendados para Você
                    <span style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '3px',
                      backgroundColor: '#F5002D',
                      borderRadius: '3px'
                    }}></span>
                  </span>
                </h2>
                <div className="recommended-courses" style={{padding: '0'}}>
                  {Object.keys(apiRecommendations.nome_curso).map((key, index) => {
                    const courseName = apiRecommendations.nome_curso[key];
                    const description = apiRecommendations.description && apiRecommendations.description[key] 
                      ? apiRecommendations.description[key] 
                      : "Informações sobre o curso não disponíveis.";
                    
                    return (
                      <div key={key} style={{
                        backgroundColor: 'white',
                        borderLeft: `4px solid ${index === 0 ? '#F5002D' : '#3498db'}`,
                        padding: '20px',
                        marginBottom: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                      }} className="course-recommendation">
                        <h3 style={{
                          margin: '0 0 15px 0',
                          color: index === 0 ? '#F5002D' : '#3498db',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '20px',
                          fontWeight: '600'
                        }}>
                          <span style={{
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: index === 0 ? '#4CAF50' : '#3498db',
                            color: 'white',
                            fontSize: '16px',
                            marginRight: '10px'
                          }}>{index + 1}</span>
                          {courseName.charAt(0).toUpperCase() + courseName.slice(1)}
                        </h3>
                        
                        {/* Descrição do curso */}
                        <p style={{
                          fontSize: '15px',
                          color: '#555',
                          marginBottom: '5px',
                          lineHeight: '1.4'
                        }}>
                          {description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Resultados da análise local (exibir apenas se a API falhar) */
              <>
                {apiError && (
                  <div className="api-error">
                    <p>{apiError}</p>
                    <p>Apresentando resultados baseados em nossa análise local:</p>
                  </div>
                )}
                
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
                        {/* <div className="score-bar-container">
                          <div 
                            className="score-bar" 
                            style={{ 
                              width: `${careerScores[career]}%`,
                              backgroundColor: career === recommendedCareer ? '#4CAF50' : '#F5002D'
                            }}
                          ></div>
                        </div> */}
                        <div className="score-percentage">{careerScores[career]}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button 
              type="button" 
              onClick={restartTest} 
              className="restart-btn"
              style={{
                backgroundColor: '#F5002D', 
                color: 'white', 
                padding: '14px 30px', 
                borderRadius: '50px', 
                border: 'none', 
                fontSize: '18px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'block',
                margin: '40px auto 10px',
                boxShadow: '0 4px 8px rgba(245, 0, 45, 0.3)',
                width: '80%',
                maxWidth: '400px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(245, 0, 45, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(245, 0, 45, 0.3)';
              }}
            >
              Refazer o Teste
            </button>
            
            <p style={{
              textAlign: 'center',
              color: '#888',
              fontSize: '14px',
              marginTop: '20px'
            }}>
              Obrigado por realizar nosso teste vocacional!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;