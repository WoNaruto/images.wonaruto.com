var je_nb_check = 2;
var je_count_check = 0;
var je_count = 0;
var je_execution_nb_signe = 0;
var je_execution_signes = '';
var je_jutsus_check = '';

var js_launched = false;

function ChangerContenu(id, texte) {

  document.getElementById(id).innerHTML = texte;

}

function je_start_timer() {

    setTimeout("je_start()", 2500);

}

function je_sceaux() {

    if(je_count > 0) hide_element('je_sceaux_'+(je_count - 1));
    display_element('je_sceaux_'+(je_count - 1));

}

function je_start() {

    if(js_launched) return;
    js_launched = true;

    display_element('je_sceaux');
    
    je_check();
    je_next();       

}         


function je_next() {

  if(je_nb_jutsus > je_count && typeof je_array_jutsus[je_count] != 'undefined') {

    ChangerContenu('je_jutsu', je_array_jutsus[je_count]);  
      
    je_count++; 
    
    if(je_count - je_nb_check > je_count_check) je_check();
    
  }           
  else je_finish();                      

}


function je_add_signe(id) {                

  je_execution_nb_signe++;
  je_execution_signes+= (je_execution_signes == '') ? id : ','+id;
  
  document.getElementById("je_signes").innerHTML+= ' <span class="class_sign_'+id+'" style="float: left;"/> ';
  
  setTimeout("je_valide_jutsu("+je_count+", "+je_execution_nb_signe+")", 1500);           

}

function je_validate() {
  
  je_valide_jutsu(je_count, je_execution_nb_signe);
  
}

function je_cancel() {

  je_execution_nb_signe = 0;
  je_execution_signes = '';   
  
  document.getElementById("je_signes").innerHTML = '';     
  
}

function je_valide_jutsu(id_jutsu, id_signe) {

  if(je_execution_nb_signe == id_signe && je_count == id_jutsu && je_execution_signes != '') {
  
    je_execution_nb_signe++;

    je_jutsus_check+= (je_jutsus_check == '') ? je_count+"-"+je_execution_signes : '|'+je_count+"-"+je_execution_signes;
    
    je_cancel();
    je_next();

  }                                                              

}



function je_finish() {

  hide_element('je_sceaux');

  url = "membres_defis.php?id_jeu=3&mode=end&jutsus="+je_jutsus_check; 
  
  ChangerContenu('je_jutsu', '<b><a href="'+url+'">Terminer le défis</a></b>');                    

  eval("self.location='"+url+"'");       

}


function je_check() {

  url = '';

  if(je_count > 0) {     
  
    var temp_check = je_jutsus_check;
    je_jutsus_check = '';
    
    je_nb_check+= temp_check.split("\|").length;
      
    url = "membres_defis.php?id_jeu=3&mode=continue&jutsus="+temp_check;         

  }

  else {

    url = "membres_defis.php?id_jeu=3&mode=continue";

  }  
  
  url+= "&rand="+Math.random(1000);                                                        

  base_url_xhr = 'http://www.wonaruto.com/';
  var xhr = new Xhr(url, 'load', "<img src=\"http://images.wonaruto.com/loading.gif\" alt=\"Chargement\" />");

  xhr.actDone = function() {

    resultat = this.connector.responseText;  
    
    if(resultat == 2 || resultat == '2') {

      hide_element('je_sceaux');

      url = 'membres_defis.php?id_jeu=3&mode=end';
      
      ChangerContenu('je_jutsu', '<i>Redirection en cours... <a href="'+url+'">Voir les Résultats</a></i>');
      
      eval("self.location='"+url+"'");           

    }  

  };

  xhr.exec();
  return false;

}      