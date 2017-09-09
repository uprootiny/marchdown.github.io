var currentWord;
var rightAnswer;
var words; // array of sound objects, set in nextPage.
var word_index;
var audioFinished;
var pages =  ["inqueryPage",
              "instructionPage",
              "trainingPage",
              "consentPage",
              "experimentPage",
              "endPage"];
var pi = 0;

var training = true; // are we in the training stage? proceed to the next word when this one's fully revealed?
var firstExperimentRun;
var inputArray = []; /* сюда складываются массивы ответов и данных о них */
//var usersInput; /* username испытуемого */
var userData; /* анкетные данные испытуемого */
var fileText = ""; /* текст файла с результатами */
userData = {userName:"anonymous", /* умолчания */
            userAge:"0",
            userSex:"female",
            userEducation:"graduate",
            userProfession:"",
            userLanguage:"русский",
            userHand:"right",
            userDisorders:"no",
            userMedication:"no",
            userPerception:"no" };

function normalizeAnswer(s){
          return(s.trim().toLowerCase().replace(/ё/gi, "е"));
          }
function nextPage() {
  hidePage(pages[pi]);
  pi += 1;
  /* preparePage */
  if (["trainingPage", "experimentPage"].includes(pages[pi])) /* check */
  {
    if (pages[pi] == "experimentPage") training = false;
    word_index = 0;
    words = eval(pages[pi].substr(0,pages[pi].search('P'))+"_howls"); // trainingPage → training;
    currentWord = words[word_index]; /* check */
    rightAnswer = normalizeAnswer(currentWord._src.match( /_\d+_(.*)\./i )[1]);
    displayWordsRemaining();
    firstExperimentRun = true;
  }
  showPage(pages[pi]);
  if(pages[pi]=="consentPage")  document.getElementById("consentSubmitButton").focus();
  if(pages[pi]=="experimentPage") {
    document.getElementById("playButton").focus();
    //document.getElementById("consentSubmitButton").style.cssText+="disabled";
    // alert(document.activeElement);
  }
}
function prevPage() { // training → instruction
  hidePage(pages[pi]);
  pi -= 1;
  /* preparePage */
  if (["trainingPage", "experimentPage"].includes(pages[pi])) /* check */
  {
    word_index = 0;
    words = eval(pages[pi].substr(0,pages[pi].search('P'))+"_howls"); // trainingPage → training;
    currentWord = words[word_index]; /* check */
    rightAnswer = normalizeAnswer(currentWord._src.match( /_\d+_(.*)\./i )[1]);
    displayWordsRemaining();
    firstExperimentRun = true;
  }
  showPage(pages[pi]);
}

function nextWord() {
  /* should never be called on the last word.     */
  /* check if the list is over and decide whether */
  /* to call nextWord or nextPage or submitData   */
  word_index += 1;
  currentWord = words[word_index]; /* check */
  rightAnswer = normalizeAnswer(currentWord._src.match( /_\d+_(.*)\./i )[1]);
  audioFinished = false;
  displayWordsRemaining();
}

