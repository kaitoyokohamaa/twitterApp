//新規登録に必要な変数。
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
//新規登録に必要な変数。
//ローカルストレージ関連
const myID = localStorage.getItem('id');
const getchstid = localStorage.getItem('chatroom_id')
//使うURL達
const url = 'https://teachapi.herokuapp.com/sign_up';
const urlsign = 'https://teachapi.herokuapp.com/sign_in';
const urls = 'https://teachapi.herokuapp.com/users';
const urlfix = `https://teachapi.herokuapp.com/users/${myID}`;
const posurl = `https://teachapi.herokuapp.com/posts`;
const urltimeline = `https://teachapi.herokuapp.com/users/${myID}/timeline`;
const chatroomurl = 'https://teachapi.herokuapp.com/chatrooms';
const chatfollwer = `https://teachapi.herokuapp.com/users/${myID}/followings`;
const chat_nowfolower = `https://teachapi.herokuapp.com/users/${myID}/followers`;
//新規登録
const sendData = () => {
  fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "sign_up_user_params": {
          "name": user_name.value,
          "bio": user_bio.value,
          "email": user_mail.value,
          "password": user_pass.value,
          "password_confirmation": user_confirmpass.value
        }
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      //ユーザ生成時に以下の情報をローカルストレージに入れる。
      console.log(json)
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
if (postlgBtn) {
  const sendlgData = () => {
    const datasign = {
      "sign_in_user_params": {
        "email": user_maillg.value,
        "password": user_pass.value,
        "password_confirmation": user_confirmpass.value
      }
    }
    fetch(urlsign, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datasign)
      })
      .then(response => response.json())
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
  if (postlgBtn) {
    postlgBtn.addEventListener('click', sendlgData);
  }
}
// ユーザー一覧
fetch(urls, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    },
  })
  .then(response => response.json())
  .then(json => {
    let markup = "";
    json.forEach(element => {
      markup += `<div class="col mb-4"><div class="card h-100"><img src="img/ryusei.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
             <p class="acount">＠${element.id}</p>
            <p class="card-text">${element.bio}</p>
            <p class="card-text"><a href="fix.html">ユーザー編集</a></p>
            <p class="card-text" onclick="follow(${element.id})">フォローする</p>
          </div>
        </div>
      </div>`;
    });
    let users = document.getElementById('userrs');
    users.insertAdjacentHTML('beforeend', markup);
  })
  .then(responseData => {
    console.log(responseData);
  })
  .catch(err => {
    console.log(err, err.data);
  });
