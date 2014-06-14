/* 
 * gestion du windows onload 
*/

    won_array_onload = new Array();

    function won_windows_onload_add(fx) {

      var i = won_array_onload.length;
      won_array_onload[i] = fx;                                        

    }

    function won_windows_onload() {       

      for(var i = 0, longueur = won_array_onload.length; i < longueur; i++) {
      
        var str_f = won_array_onload[i]+'()';     
                          
        setTimeout(str_f, 1);  
      
      }

    }          

/* Fonction v5 */
    
    function popupyes(page,width,height) {
    
        window.open(page,'won_popup','width='+width+',height='+height+',toolbar=false,scrollbars=yes');
    
    }
    
    function popupno(page,width,height) {
    
        window.open(page,'won_popup','width='+width+',height='+height+',toolbar=false,scrollbars=no');
    
    }

    function aff_div(div) {

        if(document.layers) {           //NN4+
            if (document.layers[div].display == "none") { iState = 1; }
            else { iState = 0; }
            document.layers[div].display = iState ? "" : "none";
        }
        else if(document.getElementById) {          //gecko(NN6) + IE 5+
            var obj = document.getElementById(div);
            if(obj.style.display == "none") {  iState = 1;   }
            else { iState = 0; }
            obj.style.display = iState ? "" : "none";
        }
        else if(document.all) {       // IE 4
            if (document.all[div].style.display == "none") { iState = 1; }
            else { iState = 0; }
            document.all[div].style.display = iState ? "" : "none";
        }

    }

    function aff_menu_div(div) {

        if(document.layers) {           //NN4+
            document.layers[div].display = "";
        }
        else if(document.getElementById) {          //gecko(NN6) + IE 5+
            var obj = document.getElementById(div);
            obj.style.display = "";
        }
        else if(document.all) {       // IE 4
            document.all[div].style.display = "";
        }

    }


    function caff_menu_div(div) {

        if(document.layers) {           //NN4+
            document.layers[div].display = "none";
        }
        else if(document.getElementById) {          //gecko(NN6) + IE 5+
            var obj = document.getElementById(div);
            obj.style.display = "none";
        }
        else if(document.all) {       // IE 4
            document.all[div].style.display = "none";
        }

    }

    function display_element(div) {

        if(document.layers) {           //NN4+
            document.layers[div].display = "";
        }
        else if(document.getElementById) {          //gecko(NN6) + IE 5+
            var obj = document.getElementById(div);
            obj.style.display = "";
        }
        else if(document.all) {       // IE 4
            document.all[div].style.display = "";
        }

    }


    function hide_element(div) {

        if(document.layers) {           //NN4+
            document.layers[div].display = "none";
        }
        else if(document.getElementById) {          //gecko(NN6) + IE 5+
            var obj = document.getElementById(div);
            obj.style.display = "none";
        }
        else if(document.all) {       // IE 4
            document.all[div].style.display = "none";
        }

    }

    function change_element_display(div) {

        if(document.layers) {           //NN4+
            if (document.layers[div].display == "none") { iState = 1; }
            else { iState = 0; }
            document.layers[div].display = iState ? "" : "none";
        }
        else if(document.getElementById) {          //gecko(NN6) + IE 5+
            var obj = document.getElementById(div);
            if(obj.style.display == "none") {  iState = 1;   }
            else { iState = 0; }
            obj.style.display = iState ? "" : "none";
        }
        else if(document.all) {       // IE 4
            if (document.all[div].style.display == "none") { iState = 1; }
            else { iState = 0; }
            document.all[div].style.display = iState ? "" : "none";
        }

        return true;

    }
    
    
    function change_overflow(elt, hidden, height) {
    
      elt.style.overflow = (!hidden)? "visible" : "hidden";
      if(height) elt.style.height = height+'px';
      else elt.style.height = 'auto';
    
    }
      
/*
 * S�curit� 
*/ 

    function js_htmlentities(texte) {
            
      texte = texte.replace(/</g, "&lt;") ;
      texte = texte.replace(/>/g, "&gt;") ; 
    
      return texte;
    
    }
      
