
var questionID, question, choiceA, choiceB, choiceC, choiceD, questions, numQuestions, qInfo, userChoice
current = 0,
//1
score = 0,
points = [];

var defaultQuestions = [
{
	question: "Where are the three smallest bones in the human body?",
	choiceA: "middle ear",
	choiceB: "nose",
	choiceC: "toes",
	choiceD: "eyes",
	correct: "A"

},
{ 
	question: "What is the most abundant element in the Universe?",
	choiceA: "Helium",
	choiceB: "Oxygen",
	choiceC: "Lithium",
	choiceD: "Hydogen",
	correct: "D"
},
{ 
	question: "Approximately how long does it take for light to travel from Sun's surface to the Earth?",
	choiceA: "8 days",
	choiceB: "8 seconds",
	choiceC: "8 minutes",
	choiceD: "8 hours",
	correct: "C"
},
{
	question: "Which planet has the most moons?",
	choiceA: "Saturn",
	choiceB: "Mars",
	choiceC: "Jupiter",
	choiceD: "Uranus",
	correct: "C"
}];

//reference HTML elements
var elQuiz = document.getElementById("quiz");
var elQuizStatus = document.getElementById("quizStatus");

var elQuestion = document.getElementById("question");
var elChoiceA = document.getElementById("choiceA");
var elChoiceB = document.getElementById("choiceB");
var elChoiceC = document.getElementById("choiceC");
var elChoiceD = document.getElementById("choiceD");
var elChoices = document.getElementsByName('choices');

// start quiz
populateQuestions();
renderQuestion();
//2
document.getElementById("submit").onclick = gradeQuestion;

function populateQuestions(){
	//populate with Default questions
	questions = defaultQuestions;
	// if local storage contains questions, add to question set
	if (localStorage.getItem("questions")){
		//jSON parse convert JSON string into a JS object 
		//need to be an object bc populate qn array w set of default qns
		// getItem() means allows access to data stored in browser
		// why does it need to be an object if local storage is usually string? -isit?
		var storedQuestions = JSON.parse(localStorage.getItem("questions"));
		for(var i = 0; i < storedQuestions.length; i++){
		 	questions.push(storedQuestions[i]);
		 	//push adds new items to end of array and return the new length
		 }
	}
	numQuestions = questions.length;
}

function populateQuestionInfo(){
	//populate current question info from question list
	question = questions[current].question;
	qInfo = questions[current];
	choiceA = qInfo.choiceA;
	choiceB = qInfo.choiceB;
	choiceC = qInfo.choiceC;
	choiceD = qInfo.choiceD;
	correct = qInfo.correct;
}

function renderQuestion(){
	//display question on webpage
	questionID = current + 1
	elQuizStatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
	populateQuestionInfo();
	elQuestion.innerHTML = question;
	elChoiceA.innerHTML = choiceA;
	elChoiceB.innerHTML = choiceB;
    elChoiceC.innerHTML = choiceC;
    elChoiceD.innerHTML = choiceD;
}
//populateQuestions() function populates the questions array with the set of default 
//questions, plus the set of questions stored in local storage, if any. We also update the
// numQuestions variable, which is used later to display user progress
//The populateQuestionInfo() function populates application variables with question info for the current question.
// Although this step may not be necessary (we could use more complex statements to directly 
//pull question info when we need it), it's a good idea to separate specific functionality into separate functions 
//for easy maintenance. For example, if you later choose to populate question info from a different source, it would
// be easy to update this function without changing other parts of your code.
//The renderQuestion() function updates the HTML elements to display the current question and answer choices, along with 
//the user progress indicator.

//SUBMIT BUTTON DOESNT WORK YET!
//works with functions added below
//note: new function are with a number 1,2,3
//3
//We define the gradeQuestion() function, which compares the user choice (if selected) to the correct answer for the current question.
// This function updates the score variable if the answer was correct, and stores the appropriate value in the scores array. It then 
//updates the current variable to point to the next question and calls the renderQuestion() function to display the next question.
function gradeQuestion(){
	if(getUserChoice()){
		if(userChoice == questions[current].correct){
			score++;
			points[current] = 1;
		}
		else{
			points[current] = 0;
		}

		if(current == questions.length-1){
			endGame();
		}
		// next question
		else{
			current++;
			renderQuestion();
		}

	}
}
// We define the getUserChoice() function, which loops through the answer choice radio buttons
// to identify the choice selected by the user. This function updates the userChoice variable 
//with the selected answer choice and returns true if there was a selected answer, or displays an alert to the user and returns false otherwise.
function getUserChoice(){
	for (var i = 0, length = elChoices.length; i < length; i++)
	{
		if (elChoices[i].checked)
		{
			userChoice = elChoices[i].value;
			//clear radio input for next question
			elChoices[i].checked = false;

			return true;
		}
		
	}
	//user didnt select an ansswer
	alert("Please select an answer before continuing");
	return false;
}
// In the endGame() function, we loop through the points array and append a new paragraph to the page 
//for each question, with a message letting the user know if they answered correctly or incorrectly

function endGame(){
	elQuiz.innerHTML = "<h2>Your score: " + score + " out of " + numQuestions + "</h2>";
	for(var i = 0; i < points.length; i++){
		var summary = document.createElement("p");
		if(points[i] == 0){
			summary.innerHTML = "Question #" + (i+1) + ": INCORRECT";
			summary.style.color = "red";
		}
		else{
			summary.innerHTML = "Question #" + (i+1) + ": CORRECT!";
			summary.style.color = "green";
		}
		elQuiz.appendChild(summary);
	}
	document.getElementById("options").style.display = "block";
}

	
