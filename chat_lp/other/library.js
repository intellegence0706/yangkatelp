/**************************************************************************************/
/*********************** 配列格納したLISTをID付与で持ってくる関数　**************************/
function api_get_end_data(data_base,search_word){

    if(search_word == ""){
    var search_word = "｜"
    }
    
    var searchResult_A = [];
        $(data_base + ' li').each(function() {
          var targetText = $(this).text();
          if (targetText.indexOf(search_word) != -1) {
            searchResult_A.push(targetText);
          }
        });
    
    if(search_word == "｜"){
    return searchResult_A;
    }
    
    
    
    var ResultData_A = searchResult_A[0].split('｜');
    
    return ResultData_A;
    }
    
  
  
  
  
  
  
  function api_get_data2(data_base,search_word){
  
    if(search_word == ""){
    var search_word = "＊"
    }
    
    var searchResult_A = [];
        $(data_base + ' li').each(function() {
          var targetText = $(this).text();
          if (targetText.indexOf(search_word) != -1) {
            searchResult_A.push(targetText);
          }
        });
    
    if(search_word == "＊"){
    return searchResult_A;
    }
    
    
    
    var ResultData_A = searchResult_A[0].split('＊');
    
    return ResultData_A;
    }
    
  
  
  
  
  
  

  
  
  function api_get_end_data2_plus(data_base,search_word){
  
    var searchResult_A = [];
        $(data_base + ' li').each(function() {
          var targetText = $(this).text();
          if (targetText.indexOf(search_word) != -1) {
            searchResult_A.push(targetText);
          }
        });
    
  
    
    var ResultData_A = searchResult_A[0];
    
    return ResultData_A;
    }
    



    function api_get_end_data2_plus_all(data_base,search_word){
  
      var searchResult_A = [];
          $(data_base + ' li').each(function() {
            var targetText = $(this).text();
            if (targetText.indexOf(search_word) != -1) {
              searchResult_A.push(targetText);
            }
          });
      
      
      return searchResult_A;
      }
      
  

      



  
  function api_get_data2_all_ary(data_base,search_word){
  
    if(search_word == ""){
    var search_word = "＊"
    }
    
    var searchResult_A = [];
        $(data_base + ' li').each(function() {
          var targetText = $(this).text();
          if (targetText.indexOf(search_word) != -1) {
            searchResult_A.push(targetText);
          }
        });
    
    if(search_word == "＊"){
    return searchResult_A;
    }

    var reslt_ary = []
    for (var x = 0; x < searchResult_A.length; x ++) {
      var ResultData = searchResult_A[x].split('＊');
      reslt_ary.push(ResultData)
    }
    
    
    

    
    return reslt_ary;
    }




  
    function api_get_data2_all_ary2(data_base,search_word){
  
      if(search_word == ""){
      var search_word = "＊"
      }
      
      var searchResult_A = [];
          $(data_base + ' li').each(function() {
            var targetText = $(this).text();
            if (targetText.indexOf(search_word) != -1) {
              searchResult_A.push(targetText);
            }
          });
      

  
      var reslt_ary = []
      for (var x = 0; x < searchResult_A.length; x ++) {
        var ResultData = searchResult_A[x].split('＊');
        reslt_ary.push(ResultData)
      }
      
      
      
  
      
      return reslt_ary;
      }
  
  

  
  function api_get_data2_all_text(data_base,search_word){
  
    if(search_word == ""){
    var search_word = "＊"
    }
    
    var searchResult_A = [];
        $(data_base + ' li').each(function() {
          var targetText = $(this).text();
          if (targetText.indexOf(search_word) != -1) {
            searchResult_A.push(targetText);
          }
        });
    
    if(search_word == "＊"){
    return searchResult_A;
    }

    var reslt_ary = ''
    for (var x = 0; x < searchResult_A.length; x ++) {
      reslt_ary += searchResult_A[x];
    }
    
    
    

    
    return reslt_ary;
    }
    
/**************************************************************************************/
/*********************** 配列格納したLISTをID付与で持ってくる関数　**************************/
  
  
  
  
  
  






