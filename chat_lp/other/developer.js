function view_developer_panel() {
    //2023041201

    document.getElementById("developer_panel").style.display = 'block';

    var html = '' +
        '<img class="panel_logo" src="https://iseki.app/images/iseki_logo3.webp" >' +
        '<h1 class="panel_h1" >開発パネル</h1>' +
        '<a class="panel_btn1" href="https://the.gaihekitosou-support.jp/ab/gaiheki-sb-genpon?type=LP56" target="blank" >AdOps比較</a>' +
        '<button class="panel_btn2" onclick="next_chat_go()" ><i class="material-icons">skip_next</i></button>' +
        '<button class="panel_btn2" onclick="save_answer_reset()" ><i class="material-icons">restart_alt</i></button>'

    +'<a class="panel_btn1" onclick="view_developer_answer()" >回答を表示</a>' +
    '<a class="panel_btn1" onclick="view_developer_question()" >質問一覧</a>' +
    '<a class="panel_btn1" onclick="view_developer_output_answer()" >回答を出力</a>' +
    '<a class="panel_btn1" id="skip_mode_btn" onclick="skip_mode_on()" >skip_mode</a>' +
    '<a class="panel_btn1" onclick="save_answer_local()" >保存する</a>' +
    '<a class="panel_btn1" onclick="save_answer_reset()" >リセット</a>' +
    '<a class="panel_btn1" onclick="clear_lp_save()" >LPリセマラ</a>'

    document.getElementById("developer_panel").innerHTML = html


    //<i class="material-icons">close</i>
}


function clear_lp_save() {
    localStorage.removeItem('chat_lp_lp_id');
    location.reload();
}

function view_developer_answer() {

    var count = document.getElementById("answer_list1").childElementCount;
    var html = '';
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("answer_list1").children[c].textContent;
        var meta_id = document.getElementById("answer_list1").children[c].id;
        html += meta_id + '：' + meta_data + '<hr>'
    }



    document.getElementById("developer_overlay1").style.display = 'flex';
    document.getElementById("developer_overlay1_card").innerHTML = '' +
        '<div class="developer_card">' +
        '<button class="question_overlay1_close_btn" onclick="close_developer_overlay1()" ><i class="material-icons">close</i></button>' +
        '<div class="developer_card_answer_list">' +
        html +
        '</div>' +
        '</div>'
}

function close_developer_overlay1() {
    document.getElementById("developer_overlay1").style.display = 'none';
}







function view_developer_question() {
    var count = document.getElementById("list9").childElementCount;
    var html = '';
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("list9").children[c].textContent;
        var meta_list = meta_data.split('＆＄');
        var q_id = meta_list[0]
        var q_title = meta_list[5]
        html += '' +
            '<div class="developer_card_answer_list_div">' +
            '<span class="q_id" >' + q_id + '</span>' +
            '<p class="q_title" >' + q_title + '</p>' +
            '</div>'
    }



    document.getElementById("developer_overlay1").style.display = 'flex';
    document.getElementById("developer_overlay1_card").innerHTML = '' +
        '<div class="developer_card">' +
        '<button class="question_overlay1_close_btn" onclick="close_developer_overlay1()" ><i class="material-icons">close</i></button>' +
        '<div class="developer_card_answer_list">' +
        html +
        '</div>' +
        '</div>'
}




function view_developer_output_answer() {
    var count = document.getElementById("answer_list1").childElementCount;
    var answer_data = ''
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("answer_list1").children[c].textContent;
        var meta_id = document.getElementById("answer_list1").children[c].id;
        answer_data += meta_id + '：' + meta_data + '＆＄'
    }



    document.getElementById("developer_overlay1").style.display = 'flex';
    document.getElementById("developer_overlay1_card").innerHTML = '' +
        '<div class="developer_card">' +
        '<button class="question_overlay1_close_btn" onclick="close_developer_overlay1()" ><i class="material-icons">close</i></button>' +
        '<textarea class="developer_textarea" id="answer_meta_data_text" >' + answer_data + '</textarea>' +
        '<button class="developer_btn1" onclick="close_developer_overlay1()" >コピー</button>' +
        '<button class="developer_btn1" onclick="view_developer_output_answer_import()" >インポート</button>' +
        '<button class="developer_btn1" onclick="close_developer_overlay1()" >ローカルストレージに保存</button>' +
        '<button class="developer_btn1" onclick="close_developer_overlay1()" >ローカルストレージから復元</button>'

    +
    '</div>'
}


function view_developer_output_answer_import(answer_meta_data_text) {
    document.getElementById('answer_list1').innerHTML = '';
    if (answer_meta_data_text == undefined) {
        var answer_meta_data_text = document.getElementById("answer_meta_data_text").value;
        alert('インポートしました')
    }

    var answer_meta_data_list = answer_meta_data_text.split('＆＄');
    for (var c = 0; c < answer_meta_data_list.length; c++) {
        if (answer_meta_data_list[c] == undefined || answer_meta_data_list[c] == '') {
            continue;
        }
        var answer_meta_data_list2 = answer_meta_data_list[c].split('：');
        var list = document.getElementById('answer_list1');
        var option = document.createElement('li');
        option.innerHTML = answer_meta_data_list2[1];
        option.id = answer_meta_data_list2[0];
        list.appendChild(option);
    }



}


function skip_mode_on() {
    var skip_mode_check = document.getElementById('skip_mode').value;
    if (skip_mode_check != 'true') {
        document.getElementById('skip_mode').value = 'true';
        try {
            document.getElementById('skip_mode_btn').classList.add('skip_mode_on')
        } catch (e) {}
    } else {
        document.getElementById('skip_mode').value = '';
        try {
            document.getElementById('skip_mode_btn').classList.remove('skip_mode_on')
        } catch (e) {}
    }

}





function save_answer_local() {
    var count = document.getElementById("answer_list1").childElementCount;
    var answer_data = ''
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("answer_list1").children[c].textContent;
        var meta_id = document.getElementById("answer_list1").children[c].id;
        answer_data += meta_id + '：' + meta_data + '＆＄'
    }


    localStorage.setItem('chat_lp_answer_save', answer_data);
    alert('保存しました！')
}



function save_answer_reset() {
    localStorage.removeItem('chat_lp_answer_save');
    alert('リセットしました。')
    location.reload();
}