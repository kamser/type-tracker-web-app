tryAgainBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'C:/Users/kams/Documents/Docs/front-end/front-end-challange/typing-speed-test-main/index.html';
});

const loadFinalResults = getDataFinalResultsFromLocalStorage();

updateBasicUIUsingFinalResults(loadFinalResults, personalBestScoreUI, wordsPerMinuteUI, accuracyUI, charactersUI);