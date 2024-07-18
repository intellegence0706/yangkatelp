window.onload = function() {


    try {
        /**************** LPiDをパラメーターとストレージに記録 *************/
        const params = new URLSearchParams(window.location.search) // クエリパラメータを操作するためのオブジェクト
        params.set('fastview', "off") // クエリパラメータに存在しない場合は追加、存在しているときは更新を行う
        console.log(params.toString())
        var url = window.location.href.split('?')[0];
        window.history.pushState(null, null, url + '?' + params.toString());
        /**************** LPiDをパラメーターとストレージに記録 *************/

    } catch (e) {}


    try {
        /**************** チャネルのチェック(ない場合は1を付与) *************/
        var channel = getParam('channel'); //channelのパラメータを読む
        if (channel == null) {
            /**************** LPiDをパラメーターとストレージに記録 *************/
            const params = new URLSearchParams(window.location.search) // クエリパラメータを操作するためのオブジェクト
            params.set('channel', "1") // クエリパラメータに存在しない場合は追加、存在しているときは更新を行う
            console.log(params.toString())
            var url = window.location.href.split('?')[0];
            window.history.pushState(null, null, url + '?' + params.toString());
            /**************** LPiDをパラメーターとストレージに記録 *************/
        }
        /**************** チャネルのチェック(ない場合は1を付与)  *************/
    } catch (e) {}



    test_mode_check();
    if (location.pathname.match(/thanks/)) {
        console.log('サンクスページモード');

        try {
            thanks_page_redirect_flag()
        } catch (e) {}

        thanks_page();
        request_new_order_system();
        return;
    }








    get_lp_list();

    //get_question_data('default_load')//質問を事前に読み込む

    var now_time = getNowYMDhmsStr();
    localStorage.setItem('answer_start_time', now_time);



    var fastview_mode = getParam('fastview'); //ファーストビューのパラメータを読む
    if (fastview_mode != null && fastview_mode == 'off') {
        setTimeout(() => {
            chat_start('回答なし')
        }, 30);
    } else {
        document.getElementById("overlay1_center_modal").classList.remove('overlay1_center_modal_viewoff');
        document.getElementById("overlay1_center_modal_viewload").style.display = 'none';
        cash_check(); //ファーストビューがある時のみ
    }



    order_code_creator();
    //document.getElementById("overlay1").style.display = 'none';
    //document.getElementById("loading_overlay1").style.display = 'none';
    //document.getElementById("chat_area").style.display = 'block';


    get_marketing_log();
    // change_banner();



}








/***************************************************************************************************/
function get_lp_list() {


    var test_mode = getParam('test_mode');
    if (test_mode == null || test_mode != 'yes') {
        // get_lp_list_cash();//キャッシュで表示する
        // return;
    }

    //テストモードの場合はサーバーから取得

    document.getElementById("save_loadbararea").style.opacity = "1";
    // 送信するJSON
    var data = {
        "api_request": "get_lp_data", //APIリクエスト内容
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
        get_lp_list2_json(json)
    });

}

function get_lp_list2_json(json) {


    try {
        var channel = getParam('channel'); //channelのパラメータを読む
        if (channel == null) {
            var channel = 1;
        }
    } catch (e) {}




    var json_ary = []
    for (var b = 0; b < json.lp_data.length; b++) {
        if (json.lp_data[b]['value'] != undefined && json.lp_data[b]['value'] != '' && json.lp_data[b]['value'].match(/＆＄/)) {
            var lp_data2 = json.lp_data[b]['value'].split('＆＄');
            if (channel != lp_data2[8]) {
                continue;
            }
            json_ary.push(lp_data2)
        }
    } //FOR終了



    if (json_ary.length == 0) {
        document.getElementById("test_panel").style.display = 'flex';
        document.getElementById("test_panel").innerHTML = '' +
            'チャネル:' + channel + 'は存在しないため、チャネル1を表示します';
        setTimeout(() => {
            document.getElementById("test_panel").style.display = 'none';
        }, 6000);

        /**************** LPiDをパラメーターとストレージに記録 *************/
        const params = new URLSearchParams(window.location.search) // クエリパラメータを操作するためのオブジェクト
        params.set('channel', "1") // クエリパラメータに存在しない場合は追加、存在しているときは更新を行う
        console.log(params.toString())
        var url = window.location.href.split('?')[0];
        window.history.pushState(null, null, url + '?' + params.toString());
        /**************** LPiDをパラメーターとストレージに記録 *************/

        get_lp_list2_json(json)
        return;
    }



    get_lp_list2(json_ary)

}

