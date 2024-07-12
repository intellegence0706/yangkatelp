function chat_speed_change(){
    var chat_speed_quick = document.getElementById("chat_speed_quick").value;
    var chat_speed_quick = Number(chat_speed_quick);
    var chat_speed_quick_ary = [0.5,1,2,3,4];

    var chat_speed_quick_num = chat_speed_quick_ary.indexOf(chat_speed_quick);
    var max_chat_speed_quick_ary = chat_speed_quick_ary.length -1;

    if(chat_speed_quick_num == max_chat_speed_quick_ary){
        var next_num = 0;
    }else{
        var next_num = chat_speed_quick_num + 1;
    }
    var next_speed = chat_speed_quick_ary[next_num];
    document.getElementById("chat_speed_quick").value = next_speed;

    var next_speed_word_length = String(next_speed).length;

    if(next_speed_word_length == 1){
        document.getElementById("chat_speed_change_btn").innerHTML = ''
        + '<i class="material-icons">fast_forward</i>' + next_speed + 'x';
    }else{
        document.getElementById("chat_speed_change_btn").innerHTML = ''
        + next_speed + 'x';
    }

   




    var change_ary = ['mymessage_delay1','answer_delay1','answer_delay2','answer_delay3','plugin_delay1','kidoku_delay1'];
    for (var b = 0; b < change_ary.length; b ++) {
        var value = document.getElementById(change_ary[b]).value;
        var default_value = value * chat_speed_quick;
        var next_value = default_value / next_speed;
        document.getElementById(change_ary[b]).value = next_value;
    }


}