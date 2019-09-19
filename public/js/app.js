
const email = document.querySelector('#email')
const password = document.querySelector('#password')


const weatherForm = document.querySelector('form')
const goButton = document.querySelector('button')
const searchEle = document.querySelector('input')
goButton.onclick = function(){
    console.log("hey")
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      "name": "dummy",
      "email": email.value,
      "password": password.value
    }));
    window.location='/my-tasks';

}



