var triviaQuestions = [{
	question: "What is Crptography?",
	answerList: ["Readable", "Encoded", "Authenticated", "Authorized"],
	answer: 1
},{
	question: "What is Delphi Technique?",
	answerList: ["Group Decision Method", "Quantitative Method", "Qualitative Method", "decision"],
	answer: 0
},{
	question: "How many bits make up the effective length of the DES key?",
	answerList: ["64", "56", "32", "16"],
	answer: 0
},{
	question: "What does DES stand for?",
	answerList: ["Data Encrption Signature", "Data Encrption System", "Data Encryption Standard", "Data Encoding Standard"],
	answer: 2
},{
	question: "What is BIA?",
	answerList: ["Business Improvement Analytics", "Business Improvement Analysis", "Business Integrity Analysis", "Business Impact Analysis."],
	answer: 3
},{
	question: "Tini Trojan listens on which port?",
	answerList: ["7777", "23457", "21544", "2140"],
	answer: 0
},{
	question: "Which of the following tools can be used against a denial of service attack?",
	answerList: ["A LAND", "All of these", "Bubonic", "targa"],
	answer: 1
},{
	question: "Which of the following viruses use encryption to hide its presence?",
	answerList: ["Polymorphic virus", "Camouflage virus", "Armored virus", "Cavity virus"],
	answer: 2
},{
	question: "Which of the following can be used for password cracking and ARP poisoning?",
	answerList: ["SMAC", "Cain & Abel", "Hydra", "Packet Crafter"],
	answer: 1
},{
	question: "Which of the following is a file system integrity-checking program?",
	answerList: ["Stegdetect", "PsExec", "eslave", "Tripwire"],
	answer: 3
},{
	question: "Which of the following is an intrusion detection tool?",
	answerList: ["Snort", "Iris", "EtherPeek", "WireShark"],
	answer: 0
},{
	question: "Which of the following is used to disable antivirus programs?",
	answerList: ["LetMeRule", "Firekiller", "Subroot", "CyberSpy"],
	answer: 1
},{
	question: "Which of the following TCP flags denotes resetting of the connection?",
	answerList: ["ACK", "PSH", "URG", "RST"],
	answer: 3
},{
	question: "Which of the following NMAP scanning types is also known as half-open scanning?",
	answerList: ["SYN stealth scan", "XMAS tree scan", "ACK scan", "TCP connect"],
	answer: 0
},{
	question: "Which of the following services uses registered port numbers?",
	answerList: ["FTP", "CISF", "Oracle Listener", "Syslog"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 30;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}