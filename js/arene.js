function decompte(minute,seconde) {
  if(minute == 0 && seconde == 0) {
    document.getElementById('time').innerHTML = '<b>OK</b>';
  }
  else {
    aff = minute+':';
    if(seconde < 10) {
      aff = aff+'0'+seconde;
    }
    else {
      aff = aff+seconde;
    }
    document.getElementById('time').innerHTML = aff;
    if(seconde == 0) {
      seconde = 59;
      minute = minute - 1;
    }
    else {
      seconde = seconde - 1;
    }
    tempo = setTimeout("decompte("+minute+","+seconde+")", 1000)
  }
}