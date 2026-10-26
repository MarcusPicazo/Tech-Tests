/*
 * EXAMEN 2do DE SECUNDARIA — Internet of Things (IoT) BASICO — 65 reactivos.
 * Mismo nivel principiante que 1ro (~6 clases) pero con preguntas distintas.
 * Solo usa lo visto en la presentacion de IoT: que es IoT, como funciona
 * (SENSOR -> INTERNET -> DATA -> ACTION), IoT a nuestro alrededor, sensores,
 * escuela inteligente y disenar un proyecto sencillo.
 * Sin microcontroladores, nube, actuadores ni otros temas avanzados.
 *
 *   Bloque  1  Power On            12  multiple-choice
 *   Bloque  2  Connect the Wires    8  wire-connect
 *   Bloque  3  Word Factory        10  sentence-builder
 *   Bloque  4  Guess the Gadget    10  word-guess
 *   Bloque  5  Fun Zone            13  fact-or-fake, sort-it, multiple-choice
 *   Bloque  6  Mission Challenge   12  sequence-order, gap-fill-bank, multiple-choice, word-select
 *
 * Los bloques agrupan por tipo; el alumno los ve MEZCLADOS (src/data/exams.js).
 *
 * Temas (topic): basics | how | devices | sensors | school | design
 * Esquema de cada tipo: ver src/lib/answers.js.
 */
export const topics = {
  basics: {
    es: 'Qué es IoT',
    hint: 'IoT conecta objetos cotidianos a Internet para que se comuniquen con otros dispositivos; un objeto conectado se vuelve "smart"',
  },
  how: {
    es: 'Cómo funciona IoT',
    hint: 'el ciclo SENSOR → INTERNET → DATA → ACTION (ej. sensor de movimiento que apaga las luces)',
  },
  devices: {
    es: 'IoT a nuestro alrededor',
    hint: 'smartwatch, smart home, smart car, security camera y smartphone, y qué hace cada uno',
  },
  sensors: {
    es: 'Sensores',
    hint: 'tipos de sensor (temperatura, luz, movimiento, sonido, humedad y ubicación) y qué detecta cada uno',
  },
  school: {
    es: 'Escuela inteligente',
    hint: 'smart lights, smart displays, sensores de agua y de puertas, smart bin, smart garden y por qué hacen la escuela más segura y sostenible',
  },
  design: {
    es: 'Diseñar un proyecto IoT',
    hint: 'identificar un problema de la escuela y resolverlo con OBJECT → SENSOR → INFORMATION → INTERNET → ACTION',
  },
};

