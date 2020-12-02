function back4appUrl(){
    return "https://parseapi.back4app.com/classes/comments";
}

function back4appHeaders(){
    return {
        "X-Parse-Application-Id": "Hse44zkxoHxwG8MYfv2pOl38SkQnOaN8mMsD6guN",
        "X-Parse-REST-API-Key": "4RR3E1lXFC0tOGkEWfEOs5odA3fGznnZfItwHWUy"
    };
}

function processOpnFrmData(event){
    event.preventDefault();

    const formName = document.getElementById("name").value.trim();
    const formEmail = document.getElementById("email").value.trim();
    const formComment = document.getElementById("comment").value.trim(); 
    const formCountry = document.getElementById("country").value.trim(); 
    const formGender = document.querySelector('input[name = gender]:checked').value.trim();
    const formLike = document.getElementById("like").checked;
        
    if(formName == "" || formComment == "" || formEmail == ""){
        window.alert("Please, fill all you need to submit form");
        return;
    }

    const newComment = {
        name : formName,
        email : formEmail,
        comment : formComment,
        country : formCountry,
        gender : formGender,
        like : formLike,
    }

    console.log(newComment);

    const reqHeaders=back4appHeaders();
    reqHeaders["Content-Type"]="application/json";


    const init={
        headers: reqHeaders,
        method: 'POST',
        body: JSON.stringify(newComment)
    }

    console.log(init);

    fetch(back4appUrl(),init)
        .then(response =>{      //fetch promise fullfilled (operation completed successfully)
            if(response.ok){    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                return response.json(); //we return a new promise with  the response data in JSON to be processed
            }else{ //if we get server error
                return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
            }
        })
        .then(responseJSON => { //here we process the returned response data in JSON ...
            console.log(`Opinion added at ${responseJSON.createdAt} with id=${responseJSON.objectId}. `);
            window.alert('Your opinion has been saved');
            window.location.hash="#opinions";
        })
        .catch (error => { ////here we process all the failed promises
            window.alert(`Failed to save your opinion: ${error}`);
        });
}