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
      thisObject.handleAnimationOnInputMessage.call(thisObject, event);
    });
    //handler per il click sull'icona invio messaggio
    $(".message_send").click(function() {
      thisObject.sendMessage();
    });
    //handler per il click sul menu contestuale del messaggio
    $(".message_option").click(function() {
      $(".message_option_menu").slideToggle(200);
    });
    //handler generico di chiusura elementi
    $(document.body).click(function(e) {
      var myElement = $(".message_option_menu_wrapper");
      var contextMenuShowed = $(".message_option_menu").is(":visible");
      var clickedOutsideMenu = !$.contains(myElement[0], e.target);
      var target = $(e.target);
      if (!target.hasClass("message_option_arrow")) {
        if (contextMenuShowed && clickedOutsideMenu) {
          $(".message_option_menu").slideToggle(200);
        }
      }
    });
  },
  //metodo che gestisce le azimazioni sull'input message (microfono che si trasforma in freccia)
  handleAnimationOnInputMessage: function(keyevent) {
    if ($(".input_message").val().length > 0) {
      $(".message_send").show();
      $(".message_record").hide();
      if (keyevent.keyCode == 13) {
        //premuto tasto invio
        this.sendMessage();
      }
    } else {
      $(".message_record").show();
      $(".message_send").hide();
    }
  },
  //metodo che invia un nuovo messaggio
  sendMessage: function() {
    //ottengo messaggio dell'utente
    var messageObject = this.createMessage();
    //clono il template per il messaggio
    var newMessageElement = $(".messages_templates .message_me_template").clone();
    //imposto il testo e l'ora del messaggio
    newMessageElement.find(".message_text").text(messageObject.messageContent);
    newMessageElement.find(".message_timestamp>span").text(this.getHoursMinutes(messageObject.messageTimestamp));
    //inserisco il messaggio all'interno del container
    $(".messages_wrapper").append(newMessageElement);
    //cancello input text
    $(".input_message").val("");
    //effettuo scrolling
    $(".message_content").scrollTop($(".message_content")[0].scrollHeight);
  },
  //metodo che restituisce una stringa hh:mm da un oggetto data
  getHoursMinutes: function(dateObject) {
    var messageTime = dateObject.getHours().length == 1 ? "0" + dateObject.getHours().toString() :
      dateObject.getHours().toString();
    messageTime += ":" + (dateObject.getMinutes().length == 1 ? "0" + dateObject.getMinutes().toString() : dateObject.getMinutes().toString());
    return messageTime;
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