function add_answer(answer_id, answer) {






    var plugin_check = document.getElementById("chat_plugin_section") == null; //プラグイン表示中かチェック;
    if (plugin_check == false) {
        document.getElementById("chat_plugin_section").remove(); //プラグインを消す
    }
    document.getElementById("user_guide_message_div").style.display = 'none'; //ユーザーガイドも消す



    var answer_done_check = document.getElementById(answer_id) != null; //要素があるか
    if (answer_done_check == true) {
        document.getElementById(answer_id).innerHTML = answer;
    } else {
        /************************/
        var list = document.getElementById('answer_list1');
        var option = document.createElement('li');
        option.innerHTML = answer;
        option.id = answer_id;
        list.appendChild(option);
        /************************/
    }





    var count = document.getElementById("list9").childElementCount;
    var new_answer = answer;
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("list9").children[c].textContent;
        var meta_list = meta_data.split('＆＄');

        if (meta_list[0] == answer_id) { //表示,非表示,テスト,削除
            var answer_template = meta_list[6]; //回答表示のテンプレ
            var new_answer = answer_template.replace(/{answer}/g, '<span class="my_answer_span" >' + answer + '</span>');
            break;
        }
    }



    var chat_html = '' +
        '<div class="me_chat_section" id="' + answer_id + '_u" >' +
        '<div class="me_chat_body_area">' +
        '    <div class="me_chat_body_bubble_area">' +
        '<div class="kidoku_unit" id="' + answer_id + '_kidoku" >既読</div>' +
        '        <div class="balloon2-right">' +
        '            <p>' + new_answer + '</p>' +
        '        </div>' +
        '<div class="fix_unit" id="' + answer_id + '_fix" >' +
        '<button onclick="fix_answer(' + "'" + answer_id + "'" + ')" class="fix_btn" >' +
        '<i class="material-icons">edit</i>変更</button></div>' +
        '    </div>' +
        '</div>' +
        '</div>';


    var mymessage_delay1 = document.getElementById('mymessage_delay1').value; //顧客側のメッセージバブルが表示されるまでの遅延時間
    var mymessage_delay2 = document.getElementById('mymessage_delay2').value; //顧客側のメッセージバブルが表示されるまでの遅延時間
    var mymessage_delay2b = Number(mymessage_delay1) + Number(mymessage_delay2);

    /****************** スキップモードがオンの場合 *******************************/
    var skip_mode_check = document.getElementById('skip_mode').value;
    if (skip_mode_check == 'true') {
        var mymessage_delay1 = 0;
        var mymessage_delay2 = 0;
        var mymessage_delay2b = 0;
    }
    /****************** スキップモードがオンの場合 *******************************/



    var skip_mode_check = document.getElementById('skip_mode').value;
    if (skip_mode_check == 'true') {
        var mymessage_delay1 = 0;
    }

    setTimeout(() => {

        if (answer != 'チャットを始める') {
            document.getElementById("chat_area").innerHTML += chat_html;
            bottom_scroll();
        }


    }, mymessage_delay1);

    setTimeout(() => {
        next_chat_go()
    }, mymessage_delay2b);


    try {
        do_kidoku(answer_id);
    } catch (e) {}






    if (!location.pathname.match(/thanks/)) {
        auto_save();
    }

    message_score_off(); //カーソルを消す
}

//add_answer('question_1','はい')


function do_kidoku(id) {
    var kidoku_delay1 = document.getElementById('kidoku_delay1').value; //既読が表示されるまでの遅延時間
    var mymessage_delay1 = document.getElementById('mymessage_delay1').value; //顧客側のメッセージバブルが表示されるまでの遅延時間
    var kidoku_delay2 = Number(kidoku_delay1) + Number(mymessage_delay1); //既読が先でないように、遅延時間を合算

    setTimeout(() => {
        document.getElementById(id + "_kidoku").style.display = 'inline-block'
    }, kidoku_delay2);
}












var event_count1 = null;

function auto_save() {
    clearTimeout(event_count1);
    event_count1 = setTimeout('auto_save_do()', 3000);
}


function auto_save_do() {
    document.getElementById("save_loadbararea").style.opacity = '1';

    var count = document.getElementById("answer_list1").childElementCount;
    var answer_data = ''
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("answer_list1").children[c].textContent;
        var meta_id = document.getElementById("answer_list1").children[c].id;
        answer_data += meta_id + '：' + meta_data + '＆＄'
    }
    localStorage.setItem('chat_lp_answer_save', answer_data);



    record_answer_data()


}










function record_answer_data() {
    var count = document.getElementById("answer_list1").childElementCount;
    var answer_data = ''
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("answer_list1").children[c].textContent;
        var meta_id = document.getElementById("answer_list1").children[c].id;
        answer_data += meta_id + '：' + meta_data + '＆＄'
    }
    record_answer_data2(answer_data);
}

function record_answer_data2(answer_data) {

    var id = document.getElementById("chat_lp_order_code").value;

    var chat_lp_lp_id = localStorage.getItem('chat_lp_lp_id');
    if (chat_lp_lp_id == null) {
        var chat_lp_lp_id = 'test1'
    }



    //     送信するJSON
    var data = {
        "api_request": "record_answer_data", //APIリクエスト内容
        "id": id, //申込コード
        "new_data": answer_data, //CVデータ
        "lp_id": chat_lp_lp_id, //LPのID
    };
    record_answer_data3({ result: "eflkjefl", message: "kjewflakjfwelewkfjlawk" })

    //     Fetch APIでデータ送信
    fetch('https://script.google.com/macros/s/AKfycbxOvhgwZCtqdeWEmRAQUyVFG-DXvULH6It0CobKM0O6-Xzlgw7htE4e6r0BjcibXjVw/exec', {　 // 送信先URL
        method: 'post', // 通信メソッド
        header: {
            'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data) // JSON形式のデータ
    })

    .then(function(response) {
        return response.json();
    }).then(function(json) {
        record_answer_data3(json)
    });

}

function record_answer_data3(json) {
    var reslt = json.reslt;
    var message = json.message;

    //     console.log(reslt);
    //     console.log(message);


    setTimeout(() => {
        document.getElementById("save_loadbararea").style.opacity = "0";
    }, 1);


}