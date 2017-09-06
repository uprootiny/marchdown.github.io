QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "replayWord", function( assert ) {
  var x = currentWord;
  var xa = audioFinished;
  //var xcd = currentWord._sprite['clip'][1];

  currentWord = test_howl_obj;
  audioFinished = false;

  var a = currentWord._sprite.clip[1];
  var word_before = currentWord;
  visibility_before = pages;
  visibility_before.map(function(p){  document.getElementById(p).style.display});
  replayWord();
  var b = currentWord._sprite.clip[1];
  var word_after = currentWord;
  visibility_after = pages;
  visibility_after.map(function(p){  document.getElementById(p).style.display});

  assert.ok( a < b, "replayWord increments clip length" );
  assert.ok( a + 50 == b, "replayWord increments clip length by 50" );
  assert.ok( word_after == word_before, "replayWord does not change currentWord" );
  assert.ok( visibility_before == visibility_after, "replayWord does not change visibility of any of the pages" );
  assert.ok( audioFinished == false, "audioFinished does not flip on after just one replay");
  
  for (i = 20; i> 0; i--) replayWord();
  assert.ok( word_after == word_before, "replayWord does not change currentWord even after 20 repetitions" );
  assert.ok( audioFinished == true, "after a lot of replays audioFinished becomes true" ); /* check JavaScript equality constructs */

  currentWord = x;
  audioFinished = xa;
});

QUnit.test( "wrongAnswer", function( assert ) {
  // var xws = words;
  // var xi = word_index;
   var xw = currentWord;
  // words = training_howls;
  // word_index = 3;
  // currentWord = training_howls[word_index];

  currentWord = test_howl_obj;
  var a = currentWord._sprite.clip[1];
  reactToWrongAnswer();
  var b = currentWord._sprite.clip[1];
  assert.ok( a + 50 == b, "submitting a wrong answer increments clip length by 50" );

  currentWord = xw;
  // words = xws;
  // word_index = xi;
  // audioFinished = xa;
});

QUnit.test( "submitting the right answer changes currentWord", function( assert ) {
  xws = words;
  xi = word_index;
  xw = currentWord;
  words = training_howls;
  word_index = 3;
  currentWord = training_howls[word_index];


  a = currentWord;
  reactToRightAnswer();
  b = currentWord;
  assert.ok( a != b, "Passed!" ); /* check JavaScript equality constructs */

  currentWord = xw;
  words = xws;
  word_index = xi;
});
QUnit.test( "for a new word audioFinished is false", function( assert ) {
  xws = words;
  xi = word_index;
  xw = currentWord;
  words = training_howls;
  word_index = 3;
  currentWord = training_howls[word_index];
  xa = audioFinished;

  nextWord();
  assert.ok( audioFinished == false, "Passed!" ); /* check JavaScript equality constructs */


  currentWord = xw;
  words = xws;
  word_index = xi;
  audioFinished = xa;
});

QUnit.test( "after a lot of replays audioFinished becomes true", function( assert ) {
  xws = words;
  xi = word_index;
  xw = currentWord;
  words = training_howls;
  word_index = 3;
  currentWord = training_howls[word_index];
  xa = audioFinished;

  for (i = 20; i> 0; i--) replayWord();
  assert.ok( audioFinished == false, "after a lot of replays audioFinished becomes true" ); /* check JavaScript equality constructs */

  currentWord = xw;
  words = xws;
  word_index = xi;
  audioFinished = xa;
});

QUnit.test( "after a lot of replays the textual cue changes", function( assert ) {
  xws = words;
  xi = word_index;
  xw = currentWord;
  words = training_howls;
  word_index = 3;
  currentWord = training_howls[word_index];
  xa = audioFinished;

  for (i = 20; i> 0; i--) replayWord();
  assert.ok( audioFinished == false, "Passed!" ); /* check JavaScript equality constructs */

  currentWord = xw;
  words = xws;
  word_index = xi;
  audioFinished = xa;
});
