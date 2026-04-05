

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
        if(window.localStorage.getItem('final-results')) window.localStorage.removeItem('final-results');
        
        const finalResults = {
            correctTypeCounter : correctTypeCounter,
            incorrectTypeCounter : incorrectTypeCounter,
            wordsPerMinutesResult :  Math.trunc(wordsPerMinutesResult),
            accuracyResult :  Math.trunc(accuracyResult), 
            personalBestScore:  Math.trunc(personalBestScore)
        }

        window.localStorage.setItem('final-results', JSON.stringify(finalResults));
    } catch (error) {
        throw new Error("Something went wrong with localStorage" + error);
    }
}


function getUserDataFromLocalStorage(){

    try {
        const userData = window.localStorage.getItem('user-data');

        if(!userData) return null;

        const parsedUserData = JSON.parse(userData);

        const {auth, token, username, bestScoreAchived} = parsedUserData;

        return {
            auth,
            token,
            username, 
            bestScoreAchived
        };
    } catch (error) {
        throw new Error("Something went wrong with localStorage" + error);
    }

    
}

function saveUserDataOnLocalStorage(loginDataFromResponse){
    const {auth, token, username, bestScoreAchived} = loginDataFromResponse;
    try {
            if(window.localStorage.getItem('user-data')) window.localStorage.removeItem('user-data');
            
            const userData = {
                auth,
                token,
                username,
                bestScoreAchived 
            }
            window.localStorage.setItem('user-data', JSON.stringify(userData));
        } catch (error) {
            throw new Error("Something went wrong with localStorage" + error);
        }
}

function updateUsernameAndBestScoreAchiveOnUI(){
    const userData = getUserDataFromLocalStorage();

    if(userData){
        personalBestScoreUIRef.innerText = userData.bestScoreAchived + " WPM" ;
        userNameBtn.innerText  = userData.username;
        userNameBtn.style.fontSize = '25px';
    }
}

function updateBasicUIUsingFinalResults(finalResult){
    if (!finalResult.isDataLoaded) return;
    
    personalBestScoreUIRef.innerText = finalResult.personalBestScore + " WPM" ;
    charactersUIRef.innerText = finalResult.correctTypeCounter + "/" + finalResult.incorrectTypeCounter;
    wordsPerMinuteUIRef.innerText = finalResult.wordsPerMinutesResult;
    accuracyUIRef.innerText = finalResult.accuracyResult;
}

function updateNavbarInfoUsingFinalResults(finalResult){
    if (!finalResult.isDataLoaded) return;

    personalBestScoreUIRef.innerText = finalResult.personalBestScore;
    wordsPerMinuteUIRef.innerText = finalResult.wordsPerMinutesResult;
    accuracyUIRef.innerText = finalResult.accuracyResult;
}

function redirectToLoginPage(){
    window.location.href = '/';
}