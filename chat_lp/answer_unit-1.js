//地域選択ユニット
function area_select_unit() {


    var max_width = document.body.clientWidth
    if (max_width > 700) {
        var max_width = 700;
        var html = 'map.html';
    } else {
        var max_width = max_width
        var html = 'map_sp.html';
    }

    var plugin_html = '' +
        '<div class="chat_plugin_section2"  id="chat_plugin_section">' +
        '<div class="p_load" id="p_load" ><div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>' +
        '<iframe id="map" src="../../' + html + '?canvasWidth=' + max_width + '" frameborder="0" scrolling="no"></iframe>' +
        '<img src="../../img/gesture01.webp" class="user_guide_message_img1">' +
        '</div>';

    document.getElementById("chat_area").innerHTML += plugin_html;


    if (max_width < 700) {
        //   document.getElementById("map").style.width = max_width + 'px';
    }



    $(function() {
        var $mapObj = $("#map");


        $mapObj.on("load", function() {

            document.getElementById("p_load").style.display = 'none';

            setTimeout(() => {
                var $iframeCanvas = $('iframe:first').contents().find("#japan-map-container > canvas");
                if ($iframeCanvas.attr("width") == undefined || $iframeCanvas.attr("width") == '' || $iframeCanvas.attr("width") < 700) {
                    $mapObj.attr({
                        width: 700,
                        height: 522
                    });
                } else {
                    $mapObj.attr({
                        width: $iframeCanvas.attr("width"),
                        height: $iframeCanvas.attr("height")
                    });
                }
            }, 1000);


            setTimeout(() => {
                bottom_scroll2()
            }, 1200);



        });

    });

    user_guide_message_start('物件の場所はどちらですか？') //ユーザーガイドを表示

}




/***********************************************************************************************************/
/***********************************************************************************************************/





//市区町村選択ユニット
function city_select_unit() {

    var plugin_html = '' +
        '<div class="chat_plugin_section"  id="chat_plugin_section">' +
        '<div class="city_select_card"  id="city_select_card">' +
        '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>' +
        '</div>' +
        '<img src="../img/gesture01.webp" class="user_guide_message_img1">' +
        '</div>';
    document.getElementById("chat_area").innerHTML += plugin_html;
    setTimeout('city_select_unit2()', 600)
}

function city_select_unit2() {
    var list2 = document.getElementById("list2").innerHTML;
    if (list2 == '') {
        setTimeout('city_select_unit2()', 1000);
        return;
    }
    var pref = document.getElementById("question_3").innerHTML;
    var plugin_html = '' +
        '<div class="city_select_main_card" >' +
        '<div class="city_select_main_card_title" >' +
        pref +
        '</div>' +
        '<div class="city_select_main_card_body" >' +
        '<div class="city_select_main_card_body_index" id="city_index" >' +
        '</div>' +
        '<div class="city_select_main_card_body_list"  id="city_list" >' +
        '</div>' +
        '</div>' +
        '</div>';
    document.getElementById("city_select_card").innerHTML = plugin_html;


    var city_ary = [];
    var city_index_ary = [];
    var count = document.getElementById("list2").childElementCount;
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("list2").children[c].textContent;
        var meta_list = meta_data.split('＆＄');
        if (meta_list[0] == pref && meta_list[3] != '') {
            city_ary.push(meta_list)
            if (meta_list[4] != '') {
                city_index_ary.push(meta_list[4].slice(0, 1));
            }
        }
    }

    //市区町村の平仮名頭文字のユニーク
    city_index_ary.sort((a, b) => a.localeCompare(b), 'ja');
    var city_index_ary = city_index_ary.filter((element, index) => city_index_ary.indexOf(element) === index);
    var city_index_html = ''
    for (var c = 0; c < city_index_ary.length; c++) {
        city_index_html += '' +
            '<button class="city_index_btn" onclick="move_city(' + c + ')" >' + city_index_ary[c] + '</button>'
    }
    document.getElementById('city_index').innerHTML = city_index_html;


    // 3列目を基準にあいうえお順に並び替える
    city_ary.sort((a, b) => {
        // 3列目の要素を比較
        if (a[4] < b[4]) {
            return -1;
        } else if (a[4] > b[4]) {
            return 1;
        } else {
            return 0;
        }
    });
    var city_html = '';
    var index_word = '';
    var index_count = 0;

    for (var c = 0; c < city_ary.length; c++) {
        if (city_ary[c][3] == '') {
            continue;
        }
        var index_now_word = city_ary[c][4].slice(0, 1);
        if (index_word != index_now_word) {
            city_html += '' +
                '<div class="index_span" id="index_span_' + index_count + '" ><span>' + index_now_word + '</span>行</div>';
            var index_word = index_now_word;
            index_count += 1;
        }

        if (city_ary[c][1] != '') {
            var area_name = '<span>' + city_ary[c][1] + '</span>'
        } else {
            var area_name = ''
        }

        city_html += '' +
            '<button class="city_btn" onclick="add_answer(' + "'" + 'question_5' + "','" + city_ary[c][1] + city_ary[c][3] + "'" + ')">' + area_name + city_ary[c][3] + '</button>'
    }
    document.getElementById('city_list').innerHTML = city_html;




    console.log(city_ary)



    setTimeout(() => {
        bottom_scroll2();
    }, 200);
    user_guide_message_start('市区町村はどちらになりますか？') //ユーザーガイドを表示

}

