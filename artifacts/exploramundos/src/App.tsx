import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Atom,
  BadgeCheck,
  BookOpen,
  Check,
  CircleHelp,
  Compass,
  FlaskConical,
  Leaf,
  Lightbulb,
  Orbit,
  RotateCcw,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import SonicArcade from '@/components/sonic-arcade';
import SubjectLearning from '@/components/subject-learning';

type GameId = 'math' | 'words' | 'eco' | 'energy';
type ChoiceQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  hint?: string;
};

const games: { id: GameId; title: string; short: string; detail: string; Icon: typeof Atom }[] = [
  { id: 'math', title: 'Misión Matemática', short: 'Números en órbita', detail: 'Resuelve el reto y descubre cuánto sabes.', Icon: Atom },
  { id: 'words', title: 'Palabras Viajeras', short: 'Pistas para leer', detail: 'Lee con atención. Una palabra te espera.', Icon: BookOpen },
  { id: 'eco', title: 'Guardianes del Planeta', short: 'Ciencia y naturaleza', detail: 'Elige una acción que cuide nuestro mundo.', Icon: Leaf },
  { id: 'energy', title: 'Laboratorio de Energía', short: 'Calcula en kWh', detail: 'Explora cuánta energía usa un equipo.', Icon: FlaskConical },
];

const challenges: Record<'math' | 'words' | 'eco', ChoiceQuestion[]> = {
  math: [
    { prompt: '¿Cuánto es 48 + 27?', options: ['65', '75', '85', '74'], answer: 1, explanation: '48 + 20 = 68, y 68 + 7 = 75.' },
    { prompt: 'Una caja tiene 6 filas con 8 semillas en cada fila. ¿Cuántas semillas hay?', options: ['42', '48', '56', '14'], answer: 1, explanation: 'Seis grupos de ocho: 6 × 8 = 48 semillas.' },
    { prompt: '¿Cuánto es 144 ÷ 12?', options: ['10', '11', '12', '14'], answer: 2, explanation: 'Como 12 × 12 = 144, el resultado es 12.' },
    { prompt: 'Una caminata mide 2,5 km. ¿Cuántos metros son?', options: ['250 m', '2.050 m', '2.500 m', '25.000 m'], answer: 2, explanation: 'Un kilómetro tiene 1.000 metros: 2,5 × 1.000 = 2.500.' },
    { prompt: '¿Cuál es el perímetro de un rectángulo de 7 cm por 4 cm?', options: ['11 cm', '22 cm', '28 cm', '18 cm'], answer: 1, explanation: 'El perímetro suma los cuatro lados: 7 + 4 + 7 + 4 = 22 cm.' },
    { prompt: '¿Cuánto es ¾ de 20?', options: ['5', '12', '15', '16'], answer: 2, explanation: '20 ÷ 4 = 5 y 5 × 3 = 15.' },
  ],
  words: [
    { prompt: '¿Qué palabra nombra a un animal que tiene ocho brazos y vive en el mar?', options: ['Estrella', 'Pulpo', 'Delfín', 'Tortuga'], answer: 1, explanation: 'El pulpo es un animal marino con ocho brazos.', hint: 'Pista: empieza con P y puede esconderse entre las rocas.' },
    { prompt: 'Completa la frase: La abeja visita la flor para recoger…', options: ['miel', 'néctar', 'hojas', 'arena'], answer: 1, explanation: 'Las abejas recogen néctar de las flores y lo llevan a la colmena.', hint: 'Pista: es un líquido dulce que producen las flores.' },
    { prompt: '¿Cuál es el antónimo de “oscuro”?', options: ['Nublado', 'Negro', 'Claro', 'Lejano'], answer: 2, explanation: '“Claro” expresa lo contrario de “oscuro”.', hint: 'Pista: así está el cielo cuando brilla el sol.' },
    { prompt: '¿Qué palabra está escrita correctamente?', options: ['Explorazión', 'Exploración', 'Explorasión', 'Esploración'], answer: 1, explanation: 'Se escribe exploración, con x y con c antes de i.', hint: 'Pista: ¡es justo lo que haces en cada misión!' },
    { prompt: 'En “El pequeño zorro cruzó el bosque”, ¿qué palabra describe al zorro?', options: ['cruzó', 'bosque', 'pequeño', 'el'], answer: 2, explanation: '“Pequeño” describe cómo es el zorro; es un adjetivo.', hint: 'Pista: responde a la pregunta “¿cómo es?”.' },
  ],
  eco: [
    { prompt: 'Al salir de una habitación con luz natural, ¿qué acción ayuda a ahorrar energía?', options: ['Dejar la luz encendida', 'Apagar la luz', 'Abrir otra lámpara', 'Cubrir la ventana'], answer: 1, explanation: 'Apagar las luces que no necesitamos reduce el consumo de energía.' },
    { prompt: '¿Qué podemos hacer con una botella limpia para evitar que se convierta en basura?', options: ['Enterrarla en el jardín', 'Arrojarla al río', 'Llevarla al reciclaje', 'Dejarla en la calle'], answer: 2, explanation: 'Separar y reciclar materiales ayuda a darles un nuevo uso y evita contaminar.' },
    { prompt: '¿Qué necesita una planta para crecer saludable?', options: ['Agua y luz del sol', 'Humo y plástico', 'Pintura y papel', 'Ruido y metal'], answer: 0, explanation: 'El agua, la luz solar, el aire y el suelo aportan lo que la planta necesita.' },
    { prompt: 'Ves un grifo goteando en la escuela. ¿Qué haces?', options: ['Lo dejas así', 'Avisas a una persona adulta', 'Lo abres más', 'Juegas con el agua'], answer: 1, explanation: 'Avisar permite reparar la fuga y evitar que se desperdicie agua.' },
    { prompt: '¿Cuál de estas fuentes se renueva naturalmente?', options: ['Viento', 'Carbón', 'Gasolina', 'Petróleo'], answer: 0, explanation: 'El viento se renueva de forma natural y puede generar electricidad.' },
  ],
};

