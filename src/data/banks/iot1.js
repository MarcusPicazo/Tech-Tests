/*
 * EXAMEN 1ro DE SECUNDARIA — Internet of Things (IoT) BASICO — 65 reactivos.
 * Para principiantes (~6 clases). Solo usa lo visto en la presentacion
 * "How everyday objects can become smart and connected": que es IoT, como
 * funciona (SENSOR -> INTERNET -> DATA -> ACTION), IoT a nuestro alrededor,
 * sensores, escuela inteligente y disenar un proyecto sencillo.
 * Sin microcontroladores, nube, actuadores ni otros temas avanzados.
 *
 *   Bloque  1  Power On            12  multiple-choice
 *   Bloque  2  Connect the Wires    8  wire-connect
 *   Bloque  3  Word Factory        10  sentence-builder
 *   Bloque  4  Guess the Gadget    10  word-guess
 *   Bloque  5  Fun Zone            13  fact-or-fake, sort-it, multiple-choice
 *   Bloque  6  Mission Challenge   12  sequence-order, gap-fill-bank, multiple-choice
 *
 * Los bloques agrupan por tipo; el alumno los ve MEZCLADOS (src/data/exams.js).
 *
 * Temas (topic): basics | how | devices | sensors | school | design
 * Esquema de cada tipo: ver src/lib/answers.js.
 */
export const topics = {
  basics: {
    es: 'Qué es IoT',
    hint: 'IoT conecta objetos cotidianos a Internet para que se comuniquen con otros dispositivos',
  },
  how: {
    es: 'Cómo funciona IoT',
    hint: 'el ciclo SENSOR → INTERNET → DATA → ACTION (ej. sensor de temperatura que enciende un ventilador)',
  },
  devices: {
    es: 'IoT a nuestro alrededor',
    hint: 'smartwatch, smart home, smart car, security camera y smartphone, y qué hace cada uno',
  },
  sensors: {
    es: 'Sensores',
    hint: 'los sensores son los "ojos y oídos" de IoT: temperatura, luz, movimiento, sonido, humedad y ubicación',
  },
  school: {
    es: 'Escuela inteligente',
    hint: 'smart lights, sensores de agua y de puertas, smart bin, smart garden y cómo hacen la escuela más segura y sostenible',
  },
  design: {
    es: 'Diseñar un proyecto IoT',
    hint: 'pensar en un problema de la escuela y resolverlo con OBJECT → SENSOR → INFORMATION → INTERNET → ACTION',
  },
};

export const sections = [
  { n: 1, name: 'Power On', icon: '⚡', blurb: "Easy warm-up questions. Let's switch on your brain!" },
  { n: 2, name: 'Connect the Wires', icon: '🔌', blurb: 'Tap a plug, then tap where it goes. You can also drag the cable!' },
  { n: 3, name: 'Word Factory', icon: '🧩', blurb: 'Put the words in the correct order to build a sentence.' },
  { n: 4, name: 'Guess the Gadget', icon: '🕵️', blurb: 'Read the clue and spell the secret word with the letter tiles.' },
  { n: 5, name: 'Fun Zone', icon: '🎮', blurb: 'Fact or fake? Sort it out! Relax and have fun — these still count.' },
  { n: 6, name: 'Mission Challenge', icon: '🚀', blurb: 'Real missions for a smart school. Use everything you know!' },
];

