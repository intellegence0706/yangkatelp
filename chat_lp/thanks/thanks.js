

function thanks_page(){
        document.getElementById("overlay1").style.display = 'none';
        document.getElementById("loading_overlay1").style.display = 'flex';


        document.getElementById("main_load_overlay1").style.display = 'flex';
        document.getElementById("main_load_overlay1_message_area").innerHTML = ''
            + '処理中...<br>'
            + '<span class="important">ページを閉じずに</span>お待ちください..';

        get_thanks_data();
    }
    
    
    /***************************************************************************************************/
    function get_thanks_data() {    
        // 送信するJSON
        var data =   {
          "api_request" : "get_question_data",//APIリクエスト内容
          "question_name" : "thanks",
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
            get_thanks_data2(json)
        });
        
      }
      
      function get_thanks_data2(json) {
      
      document.getElementById('list1').innerHTML = '';   
      var list = document.getElementById('list1');
      for (var b = 0; b < json.question_data.length; b ++) {
      
      if(json.question_data[b] == undefined){
      continue;
      }
      var data_value = json.question_data[b]['value']
      
      var option = document.createElement('li');
      option.innerHTML = data_value;
      list.appendChild(option);
      
      }//FOR終了
      
      thanks_chat_start2()
      }
    /***************************************************************************************************/
      
    function thanks_chat_start2(){    

        document.getElementById("main_load_overlay1").style.display = 'none';
        document.getElementById("loading_overlay1").style.display = 'none';
        document.getElementById("chat_area").style.display = 'block';
    
        next_chat_go()
    
    }
      
      
    