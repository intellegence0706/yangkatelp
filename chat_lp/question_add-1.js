function next_chat_go() {




    document.getElementById("wait_mode").value = 'no'

    var next_chat_num = document.getElementById("now_question_number").value;
    var next_chat_num = Number(next_chat_num);

    console.log(next_chat_num)

    var avatar_img_icon = document.getElementById("avatar_img_icon").value;

    /******************質問の分岐のため既存回答を配列にする **********************/
    // テスト用の変数をオブジェクトで管理
    const testVars = {
    };

    var count = document.getElementById("answer_list1").childElementCount;
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("answer_list1").children[c].textContent;
        var meta_id = document.getElementById("answer_list1").children[c].id;
        testVars[meta_id] = meta_data;
    }
    //console.log(testVars);
    /******************質問の分岐のため既存回答を配列にする **********************/

    console.log(c,document.getElementById("list1").children[0].textContent,'CTEST')


    var count = document.getElementById("list1").childElementCount;
    for (var c = next_chat_num; c < count; c++) {

    


        var meta_data = document.getElementById("list1").children[c].textContent;
        var meta_list = meta_data.split('＆＄');

        console.log(document.getElementById("list1"))
        console.log(c,document.getElementById("list1").children[c].textContent)

        console.log(c,meta_list[5],'BTEST')


        if (meta_list[4] != '表示') {//表示,非表示,テスト,削除

            console.log(c,meta_list[5],'BTEST',meta_list[4])
            continue;
        }

        var message_function = meta_list[2];//メッセージを表示する条件
        var message_type = meta_list[3];//メッセージ,質問
        var message_id = meta_list[0];//メッセージID
        var answer_plugin = meta_list[7];//回答種類、プラグイン
        var answer_list = meta_list[9];//回答候補のメタデータ




        /******************質問の分岐のための条件をチェックする **********************/
        if (message_function != '' && message_function != '全員に') {


            // 条件式の文字列
            //const parameters = '(testVars.test1 === "apple" || testVars.test1 === "pineapple") && testVars.test2 === "red"';
            const parameters = message_function;
            // Functionコンストラクタを使用して条件を評価する関数を作成
            const evaluateCondition = new Function('testVars', 'return ' + parameters + ';');
            // 条件を評価
            if (evaluateCondition(testVars)) {
                console.log('条件に合致します');
            } else {
                console.log('条件外。');
                continue;
            }

        }

        console.log(c,meta_list[3],'BTEST')

        //文字の場合
        var chat_body_html = ''
            + '   <div class="chat_body_bubble_area">'
            + '        <div class="balloon2-left">'
            + '            <div id="' + message_id + '_text" >'
            + '<div class="chat_spinner"><div class="chat_bounce1"></div><div class="chat_bounce2"></div><div class="chat_bounce3"></div></div>'
            + '            </div>'
            + '        </div>'
            + '    </div>';

        if (message_type == '画像') {
            var chat_body_html = ''
                + '   <div class="chat_body_bubble_area">'
                + '        <div class="chat_body_img_area">'
                + '<img src="' + meta_list[5] + '" class="chat_body_img" >'
                + '        </div>'
                + '    </div>';
        }
        if (message_type == '画像BIG') {
            var chat_body_html = ''
                + '   <div class="chat_body_bubble_area">'
                + '        <div class="chat_body_img_area2">'
                + '<img src="' + meta_list[5] + '" class="chat_body_img" >'
                + '        </div>'
                + '    </div>';
        }


        var chat_html = ''
            + '<div class="chat_section" id="' + message_id + '_m" >'
            + '<div class="chat_user_icon_area">'
            + '   <div class="chat_user_icon">'
            + '        <img class="user_icon_pic" src="' + avatar_img_icon + '">'
            + '    </div>'
            + '</div>'
            + '<div class="chat_body_area">'
            + '    <div class="chat_body_user_name">外壁塗装の窓口</div>'
            + chat_body_html
            + '</div>'
            + '</div>';


        if (meta_list[5] == '') {
            var chat_html = '';//メッセージテキストが空欄の場合はチャットを表示しない
        }
        if (message_type == '質問グループ') {
            var chat_html = '';//質問グループの場合、通常の質問メッセージは表示しない
        }


        console.log(c,meta_list[5],'BTEST','break')
        var next_chat_num = c + 1;
        document.getElementById("now_question_number").value = next_chat_num;
        break;

    }


    var old_question_count = document.getElementById("question_list").childElementCount;
    if (old_question_count != 0) {
        var chat_html = '';//質問グループの生成が進行中の場合、次に表示するのはグループユニットのためメッセージは生成しない。
    }

    console.log(meta_list[5],c,'BTEST')

    /********************** 質問メッセージを置換 ****************************************/
    var question_text = meta_list[5].replace(/\n/g, '<br>').replace(/＄/g, '<br>')
    if (meta_list[5] != '') {
        var answer_list1 = document.getElementById("answer_list1").childElementCount;
        for (var a = 0; a < answer_list1; a++) {
            var answer_meta_data = document.getElementById("answer_list1").children[a].textContent;
            var answer_meta_id = document.getElementById("answer_list1").children[a].id;
            var reg1 = new RegExp('{' + answer_meta_id + '}', 'g');
            var question_text = question_text.replace(reg1, '<span class="hensuu" >' + answer_meta_data + '</span>');
        }
    }
    /********************** 質問メッセージを置換 ****************************************/
    /********************** 質問メッセージを置換 ****************************************/
    if (question_text != '' && question_text.match(/{/)) {
        var replace_meta_ary = ['answered_count', 'answered_time'];
        for (var a = 0; a < replace_meta_ary.length; a++) {
            var reg1 = new RegExp('{' + replace_meta_ary[a] + '}', 'g');
            var replace_meta_data = '';
            if (replace_meta_ary[a] == 'answered_count') {
                var replace_meta_data = document.getElementById("answer_list1").childElementCount;
            } else if (replace_meta_ary[a] == 'answered_time') {
                var answer_start_time = localStorage.getItem('answer_start_time');
                var replace_meta_data = time_count_on2(answer_start_time)
            }


            var question_text = question_text.replace(reg1, replace_meta_data);
        }
    }
    /********************** 質問メッセージを置換 ****************************************/


    /********************** 質問メッセージを置換 ****************************************/
    try{
        if(question_text != '' && question_text.match(/【/)){
            var question_text = question_text.replace(/【/g,'<span class="hensuu">').replace(/】/g,'</span>')
        }
        if(question_text != '' && question_text.match(/《/)){
            var question_text = question_text.replace(/《/g,'<span class="hensuu2">').replace(/》/g,'</span>')
        }

    }catch(e){
    }


    /********************** 質問メッセージを置換 ****************************************/


    var old_question_count = document.getElementById("question_list").childElementCount;
    if (message_type == '質問グループ' && old_question_count < 7) {
        /************************/
        var list = document.getElementById('question_list');
        var option = document.createElement('li');
        option.innerHTML = meta_list[5] + '％' + answer_list; //質問 ％　回答候補のメタデータ
        option.id = message_id + '_question';
        list.appendChild(option);
        /************************/
        next_chat_go();//質問グループの場合は後でまとめて表示するので配列に蓄えて次の質問へ
        return;
    } else if (old_question_count != 0) {
        //console.log('ここで質問グループを表示する')
        question_group_unit();

        var back_chat_num = c;
        document.getElementById("now_question_number").value = back_chat_num;//進まないで現状維持
        //document.getElementById("question_list")のクリア忘れないで！
        return;
    }




    /****************** 既に回答済みの場合 *******************************/
    var skip_mode_check = document.getElementById('skip_mode').value;
    var message_id_check = document.getElementById(message_id) != null; //要素があるか
    if (message_id_check == true || skip_mode_check == 'true') {
        next_chat_view_non_stop(chat_html, question_text, message_id)//ここでメッセージを描画する
    } else {
        if (meta_list[7] != '' && message_type == 'メッセージ') {
            next_chat_view(chat_html, question_text, message_id, meta_list[7])//ここでメッセージを描画する
        } else {
            next_chat_view(chat_html, question_text, message_id)//ここでメッセージを描画する
        }


    }
    /****************** 既に回答済みの場合 *******************************/



    /******** ここからはプラグインの処理 **********/


    var answer_delay1 = document.getElementById('answer_delay1').value;//メッセージバブル描画までの遅延時間
    var answer_delay2 = document.getElementById('answer_delay2').value;//メッセージ表示までの遅延時間
    var answer_delay3 = document.getElementById('answer_delay3').value;//メッセージ連投の場合の遅延時間
    var plugin_delay1 = document.getElementById('plugin_delay1').value;//プラグイン表示までの遅延時間

    if (answer_plugin == '地域選択' || answer_plugin == '市区町村選択') {
        var plugin_delay1 = 100;//プラグイン表示までの遅延時間
    }
    var delay_time = Number(answer_delay1) + Number(answer_delay2) + Number(plugin_delay1);//メッセージより先に入力オブジェクトが表示されないよう、制御
    var delay_time2 = Number(answer_delay1) + Number(answer_delay2) + Number(answer_delay3);//メッセージを連投する際の遅延時間

    /****************** 既に回答済みの場合 *******************************/
    var message_id_check = document.getElementById(message_id) != null; //要素があるか
    if (message_id_check == true) {
        var delay_time2 = 0;//メッセージを連投する際の遅延時間
    }
    /****************** 既に回答済みの場合 *******************************/
    /****************** スキップモードがオンの場合 *******************************/
    var skip_mode_check = document.getElementById('skip_mode').value;
    if (skip_mode_check == 'true') {
        var delay_time2 = 0;
        var delay_time = 0;
    }
    /****************** スキップモードがオンの場合 *******************************/

    setTimeout(() => {
        if (message_type == 'メッセージ' || message_type == '画像' || message_type == '画像BIG') {
            next_chat_go();//質問でない場合は続けて連投   
        }
    }, delay_time2);//連投の場合の遅延



    /****************** 既に回答済みの場合は自動でアンサーを入れる *******************************/
    var message_id_check = document.getElementById(message_id) != null; //要素があるか
    if (message_id_check == true) {
        var message_id_value = document.getElementById(message_id).innerHTML;

        if (message_id_value != '') {
            setTimeout(() => {
                add_answer(message_id, message_id_value);


            }, 3);
            var delay_time = 0;
            // console.log('既にメッセージがある')
            return;
        }
    }
    /****************** 既に回答済みの場合は自動でアンサーを入れる *******************************/

    /****************** 回答が必要な場合で、スキップモードが有効な場合は強制的にスキップモードをオフにする ***********************/
    var skip_mode_check = document.getElementById('skip_mode').value;
    if (message_type != 'メッセージ' && skip_mode_check == 'true' && message_type != '画像' && message_type != '画像BIG') {
        skip_mode_on();//スキップモード終了
        document.getElementById("main_load_overlay1").style.display = 'none';//スキップロードの終了
        var delay_time = 2000;
    }
    /****************** 回答が必要な場合で、スキップモードが有効な場合は強制的にスキップモードをオフにする ***********************/

    if (message_type != 'メッセージ' && message_type != '画像' && message_type != '画像BIG') {
        setTimeout(() => {
            document.getElementById("wait_mode").value = 'true'
            console.log('wait_mode')
        }, 2500);
    }

    setTimeout(() => {

        if (answer_plugin == '地域選択') {
            area_select_unit()
        }
        if (answer_plugin == '市区町村選択') {
            city_select_unit()
        }
        if (answer_plugin == '単独選択(画像)') {
            select_img_btn_unit(message_id, answer_list)
        }
        if (answer_plugin == '単独選択(文字)') {
            select_text_btn_unit(message_id, answer_list)
        }
        if (answer_plugin == '電話番号') {
            mobile_tel_number_input_unit(message_id);
            change_banner();//バナーを変更
        }
        if (message_type == 'コンバージョンイベント') {
            cv_data_load()
        }
        if (answer_plugin == '単独ボタン') {
            standalone_btn(answer_list, message_id)
        }





    }, delay_time);









    return;

}



