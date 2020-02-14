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

const url = 'https://teachapi.herokuapp.com/users';

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
  sendHttpRequestlgt('GET', url)
    .then(json => {
      let markup = "";
      json.forEach(element => {
        markup += `<div class="col mb-4"><div class="card h-100"><img src="img/ryusei.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="acount">＠${element.id}</p>
          <p class="card-text">${element.bio}</p>
          <p class="card-text"><a href="fix.html">ユーザー編集</a></p>
        </div>
      </div>
    </div>`;
      });
      let h = document.getElementById('userrs');
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
// ユーザー編集
const sendHttpRequestlge = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
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
const myID = localStorage.getItem('id');
console.log(myID)
const newurl = `https://teachapi.herokuapp.com/users/${myID}`
console.log(newurl)

const jsendlgDatas = () => {
  sendHttpRequestlge('PUT', newurl, {
      "user_params": {
        "name": document.getElementById('rename').value,
        "bio": document.getElementById('rebio').value,
      }
    })
    .then(json => {
      localStorage.name = json.name,
        localStorage.bio = json.bio
      window.location.href = 'user.html';
    })
    .then(responseData => {
      console.log(responseData);
    })

    .catch(err => {
      console.log(err, err.data);
    });
};
const popo = document.getElementById('post-lgtbtnr')
if (popo) {
  popo.addEventListener('click', jsendlgDatas);
}

//アカウントの削除
const sendHttpRequesdtlge = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
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

const jsendlgDatasc = () => {
  sendHttpRequesdtlge('DELETE', newurl, )
    .then(json => {
      localStorage.name = json.name,
        localStorage.bio = json.bio
      window.location.href = 'user.html';
    })
    .then(responseData => {
      console.log(responseData);
    })

    .catch(err => {
      console.log(err, err.data);
    });
};
const poppoo = document.getElementById('post-lgldbtn')
if (poppoo) {
  poppoo.addEventListener('click', jsendlgDatasc);
}
//投稿
const sendfHttpRequestlg = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
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
console.log(localStorage.token)
const sendflgData = () => {
  sendfHttpRequestlg('POST', 'https://teachapi.herokuapp.com/posts', {
      "post_params": {
        "text": document.getElementById('postpost').value,
      }
    })
    .then(json => {
      console.log(json)
      window.location.href = 'timeline.html';
    })
    .then(responseData => {
      console.log(responseData);
    })

    .catch(err => {
      console.log(err, err.data);
    });
};
const postbttn = document.getElementById('post-lgvtbtnr')
if (postbttn) {
  postbttn.addEventListener('click', sendflgData);
}
// ユーザーのタイムライン
const MYurl = `https://teachapi.herokuapp.com/users/${myID}/timeline`;

if (!localStorage.token) {
  window.location.href = 'login.html';
}
const sendHttpRequesftlgt = (method, url) => {
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
const senddlgdData = () => {
  sendHttpRequesftlgt('GET', MYurl)
    .then(json => {
      console.log(json)
      let markuped = "";
      json.forEach(element => {
        markuped += `<div class="twitter__block">
      <figure>
          <img src="./img/ryusei.jpg" />
      </figure>
      <div class="twitter__block-text">
          <div class="name">${element.user.name}<span class="name_reply">@${element.id}</span></div>
          <div class="date">${element.user.created_at}</div>
          <div class="text">
              ${element.text}
          </div>
          <div class="twitter__icon">
              <span class="twitter-bubble"></span>
              <span class="twitter-loop"></span>
              <span class="twitter-heart"></span>
          </div>
      </div>
  </div>`;
      });
      let hd = document.getElementById('timeline');
      hd.insertAdjacentHTML('beforeend', markuped);
      console.log(json.stringify);
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
};
const timelinelogo = document.getElementById('logo')
if (timelinelogo) {
  timelinelogo.addEventListener('click', senddlgdData);
}
//投稿編集
const postrefix = document.getElementById("re_post")
if (postrefix) {
  postrefix.addEventListener("click", (event) => {
    event.preventDefault();
    const sendreposts = (method, url, data) => {
      return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
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
    const edit_text_id = document.querySelector("#edit_text_id").value;
    console.log(edit_text_id)
    const reposturl = `https://teachapi.herokuapp.com/posts/${edit_text_id}`;
    const sendposts = () => {
      sendreposts('PUT', reposturl, {
          "post_params": {
            "text": document.getElementById('repost').value,
          }
        })
        .then(json => {
          console.log(json)
          localStorage.text = json.text;
          window.location.href = 'timeline.html';
        })
        .then(responseData => {
          console.log(responseData);
        })

        .catch(err => {
          console.log(err, err.data);
        });
    };
    const repost_btn = document.getElementById('re_post')
    const result = document.getElementsByClassName('btn-success');
    console.log(repost_btn)
    console.log(result)
    if (repost_btn) {
      repost_btn.addEventListener('click', sendposts);
    }
  });
}
//投稿削除
const postdel = document.getElementById("del_post")
if (postdel) {
  postdel.addEventListener("click", (event) => {
    event.preventDefault();
    const deletrequest = (method, url, data) => {
      return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
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

    const delet_text_id = document.querySelector("#edit_text_id").value;
    const deleteurl = `https://teachapi.herokuapp.com/posts/${delet_text_id}`

    const deletefetched = () => {
      deletrequest('DELETE', deleteurl, )
        .then(json => {
          console.log(json)
          window.location.href = 'timeline.html';
        })
        .then(responseData => {
          console.log(responseData);
        })

        .catch(err => {
          console.log(err, err.data);
        });
    };
    const del_posts = document.getElementById('del_post')
    if (del_posts) {
      del_posts.addEventListener('click', deletefetched);
    }
  });
}
//タイムラインのページを取得する。
const show_timeline = document.getElementById('timeline_submit')
if (show_timeline) {
  show_timeline.addEventListener("click", (event) => {
    event.preventDefault();
    const users_pages = document.getElementById('pages').value;
    const users_limits = document.getElementById('limits').value;
    const users_querys = document.getElementById('querys').value;

    const MY_url = `https://teachapi.herokuapp.com/users/${myID}/timeline?page=${users_pages}&limit=${users_limits}&query=${users_querys}`;

    if (!localStorage.token) {
      window.location.href = 'login.html';
    }
    const users_timeline = (method, url) => {
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
    const sendtimeline = () => {
      users_timeline('GET', MY_url)
        .then(json => {
          console.log(json)
          let time = "";
          json.forEach(element => {
            time += `<div class="twitter__block">
        <figure>
            <img src="./img/ryusei.jpg" />
        </figure>
        <div class="twitter__block-text">
            <div class="name">${element.user.name}<span class="name_reply">@${element.id}</span></div>
            <div class="date">${element.user.created_at}</div>
            <div class="text">
                ${element.text}
            </div>
            <div class="twitter__icon">
                <span class="twitter-bubble"></span>
                <span class="twitter-loop"></span>
                <span class="twitter-heart"></span>
            </div>
        </div>
    </div>`;
          });
          let hd = document.getElementById('timeline');
          hd.insertAdjacentHTML('beforeend', time);
          console.log(json.stringify);
        })
        .then(responseData => {
          console.log(responseData);
        })
        .catch(err => {
          console.log(err, err.data);
        });
    };
    const get_data = document.getElementById('timeline_submit')
    if (get_data) {
      get_data.addEventListener('click', sendtimeline);
    }
  });
}