function move_city(index) {

    var now_scroll = document.getElementById("city_list").scrollTop;
    var base = $('#city_list').offset().top;
    var contents = $('#index_span_' + index).offset().top;
    var sc = contents - base + now_scroll;
    document.getElementById("city_list").scrollTop = sc
}







/***********************************************************************************************************/
/***********************************************************************************************************/








//単独選択(画像)ユニット
function select_img_btn_unit(id, answer_list) {

    var plugin_html = '' +
        '<div class="chat_plugin_section"  id="chat_plugin_section">' +
        '<div class="img_select_card"  id="img_select_card">' +
        '</div>' +
        '<img src="../../img/gesture01.webp" class="user_guide_message_img1">' +
        '</div>';
    document.getElementById("chat_area").innerHTML += plugin_html;

    var answer_list_html = '';
    if (answer_list.match(/＊/)) {
        var answer_list2 = answer_list.split('＊'); //アンサー候補
        var count = 0;
        for (var a = 0; a < answer_list2.length; a++) {
            var btn_img = '';
            var btn_text = '';
            var ring_html = '<span class="select_text_ring" ></span>'
            if (answer_list2[a].match(/＠/)) {
                var btn_img_meta = answer_list2[a].split('＠');
                var btn_img = btn_img_meta[1];
                var btn_text = btn_img_meta[0];
            }
            if (btn_img == '') {
                var btn_img = 'https://iseki.app/460x0w.webp'
            }
            if (btn_text == '') {
                continue;
            }
            if (btn_text == 'その他' || btn_text == 'よくわからない' || btn_text == 'わからない' || btn_text == 'どちらでもない') {
                var ring_html = ''
            }

            if (count > 3) {


                if (btn_text == 'わからない') {
                    var ring_html = '<img src="https://iseki.app/chat_lp/section_img/help.webp" class="select_text_ring_img" >';
                } else if (btn_text == 'よくわからない') {
                    var ring_html = '<img src="https://iseki.app/chat_lp/section_img/help.webp" class="select_text_ring_img" >';
                } else if (btn_text == 'その他') {
                    var ring_html = '<img src="https://iseki.app/chat_lp/section_img/more.webp" class="select_text_ring_img" >';
                }



                answer_list_html += '' +
                    '<div class="text_select_btn"  onclick="add_answer(' + "'" + id + "','" + btn_text + "'" + ')"  >' +
                    '<div class="img_select_btn_text_section2" >' +
                    ring_html +
                    btn_text +
                    '</div>' +
                    '</div>'
                count += 1;
                continue;
            }



            answer_list_html += '' +
                '<div class="img_select_btn"  onclick="add_answer(' + "'" + id + "','" + btn_text + "'" + ')"  >' +
                '<div class="img_select_btn_img_section" >' +
                '<img class="btn_select_img" src="' + btn_img + '"  >' +
                '</div>' +
                '<div class="img_select_btn_text_section" >' +
                ring_html +
                btn_text +
                '</div>' +
                '</div>'
            count += 1;

        }
    }

    document.getElementById("img_select_card").innerHTML = answer_list_html;










    setTimeout(() => {
        bottom_scroll2();
    }, 200);
    user_guide_message_start('当てはまるものはどれですか？') //ユーザーガイドを表示


}




















