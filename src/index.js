getAllTheTextOpions()
.then(data => {
    //la data desde el fetch viene como texto plano siempre??>
    allTypeTextArray = JSON.parse( data );
    setDefaultConfiguration();
})
.catch(error => console.log(error));

const loadFinalResults = getDataFinalResultsFromLocalStorage();

if(loadFinalResults){
    updateBasicUIUsingFinalResults(loadFinalResults, personalBestScoreUIRef, wordsPerMinuteUIRef, accuracyValueUIRef, null);
    updateBestUserScoreAchived(loadFinalResults.personalBestScore);
}