/*
 * Fonctions de gestions des formulaires
*/
           
    function add_pseudo(data) {

      // On traite d'abord
      var str = data;
      var re = /-quote-/gi; // g=global, i=case-insensitive
      var results = str.replace(re, '"');

      // On rajoute des sauts de lignes ?
      if(document.commentaire.texte.value != '' && document.commentaire.texte.value != 'Votre commentaire...') {
        document.commentaire.texte.value+="\n\n"+results;
      }
      else { document.commentaire.texte.value=results; }

      // On d�place le navigateur                         
      var canvasTop = document.commentaire.offsetTop;
      window.scrollTo(0, canvasTop);
      document.commentaire.texte.focus();

    }

    /*
    * Renvoie true si le message est pas bon, false si c'est bon !
    */ 
    function form_verif(form, initial_value) {         
      
      //
      // V�rifions les choses...    
      
        var str = form.texte.value;
        
        if(str == initial_value || str == '') {

          aff_menu_div('erreur-comment');
          document.getElementById('erreur-comment').innerHTML = 'Votre message est trop court';       
      
          if(document.getElementById('ok-comment')) caff_menu_div('ok-comment');
      
          return true;
        
        } 
        
        caff_menu_div('submit-comment');
        aff_menu_div('loader-comment');
        return false;        

    }
    
    /*
     * Raz le contenu du textearea / input
     * argument_1 = this, argument_2 = text initial
    */
    function form_raz(txt, initial_value) {

      if(txt.value == initial_value) txt.value = '';
      
    }           