function reactToRightAnswer() {
  if (training) {
    document.getElementById('trainingTextCue').innerText = "Вы ввели верное слово. Для проигрывания следующего слова нажмите на Play."; /* изменить текст */
    document.getElementById('prevPage_from_training_btn').style.cssText="display:none";
  } else {
    document.getElementById('experimentTextCue').innerText = "Вы ввели верное слово. Для проигрывания следующего слова нажмите на Play."; /* изменить текст */
  }
  /* test that the text resets */
  if (lastWord()){
    if (training) nextPage();
    else (wrapUpAndSubmitData());
  } else {
    nextWord();
    currentWord.play("clip");
    /* play is being called */
    /* input clears */
    /* word changes */
    /* ?? page stays the same */
  }
}
function reactToWrongAnswer() {
  if (audioFinished == false){ /* если слово не проиграно до конца */
    //currentLength += 0.050; /* прибавить 50ms */
    increment_clip_length(currentWord);
    if (training) {
      document.getElementById('trainingTextCue').innerText = "Вы ввели неверное слово. Для повторного проигрывания слова нажмите на Play."; /* изменить текст */
      document.getElementById('prevPage_from_training_btn').style.cssText="display:none";
    }  else {
      document.getElementById('experimentTextCue').innerText = "Вы ввели неверное слово. Для повторного проигрывания слова нажмите на Play."; /* изменить текст */
    }
    currentWord.play("clip");
  } else {
    if (training) trainingFunctionAudioFinished();
    else experimentFunctionAudioFinished();
  }
  /* text may change */
  /* duration changes but not too much*/
  /* word stays the same */
  /* page stays the same */
  /* text changes */
  /* IF too many _grow_s already, do something */
  /* test that _play_ is being called  */
}
function playBtnClicked(){
  replayWord();
}
function increment_clip_length(howl_object){
  howl_object._sprite.clip[1] += 50;
  if (howl_object._sprite.clip[1] >= 1000*howl_object.duration()){
    if (training) trainingFunctionAudioFinished();
    else experimentFunctionAudioFinished();
    audioFinished = true;
  }
}
function replayWord() {
  currentWord.play("clip");
  if (audioFinished == false){
    //currentLength += 0.050; /* прибавить 50ms */
    increment_clip_length(currentWord);
  }
  if (firstExperimentRun == true){ /* если проигрывается первое слово */
    if (training) {
      document.getElementById('trainingTextCue').innerText = "Введите слово. Если вы не знаете слова, нажмите на Play."; /* изменить текст */
      document.getElementById('prevPage_from_training_btn').style.cssText="display:none";
    }  else {
      document.getElementById('experimentTextCue').innerText = "Введите слово. Если вы не знаете слова, нажмите на Play."; /* изменить текст */
    }
  }
  firstExperimentRun = false; /* изменить значение на "проигрывается не первое слово" */
}
function wrapUpAndSubmitData() {
  // alert("hurray! we're done here.");
  submitResults();
  /* call filestack upload func */
  nextPage(); /* display "thx bye" page */
}
function hidePage(id) {
  document.getElementById(id).style.cssText="display:none";
}
function showPage(id) {
  document.getElementById(id).style.cssText="display:block";
}
function lastWord() { /* пользователь только что ответил на последнее слово в списке */
  if ((word_index+1) == words.length) return true;
  else return false;
}
function displayWordsRemaining() {
  if (training) document.getElementById("trainingWordsLeftCounterText").innerText = "Слов осталось: " + (words.length - word_index);
  else          document.getElementById('wordsLeftCounterText').innerText = "Слов осталось: " + (words.length - word_index);
}
/* ============ snip ============ */
var trainingFunctionAudioFinished = function(){ /* когда аудио заканчивается */
  audioFinished = true; /* аудио закончилось */
  document.getElementById('trainingTextCue').innerText = "Cлово проиграно до конца. Прочитайте инструкцию снова."; /* изменить текст */
  document.getElementById('prevPage_from_training_btn').style.cssText="display:block";
};
var experimentFunctionAudioFinished = function(){ /* когда аудио заканчивается */
  //if (audioFinished) return;
  audioFinished = true; /* аудио закончилось */
  document.getElementById('experimentTextCue').innerText = "Слово проиграно до конца."; /* изменить текст */
  nextWord();
  currentWord.play('clip');
};
function createAndUploadCSVFile(text, name) {
  var blob = new Blob([text], {type : 'text/csv'});
  var client = filestack.init('A7iAeWAkkSZ67VSjAJPuZz', { policy: 'policy', signature: 'gmryazanskaya' });
  client.upload(blob, {}, {filename: name});
};
function submitResults(){
  var i, j, textLine = "";
  var convertedArray = [];
  for(i = 0; i < inputArray.length; i++){convertedArray.push(inputArray[i]);}
  for(j = 0; j < convertedArray.length; j++) {
    textLine = convertedArray[j].join(";");
    fileText += textLine + "\n";
  }
  var userDataCsv=""; $.each(userData, function(k,v) {userDataCsv+=k+":"+v+"; \n";});
  // alert("A resounding success! "+fileText+"анкета:"+userData);
  createAndUploadCSVFile(fileText, userData.userName+" answers.csv");
  createAndUploadCSVFile(userDataCsv, userData.userName+" user data.csv");
}

"use strict"
$(function(){ // это точка входа, отсюда начинается исполнение при загрузке. ниже содержится основная логика программы.

  $("#verbForm").on("submit", function(event) { /* обработать введённое пользователем слово */
    if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
    var currentInput = normalizeAnswer(document.getElementById('experimentInput').value); /* положить в переменную текущий инпут */
    var currentLength = currentWord._sprite.clip[1]/1000.0;
    if (currentInput == rightAnswer) { /* если верный ответ */
      inputArray.push([userData.userName, rightAnswer, currentLength, currentInput, "true"]); /* сложить значения в массив ответов */
      // alert(inputArray);
      reactToRightAnswer();
    }
    else{ /* если неверный ответ */
      inputArray.push([userData.userName, rightAnswer, currentLength, currentInput, "false"]); /* сложить значения в массив ответов */
      reactToWrongAnswer();
    }
    document.getElementById('experimentInput').value = ""; /* стереть значение инпута */
  });
  $("#trainingForm").on("submit", function(event) { /* обработать введённое пользователем слово */
    if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
    var currentInput = normalizeAnswer(document.getElementById('trainingInput').value); /* положить в переменную текущий инпут */
    if (currentInput == rightAnswer) { /* если верный ответ */
      reactToRightAnswer();
    }
    else{ /* если неверный ответ */
      reactToWrongAnswer();
    }
    document.getElementById('trainingInput').value = ""; /* стереть значение инпута */
  });
  /* no html onclick in trainingForm  */
  $('#inqueryForm').on("submit", function(event) {
    if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
    /* if(document.forms['inqueryForm']['userName'].required) */
    userData = $('#inqueryForm').serializeArray().reduce(function(obj, item) {
      obj[item.name] = obj[item.name]||item.value; /* username = userData[userName] - не работает */
      return obj;
    }, {});
    nextPage();
  });
  /* no html onclick in inqueryForm */
  $('#consentForm').on("submit", function(event) {
    if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
    nextPage();
  });
  $('#instructionForm').on("submit", function(event) {
    event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
    nextPage();
  });
});