/**************************************************************************************/
/*********************** 配列格納したLISTをID付与で持ってくる関数　**************************/








  
  
   
  
  
  /******************************************************************************************************************************************/
  /************************************市区町村　の　検索履歴　　　　　　　　　　　　**********************************************/
  /******************************************************************************************************************************************/
  
  
  function get_pref_search_history(){
  var hiden_pref_search_history = localStorage.getItem('hiden_pref_search_history');
  var hiden_city_search_history = localStorage.getItem('hiden_city_search_history');
  
  if(hiden_pref_search_history != null){
  document.getElementById( "hiden_pref_search_history" ).value = hiden_pref_search_history;
  }
  if(hiden_city_search_history != null){
      document.getElementById( "hiden_city_search_history" ).value = hiden_city_search_history;
  }
  
  }
  
  
  
  function add_pref_search_history(type,data){
  var old_history = document.getElementById( type ).value
  var save_data = data + '｜';
  var delete_data = old_history.replace(save_data, '')
  var new_data = save_data + delete_data;
  document.getElementById( type ).value = new_data;
  localStorage.setItem(type, new_data);
  
  }
  
  
  function view_pref_search_history(type){
      var old_history = document.getElementById( type ).value;
      if(old_history != ''){
      var list = old_history.split('｜');
      }else{
      var list = "";
      }
      
  return list;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  /************************** 検索履歴のサーバー送信 ******************************* */
  
  function save_search_history_send_Server() {
  
      var hiden_user_lat = document.getElementById('hiden_user_lat').value;
      var hiden_user_lng = document.getElementById('hiden_user_lng').value;
      var hiden_search_latlng_name = document.getElementById('hiden_search_latlng_name').value;
      var sql_search_key = document.getElementById('hiden_sql_search_key').value;
  
      var search_word = document.getElementById('search_text8822929').value;
  
      var hiden_user_id = document.getElementById('hiden_user_id').value;
      var hiden_client_id = document.getElementById('hiden_client_id').value;
  
      var latlng = hiden_user_lat + ',' + hiden_user_lng;
  
  
  
  
  
      // 送信するJSON
      let data =   {
        "api_request" : "save_search_history",//APIリクエスト内容
        "user_id" : hiden_user_id,//APIリクエスト内容
        "client_code" :hiden_client_id,//APIリクエスト内容
        "search_type" : hiden_search_latlng_name,//APIリクエスト内容
        "latlng" : latlng,//APIリクエスト内容
        "search_word" : search_word,//APIリクエスト内容
        "filter" : sql_search_key,//APIリクエスト内容
      };
    
    // Fetch APIでデータ送信
    fetch('https://script.google.com/macros/s/AKfycbyNNfR1vdPm_nPZy4pagtjA_5M761Wgaxn5UiieyWY_2topngDheN5Pj-zc4hh1GCa_/exec', {　 // 送信先URL
     method: 'post', // 通信メソッド
     header: {
       'Content-Type': 'application/json' // JSON形式のデータのヘッダー
     },
     body: JSON.stringify(data) // JSON形式のデータ
    })
    
    .then(function(response) {
        return response.json();
      }).then(function(json) {
          save_search_history_send_Server2(json)
      });
      
    }
    
    function save_search_history_send_Server2(json) {
  console.log(json)
    
    
    
    }
    
    /************************** 検索履歴のサーバー送信 ******************************* */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /************************** サーバーからデータを取得 ******************************* */
  function connect_server(return_data){
  var hiden_user_id = document.getElementById('hiden_user_id').value;
  
  
    // 送信するJSON
    let data =   {
      "api_request" : "Get_save_data",//APIリクエスト内容
      "user_id" : hiden_user_id,
    };
  
  // Fetch APIでデータ送信
  fetch('https://script.google.com/macros/s/AKfycbyNNfR1vdPm_nPZy4pagtjA_5M761Wgaxn5UiieyWY_2topngDheN5Pj-zc4hh1GCa_/exec', {　 // 送信先URL
   method: 'post', // 通信メソッド
   header: {
     'Content-Type': 'application/json' // JSON形式のデータのヘッダー
   },
   body: JSON.stringify(data) // JSON形式のデータ
  })
  
  .then(function(response) {
      return response.json();
    }).then(function(json) {
      connect_server2(json,return_data)
    });
    
  }
  
  
  
  
  
  
  function connect_server2(json,return_data){
  
      for (var b = 0; b < 300; b ++) {
      if(json.user_save_data[b] == undefined){
      continue;
      }
      var data_lavel = json.user_save_data[b]['label'];
      var data_value = json.user_save_data[b]['value'];
  
      if(data_lavel == ""){
      continue;
      }
  
      var ram_save_id = "hidden_server_" + data_lavel;
      var save_check = document.getElementById(ram_save_id) != null;
  
      if(save_check == false){
          var newElement = document.createElement("input"); // p要素作成
          newElement.setAttribute("id",ram_save_id); // p要素にidを設定
          var parentDiv = document.getElementById("hiddenbar");
          parentDiv.insertBefore(newElement, parentDiv.firstChild);
      }
  
      document.getElementById( ram_save_id ).value = data_value;
  
      }//FOR終了
      
  
      if(return_data != undefined){
          data_Synchronize3(return_data)
      }
      
  return "done";
  }
  /************************** サーバーからデータを取得 ******************************* */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /************************** ローカルメモリに保存 ******************************* */
  function save_local_memory_ram(local_memory_id,save_data){
    //hiddenbar（RAM）に記録するシステム。上書きなので既に保存データがある場合は注意。
    //他利用、応用も可能。ローカルストレージとは無関係。要素がない場合は自動で作成。
      var local_memory_check = document.getElementById(local_memory_id) != null;
  
      if(local_memory_check == false){
          var newElement = document.createElement("input"); // p要素作成
          newElement.setAttribute("id",local_memory_id); // p要素にidを設定
          var parentDiv = document.getElementById("hiddenbar");
          parentDiv.insertBefore(newElement, parentDiv.firstChild);
      }
  
      document.getElementById( local_memory_id ).value = save_data;
  
  
  return 'done'  
  }
  
  
  
  
  
  /************************** ローカルメモリに保存 ******************************* */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //ローカルストレージにデータがある場合は、こちらが最新。これをメモリとサーバーに上げて終了
  //ない場合は、サーバーのデータを取得。これをメモリとローカスストレージに保存して終了
  
  
  /************************** データの同期作業  ******************************* */
  function data_Synchronize1(){
  
      // 送信するJSON
      let data =   {
        "api_request" : "get_column_list"//APIリクエスト内容
      };
    
    // Fetch APIでデータ送信
    fetch('https://script.google.com/macros/s/AKfycbyNNfR1vdPm_nPZy4pagtjA_5M761Wgaxn5UiieyWY_2topngDheN5Pj-zc4hh1GCa_/exec', {　 // 送信先URL
     method: 'post', // 通信メソッド
     header: {
       'Content-Type': 'application/json' // JSON形式のデータのヘッダー
     },
     body: JSON.stringify(data) // JSON形式のデータ
    })
    
    .then(function(response) {
        return response.json();
      }).then(function(json) {
        data_Synchronize2(json)
      });
      
    }
    
    
    
    function data_Synchronize2(json){
    var new_column_list = [];
        for (var b = 0; b < 300; b ++) {
            if(json.column_list[b] == undefined){
            continue;
            }
            var column_list_value = json.column_list[b]['value'];
            if(column_list_value == ''){
            continue;
            }
            new_column_list.push(column_list_value);
        }
        
        connect_server(new_column_list)
    }
    
    
    
    //ローカルストレージにデータがある場合は、こちらが最新。これをメモリとサーバーに上げて終了
    //ない場合は、サーバーのデータを取得。これをメモリとローカスストレージに保存して終了
    
    function data_Synchronize3(new_column_list){
    
    for(var i = 0; i < new_column_list.length; i++) {
        var get_local = localStorage.getItem(new_column_list[i]);
        if(get_local == null) {//LSにない＝サーバーが最新ケース
        var ram_save_id = "hidden_server_" + new_column_list[i];
        var server_data = document.getElementById(ram_save_id).value;
        localStorage.setItem(new_column_list[i], server_data);
        save_local_memory_ram(new_column_list[i],server_data)
        }else{
          save_local_memory_ram(new_column_list[i],get_local)
        }
    
    
    
    }//FOR
    
    
    data_Synchronize4(new_column_list)
    }
  
  
  
    function data_Synchronize4(new_column_list){
  
      var add_data = {
          "api_request" : "save_data",
          "user_save_data": []
      }
  
        
  
  
      for(var i = 0; i < new_column_list.length; i++) {
          var ram_data = document.getElementById(new_column_list[i]).value;
          var new_data = { "label" : new_column_list[i], "value" : ram_data };
          add_data["user_save_data"].push(new_data);
      }//FOR
  
          
          // Fetch APIでデータ送信
          fetch('https://script.google.com/macros/s/AKfycbyNNfR1vdPm_nPZy4pagtjA_5M761Wgaxn5UiieyWY_2topngDheN5Pj-zc4hh1GCa_/exec', {　 // 送信先URL
           method: 'post', // 通信メソッド
           header: {
             'Content-Type': 'application/json' // JSON形式のデータのヘッダー
           },
           body: JSON.stringify(add_data) // JSON形式のデータ
          })
          
          .then(function(response) {
              return response.json();
            }).then(function(json) {
              data_Synchronize5(json)
            });
            
          }
    
          
  
    function data_Synchronize5(json){
      console.log(json)
    }
  
  
    
    
    /************************** データの同期作業  ******************************* */
    
    
    
    
    
    
    
    
    
    
    
  
  
  
  
  
  
  
      /************************** 各種データのコンソール保存 ******************************* */
  
  
  //データを追加する。キーと、追加したい配列を付与する。
  function quick_add_data(key_name,add_data){
  var delete_try = quick_data_save_delete(key_name,add_data);
  
  var old_data = document.getElementById(key_name).value;
  var add_data2 = add_data + '｜';
  
  var add_do = add_data2 + old_data;
  var reslt = quick_save_do(key_name,add_do)
  
  return reslt;
  }
  
  
  
  
  
  //データを消す。キーと、消したい配列（完全一致）を付与する。
  function quick_data_save_delete(key_name,delete_data){
  
      var active_check = quick_data_check(key_name,delete_data);
      if(active_check != 'yes'){
      return 'error';
      }
  
      var old_data = document.getElementById(key_name).value;
      var delete_data2 = delete_data + '｜';
  
      var delete_do = old_data.replace(delete_data2, '')
      var reslt = quick_save_do(key_name,delete_do)
  
  return reslt;
  }
  
  
  
  //*＊外部から叩かないこと*＊　本体メモリとRAM両方に書き込む便利スクリプト。上書きされるので、他のライブラリと併用
  function quick_save_do(key_name,save_data){
      localStorage.setItem(key_name, save_data);
      save_local_memory_ram(key_name,save_data)
      return 'done'
  }
  
  
  //保存したデータのキーを指定して、特定のデータが保存されてるかチェック。完全一致。
  function quick_data_check(key_name,check_data){
  
      var local_memory_check = document.getElementById(key_name) != null;
      if(local_memory_check == false){
          return 'unknown';
      }
      var old_data = document.getElementById(key_name).value;
      var list = old_data.split('｜');
      var check_reslt = "no"
      for (var l = 0; l < list.length; l ++) {
          if(list[l] == check_data){
              var check_reslt = "yes"
              break;
          }
  
      }
  
      return check_reslt;
  }
  
  
  
  
  //保存したデータのキーを指定して、特定の文言が保存されてるかチェック（例：ブックマーク）　部分一致で良い
  function quick_data_check_line_search(key_name,search){
  
    var local_memory_check = document.getElementById(key_name) != null;
    if(local_memory_check == false){
        return 'unknown';
    }
    var old_data = document.getElementById(key_name).value;
    var list = old_data.split('｜');
    var check_reslt = "no"
    for (var l = 0; l < list.length; l ++) {
  
      var reg = new RegExp(search);
      if (list[l].match(reg)) {
            var check_reslt = list[l]
            break;
        }
  
    }
  
    return check_reslt;
  }
  
  
  
  
  
  
  
  //保存したデータのキーを指定して、配列で全データを受信
  function quick_data_view_list(key_name){
  
      var local_memory_check = document.getElementById(key_name) != null;
      if(local_memory_check == false){
          return 'unknown';
      }
      var old_data = document.getElementById(key_name).value;
      var list = old_data.split('｜');
  
      return list;
  }
  
  
  
  
  //保存したデータのキーを指定して、そのままのデータで受信
  function quick_data_view_list2(key_name){
  
    var local_memory_check = document.getElementById(key_name) != null;
    if(local_memory_check == false){
        return 'unknown';
    }
    var old_data = document.getElementById(key_name).value;
  
    return old_data;
  }
  
  
  
  
  
  
  
  
    // UTCのDateからJSTのDateを取得します。
function getJstDate(dateObj) {
  // getTimezoneOffset()はUTCとの差(UTC - JST)を分単位で取得できます。
  // 60 * 1000でミリ秒に変換します。
  var offset = new Date().getTimezoneOffset() * 60 * 1000;
  // getTime()はUTC現在時間のミリ秒
  var date = new Date(dateObj.getTime() - offset);
  return date;
}



































/******************************** ハッシュタグのスクリプト（Tagify）********************************/   
function start_hashtag(){

  var input = document.querySelector('input[name=tags]'),
      // init Tagify script on the above inputs
      tagify = new Tagify(input, {
          whitelist : ["",""],
          blacklist : ["react", "angular"]
      });
  
  
  
  
  
  // "remove all tags" button event listener
  //document.querySelector('.tags--removeAllBtn')
  //    .addEventListener('click', tagify.removeAllTags.bind(tagify))
  
  // Chainable event listeners
  tagify.on('add', onAddTag)
        .on('remove', onRemoveTag)
        .on('invalid', onInvalidTag);
        
        
   }
  
  // tag added callback
  function onAddTag(e){

    console.log(e.detail.data.value)

    var pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    if (pattern.test(e.detail.data.value)) {
    }else{
    
      open_sound_SUB10();
      var greet = document.getElementById('popup_main_content_SUB10')
      greet.innerHTML = ''
          + '<div align="center">'
          + '<div class="rich_text_eriter_close_btn" id="rich_text_eriter_close_btn" onclick="close_sound_SUB10();"><i class="material-icons">close</i></div>'
          + '<img class="popup_main_content_SUB7_img" src="symbol018.png" >'
          + '<div class="popup_main_content_SUB7_title01" >無効なメールアドレス</div>'
          + '<div class="popup_main_content_SUB7_body01" >' + e.detail.data.value + 'は<font color="red"><b>無効なメールアドレスです。</b>他のメールアドレスを入力してください</font>'
          + '<div class="popup_main_content_SUB7_btn_area01" >'
          + '<div class="popup_main_content_SUB7_btn02" onclick="close_sound_SUB10();" >とじる</div>'
          + '</div>'
          + '</div>';
          document.getElementById("add_data_keyword").focus();
          return;


    }


    
    //  console.log(e, e.detail);
    //  console.log( tagify.DOM.originalInput.value )
     // tagify.off('add', onAddTag) // exmaple of removing a custom Tagify event
  }
  
  // tag remvoed callback
  function onRemoveTag(e){
      console.log(e, e.detail);
  }
  
  // invalid tag added callback
  function onInvalidTag(e){
      console.log(e, e.detail);
  }
  
  /******************************** ハッシュタグのスクリプト********************************/   





        
  function copyTouser(text) {

    var save_check = document.getElementById('copyTouser') != null;

    if(save_check == false){
        var newElement = document.createElement("textarea"); // p要素作成
        newElement.setAttribute("id",'copyTouser'); // p要素にidを設定
        var parentDiv = document.getElementById("hiddenbar");
        parentDiv.insertBefore(newElement, parentDiv.firstChild);
    }


    document.getElementById( "copyTouser" ).value = text ;
      var copyTarget = document.getElementById("copyTouser");
      copyTarget.select();
      document.execCommand("Copy");

 
  toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "10000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

 toastr["info"]("コピーしました！", "完了");


var jsFrame = new JSFrame();
    jsFrame.showToast({
        html: 'コピーしました', align: 'center', duration: 3000
    });
 
        }
        
        





        
  function copyTouser2(id) {

    var text = document.getElementById('9932001121232221144').value
    copyTouser(text)


    return
 
        }
        
        
         



        function Start_time_stamp() {
          var now = new Date();
          var month = now.getMonth()+1;
          var date = now.getDate()
          document.getElementById( "hiden_start_time" ).value = month+'/'+ date;
          }

          

          function update_checking2() {
            var now = new Date();
            var month = now.getMonth()+1;
            var date = now.getDate()
            var now_date = month+'/'+ date;
            
            var Start_time_stamp = document.getElementById('hiden_start_time').value;
            
            if(Start_time_stamp == now_date){
            return; 
            }else{
              maintenance_mode()
            }
            
            }






            function jump_bottom(){
              var el = document.getElementById('fixed-box-yoko-tate_s');
              el.scrollTo(0, el.scrollHeight);
            }

            function search_delete(){
              document.getElementById( "search_text8822929" ).value = '';
              document.getElementById("search_text8822929").focus();
              end_search_on2()
            }





function open_pin_status_bar(){
  //document.getElementById("pin_status_bar").style.display = "block";
   document.getElementById("pin_status_check").checked = true;
  }
  
  function close_pin_status_bar(){
  //document.getElementById("pin_status_bar").style.display = "none";
   document.getElementById("pin_status_check").checked = false;
  }


  function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



function url_check(){
  var url = window.location.href;
  var url2 = url.split('url=');
  var url3 = url2[1];
  console.log(url3);
  if(url3 == undefined){
    return "";
  }
  return url3;
  //http://127.0.0.1:5500/index.html?url=https://manage.gaiheki.support/orders?page=1&order=request_datetime_desc&_order_statuses=1,2
}



//order、client
function url_type_check(){
  var url = url_check();
  if(url.match(/orders/)){
    return 'order';
  }
  return 'client';
}



function date_yyyy(minus){
    //今日の日時を表示
              var date = new Date()
              var day = date.getDate();
              date.setDate(day - minus);// 7日前にする

              var year = date.getFullYear()
              var month = date.getMonth() + 1
              var day = date.getDate();
            
              var toTwoDigits = function (num, digit) {
                num += ''
                if (num.length < digit) {
                  num = '0' + num
                }
                return num
              }
              
              var yyyy = toTwoDigits(year, 4)
              var mm = toTwoDigits(month, 2)
              var dd = toTwoDigits(day, 2)
              var ymd = yyyy + "/" + mm + "/" + dd;
  return ymd;
  }


  function date_mm_dd(minus){
    //今日の日時を表示
              var date = new Date()
              var day = date.getDate();
              date.setDate(day - minus);// 7日前にする

              var year = date.getFullYear()
              var month = date.getMonth() + 1
              var day = date.getDate();

            
              var toTwoDigits = function (num, digit) {
                num += ''
                if (num.length < digit) {
                  num = '0' + num
                }
                return num
              }
              
              var mm = toTwoDigits(month, 2)
              var dd = toTwoDigits(day, 2)
              var ymd = mm + "/" + dd;
  return ymd;
  }



  function date_mm_dd_y(minus){
    //今日の日時を表示
              var date = new Date()
              var day = date.getDate();
              date.setDate(day - minus);// 7日前にする

              var year = date.getFullYear()
              var month = date.getMonth() + 1
              var day = date.getDate();
              var dayOfWeek = date.getDay() ;	// 曜日(数値)
              var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;	// 曜日(日本語表記)

            
              var toTwoDigits = function (num, digit) {
                num += ''
                if (num.length < digit) {
                  num = '0' + num
                }
                return num
              }
              
              var mm = toTwoDigits(month, 2)
              var dd = toTwoDigits(day, 2)
              var ymd = mm + "/<b>" + dd + '</b>';
  return ymd;
  }





  function date_youbi(minus){
    //今日の日時を表示
              var date = new Date()
              var day = date.getDate();
              date.setDate(day - minus);// 7日前にする

              var year = date.getFullYear()
              var month = date.getMonth() + 1
              var day = date.getDate();
              var dayOfWeek = date.getDay() ;	// 曜日(数値)
              var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;	// 曜日(日本語表記)


  return dayOfWeekStr;
  }




  var uniqueId = function(digits) {
	var strong = typeof digits !== 'undefined' ? digits : 1000;
	return Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16);
};