/*
 * Fonctions de gestion des menus de la V6
*/

    function v6_is_active_menu_mobile(id) {

        var temp = document.getElementById(id).innerHTML;

        return (temp.indexOf("actif") !== -1);

    }


    function v6_aff_menu_mobile(id) {

      for (var type in v6_array_menus) {
          if(document.getElementById('liste-menu-'+type+"-m")) document.getElementById('liste-menu-'+type+"-m").innerHTML = v6_generate_menu_content(type);
      }

      if(v6_is_active_menu_mobile("onglet-menu")) {

          document.getElementById("onglet-menu").innerHTML = '<span></span>';
          document.getElementById(id).className = '';

      }

      else {

          document.getElementById("onglet-menu").innerHTML = '<span class="actif"></span>';
          document.getElementById(id).className = 'overlay';

      }

      return true;

    }

    function v6_aff_menu_contextuel_mobile(id) {

        if(v6_is_active_menu_mobile("onglet-menu-contextuel")) {

            document.getElementById("onglet-menu-contextuel").innerHTML = '<span></span>';
            document.getElementById(id).className = '';

        }

        else {

            document.getElementById("onglet-menu-contextuel").innerHTML = '<span class="actif"></span>';
            document.getElementById(id).className = 'overlay';

        }

        return true;

    }


    v6_array_menus = new Object();
    v6_array_menus['naruto'] = 'l|naruto/anime/|Anime||l|naruto/avatars/|Avatars||l|membres_br.php|Battle Royale||l|naruto/conventions/|Conventions||l|naruto/dossiers/|Dossiers||l|films.php|Films||l|hokagefight.php|Hokage Fight||l|naruto/jeuxvideo/|Jeux Vid&eacute;o||l|naruto/jutsus/|Jutsus||l|masashi_kishimoto.php|Masashi Kishimoto||l|naruto/personnages/|Personnages||l|naruto/raisons/|1000 Raisons||l|naruto/rapports-force/|Rapports de Force||l|naruto/tomes/|R&eacute;sum&eacute;s';
    v6_array_menus['village'] = 'l|membres_missions.php|Halle des Missions||l|membres_defis.php|Maisons des D&eacute;fis||l|membres_nfc.php|Naruto Fight Club||s||l|membres_academie.php|Acad&eacute;mie||l|membres_archives.php|Archives||l|membres_arene.php|Ar&egrave;ne||l|membres_boutique.php|Boutiques||l|membres_conseil.php|Conseil du Village||l|membres_entrainement.php|Salle d\'Entra&icirc;nement';
    v6_array_menus['wonde'] = 'l|membres_friends.php|Amis||l|membres_bar.php|Bar des Ninjas||l|membres_forum.php|Forum||s||l|membres_equipe.php|Gestion Equipe||l|faq.php|F.A.Q.||l|membres/liste/|Liste des Membres||l|membres_mp.php|Messages Priv&eacute;s||l|membres/raisons/|1000 raisons||r|membres_liste_search.php|get|pseudo|Pseudo...';
    v6_array_menus['clan'] = 'l|clans_tour.php|Conseil des Clans||l|membres/clans/|Liste des Clans||l|membres/clans/tour/|Tour des Combats||l|membres/clans/recrute/|Recrutement||r|clans_search.php|get|nom|Clan...';
    v6_array_menus['fanarts'] = 'l|fanarts/favoris/|Favoris||l|fanarts/galeries/|Galeries||l|fanarts/categories/|Galeries &agrave; Th&egrave;me||l|fanarts/personnages/|Galeries de Personnages||l|fanarts/favs/|S&eacute;l&eacute;ctionn&eacute;s||f|membres_options.php|Cr�er sa galerie';
    v6_array_menus['fanarts-2'] = 'l|arts_post.php|Ajouter un Art||l|arts_admin.php|Modifier un Art||l|arts_show.php|Montrer ses Arts||l|arts_delete.php|Supprimer un Art||l|arts_comments.php|Ses commentaires||s||l|fanarts/favoris/|Favoris||l|fanarts/galeries/|Galeries||l|fanarts/categories/|Galeries &agrave; Th&egrave;me||l|fanarts/personnages/|Galeries de Personnages||l|fanarts/favs/|S&eacute;l&eacute;ctionn&eacute;s||f|fanarts/galerie/mine/|Voir sa galerie';
    v6_array_menus['fanfics'] = 'l|fanfictions/favoris/|Favoris||l|fanfictions/couples/|Fanfics par Couples||l|fanfictions/personnages/|Fanfics par Personnages||l|membres_suivis.php|Gestion des Suivis||l|fanfictions/auteurs/|Recueils||l|fanfictions/liste/|Toutes||r|fanfictions/recherche/|get|query|Titre, mots...';
    v6_array_menus['fanfics-2'] = 'l|fics_create.php|Cr&eacute;er une Fiction||l|fics_post.php|Ajouter un Chapitre||l|fics_admin.php|Administrer Fictions||l|fics_admin_comments.php|Vos Commentaires||l|fanfictions/auteur/mine/|Voir son Recueil||s||l|fanfictions/favoris/|Favoris||l|fanfictions/couples/|Fanfics par Couples||l|fanfictions/personnages/|Fanfics par Persos||l|membres_suivis.php|Gestion des Suivis||l|fanfictions/auteurs/|Recueils||l|fanfictions/liste/|Toutes||r|fanfictions/recherche/|get|query|Titre, mots...';
    v6_array_menus['membres'] = 'l|membres_allopass.php|Acheter des N�rutos||l|membres_ventes.php|Acheter un Compte||l|membres_changement_pseudo.php|Changer de Pseudo||l|membres_changement.php|Changer de Personnage||l|membres_changement.php|Changer de Village||l|membres_compte.php|Modifier son Compte||l|membres_infos.php|Modifier son Profil||l|membres_options.php|Modifier ses Options||l|membres_ventes.php|Vendre un Compte||l|membres_signature.php|Voir ses Signatures||l|membres_stats.php|Voir ses Statistiques||l|membres_profil.php|Voir son Profil||f|deconnexion.php|D�connexion';
    v6_array_menus['dossiers'] = 'l|naruto/dossiers/chakra-nature-element/|Chakra||l|naruto/dossiers/chronologie/|Chronologie||l|naruto/clans/|Clans||l|naruto/dossiers/ninjas-medecins/|Eisei Nin||l|naruto/grades/|Grades Ninjas||l|naruto/dossiers/Kirin/|Kirin||l|naruto/bijuus/|L&eacute;gende des neuf Bijuus||l|naruto/dossiers/legendes-asiatiques/|L&eacute;gendes Asiatiques||l|naruto/dossiers/liens/|Liens||l|naruto/dossiers/Amaterasu-Susanoo-Tsukuyomi-Shintoisme/|Mangekyou Sharingan||l|naruto/dossiers/ninken-taisen/|Ninken Taisen||l|naruto/dossiers/sannins-legendaires/|Sannins L&eacute;gendaires||l|naruto/dossiers/senseis/|Sense&iuml;s||f|naruto/dossiers/|Tous nos dossiers';


    var v6_menu_aff = '';
    var v6_menu_aff_conf = 0; 
    var v6_menu_aff_conf_type = '';       
    var v6_menu_gestionnaire = 0;
                                                                 
    function v6_aff_menu(type) {                                  
    
      v6_menu_aff_conf = 1;   
      v6_menu_aff_conf_type = type;
      setTimeout('v6_aff_menu_conf("'+type+'")', 250);    
      
    }         
    
    function v6_aff_menu_out() { 
    
      v6_menu_aff_conf = 0;               
      v6_menu_aff_conf_type = '';       
    
    }    
    
    function v6_aff_menu_conf(type) {
    
      if(v6_menu_aff_conf >= 1 && v6_menu_aff_conf_type == type) {
                            
        v6_menu_aff_conf = 0;
        v6_menu_aff_conf_type = '';
    
        v6_caff_menu();     
        
        if(v6_array_menus[type]) v6_generate_menu(type);               
         
        aff_menu_div('menu-'+type);
        
        document.getElementById('lien-menu-'+type).className = 'onclick';
        
        v6_menu_aff = type;   
      
      }  
    
    }
    
    function v6_caff_menu_document() {
    
      v6_menu_gestionnaire--;
      
      if(v6_menu_gestionnaire < 0) { 
      
        v6_menu_gestionnaire = 0;
        v6_caff_menu();
      
      }
    
    }
    
    function v6_caff_menu() {                                         
      
      if(v6_menu_aff != '') {  
               
        caff_menu_div('menu-'+v6_menu_aff);
        
        document.getElementById('lien-menu-'+v6_menu_aff).className = (v6_menu_active == v6_menu_aff) ? 'active' : '';
  
      }
      
    }
    
    function v6_click_menu() {              
    
      v6_menu_gestionnaire++;
    
    }
                          
    function v6_generate_menu_content(type) {

      var aff = '';
      var t_liens = (typeof v6_change_menu != 'undefined' && typeof v6_change_menu[type] != 'undefined') ? v6_array_menus[type+'-2'].split("\|\|") : v6_array_menus[type].split("\|\|");             
      
      for(var i = 0; i < t_liens.length; i++) {
      
        t_lien = t_liens[i].split("\|");
                                         
        if(t_lien[0] == 'l') {
        
          if(t_lien[1].indexOf('http://') == -1) t_lien[1] = 'http://www.wonaruto.com/'+t_lien[1];   
        
          aff+= (i % 2 == 0) ? '<li>' : '<li class="l-2">';
          aff+= '<a href="'+t_lien[1]+'">'+t_lien[2]+'</a></li>';
        
        }
        else if(t_lien[0] == 'f') {
        
          if(t_lien[1].indexOf('http://') == -1) t_lien[1] = 'http://www.wonaruto.com/'+t_lien[1]; 
                                                           
          aff+= (type == 'membres') ? '<li><a class="logout" href="'+t_lien[1]+'">'+t_lien[2]+'</a></li>' : '<li class="link"><a href="'+t_lien[1]+'">'+t_lien[2]+'</a></li>';
        
        }
        else if(t_lien[0] == 'r') {
        
          if(t_lien[1].indexOf('http://') == -1) t_lien[1] = 'http://www.wonaruto.com/'+t_lien[1]; 
                                                               
          aff+= '<li class="search"><form action="'+t_lien[1]+'" method="'+t_lien[2]+'"><input type="text" name="'+t_lien[3]+'" value="'+t_lien[4]+'" onFocus="this.value=\'\'" /> <button type="submit" title="Rechercher"><span>Rechercher</span></button></form></li>';
        
        }  
        else if(t_lien[0] == 's') {
                                                               
          aff+= '<li class="sep"></li>';
        
        }  
                  
      
      }
      
      return aff;

    }

    function v6_generate_menu(type) {

      var aff = "<ul>"+v6_generate_menu_content(type)+"</ul>";

      document.getElementById('menu-'+type).innerHTML = aff;

      v6_array_menus[type] = undefined;

    }
    
    document.onclick = v6_caff_menu_document;

    


