var nb_sans_actualisation = 0;
var ajax_fail = false;     
var base_url_xhr = 'http://bar.wonaruto.com/';    

function postCommentaire () {

        var formulaire = document.getElementById("bar-commentaire");

        if(formulaire.texte.value == "" || formulaire.texte.value == 'undefined') {
                                                                     
                aff_menu_div('erreur-comment');
                document.getElementById('erreur-comment').innerHTML = 'Vous avez oublié d\'entrer du texte.';       
            
                caff_menu_div('ok-comment');
                
                return false;
                
        }
                     
        else {

                nb_sans_actualisation++;
                if(nb_sans_actualisation >= 5) return true;

                if(window.XMLHttpRequest || window.ActiveXObject) {  // Ya de l'ajax :o
                }
                else { // XMLHttpRequest non supporté par le navigateur
                  return true;
                }
                   
                
                var xhr = new Xhr("post-ajax/", 'ok-comment', '<img src="http://images.wonaruto.com/loading.gif" alt="Chargement" />');
                xhr.data = "subid="+encodeURIComponent(formulaire.subid.value)+"&redirect="+encodeURIComponent(formulaire.redirect.value)+"&texte="+encodeURIComponent(formulaire.texte.value)+"&action=add_comm";
                xhr.method = 'POST';
                xhr.actDone = function() {

                        resultat = this.connector.responseText;         

                        if(resultat == 1 || resultat == 2 || resultat == 3) {       

                          if(resultat == 1) { document.getElementById('erreur-comment').innerHTML = 'Vous avez oublié de remplir le champ texte.'; }
                          else if(resultat == 2) { document.getElementById('erreur-comment').innerHTML = 'Vous ne pouvez pas encore reposter de commentaire ici.'; }
                          else if(resultat == 3) { document.getElementById('erreur-comment').innerHTML = 'Votre message est incorrecte.'; }
                          else { document.getElementById('erreur-comment').innerHTML = 'Erreur, veuillez réessayer.'; }
                
                          caff_menu_div('ok-comment'); 
                          aff_menu_div('erreur-comment');   

                        }
                        else {
                        
                          document.getElementById('ok-comment').innerHTML = 'Votre message a bien été posté !';
                          document.getElementById('aff-commentaires').innerHTML = resultat;
                          formulaire.texte.value = "";
                          
                        }

                };
                xhr.exec();
                aff_menu_div('ok-comment'); 
                caff_menu_div('erreur-comment'); 
                
                return false;
                
        }
}                                                