/***********************************************************************************************************/
/***********************************************************************************************************/




//質問グループユニット
function question_group_unit() {

    var question_group_count = document.getElementById("question_group_count").value;
    var question_group_count = Number(question_group_count);

    var plugin_html = '' +
        '<div class="question_group_section"  id="question_group_section_' + question_group_count + '">' +
        '<div class="question_group_list"  id="question_group_list_' + question_group_count + '">' +
        '</div>' +
        '<input type="hidden" id="question_group_done_flag_' + question_group_count + '" value="" >' //全て回答が終わったフラグ
        +
        '<input type="hidden" id="question_group_id_list_' + question_group_count + '" value="" >' //グループ内の質問IDリスト

    +'</div>';
    document.getElementById("chat_area").innerHTML += plugin_html;



    var question_group_html = '';
    var question_group_id_list = '';
    var count = document.getElementById("question_list").childElementCount;
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("question_list").children[c].textContent;
        var meta_id = document.getElementById("question_list").children[c].id;
        var meta_list = meta_data.split('％');
        var cash_answer = '';
        var cash_answer_view = '選択してください';


        try {
            var true_id = meta_id.replace('_question', '');
            var message_id_check = document.getElementById(true_id) != null; //要素があるか
            if (message_id_check == true) {
                var cash_answer = document.getElementById(true_id).innerHTML;
                var cash_answer_view = cash_answer;
            }
        } catch (e) {}


        question_group_html += '' +
            '<div class="question_group_list_card" onclick="question_group_unit_answer(' + "'" + meta_id + "','" + question_group_count + "'" + ')" >' +
            '<div class="question_group_list_card_question">' +
            meta_list[0] +
            '</div>' +
            '<div class="question_group_list_card_answer" id="question_group_list_hidden_answer_view_' + meta_id + '" >' +
            cash_answer_view +
            '</div>' +
            '<input type="hidden" id="question_group_list_hidden_id_' + meta_id + '" value="' + meta_id + '" >' +
            '<input type="hidden" id="question_group_list_hidden_question_' + meta_id + '" value="' + meta_list[0] + '" >' +
            '<input type="hidden" id="question_group_list_hidden_answer_list_' + meta_id + '" value="' + meta_list[1] + '" >' +
            '<input type="hidden" id="question_group_list_hidden_answer_' + meta_id + '"  value="' + cash_answer + '" >'

        +
        '</div>';

        question_group_id_list += meta_id + ','



    }


    document.getElementById("question_group_list_" + question_group_count).innerHTML = question_group_html;
    document.getElementById("question_group_id_list_" + question_group_count).value = question_group_id_list;



    setTimeout(() => {
        bottom_scroll2();
    }, 200);
    user_guide_message_start('すべての回答が必要です') //ユーザーガイドを表示


    document.getElementById("question_list").innerHTML = ''; //ユニットを表示したので、質問グループの元データはクリア
    var next_question_group_id = question_group_count + 1;
    document.getElementById("question_group_count").value = next_question_group_id; //次の質問グループIDを用意する


    setTimeout(() => {
        question_group_unit_answer_check(question_group_count) //最初からモーダル表示
    }, 1000);


}


