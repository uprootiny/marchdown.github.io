/* инициализация переменных */
var audioFinished = false;

var fileTrainingSrcArray = ["gating_disc/training/0_1_художник.mp3", "gating_disc/training/0_2_пациент.mp3", "gating_disc/training/0_3_громила.mp3", "gating_disc/training/0_4_школота.mp3", "gating_sem/training/0_1_сахар.mp3", "gating_sem/training/0_2_коса.mp3", "gating_sem/training/0_3_парта.mp3", "gating_sem/training/0_4_огонь.mp3"];
var fileSrcArray = ["gating_disc/sound/1_1_мошенник.mp3", "gating_disc/sound/1_2_мажор.mp3", "gating_disc/sound/2_2_пахан.mp3", "gating_disc/sound/2_4_радист.mp3", "gating_disc/sound/3_1_юрист.mp3", "gating_disc/sound/3_3_дохляк.mp3", "gating_disc/sound/4_1_метрдотель.mp3", "gating_disc/sound/4_2_стукач.mp3", "gating_disc/sound/5_2_барыга.mp3", "gating_disc/sound/5_4_чиновник.mp3", "gating_disc/sound/6_1_разведчики.mp3", "gating_disc/sound/6_2_гопники.mp3", "gating_disc/sound/7_1_коллеги.mp3", "gating_disc/sound/7_2_кореша.mp3", "gating_disc/sound/8_1_молодежь.mp3", "gating_disc/sound/8_2_дембеля.mp3", "gating_disc/sound/9_3_молокосос.mp3", "gating_disc/sound/9_4_юноша.mp3", "gating_disc/sound/10_2_водила.mp3", "gating_disc/sound/10_4_ветеран.mp3", "gating_disc/sound/11_2_лузеры.mp3", "gating_disc/sound/11_4_неудачники.mp3", "gating_disc/sound/12_1_студенты.mp3", "gating_disc/sound/12_2_ботаны.mp3", "gating_disc/sound/13_1_доцент.mp3", "gating_disc/sound/13_3_препод.mp3", "gating_disc/sound/14_1_ведущий.mp3", "gating_disc/sound/14_3_бомжара.mp3", "gating_disc/sound/15_2_нарик.mp3", "gating_disc/sound/15_4_ректор.mp3", "gating_disc/sound/16_3_курва.mp3", "gating_disc/sound/16_4_гостья.mp3", "gating_disc/sound/17_2_чувак.mp3", "gating_disc/sound/17_4_посол.mp3", "gating_disc/sound/18_2_телка.mp3", "gating_disc/sound/18_4_дама.mp3", "gating_disc/sound/19_1_спортсмен.mp3", "gating_disc/sound/19_2_качок.mp3", "gating_disc/sound/20_1_банкир.mp3", "gating_disc/sound/20_2_жмот.mp3", "gating_disc/sound/21_1_графиня.mp3", "gating_disc/sound/21_2_чувиха.mp3", "gating_disc/sound/22_1_лектор.mp3", "gating_disc/sound/22_2_трепач.mp3", "gating_disc/sound/23_1_абитуриент.mp3", "gating_disc/sound/23_2_абитура.mp3", "gating_disc/sound/24_1_флорист.mp3", "gating_disc/sound/24_2_дружбан.mp3", "gating_disc/sound/25_1_снайпер.mp3", "gating_disc/sound/25_2_мазила.mp3", "gating_disc/sound/26_1_бездельник.mp3", "gating_disc/sound/26_2_сачок.mp3", "gating_disc/sound/27_1_гурман.mp3", "gating_disc/sound/27_2_ханыга.mp3", "gating_disc/sound/28_2_пофигист.mp3", "gating_disc/sound/28_4_дипломат.mp3", "gating_disc/sound/29_2_герла.mp3", "gating_disc/sound/29_4_модель.mp3", "gating_disc/sound/30_1_дворецкий.mp3", "gating_disc/sound/30_2_шизики.mp3", "gating_disc/sound/31_1_партнер.mp3", "gating_disc/sound/31_2_браток.mp3", "gating_disc/sound/32_2_первокур.mp3", "gating_disc/sound/32_4_учащийся.mp3", "gating_disc/sound/33_2_зубрила.mp3", "gating_disc/sound/33_4_отличник.mp3", "gating_disc/sound/34_1_диктор.mp3", "gating_disc/sound/34_3_тормоз.mp3", "gating_disc/sound/35_1_особа.mp3", "gating_disc/sound/35_3_шалава.mp3", "gating_disc/sound/36_1_кузен.mp3", "gating_disc/sound/36_2_братан.mp3", "gating_disc/sound/37_1_клерки.mp3", "gating_disc/sound/37_2_пацаны.mp3", "gating_disc/sound/38_1_программист.mp3", "gating_disc/sound/38_3_лохоклерк.mp3", "gating_disc/sound/39_3_водила.mp3", "gating_disc/sound/39_4_кондуктор.mp3", "gating_disc/sound/40_2_грымза.mp3", "gating_disc/sound/40_4_судья.mp3", "gating_sem/sound/1_2_режим.mp3", "gating_sem/sound/1_4_экран.mp3", "gating_sem/sound/2_2_газон.mp3", "gating_sem/sound/2_4_статью.mp3", "gating_sem/sound/3_2_металл.mp3", "gating_sem/sound/3_4_допрос.mp3", "gating_sem/sound/4_1_сигнал.mp3", "gating_sem/sound/4_3_подвал.mp3", "gating_sem/sound/5_1_приказ.mp3", "gating_sem/sound/5_2_стакан.mp3", "gating_sem/sound/6_3_словарь.mp3", "gating_sem/sound/6_4_браслет.mp3", "gating_sem/sound/7_3_баян.mp3", "gating_sem/sound/7_4_овес.mp3", "gating_sem/sound/8_1_банты.mp3", "gating_sem/sound/8_3_зонты.mp3", "gating_sem/sound/9_3_нарыв.mp3", "gating_sem/sound/9_4_руду.mp3", "gating_sem/sound/10_3_асфальт.mp3", "gating_sem/sound/10_4_побег.mp3", "gating_sem/sound/11_2_абзац.mp3", "gating_sem/sound/11_4_коржи.mp3", "gating_sem/sound/12_2_арбуз.mp3", "gating_sem/sound/12_4_шарфы.mp3", "gating_sem/sound/13_2_совок.mp3", "gating_sem/sound/13_4_вираж.mp3", "gating_sem/sound/14_2_раствор.mp3", "gating_sem/sound/14_4_загон.mp3", "gating_sem/sound/15_2_зачет.mp3", "gating_sem/sound/15_4_жилет.mp3", "gating_sem/sound/16_2_полет.mp3", "gating_sem/sound/16_4_багаж.mp3", "gating_sem/sound/17_2_пятно.mp3", "gating_sem/sound/17_4_шкафы.mp3", "gating_sem/sound/18_2_опрос.mp3", "gating_sem/sound/18_4_чулан.mp3", "gating_sem/sound/19_2_налог.mp3", "gating_sem/sound/19_4_визит.mp3", "gating_sem/sound/20_2_халат.mp3", "gating_sem/sound/20_4_ружье.mp3", "gating_sem/sound/21_2_канал.mp3", "gating_sem/sound/21_4_товар.mp3", "gating_sem/sound/22_2_район.mp3", "gating_sem/sound/22_4_кулак.mp3", "gating_sem/sound/23_2_сирень.mp3", "gating_sem/sound/23_4_рекорд.mp3", "gating_sem/sound/24_2_фонтан.mp3", "gating_sem/sound/24_4_сустав.mp3", "gating_sem/sound/25_2_флакон.mp3", "gating_sem/sound/25_4_погром.mp3", "gating_sem/sound/26_2_отвар.mp3", "gating_sem/sound/26_4_карниз.mp3", "gating_sem/sound/27_2_размер.mp3", "gating_sem/sound/27_4_морковь.mp3", "gating_sem/sound/28_2_очки.mp3", "gating_sem/sound/28_4_ущерб.mp3", "gating_sem/sound/29_2_собор.mp3", "gating_sem/sound/29_4_устав.mp3", "gating_sem/sound/30_2_кредит.mp3", "gating_sem/sound/30_4_тропу.mp3", "gating_sem/sound/31_2_тоску.mp3", "gating_sem/sound/31_4_чехол.mp3", "gating_sem/sound/32_2_носок.mp3", "gating_sem/sound/32_4_билет.mp3", "gating_sem/sound/33_2_отчет.mp3", "gating_sem/sound/33_4_диван.mp3", "gating_sem/sound/34_3_корабль.mp3", "gating_sem/sound/34_4_прием.mp3", "gating_sem/sound/35_2_мешок.mp3", "gating_sem/sound/35_4_пароль.mp3", "gating_sem/sound/36_2_следы.mp3", "gating_sem/sound/36_4_болты.mp3", "gating_sem/sound/37_2_фасоль.mp3", "gating_sem/sound/37_4_замер.mp3", "gating_sem/sound/38_2_топор.mp3", "gating_sem/sound/38_4_компот.mp3", "gating_sem/sound/39_2_кольцо.mp3", "gating_sem/sound/39_4_альбом.mp3", "gating_sem/sound/40_2_гараж.mp3", "gating_sem/sound/40_4_рассказ.mp3"];

