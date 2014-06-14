var SoftScroll=
{
 /*** Free download with instructions: http://scripterlative.com?softscroll ***/

 DEBUG:false,
 timer:null, lastX:-1, lastY:-1, xHalted:false, yHalted:false, bon:true, step:50, targetDisp:null, stepTarget:{x:0,y:0}, logged:1, startJump:location.href.match(/#([^\?]+)\??/), startJumpDone:false, currentAnchor:null, initialised:false, initialTarget:"", showHref:false, excludeClass:/\bnoSoftScroll\b/i, targetFrame:self,

 //////////////////////////
  delay:50,  proportion:3,
 //////////////////////////

 init:function()
 {
  var dL, linkTypes=['a','area'];
  
  if( this.startJump )
  {
   this.startJump = this.startJump[1];
   location.href='#';
   window.scrollTo(0,0);
  }
  
  this.cont();

  if( document.documentElement )
   this.dataCode=3;
  else
   if( document.body && typeof document.body.scrollTop != 'undefined' )
    this.dataCode=2;
   else
    if( typeof window.pageXOffset!='undefined' )
     this.dataCode=1;

  for(var i = 0, anchs = document.anchors, aLen = anchs.length; i < aLen; i++)
   if( !anchs[i].childNodes.length )
    anchs[i].appendChild( document.createTextNode('\xA0') );

  for(var lt in linkTypes)
  {
   for(var i = 0, dL = document.getElementsByTagName(linkTypes[lt]), anchorName, aLen = dL.length; i < aLen && this.bon; i++)
   {
    anchorName = ( dL[i].hash && dL[i].hash.match(/\S/) ) ? dL[i].hash.substring(1) : dL[i].name ? dL[i].name : "";

    if( this.startJump && this.startJump === anchorName )
    {
     SoftScroll.go(anchorName);
     startJumpDone = true;
    }

    if(dL[i].href && this.samePath( dL[i].href, location.href ) && anchorName.length)
    {
     if( this.DEBUG )
     {
      for(var j=0 ; j < aLen && anchorName!=dL[j].name && anchorName!=dL[j].id; j++)
      ;

      if( j==aLen && !this.gebi( anchorName ) && !document.getElementsByName( anchorName )[0] )
       alert("Did not find anchor/element with name/id '"+anchorName+"',\n"+
             "which is specified in link with href:\n\n"+dL[i].href);
     }

     if( !this.excludeClass.test( dL[i].className ) )
      this.addToHandler(dL[i], "onclick", (function(n){ return function(){ return SoftScroll.go(n, this.target||null); }})(anchorName) );
    }
   }
  }
  
  if( !this.startJumpDone && this.gebi( this.startJump ) )
   SoftScroll.go( this.startJump );

  this.initialised = true;

  if(this.initialTarget != "")
   this.go(this.initialTarget);
 },

 showHash:function()
 {
  this.showHref=true;
 },

 samePath:function(urlA, urlB)
 {
  return urlA.split(/\?|#/)[0] === urlB.split(/\?|#/)[0];
 },

 go:function(anchName, targetFrameName)
 {    
  var targetName = null;
  
  if( typeof targetFrameName === 'string' )
   targetName = targetFrameName.match( /_self|_top|_parent|_blank/i ) ? null : targetFrameName ;
    
  if( this.initialised )
  {
    try
    {
     this.targetFrame = (typeof targetName !== 'string') ? window.self
      : (parent.frames[ targetName ] || window.frames[ targetName ] || this.getIframeRef( targetName ) || window.self);
    }
    catch(e){ alert('Access error "'+targetName+'"'); }
   
    if( typeof this.targetFrame === 'undefined' )
     this.targetFrame = self;
     
    var anchorTags, elemRef;
    
    try{ anchorTags = this.targetFrame.document.getElementsByTagName('a');  }
     catch(e){ anchorTags = {length:0}; alert('Frame access error "'+targetName+'"');}

    this.xHalted = this.yHalted=false;
    this.getScrollData();
    this.stepTarget.x = this.x;
    this.stepTarget.y = this.y;

    if(this.timer)
    {
     clearInterval( this.timer );
     this.timer = null;
    }

    for(var i = 0, len = anchorTags.length; i < len && anchorTags[i].name != anchName && anchorTags[i].id != anchName &&  this.bon; i++)
    ;

    if(i != len)
     this.targetDisp = this.findPos( this.currentAnchor = anchorTags[i] );
    else    
     if( ( elemRef = this.targetFrame.document.getElementById(anchName) ) || (elemRef = this.targetFrame.document.getElementsByName(anchName)[0]) )
      this.targetDisp = this.findPos( this.currentAnchor = elemRef );
     else
      {
       this.currentAnchor = {id:"", name:""};
       this.targetDisp = {x:0, y:0};     
      }      
            
    this.timer = setInterval(function(){SoftScroll.toAnchor()}, this.delay);  
  }
  else
   this.initialTarget=anchName;

  return false;
 },

 scrollTo:function(x,y)
 {
  this.lastX=-1;
  this.lastY=-1;
  this.xHalted=false;
  this.yHalted=false;
  this.targetDisp={x:0,y:0};
  this.targetDisp.x=x;
  this.targetDisp.y=y;

  this.getScrollData();
  this.stepTarget.x=this.x;
  this.stepTarget.y=this.y;

  if(this.timer)
   clearInterval(this.timer);
  this.timer=setInterval(function(){SoftScroll.toAnchor()}, this.delay);
 },

 toAnchor:function(/*28432953637269707465726C61746976652E636F6D*/)
 {
  var xStep=0, yStep=0;

  this.getScrollData();

  this.xHalted = (this.stepTarget.x > this.lastX)
   ? (this.x > this.stepTarget.x || this.x < this.lastX)
   : (this.x < this.stepTarget.x || this.x > this.lastX);

  this.yHalted = (this.stepTarget.y > this.lastY)
   ? (this.y > this.stepTarget.y || this.y < this.lastY)
   : (this.y < this.stepTarget.y || this.y > this.lastY);

  if( (this.x != this.lastX || this.y != this.lastY) && (!this.yHalted && !this.xHalted) )
  {
   this.lastX=this.x;
   this.lastY=this.y;

   if(!this.xHalted)
    xStep=this.targetDisp.x - this.x;
   if(!this.yHalted)
    yStep=this.targetDisp.y - this.y;

   if(xStep)
    Math.abs(xStep)/this.proportion >1 ? xStep/=this.proportion : xStep<0?xStep=-1:xStep=1;

   if(yStep)
    Math.abs(yStep)/this.proportion >1 ? yStep/=this.proportion : yStep<0?yStep=-1:yStep=1;

   yStep=Math.ceil(yStep);
   xStep=Math.ceil(xStep);

   this.stepTarget.x = this.x + xStep ;
   this.stepTarget.y = this.y + yStep ;

   if(xStep||yStep)
    this.targetFrame.scrollBy(xStep, yStep);
  }
  else
   {
    clearInterval(this.timer);
    this.timer=null;

    if(this.startJump)
    {
     if(this.showHref)
      location.href = '#'+this.startJump;
     this.startJump=null;
    }
    else
     if(this.showHref && !this.xHalted && !this.yHalted && this.currentAnchor!==null)
      location.href = '#'+ (this.currentAnchor.name || this.currentAnchor.id);

    this.lastX=-1;
    this.lastY=-1;

    this.xHalted=false;
    this.yHalted=false;
   }
 },

 getScrollData:function()
 {
  switch( this.dataCode )
  {
   case 3 : this.x = Math.max(this.targetFrame.document.documentElement.scrollLeft, this.targetFrame.document.body.scrollLeft);
            this.y = Math.max(this.targetFrame.document.documentElement.scrollTop, this.targetFrame.document.body.scrollTop);
            break;

   case 2 : this.x = this.targetFrame.document.body.scrollLeft;
            this.y = this.targetFrame.document.body.scrollTop;
            break;

   case 1 : this.x = this.targetFrame.pageXOffset; this.y = this.targetFrame.pageYOffset; break;
  }

  return {x : this.x, y : this.y};
 },

 findPos:function( obj )
 {
  var left = !!obj.offsetLeft ? (obj.offsetLeft) : 0,
      top = !!obj.offsetTop ? obj.offsetTop : 0,
      theElem = obj;

  while((obj = obj.offsetParent))
  {
   left += !!obj.offsetLeft ? obj.offsetLeft : 0;
   top += !!obj.offsetTop ? obj.offsetTop : 0;
  }

  while( theElem.parentNode.nodeName != 'BODY' )
  {
   theElem = theElem.parentNode;

   if( theElem.scrollLeft )
    left -= theElem.scrollLeft;

   if( theElem.scrollTop )
    top -= theElem.scrollTop;
  }
  
  return {x:left, y:top};
 },

 getIframeRef:function( id )
 {
  var ref = this.gebi( id );

  return (ref && ref.id && ref.contentWindow) ? ref.contentWindow : null;
 },

 gebi:function( id )
 {
  var eRef = document.getElementById( id );

  return ( eRef && eRef.id === id ) ? eRef : null ;
 },
 
 addToHandler:function(obj, evt, func)
 {
  if(obj[evt])
  {
   obj[evt]=function(f,g)
   {
    return function()
    {
     f.apply(this,arguments);
     return g.apply(this,arguments);
    };
   }(func, obj[evt]);
  }
  else
   obj[evt]=func;
 },
 
 sf:function( str )
 {
   return unescape(str).replace(/(.)(.*)/, function(a,b,c){return c+b;});
 },

 cont:function()
 {                                          
 
      /*
         
         I would have donated if you didn't use the may word and then display advertissements to my visitors without saying it to me ... I'd glad to donate after some apologies for this bad movement of yourself, contact me at twitter.com/dabYo
      
      */
  
 }
}

function load_SmoothScroller() {

  SoftScroll.init()
  
}                                           
won_popup_onload_add("load_SmoothScroller");

/** End of listing **/


