function restartTypeAssesment(){
    setSelectedTextInMainContent();
    
    clearInterval(timerInterval);
    timerInterval = null;
    currentTimer = TEST_DURATION_IN_SECONDS;
    timer.innerText = ':--';
    if(getSelectedMode() === 'timer') startTimer();
    
    currentTextLetterIndex = 0;
    evaluatedLetters = [];

    assesmentCompleted = false;
}

function startTimer(){
    if(isTryStarted()){
        timerInterval ??= window.setInterval(() => updateTimer(), 1000);
    }
}

function setDefaultConfiguration(){
    easyBtn.style.color = "hsl(210, 100%, 65%)";
    easyBtn.style.border = "1px solid hsl(210, 100%, 65%)";
    setSelectedTypeText(getTypeTextBasedOnTheDifficult());
    setSelectedTextInMainContent();

    timeModeBtn.style.color = "hsl(210, 100%, 65%)";
    timeModeBtn.style.border = "1px solid hsl(210, 100%, 65%)";
    setSelectedMode('timer');
}

function updateTimer(){
    if(currentTimer === STOP_AT_ZERO_SEC || assesmentCompleted){
        clearInterval(timerInterval);
        timerInterval = null;
        if(currentTimer === STOP_AT_ZERO_SEC) calculateResultsAndRedirectToResultsPage();
    } else {
        timer.innerText = currentTimer;
        currentTimer = currentTimer - 1;
    }
}

function calculateResultsAndRedirectToResultsPage(){
    const wordsPerMinute = calculateWordsPerMinute(correctTypeCounter, currentTimer);
    console.log('Words per minute: ', wordsPerMinute);
    const tryAccuracy = calculateAccuracy(getCurrentSelectedTextLength(), incorrectTypeCounter);
    updateFiledsOnTheUI(wordsPerMinute, tryAccuracy);
    assesmentCompleted = true;
    saveFinalResultsOnLocalStorage(correctTypeCounter,incorrectTypeCounter,wordsPerMinute,tryAccuracy, getHigherScoreAchive(wordsPerMinute, bestUserScoreAchived));
    
    redirectToSummaryTryPageAccordingResults(wordsPerMinute);
}

function redirectToSummaryTryPageAccordingResults(currentTryWordsPerMinute){
    if(isNewBaseline(bestUserScoreAchived)) window.location.href = 'view/new_baseline_established.html';
    else if(isNewHigherScoreSmashed(currentTryWordsPerMinute, bestUserScoreAchived))  window.location.href = 'view/high_scored_smashed.html';
    else window.location.href = 'view/test_complete.html';
}

function removeMainContentCover(){
    if( mainContentCover.style.display === 'none'){
        mainContentCover.style.display = 'flex';
    } else {
        mainContentCover.style.display = 'none';
    }
    mainContentText.style.filter =  'none';
}

async function getAllTheTextOpions(){
    try{
        const fileName = 'http://localhost:3000/';
        const response = await fetch(fileName, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!response.ok) throw new Error('Could not find the file');
        
        const data = await response.json();
        
        return data;
    } catch(error){
        return error.message;
    }  
}

