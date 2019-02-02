(function() {
    var questions = [{
      question: "Ako sa volá FiFqo reálnym menom?",
      choices: ["Filip Novák", "Filip Jánoš", "Anton Novák", "Anton Jánoš", "Ani jedno z uvedených"],
      correctAnswer: 1
    }, {
      question: "Ako sa volal FiFqov škrečok?",
      choices: ["Anotník", "Potkan", "Potkaník", "Patkaň", "Ani jedno z uvedených"],
      correctAnswer: 3
    }, {
      question: "Akú prezývku má FiFqova sestra?",
      choices: ["Catty", "Kitty", "Titty", "Zase nezavrela dvere", "Ani jedno z uvedených"],
      correctAnswer: 1
    }, {
        question: "Ako sa volá FiFqova paródia na Bitch lasanga?",
        choices: ["Ku*va lazaňa", "Fena lazaňa", "Prostitútka lazaňa", "Bitch lasagna SK verzia", "Ani jedno z uvedených"],
        correctAnswer: 1
    }, {
        question: "Koľko natočil FiFqo videí z Geometry Dashu? (1.2.2019)",
        choices: ["89", "91", "93", "95", "Ani jedno z uvedených"],
        correctAnswer: 4
    }, {
        question: "Koľko má FiFqo rokov? (1.2.2019)",
        choices: ["18", "21", "22", "26", "Ani jedno z uvedených"],
        correctAnswer: 4
    }, {
        question: "Kedy FiFqo vydal prvé video? (FiFqoOLD)",
        choices: ["11.11.2014", "1.1.2014", "1.1.2013", "11.11.2013", "Ani jedno z uvedených"],
        correctAnswer: 3
    }, {
        question: "Koľko má FiFqo súrodencov? (Aj nevlastní)",
        choices: ["0", "1", "4", "3", "Ani jedno z uvedených"],
        correctAnswer: 2
    }, {
        question: "V akej mestskej časti býva FiFqo?",
        choices: ["Ružinov", "Dúbravka", "Staré Mesto", "Petržalka", "Ani jedno z uvedených"],
        correctAnswer: 2
    }];

    var questions = questions.sort(function (questions, b) {return Math.random() - 0.5;});
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      location.reload();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h1><b><span class="otazka">' + (index + 1) + '. OTÁZKA</span></b></h1>');
      qElement.append(header);
      
      var question = $('<h2>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" align="center" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < 5){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }

      skl = "otázky";
      if(numCorrect == 0 || numCorrect == 5) skl = "otázok";
      if(numCorrect == 1) skl = "otázku";
      
      score.append('Správne si odpovedal na ' + numCorrect + ' ' + skl + ' z 5.');
      return score;
    }
  })();