function uniqueId(){
  var strong = typeof digits !== 'undefined' ? digits : 1000;
	return Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16);
}



function uniqueId2(){
  var strong = typeof digits !== 'undefined' ? digits : 1000;
	return Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16);
}






function hankaku2Zenkaku(str) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}



function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '/' + m + '/' + d);
}



function noify_add(){

  push_do('通知テスト👋','このようにプッシュ通知されます。')
}


function push_do(title,msg){
  Push.Permission.request();
  Push.create(title, {
      body: msg,
      icon: 'https://iseki.app/doors/client/cs/01410.png',
      timeout: 20000, // 通知が消えるタイミング
      vibrate: [100, 100, 100], // モバイル端末でのバイブレーション秒数
      onClick: function() {
          // 通知がクリックされた場合の設定
          console.log(this);
window.focus(); 
this.close();
}
});
}










//現在スタックされているデータをCSVに変換してダウンロードする
function create_csv(data){


  console.log(data);

  //作った二次元配列をCSV文字列に直す。
  let csv_string  = ""; 
  for (let d of data) {
      csv_string += d.join(",");
      csv_string += '\r\n';
  }   

  //ファイル名の指定
  let file_name   = "csv_data.csv";
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

  //CSVのバイナリデータを作る
  let blob        = new Blob([bom,csv_string], {type: "text/csv"});
  let uri         = URL.createObjectURL(blob);

  //リンクタグを作る
  let link        = document.createElement("a");
  link.download   = file_name;
  link.href       = uri;

  //作ったリンクタグをクリックさせる
  document.body.appendChild(link);
  link.click();

  //クリックしたら即リンクタグを消す
  document.body.removeChild(link);
  delete link;

  return uri;
}




