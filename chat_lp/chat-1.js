function chat_start(answer) {

  console.log('ETEST実行', answer)

  document.getElementById("overlay1").style.display = 'none';
  document.getElementById("loading_overlay1").style.display = 'flex';
  document.getElementById("loading_overlay1").style.transform = 'scale(1)';
  get_question_data(answer);
  get_city_data();//市区町村取得
}




/***************************************************************************************************/
function get_question_data_new_json(answer) {



  var list1 = document.getElementById('list1').innerHTML;
  if (list1 != '') {
    chat_start2(answer)
    return;
  }

  var question_database_name = document.getElementById("question_database_name").value;
  if (question_database_name == '') {
    setTimeout('get_question_data_new_json(' + "'" + answer + "'" + ')', 20)
    return;
  }


  console.log('FTEST実行', answer)
  console.log('DTEST実行', question_database_name)



  var question_database_id = document.getElementById("question_database_id").value;

  


  fetch('https://doors-my.com/chat_lp_json/lps/' + question_database_id + '.json')  // JSONファイルのパスを指定
    .then(response => response.json())
    .then(data => {
      // JSONオブジェクトを2次元配列に変換するための準備
      const keys = Object.keys(data);
      const array = [];

      // forループを使用して配列を構築
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        array.push([
          key,
          data[key].category,
          data[key].filter,
          data[key].type,
          data[key].view,
          data[key].message,
          data[key].answer,
          data[key].answer_type,
          data[key].required,
          data[key].answer_lists
        ]);
      }

      console.log(array); // コンソールに出力して確認
      get_question_data_new_json2(array,answer)

      // ここでHTMLにデータを表示する処理を書くことも可能です
    })
    .catch(error => console.error('Error loading the JSON file:', error));

}



function get_question_data_new_json2(json_ary,answer) {

  document.getElementById('list1').innerHTML = '';
  var list = document.getElementById('list1');


  for (var b = 0; b < json_ary.length; b++) {
    var json_ary_text = '';
    for (var c = 0; c < json_ary[b].length; c++) {
      json_ary_text += json_ary[b][c] + '＆＄';
    }//FOR終了
    var option = document.createElement('li');
    option.innerHTML = json_ary_text;
    list.appendChild(option);
  }//FOR終了

  if (answer == 'default_load') {
    return;//事前にロードしておく場合は、そのまま終了
  }

  chat_start2(answer)
}



/***************************************************************************************************/
function get_question_data(answer) {


  get_question_data_new_json(answer);



  return;



  var list1 = document.getElementById('list1').innerHTML;
  if (list1 != '') {
    chat_start2(answer)
    return;
  }

  var question_database_name = document.getElementById("question_database_name").value;
  if (question_database_name == '') {
    setTimeout('get_question_data(' + "'" + answer + "'" + ')', 500)
    return;
  }


  console.log('FTEST実行', answer)
  console.log('DTEST実行', question_database_name)


  // 送信するJSON
  var data = {
    "api_request": "get_question_data",//APIリクエスト内容
    "question_name": question_database_name,
  };

  // Fetch APIでデータ送信
  fetch('https://script.google.com/macros/s/AKfycbwAX5OM1i9LyNFiVjjEeevg-A66zJWtvAS0Z0J_uOd6beyQ7oI1XFuXTm0MVPOz5he8/exec', {　 // 送信先URL
    method: 'post', // 通信メソッド
    header: {
      'Content-Type': 'application/json' // JSON形式のデータのヘッダー
    },
    body: JSON.stringify(data) // JSON形式のデータ
  })

    .then(function (response) {
      return response.json();
    }).then(function (json) {
      get_question_data2(json, answer)
    });

}

function get_question_data2(json, answer) {

  document.getElementById('list1').innerHTML = '';
  var list = document.getElementById('list1');



  /*
  var option = document.createElement('li');
  option.innerHTML = data_value;
  list.appendChild(option);
  */


  for (var b = 0; b < json.question_data.length; b++) {

    if (json.question_data[b] == undefined) {
      continue;
    }
    var data_value = json.question_data[b]['value']

    var option = document.createElement('li');
    option.innerHTML = data_value;
    list.appendChild(option);

  }//FOR終了

  if (answer == 'default_load') {
    return;//事前にロードしておく場合は、そのまま終了
  }

  chat_start2(answer)
}


/***************************************************************************************************/

function chat_start2(answer) {
  document.getElementById("loading_overlay1").style.display = 'none';
  document.getElementById("chat_area").style.display = 'block';


  add_answer('default_question1', 'チャットを始める')


  document.getElementById("main_header_div").style.background = '#ffffff4d';
  document.getElementById("main_header_div").style.backdropFilter = 'blur(10px)'


  return
  if (answer != "回答なし") {//ファーストビュー非表示の場合はスキップ
    add_answer('default_question1', answer)
  } else {
    // next_chat_go()
    add_answer('default_question1', 'チャットを始める')
  }



  document.getElementById("main_header_div").style.background = '#ffffff4d';
  document.getElementById("main_header_div").style.backdropFilter = 'blur(10px)'



}






















/***************************************************************************************************/
function get_city_data() {
  // 送信するJSON
  var data = {
    "api_request": "get_city_data",//APIリクエスト内容
  };

  // Fetch APIでデータ送信
  fetch('https://script.google.com/macros/s/AKfycbwAX5OM1i9LyNFiVjjEeevg-A66zJWtvAS0Z0J_uOd6beyQ7oI1XFuXTm0MVPOz5he8/exec', {　 // 送信先URL
    method: 'post', // 通信メソッド
    header: {
      'Content-Type': 'application/json' // JSON形式のデータのヘッダー
    },
    body: JSON.stringify(data) // JSON形式のデータ
  })

    .then(function (response) {
      return response.json();
    }).then(function (json) {
      get_city_data2(json)
    });

}

function get_city_data2(json) {

  document.getElementById('list2').innerHTML = '';
  var list = document.getElementById('list2');
  for (var b = 0; b < json.city_data.length; b++) {

    if (json.city_data[b] == undefined) {
      continue;
    }
    var data_value = json.city_data[b]['value']

    var option = document.createElement('li');
    option.innerHTML = data_value;
    list.appendChild(option);

  }//FOR終了

}
/***************************************************************************************************/