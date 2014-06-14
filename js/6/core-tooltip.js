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

    obj.className = obj.getAttribute('data-ttClasse') + ' ttTrig';

    if (divExist) ttDisplay(currentIdTooltip, obj, event);
    else callTimeout = setTimeout(function () {
        ttDisplay(currentIdTooltip, obj, event);
    }, 500);
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