function get_lp_list_cash() {
    var new_test_ary = [
        ['28', '配信中', '25', '質問', 'css＋table_cross_body1＋#ffffff＋#eff1f5', '../../img/advisor_icon2.webp', 'チャレンジャー28', '壁紙変更(お婆ちゃん家のテーブルクロース) 外国人', '', '', 'test28'],
        ['32', '配信中', '25', '質問', 'css＋table_cross_body1＋#ffffff＋#eff1f5', '../../img/advisor_icon4.webp', 'チャレンジャー32', '壁紙変更(お婆ちゃん家のテーブルクロース) 女性イラスト', '', '', 'test32'],
        ['37', '配信中', '25', '質問', 'css＋table_cross_body1＋#ffffff＋#eff1f5', '../../img/advisor.png', 'チャレンジャー37', '壁紙変更(お婆ちゃん家のテーブルクロース) 女性実写', '', '', 'test37'],
        ['39', '配信中', '25', '質問：菊削減Ver', 'css＋table_cross_body1＋#ffffff＋#eff1f5', '../../img/advisor.png', 'チャレンジャー39', '壁紙変更(お婆ちゃん家のテーブルクロース) 女性実写、スクリプト変更A', '', '', 'test39'],

    ]

    get_lp_list2(new_test_ary)

}




function get_lp_list2(json_ary) {
    var ary = []; //配信中のLPを格納
    var d_ary = []; //問題が発生した際の標準LPを格納
    var LPs = []; //ランダム表示用の配列を一時格納
    for (var b = 0; b < json_ary.length; b++) {
        var lp_data2 = json_ary[b]

        if (lp_data2[0] == '1') {
            d_ary.push(lp_data2)
        }
        if (lp_data2[1] == '配信中' || lp_data2[1] == '非公開') {
            ary.push(lp_data2)

            var new_data = { 'name': 'test' + lp_data2[0], 'rate': Number(lp_data2[2]), 'num': Number(lp_data2[0]) };
            LPs.push(new_data);

        }
    } //FOR終了




    var select_lp = getRandomLP(LPs);

    /*

    var sx = ''
    for (var xx = 0; xx < 100; xx++) {
    var select_lp = getRandomLP(LPs);
    sx += select_lp + ','
    }
    console.log(sx)

    */


    /**************** 以前にLPを割り振り済みの場合 *************/
    var old_chat_lp_id = localStorage.getItem('chat_lp_lp_id');
    if (old_chat_lp_id != null) {
        var old_chat_lp_id2 = old_chat_lp_id.replace(/test/g, '');
        //    var select_lp = Number(old_chat_lp_id2)
    }


    /**************** パラメーターで指示がある場合は優先 *************/
    var parameters_select_lp = getParam('request_lp');
    if (parameters_select_lp != null && parameters_select_lp == 'random') {
        var select_lp = getRandomLP(LPs);
    } else if (parameters_select_lp != null && parameters_select_lp != 'random') {
        var select_lp = parameters_select_lp.replace(/test/g, '');
    }
    /**************** パラメーターで指示がある場合は優先 *************/





    var target = ary.filter(e => e[0] === String(select_lp));
    if (target.length == 0) {
        //エラー
        var lp_meta_data = d_ary[0]
        var select_lp = 1;
    } else {
        var lp_meta_data = target[0];
    }


    var lp_id = 'test' + select_lp;

    console.log(lp_meta_data)


    /**************** 壁紙の変更 *************/
    if (lp_meta_data[4] != '') {
        if (lp_meta_data[4].match(/css＋/)) {
            var css_class = lp_meta_data[4].split('＋');
            document.getElementById("backgrand_pic_img").display = 'none';
            document.getElementById("backgrand_pic").classList.add(css_class[1])
            document.getElementById("backgrand_pic").style.backgroundColor = css_class[2];
            document.getElementById("backgrand_pic").style.color = css_class[3];

        } else {
            document.getElementById("backgrand_pic").style.display = 'block';
            document.getElementById("backgrand_pic_img").src = lp_meta_data[4];
            document.getElementById("backgrand_pic_img").style.opacity = '1';
            document.getElementById("backgrand_pic_img").style.transform = 'scale(1)';
            document.getElementById("loading_overlay1").style.background = 'url(' + lp_meta_data[4] + ')';
            document.getElementById("loading_overlay1").style.backgroundSize = '100%';
        }

    } else {
        document.getElementById("backgrand_pic").classList.add('backgrand_pic_off')

        //        document.getElementById("backgrand_pic").style.display = 'none';
    }
    /**************** 壁紙の変更 *************/



    /**************** アバターの変更 *************/
    if (lp_meta_data[5] != '') {
        document.getElementById("avatar_img_icon").value = lp_meta_data[5];
        document.getElementById("advisor1").src = lp_meta_data[5];

    }
    /**************** アバターの変更 *************/




    /**************** LPiDをパラメーターとストレージに記録 *************/
    const params = new URLSearchParams(window.location.search) // クエリパラメータを操作するためのオブジェクト
    params.set('lp', lp_id) // クエリパラメータに存在しない場合は追加、存在しているときは更新を行う
    console.log(params.toString())
    var url = window.location.href.split('?')[0];
    window.history.pushState(null, null, url + '?' + params.toString());

    document.getElementById("chat_lp_lp_id").value = lp_id;
    localStorage.setItem('chat_lp_lp_id', lp_id);
    /**************** LPiDをパラメーターとストレージに記録 *************/


    /**************** 質問リストのデータベース名を記録 *************/
    document.getElementById("question_database_name").value = lp_meta_data[3];
    if (!location.pathname.match(/thanks/)) { //サンクス以外は
        // get_question_data('default_load')//質問を事前に読み込む
    }
    /**************** 質問リストのデータベース名を記録 *************/



    /**************** LPiDの訪問を1カウント *************/
    if (old_chat_lp_id == null) {
        if (!location.pathname.match(/thanks/)) { //サンクス以外は
            record_answer_data2('初回訪問')
        }
    }
    /**************** LPiDの訪問を1カウント *************/

    document.getElementById("save_loadbararea").style.opacity = "0"; //ロードアニメーション(右上)を消す
}


