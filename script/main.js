//solo per test
"use strict";
var whatsappController = {
	//proprietà dell'oggetto
	//range in secondi entro il quale l'altro utente riceve il messaggio inviato
	minDelayReply: 2,
	maxDelayReply: 4,
	//tempo in secondi (statico) impiegato dall'altro utente, una volta ricevuto il messaggio, per rispondere. Per semplificare, il tempo che trascorre per ricevere una risposta automatica fake è dato da random(minDelayReply, maxDelayReply)+fixedDelay
	fixedDelay: 2,
	writingMessage: "Sto scrivendo...",
	//metodo iniziale
	initializeController: function () {
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
	createFakeThreads: function () {
		//queste sono le conversazioni presenti, nell'array è memorizzato il nome del destinatario e la il nome dell'immagine
		var startedThreads = [
			{
				threadName: "Renzo Pariani",
				threadImage: "t1.jpg",
				threadId: "wh1"
			},
			{
				threadName: "Federica Stella",
				threadImage: "t2.jpg",
				threadId: "wh2"
			},
			{
				threadName: "Gianni Fermentini",
				threadImage: "t3.jpg",
				threadId: "wh3"
			},
			{
				threadName: "Maria Cedro",
				threadImage: "t4.jpg",
				threadId: "wh4"
			},
			{
				threadName: "Marco Palude",
				threadImage: "t5.jpg",
				threadId: "wh5"
			},
			{
				threadName: "Mario Rossi",
				threadImage: "t6.jpg",
				threadId: "wh6"
			},
			{
				threadName: "Franco Franchi",
				threadImage: "t7.jpg",
				threadId: "wh7"
			},
			{
				threadName: "Giorgio Maninsaldi",
				threadImage: "t8.jpg",
				threadId: "wh8"
			}
		];
		//per ogni elemento dell'array creo una conversazione fittizia fatta da un numero random di scambio messaggi e la pusho nell'array stesso
		for (var i = 0; i < startedThreads.length; i++) {
			startedThreads[i].threadMessages = this.getFakeConversation(this.getIntRandomNumber(8, 20));
		}
		this.startedThreads = startedThreads;
	},
	//metodo che crea i messaggi della conversazione fake
	getFakeConversation: function (messagesCount) {
		var messages = [];
		var startDate = new Date(2018, 7, 10, 9, 10, 0, 0);
		for (var i = 0; i < messagesCount; i++) {
			//testa o croce per sapere di chi è il messaggio
			var myMessage = this.getIntRandomNumber(1, 2) % 2 == 0;
			//aggiungo un numero di minuti casuali alla data iniziale
			var addedMinutes = this.getIntRandomNumber(3600, 9000);
			startDate = this.increaseDate(startDate, addedMinutes);
			//ottengo una frase casuale dall'elenco
			var textMessage = this.sampleMessages[this.getIntRandomNumber(0, this.sampleMessages.length - 1)];
			//creo oggetto messaggio e lo pusho nell'array
			messages.push(this.createMessage(startDate, textMessage, myMessage));
		}
		return messages;
	},
	//metodo che carica le conversazioni
	loadThreads: function () {
		var targetElement = $(".conversations_items");
		for (var i = 0; i < this.startedThreads.length; i++) {
			//conversazione corrente
			var threadObject = this.startedThreads[i];
			//template clonato
			var clonedElement = $(".template .conversation_item_template").clone();
			//imposto l'id univoco
			clonedElement.attr("id", threadObject.threadId);
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
	increaseDate: function (dateObject, minuteToIncrease) {
		return new Date(dateObject.getTime() + minuteToIncrease * 60000);
	},
	//metodo che ritorna la data formattata giorno mese anno
	getStringDate: function (aDate) {
		var day = aDate.getDate().toString().length == 1 ? "0" + aDate.getDate().toString() : aDate.getDate().toString();
		var month = aDate.getMonth() + 1;
		month = month.toString().length == 1 ? "0" + month.toString() : month.toString();
		var year = aDate.getFullYear().toString();
		return day + "/" + month + "/" + year;
	},
	// questo metodo ritorna vero o falso a seconda che la data passata sia la data di oggi
	isTodayTheDate: function (aDate) {
		var tempDate = new Date(aDate.getTime());
		var todayDate = new Date();
		return tempDate.setHours(0, 0, 0, 0) == todayDate.setHours(0, 0, 0, 0);
	},
	//metodo che inizializza la proprietà sampleMessages dell'oggetto con un array di messaggio d'esempio (frasi celebri dei film)
	initializeSampleMessage: function () {
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
	getIntRandomNumber: function (min, max) {
		return Math.trunc(Math.random() * (max + 1 - min) + min);
	},
	//metodo che nasconde la splash screen
	discardSplashScreen: function () {
		//leggo il valore impostato nella proprietà animation-duration dello splash screen, quindi creo un timer che lo nasconda dopo il tempo impostato
		var duration = parseInt($(".splash_screen_loaded_bar").css("animation-duration"));
		setTimeout(function () {
			//nascondo lo splash screen che finge un caricamento
			$(".splash_screen").hide();
		}, duration * 1000);
	},
	//metodo che collega i listener
	attachHandlers: function () {
		//closure
		var thisObject = this;
		//handler per keyup su campo testo messaggio utente
		$(".input_message").keyup(function (event) {
			thisObject.handleAnimationOnInputMessage.call(thisObject, event);
		});
		//handler per il click sull'icona invio messaggio
		$(".message_send").click(function () {
			thisObject.sendMessage();
		});
		//handler per i click sugli elementi conversazione
		$(".conversation_item_template").click(function () {
			var threadIndex = $(this).index();
			var threadId = $(this).attr("id");
			// passo l'index 0-based e l'id univoco della conversazione
			thisObject.loadSingleThread.call(thisObject, threadIndex, threadId);
		});
		//handler per la search bar quando ottiene il fuoco
		$(".search_bar_fake .input_search").focus(function () {
			thisObject.manageSearchBarGotFocus.call(thisObject);
		});
		//handler per la search bar quando rilascia il fuoco
		$(".search_bar_fake .input_search").focusout(function () {
			thisObject.manageSearchBarLostFocus.call(thisObject);
		});
		// handler per la scrittura nella search bar
		$(".search_bar_fake .input_search").keyup(function () {
			thisObject.manageUserSearch.call(thisObject);
		});
	},
	//questo metodo associa l'evento click sul menu contestuale dei messaggi e deve essere chiamato ogni qual volta si cambia thread
	attachMessageHandler: function () {
		//closure
		var thisObject = this;
		//handler per il click sul menu contestuale del messaggio
		$(".message_option").click(function () {
			var element = $(this);
			thisObject.manageMessageMenuClick.call(thisObject, element);
		});
		//handler per la chiusura del menu contestuale quando si clicca fuori da esso
		$(document.body).click(function (e) {
			var target = $(e.target);
			if (!target.hasClass("context_menu_arrow") && !target.hasClass("message_option_menu") && !target.hasClass("menu_other") && !target.hasClass("menu_delete")) {
				//rimuovo il menu, questa operazione viene effettuata anche nel caso in cui il menu non sia visualizzato
				$(".messages_wrapper .message_option_menu").remove();
			}
		});
	},
	//metodo che carica la conversazione scelta dall'utente. ThreadIndex è un valore con base 0 all'interno dell'array ma con base 1 per l'elemento all'interno del proprio container
	loadSingleThread: function (threadIndex, threadId) {
		//operazioni preliminari al caricamento della conversazione
		this.prepareForLoadSingleThread(threadIndex, threadId);
		// ottengo conversazione dall'array
		var threadToLoad = this.startedThreads[threadIndex];
		//caricamento delle info generali sulla conversazione (nome, ultimo accesso, foto)
		this.loadSingleThreadInfo(threadToLoad);
		//caricamento dei messaggi del thread
		var threadMessages = threadToLoad.threadMessages;
		for (var i = 0; i < threadMessages.length; i++) {
			this.loadSingleMessage(threadMessages[i]);
		}
		//cancello il valore di eventuali messaggi non letti e nascondo segnalino
		this.showUnreadedMessageCount(threadId, false);
		// this.showUnreadedMessageCount(threadIndex, false);
		threadToLoad.unreadedMessageCount = 0;
		//chiamo metodo per associare l'evento click sul menu contestuale
		this.attachMessageHandler();
		//imposto il fuoco sulla casella di ricerca e cancello eventuali valori presenti
		$(".message_compose .input_message").val("");
		$(".message_compose .input_message").focus();
	},
	//metodo che prepara al caricamento dei messaggi per una conversazione scelta dall'utente
	prepareForLoadSingleThread: function (threadIndex, threadId) {
		//se la home screen è visualizzata devo nasconderla
		if ($(".message_home_screen").is(":visible")) {
			$(".message_home_screen").hide();
		}
		//cancello eventuali messaggi presenti - il comando remove scarica anche gli eventi associati
		$(".messages_wrapper > div").remove();
		//imposto background white per tutte le conversazioni
		$(".conversation_item_template").removeClass("active_item");
		//imposto background selezionato solo per la conversazione aperta
		$(".conversations_items " + "#" + threadId).addClass("active_item");
		//imposto come proprietà dell'oggetto l'indice della conversazione aperta e l'id univoco conversazione
		this.openedThreadIndex = threadIndex;
		this.openedThreadId = threadId;
	},
	//metodo che carica le informazioni su una conversazione
	loadSingleThreadInfo: function (threadToLoad) {
		//carico le info della conversazione sull'header (foto, nome, ultime accesso)
		$(".message_header_status .message_header_name").text(threadToLoad.threadName);
		//controllo se sta scrivendo
		if ("iAmWritingCount" in threadToLoad && threadToLoad.iAmWritingCount > 0) {
			$(".message_header_status .last_access").text(this.writingMessage);
		} else {
			$(".message_header_status .last_access").text(this.getLastAccess());
		}
		$(".message_header_left .you > img").attr("src", "assets/" + threadToLoad.threadImage);
	},
	//metodo che gestisce le azimazioni sull'input message (microfono che si trasforma in freccia)
	handleAnimationOnInputMessage: function (keyevent) {
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
	sendMessage: function () {
		//creo oggetto messaggio dal testo dell'utente
		var userInput = $(".input_message").val();
		var messageObject = this.createMessage(new Date(), userInput, true);
		//chiamo metodo che si occupa di inserire il messaggio all'interno del container
		this.loadSingleMessage(messageObject);
		//cancello testo scritto nella input text
		$(".input_message").val("");
		//memorizzo messaggio nella conversazione corrente
		var thisObject = this;
		var currentThread = this.startedThreads.find(function (thread) {
			return thread.threadId == thisObject.openedThreadId;
		});
		currentThread.threadMessages.push(messageObject);
		//chiamo procedura per generare una risposta automatica
		this.createFakeReply(this.openedThreadId);
		//chiamo metodo che aggiorna il chunck dell'ultimo messaggio nella conversazione
		this.updateLastMessageChunk(this.openedThreadId, userInput);
		//chiamata la metodo che gestisce lo spostamento
		this.changeOrder();
	},
	// metodo che carica un singolo oggetto messaggio nella conversazione
	loadSingleMessage: function (message) {
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
	getHoursMinutes: function (dateObject) {
		var messageTime = dateObject.getHours().toString().length == 1 ? "0" + dateObject.getHours().toString() :
			dateObject.getHours().toString();
		messageTime += ":" + (dateObject.getMinutes().toString().length == 1 ? "0" + dateObject.getMinutes().toString() : dateObject.getMinutes().toString());
		return messageTime;
	},
	//metodo che ritorna una stringa random del tipo "ultimo acesso oggi...."
	getLastAccess: function () {
		var nowTime = new Date();
		nowTime.setMinutes(nowTime.getMinutes() - this.getIntRandomNumber(10, 100));
		return "ultimo accesso oggi alle " + this.getHoursMinutes(nowTime);
	},
	//metodo che restituisce l'oggetto messaggio inviato dall'utente
	createMessage: function (messageDate, messageText, messageFromMe) {
		var message = {
			messageTimestamp: messageDate,
			messageContent: messageText,
			isMyMessage: messageFromMe
		}
		return message;
	},
	//metodo che genera una risposta fake quando l'utente invia un messaggio
	createFakeReply: function (threadId) {
		//closure
		var thisObject = this;
		//il delay della risposta è espresso in sec
		var delay = this.getIntRandomNumber(this.minDelayReply, this.maxDelayReply);
		setTimeout(function () {
			//genero un nuovo oggetto messaggio con data attuale e testo casuale
			var incomingMessage = thisObject.createMessage(new Date(), thisObject.sampleMessages[thisObject.getIntRandomNumber(0, thisObject.sampleMessages.length - 1)], false);
			//utilizzo call per impostare l'oggetto this mel metodo chiamato
			thisObject.askToSomeoneToStartWritingAMessage.call(thisObject, incomingMessage, threadId);
		}, delay * 1000);
	},
	//questo metodo simula la scrittura da parte dell'altra persona
	//imposto nel thread che l'altro utente sta scrivendo. Viene usato un numero intero per tenere traccia del numero dei messaggi da rispondere
	//controllo se la proprietà esiste
	askToSomeoneToStartWritingAMessage: function (incomingMessage, threadIndex) {
		//cerco il thread nell'array
		var currentThread = this.startedThreads.find(function (thread) {
			return thread.threadId == threadIndex;
		});
		console.log("Ho iniziato a risponderti");
		if ("iAmWritingCount" in currentThread) {
			//esiste quindi la posso incrementare
			currentThread.iAmWritingCount++;
		} else {
			//non esiste quindi la imposto a 1
			currentThread.iAmWritingCount = 1;
		}
		if (this.openedThreadId == threadIndex) {
			$(".message_header_status a.last_access").text(this.writingMessage);
		}
		//aspetto un tempo (fisso) per simulare la scrittura dell'altro utente
		//closure
		var thisObject = this;
		setTimeout(function () {
			thisObject.messageReceived.call(thisObject, incomingMessage, threadIndex);
		}, thisObject.fixedDelay * 1000);
	},
	//questo metodo gestisce il messaggio in ingresso (quello generato in automatico dopo che ne è stato inviato uno)
	messageReceived: function (incomingMessage, threadId) {
		//salvo il messaggio ricevuto nel thread
		var currentThread = this.startedThreads.find(function (thread) {
			return thread.threadId == threadId;
		});
		currentThread.threadMessages.push(incomingMessage);
		//se la conversazione attualmente aperta è relativa al messaggio in ingresso, inserisco il messaggio nel container e lo stampo a video
		console.log("messaggio ricevuto dall'utente");
		if (threadId == this.openedThreadId) {
			//aggiungo il messaggio nel container
			this.loadSingleMessage(incomingMessage);
		} else {
			//devo mostrare segnalino con numero messaggi non letti
			this.addUnreadedMessageToThread(threadId);
		}
		//decremento valore iAmWritingCount, se il valore arriva a zero tolgo la scritta Sto scrivendo
		if (--currentThread.iAmWritingCount == 0) {
			$(".message_header_status a.last_access").text(this.getLastAccess());
		}
		//aggiorno last message chunck
		this.updateLastMessageChunk(threadId, incomingMessage.messageContent);
	},
	addUnreadedMessageToThread: function (threadId) {
		var currentThread = this.startedThreads.find(function (thread) {
			return thread.threadId == threadId;
		});
		if ("unreadedMessageCount" in currentThread) {
			currentThread.unreadedMessageCount++;
		} else {
			currentThread.unreadedMessageCount = 1;
		}
		//chiamo il metodo per mostrare il valore
		this.showUnreadedMessageCount(threadId, true)
	},
	showUnreadedMessageCount: function (threadIndex, show) {
		var element = $(".conversations_items " + "#" + threadIndex).find(".item_info_unreaded");
		// var element = $(".conversation_item_template").eq(threadIndex).find(".item_info_unreaded");
		if (show) {
			//rendo visibile
			element.css("display", "inline-block");
			//imposto il contenuto
			var currentThread = this.startedThreads.find(function (thread) {
				return thread.threadId == threadIndex;
			});
			element.text(currentThread.unreadedMessageCount);
		} else {
			//nascondo
			element.hide();
		}
	},
	manageMessageMenuClick: function (element) {
		//se all'interno dell'elemento è presente il template del menu, esso è visualizzato quindi devo chiuderlo e rimuoverlo, altrimenti devo inserircelo
		var targetElement = element.parent().find(".message_option_menu_wrapper");
		var contextMenu = targetElement.find(".message_option_menu");
		if (contextMenu.length > 0) {
			//il menu contestuale è già presente - devo chiuderlo e rimuoverlo
			contextMenu.slideToggle(200, function () {
				$(".messages_wrapper .message_option_menu").remove();
			});
		} else {
			//il menu contestuale non esiste
			//lo rimuovo da eventuali altri messaggi
			$(".messages_wrapper  .message_option_menu").remove();
			//lo inserisco nel messaggio cliccato
			var clonedElement = $(".menu_template .message_option_menu").clone();
			targetElement.append(clonedElement);
			clonedElement.slideToggle(200);
			//associo handler per il click sulle voci della dropdown
			var thisObject = this;
			$(".message_option_menu .menu_delete").click(function (event) {
				thisObject.deleteMessage.call(thisObject, event);
			});
		}
	},
	deleteMessage: function (event) {
		var messageToDeleteElement = $(event.target).parent().parent().parent();
		var messageToDeleteIndex = messageToDeleteElement.index();
		var thisObject = this;
		var currentThread = this.startedThreads.find(function (thread) {
			return thread.threadId == thisObject.openedThreadId;
		});
		//cancello elemento dal DOM
		messageToDeleteElement.remove();
		//cancello elemento dall'array
		currentThread.threadMessages.splice(messageToDeleteIndex, 1);
		//aggiorno chunk messaggio nella lista conversazioni
		if (currentThread.threadMessages.length == 0) {
			this.updateLastMessageChunk(this.openedThreadId, "");
		} else {
			this.updateLastMessageChunk(this.openedThreadId, currentThread.threadMessages[currentThread.threadMessages.length - 1].messageContent);
		}
	},
	manageSearchBarGotFocus: function () {
		$(".search_bar_icon_arrow").css("animation-name", "search_bar_anim");
		$(".search_bar_icon_search").hide();
		$(".search_bar_icon_arrow").show();
		$(".conversations_search_bar").css("background-color", "white");
	},
	manageSearchBarLostFocus: function () {
		//ottengo la durata dell'animazione, trascorsa la quale nascondo la freccia
		var duration = parseFloat($(".search_bar_icon_arrow ").css("animation-duration"));
		$(".search_bar_icon_arrow").css("animation-name", "search_bar_reverse_anim");
		$(".conversations_search_bar").css("background-color", "#fbfbfb");
		//cancello testo inserito dall'utente
		$(".search_bar_fake .input_search").val("");
		//ripristino visibilità thread eventualmente nascosti
		$(".conversations_items > .conversation_item_template").each(function () {
			$(this).show();
		});
		//rimuovo titolo risultati ricerca
		$(".search_results_title").slideUp();
		//avvio il timer che mi permette di ripristinare in modo simile all'originale l'icona della lente
		setTimeout(function () {
			$(".search_bar_icon_search").show();
			$(".search_bar_icon_arrow").hide();
		}, duration * 1000);
	},
	manageUserSearch: function () {
		var inputText = $(".search_bar_fake .input_search").val();
		//mostro/nascondo elemento titolo
		if (inputText.length == 0) {
			$(".search_results_title").slideUp();
		} else {
			$(".search_results_title").slideDown();
		}
		//ciclo sulle conversazioni
		$(".conversations_items > .conversation_item_template").each(function () {
			var threadName = $(this).find(".item_name").text();
			if (threadName.toLowerCase().includes(inputText.toLowerCase())) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	},
	// questo metodo si accupa di aggiornare l'ultima parte di messaggio visualizzata nella singola conversazione
	updateLastMessageChunk: function (threadId, lastMessageChunck) {
		var currentThread = $(".conversations_items " + "#" + threadId);
		currentThread.find(".item_message_part").text(lastMessageChunck);
	},
	//quando l'utente scrive un messaggio, questo viene portato in cima alla pila conversazioni
	changeOrder: function () {
		var elementToMove = $(".conversations_items " + "#" + this.openedThreadId);
		var currentIndex = elementToMove.index();
		if (currentIndex > 0) {
			//sposto indietro finché l'index dell'elemento non diviene 0
			elementToMove.detach();
			$(".conversations_items .conversation_item_template").eq(--currentIndex).before(elementToMove);
			var thisObject = this;
			setTimeout(function () {
				thisObject.changeOrder();
			}, 30);
		}
	}
}

$(document).ready(function () {
	whatsappController.initializeController();
});