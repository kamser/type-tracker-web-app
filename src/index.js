/*getAllTheTextOpions()
.then(data => {
    //la data desde el fetch viene como texto plano siempre??>
    allTypeTextArray = JSON.parse( data );
    setDefaultConfiguration();
})
.catch(error => console.log(error));*/
setDefaultConfiguration();

hideRestartSection();

const loadFinalResults = getDataFinalResultsFromLocalStorage();

const {bestScoreAchived} = getUserDataFromLocalStorage();

if(loadFinalResults.isDataLoaded){
    updateNavbarInfoUsingFinalResults(loadFinalResults);
    updateBestUserScoreAchived(loadFinalResults.personalBestScore);
} else {
    updateBestUserScoreAchived(bestScoreAchived);
}

updateUsernameAndBestScoreAchiveOnUI();


