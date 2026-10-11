export type LearningQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type LearningConcept = {
  title: string;
  description: string;
};

export type LearningWorld = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  concepts: LearningConcept[];
  questions: LearningQuestion[];
};

export const learningWorlds: LearningWorld[] = [
  {
    id: 'matematicas',
    title: 'Matemáticas',
    subtitle: 'Números, formas y desafíos',
    description: 'Practica operaciones y descubre cómo las matemáticas aparecen en los juegos, las compras y las medidas.',
    topics: ['Multiplicación', 'División', 'Fracciones', 'Medidas', 'Geometría'],
    concepts: [
      { title: 'Multiplicar', description: 'Es sumar grupos iguales. Tres grupos de cuatro objetos son 3 × 4 = 12.' },
      { title: 'Dividir', description: 'Es repartir una cantidad en partes iguales. Si repartes 12 entre 3, recibes 4 en cada grupo.' },
      { title: 'Fracciones', description: 'Una fracción representa partes iguales de un todo: ½ es una de dos partes iguales.' },
      { title: 'Área', description: 'El área mide la superficie. En un rectángulo se calcula multiplicando largo × ancho y se expresa en unidades cuadradas.' },
    ],
    questions: [
      { prompt: 'Sonic recoge 8 anillos en cada vuelta. ¿Cuántos recoge en 7 vueltas?', options: ['49', '56', '54', '64'], answer: 1, explanation: 'Siete grupos de ocho: 7 × 8 = 56 anillos.' },
      { prompt: '¿Cuánto es 96 ÷ 8?', options: ['10', '11', '12', '14'], answer: 2, explanation: 'Como 8 × 12 = 96, al dividir 96 entre 8 obtenemos 12.' },
      { prompt: '¿Cuánto es ⅔ de 18?', options: ['6', '9', '12', '15'], answer: 2, explanation: 'Divide 18 en 3 partes: cada parte vale 6. Toma 2 partes: 6 × 2 = 12.' },
      { prompt: 'Un rectángulo mide 5 cm de largo y 4 cm de ancho. ¿Cuál es su área?', options: ['9 cm²', '20 cm²', '18 cm²', '10 cm²'], answer: 1, explanation: 'Área = largo × ancho: 5 × 4 = 20 cm².' },
      { prompt: 'Una mochila pesa 1,5 kg. ¿Cuántos gramos son?', options: ['150 g', '1.500 g', '15 g', '15.000 g'], answer: 1, explanation: 'Un kilogramo equivale a 1.000 gramos; 1,5 kg son 1.500 g.' },
    ],
  },
  {
    id: 'lengua',
    title: 'Lengua castellana',
    subtitle: 'Leer, escribir y expresarse',
    description: 'Explora cuentos, vocabulario, ortografía y las palabras que usamos para compartir ideas.',
    topics: ['Comprensión lectora', 'Verbos', 'Adjetivos', 'Ortografía', 'Puntuación'],
    concepts: [
      { title: 'Sustantivos', description: 'Nombran personas, animales, lugares o cosas: niña, zorro, escuela y libro.' },
      { title: 'Verbos', description: 'Expresan acciones o estados. En “Tails vuela alto”, la acción es vuela.' },
      { title: 'Adjetivos', description: 'Describen cómo es un sustantivo: rápido, azul, pequeño o valiente.' },
      { title: 'Signos de pregunta', description: 'En español usamos dos signos: ¿ al abrir una pregunta y ? al cerrarla.' },
    ],
    questions: [
      { prompt: 'En “Los amigos juegan en el parque”, ¿cuál es el verbo?', options: ['amigos', 'juegan', 'parque', 'los'], answer: 1, explanation: 'Juegan nombra la acción que realizan los amigos: es el verbo.' },
      { prompt: 'En “El zorro tiene una cola suave”, ¿qué palabra describe la cola?', options: ['zorro', 'tiene', 'una', 'suave'], answer: 3, explanation: 'Suave describe cómo es la cola; por eso es un adjetivo.' },
      { prompt: '¿Cuál palabra está escrita correctamente?', options: ['camion', 'camión', 'camíon', 'camionn'], answer: 1, explanation: 'Camión lleva tilde en la o porque es una palabra aguda terminada en n.' },
      { prompt: '¿Qué signo se escribe al comienzo de una pregunta en español?', options: ['?', '¿', '¡', '!'], answer: 1, explanation: 'Las preguntas en español se abren con ¿ y se cierran con ?.' },
      { prompt: 'Lee: “Luna plantó una semilla y la regó cada día. Después nació un brote”. ¿Qué hizo Luna cada día?', options: ['La cambió de matera', 'La pintó', 'La regó', 'La guardó'], answer: 2, explanation: 'El texto cuenta que Luna regó la semilla cada día para cuidarla.' },
    ],
  },
  {
    id: 'ciencias',
    title: 'Ciencias naturales',
    subtitle: 'El cuerpo, la vida y el universo',
    description: 'Investiga cómo viven los seres vivos, cómo funciona nuestro cuerpo y qué encontramos en el espacio.',
    topics: ['Sistema solar', 'Cuerpo humano', 'Plantas', 'Ecosistemas', 'Materia'],
    concepts: [
      { title: 'El sistema solar', description: 'El Sol es una estrella. Los planetas, incluida la Tierra, giran alrededor de él.' },
      { title: 'El corazón', description: 'El corazón impulsa la sangre por el cuerpo para llevar oxígeno y nutrientes.' },
      { title: 'Las plantas', description: 'Con luz, agua y aire, muchas plantas fabrican su alimento mediante la fotosíntesis.' },
      { title: 'Estados de la materia', description: 'El agua puede ser líquida, sólida como el hielo o gaseosa como el vapor.' },
    ],
    questions: [
      { prompt: '¿Qué estrella nos da luz y calor durante el día?', options: ['La Luna', 'El Sol', 'Marte', 'Venus'], answer: 1, explanation: 'El Sol es nuestra estrella y su energía hace posible la vida en la Tierra.' },
      { prompt: '¿Qué órgano bombea la sangre por el cuerpo?', options: ['Pulmón', 'Estómago', 'Corazón', 'Hígado'], answer: 2, explanation: 'El corazón se contrae y relaja para impulsar la sangre por los vasos sanguíneos.' },
      { prompt: '¿Qué necesita principalmente una planta para hacer fotosíntesis?', options: ['Luz, agua y aire', 'Plástico y arena', 'Hielo y oscuridad', 'Solo tierra seca'], answer: 0, explanation: 'La planta usa luz, agua y dióxido de carbono del aire para producir azúcares.' },
      { prompt: '¿Qué ocurre con el agua cuando se congela?', options: ['Se vuelve piedra', 'Pasa a estado sólido', 'Se convierte en metal', 'Desaparece'], answer: 1, explanation: 'Al enfriarse lo suficiente, el agua líquida se transforma en hielo, que es sólido.' },
      { prompt: 'En la cadena pasto → conejo → zorro, ¿quién es el productor?', options: ['El zorro', 'El conejo', 'El pasto', 'Todos son animales'], answer: 2, explanation: 'El pasto es una planta: produce su propio alimento usando la energía del Sol.' },
    ],
  },
  {
    id: 'sociales',
    title: 'Ciencias sociales',
    subtitle: 'Colombia, mapas e historia',
    description: 'Conoce el país, interpreta mapas, descubre hechos del pasado y practica la convivencia.',
    topics: ['Geografía de Colombia', 'Mapas', 'Historia', 'Regiones', 'Ciudadanía'],
    concepts: [
      { title: 'Colombia', description: 'Colombia está en América del Sur y su capital es Bogotá.' },
      { title: 'Regiones naturales', description: 'El país tiene seis regiones naturales: Andina, Caribe, Pacífica, Orinoquía, Amazonía e Insular.' },
      { title: 'Orientación', description: 'En muchos mapas, la letra N indica el norte. La rosa de los vientos ayuda a orientarse.' },
      { title: 'Convivencia', description: 'Escuchar turnos, cuidar los espacios compartidos y respetar diferencias mejora la vida en comunidad.' },
    ],
    questions: [
      { prompt: '¿Cuál es la capital de Colombia?', options: ['Cali', 'Bogotá', 'Medellín', 'Cartagena'], answer: 1, explanation: 'Bogotá es la capital de Colombia y está ubicada en la región Andina.' },
      { prompt: '¿Cuántas regiones naturales tiene Colombia?', options: ['Tres', 'Cuatro', 'Seis', 'Ocho'], answer: 2, explanation: 'Son seis: Andina, Caribe, Pacífica, Orinoquía, Amazonía e Insular.' },
      { prompt: 'En una brújula, ¿qué punto cardinal representa la letra N?', options: ['Norte', 'Sur', 'Este', 'Oeste'], answer: 0, explanation: 'La letra N señala el norte, uno de los cuatro puntos cardinales.' },
      { prompt: '¿Qué hecho se recuerda en Colombia el 20 de julio?', options: ['La fundación de Bogotá', 'El Grito de Independencia de 1810', 'La llegada del primer tren', 'El descubrimiento del río Magdalena'], answer: 1, explanation: 'El 20 de julio se conmemora el Grito de Independencia de 1810.' },
      { prompt: '¿Cuál es una forma respetuosa de resolver un desacuerdo en el salón?', options: ['Interrumpir a todos', 'Escuchar y explicar las ideas con calma', 'Esconder los materiales', 'Gritar más fuerte'], answer: 1, explanation: 'Escuchar y hablar con respeto ayuda a buscar una solución entre todos.' },
    ],
  },
  {
    id: 'ingles',
    title: 'Inglés',
    subtitle: 'Palabras para explorar el mundo',
    description: 'Aprende saludos, colores y frases sencillas para comunicarte en otro idioma.',
    topics: ['Saludos', 'Colores', 'Animales', 'Frases', 'Plural'],
    concepts: [
      { title: 'Saludar', description: 'Good morning significa “buenos días”. Hello es una forma común de decir “hola”.' },
      { title: 'Colores', description: 'Blue es azul, red es rojo y green es verde.' },
      { title: 'Decir tu edad', description: '“I am ten years old” significa “Tengo diez años”.' },
      { title: 'Plural', description: 'En muchos sustantivos, añadir s forma el plural: book → books.' },
    ],
    questions: [
      { prompt: '¿Qué significa “book” en español?', options: ['Libro', 'Mesa', 'Ventana', 'Zapato'], answer: 0, explanation: 'Book significa libro. Puedes decir “a book” para hablar de un libro.' },
      { prompt: '¿Qué color significa “green”?', options: ['Azul', 'Verde', 'Amarillo', 'Rojo'], answer: 1, explanation: 'Green significa verde en español.' },
      { prompt: '¿Cómo se dice “buenos días” en inglés?', options: ['Good night', 'Good morning', 'Good bye', 'Thank you'], answer: 1, explanation: 'Good morning se usa para saludar por la mañana.' },
      { prompt: '¿Qué significa “I am ten years old”?', options: ['Tengo diez años', 'Tengo diez libros', 'Vivo en una casa', 'Me gusta correr'], answer: 0, explanation: 'I am ten years old expresa la edad: “Tengo diez años”.' },
      { prompt: '¿Cuál es el plural más común de “cat”?', options: ['cates', 'caties', 'cats', 'cat'], answer: 2, explanation: 'A muchos sustantivos en inglés se les añade s: one cat, two cats.' },
    ],
  },
  {
    id: 'tecnologia',
    title: 'Tecnología',
    subtitle: 'Lógica, inventos y seguridad digital',
    description: 'Descubre cómo dar instrucciones claras, resolver problemas y cuidarte cuando navegas.',
    topics: ['Algoritmos', 'Secuencias', 'Dispositivos', 'Internet seguro', 'Depuración'],
    concepts: [
      { title: 'Algoritmo', description: 'Es una lista ordenada de pasos que permite completar una tarea o resolver un problema.' },
      { title: 'Repetir', description: 'Un ciclo permite repetir instrucciones. Por ejemplo, dar tres saltos puede escribirse como “repetir 3 veces”.' },
      { title: 'Entrada y salida', description: 'El teclado sirve para ingresar información; la pantalla muestra información como salida.' },
      { title: 'Seguridad digital', description: 'No compartas contraseñas, dirección ni datos personales con desconocidos en internet.' },
    ],
    questions: [
      { prompt: '¿Qué es un algoritmo?', options: ['Una lista ordenada de pasos', 'Una pieza de fruta', 'Un tipo de pantalla', 'Una contraseña'], answer: 0, explanation: 'Un algoritmo describe pasos ordenados para completar una tarea.' },
      { prompt: 'En programación, ¿qué hace un ciclo que dice “repetir 5 veces”?', options: ['Detiene el programa', 'Repite las instrucciones cinco veces', 'Borra la pantalla', 'Cambia el idioma'], answer: 1, explanation: 'Un ciclo repite un bloque de instrucciones la cantidad de veces indicada.' },
      { prompt: '¿Cuál de estos dispositivos suele mostrar información como salida?', options: ['Teclado', 'Micrófono', 'Pantalla', 'Ratón'], answer: 2, explanation: 'La pantalla presenta texto, imágenes y resultados del computador.' },
      { prompt: 'Alguien desconocido pide tu contraseña por un juego. ¿Qué haces?', options: ['Se la envías rápido', 'La publicas en el chat', 'No la compartes y avisas a una persona adulta', 'Usas la contraseña de un amigo'], answer: 2, explanation: 'Las contraseñas son privadas. Cuéntale a una persona adulta de confianza.' },
      { prompt: '¿Qué significa depurar un programa?', options: ['Buscar y corregir errores', 'Pintar el computador', 'Apagar el teclado', 'Aumentar el volumen'], answer: 0, explanation: 'Depurar es revisar el programa para encontrar y corregir errores.' },
    ],
  },
  {
    id: 'arte',
    title: 'Arte y música',
    subtitle: 'Colores, sonidos e imaginación',
    description: 'Explora las mezclas de color, las formas, los ritmos y las ideas que se pueden expresar creando.',
    topics: ['Colores primarios', 'Mezclas', 'Ritmo', 'Formas', 'Perspectiva'],
    concepts: [
      { title: 'Colores primarios', description: 'En la mezcla tradicional de pintura se enseñan como primarios el rojo, el amarillo y el azul.' },
      { title: 'Mezclar colores', description: 'Al mezclar pintura azul y amarilla se obtiene verde.' },
      { title: 'Ritmo', description: 'El ritmo organiza sonidos y silencios en patrones que podemos repetir o variar.' },
      { title: 'Perspectiva', description: 'En un dibujo, los objetos lejanos suelen representarse más pequeños que los cercanos.' },
    ],
    questions: [
      { prompt: '¿Cuáles son los colores primarios tradicionales de la pintura?', options: ['Verde, naranja y morado', 'Rojo, amarillo y azul', 'Negro, blanco y gris', 'Rosa, café y celeste'], answer: 1, explanation: 'En la mezcla tradicional de pintura se enseñan rojo, amarillo y azul como primarios.' },
      { prompt: '¿Qué color se forma al mezclar pintura azul y amarilla?', options: ['Verde', 'Naranja', 'Morado', 'Rojo'], answer: 0, explanation: 'Azul más amarillo produce verde en la mezcla tradicional de pigmentos.' },
      { prompt: '¿Qué organiza un ritmo musical?', options: ['Sonidos y silencios en el tiempo', 'Solo los colores', 'El tamaño de un dibujo', 'Las páginas de un libro'], answer: 0, explanation: 'El ritmo organiza sonidos y silencios en patrones que se sienten a lo largo del tiempo.' },
      { prompt: '¿Qué figura no tiene esquinas?', options: ['Triángulo', 'Cuadrado', 'Círculo', 'Rectángulo'], answer: 2, explanation: 'El círculo es una línea curva cerrada y no tiene esquinas.' },
      { prompt: 'En un dibujo con perspectiva, ¿cómo suele verse un objeto lejano?', options: ['Más pequeño', 'Más grande que todo', 'Sin color siempre', 'Con más esquinas'], answer: 0, explanation: 'Representar lo lejano más pequeño ayuda a crear sensación de profundidad.' },
    ],
  },
  {
    id: 'vida-saludable',
    title: 'Vida saludable y deporte',
    subtitle: 'Cuidar el cuerpo también es aprender',
    description: 'Conoce hábitos que ayudan a movernos, descansar, alimentarnos y jugar de forma segura.',
    topics: ['Movimiento', 'Hidratación', 'Descanso', 'Higiene', 'Juego en equipo'],
    concepts: [
      { title: 'Calentar', description: 'Moverse suavemente antes de hacer ejercicio prepara el cuerpo para la actividad.' },
      { title: 'Hidratarse', description: 'Tomar agua ayuda al cuerpo a reponer el líquido que pierde, especialmente al jugar y correr.' },
      { title: 'Descansar', description: 'Dormir lo suficiente ayuda al cuerpo y al cerebro a recuperarse y aprender.' },
      { title: 'Higiene', description: 'Lavarse las manos con agua y jabón ayuda a retirar suciedad y muchos microbios.' },
    ],
    questions: [
      { prompt: '¿Qué conviene hacer antes de correr o jugar un partido?', options: ['Quedarse quieto todo el día', 'Calentar con movimientos suaves', 'Comer muy rápido', 'Dejar de respirar'], answer: 1, explanation: 'Un calentamiento suave prepara los músculos para moverse.' },
      { prompt: 'Después de jugar bajo el sol, ¿qué ayuda a hidratarte?', options: ['Tomar agua', 'No beber nada', 'Comer una hoja', 'Apagar la luz'], answer: 0, explanation: 'El agua ayuda a reponer el líquido que el cuerpo pierde al moverse y sudar.' },
      { prompt: '¿Por qué es importante dormir bien?', options: ['El cuerpo y el cerebro descansan', 'El cuerpo deja de necesitar agua', 'Los libros se leen solos', 'Los músculos no vuelven a moverse'], answer: 0, explanation: 'El descanso favorece la recuperación del cuerpo y apoya la memoria y el aprendizaje.' },
      { prompt: '¿Qué se recomienda para lavar bien las manos?', options: ['Solo sacudirlas', 'Agua y jabón', 'Pintura y papel', 'Solo perfume'], answer: 1, explanation: 'Agua y jabón ayudan a limpiar las manos antes de comer y después de ir al baño.' },
      { prompt: '¿Qué hace un buen compañero durante un juego?', options: ['Respeta turnos y reglas', 'Esconde el balón', 'Se burla de los demás', 'No deja participar a nadie'], answer: 0, explanation: 'Respetar las reglas y a los compañeros hace que el juego sea seguro y divertido.' },
    ],
  },
];
