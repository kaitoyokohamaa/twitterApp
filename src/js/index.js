import {
    postBtn,
    user_name,
    user_bio,
    user_mail,
    user_pass,
    user_confirmpass,
    postlgBtn,
    user_maillg
} from './models/userlogin';

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

// ユーザーログイン
const sendHttpRequestlg = (method, url, data) => {
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
const sendlgData = () => {
sendHttpRequestlg('POST', 'https://teachapi.herokuapp.com/sign_in', {
	"sign_in_user_params": {
                 "email": user_maillg.value,
                 "password": user_pass.value,
                 "password_confirmation": user_confirmpass.value
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
postlgBtn.addEventListener('click', sendlgData);