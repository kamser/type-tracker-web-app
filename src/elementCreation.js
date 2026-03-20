const $ = el => document.querySelector(el);

const mainTypeTestSection = $('#main-content');
const completedTypeTestSection = $('#test-complete-content');
const baselineStablishSection = $('#baseline-established-content');
const highScoredSmashedContent = $('#high-scored-smashed-content');
const mainContentCover = $('#main-content-cover');

const personalBestScoreUIRef = $('#personal-best-score');
//personalBestScore.innerText = 'holi';

const wordsPerMinuteUIRef = $('#word-per-minute-value');
const accuracyValueUIRef = $('#accuracy-value');
const timer = $('#time-value');

const easyBtn = $('#easy-btn');
const mediumBtn = $('#medium-btn');
const hardBtn = $('#hard-btn');

const timeModeBtn = $('#time-mode-btn');
const passagerModeBtn = $('#passage-mode-btn');

const mainContentText = $('#main-content-text');

const restartBtn = $('#restart-type-test-btn');
const startBtn = $('#start-type-test-btn');

const testCompletePanel = $('#test-complete-content');
const tryAgainBtn = $('.try-again-btn');

const TEST_DURATION_IN_SECONDS = 60;
const STOP_AT_ZERO_SEC = 45;
let currentTimer = TEST_DURATION_IN_SECONDS;

let currentTextLetterIndex = 0;
const lastLetterIndex = 100;
const selectedText = mainContentText.textContent;

const MAX_TEXT_PER_DIFICULT = 11;

let timerInterval; 

let allTypeTextArray;

const DEFAULT_DIFFICULT = 'easy';

let selectedDifficult = DEFAULT_DIFFICULT;
let currentDifficult = selectedDifficult;

let selectedTypeText = '';

let evaluatedLetters = [];

const DEFAULT_MODE = 'timer';

let selectedMode = DEFAULT_MODE;

let selectedTextLenght = 0;

let correctTypeCounter = 0;
let incorrectTypeCounter = 0;
let bestUserScoreAchived = 0;

let assesmentCompleted = false;

let tryStarted = false;


function isTryStarted(){
    return tryStarted;
}

function startTry(){
    tryStarted = true;
}