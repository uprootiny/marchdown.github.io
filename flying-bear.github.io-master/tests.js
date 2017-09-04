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
  x = currentWord;
  currentWord = test_howl_obj;
  a = currentWord._sprite.clip[1];
  replayWord();
  b = currentWord._sprite.clip[1];
  assert.ok( a + 50 == b, "Passed!" );
  currentWord = x;
});

QUnit.test( "replayWord does not change currentWord", function( assert ) {
  x = currentWord;
  currentWord = test_howl_obj;
  a = currentWord;
  replayWord();
  b = currentWord;
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
