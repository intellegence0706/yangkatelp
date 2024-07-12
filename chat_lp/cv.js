function cv_data_load() {


    document.getElementById("main_load_overlay1").style.display = 'flex';
    document.getElementById("main_load_overlay1_message_area").innerHTML = ''
        + 'お客様だけに最適化された相場を算定中...<br>'
        + '<span class="important">ページを閉じずに</span>お待ちください..';

    var count = document.getElementById("answer_list1").childElementCount;
    var answer_data = ''
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("answer_list1").children[c].textContent;
        var meta_id = document.getElementById("answer_list1").children[c].id;
        answer_data += meta_id + '：' + meta_data + '＆＄'
    }
    cv_data_server_send(answer_data);
}
function cv_data_server_send(answer_data) {

    var id = document.getElementById("chat_lp_order_code").value;
    var chat_lp_user_input_tel = document.getElementById("chat_lp_user_input_tel").value;
    var meta_data = document.getElementById("chat_lp_meta_data").value;

    var chat_lp_lp_id = localStorage.getItem('chat_lp_lp_id');
    if (chat_lp_lp_id == null) {
            var chat_lp_lp_id = 'test1'
    }

    // 送信するJSON
    var data = {
        "api_request": "save_cv_data",//APIリクエスト内容
        "id": id,//申込コード
        "new_data": answer_data,//CVデータ
        "lp_id": chat_lp_lp_id,//LPのID
        "tel": chat_lp_user_input_tel,//電話番号
        "meta": meta_data,//メタデータ
    };

    // Fetch APIでデータ送信
    fetch('https://script.google.com/macros/s/AKfycbx5y5C4TamzDNlEsDbCD4nreGVnpeIuHQihK9ShvUMtQyfIuu2n2L0Eeie9p3zsjSKWrA/exec', {　 // 送信先URL
        method: 'post', // 通信メソッド
        header: {
            'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data) // JSON形式のデータ
    })

        .then(function (response) {
            return response.json();
        }).then(function (json) {
            cv_data_server_send2(json)
        });

}

function cv_data_server_send2(json) {
    var reslt = json.reslt;
    var message = json.message;

    console.log(reslt);
    console.log(message);

    document.getElementById("main_load_overlay1").style.display = 'none';
    localStorage.removeItem('chat_lp_answer_save');//保存された自動保存データをクリア


    document.getElementById("next_modal").style.display = 'table';
    var param = location.search;
    var url = window.location = "../../thanks/1/" + param;
    var link = document.getElementById('next_page_btn');
    link.setAttribute('href', url);




    var param = location.search;
    window.location = "../../thanks/1/" + param;
}





/*******************************************************************************************/

function request_new_order_system() {

    document.getElementById("loadbararea").style.display = 'block';
    document.getElementById("loadbararea_text").innerHTML = '通信中'
    

    var chat_lp_order_code = localStorage.getItem('chat_lp_order_code');
    if (chat_lp_order_code == null) {
        return;
    }


    order_code_set_parameter(chat_lp_order_code)





    // 送信するJSON
    var data = {
        "api_request": "add_system",//APIリクエスト内容
        "id": chat_lp_order_code,
    };

    // Fetch APIでデータ送信
    fetch('https://script.google.com/macros/s/AKfycbx5y5C4TamzDNlEsDbCD4nreGVnpeIuHQihK9ShvUMtQyfIuu2n2L0Eeie9p3zsjSKWrA/exec', {　 // 送信先URL
        method: 'post', // 通信メソッド
        header: {
            'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data) // JSON形式のデータ
    })

        .then(function (response) {
            return response.json();
        }).then(function (json) {
            request_new_order_system2(json)
        });

}

function request_new_order_system2(json) {
    var reslt = json.reslt;
    var message = json.message;
    var order_id = json.order_id;

    console.log(reslt);
    console.log(message);
    console.log(order_id);

    if(reslt == '成功'){
        var loadbararea_text = order_id;
    }else{
        var loadbararea_text = reslt;
    }

    document.getElementById("loadbararea").style.display = 'block';
    document.getElementById("loadbararea_text").innerHTML = loadbararea_text;

    setTimeout(() => {
        document.getElementById("loadbararea").style.display = 'none';
    }, 3000);
    sms_send_system();



    if (reslt == '成功') {
        const params = new URLSearchParams(window.location.search) // クエリパラメータを操作するためのオブジェクト
        params.set('order_id', order_id) // クエリパラメータに存在しない場合は追加、存在しているときは更新を行う
        console.log(params.toString())
        var url = window.location.href.split('?')[0];
        window.history.pushState(null, null, url + '?' + params.toString());
    }

}












/*******************************************************************************************/

function sms_send_system() {


    setTimeout(() => {
        document.getElementById("loadbararea").style.display = 'block';
        document.getElementById("loadbararea_text").innerHTML = 'SMS送信'
    }, 4000);


    

    var chat_lp_order_code = localStorage.getItem('chat_lp_order_code');
    if (chat_lp_order_code == null) {
        return;
    }
    // 送信するJSON
    var data = {
        "api_request": "sms_send_console",//APIリクエスト内容
        "id": chat_lp_order_code,
    };

    // Fetch APIでデータ送信
    fetch('https://script.google.com/macros/s/AKfycbx5y5C4TamzDNlEsDbCD4nreGVnpeIuHQihK9ShvUMtQyfIuu2n2L0Eeie9p3zsjSKWrA/exec', {　 // 送信先URL
        method: 'post', // 通信メソッド
        header: {
            'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data) // JSON形式のデータ
    })

        .then(function (response) {
            return response.json();
        }).then(function (json) {
            sms_send_system2(json)
        });

}

function sms_send_system2(json) {
    var reslt = json.reslt;
    var message = json.message;

    console.log(reslt);
    console.log(message);


    document.getElementById("loadbararea").style.display = 'block';
    document.getElementById("loadbararea_text").innerHTML = reslt;

    setTimeout(() => {
        document.getElementById("loadbararea").style.display = 'none';
    }, 3000);

}














/*******************************************************************************************/

function thanks_page_redirect_flag() {

    setTimeout(() => {
        document.getElementById("loadbararea").style.display = 'block';
        document.getElementById("loadbararea_text").innerHTML = 'セーブ中'
    }, 4000);
    
    var chat_lp_order_code = localStorage.getItem('chat_lp_order_code');
    if (chat_lp_order_code == null) {
        return;
    }
    // 送信するJSON
    var data = {
        "api_request": "thanks_page_redirect_flag",//APIリクエスト内容
        "id": chat_lp_order_code,
    };

    // Fetch APIでデータ送信
    fetch('https://script.google.com/macros/s/AKfycbx5y5C4TamzDNlEsDbCD4nreGVnpeIuHQihK9ShvUMtQyfIuu2n2L0Eeie9p3zsjSKWrA/exec', {　 // 送信先URL
        method: 'post', // 通信メソッド
        header: {
            'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data) // JSON形式のデータ
    })

        .then(function (response) {
            return response.json();
        }).then(function (json) {
            thanks_page_redirect_flag2(json)
        });

}

function thanks_page_redirect_flag2(json) {
    var reslt = json.reslt;
    var message = json.message;

    console.log(reslt);
    console.log(message);

    document.getElementById("loadbararea").style.display = 'block';
    document.getElementById("loadbararea_text").innerHTML = reslt;

}
