import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import { learningWorlds } from './learning-worlds-data';
import './subject-learning.css';

export function SubjectLearning() {
  const [selectedId, setSelectedId] = useState(learningWorlds[0].id);
  const [questionIndex, setQuestionIndex] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const world = learningWorlds.find((item) => item.id === selectedId) ?? learningWorlds[0];
  const index = questionIndex[world.id] ?? 0;
  const selectedAnswer = answers[world.id] ?? null;
  const question = world.questions[index];
  const isCorrect = selectedAnswer === question.answer;
  const done = completed[world.id] ?? false;

  const chooseWorld = (id: string) => setSelectedId(id);

  const answerQuestion = (answer: number) => {
    if (selectedAnswer !== null || done) return;
    setAnswers((current) => ({ ...current, [world.id]: answer }));
    if (answer === question.answer) {
      setScores((current) => ({ ...current, [world.id]: (current[world.id] ?? 0) + 1 }));
    }
  };

  const nextQuestion = () => {
    if (index === world.questions.length - 1) {
      setCompleted((current) => ({ ...current, [world.id]: true }));
      return;
    }
    setQuestionIndex((current) => ({ ...current, [world.id]: index + 1 }));
    setAnswers((current) => ({ ...current, [world.id]: null }));
  };

  const replayWorld = () => {
    setQuestionIndex((current) => ({ ...current, [world.id]: 0 }));
    setAnswers((current) => ({ ...current, [world.id]: null }));
    setScores((current) => ({ ...current, [world.id]: 0 }));
    setCompleted((current) => ({ ...current, [world.id]: false }));
  };

  return (
    <section className="learning-worlds" id="mundos" aria-labelledby="worlds-title">
      <header className="worlds-intro">
        <div className="worlds-intro-copy">
          <p className="worlds-kicker"><span /> Ocho caminos para aprender</p>
          <h2 id="worlds-title">Abre un mundo.<br /><em>Descubre algo nuevo.</em></h2>
          <p className="worlds-lede">Elige una materia, lee una mini lección y pon a prueba tus ideas. Cada respuesta trae una explicación para seguir aprendiendo.</p>
        </div>
        <div className="worlds-stamp" aria-hidden="true">
          <span className="stamp-orbit" />
          <BookOpen size={35} strokeWidth={1.7} />
          <small>curiosidad<br />en marcha</small>
        </div>
      </header>

      <div className="world-subject-layout">
        <aside className="world-subject-rail" aria-label="Selecciona una materia">
          <div className="subject-rail-heading"><span>Tu mapa</span><span>{learningWorlds.length} mundos</span></div>
          <div className="subject-list" role="tablist" aria-label="Materias">
            {learningWorlds.map((item, itemIndex) => {
              const itemScore = scores[item.id] ?? 0;
              const itemDone = completed[item.id] ?? false;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={world.id === item.id}
                  aria-controls="world-lesson-panel"
                  className={`subject-choice ${world.id === item.id ? 'is-current' : ''}`}
                  key={item.id}
                  onClick={() => chooseWorld(item.id)}
                  data-testid={`button-subject-${item.id}`}
                >
                  <span className="subject-index">0{itemIndex + 1}</span>
                  <span className="subject-choice-copy">
                    <strong>{item.title}</strong>
                    <small>{itemDone ? `${itemScore} de 5 aciertos` : item.subtitle}</small>
                  </span>
                  {itemDone ? <Star className="subject-star" size={16} fill="currentColor" /> : <ChevronRight size={16} />}
                </button>
              );
            })}
          </div>
          <div className="subject-rail-note"><Sparkles size={16} /> Tu avance se mantiene mientras exploras estas materias.</div>
        </aside>

        <article className="world-lesson" id="world-lesson-panel" role="tabpanel" aria-label={world.title}>
          <div className="lesson-topline">
            <div><span className="lesson-label">Mundo de aprendizaje</span><span className="lesson-score"><Star size={14} /> {scores[world.id] ?? 0} / 5</span></div>
            <span className="lesson-step">{done ? '¡Completado!' : `Pregunta ${index + 1} de ${world.questions.length}`}</span>
          </div>
          <div className="lesson-heading">
            <div><p className="lesson-subtitle">{world.subtitle}</p><h3>{world.title}</h3></div>
            <div className="lesson-progress" role="progressbar" aria-label={`Progreso de ${world.title}`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={done ? 5 : index + (selectedAnswer !== null ? 1 : 0)}>
              <span style={{ width: `${((done ? 5 : index + (selectedAnswer !== null ? 1 : 0)) / 5) * 100}%` }} />
            </div>
          </div>
          <p className="lesson-description">{world.description}</p>
          <div className="topic-row" aria-label="Temas de esta materia">{world.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>

          <section className="concept-notes" aria-labelledby="concept-heading">
            <div className="concept-head"><span className="concept-icon"><BookOpen size={17} /></span><div><span>Antes del reto</span><h4 id="concept-heading">Ideas para explorar</h4></div></div>
            <div className="concept-grid">
              {world.concepts.slice(0, 4).map((concept, conceptIndex) => (
                <div className="concept-note" key={concept.title}>
                  <span>0{conceptIndex + 1}</span><strong>{concept.title}</strong><p>{concept.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="world-question" aria-label="Reto de la materia">
            {done ? (
              <div className="world-complete" role="status" aria-live="polite">
                <span className="complete-mark"><Check size={25} /></span>
                <p className="lesson-label">Misión completada</p>
                <h4>¡Exploración terminada!</h4>
                <p>Conseguiste <strong>{scores[world.id] ?? 0} de 5 aciertos</strong> en {world.title}. Puedes volver a jugar cuando quieras.</p>
                <button type="button" className="world-action" onClick={replayWorld} data-testid={`button-replay-${world.id}`}><RotateCcw size={16} /> Volver a jugar</button>
              </div>
            ) : (
              <>
                <div className="question-title-row"><span className="question-badge"><CircleHelp size={18} /></span><div><span className="lesson-label">Reto de explorador</span><h4>{question.prompt}</h4></div></div>
                <div className="world-answer-grid" role="group" aria-label="Elige una respuesta">
                  {question.options.map((option, optionIndex) => {
                    const correct = selectedAnswer !== null && optionIndex === question.answer;
                    const incorrect = selectedAnswer === optionIndex && !isCorrect;
                    return (
                      <button
                        type="button"
                        className={`world-answer ${correct ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`}
                        key={`${world.id}-${index}-${option}`}
                        onClick={() => answerQuestion(optionIndex)}
                        disabled={selectedAnswer !== null}
                        aria-pressed={selectedAnswer === optionIndex}
                        data-testid={`button-answer-${world.id}-${optionIndex}`}
                      >
                        <span className="world-option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                        <span>{option}</span>
                        {correct && <Check size={17} />}
                      </button>
                    );
                  })}
                </div>
                {selectedAnswer !== null && (
                  <div className={`world-explanation ${isCorrect ? 'is-right' : 'is-learning'}`} role="status" aria-live="polite">
                    <span>{isCorrect ? <Check size={18} /> : <Sparkles size={18} />}</span>
                    <div><strong>{isCorrect ? '¡Exacto, gran descubrimiento!' : '¡Buen intento! Aquí va la pista.'}</strong><p>{question.explanation}</p></div>
                  </div>
                )}
                {selectedAnswer !== null && (
                  <div className="world-question-footer">
                    <span>{isCorrect ? 'Un acierto más en tu mapa.' : 'Cada intento ayuda a aprender.'}</span>
                    <button type="button" className="world-action" onClick={nextQuestion} data-testid={`button-next-${world.id}`}>
                      {index === world.questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'} <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </article>
      </div>
    </section>
  );
}

export default SubjectLearning;