export const sections = [
  { n: 1, name: 'Power On', icon: '⚡', blurb: "Warm-up time. Let's switch on your brain!" },
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
    id: 'I2-01', section: 1, topic: 'basics', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🌐',
    content: 'IoT stands for Internet of ___.',
    options: ['Things', 'Teachers', 'Tablets', 'Toys'],
    answer: 'Things',
  },
  {
    id: 'I2-02', section: 1, topic: 'basics', type: 'multiple-choice',
    prompt: 'Choose the best answer.',
    content: 'What can IoT objects do?',
    options: [
      'Connect to the Internet and communicate with other devices',
      'Fly in the sky',
      'Cook food alone',
      'Talk like people',
    ],
    answer: 'Connect to the Internet and communicate with other devices',
  },
  {
    id: 'I2-03', section: 1, topic: 'sensors', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🌙',
    content: 'Which sensor can tell if a room is dark?',
    options: ['A light sensor', 'A sound sensor', 'A temperature sensor', 'A water sensor'],
    answer: 'A light sensor',
  },
  {
    id: 'I2-04', section: 1, topic: 'sensors', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '📢',
    content: 'Which sensor can detect noise?',
    options: ['A sound sensor', 'A light sensor', 'A door sensor', 'A humidity sensor'],
    answer: 'A sound sensor',
  },
  {
    id: 'I2-05', section: 1, topic: 'devices', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '📱',
    content: 'Which device can control other connected devices?',
    options: ['A smartphone', 'A pencil', 'A chair', 'A book'],
    answer: 'A smartphone',
  },
  {
    id: 'I2-06', section: 1, topic: 'devices', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🚗',
    content: 'A smart car can detect ___.',
    options: ['problems and its location', 'your homework', 'the weather on Mars', 'your favorite song'],
    answer: 'problems and its location',
  },
  {
    id: 'I2-07', section: 1, topic: 'how', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '➡️',
    content: 'SENSOR → ___ → DATA → ACTION. What is missing?',
    options: ['INTERNET', 'ACTION', 'OBJECT', 'PENCIL'],
    answer: 'INTERNET',
  },
  {
    id: 'I2-08', section: 1, topic: 'how', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🏁',
    content: 'In IoT, what is the LAST step?',
    options: ['ACTION: the device does something', 'SENSOR: it detects something', 'INTERNET: it sends information', 'DATA: the system receives it'],
    answer: 'ACTION: the device does something',
  },
  {
    id: 'I2-09', section: 1, topic: 'school', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🚪',
    content: 'Door sensors detect if doors are ___.',
    options: ['open or closed', 'red or blue', 'big or small', 'new or old'],
    answer: 'open or closed',
  },
  {
    id: 'I2-10', section: 1, topic: 'school', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '📺',
    content: 'Smart displays at school show ___.',
    options: ['school information', 'your passwords', 'movies all day', 'video games'],
    answer: 'school information',
  },
  {
    id: 'I2-11', section: 1, topic: 'school', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '💡',
    content: 'Why are smart lights good for the school?',
    options: ['They save energy.', 'They make noise.', 'They break easily.', 'They are always on.'],
    answer: 'They save energy.',
  },
  {
    id: 'I2-12', section: 1, topic: 'devices', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🤔',
    content: 'You may use IoT every day without ___ it.',
    options: ['noticing', 'eating', 'painting', 'sleeping'],
    answer: 'noticing',
  },

  /* =============================================================== */
  /*  SECCION 2 — Connect the Wires — 8                               */
  /* =============================================================== */
  {
    id: 'I2-13', section: 2, topic: 'devices', type: 'wire-connect',
    prompt: 'Connect each device to where we use it.',
    pairs: [
      ['⌚ Smartwatch', 'On your wrist'],
      ['🚗 Smart car', 'On the street'],
      ['🏠 Smart home', 'In your house'],
      ['📹 Security camera', 'At the entrance'],
    ],
  },
  {
    id: 'I2-14', section: 2, topic: 'sensors', type: 'wire-connect',
    prompt: 'Connect each problem to the sensor that can detect it.',
    pairs: [
      ['The classroom is too hot', 'Temperature sensor'],
      ['The room is too dark', 'Light sensor'],
      ['There is a lot of noise', 'Sound sensor'],
      ['Someone enters the room', 'Movement sensor'],
    ],
  },
  {
    id: 'I2-15', section: 2, topic: 'how', type: 'wire-connect',
    prompt: 'Connect each IoT step to its meaning.',
    pairs: [
      ['SENSOR', 'Detects something'],
      ['INTERNET', 'Sends the information'],
      ['DATA', 'The information that arrives'],
      ['ACTION', 'The device does something'],
    ],
  },
  {
    id: 'I2-16', section: 2, topic: 'school', type: 'wire-connect',
    prompt: 'Connect each smart system to what it does.',
    pairs: [
      ['🌱 Smart garden', 'Detects when plants need water'],
      ['🗑️ Smart bin', 'Detects when the bin is full'],
      ['💡 Smart classroom', 'Controls lights automatically'],
      ['🚪 Smart door', 'Detects when doors open or close'],
    ],
  },
  {
    id: 'I2-17', section: 2, topic: 'sensors', type: 'wire-connect',
    prompt: 'Connect each picture to the sensor.',
    pairs: [
      ['💡', 'Light'],
      ['🏃', 'Movement'],
      ['💦', 'Humidity'],
      ['📍', 'Location'],
    ],
  },
  {
    id: 'I2-18', section: 2, topic: 'basics', type: 'wire-connect',
    prompt: 'Connect the beginning and the end of each sentence.',
    pairs: [
      ['The Internet normally connects', 'computers and phones.'],
      ['IoT connects', 'everyday physical objects too.'],
      ['Sensors collect', 'information.'],
      ['A smart device can use', 'the information from sensors.'],
    ],
  },
  {
    id: 'I2-19', section: 2, topic: 'design', type: 'wire-connect',
    prompt: 'Connect each school object to a smart idea.',
    pairs: [
      ['💡 Lights', 'Turn off when nobody is there'],
      ['🪴 Plants', 'Get water when the soil is dry'],
      ['🗑️ Trash bin', 'Sends a message when it is full'],
      ['🚪 Main door', 'Sends an alert if it is open at night'],
    ],
  },
  {
    id: 'I2-20', section: 2, topic: 'devices', type: 'wire-connect',
    prompt: 'Connect each device to what it does.',
    pairs: [
      ['📱 Smartphone', 'Controls connected devices'],
      ['⌚ Smartwatch', 'Tracks your heart rate'],
      ['🚗 Smart car', 'Shows if all systems are normal'],
      ['🏠 Smart home', 'Turns the living room light on'],
    ],
  },

  /* =============================================================== */
  /*  SECCION 3 — Word Factory — 10                                   */
  /* =============================================================== */
  {
    id: 'I2-21', section: 3, topic: 'basics', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['IoT', 'makes', 'objects', 'smart.'],
    answer: 'IoT makes objects smart.',
  },
  {
    id: 'I2-22', section: 3, topic: 'sensors', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Sensors', 'detect', 'temperature', 'and', 'light.'],
    answer: 'Sensors detect temperature and light.',
  },
  {
    id: 'I2-23', section: 3, topic: 'sensors', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['The', 'sound', 'sensor', 'detects', 'noise.'],
    answer: 'The sound sensor detects noise.',
  },
  {
    id: 'I2-24', section: 3, topic: 'devices', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['My', 'phone', 'controls', 'the', 'lights.'],
    answer: 'My phone controls the lights.',
  },
  {
    id: 'I2-25', section: 3, topic: 'school', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['The', 'smart', 'bin', 'is', 'full.'],
    answer: 'The smart bin is full.',
  },
  {
    id: 'I2-26', section: 3, topic: 'how', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['The', 'information', 'goes', 'to', 'the', 'app.'],
    answer: 'The information goes to the app.',
  },
  {
    id: 'I2-27', section: 3, topic: 'how', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['The', 'lights', 'turn', 'off', 'automatically.'],
    answer: 'The lights turn off automatically.',
  },
  {
    id: 'I2-28', section: 3, topic: 'school', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['IoT', 'helps', 'our', 'school.'],
    answer: 'IoT helps our school.',
  },
  {
    id: 'I2-29', section: 3, topic: 'devices', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['My', 'smartwatch', 'counts', 'my', 'steps.'],
    answer: 'My smartwatch counts my steps.',
  },
  {
    id: 'I2-30', section: 3, topic: 'design', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['We', 'can', 'make', 'our', 'school', 'smart.'],
    answer: 'We can make our school smart.',
  },

  /* =============================================================== */
  /*  SECCION 4 — Guess the Gadget — 10                               */
  /* =============================================================== */
  {
    id: 'I2-31', section: 4, topic: 'basics', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🌐',
    content: 'I connect computers, phones and now everyday objects too. What am I?',
    answer: 'INTERNET', extra: 'AS',
  },
  {
    id: 'I2-32', section: 4, topic: 'sensors', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '☀️',
    content: 'A sensor detects me. I tell you if a room is bright or dark.',
    answer: 'LIGHT', extra: 'NO',
  },
  {
    id: 'I2-33', section: 4, topic: 'sensors', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🔊',
    content: 'A sensor detects me. I can be quiet or loud.',
    answer: 'SOUND', extra: 'ET',
  },
  {
    id: 'I2-34', section: 4, topic: 'devices', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '⌚',
    content: 'I am on your wrist. I track your steps and heart rate. I am a smart…',
    answer: 'WATCH', extra: 'EO',
  },
  {
    id: 'I2-35', section: 4, topic: 'devices', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🏠',
    content: 'In a smart … you can control the lights and temperature with your phone.',
    answer: 'HOME', extra: 'SU',
  },
  {
    id: 'I2-36', section: 4, topic: 'school', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🚪',
    content: 'A sensor detects if I am open or closed.',
    answer: 'DOOR', extra: 'RA',
  },
  {
    id: 'I2-37', section: 4, topic: 'school', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🚰',
    content: 'A sensor detects a leak of me in the bathroom.',
    answer: 'WATER', extra: 'IS',
  },
  {
    id: 'I2-38', section: 4, topic: 'how', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '⚙️',
    content: 'I am the last step of IoT: the device does something.',
    answer: 'ACTION', extra: 'ES',
  },
  {
    id: 'I2-39', section: 4, topic: 'sensors', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🏃',
    content: 'A sensor detects me when someone walks in front of it.',
    answer: 'MOVEMENT', extra: 'SA',
  },
  {
    id: 'I2-40', section: 4, topic: 'basics', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '✨',
    content: 'When an everyday object connects to the Internet, it becomes …',
    answer: 'SMART', extra: 'OE',
  },

  /* =============================================================== */
  /*  SECCION 5 — Fun Zone — 13                                       */
  /* =============================================================== */
  {
    id: 'I2-41', section: 5, topic: 'basics', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '💡',
    content: 'A smart light is an example of IoT.',
    answer: 'Fact',
  },
  {
    id: 'I2-42', section: 5, topic: 'sensors', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🔊',
    content: 'A sound sensor can tell you how hot the room is.',
    answer: 'Fake',
  },
  {
    id: 'I2-43', section: 5, topic: 'devices', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '⌚',
    content: 'A smartwatch can track your heart rate.',
    answer: 'Fact',
  },
  {
    id: 'I2-44', section: 5, topic: 'school', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🌙',
    content: 'Smart lights stay on all night, even when nobody is there.',
    answer: 'Fake',
  },
  {
    id: 'I2-45', section: 5, topic: 'how', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '📶',
    content: 'In IoT, the information travels through the Internet.',
    answer: 'Fact',
  },
  {
    id: 'I2-46', section: 5, topic: 'basics', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🤖',
    content: 'Only robots can be part of the Internet of Things.',
    answer: 'Fake',
  },
  {
    id: 'I2-47', section: 5, topic: 'sensors', type: 'sort-it',
    prompt: 'Sort it! Which sensor detects it?',
    categories: [
      { name: 'Light sensor', icon: '💡' },
      { name: 'Sound sensor', icon: '🔊' },
    ],
    items: [
      ['A sunny day', 'Light sensor'],
      ['A dog barking', 'Sound sensor'],
      ['A dark room', 'Light sensor'],
      ['Loud music', 'Sound sensor'],
      ['A lamp turns on', 'Light sensor'],
      ['Students talking', 'Sound sensor'],
    ],
  },
  {
    id: 'I2-48', section: 5, topic: 'how', type: 'sort-it',
    prompt: 'Sort it! Does the SENSOR detect it, or is it an ACTION?',
    categories: [
      { name: 'Sensor detects', icon: '👀' },
      { name: 'Action', icon: '⚙️' },
    ],
    items: [
      ['Detects movement', 'Sensor detects'],
      ['A fan turns on', 'Action'],
      ['Detects a water leak', 'Sensor detects'],
      ['The lights turn off', 'Action'],
      ['Detects noise', 'Sensor detects'],
      ['An alarm rings', 'Action'],
    ],
  },
  {
    id: 'I2-49', section: 5, topic: 'school', type: 'sort-it',
    prompt: 'Sort it! Smart or not smart?',
    categories: [
      { name: 'Smart', icon: '🧠' },
      { name: 'Not smart', icon: '🪨' },
    ],
    items: [
      ['A light that turns off by itself', 'Smart'],
      ['A normal chalkboard', 'Not smart'],
      ['A bin that knows when it is full', 'Smart'],
      ['A paper poster', 'Not smart'],
      ['A door with a sensor', 'Smart'],
      ['A wooden desk', 'Not smart'],
    ],
  },
  {
    id: 'I2-50', section: 5, topic: 'sensors', type: 'multiple-choice',
    prompt: 'Odd one out! Which one is NOT a sensor?', emoji: '🧐',
    content: 'Light · Sound · Pizza · Temperature',
    options: ['Pizza', 'Light', 'Sound', 'Temperature'],
    answer: 'Pizza',
  },
  {
    id: 'I2-51', section: 5, topic: 'devices', type: 'multiple-choice',
    prompt: 'Odd one out! Which one is NOT a smart device?', emoji: '🧐',
    content: 'Smartwatch · Smart car · Smartphone · Sandwich',
    options: ['Sandwich', 'Smartwatch', 'Smart car', 'Smartphone'],
    answer: 'Sandwich',
  },
  {
    id: 'I2-52', section: 5, topic: 'school', type: 'multiple-choice',
    prompt: 'Just for fun — choose the best answer.', emoji: '🥵',
    content: 'Your classroom feels like a sauna! Which IoT idea can help?',
    options: [
      'A temperature sensor that turns on a fan',
      'A smart bin',
      'A door sensor',
      'A light sensor in the garden',
    ],
    answer: 'A temperature sensor that turns on a fan',
  },
  {
    id: 'I2-53', section: 5, topic: 'devices', type: 'multiple-choice',
    prompt: 'Just for fun — choose the best answer.', emoji: '🐶',
    content: 'Your dog is home alone. Which device lets you see him from school?',
    options: ['A security camera with an app', 'A smart bin', 'A thermometer', 'A paper map'],
    answer: 'A security camera with an app',
  },

  /* =============================================================== */
  /*  SECCION 6 — Mission Challenge — 12                              */
  /* =============================================================== */
  {
    id: 'I2-54', section: 6, topic: 'how', type: 'sequence-order',
    prompt: 'Mission: the plants are thirsty. Put the story in order.',
    steps: [
      'A sensor detects dry soil.',
      'It sends the information via the Internet.',
      'The system receives the data.',
      'The garden waters the plants automatically.',
    ],
  },
  {
    id: 'I2-55', section: 6, topic: 'how', type: 'sequence-order',
    prompt: 'Mission: nobody is in the classroom. Put the story in order.',
    steps: [
      'A movement sensor detects nobody in the room.',
      'The information travels online.',
      'The system receives the data.',
      'The lights turn off.',
    ],
  },
  {
    id: 'I2-56', section: 6, topic: 'design', type: 'sequence-order',
    prompt: 'Mission: design an IoT project. Put the parts in order.',
    steps: ['OBJECT', 'SENSOR', 'INFORMATION', 'INTERNET', 'ACTION'],
  },
  {
    id: 'I2-57', section: 6, topic: 'sensors', type: 'gap-fill-bank',
    prompt: 'Complete the sentences with words from the bank.',
    content: 'A light sensor detects if a room is bright or ___. A sound sensor detects ___.',
    bank: ['dark', 'noise', 'sweet', 'heavy'],
    answer: ['dark', 'noise'],
  },
  {
    id: 'I2-58', section: 6, topic: 'how', type: 'gap-fill-bank',
    prompt: 'Complete the sentences with words from the bank.',
    content: 'First, a ___ detects something. Then the information travels through the ___.',
    bank: ['sensor', 'Internet', 'pencil', 'window'],
    answer: ['sensor', 'Internet'],
  },
  {
    id: 'I2-59', section: 6, topic: 'sensors', type: 'word-select',
    prompt: 'Spot the sensors! Click ALL the types of sensor.',
    content: 'Our smart classroom has a light sensor, a sound sensor and a movement sensor near the door.',
    answer: ['light', 'sound', 'movement'],
  },
  {
    id: 'I2-60', section: 6, topic: 'school', type: 'multiple-choice',
    prompt: 'Read the screen and answer.', emoji: '🖥️',
    content: 'Our classroom app:\nTemperature 30°C · People in the room 25\n\nWhat is the temperature?',
    options: ['30°C', '25°C', '3°C', '52°C'],
    answer: '30°C',
  },
  {
    id: 'I2-61', section: 6, topic: 'how', type: 'multiple-choice',
    prompt: 'Read the screen and answer.', emoji: '🖥️',
    content: 'Our classroom app:\nTemperature 30°C (very hot!)\n\nWhat ACTION can a smart classroom do?',
    options: ['Turn on the fan', 'Turn on the heater', 'Close all the windows', 'Turn off the app'],
    answer: 'Turn on the fan',
  },
  {
    id: 'I2-62', section: 6, topic: 'design', type: 'multiple-choice',
    prompt: 'Mission: choose the best sensor.', emoji: '💡',
    content: 'Problem: students leave the lights on in empty rooms. Which sensor do you need?',
    options: ['A movement sensor', 'A water sensor', 'A temperature sensor', 'A location sensor'],
    answer: 'A movement sensor',
  },
  {
    id: 'I2-63', section: 6, topic: 'design', type: 'multiple-choice',
    prompt: 'Mission: choose the best idea.', emoji: '🌱',
    content: 'Problem: the school plants die because nobody waters them. Which smart system can help?',
    options: ['Smart garden', 'Smart display', 'Smart door', 'Smart car'],
    answer: 'Smart garden',
  },
  {
    id: 'I2-64', section: 6, topic: 'school', type: 'multiple-choice',
    prompt: 'Mission: choose the best answer.', emoji: '🏫',
    content: 'How can IoT help our school?',
    options: [
      'It can make the school safer and more sustainable.',
      'It can do our homework.',
      'It can replace the teachers.',
      'It can make the school louder.',
    ],
    answer: 'It can make the school safer and more sustainable.',
  },
  {
    id: 'I2-65', section: 6, topic: 'design', type: 'multiple-choice',
    prompt: 'Mission: choose the best answer.', emoji: '🛠️',
    content: 'You want to make the school bin smart. The OBJECT is the bin. What is the ACTION?',
    options: [
      'Send a message when the bin is full',
      'Paint the bin blue',
      'Move the bin to the garden',
      'Put a pencil in the bin',
    ],
    answer: 'Send a message when the bin is full',
  },
];
