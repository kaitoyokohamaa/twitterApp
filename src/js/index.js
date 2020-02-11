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
    headers: data ? {
      'Content-Type': 'application/json'
    } : {}
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
        "bio": user_bio.value,
        "email": user_mail.value,
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

if (postBtn) {
  postBtn.addEventListener('click', sendData);
}


// ユーザーログイン
const sendHttpRequestlg = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? {
      'Content-Type': 'application/json'
    } : {}
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
if (postlgBtn) {
  postlgBtn.addEventListener('click', sendlgData);
}

// ユーザー一覧
const getinfo = document.getElementById('post-lgtbtn');

if (!localStorage.token) {
  window.location.href = 'login.html';
}

const sendHttpRequestlgt = (method, url) => {
  return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(response => {
      if (response.status >= 400) {
        // !response.ok
        return response.json()
          .then(errResData => {
            const error = new Error('Something went wrong!');
            error.data = errResData;
            throw error;
          });
      }
      return response.json();
    });
};
const sendlgdData = () => {
  sendHttpRequestlgt('GET', 'https://teachapi.herokuapp.com/users')
    .then(json => {
      const markup = `<div class="col mb-4"><div class="card h-100"><img src="img/ryusei.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${localStorage.name}</h5>
          <p class="acount">＠${localStorage.token}</p>
          <p class="card-text">${localStorage.bio}</p>
        </div>
      </div>
    </div>`;
      const h=document.getElementById('userrs');
      h.insertAdjacentHTML('beforeend', markup);
      console.log(json.stringify);
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
};

if (getinfo) {
  getinfo.addEventListener('click', sendlgdData);
}