function App() {
  const [activeGame, setActiveGame] = useState<GameId>('math');
  const [indices, setIndices] = useState<Record<'math' | 'words' | 'eco', number>>({ math: 0, words: 0, eco: 0 });
  const [answers, setAnswers] = useState<Record<'math' | 'words' | 'eco', number | null>>({ math: null, words: null, eco: null });
  const [scores, setScores] = useState<Record<GameId, number>>({ math: 0, words: 0, eco: 0, energy: 0 });
  const [energyInputs, setEnergyInputs] = useState({ watts: '', hours: '', days: '' });
  const [energyResult, setEnergyResult] = useState<{ kwh: number; level: 'BAJO' | 'MEDIO' | 'ALTO' } | null>(null);
  const [energyError, setEnergyError] = useState('');

  useEffect(() => {
    document.title = 'El Club de los ExploraMundos | Aprende jugando';
    document.documentElement.lang = 'es';
    const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', 'Aprende jugando con 8 materias escolares: matemáticas, lengua, ciencias, sociales, inglés, tecnología, arte y vida saludable.');
    if (!description.parentElement) document.head.appendChild(description);
  }, []);

  const selectGame = (id: GameId) => {
    setActiveGame(id);
    window.setTimeout(() => document.getElementById('juego')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const answerQuestion = (choice: number) => {
    if (activeGame === 'energy' || answers[activeGame] !== null) return;
    const game = activeGame;
    const question = challenges[game][indices[game]];
    setAnswers((current) => ({ ...current, [game]: choice }));
    if (choice === question.answer) setScores((current) => ({ ...current, [game]: current[game] + 1 }));
  };

  const nextQuestion = () => {
    if (activeGame === 'energy') return;
    const game = activeGame;
    setIndices((current) => ({ ...current, [game]: (current[game] + 1) % challenges[game].length }));
    setAnswers((current) => ({ ...current, [game]: null }));
  };

  const calculateEnergy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const watts = Number(energyInputs.watts);
    const hours = Number(energyInputs.hours);
    const days = Number(energyInputs.days);
    if (!energyInputs.watts.trim() || !energyInputs.hours.trim() || !energyInputs.days.trim()) {
      setEnergyError('Completa los tres campos para calcular el consumo.');
      setEnergyResult(null);
      return;
    }
    if (![watts, hours, days].every(Number.isFinite) || watts <= 0 || hours <= 0 || days <= 0 || hours > 24 || days > 31) {
      setEnergyError('Usa valores mayores que cero. Las horas no pueden superar 24 y los días, 31.');
      setEnergyResult(null);
      return;
    }
    const kwh = (watts / 1000) * hours * days;
    const level = kwh < 100 ? 'BAJO' : kwh < 300 ? 'MEDIO' : 'ALTO';
    setEnergyError('');
    setEnergyResult({ kwh, level });
  };

  const clearEnergy = () => {
    setEnergyInputs({ watts: '', hours: '', days: '' });
    setEnergyResult(null);
    setEnergyError('');
  };

  const totalScore = scores.math + scores.words + scores.eco + scores.energy;
  const active = games.find((game) => game.id === activeGame)!;
  const ActiveIcon = active.Icon;
  const question = activeGame === 'energy' ? null : challenges[activeGame][indices[activeGame]];
  const selectedAnswer = activeGame === 'energy' ? null : answers[activeGame];
  const isCorrect = Boolean(question && selectedAnswer === question.answer);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="El Club de los ExploraMundos, inicio">
          <span className="brand-mark"><Compass size={23} strokeWidth={2.2} /></span>
          <span className="brand-name">ExploraMundos<span>Club de exploradores</span></span>
        </a>
        <nav className="topnav" aria-label="Navegación">
          <a href="#mundos">Materias</a>
          <a href="#misiones">Misiones</a>
          <a href="#sonic">Zona Sonic</a>
          <a href="#informacion">Información</a>
          <span className="score-pill" aria-live="polite"><Sparkles size={15} /> {totalScore} {totalScore === 1 ? 'acierto' : 'aciertos'}</span>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-mark" /> Tu próxima aventura empieza aquí</div>
            <h1 id="hero-title">El Club de los <span>ExploraMundos</span></h1>
            <p>Explora las materias de la escuela con retos, personajes y juegos para aprender paso a paso. Cada respuesta trae una idea nueva.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#mundos">Explorar materias <ArrowDown size={17} /></a>
              <span style={{ color: '#667a70', fontSize: 12, fontWeight: 600 }}>Ocho materias. Decenas de retos para explorar.</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit" />
            <div className="planet"><span className="planet-dot" /></div>
            <Orbit className="satellite" size={37} strokeWidth={1.7} />
            <Sparkles className="spark spark-one" size={25} />
            <Sparkles className="spark spark-two" size={20} />
            <span className="floating-label">Planeta curiosidad</span>
          </div>
        </section>

        <SubjectLearning />

        <SonicArcade />

        <section id="misiones" aria-labelledby="missions-title">
          <div className="mission-strip">
            <div><p className="section-kicker">Elige tu aventura</p><h2 id="missions-title">Cuatro misiones para explorar</h2></div>
            <p>Completa un reto y suma aciertos a tu marcador.</p>
          </div>
          <div className="game-grid" role="tablist" aria-label="Misiones de aprendizaje">
            {games.map(({ id, title, short, Icon }, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeGame === id}
                aria-controls="juego"
                className={`game-card ${activeGame === id ? 'is-active' : ''}`}
                onClick={() => selectGame(id)}
                key={id}
              >
                <span className="game-card-top"><span className="game-icon"><Icon size={21} /></span><span className="game-number">0{index + 1}</span></span>
                <strong>{title}</strong><small>{short}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="play-panel" id="juego" role="tabpanel" aria-label={active.title}>
          <div className="panel-head">
            <div className="panel-heading">
              <span className="game-icon"><ActiveIcon size={23} /></span>
              <div><h2>{active.title}</h2><p>{active.detail}</p></div>
            </div>
            <span className="score-tag">Aciertos: {scores[activeGame]}</span>
          </div>

          {question && activeGame !== 'energy' && (
            <div className="quiz-content" key={`${activeGame}-${indices[activeGame]}`}>
              <div className="question-meta">
                <span>Reto {indices[activeGame] + 1} de {challenges[activeGame].length}</span>
                <span className="progress-track" aria-label={`Progreso: ${indices[activeGame] + 1} de ${challenges[activeGame].length}`}><span style={{ width: `${((indices[activeGame] + 1) / challenges[activeGame].length) * 100}%` }} /></span>
                <span>{Math.round(((indices[activeGame] + 1) / challenges[activeGame].length) * 100)}%</span>
              </div>
              {question.hint && <p style={{ margin: '20px 0 -8px', color: '#718079', fontSize: 13 }}><CircleHelp size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />{question.hint}</p>}
              <h3 className="question-prompt">{activeGame === 'math' && <span className="math-line">PIENSA, PRUEBA Y RESUELVE</span>}{question.prompt}</h3>
              <div className="answer-grid" role="group" aria-label="Elige una respuesta">
                {question.options.map((option, index) => {
                  const correctOption = selectedAnswer !== null && index === question.answer;
                  const wrongSelected = selectedAnswer === index && !isCorrect;
                  return (
                    <button
                      type="button"
                      className={`answer-option ${correctOption ? 'correct' : ''} ${wrongSelected ? 'incorrect' : ''}`}
                      onClick={() => answerQuestion(index)}
                      disabled={selectedAnswer !== null}
                      aria-pressed={selectedAnswer === index}
                      key={`${option}-${index}`}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>{option}
                      {correctOption && <Check size={17} style={{ marginLeft: 'auto' }} />}
                      {wrongSelected && <X size={17} style={{ marginLeft: 'auto' }} />}
                    </button>
                  );
                })}
              </div>
              {selectedAnswer !== null && (
                <>
                  <div className={`feedback ${isCorrect ? 'good' : 'try-again'}`} role="status" aria-live="polite">
                    {isCorrect ? <BadgeCheck size={20} /> : <Lightbulb size={20} />}
                    <div><strong>{isCorrect ? '¡Muy bien! Respuesta correcta.' : '¡Buen intento! Cada reto enseña algo nuevo.'}</strong>{question.explanation}</div>
                  </div>
                  <div className="panel-actions">
                    <button type="button" className="button-primary" onClick={nextQuestion}>
                      {indices[activeGame] === challenges[activeGame].length - 1 ? 'Volver al primer reto' : 'Siguiente reto'} <ArrowRight size={17} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {activeGame === 'energy' && (
            <div className="energy-layout">
              <form className="energy-form" onSubmit={calculateEnergy} noValidate>
                <h3>Calcula el consumo mensual</h3>
                <p>Introduce los datos de un equipo eléctrico para estimar su consumo.</p>
                <div className="field-row">
                  <label htmlFor="watts">Potencia del equipo</label>
                  <div className="input-wrap"><input id="watts" type="number" inputMode="decimal" min="0.01" step="any" placeholder="Ej. 1000" value={energyInputs.watts} onChange={(event) => setEnergyInputs({ ...energyInputs, watts: event.target.value })} aria-describedby={energyError ? 'energy-error' : undefined} /><span className="input-suffix">W</span></div>
                </div>
                <div className="field-row">
                  <label htmlFor="hours">Horas de uso al día</label>
                  <div className="input-wrap"><input id="hours" type="number" inputMode="decimal" min="0.01" max="24" step="any" placeholder="Ej. 5" value={energyInputs.hours} onChange={(event) => setEnergyInputs({ ...energyInputs, hours: event.target.value })} aria-describedby={energyError ? 'energy-error' : undefined} /><span className="input-suffix">h / día</span></div>
                </div>
                <div className="field-row">
                  <label htmlFor="days">Días de uso al mes</label>
                  <div className="input-wrap"><input id="days" type="number" inputMode="decimal" min="0.01" max="31" step="any" placeholder="Ej. 30" value={energyInputs.days} onChange={(event) => setEnergyInputs({ ...energyInputs, days: event.target.value })} aria-describedby={energyError ? 'energy-error' : undefined} /><span className="input-suffix">días</span></div>
                </div>
                <div className="energy-buttons">
                  <button type="submit" className="button-primary"><Zap size={16} /> Calcular</button>
                  <button type="button" className="button-secondary" onClick={clearEnergy}><RotateCcw size={15} /> Limpiar</button>
                </div>
                {energyError && <div id="energy-error" className="energy-error" role="alert">{energyError}</div>}
                {energyResult && (
                  <div className="energy-result" role="status" aria-live="polite">
                    <div className="result-top"><div><small>Consumo mensual</small><p className="result-value">{energyResult.kwh.toFixed(2)} <span style={{ fontSize: 16 }}>kWh</span></p></div><span className={`level-badge level-${energyResult.level.toLowerCase()}`}>Nivel {energyResult.level}</span></div>
                    <p className="result-note">{energyResult.level === 'BAJO' ? 'Consumo bajo: menos de 100 kWh al mes.' : energyResult.level === 'MEDIO' ? 'Consumo medio: desde 100 y menos de 300 kWh al mes.' : 'Consumo alto: 300 kWh al mes o más.'}</p>
                  </div>
                )}
              </form>
              <aside className="formula-box" aria-label="Fórmula de consumo mensual">
                <h3>La fórmula del laboratorio</h3>
                <p>Primero convierte los watts a kilowatts. Luego multiplica por el tiempo de uso.</p>
                <div className="formula">kWh al mes = (W ÷ 1000)<br />× horas al día × días al mes</div>
                <div className="formula-foot"><Lightbulb size={17} /> Por ejemplo: 1.000 W durante 5 horas diarias por 30 días = 150 kWh al mes.</div>
                {energyResult && <div className="formula-foot" style={{ marginTop: 15 }}><Check size={16} /> El nivel se clasifica como BAJO si es menor que 100, MEDIO si es menor que 300 y ALTO desde 300 kWh.</div>}
              </aside>
            </div>
          )}
        </section>

        <section className="about" id="informacion" aria-labelledby="about-heading">
          <h2 id="about-heading">Información</h2>
          <div className="about-lines">Andrés Stiven Dávila insuasty<br />Laura Sofía Cuatis Marroñero<br />Grado 10-2</div>
        </section>
      </main>
      <footer className="footer-note">Una pregunta puede abrir un mundo entero.</footer>
    </div>
  );
}

export default App;
