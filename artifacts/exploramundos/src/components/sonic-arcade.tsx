import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Heart,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import './sonic-arcade.css';

type PlayMode = 'race' | 'memory';
type RaceLength = 5 | 10;

type MultiplicationQuestion = {
  left: number;
  right: number;
  answer: number;
  choices: number[];
};

type MemoryCard = {
  id: string;
  pairId: string;
  face: string;
};

const tables = Array.from({ length: 11 }, (_, index) => index + 2);

const characters = [
  {
    name: 'Sonic',
    species: 'Erizo azul',
    image: '/images/sonic.svg',
    theme: 'sonic-character-blue',
    description: 'Es el héroe de los videojuegos y es famoso por correr a gran velocidad.',
    fact: 'Su color azul y sus zapatillas rojas son parte de su aspecto más conocido.',
  },
  {
    name: 'Tails',
    species: 'Zorro de dos colas',
    image: '/images/tails.svg',
    theme: 'sonic-character-gold',
    description: 'Es amigo de Sonic y usa sus dos colas para volar.',
    fact: 'También es un inventor muy hábil: le encanta construir máquinas.',
  },
  {
    name: 'Knuckles',
    species: 'Equidna rojo',
    image: '/images/knuckles.svg',
    theme: 'sonic-character-red',
    description: 'Es fuerte y protege la Esmeralda Maestra.',
    fact: 'Puede escalar paredes rocosas usando sus nudillos.',
  },
  {
    name: 'Amy Rose',
    species: 'Eriza rosa',
    image: '/images/amy.svg',
    theme: 'sonic-character-pink',
    description: 'Es una aventurera decidida que siempre está lista para ayudar.',
    fact: 'Su martillo se llama Piko Piko Hammer.',
  },
];

function shuffle<T>(items: T[]) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function makeQuestion(table: number): MultiplicationQuestion {
  const right = Math.floor(Math.random() * 12) + 1;
  const answer = table * right;
  const options = new Set([answer]);

  for (const candidate of [
    answer + table,
    answer - table,
    answer + table * 2,
    answer + 1,
    answer + table * 3,
    answer - 1,
  ]) {
    if (candidate > 0 && candidate !== answer) options.add(candidate);
    if (options.size === 4) break;
  }

  let extra = answer + 2;
  while (options.size < 4) {
    if (extra !== answer && extra > 0) options.add(extra);
    extra += 1;
  }

  return { left: table, right, answer, choices: shuffle(Array.from(options)) };
}

function makeMemoryDeck(table: number): MemoryCard[] {
  const pairs = [2, 3, 4, 5].flatMap((factor) => {
    const pairId = `pair-${factor}`;
    return [
      { id: `${pairId}-equation`, pairId, face: `${table} × ${factor}` },
      { id: `${pairId}-answer`, pairId, face: String(table * factor) },
    ];
  });
  return shuffle(pairs);
}

