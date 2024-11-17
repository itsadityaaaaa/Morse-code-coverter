// Morse Code Dictionary
const MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '0': '-----', ',': '--..--',
    '.': '.-.-.-', '?': '..--..', '/': '-..-.', '-': '-....-',
    '(': '-.--.', ')': '-.--.-', ' ': '/'
  };
  
  // Sound files (ensure correct path)
  const dotSound = new Audio('assets/dot.wav');  // Path to dot sound
  const dashSound = new Audio('assets/dash.wav');  // Path to dash sound
  
  // Function to play sound for Morse code symbols
  function playMorseSound(symbol) {
    if (symbol === '.') {
      dotSound.play();  // Play dot sound
    } else if (symbol === '-') {
      dashSound.play();  // Play dash sound
    }
  }
  
  // Translation Functions
  function encryptToMorse(text) {
    return text.toUpperCase()
      .split('')
      .map(char => {
        const morse = MORSE_CODE_DICT[char] || '?';  // Get the Morse code for each character
        if (morse !== '?') {
          morse.split('').forEach(playMorseSound);  // Play sound for each symbol
        }
        return morse;
      })
      .join(' ');
  }
  
  function decryptFromMorse(morse) {
    const reverseDict = Object.fromEntries(Object.entries(MORSE_CODE_DICT).map(([key, value]) => [value, key]));
    const text = morse
      .trim()
      .split(' ')
      .map(code => reverseDict[code] || '?')  // Decode Morse to text
      .join('');
  
    // Play sound for each decoded symbol
    text.split('').forEach(playMorseSound);  // Play sound for each decoded letter
  
    return text;
  }
  
  // Real-time Translation (Both encrypt and decrypt)
  document.getElementById('message').addEventListener('input', (event) => {
    const message = event.target.value;
    let result;
  
    // If the input text is Morse code (contains "." or "-"), decrypt it.
    if (message.match(/[\.\-\/\s]/)) {
      result = decryptFromMorse(message);
    } else {
      result = encryptToMorse(message);
    }
  
    document.getElementById('result').textContent = result;
  });
  