/***************************************************************************************************/




// ランダムなLPを取得する関数を作成します
function getRandomLP(LPs) {
    var sum = LPs.reduce((sum, LP) => sum + LP.rate, 0);
    var rand = Math.random() * sum;

    for (var i = 0; i < LPs.length; i++) {
        if (rand < LPs[i].rate) {
            return LPs[i].num;
        }
        rand -= LPs[i].rate;
    }
}







function change_banner() {

    document.getElementById("stop_banner1").style.display = 'none';
    document.getElementById("stop_banner2").style.display = 'none';
    document.getElementById("banner_body").style.display = 'block';

    document.getElementById("cv_banner_mode").value = 'true';
}


function change_banner2() {

    var num = document.getElementById("cv_banner_message_count").value;
    var num = Number(num);
    var stop_overlay1_check = document.getElementById("stop_overlay1_check").checked;
    if (stop_overlay1_check != true) {
        return;
    }

    var ary = ['現在、算定中ですが、結果を見ずにやめてしまいますか…？', 'ちなみに…ここまで18分19秒ほどお時間をいただいております。', '多くの方が、結局外壁塗装の窓口に戻って算定しているので、', 'ここまで来たなら、今、結果を確認しておくことをおすすめします。']
    if (num > ary.length - 1) {
        return;
    }

    //文字の場合
    var chat_body_html = '' +
        '   <div class="chat_body_bubble_area">' +
        '        <div class="balloon2-left balloon2-left2">' +
        '            <div id="stop_banner_chat_' + num + '" >' +
        '<div class="chat_spinner"><div class="chat_bounce1"></div><div class="chat_bounce2"></div><div class="chat_bounce3"></div></div>' +
        '            </div>' +
        '        </div>' +
        '    </div>';
    var chat_html = '' +
        '<div class="chat_section chat_section2" >' +
        '<div class="chat_user_icon_area mini_icon">' +
        '   <div class="chat_user_icon">' +
        '        <img class="user_icon_pic" src="../../img/advisor.png">' +
        '    </div>' +
        '</div>' +
        '<div class="chat_body_area">' +
        chat_body_html +
        '</div>' +
        '</div>';

    setTimeout(() => {
        document.getElementById("banner_body").innerHTML += chat_html;
    }, 400);

    setTimeout(() => {
        document.getElementById("stop_banner_chat_" + num).innerHTML = ary[num];
    }, 1200);

    setTimeout(() => {
        var num2 = num + 1;
        document.getElementById("cv_banner_message_count").value = num2;
        change_banner2()
    }, 2000);





}



function test_mode_check() {
    if (!location.host.match(/iseki/) && !location.host.match(/127/)) {
        return
    }


    var true_link = 'https://doors-my.com' + location.pathname + location.search + location.hash;


    document.getElementById("test_panel").style.display = 'flex';
    document.getElementById("test_panel").innerHTML = '' +
        'このリンクはテスト環境です。間違えて配信しないよう注意してください。' +
        '<a href="' + true_link + '" class="test_a"  >本番環境はこちら</a>';
    view_developer_panel();

    setTimeout(() => {
        document.getElementById("test_panel").style.display = 'none';
    }, 6000);
}





