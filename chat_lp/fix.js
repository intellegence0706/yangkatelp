function fix_answer(id) {

    var wait_mode = document.getElementById("wait_mode").value;
    if(wait_mode != 'true'){
        setTimeout('fix_answer(' + "'" + id + "'" + ')',1000);
        document.getElementById("main_load_overlay1").style.display = 'flex';
        document.getElementById("main_load_overlay1_message_area").innerHTML = ''
            + 'しばらく'
            + '<span class="important">お待ちください</span>..';
        return;
    }

    document.getElementById("main_load_overlay1").style.display = 'none';


    if(id == 'question_1'){
     //   return;
    }

    var find_id = id + '_u';

    var count = document.getElementById("chat_area").childElementCount;
    var delete_flag = ''
    var row = 0;
    for (var c = 0; c < count; c++) {
        var search_row = row + 1;
        try {
            var meta_id = document.getElementById("chat_area").children[search_row].id;
            if (find_id == meta_id) {
                var delete_flag = 'delete';//指定のID以降のメッセージは削除する
            }
        } catch (e) { }
        if (delete_flag == 'delete') {
            document.getElementById("chat_area").children[row].remove();
            row -= 1;
        }
        //console.log(meta_id)

        row += 1;
    }




    document.getElementById(id).remove();








    var now_chat_num = document.getElementById("now_question_number").value;
    var now_chat_num = Number(now_chat_num);

    var count = document.getElementById("list1").childElementCount;
    for (var c = 0; c < count; c++) {
        var meta_data = document.getElementById("list1").children[c].textContent;
        var meta_list = meta_data.split('＆＄');

        var message_id = meta_list[0];//メッセージID
        if(id == message_id){
            var now_chat_num = c;
            break;
        }
    }//for
    document.getElementById("now_question_number").value = now_chat_num;
    next_chat_go();


    skip_mode_on();

}