function bokashi_reset(){
  $('.right_card').css('-ms-filter', 'blur(6px)');
  $('.right_card').css('filter', 'blur(6px)');
  $('.left_card').css('-ms-filter', 'blur(6px)');
  $('.left_card').css('filter', 'blur(6px)');
  $('.center_card').css('-ms-filter', 'blur(6px)');
  $('.center_card').css('filter', 'blur(6px)');
}






function time_count_on(datetime){
  var from_t = new Date(datetime);

  // 現在時刻との差分＝経過時間
  var diff = new Date().getTime() - from_t.getTime();
  // 経過時間をDateに変換
  var elapsed = new Date(diff);

  // 大きい単位から順に表示
  if (elapsed.getUTCFullYear() - 1970) {
    return elapsed.getUTCFullYear() - 1970 + '年前';
  } else if (elapsed.getUTCMonth()) {
    return elapsed.getUTCMonth() + 'ヶ月前';
  } else if (elapsed.getUTCDate() - 1) {
    return elapsed.getUTCDate() - 1 + '日前';
  } else if (elapsed.getUTCHours()) {
    return elapsed.getUTCHours() + '時間前';
  } else if (elapsed.getUTCMinutes()) {
    return elapsed.getUTCMinutes() + '分前';
  } else {
    //return elapsed.getUTCSeconds() + 'たった今';
    return 'たった今';
  }


}