test_howl_obj = new Howl({src: ["gating_disc/sound/14_1_ведущий.mp3"],  autoplay: false, sprite: {clip: [0,250]}});


var howls_index = 0; // номер текущего объекта
var training_howls = [];
var experiment_howls = [];
fileTrainingSrcArray.map(function (x){
    training_howls.push(new Howl({src: [x],  autoplay: false, sprite: {clip: [0,250]}}));
  }); // считай звуковые файлы и заверни их в объекты, которые можно проигрывать по кусочкам: howlObj.play('clip');

fileSrcArray.map(function(x) {
      experiment_howls.push(new Howl({src: [x],  autoplay: false, sprite: {clip: [0,250]}}));
  });
var howls = training_howls; // указатель на текущий массив, чтобы не дублировать код для обоих.
var howlObj = howls[howls_index]; // текущий звуковой объект в массиве

function switchFromTrainingToExpList(){

  $('#trainingPage').hide(); /* скрыть trainingPage */
  document.getElementById('consentPage').style.cssText="display: block"; /* скрыть кнопку Play */
  training = false;

  howls = experiment_howls;
  howls_index = 0;
  howlObj = howls[howls_index];
  howlReset();
}

/* операции, которые нам нужны */



function howlPlay(){ /* дайте следущее слово */
    howlObj.play("clip");
    howlObj.on("end",
      function() {
      if (howlObj._sprite.clip[1] >= 1000*howlObj.duration()){
        audioFinished = true;
        displayFlag("end_flag");
      }
      else {
        displayFlag("clip_end_flag");
      }}

    );
}