/*
* Lightboxes
*/
   
    // Ouvre une lightbox et appelle un fichier js qui va mettre son contenu � l'int�rieur
    // Si timeout (3 sec) du chargement, redirige automatiquement vers url_redir
    // renvoie true si la lightbox a ouvert, false sinon
    // attention, pour suivre ou non un lien c'est l'exact oppos� (false ne suit pas, true suit)
    function lightbox_js(url, url_redir, t_timeout) {             
    
      //
      // D'abord on s'occupe du div "lightbox" 
      
        document.getElementById('lightbox').innerHTML = '<div id="lb-conteneur"><div id="lb-close"><a title="Fermer cette fen�tre" alt="Fermer">Fermer</a></div><div id="lb-contenu"><div id="lb-loader"><img src="http://images.wonaruto.com/loading_big.gif" /></div></div></div>';
        
      //
      // On lance la lightbox
      
        new Lightbox.base('lightbox', { externalControl : 'lb-close', closeOnOverlayClick : true });
    
    
      //
      // On cr�� le squeer
      
        lightbox_js_conf = ((new Date()).getTime()).toString().substr(5, 5); 
        url+= '&conf='+lightbox_js_conf
                                      
        lightbox_js_call = new SqueereHTTP(url, 'WoN_JS_call');   
        lightbox_js_call.conf = lightbox_js_conf;       

        lightbox_js_call.onComplete = function(confirmation, data) {
                                                    
          if(confirmation == lightbox_js_conf) {  
                                            
            lightbox_js_conf = '';
            document.getElementById('lb-contenu').innerHTML = data;
                            
          }
         
        }
              
      //
      // On balance le squeer !                    
                                        
        lightbox_js_call.Request(true);  
        
      //
      // Timeout
      
        if(!t_timeout) var t_timeout = 3000;
         
        setTimeout('lightbox_js_timeout('+lightbox_js_conf+', "'+url_redir+'")', t_timeout);
                
        return true;     
        
    }
    
    function lightbox_js_timeout(called_conf, url_redir) {
    
      //
      // Si c'est tjrs cet appel le derneir, alors on a timeout ... 
      
        if(lightbox_js_conf == called_conf) {                    
          
          //
          // On redir
          
            window.location.replace(url_redir);
      
          //
          // On annule 
          
            lightbox_js_conf = '';
            
          //
          // On change le contenu              
          
            var str = '<div id="lb-titre-box">Erreur de chargement</div><div id="lb-contenu-text"><br /><br />Pour une raison inconnu le contenu n\'a pas pu �tre charg�. Si vous n\'�tes pas redirig�s sous peu, vous pouvez cliquer sur le lien ci dessous ou fermer la boite.<br /><br /><br /><br /><center><b><a href="'+url_redir+'">Aller � la page</a></b></center></div>';
            document.getElementById('lb-contenu').innerHTML = str;
          
        }
    
    }
   
    // Ouvre une lightbox et charge url � l'int�rieur 
    // Si �chec du chargement, redirige automatiquement vers url_redir
    // renvoie true si la lightbox a ouvert, false sinon
    // attention, pour suivre ou non un lien c'est l'exact oppos� (false ne suit pas, true suit)
    function lightbox_ajax(url, url_redir) {
                                                        
      //
      // Ajax ? sinon c'est mort
      
        if(window.XMLHttpRequest || window.ActiveXObject) {  // Ya de l'ajax :o
        }
        else { // XMLHttpRequest non support� par le navigateur
          return false;
        }      
    
      //
      // D'abord on s'occupe du div "lightbox" 
      
        document.getElementById('lightbox').innerHTML = '<div id="lb-conteneur"><div id="lb-close"><a title="Fermer cette fen�tre" alt="Fermer">Fermer</a></div><div id="lb-contenu"></div></div>';
        
      //
      // On lance la lightbox
      
        new Lightbox.base('lightbox', { externalControl : 'lb-close', closeOnOverlayClick : true });
    
    
      //
      // On ajax  

        base_url_xhr = 'http://www.wonaruto.com/';
        var xhr = new Xhr(url, 'lb-contenu', '<div id="lb-loader"><img src="http://images.wonaruto.com/loading_big.gif" /></div>');
        xhr.data = "iframe=1";
        xhr.actDone = function() {

          resultat = this.connector.responseText;

          document.getElementById('lb-contenu').innerHTML = resultat;

        };
        xhr.actFail = function() {                               
          
          window.location.replace(url_redir);
                                              
          var str = '<div id="lb-titre-box">Erreur de chargement</div><div id="lb-contenu-text"><br /><br />Pour une raison inconnu le contenu n\'a pas pu �tre charg�. Si vous n\'�tes pas redirig�s sous peu, vous pouvez cliquer sur le lien ci dessous ou fermer la boite.<br /><br /><br /><br /><center><b><a href="'+url_redir+'">Aller � la page</a></b></center></div>';
          document.getElementById('lb-contenu').innerHTML = str;
        
        }
        xhr.exec();
                
        return true;     
        
    }
    
    
    
    
    // Ouvre une lightbox et charge url � l'int�rieur dans une iframe
    // Un petit lien vers url_redir en cas de non chargement
    // renvoie true si la lightbox a ouvert, false sinon
    // attention, pour suivre ou non un lien c'est l'exact oppos� (false ne suit pas, true suit)
    function lightbox_iframe(url, url_redir, titre) { 
    
      //
      // D'abord on s'occupe du div "lightbox" 
      
        document.getElementById('lightbox').innerHTML = '<div id="lb-conteneur"><div id="lb-close"><a title="Fermer cette fen�tre" alt="Fermer">Fermer</a></div><div id="lb-contenu"></div></div>';
        
      //
      // On lance la lightbox
      
        new Lightbox.base('lightbox', { externalControl : 'lb-close', closeOnOverlayClick : true });
    
      //
      // On lance le contenu de la lb 
      
        var str = '<div id="lb-titre-box">'+js_htmlentities(titre)+'</div>';
        str+= '<iframe id="lb-iframe" frameborder="0" src="'+url+'"></iframe>';
        str+= '<div id="lb-footer"><a href="'+url_redir+'">Le chargement a �chou� ? Cliquez ici !</a> | <b>'+((url_redir.indexOf('javascript') == -1) ? '<a href="'+url_redir+'" target="_blank">' : '<a href="'+url_redir+'">')+'Ouvrir dans une nouvelle fen�tre</a></b></div>';
        
        document.getElementById('lb-contenu').innerHTML = str;
                
        return true;     
        
    }
        
    
    // Ouvre une lightbox et charge le contenu � l'int�rieur                
    // renvoie true si la lightbox a ouvert et que tout est bon, false sinon                                         
    function lightbox_html(titre, texte, footer) {    
    
      //
      // D'abord on s'occupe du div "lightbox" 
      
        document.getElementById('lightbox').innerHTML = '<div id="lb-conteneur"><div id="lb-close"><a title="Fermer cette fen�tre" alt="Fermer">Fermer</a></div><div id="lb-contenu"></div></div>';    
    
      //
      // On add le content ^^

        var str = '<div id="lb-titre-box">'+titre+'</div><div id="lb-contenu-text">'+texte+'</div>';
        if(footer) str+= '<div id="lb-footer">'+footer+'</div>';
        
        document.getElementById('lb-contenu').innerHTML = str;  
        
      //
      // On lance la lightbox
      
        new Lightbox.base('lightbox', { externalControl : 'lb-close', closeOnOverlayClick : true });
          
      //
      // Onrenvoie true car on a tout r�ussi =D   
        
        return true;     
        
    }


