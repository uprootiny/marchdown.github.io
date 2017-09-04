var function firstPage() {

}
var function nextPage() {

}
var function firstWord() {

}
var function nextWord() {

}
var function rightAnswer() {

}
var function wrongAnswer() {

}
var function replayWord() {

}
var function wrapUpAndSubmitData() {

}




/* ============ refactor me ============ */



"use strict"
  //var currentLength = 0.250; /* до какого момента пригрывать запись - изначально 250ms *///?
  var inputArray = []; /* сюда складываются массивы ответов и данных о них */
  var firstTrainingRun = true; /* первое ли слово проигрывается */
  var firstExperimentRun = true;
  var audioFinished = false; /* проиграно ли слово до конца */                           //ушло в howler_helper_funcs
  var wordsSolvedCounter = 0; /* количество решённых слов */
  var audio;                                                                             //?
  var rightAnswer; /* правильный ответ */                                                //!
  var usersInput; /* username испытуемого */
  var userData; /* анкетные данные испытуемого */
  var fileText = ""; /* текст файла с результатами */                                    //!
  var training = true; /* тренировка ли сейчас*/
  //var wordsLeftCounter = 0; /*сколько осталось слов*/                                    //?


      $(function(){ // это точка входа, отсюда начинается исполнение при загрузке. ниже содержится основная логика программы.
        //audio = document.getElementById('sample'); /* текущее слово (аудио) */ // теперь лежит в howlObj
        var trainingFunctionAudioFinished = function(){ /* когда аудио заканчивается */
          audioFinished = true; /* аудио закончилось */
            document.getElementById('trainingText').innerText = "Cлово проиграно до конца. Прочитайте инструкцию снова." /* изменить текст */
            document.getElementById('trainingPage').style.cssText="display: none"; /* скрыть consentPage */
            document.getElementById('instructionPage').style.cssText="display: block"; /* показать instructionPage */
            //wordsSolvedCounter = 0; // howls_index: сколько слов мы перебрали с начала списка, столько у нас решенных.
        };

        var experimentFunctionAudioFinished = function(){ /* когда аудио заканчивается */
            if (audioFinished) return;
            audioFinished = true; /* аудио закончилось */
            document.getElementById('text').innerText = "Слово проиграно до конца."; /* изменить текст */
            getToTheNextWord();
            //audio.play();
            howlPlay();

          };
        function createAndUploadCSVFile(text, name) {
          var blob = new Blob([text], {type : 'text/csv'});
          var client = filestack.init('A7iAeWAkkSZ67VSjAJPuZz', { policy: 'policy', signature: 'gmryazanskaya' });
          client.upload(blob, {}, {filename: name});
        };

        function getToTheNextWord(){ /* перейти к следующему слову */
            if (howls_index < fileTrainingSrcArray.length){
              howlNext();
            }
            if (training == false){ /* экспериментальные задания */
              displayWordsRemaining();
              // document.getElementById("wordsLeftCounterText").innerText = "Слов осталось: " + (howls.length - howls_index);
              // currentLength = 0.250 /* сбросить текущую длину проигрывания до начальной */ в howlNext()
              // document.getElementById('sample').src = fileSrcArray[wordsSolvedCounter - 1]; /* положить в переменную audio следующий файл из спика адресов файлов */
              // var source = decodeURI(document.getElementById('sample').src); /* обновить правильный ответ: адрес файла кладётся в текстовую переменную */
              // rightAnswer = source.match( /_\d+_(.*)\./i )[1].toLowerCase(); /* положить эту текстовую переменную в правильный ответ */
                  if (howls_index > fileSrcArray.length-1) { /* если решено слов столько же или больше длины списка слов */
                    /* то перейди на следущую подстраницу: поблагодари респондента и спрячь всё лишнее */
                    /* допустим, в списку два слова. тогда fileSrcArray.length-1 == 1; при непоследнем проходе index==0, при последнем index==1, сравнение срабатывает и мы опускаемся в эту ветку */
                    //audio.removeEventListener("ended", experimentFunctionAudioFinished);

                    //---- собери данные и отправь в filestack
                    submitResults();
                    //----
                    }
            }

          else { /* тренировочные задания */
            if (howls_index < fileTrainingSrcArray.length){ /* если решено слов меньше длины списка слов */
              //wordsLeftCounter = fileTrainingSrcArray.length - wordsSolvedCounter; /* обновить значение числа оставшихся слов */
              //wordsSolvedCounter += 1; /* прибавить 1 к числу решённых слов */
              //assert(howls.length == fileTrainingSrcArray.length)
              //document.getElementById("trainingWordsLeftCounterText").innerText = "Слов осталось: " + (howls.length - howls_index);
              displayWordsRemaining();
              //currentLength = 0.250; /* сбросить текущую длину проигрывания до начальной */
              //document.getElementById('sample').src = fileTrainingSrcArray[wordsSolvedCounter - 1]; /* положить в переменную audio следующий файл из спика адресов файлов */
              //var source = decodeURI(document.getElementById('sample').src); /* обновить правильный ответ: адрес файла кладётся в текстовую переменную */
              //rightAnswer = source.match( /_\d+_(.*)\./i )[1].toLowerCase(); /* положить эту текстовую переменную в правильный ответ */
            } else { /* если решено слов столько же или больше длины списка слов */
              $('#trainingPage').hide(); /* скрыть trainingPage */
              document.getElementById('consentPage').style.cssText="display: block"; /* скрыть кнопку Play */
              training = false;
              switchFromTrainingToExpList();

              //audio.removeEventListener("ended", trainingFunctionAudioFinished);
              //wordsSolvedCounter = 0; /* сбросить число решённых слов */
            };

          };
        };

        /* выше служебные функции, ниже обработчики событий */
        $("#verbForm").on("submit", function() { /* обработать введённое пользователем слово */
          if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
          var currentInput = normalizeAnswer(document.getElementById('input').value); /* положить в переменную текущий инпут */
          var currentLength = document.getElementById('clip_duration').innerText=howlObj._sprite.clip[1];
          if (currentInput == rightAnswer) { /* если верный ответ */
            inputArray.push([userData.userName, rightAnswer, currentLength, currentInput, "true"]); /* сложить значения в массив ответов */
            document.getElementById('text').innerText = "Вы ввели верное слово. Для проигрывания следующего слова нажмите на Play."; /* изменить текст */
            getToTheNextWord(); /* перейти к следующему слову */
            howlPlay();
          }
          else{ /* если неверный ответ */
            inputArray.push([userData.userName, rightAnswer, currentLength, currentInput, "false"]); /* сложить значения в массив ответов */
            if (audioFinished == false){ /* если слово не проиграно до конца */
              //currentLength += 0.050; /* прибавить 50ms */
              document.getElementById('text').innerText = "Вы ввели неверное слово. Для повторного проигрывания слова нажмите на Play."; /* изменить текст */
              howlGrow();
              howlPlay();
            };

          };

          document.getElementById('input').value = "" /* стереть значение инпута */
          //if (howls_index < (fileSrcArray.length-1)) $("#playButton").click();  // CHECK ME
          return false;
        });


        // так мы больше не делаем, это плохой таймер.
        // вместо этого мы отправляем на воспроизведение кусочки файлов нужного размера.
        // setInterval(function () { /* остановить аудио по нужному времени */
        // 	if (currentLength && audio.currentTime >= currentLength) { /* если есть максимальная длина и она меньше текущей длины */
        // 		audio.pause(); /* остановить аудио */
        // 	};
        // }, 30); /* проверять условие каждые 30ms */


        $("#playButton").on("click", function(){
          if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
//    				audio.currentTime = 0.0; /* начать проигрываеть слово с начала */
//    				audio.play(); /* проиграть слово */
            howlPlay();

          if (audioFinished == false){
            //currentLength += 0.050; /* прибавить 50ms */
            howlGrow();
          };
          if(firstExperimentRun == true){ /* если проигрывается первое слово */
            document.getElementById('text').innerText = "Введите слово. Если вы не знаете слова, нажмите на Play." /* изменить текст */
            //audio.addEventListener("ended", experimentFunctionAudioFinished);
          };
          firstExperimentRun = false; /* изменить значение на "проигрывается не первое слово" */
        });


        $("#trainingForm").on("submit", function() { /* обработать введённое пользователем слово */
          //alert("submitted training form");
          if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
          var currentInput = normalizeAnswer(document.getElementById('trainingInput').value); /* положить в переменную текущий инпут */
          if (currentInput == rightAnswer) { /* если верный ответ */
            document.getElementById('trainingText').innerText = "Вы ввели верное слово. Для проигрывания следующего слова нажмите на Play."; /* изменить текст */
            getToTheNextWord(); /* перейти к следующему слову */
            howlPlay();
          }
          else{ /* если неверный ответ */
            if (audioFinished == false){ /* если слово не проиграно до конца */
              //currentLength += 0.050; /* прибавить 50ms */
              document.getElementById('trainingText').innerText = "Вы ввели неверное слово. Для повторного проигрывания слова нажмите на Play."; /* изменить текст */
              howlGrow();
              howlPlay();
              };
          };
          document.getElementById('trainingInput').value = "" /* стереть значение инпута */
          // if (training) $("#trainingButton").click();
          /* make the following happen:
          play a sound;
          increment it it's not complete yet; x
          change #trainingText;               x
          set firstTrainingRun to false.

          what SUBMIT does but PLAY doesn't:
          check the answer
          erase the input
          move on to the next word if the answer was right.

          */
          return false;
        });


        $("#trainingButton").on("click", function(){
          //alert("clicked training button");
          if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
          //audio.currentTime = 0.0; /* начать проигрываеть слово с начала */
          //audio.play(); /* проиграть слово */
          if (audioFinished == false){
            //currentLength += 0.050; /* прибавить 50ms */
             howlGrow();
          };
          howlPlay();


          if(firstTrainingRun == true){ /* если проигрывается первое слово */
            document.getElementById('trainingText').innerText = "Введите слово. Если вы не знаете слова, нажмите на Play." /* изменить текст */
            //audio.addEventListener("ended", trainingFunctionAudioFinished);
          };
          firstTrainingRun = false; /* изменить значение на "проигрывается не первое слово" */
        });

        /* Этот блок срабатывает первым */
        $('#inqueryForm').on("submit", function() {
          if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
          /* if(document.forms['inqueryForm']['userName'].required) */
          userData = $('#inqueryForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = obj[item.name]||item.value; /* username = userData[userName] - не работает */
            return obj;
          }, {});
          document.getElementById('inqueryPage').style.cssText="id:inqueryPage; display: none"; /* скрыть inqueryPage */
          document.getElementById('instructionPage').style.cssText="display: block"; /* показать instructionPage */
        });


        $('#consentForm').on("submit", function() {
          if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
          document.getElementById('consentPage').style.cssText="id: consentPage; display: none"; /* скрыть consentPage */
          document.getElementById('experimentPage').style.cssText="id: experimentPage; display: block"; /* показать experimentPage */
          document.getElementById('text').innerText = "Для проигрывания слова нажмите на Play."; /* изменить текст */
          getToTheNextWord();
        });


        $('#instructionForm').on("submit", function() {
          if (event.preventDefault) event.preventDefault(); /* не переходить на новую страницу (отключить обработчик по умолчанию) */
          document.getElementById('instructionPage').style.cssText="id: instructionPage; display: none"; /* скрыть instructionPage */
          document.getElementById('trainingPage').style.cssText="display: block"; /* показать consentPage */
          document.getElementById('trainingText').innerText = "Для проигрывания слова нажмите на Play."; /* изменить текст */
          getToTheNextWord();
        });
      });