function time_count_on2(datetime){
  var from_t = new Date(datetime);

  // 現在時刻との差分＝経過時間
  var diff = new Date().getTime() - from_t.getTime();
  // 経過時間をDateに変換
  var elapsed = new Date(diff);

  // 大きい単位から順に表示
  if (elapsed.getUTCFullYear() - 1970) {
    return elapsed.getUTCFullYear() - 1970 + '年';
  } else if (elapsed.getUTCMonth()) {
    return elapsed.getUTCMonth() + 'ヶ月';
  } else if (elapsed.getUTCDate() - 1) {
    return elapsed.getUTCDate() - 1 + '日';
  } else if (elapsed.getUTCHours()) {
    return elapsed.getUTCHours() + '時間';
  } else if (elapsed.getUTCMinutes()) {
    return elapsed.getUTCMinutes() + '分';
  } else {
    return elapsed.getUTCSeconds() + '秒';
  }


}





function getNowYMDhmsStr(){
  const date = new Date()
  const Y = date.getFullYear()
  const M = ("00" + (date.getMonth()+1)).slice(-2)
  const D = ("00" + date.getDate()).slice(-2)
  const h = ("00" + date.getHours()).slice(-2)
  const m = ("00" + date.getMinutes()).slice(-2)
  const s = ("00" + date.getSeconds()).slice(-2)

  return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s
}


