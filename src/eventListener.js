startBtn.addEventListener('click', e => {
    e.preventDefault();

    removeMainContentCover();

    showRestartSection();

    startTry();

    if(getSelectedMode() === 'timer') startTimer();
    
});

timeModeBtn.addEventListener('click', e => {
    e.preventDefault();
    if(getSelectedMode() === 'timer') return;

    timeModeBtn.style.color = "hsl(210, 100%, 65%)";
    timeModeBtn.style.border = "1px solid hsl(210, 100%, 65%)";

    passagerModeBtn.style.color = "hsl(0, 0%, 100%)";
    passagerModeBtn.style.border = "1px solid hsl(240, 1%, 59%)";

    setSelectedMode('timer');
    restartTypeAssesment();
});

passagerModeBtn.addEventListener('click', e => {
    e.preventDefault();
    if(getSelectedMode() === 'passager') return;

    passagerModeBtn.style.color = "hsl(210, 100%, 65%)";
    passagerModeBtn.style.border = "1px solid hsl(210, 100%, 65%)";

    timeModeBtn.style.color = "hsl(0, 0%, 100%)";
    timeModeBtn.style.border = "1px solid hsl(240, 1%, 59%)";
    setSelectedMode('passager');
    restartTypeAssesment();
});

easyBtn.addEventListener('click', e => {
    e.preventDefault();
    if(getSelectedDifficult() === 'easy') return;
    selectedDifficult = 'easy';
    easyBtn.style.color = "hsl(210, 100%, 65%)";
    easyBtn.style.border = "1px solid hsl(210, 100%, 65%)";

    mediumBtn.style.color = "hsl(0, 0%, 100%)";
    mediumBtn.style.border = "1px solid hsl(240, 1%, 59%)";
    hardBtn.style.color = "hsl(0, 0%, 100%)";
    hardBtn.style.border = "1px solid hsl(240, 1%, 59%)";

    setSelectedTextInMainContent();
    updateCurrentDifficult(selectedDifficult);
    restartTypeAssesment();
});

mediumBtn.addEventListener('click', e => {
    e.preventDefault();
    if(getSelectedDifficult() === 'medium') return;
    selectedDifficult = 'medium';
    mediumBtn.style.color = "hsl(210, 100%, 65%)";
    mediumBtn.style.border = "1px solid hsl(210, 100%, 65%)";

    easyBtn.style.color = "hsl(0, 0%, 100%)";
    easyBtn.style.border = "1px solid hsl(240, 1%, 59%)";
    hardBtn.style.color = "hsl(0, 0%, 100%)";
    hardBtn.style.border = "1px solid hsl(240, 1%, 59%)";

    setSelectedTextInMainContent();
    updateCurrentDifficult(selectedDifficult);
    restartTypeAssesment();
});

hardBtn.addEventListener('click', e => {
    e.preventDefault();
    if(getSelectedDifficult() === 'hard') return;
    selectedDifficult = 'hard';
    hardBtn.style.color = "hsl(210, 100%, 65%)";
    hardBtn.style.border = "1px solid hsl(210, 100%, 65%)";

    easyBtn.style.color = "hsl(0, 0%, 100%)";
    easyBtn.style.border = "1px solid hsl(240, 1%, 59%)";
    mediumBtn.style.color = "hsl(0, 0%, 100%)";
    mediumBtn.style.border = "1px solid hsl(240, 1%, 59%)";

    setSelectedTextInMainContent();
    updateCurrentDifficult(selectedDifficult);
    restartTypeAssesment();
});

document.addEventListener('keypress', e => {
    e.preventDefault();
    
    if(currentTextLetterIndex >= selectedTextLenght) {
        calculateResultsAndRedirectToResultsPage();
    };

    if(isThePressedLetterEqualsToCurrentLetter(e.key)){
        paintCurrentLetterAndUpdateText(true);
        updateCorrectTypeCounter();
    } else {
        paintCurrentLetterAndUpdateText(false);
        updateIncorrectTypeCounter();
    }
});

restartBtn.addEventListener('click', e => {
    e.preventDefault();
    restartTypeAssesment();
});

logoutLink.addEventListener('click', e => {
    e.preventDefault();
    localStorage.clear()
    redirectToLoginPage();
})