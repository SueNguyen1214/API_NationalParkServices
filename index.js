'use strict';
const apiKey="3h1ex3Ma1LBiBrY2DSWcrOwvTH9lY4BRmvJuedR0";
const searchUrl="https://developer.nps.gov/api/v1/parks";
//This fucntion is to generate the query for the search
function formatQueryParams(params){
    const queryItems= Object.keys(params).map(key =>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
//This function is to display the list of avaialble parks for the chsoen areas
function displayParks(responseJson){
    console.log(responseJson)
    $('#js-error-message').empty();
    $('#resultsList').empty();//Remove the previous results
    $('#message').html('');
    if (responseJson.data.length===0){
        $('#message').html('There is no result found for your search');
    }else{
        for (let i=0; i<responseJson.data.length;i++){
            let parkName=responseJson.data[i].fullName;
            let parkDescription=responseJson.data[i].description;
            let parkUrl=responseJson.data[i].url;
            console.log(parkName);
            console.log(parkDescription);
            console.log(parkUrl);
            $('#message').html('These are the list of national parks for your chosen state(s) ');
            $('#resultsList').append(
                `<li>
                    <h3>Park Name:${parkName}</h3>
                    <p>Park Description:${parkDescription}</p>
                    <a href='${parkUrl}' target="_blank">${parkUrl}</a>
                </li>`) 
        }       
    }
    $('.results').removeClass('hidden');
}
//This fucntion is to fetch the info from the National Park Services Website
function getParksInfo(searchStates, maxResult=10){
    const params={
        stateCode: searchStates,
        limit:maxResult,
        api_key: apiKey
        
    }
    const queryString=formatQueryParams(params)
    console.log(queryString);
    const url=searchUrl+'?'+queryString;
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then (responseJson => displayParks(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        
    });
}

//This function is to collect the state and maxreturn the users submit
function watchform(){
    $('form').submit(event =>{
        event.preventDefault();
        const searchStates=$('#states').val();
        console.log(searchStates);
        const maxResult=$('#maxResult').val();
        getParksInfo(searchStates,maxResult);
    })

}
$(watchform);