function question_group_unit_answer(id, group_id) {

    var question_text = document.getElementById("question_group_list_hidden_question_" + id).value;
    var answer_list_in = document.getElementById("question_group_list_hidden_answer_list_" + id).value;
    var answer_list = answer_list_in.split('＊')

    var answer_html = '';
    var mini_flag = '';
    for (var a = 0; a < answer_list.length; a++) {
        if (a > 1) {
            var mini_flag = 'btn_mini';
        }
        if (answer_list[a] == '' || answer_list[a] == undefined) {
            continue;
        }
        answer_html += '' +
            '<button class="question_group_overlay_card_answer_btn ' + mini_flag + '" onclick="question_group_unit_answer_save(' + "'" + id + "','" + answer_list[a] + "','" + group_id + "'" + ')" >' + answer_list[a] + '</button>'
    }


    document.getElementById("question_overlay1").style.display = 'flex';
    document.getElementById("question_overlay1_card").innerHTML = '' +
        '<div class="question_group_overlay_card">' +
        '<button class="question_overlay1_close_btn" onclick="close_question_overlay1()" ><i class="material-icons">close</i></button>' +
        '<div class="question_group_overlay_card_question">' +
        question_text +
        '</div>' +
        '<div class="question_group_overlay_card_btn_area">' +
        answer_html +
        '</div>'


    document.getElementById("main_load_overlay1").style.display = 'none'; //スキップロードの終了

}

function close_question_overlay1() {
    document.getElementById("question_overlay1").style.display = 'none';
}

function question_group_unit_answer_save(id, answer, group_id) {
    document.getElementById("question_group_list_hidden_answer_" + id).value = answer;
    document.getElementById("question_group_list_hidden_answer_view_" + id).innerHTML = answer;
    document.getElementById("question_group_list_hidden_answer_view_" + id).classList.add('question_group_answer_done');
    document.getElementById("question_group_list_hidden_answer_view_" + id).classList.remove('click_me');
    close_question_overlay1();

    var true_id = id.replace('_question', '');
    /************************/
    var list = document.getElementById('answer_list1');
    var option = document.createElement('li');
    option.innerHTML = answer;
    option.id = true_id;
    list.appendChild(option);
    /************************/
    document.getElementById("question_overlay1_card").innerHTML = '';
    //setTimeout('question_group_unit_answer_check(' + "'" + group_id + "'" + ')',30);//他の質問の回答状況をチェック
    question_group_unit_answer_check(group_id) //他の質問の回答状況をチェック
}

function question_group_unit_answer_check(group_id) {
    var question_group_id_list = document.getElementById("question_group_id_list_" + group_id).value;
    var question_group_id_list2 = question_group_id_list.split(',') //グループ内の質問リスト
    var answer_done_flag = 'done';
    for (var a = 0; a < question_group_id_list2.length; a++) {
        var id = question_group_id_list2[a]
        if (id == '' || id == undefined) {
            continue;
        }
        var answer = document.getElementById("question_group_list_hidden_answer_" + id).value;
        if (answer == '') {
            document.getElementById("question_group_list_hidden_answer_view_" + id).classList.add('click_me');
            question_group_unit_answer(id, group_id) //未回答がある場合、モーダルを表示
            var answer_done_flag = '';
            break;
        }
    }


    var question_group_done_flag = document.getElementById("question_group_done_flag_" + group_id).value;

    if (answer_done_flag == 'done' && question_group_done_flag == '') {
        document.getElementById("question_group_done_flag_" + group_id).value = 'done';
        document.getElementById("user_guide_message_div").style.display = 'none'; //ユーザーガイドも消す
        next_chat_go();
    }



}









/***********************************************************************************************************/
/***********************************************************************************************************/