function cash_check() {
    var chat_lp_answer_save = localStorage.getItem('chat_lp_answer_save');
    if (chat_lp_answer_save == null) {
        return;
    }

    document.getElementById("question_overlay1").style.display = 'flex';
    document.getElementById("question_overlay1_card").innerHTML = '' +
        '<div class="question_group_overlay_card">' +
        '<button class="question_overlay1_close_btn" onclick="close_question_overlay1()" ><i class="material-icons">close</i></button>' +
        '<div class="question_group_overlay_card_question">' +
        '前回のセーブデータがあります。続きから回答しますか？' +
        '</div>' +
        '<div class="question_group_overlay_card_btn_area">' +
        '<button class="question_group_overlay_card_answer_btn" onclick="cash_check2()" >はい</button>' +
        '<button class="question_group_overlay_card_answer_btn" onclick="lp_save_cash_clear()" >いいえ</button>' +
        '</div>'
}

function cash_check2() {
    close_question_overlay1()
    skip_mode_on();
    var chat_lp_answer_save = localStorage.getItem('chat_lp_answer_save');
    view_developer_output_answer_import(chat_lp_answer_save);
    setTimeout(() => {
        var question_1 = document.getElementById("question_1").innerHTML;
        chat_start(question_1);
    }, 10);



    document.getElementById("main_load_overlay1").style.display = 'flex';
    document.getElementById("main_load_overlay1_message_area").innerHTML = '' +
        '過去の回答データを復元中<br>' +
        '<span class="important">ページを閉じずに</span>お待ちください..';


}

function lp_save_cash_clear() {
    close_question_overlay1();
    order_code_creator_reset();
    localStorage.removeItem('chat_lp_answer_save');
}

function parameter_check() {
    var request = getParam('request');
    if (request == 'new') {
        var load_check = document.getElementById("login_hidden_div") != null;
        if (load_check == true) {
            new_account1();
        } else {
            setTimeout('parameter_check()', 1000);
            return;
        }

    }
}



function user_guide_message_start(msg) {
    document.getElementById("user_guide_message_div").style.display = 'block';
    document.getElementById("user_guide_message_title").innerHTML = msg;
}






function order_code_creator() {
    var chat_lp_order_code = localStorage.getItem('chat_lp_order_code');
    if (chat_lp_order_code == null) {
        var chat_lp_order_code = 'IS_' + uniqueId2();
        var now_time = getNowYMDhmsStr();
        //localStorage.setItem('answer_start_time',now_time);
    }
    document.getElementById("chat_lp_order_code").value = chat_lp_order_code;
    localStorage.setItem('chat_lp_order_code', chat_lp_order_code);

    //order_code_set_parameter(chat_lp_order_code);
}

function order_code_set_parameter(id) {
    const params = new URLSearchParams(window.location.search) // クエリパラメータを操作するためのオブジェクト
    params.set('order_code', id) // クエリパラメータに存在しない場合は追加、存在しているときは更新を行う
    console.log(params.toString())
    var url = window.location.href.split('?')[0];
    window.history.pushState(null, null, url + '?' + params.toString());
}


function order_code_creator_reset() {
    localStorage.removeItem('chat_lp_order_code');
    order_code_creator()
}







function get_marketing_log() {
    //referrer
    var ref = document.referrer;

    // landing_into
    var param = location.search

    //ua 
    var ua = navigator.userAgent;

    var meta_data = ref + '＆＄' + param + '＆＄' + ua + '＆＄';
    document.getElementById("chat_lp_meta_data").value = meta_data;

    // 上記で定義したgetIP関数を使用してIPアドレスを取得
    getIP(function(ip) {
        //console.log(ip);
        var old_meta_data = document.getElementById("chat_lp_meta_data").value;
        var new_meta_data = old_meta_data + ip + '＆＄';
        document.getElementById("chat_lp_meta_data").value = new_meta_data;
    });




}


// ブラウザが提供するAPIを使用してIPアドレスを取得
function getIP(callback) {
    // APIを取得するためのXMLHttpRequestオブジェクトを作成
    var xhr = new XMLHttpRequest();
    // 送信するリクエストの種類とURLを指定
    xhr.open('GET', 'https://api.ipify.org', true);
    // レスポンスが帰ってきたら呼び出されるコールバック関数を設定
    xhr.onload = function() {
        if (xhr.status === 200) { // レスポンスが成功した場合
            callback(xhr.responseText); // 取得したIPアドレスをコールバック関数に渡す
        } else { // レスポンスが失敗した場合
            console.log('IPアドレスの取得に失敗しました');
        }
    };
    // リクエストを送信
    xhr.send();
}




function bottom_scroll() {
    var element = document.documentElement;
    var bottom = element.scrollHeight - element.clientHeight;
    window.scroll(0, bottom);
}



var event_count_s = null;

function bottom_scroll2() {
    clearTimeout(event_count_s);
    event_count_s = setTimeout('bottom_scroll2b()', 100);
}

function bottom_scroll2c() {
    $("body,html").animate({
        scrollTop: $('body').get(0).scrollHeight
    }, 30, "linear");
}

function bottom_scroll2b() {
    $("body,html").animate({
        scrollTop: $('body').get(0).scrollHeight
    }, 'normal', "swing");
}