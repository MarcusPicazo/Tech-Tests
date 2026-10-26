/*
 * EXAMEN 3ro DE SECUNDARIA — Cybersecurity — 65 reactivos.
 * Basado en la presentacion "Introduction to Cybersecurity — Protecting your
 * digital life every day": que proteger, informacion personal, contrasenas
 * seguras, phishing, pensar antes de compartir, Wi-Fi, malware y
 * ciberseguridad en la escuela.
 *
 *   Bloque  1  Log In              12  multiple-choice
 *   Bloque  2  Connect the Wires    8  wire-connect
 *   Bloque  3  Word Factory        10  sentence-builder
 *   Bloque  4  Guess the Word      10  word-guess
 *   Bloque  5  Fun Zone            13  fact-or-fake, sort-it, word-select
 *   Bloque  6  Cyber Mission       12  sequence-order, gap-fill-bank, multiple-choice, word-select
 *
 * Los bloques agrupan por tipo; el alumno los ve MEZCLADOS (src/data/exams.js).
 *
 * Temas (topic): protect | personal | passwords | phishing | sharing | wifi | malware | school
 * Esquema de cada tipo: ver src/lib/answers.js.
 */
export const topics = {
  protect: {
    es: 'Qué debemos proteger',
    hint: 'dispositivos, contraseñas, información personal, fotos y archivos, y cuentas en línea',
  },
  personal: {
    es: 'Información personal',
    hint: 'datos que te identifican (nombre completo, dirección, teléfono, ubicación, escuela, fotos, correo) y quién debe conocerlos',
  },
  passwords: {
    es: 'Contraseñas seguras',
    hint: 'contraseñas largas, distintas para cada cuenta importante, sin datos personales obvios y nunca compartidas',
  },
  phishing: {
    es: 'Phishing',
    hint: 'señales de alerta: lenguaje urgente, ligas extrañas, piden contraseñas, mensajes inesperados y errores de ortografía; "Stop. Check. Think before you click"',
  },
  sharing: {
    es: 'Pensar antes de compartir',
    hint: 'lo que se publica es difícil de controlar; configuración de privacidad (Everyone / Only friends) y no mostrar uniforme, ubicación o rutinas',
  },
  wifi: {
    es: 'Seguridad en Wi-Fi',
    hint: 'usar redes confiables, no ingresar datos sensibles en redes desconocidas, no conectarse automáticamente y mantener el equipo actualizado',
  },
  malware: {
    es: 'Malware',
    hint: 'virus, spyware y ransomware; descargar solo de fuentes confiables',
  },
  school: {
    es: 'Ciberseguridad en la escuela',
    hint: 'proteger la cuenta de Google escolar, bloquear la computadora al irse, no compartir datos de otros y reportar mensajes sospechosos',
  },
};

export const sections = [
  { n: 1, name: 'Log In', icon: '🔐', blurb: 'Warm-up time. Unlock your cyber brain!' },
  { n: 2, name: 'Connect the Wires', icon: '🔌', blurb: 'Tap a plug, then tap where it goes. You can also drag the cable!' },
  { n: 3, name: 'Word Factory', icon: '🧩', blurb: 'Put the words in the correct order to build a safety rule.' },
  { n: 4, name: 'Guess the Word', icon: '🕵️', blurb: 'Read the clue and spell the secret word with the letter tiles.' },
  { n: 5, name: 'Fun Zone', icon: '🎮', blurb: 'Fact or fake? Strong or weak? Relax and have fun — these still count.' },
  { n: 6, name: 'Cyber Mission', icon: '🛡️', blurb: 'Stop. Think. Check. Protect. Solve real cyber situations.' },
];

