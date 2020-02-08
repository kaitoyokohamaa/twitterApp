// ユーザー登録
const postBtn = document.getElementById('post-btn');
const user_name=document.getElementById('UserName');
const user_bio=document.getElementById('User');
const user_mail=document.getElementById('Email');
const user_pass=document.getElementById('Password');
const user_confirmpass=document.getElementById('ConfirmPassword');

    const sendHttpRequest = (method, url, data) => {
        return fetch(url, {
          method: method,
          body: JSON.stringify(data),
          headers: data ? { 'Content-Type': 'application/json' } : {}
        }).then(response => {
          if (response.status >= 400) {
            // !response.ok
            return response.json().then(errResData => {
              const error = new Error('Something went wrong!');
              error.data = errResData;
              throw error;
            });
          }
          return response.json();
        });
      };
const sendData = () => {
    sendHttpRequest('POST', 'https://teachapi.herokuapp.com/sign_up', {
            "sign_up_user_params": {
                "name": user_name.value,
                "bio":  user_bio.value,
                "email":  user_mail.value,
                "password": user_pass.value,
                "password_confirmation":  user_confirmpass.value
            }
        })
        .then(json => {
            //ユーザ生成時に以下の情報をローカルストレージに入れる。
            localStorage.token = json.token,
            localStorage.id = json.id,
            localStorage.name = json.name,
            localStorage.bio = json.bio
            window.location.href = 'timeline.html';
        })
        .then(responseData => {
            console.log(responseData);
        })
        
        .catch(err => {
            console.log(err, err.data);
        });
};
postBtn.addEventListener('click', sendData);

