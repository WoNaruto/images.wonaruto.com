/* 
 * gestion du windows onload 
*/

    won_popup_array_onload = new Array();                     

    function won_popup_onload_add(fx) {

      var i = won_popup_array_onload.length;
      won_popup_array_onload[i] = fx;                                        

    }

    function won_popup_onload() {       

      for(var i = 0, longueur = won_popup_array_onload.length; i < longueur; i++) {
      
        var str_f = won_popup_array_onload[i]+'()';     
                          
        setTimeout(str_f, 1);  
      
      }

    }    


/* 
 * Change l'url de la fenêtre ouvrante et ferme la fenêtre courante
 * renvoie true si ok
*/

function jump_to(url) {
        
        if(opener) { 
          
            opener.document.location.href = url;
            window.close();
            
        }
        else if(window.parent) {
        
            window.parent.location.href = url;               
        
        }
        
        return true;
        
}