export const questions = [
  /* =============================================================== */
  /*  SECCION 1 — Power On — 12                                       */
  /* =============================================================== */
  {
    id: 'I1-01', section: 1, topic: 'basics', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🌐',
    content: 'What does IoT mean?',
    options: ['Internet of Things', 'Internet of Toys', 'Inside of Technology', 'Information on TV'],
    answer: 'Internet of Things',
  },
  {
    id: 'I1-02', section: 1, topic: 'basics', type: 'multiple-choice',
    prompt: 'Choose the best answer.',
    content: 'The normal Internet connects computers and phones. What does IoT connect too?',
    options: ['Everyday physical objects', 'Only video games', 'Only books', 'Only people'],
    answer: 'Everyday physical objects',
  },
  {
    id: 'I1-03', section: 1, topic: 'sensors', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '👀',
    content: 'Sensors are the "___" of IoT.',
    options: ['eyes and ears', 'hands and feet', 'wheels', 'batteries'],
    answer: 'eyes and ears',
  },
  {
    id: 'I1-04', section: 1, topic: 'devices', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '⌚',
    content: 'Which device tracks your steps and heart rate?',
    options: ['A smartwatch', 'A smart bin', 'A door sensor', 'A printer'],
    answer: 'A smartwatch',
  },
  {
    id: 'I1-05', section: 1, topic: 'sensors', type: 'multiple-choice',
    prompt: 'Choose the best answer.',
    content: 'What does a sensor do?',
    options: [
      'It detects something happening in the real world.',
      'It prints documents.',
      'It cleans the classroom.',
      'It charges the phone.',
    ],
    answer: 'It detects something happening in the real world.',
  },
  {
    id: 'I1-06', section: 1, topic: 'devices', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '📹',
    content: 'A security camera can detect ___.',
    options: ['movement', 'flavors', 'homework', 'music notes'],
    answer: 'movement',
  },
  {
    id: 'I1-07', section: 1, topic: 'school', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '💡',
    content: 'Smart lights turn off when ___.',
    options: ['nobody is in the room', 'it is lunchtime', 'the teacher sings', 'it rains'],
    answer: 'nobody is in the room',
  },
  {
    id: 'I1-08', section: 1, topic: 'basics', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🔎',
    content: 'Which one is a smart object?',
    options: ['A smart light', 'A paper book', 'A wooden spoon', 'A rock'],
    answer: 'A smart light',
  },
  {
    id: 'I1-09', section: 1, topic: 'devices', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🏠',
    content: 'A smart home can control ___.',
    options: ['lights and temperature', 'the weather outside', 'your dreams', 'the school bus'],
    answer: 'lights and temperature',
  },
  {
    id: 'I1-10', section: 1, topic: 'basics', type: 'multiple-choice',
    prompt: 'Choose the best answer.',
    content: 'More and more everyday objects can connect to the ___.',
    options: ['Internet', 'kitchen', 'bus stop', 'library'],
    answer: 'Internet',
  },
  {
    id: 'I1-11', section: 1, topic: 'sensors', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🌡️',
    content: 'A temperature sensor tells us if a room is ___.',
    options: ['hot or cold', 'big or small', 'old or new', 'happy or sad'],
    answer: 'hot or cold',
  },
  {
    id: 'I1-12', section: 1, topic: 'school', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🚿',
    content: 'A water sensor in the school bathroom can detect ___.',
    options: ['leaks', 'homework', 'music', 'friends'],
    answer: 'leaks',
  },

  /* =============================================================== */
  /*  SECCION 2 — Connect the Wires — 8                               */
  /* =============================================================== */
  {
    id: 'I1-13', section: 2, topic: 'devices', type: 'wire-connect',
    prompt: 'Connect each device to what it does.',
    pairs: [
      ['⌚ Smartwatch', 'Tracks steps and heart rate'],
      ['🏠 Smart home', 'Controls lights and temperature'],
      ['🚗 Smart car', 'Detects problems and location'],
      ['📹 Security camera', 'Detects movement'],
    ],
  },
  {
    id: 'I1-14', section: 2, topic: 'sensors', type: 'wire-connect',
    prompt: 'Connect each sensor to what it detects.',
    pairs: [
      ['🌡️ Temperature sensor', 'Hot or cold'],
      ['💡 Light sensor', 'Bright or dark'],
      ['🏃 Movement sensor', 'Someone walking'],
      ['🔊 Sound sensor', 'Noise'],
    ],
  },
  {
    id: 'I1-15', section: 2, topic: 'basics', type: 'wire-connect',
    prompt: 'Connect each word to its meaning.',
    pairs: [
      ['Smart object', 'An object connected to the Internet'],
      ['Sensor', 'Detects things in the real world'],
      ['App', 'Shows information on a phone'],
      ['Wi-Fi', 'Connects devices to the Internet'],
    ],
  },
  {
    id: 'I1-16', section: 2, topic: 'school', type: 'wire-connect',
    prompt: 'Connect each smart school object to what it does.',
    pairs: [
      ['💧 Water sensor', 'Detects leaks'],
      ['🚪 Door sensor', 'Detects open or closed doors'],
      ['📺 Smart display', 'Shows school information'],
      ['🗑️ Smart bin', 'Detects when it is full'],
    ],
  },
  {
    id: 'I1-17', section: 2, topic: 'how', type: 'wire-connect',
    prompt: 'Connect each step to the classroom example.',
    pairs: [
      ['SENSOR', 'A sensor detects a hot classroom'],
      ['INTERNET', 'The information travels online'],
      ['DATA', 'The system receives the information'],
      ['ACTION', 'A fan turns on automatically'],
    ],
  },
  {
    id: 'I1-18', section: 2, topic: 'sensors', type: 'wire-connect',
    prompt: 'Connect each word to its picture.',
    pairs: [
      ['Humidity', '💦'],
      ['Location', '📍'],
      ['Temperature', '🌡️'],
      ['Sound', '🔊'],
    ],
  },
  {
    id: 'I1-19', section: 2, topic: 'school', type: 'wire-connect',
    prompt: 'Connect each smart system to the problem it solves.',
    pairs: [
      ['🌱 Smart garden', 'Plants need water'],
      ['💡 Smart classroom', 'Lights are on and nobody is there'],
      ['🌡️ Environmental monitor', 'The room is too hot'],
      ['🚪 Smart door', 'A door is open at night'],
    ],
  },
  {
    id: 'I1-20', section: 2, topic: 'basics', type: 'wire-connect',
    prompt: 'Connect the beginning and the end of each sentence.',
    pairs: [
      ['IoT connects', 'everyday objects to the Internet.'],
      ['Smart devices', 'communicate with other devices.'],
      ['You may use IoT every day', 'without noticing it.'],
      ['IoT can help schools', 'become safer.'],
    ],
  },

  /* =============================================================== */
  /*  SECCION 3 — Word Factory — 10                                   */
  /* =============================================================== */
  {
    id: 'I1-21', section: 3, topic: 'sensors', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['A', 'sensor', 'detects', 'movement.'],
    answer: 'A sensor detects movement.',
  },
  {
    id: 'I1-22', section: 3, topic: 'how', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['The', 'fan', 'turns', 'on', 'automatically.'],
    answer: 'The fan turns on automatically.',
  },
  {
    id: 'I1-23', section: 3, topic: 'basics', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['IoT', 'connects', 'everyday', 'objects.'],
    answer: 'IoT connects everyday objects.',
  },
  {
    id: 'I1-24', section: 3, topic: 'devices', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['My', 'smartwatch', 'tracks', 'my', 'steps.'],
    answer: 'My smartwatch tracks my steps.',
  },
  {
    id: 'I1-25', section: 3, topic: 'school', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Smart', 'lights', 'save', 'energy.'],
    answer: 'Smart lights save energy.',
  },
  {
    id: 'I1-26', section: 3, topic: 'how', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['The', 'sensor', 'sends', 'the', 'information.'],
    answer: 'The sensor sends the information.',
  },
  {
    id: 'I1-27', section: 3, topic: 'devices', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['I', 'use', 'IoT', 'every', 'day.'],
    answer: 'I use IoT every day.',
  },
  {
    id: 'I1-28', section: 3, topic: 'school', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['The', 'water', 'sensor', 'detects', 'a', 'leak.'],
    answer: 'The water sensor detects a leak.',
  },
  {
    id: 'I1-29', section: 3, topic: 'devices', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['The', 'app', 'shows', 'the', 'information.'],
    answer: 'The app shows the information.',
  },
  {
    id: 'I1-30', section: 3, topic: 'sensors', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Sensors', 'collect', 'information.'],
    answer: 'Sensors collect information.',
  },

  /* =============================================================== */
  /*  SECCION 4 — Guess the Gadget — 10                               */
  /* =============================================================== */
  {
    id: 'I1-31', section: 4, topic: 'sensors', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '👂',
    content: 'I am the "eyes and ears" of IoT. I detect things in the real world. What am I?',
    answer: 'SENSOR', extra: 'TA',
  },
  {
    id: 'I1-32', section: 4, topic: 'devices', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '📱',
    content: 'You carry me in your pocket. I can control other connected devices. I am a smart…',
    answer: 'PHONE', extra: 'IL',
  },
  {
    id: 'I1-33', section: 4, topic: 'sensors', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🔥',
    content: 'A sensor measures me. I tell you if a room is hot or cold. What am I?',
    answer: 'TEMPERATURE', extra: 'S',
  },
  {
    id: 'I1-34', section: 4, topic: 'school', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🗑️',
    content: 'I am a smart … and I know when I am full of trash.',
    answer: 'BIN', extra: 'TA',
  },
  {
    id: 'I1-35', section: 4, topic: 'how', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '📊',
    content: 'Sensors collect me. I am information, like numbers: 24°C or 20 people.',
    answer: 'DATA', extra: 'OE',
  },
  {
    id: 'I1-36', section: 4, topic: 'basics', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '📶',
    content: 'I am an invisible connection. Devices use me to connect to the Internet without cables.',
    answer: 'WIFI', extra: 'EO',
  },
  {
    id: 'I1-37', section: 4, topic: 'school', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🌱',
    content: 'I am a smart … . My sensors know when the plants need water.',
    answer: 'GARDEN', extra: 'TL',
  },
  {
    id: 'I1-38', section: 4, topic: 'how', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🌀',
    content: 'The classroom is hot, so I turn on automatically. What am I?',
    answer: 'FAN', extra: 'OT',
  },
  {
    id: 'I1-39', section: 4, topic: 'devices', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🎥',
    content: 'I watch the door and detect movement. I am a security …',
    answer: 'CAMERA', extra: 'IS',
  },
  {
    id: 'I1-40', section: 4, topic: 'devices', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '📲',
    content: 'I live on your phone or tablet. I show the information from the sensors. What am I? (3 letters)',
    answer: 'APP', extra: 'OE',
  },

  /* =============================================================== */
  /*  SECCION 5 — Fun Zone — 13                                       */
  /* =============================================================== */
  {
    id: 'I1-41', section: 5, topic: 'basics', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🧦',
    content: 'Only computers and phones can connect to the Internet.',
    answer: 'Fake',
  },
  {
    id: 'I1-42', section: 5, topic: 'devices', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🤔',
    content: 'You may already use IoT every day without noticing it.',
    answer: 'Fact',
  },
  {
    id: 'I1-43', section: 5, topic: 'sensors', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🍕',
    content: 'A light sensor can tell you if your pizza is delicious.',
    answer: 'Fake',
  },
  {
    id: 'I1-44', section: 5, topic: 'school', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🏫',
    content: 'IoT can help schools become safer and more sustainable.',
    answer: 'Fact',
  },
  {
    id: 'I1-45', section: 5, topic: 'devices', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🚗',
    content: 'A smart car can detect problems and its location.',
    answer: 'Fact',
  },
  {
    id: 'I1-46', section: 5, topic: 'sensors', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🦖',
    content: 'Sensors were invented by dinosaurs to find food.',
    answer: 'Fake',
  },
  {
    id: 'I1-47', section: 5, topic: 'school', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🗑️',
    content: 'A smart bin can tell when it is full.',
    answer: 'Fact',
  },
  {
    id: 'I1-48', section: 5, topic: 'sensors', type: 'sort-it',
    prompt: 'Sort it! Is it a sensor or a smart device?',
    categories: [
      { name: 'Sensor', icon: '👀' },
      { name: 'Smart device', icon: '📱' },
    ],
    items: [
      ['Temperature sensor', 'Sensor'],
      ['Smartwatch', 'Smart device'],
      ['Movement sensor', 'Sensor'],
      ['Smartphone', 'Smart device'],
      ['Light sensor', 'Sensor'],
      ['Smart car', 'Smart device'],
    ],
  },
  {
    id: 'I1-49', section: 5, topic: 'basics', type: 'sort-it',
    prompt: 'Sort it! Can it be part of the Internet of Things?',
    categories: [
      { name: 'Connected', icon: '📶' },
      { name: 'Not connected', icon: '🚫' },
    ],
    items: [
      ['Smart light', 'Connected'],
      ['Paper notebook', 'Not connected'],
      ['Security camera', 'Connected'],
      ['Wooden chair', 'Not connected'],
      ['Smart door', 'Connected'],
      ['Pencil', 'Not connected'],
    ],
  },
  {
    id: 'I1-50', section: 5, topic: 'how', type: 'sort-it',
    prompt: 'Sort it! Is it information (DATA) or something a device does (ACTION)?',
    categories: [
      { name: 'Data', icon: '📊' },
      { name: 'Action', icon: '⚙️' },
    ],
    items: [
      ['Temperature: 24°C', 'Data'],
      ['A fan turns on', 'Action'],
      ['People in the room: 20', 'Data'],
      ['The lights turn off', 'Action'],
      ['The bin is 100% full', 'Data'],
      ['An alarm rings', 'Action'],
    ],
  },
  {
    id: 'I1-51', section: 5, topic: 'sensors', type: 'multiple-choice',
    prompt: 'Odd one out! Which one is NOT a sensor?', emoji: '🧐',
    content: 'Temperature · Light · Banana · Movement',
    options: ['Banana', 'Temperature', 'Light', 'Movement'],
    answer: 'Banana',
  },
  {
    id: 'I1-52', section: 5, topic: 'devices', type: 'multiple-choice',
    prompt: 'Odd one out! Which one is NOT a smart device?', emoji: '🧐',
    content: 'Smartwatch · Smartphone · Rubber duck · Smart car',
    options: ['Rubber duck', 'Smartwatch', 'Smartphone', 'Smart car'],
    answer: 'Rubber duck',
  },
  {
    id: 'I1-53', section: 5, topic: 'school', type: 'multiple-choice',
    prompt: 'Just for fun — choose the best answer.', emoji: '🥵',
    content: 'Your school plant is very thirsty. Which smart system can help it?',
    options: ['Smart garden', 'Smart bin', 'Smart door', 'Smart display'],
    answer: 'Smart garden',
  },

  /* =============================================================== */
  /*  SECCION 6 — Mission Challenge — 12                              */
  /* =============================================================== */
  {
    id: 'I1-54', section: 6, topic: 'how', type: 'sequence-order',
    prompt: 'Mission: put the steps of IoT in order.',
    steps: ['SENSOR', 'INTERNET', 'DATA', 'ACTION'],
  },
  {
    id: 'I1-55', section: 6, topic: 'how', type: 'sequence-order',
    prompt: 'Mission: the classroom is too hot. Put the story in order.',
    steps: [
      'A temperature sensor detects a hot classroom.',
      'It sends the information via the Internet.',
      'The system receives the data.',
      'A fan turns on automatically.',
    ],
  },
  {
    id: 'I1-56', section: 6, topic: 'design', type: 'sequence-order',
    prompt: 'Mission: design an IoT project. Put the parts in order.',
    steps: ['OBJECT', 'SENSOR', 'INFORMATION', 'INTERNET', 'ACTION'],
  },
  {
    id: 'I1-57', section: 6, topic: 'sensors', type: 'gap-fill-bank',
    prompt: 'Complete the sentences with words from the bank.',
    content: 'A sensor ___ something in the real world. Sensors ___ information.',
    bank: ['detects', 'collect', 'sleeps', 'paints'],
    answer: ['detects', 'collect'],
  },
  {
    id: 'I1-58', section: 6, topic: 'basics', type: 'gap-fill-bank',
    prompt: 'Complete the sentences with words from the bank.',
    content: 'The Internet normally connects computers and ___. IoT connects everyday ___ too.',
    bank: ['phones', 'objects', 'animals', 'songs'],
    answer: ['phones', 'objects'],
  },
  {
    id: 'I1-59', section: 6, topic: 'school', type: 'gap-fill-bank',
    prompt: 'Complete the sentences with words from the bank.',
    content: 'IoT can help schools become ___. Smart lights turn ___ when nobody is in the room.',
    bank: ['safer', 'off', 'louder', 'on'],
    answer: ['safer', 'off'],
  },
  {
    id: 'I1-60', section: 6, topic: 'school', type: 'multiple-choice',
    prompt: 'Read the screen and answer.', emoji: '🖥️',
    content: 'Our classroom app:\nTemperature 24°C · People in the room 20\n\nHow many people are in the classroom?',
    options: ['20', '24', '2', '42'],
    answer: '20',
  },
  {
    id: 'I1-61', section: 6, topic: 'design', type: 'multiple-choice',
    prompt: 'Mission: choose the best sensor.', emoji: '🚪',
    content: 'Your school wants to know when the main door is open at night. Which sensor do you need?',
    options: ['A door sensor', 'A sound sensor in the garden', 'A light sensor in the bathroom', 'A temperature sensor in the kitchen'],
    answer: 'A door sensor',
  },
  {
    id: 'I1-62', section: 6, topic: 'design', type: 'multiple-choice',
    prompt: 'Mission: choose the best idea.', emoji: '♻️',
    content: 'The trash bins are always full. What IoT idea can help?',
    options: [
      'A smart bin that sends a message when it is full',
      'A smartwatch for the teacher',
      'A smart car in the parking lot',
      'A bigger pencil',
    ],
    answer: 'A smart bin that sends a message when it is full',
  },
  {
    id: 'I1-63', section: 6, topic: 'how', type: 'multiple-choice',
    prompt: 'Mission: choose the best answer.', emoji: '🌙',
    content: 'A movement sensor detects nobody in the room. What ACTION can a smart classroom do?',
    options: ['Turn off the lights', 'Turn on all the lights', 'Open the windows', 'Call the students'],
    answer: 'Turn off the lights',
  },
  {
    id: 'I1-64', section: 6, topic: 'design', type: 'multiple-choice',
    prompt: 'Mission: choose the best sensor.', emoji: '🪴',
    content: 'Your OBJECT is a plant. You want to know when it needs water. Which SENSOR is best?',
    options: ['A humidity (water) sensor', 'A sound sensor', 'A door sensor', 'A movement sensor'],
    answer: 'A humidity (water) sensor',
  },
  {
    id: 'I1-65', section: 6, topic: 'design', type: 'multiple-choice',
    prompt: 'Mission: choose the best answer.', emoji: '💭',
    content: 'What is the FIRST step to design an IoT project for our school?',
    options: [
      'Think of a problem in our school',
      'Buy the most expensive device',
      'Choose a nice color',
      'Play a video game',
    ],
    answer: 'Think of a problem in our school',
  },
];
