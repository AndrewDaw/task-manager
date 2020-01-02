
const email = document.querySelector('#email')
const password = document.querySelector('#password')


const weatherForm = document.querySelector('form')
const goButton = document.querySelector('button')
const searchEle = document.querySelector('input')
goButton.onclick = function(){
  var user_login = ('{ "email":"' +email.value+'",'+' "password":"'+password.value+'"}')
  var new_user = ('{ "name":"dummy",'+'"email":"' +email.value+'",'+' "password":"'+password.value+'"}')
    
    fetch('/users/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: user_login
    }).then(res=>res.json())
      .then(res => console.log(res))
      .catch(err => {
        console.log(new_user)
        fetch('/users', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: new_user
        }).then(res=>res.json())
          .then(res => console.log(res))
          .catch(err => {
            
          });
      });


    //window.location='/my-tasks';

}