//単独選択(文字)ユニット
function select_text_btn_unit(id, answer_list) {

    var plugin_html = '' +
        '<div class="chat_plugin_section"  id="chat_plugin_section">' +
        '<div class="text_select_card"  id="text_select_card">' +
        '</div>' +
        '<img src="../../img/gesture01.webp" class="user_guide_message_img1">' +
        '</div>';
    document.getElementById("chat_area").innerHTML += plugin_html;

    var answer_list_html = '';
    if (answer_list.match(/＊/)) {
        var answer_list2 = answer_list.split('＊'); //アンサー候補
        for (var a = 0; a < answer_list2.length; a++) {
            var btn_text = '';
            if (answer_list2[a].match(/＠/)) {
                var btn_img_meta = answer_list2[a].split('＠');
                var btn_text = btn_img_meta[0];
            }

            if (btn_text == '') {
                continue;
            }
            if (btn_text == 'わからない') {
                var btn_icon_img = '<img src="https://iseki.app/chat_lp/section_img/help.webp" class="select_text_ring_img" >';
            } else if (btn_text == 'はい') {
                var btn_icon_img = '<img src="https://iseki.app/chat_lp/img/nc202107.webp" class="select_text_ring_img" >';
            } else if (btn_text == 'いいえ') {
                var btn_icon_img = '<img src="https://iseki.app/chat_lp/img/nc202108.webp" class="select_text_ring_img" >';
            } else if (btn_text == 'その他') {
                var btn_icon_img = '<img src="https://iseki.app/chat_lp/section_img/more.webp" class="select_text_ring_img" >';
            } else {
                var btn_icon_img = '<span class="select_text_ring2"  style="border-color: ' + color_pallet + ';" ></span>';
            }

            var h = a * (360 / answer_list2.length);
            var color_pallet = `hsl(${h}, 80%, 60%)`;

            answer_list_html += '' +
                '<div class="text_select_btn"  onclick="add_answer(' + "'" + id + "','" + btn_text + "'" + ')"  >'

            +
            '<div class="img_select_btn_text_section2" >' +
            btn_icon_img
                +
                btn_text +
                '</div>' +
                '</div>'


        }

    }

    document.getElementById("text_select_card").innerHTML = answer_list_html;










    setTimeout(() => {
        bottom_scroll2();
    }, 200);
    user_guide_message_start('当てはまるものはどれですか？') //ユーザーガイドを表示


}













/***********************************************************************************************************/
/***********************************************************************************************************/


//電話番号入力ユニット
function mobile_tel_number_input_unit(id) {

    var plugin_html = '' +
        '<div class="chat_plugin_section"  id="chat_plugin_section">' +
        '<div class="chat_plugin_section_tel_unit" >' +
        '<p>携帯電話番号（ショートメッセージをお送りします）</p>' +
        '<input type="tel" class="tel_input" name="tel" id="tel_input" autocomplete="tel" placeholder="09000000000" oninput="mobile_tel_number_input_check(this)" >' +
        '<p class="tel_error_reslt" id="tel_error_reslt" ></p>' +
        '<p class="sub_p" >※ハイフンなし</p>' +
        '</div>'

    +'<div class="chat_plugin_section_cv_btn_unit" >' +
    '<button class="cv_btn_go" onclick="mobile_tel_number_save(' + "'" + id + "'" + ')" id="cv_go_btn" >無料で結果を見る！' +
        '<img src="../../img/gesture01.webp"></button>' +
        '</div>'

    +
    '</div>';
    document.getElementById("chat_area").innerHTML += plugin_html;
    document.getElementById('tel_input').focus();
    document.getElementById("cv_go_btn").disabled = true;


    setTimeout(() => {
        bottom_scroll2();
    }, 200);

}

