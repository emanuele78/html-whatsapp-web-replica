var whatsappController = {
  initializeController: function() {
    this.attachHandlers();
  },
  //metodo che collega i listener
  attachHandlers: function() {
    //closure
    var thisObject = this;
    //handler per keyup su campo testo messaggio utente
    $(".input_message").keyup(function(event) {
      if ($(this).val().length > 0) {
        $(".message_send").show();
        $(".message_record").hide();
        if (event.keyCode == 13) {
          //premuto tasto invio
          thisObject.sendMessage();
        }
      } else {
        $(".message_record").show();
        $(".message_send").hide();
      }
    });
    //handler per il click sull'icona invio messaggio
    $(".message_send").click(function() {
      thisObject.sendMessage();
    });
  },
  //metodo che invia un nuovo messaggio
  sendMessage: function() {
    //ottengo messaggio dell'utente
    var messageObject = this.createMessage();
    //clono il template per il messaggio
    var newMessageElement = $(".messages_templates .message_me_template").clone();
    //imposto il testo del messaggio
    newMessageElement.find(".message_text").text(messageObject.messageContent);
    //inserisco il messaggio all'interno del container
    $(".messages_wrapper").append(newMessageElement);
  },
  //metodo che restituisce un oggetto messaggio
  createMessage: function() {
    var message = {
      messageTimestamp: new Date(),
      messageContent: $(".input_message").val(),
      isMyMessage: true
    }
    return message;
  }
}

$(document).ready(function() {
  whatsappController.initializeController();
});

// var thread = {
//   threadWith: undefined,
//   threadData: [],
//   threadLastActivity: undefined,
//   threadLastMessageChunk: undefined
// }
//
// var threads = {
//   threadsData: undefined
// }