export function SonicArcade() {
  const [mode, setMode] = useState<PlayMode>('race');
  const [table, setTable] = useState(7);
  const [raceLength, setRaceLength] = useState<RaceLength>(10);
  const [raceActive, setRaceActive] = useState(false);
  const [raceDone, setRaceDone] = useState(false);
  const [raceQuestion, setRaceQuestion] = useState<MultiplicationQuestion | null>(null);
  const [raceRound, setRaceRound] = useState(1);
  const [raceLives, setRaceLives] = useState(3);
  const [rings, setRings] = useState(0);
  const [raceSelection, setRaceSelection] = useState<number | null>(null);

  const [memoryDeck, setMemoryDeck] = useState<MemoryCard[]>(() => makeMemoryDeck(7));
  const [memoryRevealed, setMemoryRevealed] = useState<string[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<string[]>([]);
  const [memoryMismatch, setMemoryMismatch] = useState(false);
  const [memoryMoves, setMemoryMoves] = useState(0);

  const startRace = () => {
    setRaceQuestion(makeQuestion(table));
    setRaceRound(1);
    setRaceLives(3);
    setRings(0);
    setRaceSelection(null);
    setRaceDone(false);
    setRaceActive(true);
  };

  const answerRace = (answer: number) => {
    if (!raceQuestion || raceSelection !== null || raceDone) return;
    const correct = answer === raceQuestion.answer;
    const nextLives = correct ? raceLives : Math.max(0, raceLives - 1);

    setRaceSelection(answer);
    setRaceLives(nextLives);
    if (correct) setRings((current) => current + 1);
    if (raceRound >= raceLength || nextLives === 0) setRaceDone(true);
  };

  const nextRaceQuestion = () => {
    if (!raceQuestion || raceSelection === null || raceDone) return;
    setRaceRound((current) => current + 1);
    setRaceQuestion(makeQuestion(table));
    setRaceSelection(null);
  };

  const resetMemory = (nextTable = table) => {
    setMemoryDeck(makeMemoryDeck(nextTable));
    setMemoryRevealed([]);
    setMemoryMatched([]);
    setMemoryMismatch(false);
    setMemoryMoves(0);
  };

  const changeTable = (value: string) => {
    const nextTable = Number(value);
    if (!tables.includes(nextTable)) return;
    setTable(nextTable);
    setRaceActive(false);
    setRaceDone(false);
    setRaceQuestion(null);
    setRaceRound(1);
    setRaceLives(3);
    setRings(0);
    setRaceSelection(null);
    resetMemory(nextTable);
  };

  const flipMemoryCard = (card: MemoryCard) => {
    if (memoryMatched.includes(card.pairId) || memoryRevealed.includes(card.id)) return;
    if (memoryMatched.length === 4) return;

    if (memoryMismatch) {
      setMemoryRevealed([card.id]);
      setMemoryMismatch(false);
      return;
    }

    if (memoryRevealed.length === 0) {
      setMemoryRevealed([card.id]);
      return;
    }

    const firstCard = memoryDeck.find((item) => item.id === memoryRevealed[0]);
    if (!firstCard) return;
    setMemoryMoves((moves) => moves + 1);

    if (firstCard.pairId === card.pairId) {
      setMemoryMatched((matched) => [...matched, card.pairId]);
      setMemoryRevealed([]);
    } else {
      setMemoryRevealed((revealed) => [...revealed, card.id]);
      setMemoryMismatch(true);
    }
  };

  const selectedRaceIsCorrect =
    raceQuestion !== null && raceSelection === raceQuestion.answer;
  const memoryComplete = memoryMatched.length === 4;
  const raceProgress = Math.round((rings / raceLength) * 100);

  return (
    <section className="sonic-zone" id="sonic" aria-labelledby="sonic-title">
      <div className="sonic-hero">
        <div className="sonic-hero-copy">
          <span className="sonic-kicker"><span className="sonic-ring-dot" /> Zona de velocidad</span>
          <h2 id="sonic-title">¡Corre, piensa y <span>multiplica!</span></h2>
          <p>
            Sonic es un erizo azul de los videojuegos, conocido por su velocidad.
            Ayúdalo a cruzar la pista resolviendo las tablas y gana anillos en cada acierto.
          </p>
          <a className="sonic-start-link" href="#sonic-games">
            Entrar a la pista <ArrowRight size={17} />
          </a>
          <div className="sonic-hero-stats" aria-label="Cómo se juega">
            <span><Zap size={15} /> Tablas del 2 al 12</span>
            <span><Heart size={15} /> 3 oportunidades</span>
            <span><Sparkles size={15} /> Anillos por acierto</span>
          </div>
        </div>
        <div className="sonic-track-art" aria-hidden="true">
          <div className="sonic-speed-line speed-line-one" />
          <div className="sonic-speed-line speed-line-two" />
          <div className="sonic-speed-line speed-line-three" />
          <div className="sonic-orb"><span>S</span></div>
          <div className="sonic-art-ring ring-one" />
          <div className="sonic-art-ring ring-two" />
          <div className="sonic-art-ring ring-three" />
          <div className="sonic-art-label">¡A toda velocidad!</div>
        </div>
      </div>

      <div className="sonic-learning-path" aria-label="Pasos de la aventura">
        <div className="sonic-learning-step">
          <span>01</span>
          <div><strong>Elige una tabla</strong><small>Practica del 2 al 12.</small></div>
        </div>
        <div className="sonic-learning-step">
          <span>02</span>
          <div><strong>Resuelve el reto</strong><small>Piensa antes de elegir.</small></div>
        </div>
        <div className="sonic-learning-step">
          <span>03</span>
          <div><strong>Consigue anillos</strong><small>Cada acierto te acerca a la meta.</small></div>
        </div>
      </div>

      <div className="sonic-arcade-heading" id="sonic-games">
        <div>
          <p className="sonic-section-kicker">Arcade de multiplicación</p>
          <h3>Escoge tu forma de jugar</h3>
          <p>Practica la misma tabla de dos maneras: con una carrera o con un memorama.</p>
        </div>
        <div className="sonic-table-select">
          <label htmlFor="sonic-table">Tabla de multiplicar</label>
          <select id="sonic-table" value={table} onChange={(event) => changeTable(event.currentTarget.value)}>
            {tables.map((number) => <option value={number} key={number}>Tabla del {number}</option>)}
          </select>
        </div>
      </div>

      <div className="sonic-arcade-card">
        <div className="sonic-mode-tabs" role="tablist" aria-label="Modos de multiplicación">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'race'}
            aria-controls="sonic-mode-panel"
            className={mode === 'race' ? 'is-selected' : ''}
            onClick={() => setMode('race')}
          >
            <Zap size={17} /> Carrera de anillos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'memory'}
            aria-controls="sonic-mode-panel"
            className={mode === 'memory' ? 'is-selected' : ''}
            onClick={() => setMode('memory')}
          >
            <Sparkles size={17} /> Memorama de tablas
          </button>
        </div>

        <div className="sonic-mode-panel" id="sonic-mode-panel" role="tabpanel">
          {mode === 'race' ? (
            <div className="sonic-race">
              <div className="sonic-race-head">
                <div>
                  <h4>La carrera multiplicadora</h4>
                  <p>Responde bien para recoger anillos. Tienes tres oportunidades.</p>
                </div>
                <div className="sonic-race-settings" aria-label="Duración de la carrera">
                  <span>Longitud</span>
                  <button type="button" className={raceLength === 5 ? 'active' : ''} disabled={raceActive && !raceDone} onClick={() => setRaceLength(5)}>5 saltos</button>
                  <button type="button" className={raceLength === 10 ? 'active' : ''} disabled={raceActive && !raceDone} onClick={() => setRaceLength(10)}>10 saltos</button>
                </div>
              </div>

              {raceActive && (
                <div className="sonic-race-status">
                  <span className="sonic-round-label">Salto {Math.min(raceRound, raceLength)} de {raceLength}</span>
                  <div className="sonic-race-progress" role="progressbar" aria-label="Anillos conseguidos" aria-valuemin={0} aria-valuemax={raceLength} aria-valuenow={rings}>
                    <span style={{ width: `${raceProgress}%` }} />
                  </div>
                  <span className="sonic-ring-count"><span className="sonic-mini-ring" /> {rings} / {raceLength}</span>
                  <span className="sonic-lives" aria-label={`${raceLives} oportunidades restantes`}>
                    {[0, 1, 2].map((life) => <Heart key={life} size={19} fill={life < raceLives ? 'currentColor' : 'none'} aria-hidden="true" />)}
                  </span>
                </div>
              )}

              {!raceActive ? (
                <div className="sonic-race-start">
                  <div className="sonic-equation-preview" aria-hidden="true">7 × 8 <span>= ?</span></div>
                  <div>
                    <strong>¿Listo para salir?</strong>
                    <p>Entrena la tabla del {table}. Elige 5 saltos para practicar o 10 para una carrera larga.</p>
                    <button type="button" className="sonic-primary-button" onClick={startRace}>
                      <Zap size={17} /> Empezar carrera
                    </button>
                  </div>
                </div>
              ) : raceQuestion ? (
                <div className="sonic-question-area">
                  <p className="sonic-question-prompt">
                    <span>¿Cuánto es?</span>
                    {raceQuestion.left} × {raceQuestion.right}
                  </p>
                  <div className="sonic-answer-grid" role="group" aria-label="Respuestas de la carrera">
                    {raceQuestion.choices.map((choice, index) => {
                      const isCorrectChoice = raceSelection !== null && choice === raceQuestion.answer;
                      const isWrongChoice = raceSelection === choice && !selectedRaceIsCorrect;
                      return (
                        <button
                          type="button"
                          className={`sonic-answer ${isCorrectChoice ? 'is-correct' : ''} ${isWrongChoice ? 'is-wrong' : ''}`}
                          key={`${choice}-${index}`}
                          onClick={() => answerRace(choice)}
                          disabled={raceSelection !== null}
                          aria-pressed={raceSelection === choice}
                        >
                          <span>{String.fromCharCode(65 + index)}</span>{choice}
                          {isCorrectChoice && <Check size={19} />}
                        </button>
                      );
                    })}
                  </div>

                  {raceSelection !== null && (
                    <div className={`sonic-answer-feedback ${selectedRaceIsCorrect ? 'is-good' : 'is-try'}`} role="status" aria-live="polite">
                      {selectedRaceIsCorrect ? <Trophy size={21} /> : <Lightbulb size={21} />}
                      <div>
                        <strong>{selectedRaceIsCorrect ? '¡Anillo conseguido!' : '¡Sigue intentando!'}</strong>
                        <span>
                          {selectedRaceIsCorrect
                            ? `${raceQuestion.left} grupos de ${raceQuestion.right} son ${raceQuestion.answer}.`
                            : `${raceQuestion.left} × ${raceQuestion.right} = ${raceQuestion.answer}. Multiplicar es sumar grupos iguales.`}
                        </span>
                      </div>
                    </div>
                  )}

                  {raceSelection !== null && !raceDone && (
                    <button type="button" className="sonic-next-button" onClick={nextRaceQuestion}>
                      Siguiente salto <ArrowRight size={17} />
                    </button>
                  )}
                  {raceDone && (
                    <div className={`sonic-race-result ${raceLives > 0 ? 'race-won' : 'race-paused'}`}>
                      <div>
                        <strong>{raceLives > 0 ? '¡Llegaste a la meta!' : '¡Pausa de carrera!'}</strong>
                        <span>{raceLives > 0 ? `Recogiste ${rings} anillos en la tabla del ${table}.` : `Recogiste ${rings} anillos. Puedes practicar y volver a intentarlo.`}</span>
                      </div>
                      <button type="button" className="sonic-primary-button" onClick={startRace}>
                        <RotateCcw size={16} /> Correr otra vez
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="sonic-memory">
              <div className="sonic-memory-head">
                <div>
                  <h4>Memorama de multiplicaciones</h4>
                  <p>Voltea una operación y su resultado. Encuentra las cuatro parejas de la tabla del {table}.</p>
                </div>
                <div className="sonic-memory-counts">
                  <span>Parejas <strong>{memoryMatched.length} / 4</strong></span>
                  <span>Intentos <strong>{memoryMoves}</strong></span>
                  <button type="button" className="sonic-restart-button" onClick={() => resetMemory()} aria-label="Reiniciar memorama">
                    <RotateCcw size={17} /> Reiniciar
                  </button>
                </div>
              </div>
              <div className="sonic-memory-grid" role="group" aria-label={`Memorama de la tabla del ${table}`}>
                {memoryDeck.map((card, index) => {
                  const matched = memoryMatched.includes(card.pairId);
                  const revealed = memoryRevealed.includes(card.id);
                  return (
                    <button
                      type="button"
                      className={`sonic-memory-card ${revealed || matched ? 'is-open' : ''} ${matched ? 'is-matched' : ''}`}
                      key={card.id}
                      onClick={() => flipMemoryCard(card)}
                      aria-label={revealed || matched ? `Tarjeta ${index + 1}: ${card.face}${matched ? ', pareja encontrada' : ''}` : `Tarjeta ${index + 1}, oculta`}
                      aria-pressed={revealed || matched}
                    >
                      <span className="memory-card-back" aria-hidden="true">?</span>
                      <span className="memory-card-face">{card.face}</span>
                    </button>
                  );
                })}
              </div>
              {memoryMismatch && <p className="sonic-memory-hint" role="status">No coinciden. Toca otra tarjeta para continuar buscando.</p>}
              {memoryComplete && (
                <div className="sonic-memory-win" role="status" aria-live="polite">
                  <Trophy size={20} />
                  <span><strong>¡Memorama completo!</strong> Encontraste las cuatro parejas en {memoryMoves} intentos.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="sonic-character-section" aria-labelledby="sonic-characters-title">
        <div className="sonic-character-heading">
          <div>
            <p className="sonic-section-kicker">El equipo de la aventura</p>
            <h3 id="sonic-characters-title">¿Quién es quién?</h3>
            <p>Conoce a los personajes de los videojuegos de Sonic the Hedgehog.</p>
          </div>
          <span className="sonic-fact-pill"><Lightbulb size={16} /> Lee sus pistas</span>
        </div>
        <div className="sonic-character-grid">
          {characters.map((character) => (
            <article className={`sonic-character-card ${character.theme}`} key={character.name}>
              <div className="sonic-character-top">
                <span className="sonic-character-avatar"><img src={character.image} alt={`Ilustración de ${character.name}`} /></span>
                <div><h4>{character.name}</h4><span>{character.species}</span></div>
              </div>
              <p>{character.description}</p>
              <details>
                <summary>Descubrir un dato</summary>
                <p>{character.fact}</p>
              </details>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default SonicArcade;