function getSelectedDifficult(){
    return selectedDifficult;
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getTypeTextBasedOnTheDifficult(){
    const typeTextId = getRandomSelectedTextId();
    const {easy: easyTextOptions, medium: mediumTextOptions, hard: hardTextOptions} = allTypeTextArray;

    if(getSelectedDifficult() === 'easy'){
        easyTextOptions.forEach(element => {
            if(element.id === typeTextId){
                setSelectedTypeText(element.text);
            }
        });
    } else if(getSelectedDifficult() === 'medium'){
        mediumTextOptions.forEach(element => {
            if(element.id === typeTextId){
                setSelectedTypeText(element.text);
            }
        });
    } else {
        hardTextOptions.forEach(element => {
            if(element.id === typeTextId){
                setSelectedTypeText(element.text);
            }
        });
    }

    return selectedTypeText;
}

function setSelectedTextInMainContent(){
    if(currentDifficult !== selectedDifficult){
        setSelectedTypeText(getTypeTextBasedOnTheDifficult());
    }

    mainContentText.textContent = '';
    mainContentText.innerText = getSelectedTypeText();
}

function setSelectedTypeText(selectedText){
    selectedTypeText = selectedText;
    //selectedTypeText = "holi";
    selectedTextLenght = selectedTypeText.length;
}

function getSelectedTypeText(){
    return selectedTypeText;
}

function getRandomSelectedTextId(){
    const randomTextId = getRandomInt(1, MAX_TEXT_PER_DIFICULT);
    return getSelectedDifficult() + '-' + randomTextId;
}

function isThePressedLetterEqualsToCurrentLetter(keyPressed){
    return getCurrentLetterOnText() === keyPressed
                    ? true
                    : false;
}

function getCurrentLetterOnText(){
    return selectedTypeText.substring(currentTextLetterIndex, currentTextLetterIndex + 1);
}

function getNextLetterToFocusOnText(){
    return selectedTypeText.substring(currentTextLetterIndex + 1, currentTextLetterIndex + 2);
}

function getCurrentSelectedTextLength(){
    return selectedTextLenght;
}

function paintCurrentLetterAndUpdateText(isCorrectLetter){
    removeTheCurrentFocusLetter();

    const spamStylishedCurrentLetter = getCurrentLetterStylished(isCorrectLetter);
    appendCurrentLetterToEvaluatedLettersArray(spamStylishedCurrentLetter);

    const spamStylishedNextFocusLetter = getNextFocusLetterStylished();
    appendCurrentLetterToEvaluatedLettersArray(spamStylishedNextFocusLetter);

    const entireTextStylished = buildTextWithEvaluatedLetters();
    updateTextWithCurrentLetterStylished(entireTextStylished);
    currentTextLetterIndex = currentTextLetterIndex + 1;
}

function getCurrentLetterStylished(isCorrectLetter){
    const span = document.createElement('span');
    span.textContent = getCurrentLetterOnText();

    span.style.background = 'hsl(0, 0%, 7%)';
    
    if(isCorrectLetter){
        span.style.color = `hsl(140, 63%, 57%)`;
        
    } else {
        span.style.color = `hsl(354, 63%, 57%)`;
        span.style.textDecoration = 'underline';
        span.style.textDecorationColor = 'hsl(354, 63%, 57%)';
    }
    return span;
}

function getNextFocusLetterStylished(){
    const span = document.createElement('span');
    span.textContent = getNextLetterToFocusOnText();
    
    span.style.background = 'hsl(240, 3%, 46%)';
        
    return span;
}

function appendCurrentLetterToEvaluatedLettersArray(currentLetterAsSpanElement){
    evaluatedLetters.push(currentLetterAsSpanElement);
}

function getRemainingTextWithoutCurrentLetter(){
    const spanRemainingText = document.createElement('span');
    spanRemainingText.textContent = selectedTypeText.substring(currentTextLetterIndex + 2);
    return spanRemainingText;
}

function buildTextWithEvaluatedLetters(){
    const fragment = document.createDocumentFragment();

    evaluatedLetters.forEach((spamElement) => {
        fragment.appendChild(spamElement);
    });

    fragment.appendChild(getRemainingTextWithoutCurrentLetter());
    return fragment;
}

function updateTextWithCurrentLetterStylished(fragment){
    mainContentText.textContent = '';
    mainContentText.replaceChildren(fragment);
}

function setSelectedMode(modeId){
    selectedMode = modeId;
}

function getSelectedMode(){
    return selectedMode;
}

function updateCurrentDifficult(newSelectedDifficult){
    currentDifficult = newSelectedDifficult;
}

function removeTheCurrentFocusLetter(){
    evaluatedLetters.pop();
}

function updateCorrectTypeCounter(){
    correctTypeCounter = correctTypeCounter + 1;
}

function updateIncorrectTypeCounter(){
    incorrectTypeCounter = incorrectTypeCounter + 1;
}

function calculateWordsPerMinute(totalCorrectTextCharacters, secondsToCompleteTest){
    return (totalCorrectTextCharacters * 60) / (5 * secondsToCompleteTest);
}
function calculateAccuracy(totalTextCharacters, totalIncorrectTypeCounter){
    const failPercentace = (100 * totalIncorrectTypeCounter) / totalTextCharacters;
    const currentTryAccuracy = 100 - failPercentace;
    return currentTryAccuracy;
}
function updateFiledsOnTheUI(calculatedWordsPerMinute, tryAccuracy){
    wordsPerMinuteUIRef.innerText = Math.trunc(calculatedWordsPerMinute);
    accuracyValueUIRef.innerText = Math.trunc(tryAccuracy);
}


function slideDownAndFadeOutPanelContent(panelToAnimate, direction){
    panelToAnimate.style.animationName = 'slide-down-and-fade-out';
    panelToAnimate.style.animationDuration = '1s';
    panelToAnimate.style.animationTimingFunction = 'ease';
    panelToAnimate.style.animationDirection = direction;
    panelToAnimate.style.animationFillMode = 'forwards';
    panelToAnimate.animationDelay = '300ms';
}

function slideUpAndFadeInPanelCompleted(panelToAnimate, direction){
    panelToAnimate.style.animationName = 'slide-up-and-fade-in';
    panelToAnimate.style.animationDuration = '1s';
    panelToAnimate.style.animationTimingFunction = 'ease';
    panelToAnimate.style.animationDirection = direction;
    panelToAnimate.style.animationFillMode = 'forwards';
}

function getHigherScoreAchive(currenTrytWordsPerMinute, bestScoreAchived){
    return currenTrytWordsPerMinute > bestScoreAchived
            ? currenTrytWordsPerMinute
            :bestScoreAchived;
}

function isNewHigherScoreSmashed(currenTrytWordsPerMinute, bestScoreAchived){
    return currenTrytWordsPerMinute > bestScoreAchived;
}

function isNewBaseline(currentWordsPerMinuteRecord){
    return currentWordsPerMinuteRecord === 0;
}

function updateBestUserScoreAchived(newObtainedScore){
    bestUserScoreAchived = newObtainedScore;
}