/*************************** 通常のメッセージ描画（遅延あり）***********************************************************/
function next_chat_view(msg_html, msg2, message_id, option_delay) {

    var msg2 = msg2 + '<span class="message_score" id="message_score_' + message_id + '" >▼</span>'

    if (option_delay == undefined) {
        var option_delay = 0;
    }

    var delay_time = document.getElementById('answer_delay1').value;
    var delay_time = Number(delay_time) + Number(option_delay);//オプションで個別に遅延させる場合のために、追加かさん


    var delay_time2 = document.getElementById('answer_delay2').value;
    var delay_time2b = Number(delay_time) + Number(delay_time2)//バブル表示までの遅延時間と合算する
    setTimeout(() => {
        document.getElementById("chat_area").innerHTML += msg_html;//ここでメッセージを描画する
        bottom_scroll();


    }, delay_time);
    setTimeout(() => {
        if (document.getElementById(message_id + '_text') != null) {
            document.getElementById(message_id + '_text').innerHTML = msg2;//ここでメッセージを描画する
            message_score_on(message_id)
        }
    }, delay_time2b);
}







/*************************** 通常のメッセージ描画（遅延あり）***********************************************************/

/*************************** 特別なメッセージ描画（遅延なし）***********************************************************/
function next_chat_view_non_stop(msg_html, msg2, message_id) {

    var msg2 = msg2 + '<span class="message_score" id="message_score_' + message_id + '" >▼</span>'

    setTimeout(() => {
        document.getElementById("chat_area").innerHTML += msg_html;//ここでメッセージを描画する
        bottom_scroll();

    }, 1);
    setTimeout(() => {
        if (document.getElementById(message_id + '_text') != null) {
            document.getElementById(message_id + '_text').innerHTML = msg2;//ここでメッセージを描画する
            message_score_on(message_id)
        }
    }, 2);
}
/*************************** 特別なメッセージ描画（遅延なし）************************************************************/


/*


    <div class="me_chat_section">
        <div class="me_chat_body_area">
            <div class="me_chat_body_bubble_area">
                <div class="balloon2-right">
                    <p>はい</p>
                </div>
            </div>
        </div>
    </div>
    */






var event_count12 = null;
function message_score_on(id) {
    clearTimeout(event_count12);
    event_count12 = setTimeout('message_score_on2(' + "'" + id + "'" + ')', 1000);
}


function message_score_on(id) {
    try {
        document.getElementById('message_score_' + id).style.display = 'inline-block';
        message_score_off();
        document.getElementById('message_score_id').value = id;

    } catch (e) {
    }
}



function message_score_off() {
    try {
        var message_score_id = document.getElementById('message_score_id').value;
        if (message_score_id != '') {
            document.getElementById('message_score_' + message_score_id).style.display = 'none';
        }
    } catch (e) { }
}