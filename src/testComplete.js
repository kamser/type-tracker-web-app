tryAgainBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/view/assesment.html';
});

logoutLink.addEventListener('click', e => {
    e.preventDefault();
    window.localStorage.clear();
    redirectToLoginPage();
})

const loadFinalResults = getDataFinalResultsFromLocalStorage();

if(loadFinalResults.isDataLoaded){
    updateUsernameAndBestScoreAchiveOnUI();
    updateBasicUIUsingFinalResults(loadFinalResults);
} else {
    //redirectToLoginPage();
}
