/*--------------------------------------------------------------------------*/
/*  Xhr  
*  This is a script for creating modal dialog windows (like the ones your operating
*  system uses)
*  
*/

   // Constructor
function Xhr(url, div_state, div_state_content) {
        
        this.url = base_url_xhr+url;
        this.method = "GET";
        this.async = true;
        this.data = "";
        this.connector = this.createConnector();
        this.actDone = function() { return (this.connector.responseText); };
        this.actWait = function () {
                if(div_state)
                        document.getElementById(div_state).innerHTML = div_state_content;
        };
        this.waitOver = function() {
                if(div_state)
                        document.getElementById(div_state).innerHTML = "";
        }
        this.actFail = function () {
                            
                alert('Erreur de transmission : ' + this.connector.status);   
                         
        }
}

Xhr.prototype.createConnector = function() {
        var xmlHttp;

        try
        {
                xmlHttp = new ActiveXObject("Msxml2.XMLHttp");
        }
        catch(e)
        {
                try
                {
                        xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
                }
                catch(e2)
                {
                }
        }

        if(xmlHttp == undefined && (typeof XMLHttpRequest != 'undefined'))
                xmlHttp = new XMLHttpRequest();

        return (xmlHttp);
}

Xhr.prototype.onData = function() {
        if (this.connector.readyState == 4) {
                        
                this.waitOver();     
        
                if (this.connector.status == 200) {
                                                       
                        this.actDone();
                        
                } else { 
                
                        this.actFail();                 
                
                }
                        
        }
        else
                this.actWait();
}

Xhr.prototype.exec = function() {
        var _this = this;

        if (this.method == "GET" && this.data != null) {
                this.url += "?"+this.data;
                this.data      = null;
        }
        this.connector.open(this.method, this.url, this.async);
        this.connector.onreadystatechange = function(){ _this.onData() };
        if (this.method == "POST") {
                this.connector.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=iso-8859-1");
        }
        this.connector.send(this.data);
        return false;
}



/*--------------------------------------------------------------------------*/
/*  Squeer  
*  On va faire du cross domain
*  
*/    
                               
function SqueereHTTP(url, instance) {
   
   this.loaded = false;
   this.url = url;
   this.script;
   this.firstparam = true;
   this.serverResponse;
   this.instance = instance;
   that = this;      
   
   this.AddParam = function(p, v) {
      if (that.firstparam) {
         that.url+='?'+p+'='+v;
         that.firstparam=false;
      } else {
         that.url+='&'+p+'='+v;
      }
   }

   this.Request = function(force) {                  
   
      if (force) {
         var axd = new Date();
         var shake = axd.getDate()+""+axd.getMonth()+1+""+axd.getFullYear()+""+axd.getHours()+""+axd.getMinutes()+""+axd.getSeconds();
      }
      
      that.script = document.createElement('script');
      that.script.setAttribute('charset','UTF-8');
      that.script.setAttribute('type','text/javascript');
      that.script.setAttribute('src', that.url);
      that.script.onload = that.onLoad;
      that.script.onreadystatechange = that.onLoad;
      document.getElementsByTagName('head')[0].appendChild(that.script);
      
   }

   this.onComplete = function(serverResponse) { }

   this.onLoad = function() {
      if (that.loaded) { return; }
      that.loaded=true;
   };

   return this;  
   
}



/*--------------------------------------------------------------------------*/
/*	Lightbox	
*	This is a script for creating modal dialog windows (like the ones your operating
*	system uses)
*	
*/

var Lightbox = {
	/* hideAll - closes all open lightbox windows */
	hideAll: function(){
		lboxes = document.getElementsByClassName('lbox')
		lboxes.each(function(box){
				Element.hide(box)
			}
		)
		if ($('overlay')){
			Element.remove('overlay');
			}
	}
}
Lightbox.base = Class.create();
Lightbox.base.prototype = {

	initialize: function(element, options){
		//start by hiding all lightboxes
		Lightbox.hideAll();                
	
		this.element = $(element);
		this.options = Object.extend({
			lightboxClassName : 'lightbox',
			closeOnOverlayClick : false,
			externalControl : false
		}, options || {} )

		//create the overlay
		new Insertion.Before(this.element, "<div id='overlay' style='display:none;'></div>");
		
                                                           
    Element.addClassName(this.element, this.options.lightboxClassName)
	
		//also add a default lbox class to the lightbox div so we can find and close all lightboxes if we need to
		Element.addClassName(this.element, 'lbox')          
		
		//Tip: make sure the path to the close.gif image below is correct for your setup
		//closer = '<a id="close" title="Fermer cette fenêtre" alt="Close">Fermer</a>'

		//insert the closer image into the div
		//new Insertion.Top(this.element, closer);
		
    var event_close_name = (typeof options.externalControl != 'undefined') ? options.externalControl : 'lb-close';
		Event.observe($(event_close_name), 'click', this.hideBox.bindAsEventListener(this) );
		                                    
		if (this.options.closeOnOverlayClick){
			Event.observe($('overlay'), 'click', this.hideBox.bindAsEventListener(this) );
		}
		if (this.options.externalControl){
			Event.observe($(this.options.externalControl), 'click', this.hideBox.bindAsEventListener(this) );
		}
				
		this.showBox();	
	},
	
	showBox : function(){
		//show the overlay
	   Element.show('overlay');

		//center the lightbox
	   this.center();
	   
	   	//show the lightbox
	   Element.show(this.element);
	   return false;
	},
	
	hideBox : function(evt){	
		Element.removeClassName(this.element, this.options.lightboxClassName)
		Element.hide(this.element);
		//remove the overlay element from the DOM completely
		Element.remove('overlay');
		return false;
	},
		
	center : function(){
		var my_width  = 0;
		var my_height = 0;
		
		if ( typeof( window.innerWidth ) == 'number' ){
			my_width  = window.innerWidth;
			my_height = window.innerHeight;
		}else if ( document.documentElement && 
				 ( document.documentElement.clientWidth ||
				   document.documentElement.clientHeight ) ){
			my_width  = document.documentElement.clientWidth;
			my_height = document.documentElement.clientHeight;
		}
		else if ( document.body && 
				( document.body.clientWidth || document.body.clientHeight ) ){
			my_width  = document.body.clientWidth;
			my_height = document.body.clientHeight;
		}
		
		this.element.style.position = 'absolute';
		this.element.style.zIndex   = 99;
		
		var scrollY = 0;
		
		if ( document.documentElement && document.documentElement.scrollTop ){
			scrollY = document.documentElement.scrollTop;
		}else if ( document.body && document.body.scrollTop ){
			scrollY = document.body.scrollTop;
		}else if ( window.pageYOffset ){
			scrollY = window.pageYOffset;
		}else if ( window.scrollY ){
			scrollY = window.scrollY;
		}
		
		var elementDimensions = Element.getDimensions(this.element);
		
		var setX = ( my_width  - elementDimensions.width  ) / 2;
		var setY = ( my_height - elementDimensions.height ) / 2 + scrollY;
		
		setX = ( setX < 0 ) ? 0 : setX;
		setY = ( setY < 0 ) ? 0 : setY;
		
		this.element.style.left = setX + "px";
		this.element.style.top  = setY + "px";
		
	}

	
}