/**
 * TOOLTIP
 */
const MAX_ECART_MOUSEMOVE_X = MAX_ECART_MOUSEMOVE_Y = 10;
var divExist = false,
    callTimeout = containerPosition = null,
    widthTooltip = lastPositionX = lastPositionY = 0;

function ttInit(event, obj) {
    obj.onmousemove = function (event) {
        ttMove(event.pageX, event.pageY);
    }
    obj.onmouseout = function () {
        ttHideTrig(obj);
    }
    obj.onmouseover = function () {
        ttTrig(event, obj);
    }

    obj.setAttribute('data-ttClasse', obj.className);
    ttTrig(event, obj);
}

function ttTrig(event, obj) {
    var currentIdTooltip = getId(obj);

    if (divExist) ttDisplay(currentIdTooltip, obj, event);
    else {
        obj.className = obj.getAttribute('data-ttClasse') + ' ttTrig';
        callTimeout = setTimeout(function () {
            ttDisplay(currentIdTooltip, obj, event);
        }, 500);
    }
}

function ttDisplay(idTooltip, obj, event) {
    var divTooltip = null;

    clearTimeout(callTimeout);

    if (divExist) {
        divTooltip = document.getElementById('tooltip');
        if (divTooltip.getAttribute('data-ttId') == idTooltip) return;
    }
    else divTooltip = document.createElement('div');

    divTooltip.setAttribute('data-ttId', idTooltip);
    divTooltip.setAttribute('id', 'tooltip');
    divTooltip.innerHTML = '<div id="ttTitle"></div><div id="ttContent"></div><span id="ttClose"><a onclick="ttHide(this)">Fermer</a></span>';

    document.body.appendChild(divTooltip);
    widthTooltip = document.getElementById('tooltip').offsetWidth;
    containerPosition = getPosition(document.getElementById('texted'));
    divExist = true;
    obj.className = obj.getAttribute('data-ttClasse');

    eval(obj.getAttribute('data-tt'));
    ttMove(event.pageX, event.pageY);
    divTooltip.setAttribute('onmouseover', 'ttDisplay(' + idTooltip + ', this, event)');
    divTooltip.onmouseout = function () {
        ttHideTrig(obj);
    }
}

