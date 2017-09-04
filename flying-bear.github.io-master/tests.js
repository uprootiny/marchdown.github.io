QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "replayWord increments clip length", function( assert ) {
  x = currentWord;
  currentWord = test_howl_obj;
  a = currentWord._sprite.clip[1];
  replayWord();
  b = currentWord._sprite.clip[1];
  assert.ok( a < b, "Passed!" );
  currentWord = x;
});

QUnit.test( "replayWord increments clip length by 50", function( assert ) {
  var x = currentWord;
  currentWord = test_howl_obj;
  var a = currentWord._sprite.clip[1];
  replayWord();
  var b = currentWord._sprite.clip[1];
  assert.ok( a + 50 == b, "Passed!" );
  currentWord = x;
});

QUnit.test( "replayWord does not change currentWord", function( assert ) {
  var x = currentWord;
  currentWord = test_howl_obj;
  var a = currentWord;
  replayWord();
  var b = currentWord;
  assert.ok( a == b, "Passed!" );
  currentWord = x;
});

QUnit.test( "replayWord does not change visibility of any of the pages", function( assert ) {
  x = currentWord;
  currentWord = test_howl_obj;

  visibility_before = pages;
  visibility_before.map(function(p){  document.getElementById(p).style.display});
  replayWord();
  visibility_after = pages;
  visibility_after.map(function(p){  document.getElementById(p).style.display});
  assert.ok( visibility_before == visibility_after, "Passed!" );

  currentWord = x;
});

QUnit.test( "submitting a wrong answer increments clip length by 50", function( assert ) {
  var xws = words;
  var xi = word_index;
  var xw = currentWord;
  words = training_howls;
  word_index = 3;
  currentWord = training_howls[word_index];
  var xa = audioFinished;


  currentWord = test_howl_obj;
  var a = currentWord._sprite.clip[1];
  reactToWrongAnswer();
  var b = currentWord._sprite.clip[1];
  assert.ok( a + 50 == b, "Passed!" );

  currentWord = xw;
  words = xws;
  word_index = xi;
  audioFinished = xa;
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
  assert.ok( audioFinished == false, "Passed!" ); /* check JavaScript equality constructs */

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
