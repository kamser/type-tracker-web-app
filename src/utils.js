

function getDataFinalResultsFromLocalStorage(){

    try {
        const storedData = window.localStorage.getItem('final-results');

        if(!storedData) return {
            correctTypeCounter : 0,
            incorrectTypeCounter : 0,
            wordsPerMinutesResult : 0,
            accuracyResult : 0, 
            personalBestScore: 0,
            isDataLoaded: false
        };

        const parsedStoredfinalResults = JSON.parse(storedData);

        console.log(parsedStoredfinalResults);

        return {
            correctTypeCounter : parsedStoredfinalResults.correctTypeCounter,
            incorrectTypeCounter : parsedStoredfinalResults.incorrectTypeCounter,
            wordsPerMinutesResult : parsedStoredfinalResults.wordsPerMinutesResult,
            accuracyResult : parsedStoredfinalResults.accuracyResult, 
            personalBestScore: parsedStoredfinalResults.personalBestScore,
            isDataLoaded: true
        };
    } catch (error) {
        throw new Error("Something went wrong with localStorage" + error);
    }

    
}

function saveFinalResultsOnLocalStorage(correctTypeCounter, incorrectTypeCounter, wordsPerMinutesResult, accuracyResult, personalBestScore){
    try {
        if(window.localStorage.getItem('final-results')) window.localStorage.clear();
        
        const finalResults = {
            correctTypeCounter : correctTypeCounter,
            incorrectTypeCounter : incorrectTypeCounter,
            wordsPerMinutesResult :  Math.trunc(wordsPerMinutesResult),
            accuracyResult :  Math.trunc(accuracyResult), 
            personalBestScore:  Math.trunc(personalBestScore)
        }
        console.log(finalResults);
        window.localStorage.setItem('final-results', JSON.stringify(finalResults));
    } catch (error) {
        throw new Error("Something went wrong with localStorage" + error);
    }
    
}

function updateBasicUIUsingFinalResults(finalResult, personalBestScoreUIRef, wordsPerMinUIRef, accuracyUIRef, charactersUIRef){
    if (!finalResult.isDataLoaded) return;

    if(charactersUIRef !== null){
        personalBestScoreUIRef.innerText = finalResult.personalBestScore;
        charactersUIRef.innerText = finalResult.correctTypeCounter + "/" + finalResult.incorrectTypeCounter;
        wordsPerMinUIRef.innerText = finalResult.wordsPerMinutesResult;
        accuracyUIRef.innerText = finalResult.accuracyResult;
    } else {
        personalBestScoreUIRef.innerText = finalResult.personalBestScore;
        wordsPerMinUIRef.innerText = finalResult.wordsPerMinutesResult;
        accuracyUIRef.innerText = finalResult.accuracyResult;
    }
}