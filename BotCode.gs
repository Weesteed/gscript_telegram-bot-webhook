function doPost(e) {
  var API_TOKEN = 'your_key';
  
  var update = JSON.parse(e.postData.contents);

  // Make sure this is update is a type message
  if (update.hasOwnProperty('message')) {
    var msg = update.message;
    var chatId = msg.chat.id;

    // Make sure the update is a command.
    if (msg.hasOwnProperty('entities') && msg.entities[0].type == 'bot_command') {

      if (msg.text == '/start')  {
         var payload = {
          'method': 'sendMessage',
          'chat_id': String(chatId),
          'text': 'Наберите /quote и получите цитату!',
          'parse_mode': 'HTML'
        }

        var data = {
          "method": "post",
          "payload": payload
        }

        // Replace with your token
        
        UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
      }
      
      // If the user sends the /quote command
      if (msg.text == '/quote') {
        var url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
        var data = UrlFetchApp.fetch(url);
        var posts = JSON.parse(data);
        var post = posts.shift();
        
        // Delete the html tags and \n (newline)
        var cleanContent = post.content.replace(/<(?:.|\n)*?>/gm, "").replace(/\n/gm, "");
        
        // Format the quote
        var quote = '"' + cleanContent + '"\n — <strong>' + post.title + '</strong>';

        var payload = {
          'method': 'sendMessage',
          'chat_id': String(chatId),
          'text': quote,
          'parse_mode': 'HTML'
        }

        var data = {
          "method": "post",
          "payload": payload
        }

        // Replace with your token
        
        UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
      }
    }
  }
}
