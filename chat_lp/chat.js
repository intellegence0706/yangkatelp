function chat_start(answer) {

    console.log('ETEST実行', answer)

    document.getElementById("overlay1").style.display = 'none';
    document.getElementById("loading_overlay1").style.display = 'flex';
    document.getElementById("loading_overlay1").style.transform = 'scale(1)';
    get_question_data(answer);
    get_city_data(); //市区町村取得
}


/***************************************************************************************************/
function get_question_data(answer) {

    var list1 = document.getElementById('list9').innerHTML;
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


    // // 送信するJSON
    var data = {
        "api_request": "get_question_data", //APIリクエスト内容
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

    .then(function(response) {
        // const res = response.json();
        // console.log(res);
        return response.json();
    }).then(function(json) {
        get_question_data2(json, answer)
    });
    // return true;

}

function get_question_data2(json, answer) {

    document.getElementById('list9').innerHTML = '';
    var list = document.getElementById('list9');



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

    } //FOR終了

    if (answer == 'default_load') {
        return; //事前にロードしておく場合は、そのまま終了
    }

    chat_start2(answer)
}


/***************************************************************************************************/

function chat_start2(answer) {
    document.getElementById("loading_overlay1").style.display = 'none';
    document.getElementById("chat_area").style.display = 'block';


    add_answer('default_question1', 'チャットを始める')

    return
    if (answer != "回答なし") { //ファーストビュー非表示の場合はスキップ
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
        "api_request": "get_city_data", //APIリクエスト内容
    };

    // Fetch APIでデータ送信
    fetch('https://script.google.com/macros/s/AKfycbwAX5OM1i9LyNFiVjjEeevg-A66zJWtvAS0Z0J_uOd6beyQ7oI1XFuXTm0MVPOz5he8/exec', {　 // 送信先URL
        method: 'post', // 通信メソッド
        header: {
            'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data) // JSON形式のデータ
    })

    .then(function(response) {
        return response.json();
    }).then(function(json) {
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

    } //FOR終了

}
/***************************************************************************************************/