function mobile_tel_number_input_check(input) {

    if (input_number == '') {
        document.getElementById("cv_go_btn").disabled = true;
        document.getElementById("tel_error_reslt").innerHTML = '';
        document.getElementById("tel_input").style.border = ''
        return;
    }
    var r = true;
    var error = "";

    var input_number = input.value;
    var input_number = input_number.replace(/-/g, '').replace(/ー/g, '');
    //var input_number = hankaku2Zenkaku(input_number);
    if (!input_number.match(/^0[9876]0[-]?\d{4}[-]?\d{4}$/)) {
        error = "正しい携帯番号を入力して下さい(エラー1)";
        r = false;
    }

    if (!input_number.match(/^[0-9- ]+$/)) {
        error = "電話番号を半角数字で入力してください";
        r = false;
    } else if (input_number.charAt(0) != '0' || input_number.charAt(1) == '0') {
        error = "正しい番号を入力して下さい(エラー2)";
        r = false;
    } else {
        var number = input_number.replace(/[^0-9]/g, "");
        if (number.charAt(0) == '0' && number.charAt(1) != '0' && number.charAt(2) == '0') {
            if (number.length != 11)
                r = false;
        } else {
            if (!(number.length == 10 || number.length == 11))
                r = false;
        }
        //ハイフンの除去
        var input_message2 = input_number.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi, '');
        //同一数字が8文字以上連続する場合
        if (input_message2.match(/(.)\1\1\1\1\1\1\1/)) {
            error = "正しい番号を入力して下さい。(エラー3)";
            r = false;
        }

        //090の直後が0の場合
        if (input_message2.match(/^0[9876]00/)) {
            error = "正しい番号を入力して下さい。(エラー4)";
            r = false;
        }

        //12345678の文字列を含む場合
        if (input_message2.match(/12345678$/)) {
            error = "正しい番号を入力して下さい。(エラー5)";
            r = false;
        }



        //上4桁・下4桁それぞれ数値同様
        var first_num1 = input_message2.slice(-8); //12345678
        var first_num2 = first_num1.slice(-4); //5678
        var first_num3 = first_num2 + first_num2; //56785678

        if (first_num3 == first_num1) {
            error = "正しい番号を入力して下さい。(エラー6)";
            r = false;
        }

        //090の直後が1234
        if (input_message2.match(/^0[9876]01234/)) {
            error = "正しい番号を入力して下さい。(エラー7)";
            r = false;
        }
        //下4桁が1234
        if (first_num2 == 1234 || first_num2 == '1234') {
            error = "正しい番号を入力して下さい。(エラー8)";
            r = false;
        }

        //下4桁が同じ番号
        if (first_num2.match(/(.)\1\1\1/)) {
            //  error = "正しい番号を入力して下さい。(エラー9)";
            //  r = false;
        }



    }
    if (r == false) {
        document.getElementById("cv_go_btn").disabled = true;
        document.getElementById("tel_error_reslt").innerHTML = error;
        document.getElementById("tel_input").style.border = 'solid 2.6px #f51515'
    } else {
        document.getElementById("cv_go_btn").disabled = false;
        document.getElementById("tel_error_reslt").innerHTML = '';
        document.getElementById("tel_input").style.border = ''
    }

}

function mobile_tel_number_save(id) {
    var tel_input = document.getElementById("tel_input").value;
    var tel_input = tel_input.replace(/-/g, '').replace(/ー/g, '');


    if (tel_input != '') {
        add_answer(id, tel_input)
        document.getElementById("chat_lp_user_input_tel").value = tel_input;
    }


}
















/***********************************************************************************************************/
/***********************************************************************************************************/


//電話番号入力ユニット
function standalone_btn(answer_list, id) {

    var plugin_html = '' +
        '<div class="chat_plugin_section"  id="chat_plugin_section">' +
        '<div class="chat_plugin_section_cv_btn_unit" >' +
        '<button class="cv_btn_go" onclick="standalone_btn_go(' + "'" + id + "'" + ',' + "'" + answer_list + "'" + ')" id="cv_go_btn" >' +
        answer_list +
        '<img src="../../img/gesture01.webp"></button>' +
        '</div>'

    +'</div>';
    document.getElementById("chat_area").innerHTML += plugin_html;
    setTimeout(() => {
        bottom_scroll2();
    }, 200);

}




function standalone_btn_go(id, answer) {
    add_answer(id, answer)
}