// ユーザー編集
const usersfix = () => {
  fetch(urlfix, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      },
      body: JSON.stringify({
        "user_params": {
          "name": document.getElementById('rename').value,
          "bio": document.getElementById('rebio').value,
        }
      })
    })
    .then(response => response.json())
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
}
const refix = document.getElementById('post-lgtbtnr')
if (refix) {
  refix.addEventListener('click', usersfix);
}
//アカウントの削除
const userdelete = () => {
  fetch(urlfix, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(response => response.json())
    .then(json => {
      localStorage.name = json.name,
        localStorage.bio = json.bio
      alert("アカウントを削除しました")
      window.location.href = 'title.html';
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
}
const deleteusr = document.getElementById('post-lgldbtn')
if (deleteusr) {
  deleteusr.addEventListener('click', userdelete);
}
//投稿
const userpost = () => {
  fetch(posurl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      },
      body: JSON.stringify({
        "post_params": {
          "text": document.getElementById('postpost').value,
        }
      })
    })
    .then(response => response.json())
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
}
const postusr = document.getElementById('post-lgvtbtnr')
if (postusr) {
  postusr.addEventListener('click', userpost);
}
// ユーザーのタイムライン
const timelinelogo = document.getElementById('logo')
if (timelinelogo) {
  const usertimeline = () => {
    fetch(urltimeline, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        let mytime = "";
        json.forEach(element => {
          mytime += `<div class="twitter__block">
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
        let timelineget = document.getElementById('timeline');
        timelineget.insertAdjacentHTML('beforeend', mytime);
        console.log(json.stringify);
      })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  }
  timelinelogo.addEventListener('click', usertimeline);
}
//投稿編集
const postrefix = document.getElementById("re_post")
if (postrefix) {
  const userpostfix = () => {
    //特例URLここにセット
    const edit_text_id = document.querySelector("#edit_text_id").value;
    const reposturl = `https://teachapi.herokuapp.com/posts/${edit_text_id}`;
    //特例URLここにセット
    fetch(reposturl, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        },
        body: JSON.stringify({
          "post_params": {
            "text": document.getElementById('repost').value,
          }
        })
      })
      .then(response => response.json())
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
  }
  postrefix.addEventListener('click', userpostfix);
}
//投稿削除
const postdelete = document.getElementById("del_post")
if (postdelete) {
  const userpostdelete = () => {
    //特例URLここにセット
    const edit_text_id = document.querySelector("#edit_text_id").value;
    const reposturl = `https://teachapi.herokuapp.com/posts/${edit_text_id}`;
    //特例URLここにセット
    fetch(reposturl, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        alert("投稿を消しました。")
        window.location.href = 'timeline.html';
      })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  }
  postdelete.addEventListener('click', userpostdelete);
}
//タイムラインのページを取得する。
const postget = document.getElementById('timeline')
if (postget) {
  fetch(posurl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(response => response.json())
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
      postget.insertAdjacentHTML('beforeend', time);
      console.log(json.stringify);
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
}
//チャットルームの実装
const show_chat = document.getElementById('chatbtn')
if (show_chat) {
  const makeroom = () => {
    const chat_name = document.getElementById('chattitle').value
    fetch(chatroomurl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        },
        body: JSON.stringify({
          "chatroom_params": {
            "name": chat_name
          }
        })
      })
      .then(response => response.json())
      .then(json => {
        const chat_time = `<div id="title" class="line__title">
  <a href="chat.html"> ${json.name}</a>
  </div> `;
        const chatroom_posts = document.getElementById('chat_Btn');
        chatroom_posts.insertAdjacentHTML('beforeend', chat_time);
        window.location.href = 'all_chatroom.html';
      })
      .then(responseData => {
        console.log(responseData);
      })

      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  }
  show_chat.addEventListener('click', makeroom)
}
//チャットルームの一覧の作成
const show_mychatroom = document.getElementById('Chatbtn')
if (show_mychatroom) {
  const chatroomshow = () => {
    //特例にURL設置
    const chat_pages = document.getElementById('chat_page').value;
    const chat_limits = document.getElementById('chat_limit').value;
    const chat_url = `https://teachapi.herokuapp.com/chatrooms?page=${chat_pages}&limit=${chat_limits}`;
    //特例にURL設置
    fetch(chat_url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        let chatime = "";
        json.forEach(element => {
          chatime += `<div class="col-lg-4">
        <div class="card">
          <img class="card-img-top" src="./img/ozi.jpg" alt="ライトコースのイメージ画像">
          <div class="card-body">
            <h4 class="card-title">${element.name}</h4>
            <a href="chat.html" class="btn btn-primary">👨‍❤️‍👨${element.id}番👨‍❤️‍👨</a>
          </div>
        </div>
      </div> `;
        });
        let chatroompage = document.getElementById('row');
        chatroompage.insertAdjacentHTML('beforeend', chatime);
      })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  }
  show_mychatroom.addEventListener('click', chatroomshow)
}
//他人のチャットルームに参加する。
const show_chatroomids = document.getElementById('catrooms_btn')
if (show_chatroomids) {
  const chatroomjoin = () => {
    //特例にURL設置
    const caht_Ids = document.getElementById('chat_ids').value;
    const chat_idsurl = `https://teachapi.herokuapp.com/chatrooms/${caht_Ids}/join`;
    //特例にURL設置
    fetch(chat_idsurl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(response => response.json())
      .then(json => {
        alert('参加しました');
        window.location.href = 'chat.html';
        console.log(json)
      })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  }
  show_chatroomids.addEventListener('click', chatroomjoin)
}
//チャットないでメッセージを送る。
const get_roomstext = document.getElementById('chatSubmit')
if (get_roomstext) {
  const chatroomjoin = () => {
    //特例にURL設置
    const cahts_Ids = document.getElementById('getid').value;
    const chat_textsurl = `https://teachapi.herokuapp.com/chatrooms/${cahts_Ids}/messages`;
    const chat_text = document.getElementById('messagecontent').value;
    //特例にURL設置
    fetch(chat_textsurl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        },
        body: body.json.stringify({
          "message_params": {
            "text": chat_text
          }
        })
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const mychat = localStorage.chatroom_id = json.chatroom_id
        console.log(mychat)
        const chat_linetime = `<div class="line__right">
        <div class="text">${json.text}</div>
        <span class="date">既読<br>0:30</span>
      </div>`
        const chatroom_chatposts = document.getElementById('chtat_line');
        chatroom_chatposts.insertAdjacentHTML('beforeend', chat_linetime);
      })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  }
  get_roomstext.addEventListener('click', chatroomjoin)
}
//チャット内でのメッセージの取得
const mychat = document.getElementById('getd')
if (mychat) {
  const params = {
    id: '150'
  }
  //特例URL
  const qs = new URLSearchParams(params);
  const chat_textsgeturl = `https://teachapi.herokuapp.com/chatrooms/${getchstid}/messages?${qs}`;
  //特例URL
  fetch(chat_textsgeturl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      let chatgets = "";
      json.forEach(element => {
        chatgets += `<div id="line_line"> 
      <figure>
      <img src="./img/ryusei.jpg" />
    </figure>
    <div class="line__left-text">
      <div class="name">${element.user.name}</div>
      <div class="text">${element.text}</div>
    </div></div>`;
      });
      let chahdget = document.getElementById('line__left');
      chahdget.insertAdjacentHTML('beforeend', chatgets);
      console.log(json.stringify);
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
}
//フォロー機能DOM操作ができなかったので、user.htmlに書き込み
//unfollowもDOM操作ができなかったためfollow.htmlに書き込み
// フォロワ一覧を取得する
const post_gwtfollw = document.getElementById('urs')
if (post_gwtfollw) {
  fetch(chat_nowfolower, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(response => response.json())
    .then(json => {
      let marimgkup = "";
      json.forEach(element => {
        marimgkup += `<div class="col mb-4"><div class="card h-100"><img src="img/ryusei.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${element.name}</h5>
                   <p class="acount">＠${element.id}</p>
                  <p class="card-text">${element.bio}</p>
                </div>
              </div>
            </div>`;
      });
      let hed = document.getElementById('urs');
      hed.insertAdjacentHTML('beforeend', marimgkup);
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
}
// フォロー覧を取得する
const my_folower = document.getElementById('urss')
if (my_folower) {
  fetch(chatfollwer, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(response => response.json())
    .then(json => {
      let myfower = "";
      json.forEach(element => {
        myfower += `<div class="col mb-4"><div class="card h-100"><img src="img/ryusei.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
             <p class="acount">＠${element.id}</p>
            <p class="card-text">${element.bio}</p>
            <p class="card-text" onclick="unfollow(${element.id})">フォロー外す</p>
          </div>
        </div>
      </div>`;
      });
      let hede = document.getElementById('urss');
      hede.insertAdjacentHTML('beforeend', myfower);
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
}
//ログアウト
const mylogout = document.getElementById('post-logout')
if (mylogout) {
  mylogout.addEventListener("click", (e) => {
    e.preventDefault()
    window.localStorage.clear();
    alert("ログアウトします。")
    window.location.href = 'title.html';
  })
}