export const questions = [
  /* =============================================================== */
  /*  SECCION 1 — Log In — 10                                         */
  /* =============================================================== */
  {
    id: 'C3-01', section: 1, topic: 'protect', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🛡️',
    content: 'What is cybersecurity?',
    options: [
      'Protecting your devices, accounts and information online',
      'Making your computer faster',
      'Playing games on the Internet',
      'Buying a new phone',
    ],
    answer: 'Protecting your devices, accounts and information online',
  },
  {
    id: 'C3-02', section: 1, topic: 'personal', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🪪',
    content: 'Personal information is information that can ___.',
    options: ['identify you or tell others about you', 'only be found in books', 'never be shared by accident', 'make your phone faster'],
    answer: 'identify you or tell others about you',
  },
  {
    id: 'C3-03', section: 1, topic: 'passwords', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🔑',
    content: 'Which password is the STRONGEST?',
    options: ['BlueRiver!Sunset', '123456', 'password', 'Marco123'],
    answer: 'BlueRiver!Sunset',
  },
  {
    id: 'C3-04', section: 1, topic: 'phishing', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🎣',
    content: 'Phishing is when someone ___.',
    options: [
      'pretends to be someone you trust to steal your information',
      'goes fishing on the weekend',
      'updates your computer',
      'sends you homework from school',
    ],
    answer: 'pretends to be someone you trust to steal your information',
  },
  {
    id: 'C3-05', section: 1, topic: 'malware', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🦠',
    content: 'Malware is software made to ___.',
    options: ['harm your device or steal information', 'protect your files', 'edit photos', 'teach you English'],
    answer: 'harm your device or steal information',
  },
  {
    id: 'C3-06', section: 1, topic: 'wifi', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '📶',
    content: 'Which Wi-Fi network is the safest to use?',
    options: ['A trusted network, like your home or school Wi-Fi', 'FREE_WIFI_123 with no password', 'An unknown network in the street', 'Any network with a strong signal'],
    answer: 'A trusted network, like your home or school Wi-Fi',
  },
  {
    id: 'C3-07', section: 1, topic: 'sharing', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '📸',
    content: 'Once you share something online, ___.',
    options: ['it can be hard to control where it goes', 'it disappears after one hour', 'only your mom can see it', 'nobody can copy it'],
    answer: 'it can be hard to control where it goes',
  },
  {
    id: 'C3-08', section: 1, topic: 'school', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🖥️',
    content: 'What should you do when you leave a school computer?',
    options: ['Lock it', 'Leave your account open', 'Write your password on the screen', 'Turn up the volume'],
    answer: 'Lock it',
  },
  {
    id: 'C3-09', section: 1, topic: 'passwords', type: 'multiple-choice',
    prompt: 'Choose the best answer.',
    content: 'Who should know your password?',
    options: ['Only you (and maybe your parents)', 'Your best friend', 'Everyone in your class', 'Anyone who asks nicely'],
    answer: 'Only you (and maybe your parents)',
  },
  {
    id: 'C3-10', section: 1, topic: 'protect', type: 'multiple-choice',
    prompt: 'Choose the best answer.',
    content: 'Which of these do we need to protect?',
    options: ['All of them', 'Devices', 'Online accounts', 'Photos and files'],
    answer: 'All of them',
  },
  {
    id: 'C3-61', section: 1, topic: 'personal', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '🏠',
    content: 'Which of these is personal information?',
    options: ['Your home address', 'The name of a famous movie', 'The color of the sky', 'A math formula'],
    answer: 'Your home address',
  },
  {
    id: 'C3-62', section: 1, topic: 'malware', type: 'multiple-choice',
    prompt: 'Choose the best answer.', emoji: '⬇️',
    content: 'Where should you download apps from?',
    options: [
      'Trusted sources, like the official app store',
      'Any website with free games',
      'A link from a stranger',
      'A pop-up that says you won a prize',
    ],
    answer: 'Trusted sources, like the official app store',
  },

  /* =============================================================== */
  /*  SECCION 2 — Connect the Wires — 8                               */
  /* =============================================================== */
  {
    id: 'C3-11', section: 2, topic: 'malware', type: 'wire-connect',
    prompt: 'Connect each type of malware to what it does.',
    pairs: [
      ['🦠 Virus', 'Spreads to other files and can damage them'],
      ['🕵️ Spyware', 'Watches what you do and collects your information'],
      ['🔒 Ransomware', 'Locks your files and demands payment'],
    ],
  },
  {
    id: 'C3-12', section: 2, topic: 'phishing', type: 'wire-connect',
    prompt: 'Connect each phishing warning sign to an example.',
    pairs: [
      ['Urgent language', '"URGENT! Your account will be deleted today!"'],
      ['Strange link', 'accounts@secure-check.com'],
      ['Request for passwords', '"Click here to verify your password."'],
      ['Spelling mistakes', '"Yuor acount is blokced"'],
    ],
  },
  {
    id: 'C3-13', section: 2, topic: 'passwords', type: 'wire-connect',
    prompt: 'Connect each password rule to its reason.',
    pairs: [
      ['Make it long', 'Long passwords are harder to guess.'],
      ['Use different passwords', 'If one account is hacked, the others are safe.'],
      ['Never share it', 'Nobody else can enter your account.'],
      ['Avoid personal info', 'People can guess your name or birthday.'],
    ],
  },
  {
    id: 'C3-14', section: 2, topic: 'school', type: 'wire-connect',
    prompt: 'Connect each school situation to the correct rule.',
    pairs: [
      ['You go to recess', 'Lock your computer'],
      ['A strange message arrives in Classroom', 'Report it to a teacher'],
      ['A friend asks for your Google password', 'Keep passwords private'],
      ['You have a photo of a classmate', 'Don’t share others’ info'],
    ],
  },
  {
    id: 'C3-15', section: 2, topic: 'wifi', type: 'wire-connect',
    prompt: 'Connect the beginning and the end of each Wi-Fi tip.',
    pairs: [
      ['Use', 'trusted networks.'],
      ['Avoid entering sensitive info', 'on unknown networks.'],
      ['Don’t connect automatically', 'to suspicious networks.'],
      ['Keep your device', 'updated.'],
    ],
  },
  {
    id: 'C3-16', section: 2, topic: 'protect', type: 'wire-connect',
    prompt: 'Connect each thing we protect to an example.',
    pairs: [
      ['📱 Device', 'Your phone or laptop'],
      ['🔑 Password', 'Books93#TreeTop'],
      ['👤 Online account', 'Your school Google account'],
      ['🖼️ Photos & files', 'Your vacation pictures'],
    ],
  },
  {
    id: 'C3-17', section: 2, topic: 'sharing', type: 'wire-connect',
    prompt: 'Connect each post to the risk.',
    pairs: [
      ['A photo in your school uniform', 'People know your school'],
      ['"Home alone all weekend!"', 'People know your house is empty'],
      ['A live location pin', 'People know where you are now'],
      ['"I walk to the park every day at 5"', 'People know your daily routine'],
    ],
  },
  {
    id: 'C3-18', section: 2, topic: 'personal', type: 'wire-connect',
    prompt: 'Connect each type of personal information to an example.',
    pairs: [
      ['Full name', 'Ana Sofía Pérez López'],
      ['Address', 'Calle Roble 45, Col. Centro'],
      ['Phone number', '55 1234 5678'],
      ['Email address', 'ana.perez@mail.com'],
    ],
  },

  /* =============================================================== */
  /*  SECCION 3 — Word Factory — 10                                   */
  /* =============================================================== */
  {
    id: 'C3-19', section: 3, topic: 'passwords', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Never', 'share', 'your', 'password.'],
    answer: 'Never share your password.',
  },
  {
    id: 'C3-20', section: 3, topic: 'phishing', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Think', 'before', 'you', 'click.'],
    answer: 'Think before you click.',
  },
  {
    id: 'C3-21', section: 3, topic: 'school', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Lock', 'the', 'computer', 'when', 'you', 'leave.'],
    answer: 'Lock the computer when you leave.',
  },
  {
    id: 'C3-22', section: 3, topic: 'malware', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Only', 'download', 'apps', 'from', 'trusted', 'sources.'],
    answer: 'Only download apps from trusted sources.',
  },
  {
    id: 'C3-23', section: 3, topic: 'wifi', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Not', 'every', 'Wi-Fi', 'network', 'is', 'safe.'],
    answer: 'Not every Wi-Fi network is safe.',
  },
  {
    id: 'C3-24', section: 3, topic: 'sharing', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Think', 'before', 'you', 'share', 'a', 'photo.'],
    answer: 'Think before you share a photo.',
  },
  {
    id: 'C3-25', section: 3, topic: 'passwords', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Use', 'a', 'long', 'and', 'strong', 'password.'],
    answer: 'Use a long and strong password.',
  },
  {
    id: 'C3-26', section: 3, topic: 'school', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Report', 'suspicious', 'messages', 'to', 'a', 'teacher.'],
    answer: 'Report suspicious messages to a teacher.',
  },
  {
    id: 'C3-27', section: 3, topic: 'personal', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Not', 'everyone', 'online', 'needs', 'to', 'know', 'your', 'address.'],
    answer: 'Not everyone online needs to know your address.',
  },
  {
    id: 'C3-28', section: 3, topic: 'malware', type: 'sentence-builder',
    prompt: 'Put the words in order.',
    tokens: ['Ransomware', 'locks', 'your', 'files.'],
    answer: 'Ransomware locks your files.',
  },

  /* =============================================================== */
  /*  SECCION 4 — Guess the Word — 10                                 */
  /* =============================================================== */
  {
    id: 'C3-29', section: 4, topic: 'passwords', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🔑',
    content: 'I am secret. I protect your account. I should be long and strong.',
    answer: 'PASSWORD', extra: 'NE',
  },
  {
    id: 'C3-30', section: 4, topic: 'phishing', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🎣',
    content: 'I sound like a sport with a rod and a lake, but I steal information with fake messages.',
    answer: 'PHISHING', extra: 'AE',
  },
  {
    id: 'C3-31', section: 4, topic: 'malware', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🦠',
    content: 'I spread to other files and can damage them, like a cold that jumps from person to person.',
    answer: 'VIRUS', extra: 'EA',
  },
  {
    id: 'C3-32', section: 4, topic: 'malware', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🕵️',
    content: 'I watch what you do in secret and collect your information. I am … ware.',
    answer: 'SPY', extra: 'AE',
  },
  {
    id: 'C3-33', section: 4, topic: 'malware', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '💰',
    content: 'I lock your files and ask for money to unlock them. I am …ware.',
    answer: 'RANSOM', extra: 'TE',
  },
  {
    id: 'C3-34', section: 4, topic: 'sharing', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '⚙️',
    content: 'I decide who can see your posts: "Everyone" or "Only friends". I am a … setting.',
    answer: 'PRIVACY', extra: 'TE',
  },
  {
    id: 'C3-35', section: 4, topic: 'school', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '📣',
    content: 'When you see a suspicious message, you should … it to a teacher.',
    answer: 'REPORT', extra: 'AS',
  },
  {
    id: 'C3-36', section: 4, topic: 'personal', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '📍',
    content: 'I show exactly where you are on a map. Be careful when you share me!',
    answer: 'LOCATION', extra: 'SE',
  },
  {
    id: 'C3-37', section: 4, topic: 'wifi', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '🔄',
    content: 'Keep your device … : install the newest version to fix security problems.',
    answer: 'UPDATED', extra: 'SI',
  },
  {
    id: 'C3-38', section: 4, topic: 'protect', type: 'word-guess',
    prompt: 'Guess the word!', emoji: '👤',
    content: 'I have a username and a password. Instagram, Gmail and games all have one. I am an …',
    answer: 'ACCOUNT', extra: 'SE',
  },

  /* =============================================================== */
  /*  SECCION 5 — Fun Zone — 12                                       */
  /* =============================================================== */
  {
    id: 'C3-39', section: 5, topic: 'passwords', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🔢',
    content: '"123456" is a strong password because it has six numbers.',
    answer: 'Fake',
  },
  {
    id: 'C3-40', section: 5, topic: 'phishing', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🏦',
    content: 'Real companies never ask you to send your password by email.',
    answer: 'Fact',
  },
  {
    id: 'C3-41', section: 5, topic: 'wifi', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '☕',
    content: 'It is a good idea to enter your bank password on a free Wi-Fi network in a café.',
    answer: 'Fake',
  },
  {
    id: 'C3-42', section: 5, topic: 'sharing', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '👀',
    content: 'Before posting, ask yourself: "Would I be comfortable if everyone in my school could see it?"',
    answer: 'Fact',
  },
  {
    id: 'C3-43', section: 5, topic: 'malware', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🎮',
    content: 'Downloading a "free" game from an unknown website can put your device at risk.',
    answer: 'Fact',
  },
  {
    id: 'C3-44', section: 5, topic: 'protect', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '🦸',
    content: 'Hackers are only interested in famous people, so students don’t need cybersecurity.',
    answer: 'Fake',
  },
  {
    id: 'C3-63', section: 5, topic: 'wifi', type: 'fact-or-fake',
    prompt: 'Fact or fake?', emoji: '📶',
    content: 'Not every Wi-Fi network is safe.',
    answer: 'Fact',
  },
  {
    id: 'C3-45', section: 5, topic: 'passwords', type: 'sort-it',
    prompt: 'Sort it! Strong or weak password?',
    categories: [
      { name: 'Strong', icon: '💪' },
      { name: 'Weak', icon: '🫠' },
    ],
    items: [
      ['Books93#TreeTop', 'Strong'],
      ['password', 'Weak'],
      ['Marco123', 'Weak'],
      ['Purple!Tiger_Jumps7', 'Strong'],
      ['qwerty', 'Weak'],
      ['Moon$Pizza*River22', 'Strong'],
    ],
  },
  {
    id: 'C3-46', section: 5, topic: 'personal', type: 'sort-it',
    prompt: 'Sort it! Is it OK to share with strangers online?',
    categories: [
      { name: 'OK to share', icon: '👍' },
      { name: 'Keep private', icon: '🔒' },
    ],
    items: [
      ['Your favorite movie', 'OK to share'],
      ['Your home address', 'Keep private'],
      ['Your password', 'Keep private'],
      ['Your favorite color', 'OK to share'],
      ['Your phone number', 'Keep private'],
      ['A drawing of a cat', 'OK to share'],
    ],
  },
  {
    id: 'C3-47', section: 5, topic: 'phishing', type: 'sort-it',
    prompt: 'Sort it! Safe message or phishing?',
    categories: [
      { name: 'Looks safe', icon: '✅' },
      { name: 'Phishing!', icon: '🎣' },
    ],
    items: [
      ['"Your teacher posted new homework in Classroom."', 'Looks safe'],
      ['"You WON a new phone! Enter your password to claim it!"', 'Phishing!'],
      ['"URGENT: your account will be deleted in 1 hour. Click here!"', 'Phishing!'],
      ['"Mom: I will pick you up at 2 pm."', 'Looks safe'],
      ['"Send me your Google password to fix your account."', 'Phishing!'],
      ['"Reminder: school trip on Friday."', 'Looks safe'],
    ],
  },
  {
    id: 'C3-48', section: 5, topic: 'phishing', type: 'word-select',
    prompt: 'Spot the danger! Click ALL the urgent or scary words.',
    content: 'URGENT! Your account will be DELETED today. Act NOW or lose everything!',
    answer: ['URGENT!', 'DELETED', 'NOW'],
  },
  {
    id: 'C3-49', section: 5, topic: 'malware', type: 'multiple-choice',
    prompt: 'Odd one out! Which one is NOT malware?', emoji: '🧐',
    content: 'Virus · Spyware · Ransomware · Antivirus',
    options: ['Antivirus', 'Virus', 'Spyware', 'Ransomware'],
    answer: 'Antivirus',
  },
  {
    id: 'C3-50', section: 5, topic: 'passwords', type: 'multiple-choice',
    prompt: 'Just for fun — choose the best answer.', emoji: '😂',
    content: 'Your password is "pizza". A hacker guesses it in 1 second. What is the best new password?',
    options: ['Pizza!Rocket_Dance42', 'pizza2', 'PIZZA', 'pizzapizza'],
    answer: 'Pizza!Rocket_Dance42',
  },

  /* =============================================================== */
  /*  SECCION 6 — Cyber Mission — 10                                  */
  /* =============================================================== */
  {
    id: 'C3-51', section: 6, topic: 'phishing', type: 'sequence-order',
    prompt: 'Mission: you get a suspicious message. Put the steps in order.',
    steps: ['STOP', 'THINK', 'CHECK', 'PROTECT'],
  },
  {
    id: 'C3-52', section: 6, topic: 'phishing', type: 'word-select',
    prompt: 'Spot the risk! Click ALL the words that ask for something dangerous.',
    content: 'Congratulations! You have won a new phone. Click this link and enter your Google password to claim it.',
    answer: ['link', 'password'],
  },
  {
    id: 'C3-53', section: 6, topic: 'phishing', type: 'multiple-choice',
    prompt: 'Read the message and answer.', emoji: '📩',
    content: '"Congratulations! You have won a new phone. Click this link and enter your Google password to claim it."\n\nWhat should you NOT do?',
    options: [
      'Click the link and enter your password',
      'Delete the message',
      'Tell a teacher or a parent',
      'Report the message',
    ],
    answer: 'Click the link and enter your password',
  },
  {
    id: 'C3-54', section: 6, topic: 'phishing', type: 'multiple-choice',
    prompt: 'Read the message and answer.', emoji: '📩',
    content: '"Congratulations! You have won a new phone. Click this link and enter your Google password to claim it."\n\nWhat rule does this teach us?',
    options: [
      'If it sounds too good to be true, it is probably a trick.',
      'Always click links to win prizes.',
      'Share your password only with prize companies.',
      'Free phones are always real.',
    ],
    answer: 'If it sounds too good to be true, it is probably a trick.',
  },
  {
    id: 'C3-55', section: 6, topic: 'passwords', type: 'gap-fill-bank',
    prompt: 'Complete the text with words from the bank.',
    content: 'A good password is ___ and hard to guess. Use ___ passwords for important accounts, and never share them.',
    bank: ['long', 'different', 'short', 'the same'],
    answer: ['long', 'different'],
  },
  {
    id: 'C3-56', section: 6, topic: 'sharing', type: 'multiple-choice',
    prompt: 'Mission: choose the best privacy setting.', emoji: '🏖️',
    content: 'New post: a beach photo with your face and the name of your hotel. "Who can see this?"',
    options: ['Only friends', 'Everyone', 'Everyone + share location', 'Public and send to strangers'],
    answer: 'Only friends',
  },
  {
    id: 'C3-57', section: 6, topic: 'wifi', type: 'multiple-choice',
    prompt: 'Mission: choose the safest action.', emoji: '✈️',
    content: 'At the airport you see two networks: "Airport_Official_WiFi" and "FREE_FAST_WIFI_!!!". You want to watch a video. What is the safest choice?',
    options: [
      'Use your mobile data or the official network, and do not enter passwords.',
      'Connect to FREE_FAST_WIFI_!!! and log in to your bank.',
      'Connect to both networks at the same time.',
      'Turn on "connect automatically" to all networks.',
    ],
    answer: 'Use your mobile data or the official network, and do not enter passwords.',
  },
  {
    id: 'C3-58', section: 6, topic: 'malware', type: 'gap-fill-bank',
    prompt: 'Complete the text with words from the bank.',
    content: 'An unknown ___ can install malware and put your device at ___. Stay safe: only download from trusted sources.',
    bank: ['download', 'risk', 'party', 'school'],
    answer: ['download', 'risk'],
  },
  {
    id: 'C3-59', section: 6, topic: 'school', type: 'multiple-choice',
    prompt: 'Mission: choose the best action.', emoji: '🏫',
    content: 'Your classmate left the computer lab and his Google account is still open. What should you do?',
    options: [
      'Don’t touch his files, and tell him or the teacher to close the session.',
      'Post a funny message from his account.',
      'Read his private messages.',
      'Change his password as a joke.',
    ],
    answer: 'Don’t touch his files, and tell him or the teacher to close the session.',
  },
  {
    id: 'C3-60', section: 6, topic: 'personal', type: 'multiple-choice',
    prompt: 'Mission: choose the best answer.', emoji: '🎮',
    content: 'A player you don’t know in an online game asks: "What school do you go to and where do you live?" What do you do?',
    options: [
      'Don’t answer, block the player and tell an adult.',
      'Tell him your school and your address.',
      'Send him a photo in your uniform.',
      'Give him your phone number.',
    ],
    answer: 'Don’t answer, block the player and tell an adult.',
  },
  {
    id: 'C3-64', section: 6, topic: 'school', type: 'multiple-choice',
    prompt: 'Mission: choose the best action.', emoji: '📨',
    content: 'In Classroom, an unknown person writes: "Click here to see your grades" with a strange link. What do you do?',
    options: [
      'Don’t click it and report it to a teacher.',
      'Click it quickly to see your grades.',
      'Send the link to all your friends.',
      'Reply with your password.',
    ],
    answer: 'Don’t click it and report it to a teacher.',
  },
  {
    id: 'C3-65', section: 6, topic: 'passwords', type: 'multiple-choice',
    prompt: 'Mission: choose the best answer.', emoji: '🔐',
    content: 'What is the best way to make a strong password?',
    options: [
      'Use a long phrase with words, numbers and symbols',
      'Use your name and your birthday',
      'Use 123456',
      'Use the same password for every account',
    ],
    answer: 'Use a long phrase with words, numbers and symbols',
  },
];
