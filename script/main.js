//solo per test
"use strict";
var whatsappController = {
  //metodo iniziale
  initializeController: function() {
    //inizializzo proprietà dell'oggetto che contiene una lista messaggi fake da dove pescare messaggi random
    this.initializeSampleMessage();
    //creo le conversazioni fake
    this.createFakeThreads();
    //carico le conversazioni
    this.loadThreads();
    //rimuovo splash screen
    this.discardSplashScreen();
    //collego gli handler
    this.attachHandlers();
  },
  //metodo che crea le conversazioni finte
  createFakeThreads: function() {
    //queste sono le conversazioni presenti, nell'array è memorizzato il nome del destinatario e la il nome dell'immagine
    var startedThreads = [{
        threadName: "Riccardo Silvi",
        threadImage: "t1.jpg"
      },
      {
        threadName: "Federica Stella",
        threadImage: "t2.jpg"
      },
      {
        threadName: "Gianluca Bianco",
        threadImage: "t3.jpg"
      },
      {
        threadName: "Chiara Passaro",
        threadImage: "t4.jpg"
      },
      {
        threadName: "Matteo Pelosi",
        threadImage: "t5.jpg"
      },
      {
        threadName: "Mario Rossi",
        threadImage: "t6.jpg"
      },
      {
        threadName: "Franco Franchi",
        threadImage: "t7.jpg"
      },
      {
        threadName: "Giorgio Trobbiani",
        threadImage: "t8.jpg"
      }
    ];
    //per ogni elemento dell'array creo una conversazione fittizia fatta da un numero random di scambio messaggi e la pusho nell'array stesso
    for (var i = 0; i < startedThreads.length; i++) {
      startedThreads[i].threadMessages = this.getFakeConversation(this.getIntRandomNumber(8, 20));
    }
    this.startedThreads = startedThreads;
    console.log(this.startedThreads);
  },
  //metodo che crea i messaggi della conversazione fake
  getFakeConversation: function(messagesCount) {
    var messages = [];
    var startDate = new Date(2018, 7, 10, 9, 10, 0, 0);
    for (var i = 0; i < messagesCount; i++) {
      //testa o croce per sapere di chi è il messaggio
      var myMessage = this.getIntRandomNumber(1, 2) % 2 == 0;
      //aggiungo un numero di minuti casuali alla data iniziale
      var addedMinutes = this.getIntRandomNumber(3600, 9000);
      startDate = this.increaseDate(startDate, addedMinutes);
      //ottengo una frase casuale dall'elenco
      var textMessage = this.sampleMessages[this.getIntRandomNumber(0, this.sampleMessages.length)];
      //creo oggetto messaggio e lo pusho nell'array
      messages.push(this.createMessage(startDate, textMessage, myMessage));
    }
    return messages;
  },
  //metodo che carica le conversazioni
  loadThreads: function() {
    var targetElement = $(".conversations_items");
    for (var i = 0; i < this.startedThreads.length; i++) {
      //conversazione corrente
      var threadObject = this.startedThreads[i];
      //template clonato
      var clonedElement = $(".conversations_items .template .conversation_item_template").clone();
      //imposto il nome della persona con cui si ha la conversazione
      clonedElement.find(".item_name").text(threadObject.threadName);
      //imposto l'immagine della persona
      clonedElement.find(".item_image img").attr("src", "assets/" + threadObject.threadImage);
      //imposto un chunck dell'ultima conversazione
      var lastMessage = threadObject.threadMessages[threadObject.threadMessages.length - 1];
      clonedElement.find(".item_message_part").text(lastMessage.messageContent);
      //imposto l'ora dell'ultima conversazione
      //se il timestamp dell'ultimo messaggio è di oggi, allora visualizzo l'ora altrimenti la data gg/mm/aaaa
      if (this.isTodayTheDate(lastMessage.messageTimestamp)) {
        clonedElement.find(".item_last_message").text(this.getHoursMinutes(lastMessage.messageTimestamp));
      } else {
        clonedElement.find(".item_last_message").text(this.getStringDate(lastMessage.messageTimestamp));
      }
      targetElement.append(clonedElement);
    }
  },
  //metodo che aumenta una certa data dei minuti passati
  increaseDate: function(dateObject, minuteToIncrease) {
    return new Date(dateObject.getTime() + minuteToIncrease * 60000);
  },
  //metodo che ritorna la data formattata giorno mese anno
  getStringDate: function(aDate) {
    var day = aDate.getDate().toString().length == 1 ? "0" + aDate.getDate().toString() : aDate.getDate().toString();
    var month = aDate.getMonth() + 1;
    month = month.toString().length == 1 ? "0" + month.toString() : month.toString();
    var year = aDate.getFullYear().toString();
    return day + "/" + month + "/" + year;
  },
  // questo metodo ritorna vero o falso a seconda che la data passata sia la data di oggi
  isTodayTheDate: function(aDate) {
    var tempDate = new Date(aDate.getTime());
    var todayDate = new Date();
    return tempDate.setHours(0, 0, 0, 0) == todayDate.setHours(0, 0, 0, 0);
  },
  //metodo che inizializza la proprietà sampleMessages dell'oggetto con un array di messaggio d'esempio (frasi celebri dei film)
  initializeSampleMessage: function() {
    var textMessages = [
      "Francamente me ne infischio",
      "Gli farò un'offerta che non potrà rifiutare.",
      "Ma non è questo. È questione di classe! Potevo diventare un campione. Potevo diventare qualcuno, invece di niente, come sono adesso.",
      "Toto, ho l'impressione che noi non siamo più nel Kansas.",
      "Alla tua salute, bambina.",
      "Coraggio... fatti ammazzare.",
      "Eccomi, De Mille, sono pronta per il mio primo piano.",
      "Che la Forza sia con te.",
      "Prendete il salvagente... Questa sera c'è aria di burrasca!",
      "Ma dici a me?",
      "Quello che abbiamo qui è un fallimento della comunicazione.",
      "Mi piace l'odore del napalm al mattino.",
      "Amare significa non dover mai dire mi spiace.",
      "La materia di cui sono fatti i sogni.",
      "Mi chiamano SIGNOR Tibbs!",
      "Rosabella",
      "Ce l'ho fatta, Ma'. Sono in cima al mondo!",
      "Louis, credo che questo sia l'inizio di una bella amicizia.",
      "Uno che faceva un censimento una volta tentò di interrogarmi. Mi mangiai il suo fegato con un bel piatto di fave ed un buon Chianti.",
      "Bond. James Bond.",
      "Nessun posto è bello come casa mia.",
      "Io sono ancora grande, è il cinema che è diventato piccolo.",
      "Coprimi di soldi!",
      "Perché non vieni su qualche volta e mi guardi?",
      "Suonala, Sam. Suona Mentre il tempo passa.",
      "Tu non puoi reggere la verità!",
      "Dopotutto, domani è un altro giorno.",
      "Ci serve una barca più grossa.",
      "Mamma diceva sempre: la vita è come a una scatola di cioccolatini, non sai mai quello che ti capita.",
      "Se lo costruisci, lui tornerà.",
      "Oggi, mi considero l'uomo più fortunato sulla faccia della terra.",
      "Noi rapiniamo banche.",
      "Vedo la gente morta.",
      "Oh, Jerry, non andiamo a chiedere la luna. Abbiamo le stelle.",
      "Beh, nessuno è perfetto.",
      "Houston, abbiamo un problema.",
      "Mi avevi già convinta al ciao.",
      "Non si piange nel baseball!"
    ];
    this.sampleMessages = textMessages;
  },
  //metodo di utilità generale
  getIntRandomNumber: function(min, max) {
    return Math.trunc(Math.random() * (max + 1 - min) + min);
  },
  //metodo che nasconde la splash screen
  discardSplashScreen: function() {
    //leggo il valore impostato nella proprietà animation-duration dello splash screen, quindi creo un timer che lo nasconda dopo il tempo impostato
    var duration = parseInt($(".splash_screen_loaded_bar").css("animation-duration"));
    setTimeout(function() {
      //nascondo lo splash screen che finge un caricamento
      $(".splash_screen").hide();
    }, duration * 1000);
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
    //handler per i click sugli elementi conversazione
    $(".conversation_item_template").click(function() {
      var threadIndex = $(this).index();
      // passo l'index 0-based
      thisObject.loadSingleThread.call(thisObject, --threadIndex);
    });
    //handler generico di chiusura elementi
    // $(document.body).click(function(e) {
    //   var myElement = $(".message_option_menu_wrapper");
    //   var contextMenuShowed = $(".message_option_menu").is(":visible");
    //   var clickedOutsideMenu = !$.contains(myElement[0], e.target);
    //   var target = $(e.target);
    //   if (!target.hasClass("message_option_arrow")) {
    //     if (contextMenuShowed && clickedOutsideMenu) {
    //       $(".message_option_menu").slideToggle(200);
    //     }
    //   }
    // });
  },
  //metodo che carica la conversazione scelta dall'utente. ThreadIndex è un valore con base 0 all'interno dell'array ma con base 1 per l'elemento all'interno del proprio container
  loadSingleThread: function(threadIndex) {
    //operazioni preliminari al caricamento della conversazione
    this.prepareForLoadSingleThread(threadIndex);
    // ottengo conversazione dall'array
    var threadToLoad = this.startedThreads[threadIndex];
    //caricamento delle info generali sulla conversazione (nome, ultimo accesso, foto)
    this.loadSingleThreadInfo(threadToLoad);
    //caricamento dei messaggi del thread
    var threadMessages = threadToLoad.threadMessages;
    for (var i = 0; i < threadMessages.length; i++) {
      this.loadSingleMessage(threadMessages[i]);
    }
    // TODO: cancellare il valore di unread message count
  },
  //metodo che prepara al caricamento dei messaggi per una conversazione scelta dall'utente
  prepareForLoadSingleThread: function(threadIndex) {
    //se la home screen è visualizzata devo nasconderla
    if ($(".message_home_screen").is(":visible")) {
      $(".message_home_screen").hide();
    }
    //cancello messaggi presenti
    $(".messages_wrapper > div").remove();
    //imposto background white per tutte le conversazioni
    $(".conversation_item_template").removeClass("active_item");
    //imposto background selezionato solo per la conversazione selezionata
    $(".conversation_item_template").eq(++threadIndex).addClass("active_item");
  },
  //metodo che carica le informazioni su una conversazione
  loadSingleThreadInfo: function(threadToLoad) {
    //ottengo la stringa "ultima accesso..." calcolata in modo casuale sul tempo attuale meno un numero random di minuti
    var lastSeen = "ultimo accesso oggi alle " + this.getLastAccess();
    //carico le info della conversazione sull'header (foto, nome, ultime accesso)
    $(".message_header_status .message_header_name").text(threadToLoad.threadName);
    $(".message_header_status .last_access").text(lastSeen);
    $(".message_header_left .you > img").attr("src", "assets/" + threadToLoad.threadImage);
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
    //creo oggetto messaggio dal testo dell'utente
    var messageObject = this.createMessage(new Date(), $(".input_message").val(), true);
    //chiamo metodo che si occupa di inserire il messaggio all'interno del container
    this.loadSingleMessage(messageObject);
    //cancello testo scritto nella input text
    $(".input_message").val("");
  },
  // metodo che carica un singolo oggetto messaggio nella conversazione
  loadSingleMessage: function(message) {
    //clono il template per il messaggio
    if (message.isMyMessage) {
      var newMessageElement = $(".messages_templates .message_me_template").clone();
    } else {
      var newMessageElement = $(".messages_templates .message_you_template").clone();
    }
    //imposto il testo e l'ora del messaggio
    newMessageElement.find(".message_text").text(message.messageContent);
    newMessageElement.find(".message_timestamp>span").text(this.getHoursMinutes(message.messageTimestamp));
    //inserisco il messaggio all'interno del container
    $(".messages_wrapper").append(newMessageElement);
    //effettuo scrolling del container
    $(".message_content").scrollTop($(".message_content")[0].scrollHeight);
  },
  //metodo che restituisce una stringa hh:mm da un oggetto data
  getHoursMinutes: function(dateObject) {
    var messageTime = dateObject.getHours().toString().length == 1 ? "0" + dateObject.getHours().toString() :
      dateObject.getHours().toString();
    messageTime += ":" + (dateObject.getMinutes().toString().length == 1 ? "0" + dateObject.getMinutes().toString() : dateObject.getMinutes().toString());
    return messageTime;
  },
  //metodo che ritorna una stringa random del tipo "ultimo acesso oggi...."
  getLastAccess: function() {
    var nowTime = new Date();
    nowTime.setMinutes(nowTime.getMinutes() - this.getIntRandomNumber(10, 100));
    return this.getHoursMinutes(nowTime);
  },
  //metodo che restituisce l'oggetto messaggio inviato dall'utente
  createMessage: function(messageDate, messageText, messageFromMe) {
    var message = {
      messageTimestamp: messageDate,
      messageContent: messageText,
      isMyMessage: messageFromMe
    }
    return message;
  }
}

$(document).ready(function() {
  whatsappController.initializeController();
});