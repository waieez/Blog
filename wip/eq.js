function blowEQ () {
  var count = 0;
  while (true) {
    console.log(count++)
    setTimeout(function(){
      console.log('hi');
    });
  }
}

blowEQ();