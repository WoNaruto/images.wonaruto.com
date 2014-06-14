/*
* Javascripts pour les missions 
*/

  function missions_c_decompte(time, type) {
  
    if(time > 0) {
    
      document.getElementById("missions_c_countdown").innerHTML = 'Ce message s\'auto détruira dans '+time+' secondes.';   
      setTimeout("missions_c_decompte("+(time - 1)+", '"+type+"')", 1000);
      
    }
    else {
    
      if(type == 'recherche') start_mission_c_recherche();
      else start_mission_c_jutsu();     
      
    }
    
  }

  function start_mission_c_recherche() {
  
    caff_menu_div('missions_c_texte');
    aff_menu_div('missions_c_images');
    
  }

  function start_mission_c_jutsu() {
  
    caff_menu_div('missions_c_texte');
    aff_menu_div('missions_c_signes');
    
  }
  
  
  
/*
* Fonction des jutsus
*/

  var je_execution_nb_signe = 0;
  var je_execution_signes = '';

  // On vient d'appuyer sur un signe :)
  function je_add_signe(id) {                

    je_execution_nb_signe++;
    je_execution_signes+= (je_execution_signes == '') ? id : ','+id;
    
    document.getElementById("je_signes").innerHTML+= ' <img width="25" height="30" src="http://images.wonaruto.com/a/s'+id+'.jpg" class="dossier" /> ';  
    
    setTimeout("je_valide_jutsu("+je_execution_nb_signe+")", 2000);           

  }
    
  // On a appuyé sur la validation
  function je_validate() {
    
    je_valide_jutsu(je_execution_nb_signe);
    
  }

  // On annule
  function je_cancel() {

    je_execution_nb_signe = 0;
    je_execution_signes = '';   
    
    document.getElementById("je_signes").innerHTML = '';     
    
  }

  // On valide
  function je_valide_jutsu(id_signes) {

    if(je_execution_nb_signe == id_signes) {
    
      je_execution_nb_signe = 0;

      url = 'membres_missions_c.php?jutsu='+je_execution_signes;
      
      eval("self.location='"+url+"'");   

    }                                                              

  }