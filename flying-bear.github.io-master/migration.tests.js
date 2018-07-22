QUnit.test( "howlGrow respects sample duration", function( assert ) {
  var duration_before = howlObj.duration();
  howlGrow();
  var duration_after = howlObj.duration();
  assert.equal( duration_before, duration_after, "howlGrowl should keep sample duration the same" );
});

QUnit.test( "howlGrow increments clip duration", function( assert ) {
  var duration_before = howlObj._sprite.clip[1];
  howlGrow();
  var duration_after = howlObj._sprite.clip[1];
  assert.equal( duration_before+50, duration_after, "howlGrowl should increment clip duration by 50 ms" );
});