function howlGrow(){ /* увеличить звучащий сегмент */
    howlObj._sprite.clip[1] += 50;
    displayCurrentDuration();
    }
function increment_clip_length(howl_object){
    howl_object._sprite.clip[1] += 50;
}

function howlReset(){ /* сбросить длину звучащего сегмента на 250 мс */
    howlObj._sprite.clip[1] = 250;
    audioFinished = false;
    displayCurrentDuration();
    }
function normalizeAnswer(s){
    return(s.trim().toLowerCase().replace(/ё/gi, "е"));
    }
function howlNext(){ /* следущее слово, длина 250  */
    if(howls.length <= howls_index) {
      // alert("нет следующего слова!");
      if(training){
        switchFromTrainingToExpList();
      }
      else {
        submitResults();
      }
    }
    else{
      howls_index += 1;
      howlObj = howls[howls_index];//  howl_rotate_clip();
      howlReset();
      rightAnswer = normalizeAnswer(howlObj._src.match( /_\d+_(.*)\./i )[1]);
      //displayWordsRemaining();
      hideFlag("end_flag");
      hideFlag("clip_end_flag");
      displayCurrentDuration();
    }
  // }
}

function submitResults(){

  document.getElementById('wordInputDiv').style.cssText="display: none"; /* скрыть инпут слов */
  $('#text').html("Эксперимент окончен, спасибо за участие! Пожалуйста, не рассказывайте никому о содержании эксперимента до его завершения."); /* изменить текст */
  $('#wordsLeftCounterText').hide(); /* скрыть wordsLeftCounterText */
  $('#playButton').hide(); /* скрыть кнопку Play */

  var i, j, textLine = "";
  var convertedArray = [];
  for(var i = 0; i < inputArray.length; i++){convertedArray.push(inputArray[i]);}
  for (i = 0; i < convertedArray.length; i++) {
    textLine = convertedArray[i].join(";");
    fileText += textLine + "\n";
  };
  var userDataCsv=""; $.each(userData, function(k,v) {userDataCsv+=k+":"+v+"; \n";});
  alert("A resounding success!");
  //createAndUploadCSVFile(fileText, userData.userName+" answers.csv");
  //createAndUploadCSVFile(userDataCsv, userData.userName+" user data.csv");
}



  // howlObj.play('clip');



/* status display */
function displayWordsRemaining() {
  //alert("слов осталось: " + (howls.length-howls_index));
    document.getElementById('words_remaining').innerText=howls.length-howls_index;

  if (training) {
    document.getElementById('words_remaining').innerText=howls.length-howls_index;
    document.getElementById("trainingWordsLeftCounterText").innerText = "Слов осталось: " + (howls.length - howls_index);

  }
  else {
    document.getElementById('words_remaining').innerText=howls.length-howls_index;
    document.getElementById('wordsLeftCounterText').innerText = "Слов осталось: " + (howls.length - howls_index);
  }
}
function displayFlag(flag){
  document.getElementById(flag).style.cssText="display:block";
}
function displayEndFlag(){
  alert("проиграли слово до конца").
  document.getElementById('end_flag').style.cssText="display: block";
}
function hideFlag(flag){

  document.getElementById(flag).style.cssText="display:none";
}

function displayCurrentDuration() {
  document.getElementById('clip_duration').innerText=howlObj._sprite.clip[1];
  document.getElementById('total_sample_duration').innerText=howlObj.duration().toFixed(2);
  document.getElementById('sample_name').innerText=howlObj._src;

  //displayWordsRemaining(); // where else to chuck this?
}