function ttHideTrig(obj) {
    var divTooltip = document.getElementById('tooltip');

    clearTimeout(callTimeout);

    if (divExist) {
        callTimeout = setTimeout(function () {
            ttHide(obj);
        }, 500);
    }
}

function ttHide(obj) {
    var divTooltip = document.getElementById('tooltip');

    document.body.removeChild(divTooltip);
    divExist = false;
}

function ttMove(coordX, coordY) {
    var divTooltip = document.getElementById('tooltip');

    if (divExist) {
        if ((Math.abs(coordX - lastPositionX) > MAX_ECART_MOUSEMOVE_X) || (Math.abs(coordY - lastPositionY) > MAX_ECART_MOUSEMOVE_Y)) {
            if ((coordX + widthTooltip) > containerPosition.right) {
                divTooltip.style.left = ((coordX - 20) - widthTooltip) + "px";
                divTooltip.style.top = (coordY - 10) + "px";
            }
            else {
                divTooltip.style.left = (coordX + 20) + "px";
                divTooltip.style.top = (coordY - 10) + "px";
            }
            lastPositionX = coordX;
            lastPositionY = coordY;
        }
    }
}

function ttHtml(content, titre) {
    var divTooltip = document.getElementById('tooltip'),
        divTooltipContent = document.getElementById('ttContent'),
        divTooltipTitle = document.getElementById('ttTitle');

    if (typeof titre == undefined || titre == null) divTooltip.removeChild(divTooltipTitle);
    else divTooltipTitle.innerHTML = titre;

    divTooltipContent.innerHTML = content;
}

function getId(obj) {
    if (obj.getAttribute('data-ttId')) return obj.getAttribute('data-ttId');
    else {
        var id = new Date().getMilliseconds();
        obj.setAttribute('data-ttId', id);

        return id;
    }
}

function getPosition(el) {
    var coordTop = coordBottom = coordLeft = coordRight = 0,
        widthEl = el.offsetWidth,
        heightEl = el.offsetHeight;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        coordLeft += el.offsetLeft - el.scrollLeft;
        coordTop += el.offsetTop - el.scrollTop;

        el = el.offsetParent;
    }

    coordBottom = coordTop + heightEl;
    coordRight = coordLeft + widthEl;

    return { top: coordTop, left: coordLeft, right: coordRight, bottom: coordBottom };
}