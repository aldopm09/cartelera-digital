function MarkerClusterer(t,e,n){
  this.extend(MarkerClusterer,google.maps.OverlayView),
  this.map_=t,
  this.markers_=[],
  this.clusters_=[],
  this.sizes=[53,56,66,78,90],
  this.styles_=[],
  this.ready_=!1;
  var r=n||{};
  this.gridSize_=r.gridSize||60,
  this.minClusterSize_=r.minimumClusterSize||2,
  this.maxZoom_=r.maxZoom||null,
  this.styles_=r.styles||[],
  this.imagePath_=r.imagePath||this.MARKER_CLUSTER_IMAGE_PATH_,
  this.imageExtension_=r.imageExtension||this.MARKER_CLUSTER_IMAGE_EXTENSION_,
  this.zoomOnClick_=!0,
  void 0!=r.zoomOnClick&&(this.zoomOnClick_=r.zoomOnClick),
  this.averageCenter_=!1,
  void 0!=r.averageCenter&&(this.averageCenter_=r.averageCenter),
  this.setupStyles_(),
  this.setMap(t),
  this.prevZoom_=this.map_.getZoom();
  var i=this;google.maps.event.addListener(this.map_,"zoom_changed",function(){
    var t=i.map_.getZoom();
    i.prevZoom_!=t&&(i.prevZoom_=t,i.resetViewport())
  }),
  google.maps.event.addListener(this.map_,"idle",function(){i.redraw()}),e&&e.length&&this.addMarkers(e,!1)
}

function Cluster(t){
  this.markerClusterer_=t,
  this.map_=t.getMap(),
  this.gridSize_=t.getGridSize(),this.minClusterSize_=t.getMinClusterSize(),
  this.averageCenter_=t.isAverageCenter(),
  this.center_=null,
  this.markers_=[],
  this.bounds_=null,
  this.clusterIcon_=new ClusterIcon(this,t.getStyles(),t.getGridSize())
}

function ClusterIcon(t,e,n){
  t.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView),
  this.styles_=e,
  this.padding_=n||0,
  this.cluster_=t,this.center_=null,
  this.map_=t.getMap(),
  this.div_=null,
  this.sums_=null,
  this.visible_=!1,
  this.setMap(this.map_)
}

window.Modernizr=function(t,e,n){
  function r(t){
    h.cssText=t
  }

  function i(t,e){
    return typeof t===e
  }

  var o,a,s,l="2.8.3",
  u={},
  c=!0,
  d=e.documentElement,
  p="modernizr",
  f=e.createElement(p),
  h=f.style,
  m=({}.toString,{svg:"http://www.w3.org/2000/svg"}),
  g={},
  v=[],
  y=v.slice,
  b={}.hasOwnProperty;
  s=i(b,"undefined")||i(b.call,"undefined")?function(t,e){
    return e in t&&i(t.constructor.prototype[e],"undefined")
  }:function(t,e){
    return b.call(t,e)
  },

  Function.prototype.bind||(Function.prototype.bind=function(t){
    var e=this;if("function"!=typeof e)throw new TypeError;
    var n=y.call(arguments,1),
    r=function(){
      if(this instanceof r){
        var i=function(){};
        i.prototype=e.prototype;
        var o=new i,
        a=e.apply(o,n.concat(y.call(arguments)));
        return Object(a)===a?a:o
      }
      return e.apply(t,n.concat(y.call(arguments)))
    };
    return r
  }),
  g.svg=function(){
    return!!e.createElementNS&&!!e.createElementNS(m.svg,"svg").createSVGRect
  };
  for(var x in g)s(g,x)&&(a=x.toLowerCase(),u[a]=g[x](),v.push((u[a]?"":"no-")+a));
  return u.addTest=function(t,e){
    if("object"==typeof t)for(var r in t)s(t,r)&&u.addTest(r,t[r]);
    else{
      if(t=t.toLowerCase(),u[t]!==n)return u;
      e="function"==typeof e?e():e,
      "undefined"!=typeof c&&c&&(d.className+=" "+(e?"":"no-")+t),u[t]=e
    }
    return u
  },
  r(""),
  f=o=null,
  function(t,e){
    function n(t,e){
      var n=t.createElement("p"),
      r=t.getElementsByTagName("head")[0]||t.documentElement;
      return n.innerHTML="x<style>"+e+"</style>",r.insertBefore(n.lastChild,r.firstChild)
    }

    function r(){
      var t=y.elements;
      return"string"==typeof t?t.split(" "):t
    }

    function i(t){
      var e=v[t[m]];
      return e||(e={},g++,t[m]=g,v[g]=e),e
    }

    function o(t,n,r){
      if(n||(n=e),c)return n.createElement(t);
      r||(r=i(n));
      var o;
      return o=r.cache[t]?r.cache[t].cloneNode():h.test(t)?(r.cache[t]=r.createElem(t)).cloneNode():r.createElem(t),!o.canHaveChildren||f.test(t)||o.tagUrn?o:r.frag.appendChild(o)
    }

    function a(t,n){
      if(t||(t=e),c)return t.createDocumentFragment();
      n=n||i(t);for(var o=n.frag.cloneNode(),a=0,s=r(),l=s.length;a<l;a++)o.createElement(s[a]);
      return o
    }

    function s(t,e){
      e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),
      t.createElement=function(n){
          return y.shivMethods?o(n,t,e):e.createElem(n)
      },
      t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(y,e.frag)
    }

    function l(t){
      t||(t=e);
      var r=i(t);
      return y.shivCSS&&!u&&!r.hasCSS&&(r.hasCSS=!!n(t,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||s(t,r),t
    }

    var u,c,d="3.7.0",
    p=t.html5||{},
    f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
    h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
    m="_html5shiv",
    g=0,
    v={};
    !function(){
      try{
        var t=e.createElement("a");
        t.innerHTML="<xyz></xyz>",
        u="hidden"in t,
        c=1==t.childNodes.length||function(){
          e.createElement("a");
          var t=e.createDocumentFragment();
          return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()
      }catch(t){
        u=!0,c=!0
      }
    }();
    var y={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:c,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:l,createElement:o,createDocumentFragment:a};
    t.html5=y,
    l(e)
  }

  (this,e),
  u._version=l,
  d.className=d.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(c?" js "+v.join(" "):""),u
}

(this,this.document),
function(t,e,n){
  function r(t){
    return"[object Function]"==g.call(t)
  }

  function i(t){
    return"string"==typeof t
  }

  function o(){

  }

  function a(t){
    return!t||"loaded"==t||"complete"==t||"uninitialized"==t
  }

  function s(){
    var t=v.shift();
    y=1,t?t.t?h(function(){("c"==t.t?p.injectCss:p.injectJs)(t.s,0,t.a,t.x,t.e,1)},0):(t(),s()):y=0
  }

  function l(t,n,r,i,o,l,u){
    function c(e){
      if(!f&&a(d.readyState)&&(b.r=f=1,!y&&s(),d.onload=d.onreadystatechange=null,e)){
        "img"!=t&&h(function(){w.removeChild(d)},50);
        for(var r in _[n])_[n].hasOwnProperty(r)&&_[n][r].onload()
      }
    }

    var u=u||p.errorTimeout,d=e.createElement(t),f=0,g=0,b={t:r,s:n,e:o,a:l,x:u};
    1===_[n]&&(g=1,_[n]=[]),
    "object"==t?d.data=n:(d.src=n,d.type=t),
    d.width=d.height="0",
    d.onerror=d.onload=d.onreadystatechange=function(){
      c.call(this,g)
    },
    v.splice(i,0,b),
    "img"!=t&&(g||2===_[n]?(w.insertBefore(d,x?null:m),h(c,u)):_[n].push(d))
  }

  function u(t,e,n,r,o){
    return y=0,e=e||"j",i(t)?l("c"==e?k:C,t,e,this.i++,n,r,o):(v.splice(this.i++,0,t),1==v.length&&s()),this
  }

  function c(){
    var t=p;
    return t.loader={load:u,i:0},t
  }

  var d,p,f=e.documentElement,
  h=t.setTimeout,
  m=e.getElementsByTagName("script")[0],
  g={}.toString,
  v=[],
  y=0,
  b="MozAppearance"in f.style,
  x=b&&!!e.createRange().compareNode,
  w=x?f:m.parentNode,
  f=t.opera&&"[object Opera]"==g.call(t.opera),
  f=!!e.attachEvent&&!f,
  C=b?"object":f?"script":"img",
  k=f?"script":C,
  T=Array.isArray||function(t){return"[object Array]"==g.call(t)},
  S=[],
  _={},
  $={timeout:function(t,e){return e.length&&(t.timeout=e[0]),t}};
  p=function(t){
    function e(t){
      var e,n,r,t=t.split("!"),i=S.length,o=t.pop(),a=t.length,o={url:o,origUrl:o,prefixes:t};
      for(n=0;n<a;n++)r=t[n].split("="),(e=$[r.shift()])&&(o=e(o,r));
      for(n=0;n<i;n++)o=S[n](o);
      return o
    }

    function a(t,i,o,a,s){
      var l=e(t),u=l.autoCallback;
      l.url.split(".").pop().split("?").shift(),l.bypass||(i&&(i=r(i)?i:i[t]||i[a]||i[t.split("/").pop().split("?")[0]]),l.instead?l.instead(t,i,o,a,s):(_[l.url]?l.noexec=!0:_[l.url]=1,o.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(r(i)||r(u))&&o.load(function(){c(),i&&i(l.origUrl,s,a),u&&u(l.origUrl,s,a),_[l.url]=2})))
    }

    function s(t,e){
      function n(t,n){
        if(t){
          if(i(t))n||(d=function(){var t=[].slice.call(arguments);p.apply(this,t),f()}),a(t,d,e,0,u);
          else if(Object(t)===t)for(l in s=function(){var e,n=0;for(e in t)t.hasOwnProperty(e)&&n++;return n}(),t)t.hasOwnProperty(l)&&(!n&&!--s&&(r(d)?d=function(){var t=[].slice.call(arguments);p.apply(this,t),f()}:d[l]=function(t){return function(){var e=[].slice.call(arguments);t&&t.apply(this,e),f()}}(p[l])),a(t[l],d,e,l,u))}else!n&&f()}var s,l,u=!!t.test,c=t.load||t.both,d=t.callback||o,p=d,f=t.complete||o;n(u?t.yep:t.nope,!!c),c&&n(c)}var l,u,d=this.yepnope.loader;if(i(t))a(t,0,d,0);
          else if(T(t))for(l=0;l<t.length;l++)u=t[l],i(u)?a(u,0,d,0):T(u)?p(u):Object(u)===u&&s(u,d);
          else Object(t)===t&&s(t,d)},p.addPrefix=function(t,e){$[t]=e},p.addFilter=function(t){S.push(t)},p.errorTimeout=1e4,null==e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",d=function(){e.removeEventListener("DOMContentLoaded",d,0),e.readyState="complete"},0)),t.yepnope=c(),t.yepnope.executeStack=s,t.yepnope.injectJs=function(t,n,r,i,l,u){var c,d,f=e.createElement("script"),i=i||p.errorTimeout;f.src=t;
          for(d in r)f.setAttribute(d,r[d]);
          n=u?s:n||o,f.onreadystatechange=f.onload=function(){!c&&a(f.readyState)&&(c=1,n(),f.onload=f.onreadystatechange=null)},h(function(){c||(c=1,n(1))},i),l?f.onload():m.parentNode.insertBefore(f,m)},t.yepnope.injectCss=function(t,n,r,i,a,l){var u,i=e.createElement("link"),n=l?s:n||o;
          i.href=t,i.rel="stylesheet",i.type="text/css";
          for(u in r)i.setAttribute(u,r[u]);
          a||(m.parentNode.insertBefore(i,m),h(n,0))}}(this,document),Modernizr.load=function(){
            yepnope.apply(window,[].slice.call(arguments,0))},!function(t,e){
              "object"==typeof module&&"object"==typeof module.exports?module.exports=t.document?e(t,!0):function(t){
                if(!t.document)throw new Error("jQuery requires a window with a document");
                return e(t)
              }:e(t)
            }("undefined"!=typeof window?window:this,function(t,e){
              function n(t){
                var e="length"in t&&t.length,n=it.type(t);
                return"function"!==n&&!it.isWindow(t)&&(!(1!==t.nodeType||!e)||("array"===n||0===e||"number"==typeof e&&e>0&&e-1 in t))
              }

              function r(t,e,n){
                if(it.isFunction(e))return it.grep(t,function(t,r){
                  return!!e.call(t,r,t)!==n
                });

                if(e.nodeType)return it.grep(t,function(t){
                  return t===e!==n
                });

                if("string"==typeof e){
                  if(pt.test(e))return it.filter(e,t,n);
                  e=it.filter(e,t)
                }

                return it.grep(t,function(t){
                  return it.inArray(t,e)>=0!==n
                })
              }

              function i(t,e){
                do t=t[e];
                while(t&&1!==t.nodeType);
                return t
              }

              function o(t){
                var e=xt[t]={};
                return it.each(t.match(bt)||[],function(t,n){e[n]=!0}),e
              }

              function a(){
                ht.addEventListener?(ht.removeEventListener("DOMContentLoaded",s,!1),t.removeEventListener("load",s,!1)):(ht.detachEvent("onreadystatechange",s),t.detachEvent("onload",s))
              }

              function s(){
                (ht.addEventListener||"load"===event.type||"complete"===ht.readyState)&&(a(),it.ready())
              }

              function l(t,e,n){
                if(void 0===n&&1===t.nodeType){
                  var r="data-"+e.replace(St,"-$1").toLowerCase();
                  if(n=t.getAttribute(r),"string"==typeof n){
                    try{
                      n="true"===n||"false"!==n&&("null"===n?null:+n+""===n?+n:Tt.test(n)?it.parseJSON(n):n)
                    }catch(t){

                    }
                    it.data(t,e,n)
                  }else n=void 0
                }return n
              }

              function u(t){
                var e;
                for(e in t)if(("data"!==e||!it.isEmptyObject(t[e]))&&"toJSON"!==e)return!1;return!0
              }

              function c(t,e,n,r){
                if(it.acceptData(t)){
                  var i,o,a=it.expando,s=t.nodeType,l=s?it.cache:t,u=s?t[a]:t[a]&&a;
                  if(u&&l[u]&&(r||l[u].data)||void 0!==n||"string"!=typeof e)return u||(u=s?t[a]=V.pop()||it.guid++:a),l[u]||(l[u]=s?{}:{toJSON:it.noop}),("object"==typeof e||"function"==typeof e)&&(r?l[u]=it.extend(l[u],e):l[u].data=it.extend(l[u].data,e)),o=l[u],r||(o.data||(o.data={}),o=o.data),void 0!==n&&(o[it.camelCase(e)]=n),"string"==typeof e?(i=o[e],null==i&&(i=o[it.camelCase(e)])):i=o,i
                }
              }

              function d(t,e,n){
                if(it.acceptData(t)){
                  var r,i,o=t.nodeType,a=o?it.cache:t,s=o?t[it.expando]:it.expando;
                  if(a[s]){
                    if(e&&(r=n?a[s]:a[s].data)){
                      it.isArray(e)?e=e.concat(it.map(e,it.camelCase)):e in r?e=[e]:(e=it.camelCase(e),e=e in r?[e]:e.split(" ")),i=e.length;
                      for(;i--;)delete r[e[i]];
                      if(n?!u(r):!it.isEmptyObject(r))return
                    }
                    (n||(delete a[s].data,u(a[s])))&&(o?it.cleanData([t],!0):nt.deleteExpando||a!=a.window?delete a[s]:a[s]=null)
                  }
                }
              }

              function p(){
                return!0
              }

              function f(){
                return!1
              }

              function h(){
                try{
                  return ht.activeElement
                }catch(t){

                }
              }

              function m(t){
                var e=Ot.split("|"),n=t.createDocumentFragment();
                if(n.createElement)for(;e.length;)n.createElement(e.pop());
                return n
              }

              function g(t,e){
                var n,r,i=0,o=typeof t.getElementsByTagName!==kt?t.getElementsByTagName(e||"*"):typeof t.querySelectorAll!==kt?t.querySelectorAll(e||"*"):void 0;
                if(!o)for(o=[],n=t.childNodes||t;null!=(r=n[i]);i++)!e||it.nodeName(r,e)?o.push(r):it.merge(o,g(r,e));
                return void 0===e||e&&it.nodeName(t,e)?it.merge([t],o):o
              }

              function v(t){
                Nt.test(t.type)&&(t.defaultChecked=t.checked)
              }

              function y(t,e){
                return it.nodeName(t,"table")&&it.nodeName(11!==e.nodeType?e:e.firstChild,"tr")?t.getElementsByTagName("tbody")[0]||t.appendChild(t.ownerDocument.createElement("tbody")):t
              }

              function b(t){
                return t.type=(null!==it.find.attr(t,"type"))+"/"+t.type,t
              }

              function x(t){
                var e=Xt.exec(t.type);
                return e?t.type=e[1]:t.removeAttribute("type"),t
              }

              function w(t,e){
                for(var n,r=0;null!=(n=t[r]);r++)it._data(n,"globalEval",!e||it._data(e[r],"globalEval"))
              }

              function C(t,e){
                if(1===e.nodeType&&it.hasData(t)){
                  var n,r,i,o=it._data(t),a=it._data(e,o),s=o.events;
                  if(s){
                    delete a.handle,a.events={};
                    for(n in s)for(r=0,i=s[n].length;i>r;r++)it.event.add(e,n,s[n][r])
                  }
                  a.data&&(a.data=it.extend({},a.data))
                }
              }

              function k(t,e){
                var n,r,i;
                if(1===e.nodeType){
                  if(n=e.nodeName.toLowerCase(),!nt.noCloneEvent&&e[it.expando]){
                    i=it._data(e);
                    for(r in i.events)it.removeEvent(e,r,i.handle);
                    e.removeAttribute(it.expando)
                  }
                  "script"===n&&e.text!==t.text?(b(e).text=t.text,x(e)):"object"===n?(e.parentNode&&(e.outerHTML=t.outerHTML),nt.html5Clone&&t.innerHTML&&!it.trim(e.innerHTML)&&(e.innerHTML=t.innerHTML)):"input"===n&&Nt.test(t.type)?(e.defaultChecked=e.checked=t.checked,e.value!==t.value&&(e.value=t.value)):"option"===n?e.defaultSelected=e.selected=t.defaultSelected:("input"===n||"textarea"===n)&&(e.defaultValue=t.defaultValue)
                }
              }

              function T(e,n){
                var r,i=it(n.createElement(e)).appendTo(n.body),o=t.getDefaultComputedStyle&&(r=t.getDefaultComputedStyle(i[0]))?r.display:it.css(i[0],"display");
                return i.detach(),o
              }

              function S(t){
                var e=ht,n=Yt[t];
                return n||(n=T(t,e),"none"!==n&&n||(Kt=(Kt||it("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement),e=(Kt[0].contentWindow||Kt[0].contentDocument).document,e.write(),e.close(),n=T(t,e),Kt.detach()),Yt[t]=n),n
              }

              function _(t,e){
                return{get:function(){var n=t();if(null!=n)return n?void delete this.get:(this.get=e).apply(this,arguments)}}
              }

              function $(t,e){
                if(e in t)return e;
                for(var n=e.charAt(0).toUpperCase()+e.slice(1),r=e,i=pe.length;i--;)if(e=pe[i]+n,e in t)return e;
                return r
              }

              function E(t,e){
                for(var n,r,i,o=[],a=0,s=t.length;s>a;a++)r=t[a],r.style&&(o[a]=it._data(r,"olddisplay"),n=r.style.display,e?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&Et(r)&&(o[a]=it._data(r,"olddisplay",S(r.nodeName)))):(i=Et(r),(n&&"none"!==n||!i)&&it._data(r,"olddisplay",i?n:it.css(r,"display"))));
                for(a=0;s>a;a++)r=t[a],r.style&&(e&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=e?o[a]||"":"none"));
                return t
              }

              function M(t,e,n){
                var r=le.exec(e);
                return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):e
              }

              function N(t,e,n,r,i){
                for(var o=n===(r?"border":"content")?4:"width"===e?1:0,a=0;4>o;o+=2)"margin"===n&&(a+=it.css(t,n+$t[o],!0,i)),r?("content"===n&&(a-=it.css(t,"padding"+$t[o],!0,i)),"margin"!==n&&(a-=it.css(t,"border"+$t[o]+"Width",!0,i))):(a+=it.css(t,"padding"+$t[o],!0,i),"padding"!==n&&(a+=it.css(t,"border"+$t[o]+"Width",!0,i)));
                return a
              }

              function A(t,e,n){
                var r=!0,i="width"===e?t.offsetWidth:t.offsetHeight,o=te(t),a=nt.boxSizing&&"border-box"===it.css(t,"boxSizing",!1,o);
                if(0>=i||null==i){
                  if(i=ee(t,e,o),(0>i||null==i)&&(i=t.style[e]),re.test(i))return i;
                  r=a&&(nt.boxSizingReliable()||i===t.style[e]),i=parseFloat(i)||0
                }
                return i+N(t,e,n||(a?"border":"content"),r,o)+"px"
              }

              function D(t,e,n,r,i){
                return new D.prototype.init(t,e,n,r,i)
              }

              function L(){
                return setTimeout(function(){fe=void 0}),fe=it.now()
              }

              function j(t,e){
                var n,r={height:t},i=0;
                for(e=e?1:0;4>i;i+=2-e)n=$t[i],r["margin"+n]=r["padding"+n]=t;
                return e&&(r.opacity=r.width=t),r
              }

              function P(t,e,n){
                for(var r,i=(be[e]||[]).concat(be["*"]),o=0,a=i.length;a>o;o++)if(r=i[o].call(n,e,t))return r
              }

              function O(t,e,n){
                var r,i,o,a,s,l,u,c,d=this,p={},f=t.style,h=t.nodeType&&Et(t),m=it._data(t,"fxshow");
                n.queue||(s=it._queueHooks(t,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,d.always(function(){d.always(function(){s.unqueued--,it.queue(t,"fx").length||s.empty.fire()})})),
                1===t.nodeType&&("height"in e||"width"in e)&&(n.overflow=[f.overflow,f.overflowX,f.overflowY],u=it.css(t,"display"),c="none"===u?it._data(t,"olddisplay")||S(t.nodeName):u,"inline"===c&&"none"===it.css(t,"float")&&(nt.inlineBlockNeedsLayout&&"inline"!==S(t.nodeName)?f.zoom=1:f.display="inline-block")),
                n.overflow&&(f.overflow="hidden",nt.shrinkWrapBlocks()||d.always(function(){f.overflow=n.overflow[0],f.overflowX=n.overflow[1],f.overflowY=n.overflow[2]}));
                for(r in e)if(i=e[r],me.exec(i)){if(delete e[r],o=o||"toggle"===i,i===(h?"hide":"show")){if("show"!==i||!m||void 0===m[r])continue;h=!0}p[r]=m&&m[r]||it.style(t,r)}else u=void 0;
                if(it.isEmptyObject(p))"inline"===("none"===u?S(t.nodeName):u)&&(f.display=u);
                else{
                  m?"hidden"in m&&(h=m.hidden):m=it._data(t,"fxshow",{}),o&&(m.hidden=!h),h?it(t).show():d.done(function(){it(t).hide()}),d.done(function(){var e;it._removeData(t,"fxshow");for(e in p)it.style(t,e,p[e])});
                  for(r in p)a=P(h?m[r]:0,r,d),r in m||(m[r]=a.start,h&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))
                }
              }

              function I(t,e){
                var n,r,i,o,a;
                for(n in t)if(r=it.camelCase(n),i=e[r],o=t[n],it.isArray(o)&&(i=o[1],o=t[n]=o[0]),n!==r&&(t[r]=o,delete t[n]),a=it.cssHooks[r],a&&"expand"in a){
                  o=a.expand(o),delete t[r];
                  for(n in o)n in t||(t[n]=o[n],e[n]=i)
                }else e[r]=i
              }

              function q(t,e,n){
                var r,i,o=0,
                a=ye.length,
                s=it.Deferred().always(function(){delete l.elem}),
                l=function(){
                  if(i)return!1;
                  for(var e=fe||L(),n=Math.max(0,u.startTime+u.duration-e),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;l>a;a++)u.tweens[a].run(o);
                  return s.notifyWith(t,[u,o,n]),1>o&&l?n:(s.resolveWith(t,[u]),!1)},u=s.promise({elem:t,props:it.extend({},e),opts:it.extend(!0,{specialEasing:{}},n),originalProperties:e,originalOptions:n,startTime:fe||L(),duration:n.duration,tweens:[],createTween:function(e,n){var r=it.Tween(t,u.opts,e,n,u.opts.specialEasing[e]||u.opts.easing);return u.tweens.push(r),r},stop:function(e){var n=0,r=e?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return e?s.resolveWith(t,[u,e]):s.rejectWith(t,[u,e]),this}}),c=u.props;for(I(c,u.opts.specialEasing);a>o;o++)if(r=ye[o].call(u,t,c,u.opts))return r;
                  return it.map(c,P,u),it.isFunction(u.opts.start)&&u.opts.start.call(t,u),it.fx.timer(it.extend(l,{elem:t,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)
                }

                function H(t){
                  return function(e,n){
                    "string"!=typeof e&&(n=e,e="*");
                    var r,i=0,o=e.toLowerCase().match(bt)||[];
                    if(it.isFunction(n))for(;r=o[i++];)"+"===r.charAt(0)?(r=r.slice(1)||"*",(t[r]=t[r]||[]).unshift(n)):(t[r]=t[r]||[]).push(n)
                  }
                }

                function F(t,e,n,r){
                  function i(s){
                    var l;
                    return o[s]=!0,it.each(t[s]||[],function(t,s){var u=s(e,n,r);return"string"!=typeof u||a||o[u]?a?!(l=u):void 0:(e.dataTypes.unshift(u),i(u),!1)}),l
                  }

                  var o={},a=t===We;
                  return i(e.dataTypes[0])||!o["*"]&&i("*")
                }

                function z(t,e){
                  var n,r,i=it.ajaxSettings.flatOptions||{};
                  for(r in e)void 0!==e[r]&&((i[r]?t:n||(n={}))[r]=e[r]);
                  return n&&it.extend(!0,t,n),t
                }

                function B(t,e,n){
                  for(var r,i,o,a,s=t.contents,l=t.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=t.mimeType||e.getResponseHeader("Content-Type"));
                  if(i)for(a in s)if(s[a]&&s[a].test(i)){l.unshift(a);break}if(l[0]in n)o=l[0];
                  else{
                    for(a in n){
                      if(!l[0]||t.converters[a+" "+l[0]]){
                        o=a;break
                      }
                      r||(r=a)
                    }
                    o=o||r
                  }
                  return o?(o!==l[0]&&l.unshift(o),n[o]):void 0
                }

                function W(t,e,n,r){
                  var i,o,a,s,l,u={},c=t.dataTypes.slice();
                  if(c[1])for(a in t.converters)u[a.toLowerCase()]=t.converters[a];
                  for(o=c.shift();o;)if(t.responseFields[o]&&(n[t.responseFields[o]]=e),!l&&r&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&t["throws"])e=a(e);else try{e=a(e)}catch(t){return{state:"parsererror",error:a?t:"No conversion from "+l+" to "+o}}}
                  return{state:"success",data:e}
                }

                function R(t,e,n,r){
                  var i;
                  if(it.isArray(e))it.each(e,function(e,i){n||Ue.test(t)?r(t,i):R(t+"["+("object"==typeof i?e:"")+"]",i,n,r)});
                  else if(n||"object"!==it.type(e))r(t,e);
                  else for(i in e)R(t+"["+i+"]",e[i],n,r)
                }

                function G(){
                  try{
                    return new t.XMLHttpRequest
                  }catch(t){}
                }

                function U(){
                  try{
                    return new t.ActiveXObject("Microsoft.XMLHTTP")
                  }catch(t){}
                }

                function X(t){
                  return it.isWindow(t)?t:9===t.nodeType&&(t.defaultView||t.parentWindow)
                }

                var V=[],Q=V.slice,Z=V.concat,J=V.push,K=V.indexOf,Y={},tt=Y.toString,et=Y.hasOwnProperty,nt={},rt="1.11.3",it=function(t,e){return new it.fn.init(t,e)},ot=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,at=/^-ms-/,st=/-([\da-z])/gi,lt=function(t,e){return e.toUpperCase()};
                it.fn=it.prototype={
                  jquery:rt,constructor:it,selector:"",length:0,toArray:function(){return Q.call(this)},get:function(t){return null!=t?0>t?this[t+this.length]:this[t]:Q.call(this)},pushStack:function(t){var e=it.merge(this.constructor(),t);return e.prevObject=this,e.context=this.context,e},each:function(t,e){return it.each(this,t,e)},map:function(t){return this.pushStack(it.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return this.pushStack(Q.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,n=+t+(0>t?e:0);return this.pushStack(n>=0&&e>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:J,sort:V.sort,splice:V.splice
                },
                it.extend=it.fn.extend=function(){
                  var t,e,n,r,i,o,a=arguments[0]||{},s=1,l=arguments.length,u=!1;
                  for("boolean"==typeof a&&(u=a,a=arguments[s]||{},s++),"object"==typeof a||it.isFunction(a)||(a={}),s===l&&(a=this,s--);l>s;s++)if(null!=(i=arguments[s]))for(r in i)t=a[r],n=i[r],a!==n&&(u&&n&&(it.isPlainObject(n)||(e=it.isArray(n)))?(e?(e=!1,o=t&&it.isArray(t)?t:[]):o=t&&it.isPlainObject(t)?t:{},a[r]=it.extend(u,o,n)):void 0!==n&&(a[r]=n));
                  return a
                },
                it.extend({
                  expando:"jQuery"+(rt+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===it.type(t)},isArray:Array.isArray||function(t){return"array"===it.type(t)},isWindow:function(t){return null!=t&&t==t.window},isNumeric:function(t){return!it.isArray(t)&&t-parseFloat(t)+1>=0},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},isPlainObject:function(t){var e;
                  if(!t||"object"!==it.type(t)||t.nodeType||it.isWindow(t))return!1;
                  try{
                    if(t.constructor&&!et.call(t,"constructor")&&!et.call(t.constructor.prototype,"isPrototypeOf"))return!1
                  }catch(t){
                    return!1
                  }
                  if(nt.ownLast)for(e in t)return et.call(t,e);
                  for(e in t);
                  return void 0===e||et.call(t,e)},type:function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?Y[tt.call(t)]||"object":typeof t},globalEval:function(e){e&&it.trim(e)&&(t.execScript||function(e){t.eval.call(t,e)})(e)},camelCase:function(t){return t.replace(at,"ms-").replace(st,lt)},nodeName:function(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()},each:function(t,e,r){var i,o=0,a=t.length,s=n(t);if(r){if(s)for(;a>o&&(i=e.apply(t[o],r),i!==!1);o++);else for(o in t)if(i=e.apply(t[o],r),i===!1)break}else if(s)for(;a>o&&(i=e.call(t[o],o,t[o]),i!==!1);o++);else for(o in t)if(i=e.call(t[o],o,t[o]),i===!1)break;return t},trim:function(t){return null==t?"":(t+"").replace(ot,"")},makeArray:function(t,e){var r=e||[];return null!=t&&(n(Object(t))?it.merge(r,"string"==typeof t?[t]:t):J.call(r,t)),r},inArray:function(t,e,n){var r;if(e){if(K)return K.call(e,t,n);for(r=e.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in e&&e[n]===t)return n}return-1},merge:function(t,e){for(var n=+e.length,r=0,i=t.length;n>r;)t[i++]=e[r++];if(n!==n)for(;void 0!==e[r];)t[i++]=e[r++];return t.length=i,t},grep:function(t,e,n){for(var r,i=[],o=0,a=t.length,s=!n;a>o;o++)r=!e(t[o],o),r!==s&&i.push(t[o]);return i},map:function(t,e,r){var i,o=0,a=t.length,s=n(t),l=[];if(s)for(;a>o;o++)i=e(t[o],o,r),null!=i&&l.push(i);else for(o in t)i=e(t[o],o,r),null!=i&&l.push(i);return Z.apply([],l)},guid:1,proxy:function(t,e){var n,r,i;return"string"==typeof e&&(i=t[e],e=t,t=i),it.isFunction(t)?(n=Q.call(arguments,2),r=function(){return t.apply(e||this,n.concat(Q.call(arguments)))},r.guid=t.guid=t.guid||it.guid++,r):void 0},now:function(){return+new Date},support:nt
                }),
                it.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){Y["[object "+e+"]"]=e.toLowerCase()});
                var ut=function(t){
                  function e(t,e,n,r){
                    var i,o,a,s,l,u,d,f,h,m;
                    if((e?e.ownerDocument||e:F)!==D&&A(e),e=e||D,n=n||[],s=e.nodeType,"string"!=typeof t||!t||1!==s&&9!==s&&11!==s)return n;
                    if(!r&&j){
                      if(11!==s&&(i=yt.exec(t)))if(a=i[1]){
                        if(9===s){
                          if(o=e.getElementById(a),!o||!o.parentNode)return n;
                          if(o.id===a)return n.push(o),n
                        }else if(e.ownerDocument&&(o=e.ownerDocument.getElementById(a))&&q(e,o)&&o.id===a)return n.push(o),n
                      }else{
                        if(i[2])return K.apply(n,e.getElementsByTagName(t)),n;
                        if((a=i[3])&&w.getElementsByClassName)return K.apply(n,e.getElementsByClassName(a)),n
                      }
                      if(w.qsa&&(!P||!P.test(t))){
                        if(f=d=H,h=e,m=1!==s&&t,1===s&&"object"!==e.nodeName.toLowerCase()){
                          for(u=S(t),(d=e.getAttribute("id"))?f=d.replace(xt,"\\$&"):e.setAttribute("id",f),f="[id='"+f+"'] ",l=u.length;l--;)u[l]=f+p(u[l]);
                          h=bt.test(t)&&c(e.parentNode)||e,m=u.join(",")
                        }
                        if(m)try{return K.apply(n,h.querySelectorAll(m)),n}catch(t){}finally{d||e.removeAttribute("id")}
                      }
                    }
                    return $(t.replace(lt,"$1"),e,n,r)
                  }

                  function n(){
                    function t(n,r){
                      return e.push(n+" ")>C.cacheLength&&delete t[e.shift()],t[n+" "]=r
                    }

                    var e=[];
                    return t
                  }

                  function r(t){
                    return t[H]=!0,t
                  }

                  function i(t){
                    var e=D.createElement("div");
                    try{
                      return!!t(e)
                    }catch(t){
                      return!1
                    }finally{
                      e.parentNode&&e.parentNode.removeChild(e),e=null
                    }
                  }

                  function o(t,e){
                    for(var n=t.split("|"),r=t.length;r--;)C.attrHandle[n[r]]=e
                  }

                  function a(t,e){
                    var n=e&&t,r=n&&1===t.nodeType&&1===e.nodeType&&(~e.sourceIndex||X)-(~t.sourceIndex||X);
                    if(r)return r;
                    if(n)for(;n=n.nextSibling;)if(n===e)return-1;
                    return t?1:-1
                  }

                  function s(t){
                    return function(e){
                      var n=e.nodeName.toLowerCase();
                      return"input"===n&&e.type===t
                    }
                  }

                  function l(t){
                    return function(e){
                      var n=e.nodeName.toLowerCase();
                      return("input"===n||"button"===n)&&e.type===t
                    }
                  }

                  function u(t){
                    return r(function(e){
                      return e=+e,r(function(n,r){
                        for(var i,o=t([],n.length,e),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))
                      })
                    })
                  }

                  function c(t){
                    return t&&"undefined"!=typeof t.getElementsByTagName&&t
                  }

                  function d(){

                  }

                  function p(t){
                    for(var e=0,n=t.length,r="";n>e;e++)r+=t[e].value;
                    return r
                  }

                  function f(t,e,n){
                    var r=e.dir,i=n&&"parentNode"===r,o=B++;
                    return e.first?function(e,n,o){
                      for(;e=e[r];)if(1===e.nodeType||i)return t(e,n,o)
                    }:function(e,n,a){
                      var s,l,u=[z,o];
                      if(a){
                        for(;e=e[r];)if((1===e.nodeType||i)&&t(e,n,a))return!0
                      }else for(;e=e[r];)if(1===e.nodeType||i){
                        if(l=e[H]||(e[H]={}),(s=l[r])&&s[0]===z&&s[1]===o)return u[2]=s[2];
                        if(l[r]=u,u[2]=t(e,n,a))return!0
                      }
                    }
                  }

                  function h(t){
                    return t.length>1?function(e,n,r){
                      for(var i=t.length;i--;)if(!t[i](e,n,r))return!1;
                      return!0
                    }:t[0]
                  }

                  function m(t,n,r){
                    for(var i=0,o=n.length;o>i;i++)e(t,n[i],r);
                    return r
                  }

                  function g(t,e,n,r,i){
                    for(var o,a=[],s=0,l=t.length,u=null!=e;l>s;s++)(o=t[s])&&(!n||n(o,r,i))&&(a.push(o),u&&e.push(s));
                    return a
                  }

                  function v(t,e,n,i,o,a){
                    return i&&!i[H]&&(i=v(i)),o&&!o[H]&&(o=v(o,a)),r(function(r,a,s,l){
                      var u,c,d,p=[],f=[],h=a.length,v=r||m(e||"*",s.nodeType?[s]:s,[]),y=!t||!r&&e?v:g(v,p,t,s,l),b=n?o||(r?t:h||i)?[]:a:y;
                      if(n&&n(y,b,s,l),i)for(u=g(b,f),i(u,[],s,l),c=u.length;c--;)(d=u[c])&&(b[f[c]]=!(y[f[c]]=d));
                      if(r){
                        if(o||t){
                          if(o){
                            for(u=[],c=b.length;c--;)(d=b[c])&&u.push(y[c]=d);
                            o(null,b=[],u,l)
                          }
                          for(c=b.length;c--;)(d=b[c])&&(u=o?tt(r,d):p[c])>-1&&(r[u]=!(a[u]=d))
                        }
                      }else b=g(b===a?b.splice(h,b.length):b),o?o(null,a,b,l):K.apply(a,b)
                    })
                  }

                  function y(t){
                    for(var e,n,r,i=t.length,o=C.relative[t[0].type],a=o||C.relative[" "],s=o?1:0,l=f(function(t){return t===e},a,!0),u=f(function(t){return tt(e,t)>-1},a,!0),c=[function(t,n,r){var i=!o&&(r||n!==E)||((e=n).nodeType?l(t,n,r):u(t,n,r));return e=null,i}];i>s;s++)if(n=C.relative[t[s].type])c=[f(h(c),n)];else{if(n=C.filter[t[s].type].apply(null,t[s].matches),n[H]){for(r=++s;i>r&&!C.relative[t[r].type];r++);return v(s>1&&h(c),s>1&&p(t.slice(0,s-1).concat({value:" "===t[s-2].type?"*":""})).replace(lt,"$1"),n,r>s&&y(t.slice(s,r)),i>r&&y(t=t.slice(r)),i>r&&p(t))}c.push(n)}return h(c)
                  }

                  function b(t,n){
                    var i=n.length>0,o=t.length>0,
                    a=function(r,a,s,l,u){
                      var c,d,p,f=0,h="0",m=r&&[],v=[],y=E,b=r||o&&C.find.TAG("*",u),x=z+=null==y?1:Math.random()||.1,w=b.length;
                      for(u&&(E=a!==D&&a);h!==w&&null!=(c=b[h]);h++){
                        if(o&&c){
                          for(d=0;p=t[d++];)if(p(c,a,s)){
                            l.push(c);
                            break
                          }
                          u&&(z=x)
                        }
                        i&&((c=!p&&c)&&f--,r&&m.push(c))
                      }
                      if(f+=h,i&&h!==f){
                        for(d=0;p=n[d++];)p(m,v,a,s);
                        if(r){
                          if(f>0)for(;h--;)m[h]||v[h]||(v[h]=Z.call(l));
                          v=g(v)
                        }
                        K.apply(l,v),u&&!r&&v.length>0&&f+n.length>1&&e.uniqueSort(l)
                      }
                      return u&&(z=x,E=y),m
                    };
                    return i?r(a):a
                  }

                  var x,w,C,k,T,S,_,$,E,M,N,A,D,L,j,P,O,I,q,H="sizzle"+1*new Date,F=t.document,z=0,B=0,W=n(),R=n(),G=n(),U=function(t,e){return t===e&&(N=!0),0},X=1<<31,V={}.hasOwnProperty,Q=[],Z=Q.pop,J=Q.push,K=Q.push,Y=Q.slice,tt=function(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n]===e)return n;return-1},et="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",nt="[\\x20\\t\\r\\n\\f]",rt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",it=rt.replace("w","w#"),ot="\\["+nt+"*("+rt+")(?:"+nt+"*([*^$|!~]?=)"+nt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+it+"))|)"+nt+"*\\]",at=":("+rt+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ot+")*)|.*)\\)|)",st=new RegExp(nt+"+","g"),lt=new RegExp("^"+nt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+nt+"+$","g"),ut=new RegExp("^"+nt+"*,"+nt+"*"),ct=new RegExp("^"+nt+"*([>+~]|"+nt+")"+nt+"*"),dt=new RegExp("="+nt+"*([^\\]'\"]*?)"+nt+"*\\]","g"),pt=new RegExp(at),ft=new RegExp("^"+it+"$"),ht={ID:new RegExp("^#("+rt+")"),CLASS:new RegExp("^\\.("+rt+")"),TAG:new RegExp("^("+rt.replace("w","w*")+")"),ATTR:new RegExp("^"+ot),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+nt+"*(even|odd|(([+-]|)(\\d*)n|)"+nt+"*(?:([+-]|)"+nt+"*(\\d+)|))"+nt+"*\\)|)","i"),bool:new RegExp("^(?:"+et+")$","i"),needsContext:new RegExp("^"+nt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+nt+"*((?:-\\d)?\\d*)"+nt+"*\\)|)(?=[^-]|$)","i")},mt=/^(?:input|select|textarea|button)$/i,gt=/^h\d$/i,vt=/^[^{]+\{\s*\[native \w/,yt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,bt=/[+~]/,xt=/'|\\/g,wt=new RegExp("\\\\([\\da-f]{1,6}"+nt+"?|("+nt+")|.)","ig"),Ct=function(t,e,n){var r="0x"+e-65536;
                  return r!==r||n?e:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},kt=function(){A()};

                  try{
                    K.apply(Q=Y.call(F.childNodes),F.childNodes),Q[F.childNodes.length].nodeType
                  }catch(t){
                    K={
                      apply:Q.length?function(t,e){
                        J.apply(t,Y.call(e))
                      }:function(t,e){
                        for(var n=t.length,r=0;t[n++]=e[r++];);
                        t.length=n-1
                      }
                    }
                  }
                  w=e.support={},T=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return!!e&&"HTML"!==e.nodeName},
                  A=e.setDocument=function(t){
                    var e,n,r=t?t.ownerDocument||t:F;
                    return r!==D&&9===r.nodeType&&r.documentElement?(D=r,L=r.documentElement,n=r.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",kt,!1):n.attachEvent&&n.attachEvent("onunload",kt)),j=!T(r),w.attributes=i(function(t){return t.className="i",!t.getAttribute("className")}),w.getElementsByTagName=i(function(t){return t.appendChild(r.createComment("")),!t.getElementsByTagName("*").length}),w.getElementsByClassName=vt.test(r.getElementsByClassName),w.getById=i(function(t){return L.appendChild(t).id=H,!r.getElementsByName||!r.getElementsByName(H).length}),w.getById?(C.find.ID=function(t,e){if("undefined"!=typeof e.getElementById&&j){var n=e.getElementById(t);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(t){var e=t.replace(wt,Ct);return function(t){return t.getAttribute("id")===e}}):(delete C.find.ID,C.filter.ID=function(t){var e=t.replace(wt,Ct);return function(t){var n="undefined"!=typeof t.getAttributeNode&&t.getAttributeNode("id");return n&&n.value===e}}),C.find.TAG=w.getElementsByTagName?function(t,e){return"undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t):w.qsa?e.querySelectorAll(t):void 0}:function(t,e){var n,r=[],i=0,o=e.getElementsByTagName(t);if("*"===t){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},C.find.CLASS=w.getElementsByClassName&&function(t,e){return j?e.getElementsByClassName(t):void 0},O=[],P=[],(w.qsa=vt.test(r.querySelectorAll))&&(i(function(t){L.appendChild(t).innerHTML="<a id='"+H+"'></a><select id='"+H+"-\f]' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&P.push("[*^$]="+nt+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||P.push("\\["+nt+"*(?:value|"+et+")"),t.querySelectorAll("[id~="+H+"-]").length||P.push("~="),t.querySelectorAll(":checked").length||P.push(":checked"),t.querySelectorAll("a#"+H+"+*").length||P.push(".#.+[+~]")}),i(function(t){var e=r.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&P.push("name"+nt+"*[*^$|!~]?="),t.querySelectorAll(":enabled").length||P.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),P.push(",.*:")})),(w.matchesSelector=vt.test(I=L.matches||L.webkitMatchesSelector||L.mozMatchesSelector||L.oMatchesSelector||L.msMatchesSelector))&&i(function(t){w.disconnectedMatch=I.call(t,"div"),I.call(t,"[s!='']:x"),O.push("!=",at)}),P=P.length&&new RegExp(P.join("|")),O=O.length&&new RegExp(O.join("|")),e=vt.test(L.compareDocumentPosition),q=e||vt.test(L.contains)?function(t,e){var n=9===t.nodeType?t.documentElement:t,r=e&&e.parentNode;return t===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):t.compareDocumentPosition&&16&t.compareDocumentPosition(r)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},U=e?function(t,e){if(t===e)return N=!0,0;var n=!t.compareDocumentPosition-!e.compareDocumentPosition;return n?n:(n=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,1&n||!w.sortDetached&&e.compareDocumentPosition(t)===n?t===r||t.ownerDocument===F&&q(F,t)?-1:e===r||e.ownerDocument===F&&q(F,e)?1:M?tt(M,t)-tt(M,e):0:4&n?-1:1)}:function(t,e){if(t===e)return N=!0,0;var n,i=0,o=t.parentNode,s=e.parentNode,l=[t],u=[e];if(!o||!s)return t===r?-1:e===r?1:o?-1:s?1:M?tt(M,t)-tt(M,e):0;if(o===s)return a(t,e);for(n=t;n=n.parentNode;)l.unshift(n);for(n=e;n=n.parentNode;)u.unshift(n);for(;l[i]===u[i];)i++;return i?a(l[i],u[i]):l[i]===F?-1:u[i]===F?1:0},r):D
                  },
                  e.matches=function(t,n){
                    return e(t,null,null,n)
                  },
                  e.matchesSelector=function(t,n){
                    if((t.ownerDocument||t)!==D&&A(t),n=n.replace(dt,"='$1']"),!(!w.matchesSelector||!j||O&&O.test(n)||P&&P.test(n)))try{var r=I.call(t,n);if(r||w.disconnectedMatch||t.document&&11!==t.document.nodeType)return r}catch(t){}return e(n,D,null,[t]).length>0
                  },
                  e.contains=function(t,e){
                    return(t.ownerDocument||t)!==D&&A(t),q(t,e)
                  },
                  e.attr=function(t,e){
                    (t.ownerDocument||t)!==D&&A(t);
                    var n=C.attrHandle[e.toLowerCase()],r=n&&V.call(C.attrHandle,e.toLowerCase())?n(t,e,!j):void 0;
                    return void 0!==r?r:w.attributes||!j?t.getAttribute(e):(r=t.getAttributeNode(e))&&r.specified?r.value:null
                  },
                  e.error=function(t){
                    throw new Error("Syntax error, unrecognized expression: "+t)
                  },
                  e.uniqueSort=function(t){
                    var e,n=[],r=0,i=0;
                    if(N=!w.detectDuplicates,M=!w.sortStable&&t.slice(0),t.sort(U),N){
                      for(;e=t[i++];)e===t[i]&&(r=n.push(i));
                      for(;r--;)t.splice(n[r],1)
                    }
                    return M=null,t
                  },
                  k=e.getText=function(t){
                    var e,n="",r=0,i=t.nodeType;
                    if(i){
                      if(1===i||9===i||11===i){
                        if("string"==typeof t.textContent)return t.textContent;
                        for(t=t.firstChild;t;t=t.nextSibling)n+=k(t)
                      }else if(3===i||4===i)return t.nodeValue
                    }else for(;e=t[r++];)n+=k(e);
                    return n
                  },
                  C=e.selectors={
                    cacheLength:50,createPseudo:r,match:ht,attrHandle:{},find:{},
                    relative:{
                      ">":{dir:"parentNode",first:!0},
                      " ":{dir:"parentNode"},
                      "+":{dir:"previousSibling",first:!0},
                      "~":{dir:"previousSibling"}
                    },
                    preFilter:{
                      ATTR:function(t){
                        return t[1]=t[1].replace(wt,Ct),t[3]=(t[3]||t[4]||t[5]||"").replace(wt,Ct),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)
                      },
                      CHILD:function(t){
                        return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t
                      },
                      PSEUDO:function(t){
                          var e,n=!t[6]&&t[2];
                          return ht.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":n&&pt.test(n)&&(e=S(n,!0))&&(e=n.indexOf(")",n.length-e)-n.length)&&(t[0]=t[0].slice(0,e),t[2]=n.slice(0,e)),t.slice(0,3))
                      }
                    },
                    filter:{
                        TAG:function(t){
                          var e=t.replace(wt,Ct).toLowerCase();
                          return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}
                        },
                        CLASS:function(t){
                          var e=W[t+" "];
                          return e||(e=new RegExp("(^|"+nt+")"+t+"("+nt+"|$)"))&&W(t,function(t){return e.test("string"==typeof t.className&&t.className||"undefined"!=typeof t.getAttribute&&t.getAttribute("class")||"")})
                        },
                        ATTR:function(t,n,r){
                          return function(i){var o=e.attr(i,t);return null==o?"!="===n:!n||(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(st," ")+" ").indexOf(r)>-1:"|="===n&&(o===r||o.slice(0,r.length+1)===r+"-"))}
                        },
                        CHILD:function(t,e,n,r,i){
                          var o="nth"!==t.slice(0,3),a="last"!==t.slice(-4),s="of-type"===e;
                          return 1===r&&0===i?function(t){
                            return!!t.parentNode
                          }:function(e,n,l){var u,c,d,p,f,h,m=o!==a?"nextSibling":"previousSibling",g=e.parentNode,v=s&&e.nodeName.toLowerCase(),y=!l&&!s;
                          if(g){
                            if(o){
                              for(;m;){
                                for(d=e;d=d[m];)if(s?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;h=m="only"===t&&!h&&"nextSibling"
                              }
                              return!0
                            }
                            if(h=[a?g.firstChild:g.lastChild],a&&y){
                              for(c=g[H]||(g[H]={}),u=c[t]||[],f=u[0]===z&&u[1],p=u[0]===z&&u[2],d=f&&g.childNodes[f];d=++f&&d&&d[m]||(p=f=0)||h.pop();)if(1===d.nodeType&&++p&&d===e){c[t]=[z,f,p];break  }
                            }else if(y&&(u=(e[H]||(e[H]={}))[t])&&u[0]===z)p=u[1];
                            else for(;(d=++f&&d&&d[m]||(p=f=0)||h.pop())&&((s?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++p||(y&&((d[H]||(d[H]={}))[t]=[z,p]),d!==e)););
                            return p-=i,p===r||p%r===0&&p/r>=0
                          }
                        }
                      },
                      PSEUDO:function(t,n){
                        var i,o=C.pseudos[t]||C.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);
                        return o[H]?o(n):o.length>1?(i=[t,t,"",n],C.setFilters.hasOwnProperty(t.toLowerCase())?r(function(t,e){for(var r,i=o(t,n),a=i.length;a--;)r=tt(t,i[a]),t[r]=!(e[r]=i[a])}):function(t){return o(t,0,i)}):o
                      }
                    },
                    pseudos:{
                      not:r(function(t){
                        var e=[],n=[],i=_(t.replace(lt,"$1"));
                        return i[H]?r(function(t,e,n,r){
                          for(var o,a=i(t,null,r,[]),s=t.length;s--;)(o=a[s])&&(t[s]=!(e[s]=o))
                        }):function(t,r,o){
                          return e[0]=t,i(e,null,o,n),e[0]=null,!n.pop()
                        }
                      }),
                      has:r(function(t){
                        return function(n){
                          return e(t,n).length>0
                        }
                      }),
                      contains:r(function(t){
                        return t=t.replace(wt,Ct),
                        function(e){
                          return(e.textContent||e.innerText||k(e)).indexOf(t)>-1
                        }
                      }),
                      lang:r(function(t){
                        return ft.test(t||"")||e.error("unsupported lang: "+t),
                        t=t.replace(wt,Ct).toLowerCase(),
                        function(e){
                          var n;
                          do if(n=j?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return n=n.toLowerCase(),n===t||0===n.indexOf(t+"-");
                          while((e=e.parentNode)&&1===e.nodeType);
                          return!1
                        }
                      }),
                      target:function(e){
                        var n=t.location&&t.location.hash;
                        return n&&n.slice(1)===e.id
                      },
                      root:function(t){
                        return t===L
                      },
                      focus:function(t){
                        return t===D.activeElement&&(!D.hasFocus||D.hasFocus())&&!!(t.type||t.href||~t.tabIndex)
                      },
                      enabled:function(t){
                        return t.disabled===!1
                      },
                      disabled:function(t){
                        return t.disabled===!0
                      },
                      checked:function(t){
                        var e=t.nodeName.toLowerCase();
                        return"input"===e&&!!t.checked||"option"===e&&!!t.selected
                      },
                      selected:function(t){
                        return t.parentNode&&t.parentNode.selectedIndex,t.selected===!0
                      },
                      empty:function(t){
                        for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;
                        return!0
                      },
                      parent:function(t){
                        return!C.pseudos.empty(t)
                      },
                      header:function(t){
                        return gt.test(t.nodeName)
                      },
                      input:function(t){
                        return mt.test(t.nodeName)
                      },
                      button:function(t){
                        var e=t.nodeName.toLowerCase();
                        return"input"===e&&"button"===t.type||"button"===e
                      },
                      text:function(t){
                        var e;
                        return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())
                      },
                      first:u(function(){return[0]}),
                      last:u(function(t,e){return[e-1]}),
                      eq:u(function(t,e,n){return[0>n?n+e:n]}),
                      even:u(function(t,e){for(var n=0;e>n;n+=2)t.push(n);return t}),
                      odd:u(function(t,e){for(var n=1;e>n;n+=2)t.push(n);return t}),
                      lt:u(function(t,e,n){for(var r=0>n?n+e:n;--r>=0;)t.push(r);return t}),
                      gt:u(function(t,e,n){for(var r=0>n?n+e:n;++r<e;)t.push(r);return t})
                    }
                  },
                  C.pseudos.nth=C.pseudos.eq;
                  for(x in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[x]=s(x);
                  for(x in{submit:!0,reset:!0})C.pseudos[x]=l(x);
                  return d.prototype=C.filters=C.pseudos,
                  C.setFilters=new d,
                  S=e.tokenize=function(t,n){
                    var r,i,o,a,s,l,u,c=R[t+" "];
                    if(c)return n?0:c.slice(0);
                    for(s=t,l=[],u=C.preFilter;s;){
                      (!r||(i=ut.exec(s)))&&(i&&(s=s.slice(i[0].length)||s),l.push(o=[])),r=!1,(i=ct.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(lt," ")}),s=s.slice(r.length));
                      for(a in C.filter)!(i=ht[a].exec(s))||u[a]&&!(i=u[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));
                      if(!r)break
                    }
                    return n?s.length:s?e.error(t):R(t,l).slice(0)
                  },
                  _=e.compile=function(t,e){
                    var n,r=[],i=[],o=G[t+" "];
                    if(!o){
                      for(e||(e=S(t)),n=e.length;n--;)o=y(e[n]),o[H]?r.push(o):i.push(o);
                      o=G(t,b(i,r)),o.selector=t
                    }
                    return o
                  },
                  $=e.select=function(t,e,n,r){
                    var i,o,a,s,l,u="function"==typeof t&&t,d=!r&&S(t=u.selector||t);
                    if(n=n||[],1===d.length){
                      if(o=d[0]=d[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&w.getById&&9===e.nodeType&&j&&C.relative[o[1].type]){
                        if(e=(C.find.ID(a.matches[0].replace(wt,Ct),e)||[])[0],!e)return n;
                        u&&(e=e.parentNode),t=t.slice(o.shift().value.length)
                      }
                      for(i=ht.needsContext.test(t)?0:o.length;i--&&(a=o[i],!C.relative[s=a.type]);)if((l=C.find[s])&&(r=l(a.matches[0].replace(wt,Ct),bt.test(o[0].type)&&c(e.parentNode)||e))){if(o.splice(i,1),t=r.length&&p(o),!t)return K.apply(n,r),n;break}
                    }
                    return(u||_(t,d))(r,e,!j,n,bt.test(t)&&c(e.parentNode)||e),n
                  },
                  w.sortStable=H.split("").sort(U).join("")===H,
                  w.detectDuplicates=!!N,A(),
                  w.sortDetached=i(function(t){
                    return 1&t.compareDocumentPosition(D.createElement("div"))
                  }),
                  i(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||o("type|href|height|width",function(t,e,n){return n?void 0:t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),
                  w.attributes&&i(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||o("value",function(t,e,n){return n||"input"!==t.nodeName.toLowerCase()?void 0:t.defaultValue}),
                  i(function(t){return null==t.getAttribute("disabled")})||o(et,function(t,e,n){var r;return n?void 0:t[e]===!0?e.toLowerCase():(r=t.getAttributeNode(e))&&r.specified?r.value:null}),e}(t);
                  it.find=ut,it.expr=ut.selectors,it.expr[":"]=it.expr.pseudos,it.unique=ut.uniqueSort,it.text=ut.getText,it.isXMLDoc=ut.isXML,it.contains=ut.contains;
                  var ct=it.expr.match.needsContext,dt=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,pt=/^.[^:#\[\.,]*$/;
                  it.filter=function(t,e,n){
                    var r=e[0];
                    return n&&(t=":not("+t+")"),1===e.length&&1===r.nodeType?it.find.matchesSelector(r,t)?[r]:[]:it.find.matches(t,it.grep(e,function(t){return 1===t.nodeType}))
                  },
                  it.fn.extend({
                    find:function(t){
                      var e,n=[],r=this,i=r.length;
                      if("string"!=typeof t)return this.pushStack(it(t).filter(function(){for(e=0;i>e;e++)if(it.contains(r[e],this))return!0}));
                      for(e=0;i>e;e++)it.find(t,r[e],n);
                      return n=this.pushStack(i>1?it.unique(n):n),n.selector=this.selector?this.selector+" "+t:t,n
                    },
                    filter:function(t){
                      return this.pushStack(r(this,t||[],!1))
                    },
                    not:function(t){
                      return this.pushStack(r(this,t||[],!0))
                    },
                    is:function(t){
                      return!!r(this,"string"==typeof t&&ct.test(t)?it(t):t||[],!1).length
                    }
                  });
                  var ft,ht=t.document,mt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                  gt=it.fn.init=function(t,e){
                    var n,r;
                    if(!t)return this;
                    if("string"==typeof t){
                      if(n="<"===t.charAt(0)&&">"===t.charAt(t.length-1)&&t.length>=3?[null,t,null]:mt.exec(t),!n||!n[1]&&e)return!e||e.jquery?(e||ft).find(t):this.constructor(e).find(t);
                      if(n[1]){
                        if(e=e instanceof it?e[0]:e,it.merge(this,it.parseHTML(n[1],e&&e.nodeType?e.ownerDocument||e:ht,!0)),dt.test(n[1])&&it.isPlainObject(e))for(n in e)it.isFunction(this[n])?this[n](e[n]):this.attr(n,e[n]);
                        return this
                      }
                      if(r=ht.getElementById(n[2]),r&&r.parentNode){
                        if(r.id!==n[2])return ft.find(t);
                        this.length=1,this[0]=r
                      }
                      return this.context=ht,this.selector=t,this
                    }
                    return t.nodeType?(this.context=this[0]=t,this.length=1,this):it.isFunction(t)?"undefined"!=typeof ft.ready?ft.ready(t):t(it):(void 0!==t.selector&&(this.selector=t.selector,this.context=t.context),it.makeArray(t,this))
                  };
                  gt.prototype=it.fn,ft=it(ht);
                  var vt=/^(?:parents|prev(?:Until|All))/,yt={children:!0,contents:!0,next:!0,prev:!0};
                  it.extend({
                    dir:function(t,e,n){
                      for(var r=[],i=t[e];i&&9!==i.nodeType&&(void 0===n||1!==i.nodeType||!it(i).is(n));)1===i.nodeType&&r.push(i),i=i[e];
                      return r
                    },
                    sibling:function(t,e){
                      for(var n=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&n.push(t);
                      return n
                    }
                  }),
                  it.fn.extend({
                    has:function(t){
                      var e,n=it(t,this),r=n.length;
                      return this.filter(function(){for(e=0;r>e;e++)if(it.contains(this,n[e]))return!0})
                    },
                    closest:function(t,e){
                      for(var n,r=0,i=this.length,o=[],a=ct.test(t)||"string"!=typeof t?it(t,e||this.context):0;i>r;r++)for(n=this[r];n&&n!==e;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&it.find.matchesSelector(n,t))){o.push(n);break}return this.pushStack(o.length>1?it.unique(o):o)
                    },
                    index:function(t){
                      return t?"string"==typeof t?it.inArray(this[0],it(t)):it.inArray(t.jquery?t[0]:t,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1
                    },
                    add:function(t,e){
                      return this.pushStack(it.unique(it.merge(this.get(),it(t,e))))
                    },
                    addBack:function(t){
                      return this.add(null==t?this.prevObject:this.prevObject.filter(t))
                    }
                  }),
                  it.each({
                    parent:function(t){
                      var e=t.parentNode;
                      return e&&11!==e.nodeType?e:null
                    },
                    parents:function(t){
                      return it.dir(t,"parentNode")
                    },
                    parentsUntil:function(t,e,n){
                      return it.dir(t,"parentNode",n)
                    },
                    next:function(t){
                      return i(t,"nextSibling")
                    },
                    prev:function(t){
                      return i(t,"previousSibling")
                    },
                    nextAll:function(t){
                      return it.dir(t,"nextSibling")
                    },
                    prevAll:function(t){
                      return it.dir(t,"previousSibling")
                    },
                    nextUntil:function(t,e,n){
                      return it.dir(t,"nextSibling",n)
                    },
                    prevUntil:function(t,e,n){
                      return it.dir(t,"previousSibling",n)
                    },
                    siblings:function(t){
                      return it.sibling((t.parentNode||{}).firstChild,t)
                    },
                    children:function(t){
                      return it.sibling(t.firstChild)
                    },
                    contents:function(t){
                      return it.nodeName(t,"iframe")?t.contentDocument||t.contentWindow.document:it.merge([],t.childNodes)
                    }
                  },
                  function(t,e){
                    it.fn[t]=function(n,r){
                      var i=it.map(this,e,n);
                      return"Until"!==t.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=it.filter(r,i)),this.length>1&&(yt[t]||(i=it.unique(i)),vt.test(t)&&(i=i.reverse())),this.pushStack(i)
                    }
                  });
                  var bt=/\S+/g,xt={};
                  it.Callbacks=function(t){
                    t="string"==typeof t?xt[t]||o(t):it.extend({},t);
                    var e,n,r,i,a,s,l=[],u=!t.once&&[],
                    c=function(o){
                      for(n=t.memory&&o,r=!0,a=s||0,s=0,i=l.length,e=!0;l&&i>a;a++)if(l[a].apply(o[0],o[1])===!1&&t.stopOnFalse){n=!1;break}e=!1,l&&(u?u.length&&c(u.shift()):n?l=[]:d.disable())
                    },
                    d={
                      add:function(){
                        if(l){
                          var r=l.length;
                          !function e(n){
                            it.each(n,function(n,r){
                              var i=it.type(r);
                              "function"===i?t.unique&&d.has(r)||l.push(r):r&&r.length&&"string"!==i&&e(r)
                            })
                          }
                          (arguments),e?i=l.length:n&&(s=r,c(n))
                        }
                        return this
                      },
                      remove:function(){
                        return l&&it.each(arguments,function(t,n){for(var r;(r=it.inArray(n,l,r))>-1;)l.splice(r,1),e&&(i>=r&&i--,a>=r&&a--)}),this
                      },
                      has:function(t){
                        return t?it.inArray(t,l)>-1:!(!l||!l.length)
                      },
                      empty:function(){
                        return l=[],i=0,this
                      },
                      disable:function(){
                        return l=u=n=void 0,this
                      },
                      disabled:function(){
                        return!l
                      },
                      lock:function(){
                        return u=void 0,n||d.disable(),this
                      },
                      locked:function(){
                        return!u
                      },
                      fireWith:function(t,n){
                        return!l||r&&!u||(n=n||[],n=[t,n.slice?n.slice():n],e?u.push(n):c(n)),this
                      },
                      fire:function(){
                        return d.fireWith(this,arguments),this
                      },
                      fired:function(){
                        return!!r
                      }
                    };
                    return d
                  },
                  it.extend({
                    Deferred:function(t){
                      var e=[["resolve","done",it.Callbacks("once memory"),"resolved"],["reject","fail",it.Callbacks("once memory"),"rejected"],["notify","progress",it.Callbacks("memory")]],n="pending",
                      r={
                        state:function(){
                          return n
                        },
                        always:function(){
                          return i.done(arguments).fail(arguments),this
                        },
                        then:function(){
                          var t=arguments;
                          return it.Deferred(function(n){
                            it.each(e,function(e,o){
                              var a=it.isFunction(t[e])&&t[e];i[o[1]](function(){
                                var t=a&&a.apply(this,arguments);
                                t&&it.isFunction(t.promise)?t.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,a?[t]:arguments)
                              })
                            }),
                            t=null
                          }).promise()
                        },
                        promise:function(t){
                          return null!=t?it.extend(t,r):r
                        }
                      },
                      i={};
                      return r.pipe=r.then,it.each(e,function(t,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},e[1^t][2].disable,e[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),t&&t.call(i,i),i
                    },
                    when:function(t){
                      var e,n,r,i=0,o=Q.call(arguments),a=o.length,s=1!==a||t&&it.isFunction(t.promise)?a:0,l=1===s?t:it.Deferred(),
                      u=function(t,n,r){
                        return function(i){
                          n[t]=this,r[t]=arguments.length>1?Q.call(arguments):i,r===e?l.notifyWith(n,r):--s||l.resolveWith(n,r)
                        }
                      };
                      if(a>1)for(e=new Array(a),n=new Array(a),r=new Array(a);a>i;i++)o[i]&&it.isFunction(o[i].promise)?o[i].promise().done(u(i,r,o)).fail(l.reject).progress(u(i,n,e)):--s;
                      return s||l.resolveWith(r,o),l.promise()
                    }
                  });
                  var wt;
                  it.fn.ready=function(t){
                    return it.ready.promise().done(t),this
                  },
                  it.extend({
                    isReady:!1,
                    readyWait:1,
                    holdReady:function(t){
                      t?it.readyWait++:it.ready(!0)
                    },
                    ready:function(t){
                      if(t===!0?!--it.readyWait:!it.isReady){
                        if(!ht.body)return setTimeout(it.ready);
                        it.isReady=!0,t!==!0&&--it.readyWait>0||(wt.resolveWith(ht,[it]),it.fn.triggerHandler&&(it(ht).triggerHandler("ready"),it(ht).off("ready")))
                      }
                    }
                  }),
                  it.ready.promise=function(e){
                    if(!wt)if(wt=it.Deferred(),"complete"===ht.readyState)setTimeout(it.ready);
                    else if(ht.addEventListener)ht.addEventListener("DOMContentLoaded",s,!1),t.addEventListener("load",s,!1);
                    else{
                      ht.attachEvent("onreadystatechange",s),t.attachEvent("onload",s);
                      var n=!1;
                      try{
                        n=null==t.frameElement&&ht.documentElement
                      }catch(t){

                      }
                      n&&n.doScroll&&!function t(){
                        if(!it.isReady){
                          try{
                            n.doScroll("left")
                          }catch(e){
                            return setTimeout(t,50)
                          }
                          a(),it.ready()
                        }
                      }()
                    }
                    return wt.promise(e)
                  };
                  var Ct,kt="undefined";
                  for(Ct in it(nt))break;
                  nt.ownLast="0"!==Ct,
                  nt.inlineBlockNeedsLayout=!1,
                  it(function(){
                    var t,e,n,r;n=ht.getElementsByTagName("body")[0],n&&n.style&&(e=ht.createElement("div"),r=ht.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(e),
                    typeof e.style.zoom!==kt&&(e.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",nt.inlineBlockNeedsLayout=t=3===e.offsetWidth,t&&(n.style.zoom=1)),n.removeChild(r))
                  }),
                  function(){
                    var t=ht.createElement("div");
                    if(null==nt.deleteExpando){
                      nt.deleteExpando=!0;
                      try{
                        delete t.test
                      }catch(t){
                        nt.deleteExpando=!1
                      }
                    }
                    t=null
                  }(),
                  it.acceptData=function(t){
                    var e=it.noData[(t.nodeName+" ").toLowerCase()],n=+t.nodeType||1;
                    return(1===n||9===n)&&(!e||e!==!0&&t.getAttribute("classid")===e)
                  };
                  var Tt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,St=/([A-Z])/g;
                  it.extend({
                    cache:{},
                    noData:{
                      "applet ":!0,
                      "embed ":!0,
                      "object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                    },
                    hasData:function(t){
                      return t=t.nodeType?it.cache[t[it.expando]]:t[it.expando],!!t&&!u(t)
                    },
                    data:function(t,e,n){
                      return c(t,e,n)
                    },
                    removeData:function(t,e){
                      return d(t,e)
                    },
                    _data:function(t,e,n){
                      return c(t,e,n,!0)
                    },
                    _removeData:function(t,e){
                      return d(t,e,!0)
                    }
                  }),
                  it.fn.extend({
                    data:function(t,e){
                      var n,r,i,o=this[0],a=o&&o.attributes;
                      if(void 0===t){
                        if(this.length&&(i=it.data(o),1===o.nodeType&&!it._data(o,"parsedAttrs"))){
                          for(n=a.length;n--;)a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=it.camelCase(r.slice(5)),l(o,r,i[r])));
                          it._data(o,"parsedAttrs",!0)
                        }
                        return i
                      }
                      return"object"==typeof t?this.each(function(){it.data(this,t)}):arguments.length>1?this.each(function(){it.data(this,t,e)}):o?l(o,t,it.data(o,t)):void 0
                    },
                    removeData:function(t){
                      return this.each(function(){it.removeData(this,t)})
                    }
                  }),
                  it.extend({
                    queue:function(t,e,n){
                      var r;
                      return t?(e=(e||"fx")+"queue",r=it._data(t,e),n&&(!r||it.isArray(n)?r=it._data(t,e,it.makeArray(n)):r.push(n)),r||[]):void 0
                    },
                    dequeue:function(t,e){
                      e=e||"fx";
                      var n=it.queue(t,e),r=n.length,i=n.shift(),o=it._queueHooks(t,e),a=function(){it.dequeue(t,e)};
                      "inprogress"===i&&(i=n.shift(),r--),i&&("fx"===e&&n.unshift("inprogress"),delete o.stop,i.call(t,a,o)),!r&&o&&o.empty.fire()
                    },
                    _queueHooks:function(t,e){
                      var n=e+"queueHooks";
                      return it._data(t,n)||it._data(t,n,{empty:it.Callbacks("once memory").add(function(){it._removeData(t,e+"queue"),it._removeData(t,n)})})
                    }
                  }),
                  it.fn.extend({
                    queue:function(t,e){
                      var n=2;
                      return"string"!=typeof t&&(e=t,t="fx",n--),arguments.length<n?it.queue(this[0],t):void 0===e?this:this.each(function(){var n=it.queue(this,t,e);it._queueHooks(this,t),"fx"===t&&"inprogress"!==n[0]&&it.dequeue(this,t)})
                    },
                    dequeue:function(t){
                      return this.each(function(){it.dequeue(this,t)})
                    },
                    clearQueue:function(t){
                      return this.queue(t||"fx",[])
                    },
                    promise:function(t,e){
                      var n,r=1,i=it.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};
                      for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";a--;)n=it._data(o[a],t+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));
                      return s(),i.promise(e)
                    }
                  });
                  var _t=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,$t=["Top","Right","Bottom","Left"],Et=function(t,e){return t=e||t,"none"===it.css(t,"display")||!it.contains(t.ownerDocument,t)},Mt=it.access=function(t,e,n,r,i,o,a){var s=0,l=t.length,u=null==n;if("object"===it.type(n)){i=!0;for(s in n)it.access(t,e,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,it.isFunction(r)||(a=!0),u&&(a?(e.call(t,r),e=null):(u=e,e=function(t,e,n){return u.call(it(t),n)})),e))for(;l>s;s++)e(t[s],n,a?r:r.call(t[s],s,e(t[s],n)));return i?t:u?e.call(t):l?e(t[0],n):o},Nt=/^(?:checkbox|radio)$/i;
                  !function(){
                    var t=ht.createElement("input"),e=ht.createElement("div"),n=ht.createDocumentFragment();
                    if(e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",nt.leadingWhitespace=3===e.firstChild.nodeType,nt.tbody=!e.getElementsByTagName("tbody").length,nt.htmlSerialize=!!e.getElementsByTagName("link").length,nt.html5Clone="<:nav></:nav>"!==ht.createElement("nav").cloneNode(!0).outerHTML,t.type="checkbox",t.checked=!0,n.appendChild(t),nt.appendChecked=t.checked,e.innerHTML="<textarea>x</textarea>",nt.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue,n.appendChild(e),e.innerHTML="<input type='radio' checked='checked' name='t'/>",nt.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,nt.noCloneEvent=!0,e.attachEvent&&(e.attachEvent("onclick",function(){nt.noCloneEvent=!1}),e.cloneNode(!0).click()),null==nt.deleteExpando){
                      nt.deleteExpando=!0;
                      try{
                        delete e.test
                      }catch(t){
                        nt.deleteExpando=!1
                      }
                    }
                  }(),
                  function(){
                    var e,n,r=ht.createElement("div");
                    for(e in{submit:!0,change:!0,focusin:!0})n="on"+e,(nt[e+"Bubbles"]=n in t)||(r.setAttribute(n,"t"),nt[e+"Bubbles"]=r.attributes[n].expando===!1);
                    r=null
                  }();
                  var At=/^(?:input|select|textarea)$/i,Dt=/^key/,Lt=/^(?:mouse|pointer|contextmenu)|click/,jt=/^(?:focusinfocus|focusoutblur)$/,Pt=/^([^.]*)(?:\.(.+)|)$/;
                  it.event={
                    global:{},
                    add:function(t,e,n,r,i){
                      var o,a,s,l,u,c,d,p,f,h,m,g=it._data(t);
                      if(g){
                        for(n.handler&&(l=n,n=l.handler,i=l.selector),n.guid||(n.guid=it.guid++),(a=g.events)||(a=g.events={}),(c=g.handle)||(c=g.handle=function(t){return typeof it===kt||t&&it.event.triggered===t.type?void 0:it.event.dispatch.apply(c.elem,arguments)},c.elem=t),e=(e||"").match(bt)||[""],s=e.length;s--;)o=Pt.exec(e[s])||[],f=m=o[1],h=(o[2]||"").split(".").sort(),f&&(u=it.event.special[f]||{},f=(i?u.delegateType:u.bindType)||f,u=it.event.special[f]||{},d=it.extend({type:f,origType:m,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&it.expr.match.needsContext.test(i),namespace:h.join(".")},l),(p=a[f])||(p=a[f]=[],p.delegateCount=0,u.setup&&u.setup.call(t,r,h,c)!==!1||(t.addEventListener?t.addEventListener(f,c,!1):t.attachEvent&&t.attachEvent("on"+f,c))),u.add&&(u.add.call(t,d),d.handler.guid||(d.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,d):p.push(d),it.event.global[f]=!0);
                        t=null
                      }
                    },
                    remove:function(t,e,n,r,i){
                      var o,a,s,l,u,c,d,p,f,h,m,g=it.hasData(t)&&it._data(t);
                      if(g&&(c=g.events)){
                        for(e=(e||"").match(bt)||[""],u=e.length;u--;)if(s=Pt.exec(e[u])||[],f=m=s[1],h=(s[2]||"").split(".").sort(),f){for(d=it.event.special[f]||{},f=(r?d.delegateType:d.bindType)||f,p=c[f]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=p.length;o--;)a=p[o],!i&&m!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(p.splice(o,1),a.selector&&p.delegateCount--,d.remove&&d.remove.call(t,a));l&&!p.length&&(d.teardown&&d.teardown.call(t,h,g.handle)!==!1||it.removeEvent(t,f,g.handle),delete c[f])}else for(f in c)it.event.remove(t,f+e[u],n,r,!0);it.isEmptyObject(c)&&(delete g.handle,it._removeData(t,"events"))
                      }
                    },
                    trigger:function(e,n,r,i){
                      var o,a,s,l,u,c,d,p=[r||ht],f=et.call(e,"type")?e.type:e,h=et.call(e,"namespace")?e.namespace.split("."):[];if(s=c=r=r||ht,3!==r.nodeType&&8!==r.nodeType&&!jt.test(f+it.event.triggered)&&(f.indexOf(".")>=0&&(h=f.split("."),f=h.shift(),h.sort()),a=f.indexOf(":")<0&&"on"+f,e=e[it.expando]?e:new it.Event(f,"object"==typeof e&&e),e.isTrigger=i?2:3,e.namespace=h.join("."),e.namespace_re=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=r),n=null==n?[e]:it.makeArray(n,[e]),u=it.event.special[f]||{},i||!u.trigger||u.trigger.apply(r,n)!==!1)){if(!i&&!u.noBubble&&!it.isWindow(r)){for(l=u.delegateType||f,jt.test(l+f)||(s=s.parentNode);s;s=s.parentNode)p.push(s),c=s;c===(r.ownerDocument||ht)&&p.push(c.defaultView||c.parentWindow||t)}for(d=0;(s=p[d++])&&!e.isPropagationStopped();)e.type=d>1?l:u.bindType||f,o=(it._data(s,"events")||{})[e.type]&&it._data(s,"handle"),o&&o.apply(s,n),o=a&&s[a],o&&o.apply&&it.acceptData(s)&&(e.result=o.apply(s,n),e.result===!1&&e.preventDefault());if(e.type=f,!i&&!e.isDefaultPrevented()&&(!u._default||u._default.apply(p.pop(),n)===!1)&&it.acceptData(r)&&a&&r[f]&&!it.isWindow(r)){c=r[a],c&&(r[a]=null),it.event.triggered=f;try{r[f]()}catch(t){}it.event.triggered=void 0,c&&(r[a]=c)}return e.result}
                    },
                    dispatch:function(t){
                      t=it.event.fix(t);
                      var e,n,r,i,o,a=[],s=Q.call(arguments),l=(it._data(this,"events")||{})[t.type]||[],u=it.event.special[t.type]||{};
                      if(s[0]=t,t.delegateTarget=this,!u.preDispatch||u.preDispatch.call(this,t)!==!1){
                        for(a=it.event.handlers.call(this,t,l),e=0;(i=a[e++])&&!t.isPropagationStopped();)for(t.currentTarget=i.elem,o=0;(r=i.handlers[o++])&&!t.isImmediatePropagationStopped();)(!t.namespace_re||t.namespace_re.test(r.namespace))&&(t.handleObj=r,t.data=r.data,n=((it.event.special[r.origType]||{}).handle||r.handler).apply(i.elem,s),void 0!==n&&(t.result=n)===!1&&(t.preventDefault(),t.stopPropagation()));
                        return u.postDispatch&&u.postDispatch.call(this,t),t.result
                      }
                    },
                    handlers:function(t,e){
                      var n,r,i,o,a=[],s=e.delegateCount,l=t.target;
                      if(s&&l.nodeType&&(!t.button||"click"!==t.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==t.type)){for(i=[],o=0;s>o;o++)r=e[o],n=r.selector+" ",void 0===i[n]&&(i[n]=r.needsContext?it(n,this).index(l)>=0:it.find(n,this,null,[l]).length),i[n]&&i.push(r);i.length&&a.push({elem:l,handlers:i})}return s<e.length&&a.push({elem:this,handlers:e.slice(s)}),a
                    },
                    fix:function(t){
                      if(t[it.expando])return t;
                      var e,n,r,i=t.type,o=t,a=this.fixHooks[i];
                      for(a||(this.fixHooks[i]=a=Lt.test(i)?this.mouseHooks:Dt.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,t=new it.Event(o),e=r.length;e--;)n=r[e],t[n]=o[n];
                      return t.target||(t.target=o.srcElement||ht),3===t.target.nodeType&&(t.target=t.target.parentNode),t.metaKey=!!t.metaKey,a.filter?a.filter(t,o):t
                    },
                    props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks:{},
                    keyHooks:{
                      props:"char charCode key keyCode".split(" "),
                      filter:function(t,e){
                        return null==t.which&&(t.which=null!=e.charCode?e.charCode:e.keyCode),t
                      }
                    },
                    mouseHooks:{
                      props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                      filter:function(t,e){
                        var n,r,i,o=e.button,a=e.fromElement;
                        return null==t.pageX&&null!=e.clientX&&(r=t.target.ownerDocument||ht,i=r.documentElement,n=r.body,t.pageX=e.clientX+(i&&i.scrollLeft||n&&n.scrollLeft||0)-(i&&i.clientLeft||n&&n.clientLeft||0),t.pageY=e.clientY+(i&&i.scrollTop||n&&n.scrollTop||0)-(i&&i.clientTop||n&&n.clientTop||0)),!t.relatedTarget&&a&&(t.relatedTarget=a===t.target?e.toElement:a),t.which||void 0===o||(t.which=1&o?1:2&o?3:4&o?2:0),t
                      }
                    },
                    special:{
                      load:{
                        noBubble:!0
                      },
                      focus:{
                        trigger:function(){
                          if(this!==h()&&this.focus)try{return this.focus(),!1}catch(t){}
                        },
                        delegateType:"focusin"
                      },
                      blur:{
                        trigger:function(){
                          return this===h()&&this.blur?(this.blur(),!1):void 0
                        },
                        delegateType:"focusout"
                      },
                      click:{
                        trigger:function(){
                          return it.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0
                        },
                        _default:function(t){
                          return it.nodeName(t.target,"a")
                        }
                      },
                      beforeunload:{
                        postDispatch:function(t){
                          void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)
                        }
                      }
                    },
                    simulate:function(t,e,n,r){
                      var i=it.extend(new it.Event,n,{type:t,isSimulated:!0,originalEvent:{}});
                      r?it.event.trigger(i,null,e):it.event.dispatch.call(e,i),i.isDefaultPrevented()&&n.preventDefault()
                    }
                  },
                  it.removeEvent=ht.removeEventListener?function(t,e,n){
                    t.removeEventListener&&t.removeEventListener(e,n,!1)
                  }:function(t,e,n){
                    var r="on"+e;
                    t.detachEvent&&(typeof t[r]===kt&&(t[r]=null),t.detachEvent(r,n))
                  },
                  it.Event=function(t,e){
                    return this instanceof it.Event?(t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&t.returnValue===!1?p:f):this.type=t,e&&it.extend(this,e),this.timeStamp=t&&t.timeStamp||it.now(),void(this[it.expando]=!0)):new it.Event(t,e)
                  },
                  it.Event.prototype={
                    isDefaultPrevented:f,
                    isPropagationStopped:f,
                    isImmediatePropagationStopped:f,
                    preventDefault:function(){
                      var t=this.originalEvent;
                      this.isDefaultPrevented=p,t&&(t.preventDefault?t.preventDefault():t.returnValue=!1)
                    },
                    stopPropagation:function(){
                      var t=this.originalEvent;
                      this.isPropagationStopped=p,t&&(t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0)
                    },
                    stopImmediatePropagation:function(){
                      var t=this.originalEvent;
                      this.isImmediatePropagationStopped=p,t&&t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.stopPropagation()
                    }
                  },
                  it.each({
                    mouseenter:"mouseover",
                    mouseleave:"mouseout",
                    pointerenter:"pointerover",
                    pointerleave:"pointerout"
                  },
                  function(t,e){
                    it.event.special[t]={
                      delegateType:e,
                      bindType:e,
                      handle:function(t){
                        var n,r=this,i=t.relatedTarget,o=t.handleObj;
                        return(!i||i!==r&&!it.contains(r,i))&&(t.type=o.origType,n=o.handler.apply(this,arguments),t.type=e),n
                      }
                    }
                  }),
                  nt.submitBubbles||(it.event.special.submit={
                    setup:function(){
                      return!it.nodeName(this,"form")&&void it.event.add(this,"click._submit keypress._submit",function(t){var e=t.target,n=it.nodeName(e,"input")||it.nodeName(e,"button")?e.form:void 0;n&&!it._data(n,"submitBubbles")&&(it.event.add(n,"submit._submit",function(t){t._submit_bubble=!0}),it._data(n,"submitBubbles",!0))})
                    },
                    postDispatch:function(t){
                      t._submit_bubble&&(delete t._submit_bubble,this.parentNode&&!t.isTrigger&&it.event.simulate("submit",this.parentNode,t,!0))
                    },
                    teardown:function(){
                      return!it.nodeName(this,"form")&&void it.event.remove(this,"._submit")
                    }
                  }),
                  nt.changeBubbles||(it.event.special.change={
                    setup:function(){
                      return At.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(it.event.add(this,"propertychange._change",function(t){"checked"===t.originalEvent.propertyName&&(this._just_changed=!0)}),it.event.add(this,"click._change",function(t){this._just_changed&&!t.isTrigger&&(this._just_changed=!1),it.event.simulate("change",this,t,!0)})),!1):void it.event.add(this,"beforeactivate._change",function(t){var e=t.target;At.test(e.nodeName)&&!it._data(e,"changeBubbles")&&(it.event.add(e,"change._change",function(t){!this.parentNode||t.isSimulated||t.isTrigger||it.event.simulate("change",this.parentNode,t,!0)}),it._data(e,"changeBubbles",!0))})
                    },
                    handle:function(t){
                      var e=t.target;
                      return this!==e||t.isSimulated||t.isTrigger||"radio"!==e.type&&"checkbox"!==e.type?t.handleObj.handler.apply(this,arguments):void 0
                    },
                    teardown:function(){
                      return it.event.remove(this,"._change"),!At.test(this.nodeName)
                    }
                  }),
                  nt.focusinBubbles||it.each({
                    focus:"focusin",
                    blur:"focusout"
                  },
                  function(t,e){
                    var n=function(t){it.event.simulate(e,t.target,it.event.fix(t),!0)};
                    it.event.special[e]={
                      setup:function(){
                        var r=this.ownerDocument||this,i=it._data(r,e);
                        i||r.addEventListener(t,n,!0),it._data(r,e,(i||0)+1)
                      },
                      teardown:function(){
                        var r=this.ownerDocument||this,i=it._data(r,e)-1;
                        i?it._data(r,e,i):(r.removeEventListener(t,n,!0),it._removeData(r,e))
                      }
                    }
                  }),
                  it.fn.extend({
                    on:function(t,e,n,r,i){
                      var o,a;
                      if("object"==typeof t){
                        "string"!=typeof e&&(n=n||e,e=void 0);
                        for(o in t)this.on(o,e,n,t[o],i);
                        return this
                      }
                      if(null==n&&null==r?(r=e,n=e=void 0):null==r&&("string"==typeof e?(r=n,n=void 0):(r=n,n=e,e=void 0)),r===!1)r=f;
                      else if(!r)return this;
                      return 1===i&&(a=r,r=function(t){return it().off(t),a.apply(this,arguments)},r.guid=a.guid||(a.guid=it.guid++)),this.each(function(){it.event.add(this,t,r,n,e)})
                    },
                    one:function(t,e,n,r){
                      return this.on(t,e,n,r,1)
                    },
                    off:function(t,e,n){
                      var r,i;
                      if(t&&t.preventDefault&&t.handleObj)return r=t.handleObj,it(t.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof t){for(i in t)this.off(i,e,t[i]);return this}return(e===!1||"function"==typeof e)&&(n=e,e=void 0),n===!1&&(n=f),this.each(function(){it.event.remove(this,t,n,e)})
                    },
                    trigger:function(t,e){
                      return this.each(function(){
                        it.event.trigger(t,e,this)
                      })
                    },
                    triggerHandler:function(t,e){
                      var n=this[0];
                      return n?it.event.trigger(t,e,n,!0):void 0
                    }
                  });
                  var Ot="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",It=/ jQuery\d+="(?:null|\d+)"/g,qt=new RegExp("<(?:"+Ot+")[\\s/>]","i"),Ht=/^\s+/,Ft=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,zt=/<([\w:]+)/,Bt=/<tbody/i,Wt=/<|&#?\w+;/,Rt=/<(?:script|style|link)/i,Gt=/checked\s*(?:[^=]|=\s*.checked.)/i,Ut=/^$|\/(?:java|ecma)script/i,Xt=/^true\/(.*)/,Vt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Qt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:nt.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},Zt=m(ht),Jt=Zt.appendChild(ht.createElement("div"));
                  Qt.optgroup=Qt.option,Qt.tbody=Qt.tfoot=Qt.colgroup=Qt.caption=Qt.thead,Qt.th=Qt.td,it.extend({
                    clone:function(t,e,n){
                      var r,i,o,a,s,l=it.contains(t.ownerDocument,t);
                      if(nt.html5Clone||it.isXMLDoc(t)||!qt.test("<"+t.nodeName+">")?o=t.cloneNode(!0):(Jt.innerHTML=t.outerHTML,Jt.removeChild(o=Jt.firstChild)),!(nt.noCloneEvent&&nt.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||it.isXMLDoc(t)))for(r=g(o),s=g(t),a=0;null!=(i=s[a]);++a)r[a]&&k(i,r[a]);
                      if(e)if(n)for(s=s||g(t),r=r||g(o),a=0;null!=(i=s[a]);a++)C(i,r[a]);
                      else C(t,o);
                      return r=g(o,"script"),r.length>0&&w(r,!l&&g(t,"script")),r=s=i=null,o
                    },
                    buildFragment:function(t,e,n,r){
                      for(var i,o,a,s,l,u,c,d=t.length,p=m(e),f=[],h=0;d>h;h++)if(o=t[h],o||0===o)if("object"===it.type(o))it.merge(f,o.nodeType?[o]:o);else if(Wt.test(o)){for(s=s||p.appendChild(e.createElement("div")),l=(zt.exec(o)||["",""])[1].toLowerCase(),c=Qt[l]||Qt._default,s.innerHTML=c[1]+o.replace(Ft,"<$1></$2>")+c[2],i=c[0];i--;)s=s.lastChild;if(!nt.leadingWhitespace&&Ht.test(o)&&f.push(e.createTextNode(Ht.exec(o)[0])),!nt.tbody)for(o="table"!==l||Bt.test(o)?"<table>"!==c[1]||Bt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;i--;)it.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u);for(it.merge(f,s.childNodes),s.textContent="";s.firstChild;)s.removeChild(s.firstChild);s=p.lastChild}else f.push(e.createTextNode(o));for(s&&p.removeChild(s),nt.appendChecked||it.grep(g(f,"input"),v),h=0;o=f[h++];)if((!r||-1===it.inArray(o,r))&&(a=it.contains(o.ownerDocument,o),s=g(p.appendChild(o),"script"),a&&w(s),n))for(i=0;o=s[i++];)Ut.test(o.type||"")&&n.push(o);
                      return s=null,p
                    },
                    cleanData:function(t,e){
                      for(var n,r,i,o,a=0,s=it.expando,l=it.cache,u=nt.deleteExpando,c=it.event.special;null!=(n=t[a]);a++)if((e||it.acceptData(n))&&(i=n[s],o=i&&l[i])){if(o.events)for(r in o.events)c[r]?it.event.remove(n,r):it.removeEvent(n,r,o.handle);l[i]&&(delete l[i],u?delete n[s]:typeof n.removeAttribute!==kt?n.removeAttribute(s):n[s]=null,V.push(i))}
                    }
                  }),
                  it.fn.extend({
                    text:function(t){
                      return Mt(this,function(t){return void 0===t?it.text(this):this.empty().append((this[0]&&this[0].ownerDocument||ht).createTextNode(t))},null,t,arguments.length)
                    },
                    append:function(){
                      return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=y(this,t);e.appendChild(t)}})
                    },
                    prepend:function(){
                      return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=y(this,t);e.insertBefore(t,e.firstChild)}})
                    },
                    before:function(){
                      return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})
                    },
                    after:function(){
                      return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})
                    },
                    remove:function(t,e){
                      for(var n,r=t?it.filter(t,this):this,i=0;null!=(n=r[i]);i++)e||1!==n.nodeType||it.cleanData(g(n)),n.parentNode&&(e&&it.contains(n.ownerDocument,n)&&w(g(n,"script")),n.parentNode.removeChild(n));
                      return this
                    },
                    empty:function(){
                      for(var t,e=0;null!=(t=this[e]);e++){
                        for(1===t.nodeType&&it.cleanData(g(t,!1));t.firstChild;)t.removeChild(t.firstChild);
                        t.options&&it.nodeName(t,"select")&&(t.options.length=0)
                      }
                      return this
                    },
                    clone:function(t,e){
                      return t=null!=t&&t,e=null==e?t:e,this.map(function(){return it.clone(this,t,e)})
                    },
                    html:function(t){
                      return Mt(this,function(t){var e=this[0]||{},n=0,r=this.length;if(void 0===t)return 1===e.nodeType?e.innerHTML.replace(It,""):void 0;if(!("string"!=typeof t||Rt.test(t)||!nt.htmlSerialize&&qt.test(t)||!nt.leadingWhitespace&&Ht.test(t)||Qt[(zt.exec(t)||["",""])[1].toLowerCase()])){t=t.replace(Ft,"<$1></$2>");try{for(;r>n;n++)e=this[n]||{},1===e.nodeType&&(it.cleanData(g(e,!1)),e.innerHTML=t);e=0}catch(t){}}e&&this.empty().append(t)},null,t,arguments.length)
                    },
                    replaceWith:function(){
                      var t=arguments[0];
                      return this.domManip(arguments,function(e){t=this.parentNode,it.cleanData(g(this)),t&&t.replaceChild(e,this)}),t&&(t.length||t.nodeType)?this:this.remove()
                    },
                    detach:function(t){
                      return this.remove(t,!0)
                    },
                    domManip:function(t,e){
                      t=Z.apply([],t);
                      var n,r,i,o,a,s,l=0,u=this.length,c=this,d=u-1,p=t[0],f=it.isFunction(p);
                      if(f||u>1&&"string"==typeof p&&!nt.checkClone&&Gt.test(p))return this.each(function(n){var r=c.eq(n);f&&(t[0]=p.call(this,n,r.html())),r.domManip(t,e)});
                      if(u&&(s=it.buildFragment(t,this[0].ownerDocument,!1,this),n=s.firstChild,1===s.childNodes.length&&(s=n),n)){
                        for(o=it.map(g(s,"script"),b),i=o.length;u>l;l++)r=s,l!==d&&(r=it.clone(r,!0,!0),i&&it.merge(o,g(r,"script"))),e.call(this[l],r,l);if(i)for(a=o[o.length-1].ownerDocument,it.map(o,x),l=0;i>l;l++)r=o[l],Ut.test(r.type||"")&&!it._data(r,"globalEval")&&it.contains(a,r)&&(r.src?it._evalUrl&&it._evalUrl(r.src):it.globalEval((r.text||r.textContent||r.innerHTML||"").replace(Vt,"")));s=n=null
                      }
                      return this
                    }
                  }),
                  it.each({
                    appendTo:"append",
                    prependTo:"prepend",
                    insertBefore:"before",
                    insertAfter:"after",
                    replaceAll:"replaceWith"
                  },
                  function(t,e){
                    it.fn[t]=function(t){
                      for(var n,r=0,i=[],o=it(t),a=o.length-1;a>=r;r++)n=r===a?this:this.clone(!0),it(o[r])[e](n),J.apply(i,n.get());
                      return this.pushStack(i)
                    }
                  });
                  var Kt,Yt={};
                  !function(){
                    var t;
                    nt.shrinkWrapBlocks=function(){
                      if(null!=t)return t;
                      t=!1;
                      var e,n,r;
                      return n=ht.getElementsByTagName("body")[0],n&&n.style?(e=ht.createElement("div"),r=ht.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(e),typeof e.style.zoom!==kt&&(e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",e.appendChild(ht.createElement("div")).style.width="5px",t=3!==e.offsetWidth),n.removeChild(r),t):void 0
                    }
                  }();
                  var te,ee,ne=/^margin/,re=new RegExp("^("+_t+")(?!px)[a-z%]+$","i"),ie=/^(top|right|bottom|left)$/;
                  t.getComputedStyle?(te=function(e){return e.ownerDocument.defaultView.opener?e.ownerDocument.defaultView.getComputedStyle(e,null):t.getComputedStyle(e,null)},
                  ee=function(t,e,n){
                    var r,i,o,a,s=t.style;
                    return n=n||te(t),a=n?n.getPropertyValue(e)||n[e]:void 0,n&&(""!==a||it.contains(t.ownerDocument,t)||(a=it.style(t,e)),re.test(a)&&ne.test(e)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0===a?a:a+""
                  }):ht.documentElement.currentStyle&&(te=function(t){
                    return t.currentStyle
                  },ee=function(t,e,n){
                    var r,i,o,a,s=t.style;
                    return n=n||te(t),a=n?n[e]:void 0,null==a&&s&&s[e]&&(a=s[e]),re.test(a)&&!ie.test(e)&&(r=s.left,i=t.runtimeStyle,o=i&&i.left,o&&(i.left=t.currentStyle.left),s.left="fontSize"===e?"1em":a,a=s.pixelLeft+"px",s.left=r,o&&(i.left=o)),void 0===a?a:a+""||"auto"
                  }),
                  !function(){
                    function e(){
                      var e,n,r,i;
                      n=ht.getElementsByTagName("body")[0],n&&n.style&&(e=ht.createElement("div"),r=ht.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(e),e.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",o=a=!1,l=!0,t.getComputedStyle&&(o="1%"!==(t.getComputedStyle(e,null)||{}).top,a="4px"===(t.getComputedStyle(e,null)||{width:"4px"}).width,i=e.appendChild(ht.createElement("div")),i.style.cssText=e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",e.style.width="1px",l=!parseFloat((t.getComputedStyle(i,null)||{}).marginRight),e.removeChild(i)),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=e.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",s=0===i[0].offsetHeight,s&&(i[0].style.display="",i[1].style.display="none",s=0===i[0].offsetHeight),n.removeChild(r))
                    }
                    var n,r,i,o,a,s,l;
                    n=ht.createElement("div"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",i=n.getElementsByTagName("a")[0],(r=i&&i.style)&&(r.cssText="float:left;opacity:.5",nt.opacity="0.5"===r.opacity,nt.cssFloat=!!r.cssFloat,n.style.backgroundClip="content-box",n.cloneNode(!0).style.backgroundClip="",nt.clearCloneStyle="content-box"===n.style.backgroundClip,nt.boxSizing=""===r.boxSizing||""===r.MozBoxSizing||""===r.WebkitBoxSizing,it.extend(nt,{reliableHiddenOffsets:function(){return null==s&&e(),s},boxSizingReliable:function(){return null==a&&e(),a},pixelPosition:function(){return null==o&&e(),o},reliableMarginRight:function(){return null==l&&e(),l}}))
                  }(),
                  it.swap=function(t,e,n,r){
                    var i,o,a={};
                    for(o in e)a[o]=t.style[o],t.style[o]=e[o];i=n.apply(t,r||[]);
                    for(o in e)t.style[o]=a[o];
                    return i
                  };
                  var oe=/alpha\([^)]*\)/i,ae=/opacity\s*=\s*([^)]*)/,se=/^(none|table(?!-c[ea]).+)/,le=new RegExp("^("+_t+")(.*)$","i"),ue=new RegExp("^([+-])=("+_t+")","i"),ce={position:"absolute",visibility:"hidden",display:"block"},de={letterSpacing:"0",fontWeight:"400"},pe=["Webkit","O","Moz","ms"];
                  it.extend({
                    cssHooks:{
                      opacity:{
                        get:function(t,e){
                          if(e){
                            var n=ee(t,"opacity");
                            return""===n?"1":n
                          }
                        }
                      }
                    },
                    cssNumber:{
                      columnCount:!0,
                      fillOpacity:!0,
                      flexGrow:!0,
                      flexShrink:!0,
                      fontWeight:!0,
                      lineHeight:!0,
                      opacity:!0,
                      order:!0,
                      orphans:!0,
                      widows:!0,
                      zIndex:!0,
                      zoom:!0
                    },
                    cssProps:{
                      "float":nt.cssFloat?"cssFloat":"styleFloat"
                    },
                    style:function(t,e,n,r){
                      if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){
                        var i,o,a,s=it.camelCase(e),l=t.style;
                        if(e=it.cssProps[s]||(it.cssProps[s]=$(l,s)),a=it.cssHooks[e]||it.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(t,!1,r))?i:l[e];
                        if(o=typeof n,"string"===o&&(i=ue.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(it.css(t,e)),o="number"),null!=n&&n===n&&("number"!==o||it.cssNumber[s]||(n+="px"),nt.clearCloneStyle||""!==n||0!==e.indexOf("background")||(l[e]="inherit"),!(a&&"set"in a&&void 0===(n=a.set(t,n,r)))))try{l[e]=n}catch(t){}
                      }
                    },
                    css:function(t,e,n,r){
                      var i,o,a,s=it.camelCase(e);
                      return e=it.cssProps[s]||(it.cssProps[s]=$(t.style,s)),a=it.cssHooks[e]||it.cssHooks[s],a&&"get"in a&&(o=a.get(t,!0,n)),void 0===o&&(o=ee(t,e,r)),"normal"===o&&e in de&&(o=de[e]),""===n||n?(i=parseFloat(o),n===!0||it.isNumeric(i)?i||0:o):o
                    }
                  }),
                  it.each(["height","width"],function(t,e){
                    it.cssHooks[e]={
                      get:function(t,n,r){
                        return n?se.test(it.css(t,"display"))&&0===t.offsetWidth?it.swap(t,ce,function(){return A(t,e,r)}):A(t,e,r):void 0
                      },
                      set:function(t,n,r){
                        var i=r&&te(t);
                        return M(t,n,r?N(t,e,r,nt.boxSizing&&"border-box"===it.css(t,"boxSizing",!1,i),i):0)
                      }
                    }
                  }),
                  nt.opacity||(it.cssHooks.opacity={
                    get:function(t,e){
                      return ae.test((e&&t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":e?"1":""
                    },
                    set:function(t,e){
                      var n=t.style,r=t.currentStyle,i=it.isNumeric(e)?"alpha(opacity="+100*e+")":"",o=r&&r.filter||n.filter||"";
                      n.zoom=1,(e>=1||""===e)&&""===it.trim(o.replace(oe,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===e||r&&!r.filter)||(n.filter=oe.test(o)?o.replace(oe,i):o+" "+i)
                    }
                  }),
                  it.cssHooks.marginRight=_(nt.reliableMarginRight,function(t,e){
                    return e?it.swap(t,{
                      display:"inline-block"
                    },ee,[t,"marginRight"]):void 0}),it.each({
                      margin:"",
                      padding:"",
                      border:"Width"
                    },function(t,e){
                      it.cssHooks[t+e]={
                        expand:function(n){
                          for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[t+$t[r]+e]=o[r]||o[r-2]||o[0];
                          return i
                        }
                      },
                      ne.test(t)||(it.cssHooks[t+e].set=M)
                    }),
                    it.fn.extend({
                      css:function(t,e){
                        return Mt(this,function(t,e,n){var r,i,o={},a=0;if(it.isArray(e)){for(r=te(t),i=e.length;i>a;a++)o[e[a]]=it.css(t,e[a],!1,r);return o}return void 0!==n?it.style(t,e,n):it.css(t,e)},t,e,arguments.length>1)
                      },
                      show:function(){
                        return E(this,!0)
                      },
                      hide:function(){
                        return E(this)
                      },
                      toggle:function(t){
                        return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){
                          Et(this)?it(this).show():it(this).hide()
                        })
                      }
                    }),
                    it.Tween=D,D.prototype={
                      constructor:D,
                      init:function(t,e,n,r,i,o){
                        this.elem=t,this.prop=n,this.easing=i||"swing",this.options=e,this.start=this.now=this.cur(),this.end=r,this.unit=o||(it.cssNumber[n]?"":"px")
                      },
                      cur:function(){
                        var t=D.propHooks[this.prop];
                        return t&&t.get?t.get(this):D.propHooks._default.get(this)
                      },
                      run:function(t){
                        var e,n=D.propHooks[this.prop];
                        return this.options.duration?this.pos=e=it.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):this.pos=e=t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):D.propHooks._default.set(this),this
                      }
                    },
                    D.prototype.init.prototype=D.prototype,D.propHooks={
                      _default:{
                        get:function(t){
                          var e;
                          return null==t.elem[t.prop]||t.elem.style&&null!=t.elem.style[t.prop]?(e=it.css(t.elem,t.prop,""),e&&"auto"!==e?e:0):t.elem[t.prop]
                        },
                        set:function(t){
                          it.fx.step[t.prop]?it.fx.step[t.prop](t):t.elem.style&&(null!=t.elem.style[it.cssProps[t.prop]]||it.cssHooks[t.prop])?it.style(t.elem,t.prop,t.now+t.unit):t.elem[t.prop]=t.now
                        }
                      }
                    },
                    D.propHooks.scrollTop=D.propHooks.scrollLeft={
                      set:function(t){
                        t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)
                      }
                    },
                    it.easing={
                      linear:function(t){
                        return t
                      },
                      swing:function(t){
                        return.5-Math.cos(t*Math.PI)/2
                      }
                    },
                    it.fx=D.prototype.init,it.fx.step={};
                    var fe,he,me=/^(?:toggle|show|hide)$/,ge=new RegExp("^(?:([+-])=|)("+_t+")([a-z%]*)$","i"),ve=/queueHooks$/,ye=[O],be={
                      "*":[function(t,e){
                        var n=this.createTween(t,e),r=n.cur(),i=ge.exec(e),o=i&&i[3]||(it.cssNumber[t]?"":"px"),a=(it.cssNumber[t]||"px"!==o&&+r)&&ge.exec(it.css(n.elem,t)),s=1,l=20;
                        if(a&&a[3]!==o){
                          o=o||a[3],i=i||[],a=+r||1;
                          do s=s||".5",a/=s,it.style(n.elem,t,a+o);
                          while(s!==(s=n.cur()/r)&&1!==s&&--l)
                        }
                        return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n
                      }]
                    };
                    it.Animation=it.extend(q,{
                      tweener:function(t,e){
                        it.isFunction(t)?(e=t,t=["*"]):t=t.split(" ");
                        for(var n,r=0,i=t.length;i>r;r++)n=t[r],be[n]=be[n]||[],be[n].unshift(e)
                      },
                      prefilter:function(t,e){
                        e?ye.unshift(t):ye.push(t)
                      }
                    }),
                    it.speed=function(t,e,n){
                      var r=t&&"object"==typeof t?it.extend({},t):{complete:n||!n&&e||it.isFunction(t)&&t,duration:t,easing:n&&e||e&&!it.isFunction(e)&&e};
                      return r.duration=it.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in it.fx.speeds?it.fx.speeds[r.duration]:it.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){it.isFunction(r.old)&&r.old.call(this),r.queue&&it.dequeue(this,r.queue)},r
                    },
                    it.fn.extend({
                      fadeTo:function(t,e,n,r){
                        return this.filter(Et).css("opacity",0).show().end().animate({opacity:e},t,n,r)
                      },
                      animate:function(t,e,n,r){
                        var i=it.isEmptyObject(t),o=it.speed(e,n,r),a=function(){
                          var e=q(this,it.extend({},t),o);
                          (i||it._data(this,"finish"))&&e.stop(!0)};
                          return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)
                        },
                        stop:function(t,e,n){
                          var r=function(t){
                            var e=t.stop;
                            delete t.stop,e(n)};
                            return"string"!=typeof t&&(n=e,e=t,t=void 0),e&&t!==!1&&this.queue(t||"fx",[]),this.each(function(){
                              var e=!0,i=null!=t&&t+"queueHooks",o=it.timers,a=it._data(this);
                              if(i)a[i]&&a[i].stop&&r(a[i]);
                              else for(i in a)a[i]&&a[i].stop&&ve.test(i)&&r(a[i]);
                              for(i=o.length;i--;)o[i].elem!==this||null!=t&&o[i].queue!==t||(o[i].anim.stop(n),e=!1,o.splice(i,1));(e||!n)&&it.dequeue(this,t)
                            })
                        },
                        finish:function(t){
                          return t!==!1&&(t=t||"fx"),this.each(function(){
                            var e,n=it._data(this),r=n[t+"queue"],i=n[t+"queueHooks"],o=it.timers,a=r?r.length:0;for(n.finish=!0,it.queue(this,t,[]),i&&i.stop&&i.stop.call(this,!0),e=o.length;e--;)o[e].elem===this&&o[e].queue===t&&(o[e].anim.stop(!0),o.splice(e,1));
                            for(e=0;a>e;e++)r[e]&&r[e].finish&&r[e].finish.call(this);
                            delete n.finish
                          })
                        }
                    }),
                    it.each(["toggle","show","hide"],function(t,e){
                      var n=it.fn[e];
                      it.fn[e]=function(t,r,i){
                        return null==t||"boolean"==typeof t?n.apply(this,arguments):this.animate(j(e,!0),t,r,i)
                      }
                    }),
                    it.each({
                      slideDown:j("show"),
                      slideUp:j("hide"),
                      slideToggle:j("toggle"),
                      fadeIn:{opacity:"show"},
                      fadeOut:{opacity:"hide"},
                      fadeToggle:{opacity:"toggle"}
                    },
                    function(t,e){
                      it.fn[t]=function(t,n,r){
                        return this.animate(e,t,n,r)
                      }
                    }),
                    it.timers=[],it.fx.tick=function(){
                      var t,e=it.timers,n=0;
                      for(fe=it.now();n<e.length;n++)t=e[n],t()||e[n]!==t||e.splice(n--,1);
                      e.length||it.fx.stop(),fe=void 0
                    },
                    it.fx.timer=function(t){
                      it.timers.push(t),t()?it.fx.start():it.timers.pop()
                    },
                    it.fx.interval=13,it.fx.start=function(){
                      he||(he=setInterval(it.fx.tick,it.fx.interval))
                    },
                    it.fx.stop=function(){
                      clearInterval(he),he=null
                    },
                    it.fx.speeds={
                      slow:600,
                      fast:200,
                      _default:400
                    },
                    it.fn.delay=function(t,e){
                      return t=it.fx?it.fx.speeds[t]||t:t,e=e||"fx",this.queue(e,function(e,n){
                        var r=setTimeout(e,t);
                        n.stop=function(){
                          clearTimeout(r)
                        }
                      })
                    },
                    function(){
                      var t,e,n,r,i;
                      e=ht.createElement("div"),e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",r=e.getElementsByTagName("a")[0],n=ht.createElement("select"),i=n.appendChild(ht.createElement("option")),t=e.getElementsByTagName("input")[0],r.style.cssText="top:1px",nt.getSetAttribute="t"!==e.className,nt.style=/top/.test(r.getAttribute("style")),nt.hrefNormalized="/a"===r.getAttribute("href"),nt.checkOn=!!t.value,nt.optSelected=i.selected,nt.enctype=!!ht.createElement("form").enctype,n.disabled=!0,nt.optDisabled=!i.disabled,t=ht.createElement("input"),t.setAttribute("value",""),nt.input=""===t.getAttribute("value"),t.value="t",t.setAttribute("type","radio"),nt.radioValue="t"===t.value
                    }();
                    var xe=/\r/g;
                    it.fn.extend({
                      val:function(t){
                        var e,n,r,i=this[0];
                        return arguments.length?(r=it.isFunction(t),this.each(function(n){
                          var i;
                          1===this.nodeType&&(i=r?t.call(this,n,it(this).val()):t,null==i?i="":"number"==typeof i?i+="":it.isArray(i)&&(i=it.map(i,function(t){return null==t?"":t+""})),e=it.valHooks[this.type]||it.valHooks[this.nodeName.toLowerCase()],e&&"set"in e&&void 0!==e.set(this,i,"value")||(this.value=i))
                        })):i?(e=it.valHooks[i.type]||it.valHooks[i.nodeName.toLowerCase()],e&&"get"in e&&void 0!==(n=e.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(xe,""):null==n?"":n)):void 0
                      }
                    }),
                    it.extend({
                      valHooks:{
                        option:{
                          get:function(t){
                            var e=it.find.attr(t,"value");
                            return null!=e?e:it.trim(it.text(t))
                          }
                        },
                        select:{
                          get:function(t){
                            for(var e,n,r=t.options,i=t.selectedIndex,o="select-one"===t.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(nt.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&it.nodeName(n.parentNode,"optgroup"))){if(e=it(n).val(),o)return e;a.push(e)}return a
                          },
                          set:function(t,e){
                            for(var n,r,i=t.options,o=it.makeArray(e),a=i.length;a--;)if(r=i[a],it.inArray(it.valHooks.option.get(r),o)>=0)try{r.selected=n=!0}catch(t){r.scrollHeight}else r.selected=!1;return n||(t.selectedIndex=-1),i
                          }
                        }
                      }
                    }),
                    it.each(["radio","checkbox"],function(){
                      it.valHooks[this]={
                        set:function(t,e){
                          return it.isArray(e)?t.checked=it.inArray(it(t).val(),e)>=0:void 0
                        }
                      },
                      nt.checkOn||(it.valHooks[this].get=function(t){
                        return null===t.getAttribute("value")?"on":t.value
                      })
                    });
                    var we,Ce,ke=it.expr.attrHandle,Te=/^(?:checked|selected)$/i,Se=nt.getSetAttribute,_e=nt.input;
                    it.fn.extend({
                      attr:function(t,e){
                        return Mt(this,it.attr,t,e,arguments.length>1)
                      },
                      removeAttr:function(t){
                        return this.each(function(){
                          it.removeAttr(this,t)
                        })
                      }
                    }),
                    it.extend({
                      attr:function(t,e,n){
                        var r,i,o=t.nodeType;
                        if(t&&3!==o&&8!==o&&2!==o)return typeof t.getAttribute===kt?it.prop(t,e,n):(1===o&&it.isXMLDoc(t)||(e=e.toLowerCase(),r=it.attrHooks[e]||(it.expr.match.bool.test(e)?Ce:we)),void 0===n?r&&"get"in r&&null!==(i=r.get(t,e))?i:(i=it.find.attr(t,e),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(t,n,e))?i:(t.setAttribute(e,n+""),n):void it.removeAttr(t,e))
                      },
                      removeAttr:function(t,e){
                        var n,r,i=0,o=e&&e.match(bt);
                        if(o&&1===t.nodeType)for(;n=o[i++];)r=it.propFix[n]||n,it.expr.match.bool.test(n)?_e&&Se||!Te.test(n)?t[r]=!1:t[it.camelCase("default-"+n)]=t[r]=!1:it.attr(t,n,""),t.removeAttribute(Se?n:r)
                      },
                      attrHooks:{
                        type:{
                          set:function(t,e){
                            if(!nt.radioValue&&"radio"===e&&it.nodeName(t,"input")){
                              var n=t.value;
                              return t.setAttribute("type",e),n&&(t.value=n),e
                            }
                          }
                        }
                      }
                    }),
                    Ce={
                      set:function(t,e,n){
                        return e===!1?it.removeAttr(t,n):_e&&Se||!Te.test(n)?t.setAttribute(!Se&&it.propFix[n]||n,n):t[it.camelCase("default-"+n)]=t[n]=!0,n
                      }
                    },
                    it.each(it.expr.match.bool.source.match(/\w+/g),function(t,e){
                      var n=ke[e]||it.find.attr;ke[e]=_e&&Se||!Te.test(e)?function(t,e,r){
                        var i,o;
                        return r||(o=ke[e],ke[e]=i,i=null!=n(t,e,r)?e.toLowerCase():null,ke[e]=o),i
                      }:function(t,e,n){
                        return n?void 0:t[it.camelCase("default-"+e)]?e.toLowerCase():null
                      }
                    }),
                    _e&&Se||(it.attrHooks.value={
                      set:function(t,e,n){
                        return it.nodeName(t,"input")?void(t.defaultValue=e):we&&we.set(t,e,n)}}),Se||(we={
                          set:function(t,e,n){
                            var r=t.getAttributeNode(n);
                            return r||t.setAttributeNode(r=t.ownerDocument.createAttribute(n)),r.value=e+="","value"===n||e===t.getAttribute(n)?e:void 0
                          }
                        },ke.id=ke.name=ke.coords=function(t,e,n){
                          var r;
                          return n?void 0:(r=t.getAttributeNode(e))&&""!==r.value?r.value:null
                        },
                        it.valHooks.button={
                          get:function(t,e){
                            var n=t.getAttributeNode(e);
                            return n&&n.specified?n.value:void 0
                          },
                          set:we.set
                        },
                        it.attrHooks.contenteditable={
                          set:function(t,e,n){
                            we.set(t,""!==e&&e,n)
                          }
                        },
                        it.each(["width","height"],function(t,e){
                          it.attrHooks[e]={
                            set:function(t,n){
                              return""===n?(t.setAttribute(e,"auto"),n):void 0
                            }
                          }
                        })),
                        nt.style||(it.attrHooks.style={
                          get:function(t){
                            return t.style.cssText||void 0
                          },
                          set:function(t,e){
                            return t.style.cssText=e+""
                          }
                        });
                        var $e=/^(?:input|select|textarea|button|object)$/i,Ee=/^(?:a|area)$/i;
                        it.fn.extend({
                          prop:function(t,e){
                            return Mt(this,it.prop,t,e,arguments.length>1)
                          },
                          removeProp:function(t){
                            return t=it.propFix[t]||t,this.each(function(){
                              try{
                                this[t]=void 0,delete this[t]
                              }catch(t){

                              }
                            })
                          }
                        }),
                        it.extend({
                          propFix:{
                            "for":"htmlFor",
                            "class":"className"
                          },
                          prop:function(t,e,n){
                            var r,i,o,a=t.nodeType;
                            if(t&&3!==a&&8!==a&&2!==a)return o=1!==a||!it.isXMLDoc(t),o&&(e=it.propFix[e]||e,i=it.propHooks[e]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(t,n,e))?r:t[e]=n:i&&"get"in i&&null!==(r=i.get(t,e))?r:t[e]
                          },
                          propHooks:{
                            tabIndex:{
                              get:function(t){
                                var e=it.find.attr(t,"tabindex");
                                return e?parseInt(e,10):$e.test(t.nodeName)||Ee.test(t.nodeName)&&t.href?0:-1
                              }
                            }
                          }
                        }),
                        nt.hrefNormalized||it.each(["href","src"],function(t,e){
                          it.propHooks[e]={
                            get:function(t){
                              return t.getAttribute(e,4)
                            }
                          }
                        }),
                        nt.optSelected||(it.propHooks.selected={
                          get:function(t){
                            var e=t.parentNode;
                            return e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex),null
                          }
                        }),
                        it.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){
                          it.propFix[this.toLowerCase()]=this
                        }),
                        nt.enctype||(it.propFix.enctype="encoding");
                        var Me=/[\t\r\n\f]/g;
                        it.fn.extend({
                          addClass:function(t){
                            var e,n,r,i,o,a,s=0,l=this.length,u="string"==typeof t&&t;
                            if(it.isFunction(t))return this.each(function(e){it(this).addClass(t.call(this,e,this.className))});
                            if(u)for(e=(t||"").match(bt)||[];l>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Me," "):" ")){for(o=0;i=e[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");a=it.trim(r),n.className!==a&&(n.className=a)}return this
                          },
                          removeClass:function(t){
                            var e,n,r,i,o,a,s=0,l=this.length,u=0===arguments.length||"string"==typeof t&&t;
                            if(it.isFunction(t))return this.each(function(e){it(this).removeClass(t.call(this,e,this.className))});if(u)for(e=(t||"").match(bt)||[];l>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Me," "):"")){for(o=0;i=e[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");a=t?it.trim(r):"",n.className!==a&&(n.className=a)}return this
                          },
                          toggleClass:function(t,e){
                            var n=typeof t;
                            return"boolean"==typeof e&&"string"===n?e?this.addClass(t):this.removeClass(t):this.each(it.isFunction(t)?function(n){it(this).toggleClass(t.call(this,n,this.className,e),e)}:function(){if("string"===n)for(var e,r=0,i=it(this),o=t.match(bt)||[];e=o[r++];)i.hasClass(e)?i.removeClass(e):i.addClass(e);else(n===kt||"boolean"===n)&&(this.className&&it._data(this,"__className__",this.className),this.className=this.className||t===!1?"":it._data(this,"__className__")||"")})
                          },
                          hasClass:function(t){
                            for(var e=" "+t+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Me," ").indexOf(e)>=0)return!0;return!1
                          }
                        }),
                        it.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(t,e){
                          it.fn[e]=function(t,n){
                            return arguments.length>0?this.on(e,null,t,n):this.trigger(e)
                          }
                        }),
                        it.fn.extend({
                          hover:function(t,e){
                            return this.mouseenter(t).mouseleave(e||t)
                          },
                          bind:function(t,e,n){
                            return this.on(t,null,e,n)
                          },
                          unbind:function(t,e){
                            return this.off(t,null,e)
                          },
                          delegate:function(t,e,n,r){
                            return this.on(e,t,n,r)
                          },
                          undelegate:function(t,e,n){
                            return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",n)
                          }
                        });
                        var Ne=it.now(),Ae=/\?/,De=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
                        it.parseJSON=function(e){
                          if(t.JSON&&t.JSON.parse)return t.JSON.parse(e+"");
                          var n,r=null,i=it.trim(e+"");
                          return i&&!it.trim(i.replace(De,function(t,e,i,o){
                            return n&&e&&(r=0),0===r?t:(n=i||e,r+=!o-!i,"")
                          }))?Function("return "+i)():it.error("Invalid JSON: "+e)
                        },
                        it.parseXML=function(e){
                          var n,r;
                          if(!e||"string"!=typeof e)return null;
                          try{
                            t.DOMParser?(r=new DOMParser,n=r.parseFromString(e,"text/xml")):(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(e))
                          }catch(t){
                            n=void 0
                          }
                          return n&&n.documentElement&&!n.getElementsByTagName("parsererror").length||it.error("Invalid XML: "+e),n
                        };
                        var Le,je,Pe=/#.*$/,Oe=/([?&])_=[^&]*/,Ie=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,qe=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,He=/^(?:GET|HEAD)$/,Fe=/^\/\//,ze=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Be={},We={},Re="*/".concat("*");
                        try{
                          je=location.href
                        }catch(t){
                          je=ht.createElement("a"),je.href="",je=je.href
                        }
                        Le=ze.exec(je.toLowerCase())||[],it.extend({
                          active:0,
                          lastModified:{},
                          etag:{},
                          ajaxSettings:{
                            url:je,
                            type:"GET",
                            isLocal:qe.test(Le[1]),
                            global:!0,
                            processData:!0,
                            async:!0,
                            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                            accepts:{
                              "*":Re,
                              text:"text/plain",
                              html:"text/html",
                              xml:"application/xml, text/xml",
                              json:"application/json, text/javascript"
                            },
                            contents:{
                              xml:/xml/,
                              html:/html/,
                              json:/json/
                            },
                            responseFields:{
                              xml:"responseXML",
                              text:"responseText",
                              json:"responseJSON"
                            },
                            converters:{
                              "* text":String,
                              "text html":!0,
                              "text json":it.parseJSON,
                              "text xml":it.parseXML
                            },
                            flatOptions:{
                              url:!0,
                              context:!0
                            }
                          },
                          ajaxSetup:function(t,e){
                            return e?z(z(t,it.ajaxSettings),e):z(it.ajaxSettings,t)
                          },
                          ajaxPrefilter:H(Be),
                          ajaxTransport:H(We),
                          ajax:function(t,e){
                            function n(t,e,n,r){
                              var i,c,v,y,x,C=e;
                              2!==b&&(b=2,s&&clearTimeout(s),u=void 0,a=r||"",w.readyState=t>0?4:0,i=t>=200&&300>t||304===t,n&&(y=B(d,w,n)),y=W(d,y,w,i),i?(d.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(it.lastModified[o]=x),x=w.getResponseHeader("etag"),x&&(it.etag[o]=x)),204===t||"HEAD"===d.type?C="nocontent":304===t?C="notmodified":(C=y.state,c=y.data,v=y.error,i=!v)):(v=C,(t||!C)&&(C="error",0>t&&(t=0))),w.status=t,w.statusText=(e||C)+"",i?h.resolveWith(p,[c,C,w]):h.rejectWith(p,[w,C,v]),w.statusCode(g),g=void 0,l&&f.trigger(i?"ajaxSuccess":"ajaxError",[w,d,i?c:v]),m.fireWith(p,[w,C]),l&&(f.trigger("ajaxComplete",[w,d]),--it.active||it.event.trigger("ajaxStop")))
                            }
                            "object"==typeof t&&(e=t,t=void 0),e=e||{};
                            var r,i,o,a,s,l,u,c,d=it.ajaxSetup({},e),p=d.context||d,f=d.context&&(p.nodeType||p.jquery)?it(p):it.event,h=it.Deferred(),m=it.Callbacks("once memory"),g=d.statusCode||{},v={},y={},b=0,x="canceled",w={
                              readyState:0,
                              getResponseHeader:function(t){
                                var e;
                                if(2===b){
                                  if(!c)for(c={};e=Ie.exec(a);)c[e[1].toLowerCase()]=e[2];
                                  e=c[t.toLowerCase()]
                                }
                                return null==e?null:e
                              },getAllResponseHeaders:function(){
                                return 2===b?a:null
                              },setRequestHeader:function(t,e){
                                var n=t.toLowerCase();
                                return b||(t=y[n]=y[n]||t,v[t]=e),this
                              },overrideMimeType:function(t){
                                return b||(d.mimeType=t),this
                              },statusCode:function(t){
                                var e;
                                if(t)if(2>b)for(e in t)g[e]=[g[e],t[e]];else w.always(t[w.status]);
                                return this
                              },abort:function(t){
                                var e=t||x;
                                return u&&u.abort(e),n(0,e),this
                              }
                            };
                            if(h.promise(w).complete=m.add,w.success=w.done,w.error=w.fail,d.url=((t||d.url||je)+"").replace(Pe,"").replace(Fe,Le[1]+"//"),d.type=e.method||e.type||d.method||d.type,d.dataTypes=it.trim(d.dataType||"*").toLowerCase().match(bt)||[""],null==d.crossDomain&&(r=ze.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]===Le[1]&&r[2]===Le[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(Le[3]||("http:"===Le[1]?"80":"443")))),d.data&&d.processData&&"string"!=typeof  d.data&&(d.data=it.param(d.data,d.traditional)),F(Be,d,e,w),2===b)return w;
                            l=it.event&&d.global,l&&0===it.active++&&it.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!He.test(d.type),o=d.url,d.hasContent||(d.data&&(o=d.url+=(Ae.test(o)?"&":"?")+d.data,delete d.data),d.cache===!1&&(d.url=Oe.test(o)?o.replace(Oe,"$1_="+Ne++):o+(Ae.test(o)?"&":"?")+"_="+Ne++)),d.ifModified&&(it.lastModified[o]&&w.setRequestHeader("If-Modified-Since",it.lastModified[o]),it.etag[o]&&w.setRequestHeader("If-None-  Match",it.etag[o])),(d.data&&d.hasContent&&d.contentType!==!1||e.contentType)&&w.setRequestHeader("Content-Type",d.contentType),w.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+Re+"; q=0.01":""):d.accepts["*"]);for(i in d.headers)w.setRequestHeader(i,d.headers[i]);
                            if(d.beforeSend&&(d.beforeSend.call(p,w,d)===!1||2===b))return w.abort();
                            x="abort";
                            for(i in{success:1,error:1,complete:1})w[i](d[i]);
                            if(u=F(We,d,e,w)){
                              w.readyState=1,l&&f.trigger("ajaxSend",[w,d]),d.async&&d.timeout>0&&(s=setTimeout(function(){w.abort("timeout")},d.timeout));try{b=1,u.send(v,n)}catch(t){if(!(2>b))throw t;n(-1,t)}
                            }else n(-1,"No Transport");
                            return w
                          },
                          getJSON:function(t,e,n){
                            return it.get(t,e,n,"json")
                          },
                          getScript:function(t,e){
                            return it.get(t,void 0,e,"script")
                          }
                        }),
                        it.each(["get","post"],function(t,e){
                          it[e]=function(t,n,r,i){
                            return it.isFunction(n)&&(i=i||r,r=n,n=void 0),it.ajax({url:t,type:e,dataType:i,data:n,success:r})
                          }
                        }),
                        it._evalUrl=function(t){
                          return it.ajax({
                            url:t,
                            type:"GET",
                            dataType:"script",
                            async:!1,
                            global:!1,
                            "throws":!0
                          })
                        },
                        it.fn.extend({
                          wrapAll:function(t){
                            if(it.isFunction(t))return this.each(function(e){it(this).wrapAll(t.call(this,e))});
                            if(this[0]){
                              var e=it(t,this[0].ownerDocument).eq(0).clone(!0);
                              this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){
                                for(var t=this;t.firstChild&&1===t.firstChild.nodeType;)t=t.firstChild;return t
                              }).append(this)
                            }
                            return this
                          },
                          wrapInner:function(t){
                            return this.each(it.isFunction(t)?function(e){
                              it(this).wrapInner(t.call(this,e))
                            }:function(){
                              var e=it(this),n=e.contents();
                              n.length?n.wrapAll(t):e.append(t)
                            })
                          },
                          wrap:function(t){
                            var e=it.isFunction(t);
                            return this.each(function(n){
                              it(this).wrapAll(e?t.call(this,n):t)
                            })
                          },
                          unwrap:function(){
                            return this.parent().each(function(){
                              it.nodeName(this,"body")||it(this).replaceWith(this.childNodes)
                            }).end()
                          }
                        }),
                        it.expr.filters.hidden=function(t){
                          return t.offsetWidth<=0&&t.offsetHeight<=0||!nt.reliableHiddenOffsets()&&"none"===(t.style&&t.style.display||it.css(t,"display"))
                        },
                        it.expr.filters.visible=function(t){
                          return!it.expr.filters.hidden(t)
                        };
                        var Ge=/%20/g,Ue=/\[\]$/,Xe=/\r?\n/g,Ve=/^(?:submit|button|image|reset|file)$/i,Qe=/^(?:input|select|textarea|keygen)/i;
                        it.param=function(t,e){
                          var n,r=[],i=function(t,e){
                            e=it.isFunction(e)?e():null==e?"":e,r[r.length]=encodeURIComponent(t)+"="+encodeURIComponent(e)
                          };
                          if(void 0===e&&(e=it.ajaxSettings&&it.ajaxSettings.traditional),it.isArray(t)||t.jquery&&!it.isPlainObject(t))it.each(t,function(){i(this.name,this.value)});else for(n in t)R(n,t[n],e,i);return r.join("&").replace(Ge,"+");
                        },
                        it.fn.extend({
                          serialize:function(){
                            return it.param(this.serializeArray())
                          },
                          serializeArray:function(){
                            return this.map(function(){
                              var t=it.prop(this,"elements");
                              return t?it.makeArray(t):this
                            }).filter(function(){
                              var t=this.type;
                              return this.name&&!it(this).is(":disabled")&&Qe.test(this.nodeName)&&!Ve.test(t)&&(this.checked||!Nt.test(t))
                            }).map(function(t,e){
                              var n=it(this).val();
                              return null==n?null:it.isArray(n)?it.map(n,function(t){return{name:e.name,value:t.replace(Xe,"\r\n")}}):{name:e.name,value:n.replace(Xe,"\r\n")}
                            }).get()
                          }
                        }),
                        it.ajaxSettings.xhr=void 0!==t.ActiveXObject?function(){
                          return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&G()||U()
                        }:G;
                        var Ze=0,Je={},Ke=it.ajaxSettings.xhr();
                        t.attachEvent&&t.attachEvent("onunload",function(){
                          for(var t in Je)Je[t](void 0,!0)
                        }),
                        nt.cors=!!Ke&&"withCredentials"in Ke,Ke=nt.ajax=!!Ke,Ke&&it.ajaxTransport(function(t){
                          if(!t.crossDomain||nt.cors){
                            var e;
                            return{
                              send:function(n,r){
                                var i,o=t.xhr(),a=++Ze;
                                if(o.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(i in t.xhrFields)o[i]=t.xhrFields[i];
                                t.mimeType&&o.overrideMimeType&&o.overrideMimeType(t.mimeType),t.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");
                                for(i in n)void 0!==n[i]&&o.setRequestHeader(i,n[i]+"");
                                o.send(t.hasContent&&t.data||null),e=function(n,i){
                                  var s,l,u;
                                  if(e&&(i||4===o.readyState))if(delete Je[a],e=void 0,o.onreadystatechange=it.noop,i)4!==o.readyState&&o.abort();
                                  else{
                                    u={},s=o.status,"string"==typeof o.responseText&&(u.text=o.responseText);
                                    try{
                                      l=o.statusText
                                    }catch(t){
                                      l=""
                                    }s||!t.isLocal||t.crossDomain?1223===s&&(s=204):s=u.text?200:404
                                  }u&&r(s,l,u,o.getAllResponseHeaders())
                                },
                                t.async?4===o.readyState?setTimeout(e):o.onreadystatechange=Je[a]=e:e()
                              },
                              abort:function(){
                                e&&e(void 0,!0)
                              }
                            }
                          }
                        }),
                        it.ajaxSetup({
                          accepts:{
                            script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                          },
                          contents:{
                            script:/(?:java|ecma)script/
                          },
                          converters:{
                            "text script":function(t){
                              return it.globalEval(t),t
                            }
                          }
                        }),
                        it.ajaxPrefilter("script",function(t){
                          void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET",t.global=!1)
                        }),
                        it.ajaxTransport("script",function(t){
                          if(t.crossDomain){
                            var e,n=ht.head||it("head")[0]||ht.documentElement;
                            return{
                              send:function(r,i){
                                e=ht.createElement("script"),e.async=!0,t.scriptCharset&&(e.charset=t.scriptCharset),e.src=t.url,e.onload=e.onreadystatechange=function(t,n){(n||!e.readyState||/loaded|complete/.test(e.readyState))&&(e.onload=e.onreadystatechange=null,e.parentNode&&e.parentNode.removeChild(e),e=null,n||i(200,"success"))},n.insertBefore(e,n.firstChild)
                              },
                              abort:function(){
                                e&&e.onload(void 0,!0)
                              }
                            }
                          }
                        });
                        var Ye=[],tn=/(=)\?(?=&|$)|\?\?/;
                        it.ajaxSetup({
                          jsonp:"callback",
                          jsonpCallback:function(){
                            var t=Ye.pop()||it.expando+"_"+Ne++;
                            return this[t]=!0,t
                          }
                        }),
                        it.ajaxPrefilter("json jsonp",function(e,n,r){
                          var i,o,a,s=e.jsonp!==!1&&(tn.test(e.url)?"url":"string"==typeof e.data&&!(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&tn.test(e.data)&&"data");
                          return s||"jsonp"===e.dataTypes[0]?(i=e.jsonpCallback=it.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,s?e[s]=e[s].replace(tn,"$1"+i):e.jsonp!==!1&&(e.url+=(Ae.test(e.url)?"&":"?")+e.jsonp+"="+i),e.converters["script json"]=function(){return a||it.error(i+" was not called"),a[0]},e.dataTypes[0]="json",o=t[i],t[i]=function(){a=arguments},r.always(function(){t[i]=o,e[i]&&(e.jsonpCallback=n.jsonpCallback,Ye.push(i)),a&&it.isFunction(o)&&o(a[0]),a=o=void 0}),"script"):void 0
                        }),
                        it.parseHTML=function(t,e,n){
                          if(!t||"string"!=typeof t)return null;
                          "boolean"==typeof e&&(n=e,e=!1),e=e||ht;
                          var r=dt.exec(t),i=!n&&[];
                          return r?[e.createElement(r[1])]:(r=it.buildFragment([t],e,i),i&&i.length&&it(i).remove(),it.merge([],r.childNodes))
                        };
                        var en=it.fn.load;
                        it.fn.load=function(t,e,n){
                          if("string"!=typeof t&&en)return en.apply(this,arguments);
                          var r,i,o,a=this,s=t.indexOf(" ");
                          return s>=0&&(r=it.trim(t.slice(s,t.length)),t=t.slice(0,s)),it.isFunction(e)?(n=e,e=void 0):e&&"object"==typeof e&&(o="POST"),a.length>0&&it.ajax({url:t,type:o,dataType:"html",data:e}).done(function(t){i=arguments,a.html(r?it("<div>").append(it.parseHTML(t)).find(r):t)}).complete(n&&function(t,e){a.each(n,i||[t.responseText,e,t])}),this
                        },
                        it.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){
                          it.fn[e]=function(t){
                            return this.on(e,t)
                          }
                        }),
                        it.expr.filters.animated=function(t){
                          return it.grep(it.timers,function(e){
                            return t===e.elem
                          }).length
                        };
                        var nn=t.document.documentElement;
                        it.offset={
                          setOffset:function(t,e,n){
                            var r,i,o,a,s,l,u,c=it.css(t,"position"),d=it(t),p={};
                            "static"===c&&(t.style.position="relative"),s=d.offset(),o=it.css(t,"top"),l=it.css(t,"left"),u=("absolute"===c||"fixed"===c)&&it.inArray("auto",[o,l])>-1,u?(r=d.position(),a=r.top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(l)||0),it.isFunction(e)&&(e=e.call(t,n,s)),null!=e.top&&(p.top=e.top-s.top+a),null!=e.left&&(p.left=e.left-s.left+i),"using"in e?e.using.call(t,p):d.css(p)
                          }
                        },
                        it.fn.extend({
                          offset:function(t){
                            if(arguments.length)return void 0===t?this:this.each(function(e){
                              it.offset.setOffset(this,t,e)
                            });
                            var e,n,r={
                              top:0,
                              left:0
                            },i=this[0],o=i&&i.ownerDocument;
                            return o?(e=o.documentElement,it.contains(e,i)?(typeof i.getBoundingClientRect!==kt&&(r=i.getBoundingClientRect()),n=X(o),{top:r.top+(n.pageYOffset||e.scrollTop)-(e.clientTop||0),left:r.left+(n.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}):r):void 0
                          },
                          position:function(){
                            if(this[0]){
                              var t,e,n={top:0,left:0},r=this[0];
                              return"fixed"===it.css(r,"position")?e=r.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),it.nodeName(t[0],"html")||(n=t.offset()),n.top+=it.css(t[0],"borderTopWidth",!0),n.left+=it.css(t[0],"borderLeftWidth",!0)),{top:e.top-n.top-it.css(r,"marginTop",!0),left:e.left-n.left-it.css(r,"marginLeft",!0)}
                            }
                          },
                          offsetParent:function(){
                            return this.map(function(){
                              for(var t=this.offsetParent||nn;t&&!it.nodeName(t,"html")&&"static"===it.css(t,"position");)t=t.offsetParent;
                              return t||nn
                            })
                          }
                        }),
                        it.each({
                          scrollLeft:"pageXOffset",
                          scrollTop:"pageYOffset"
                        },
                        function(t,e){
                          var n=/Y/.test(e);
                          it.fn[t]=function(r){
                            return Mt(this,function(t,r,i){
                              var o=X(t);
                              return void 0===i?o?e in o?o[e]:o.document.documentElement[r]:t[r]:void(o?o.scrollTo(n?it(o).scrollLeft():i,n?i:it(o).scrollTop()):t[r]=i)
                            },t,r,arguments.length,null)
                          }
                        }),
                        it.each(["top","left"],function(t,e){
                          it.cssHooks[e]=_(nt.pixelPosition,function(t,n){
                            return n?(n=ee(t,e),re.test(n)?it(t).position()[e]+"px":n):void 0
                          })
                        }),
                        it.each({
                          Height:"height",
                          Width:"width"
                        },
                        function(t,e){
                          it.each({
                            padding:"inner"+t,
                            content:e,
                            "":"outer"+t
                          },
                          function(n,r){
                            it.fn[r]=function(r,i){
                              var o=arguments.length&&(n||"boolean"!=typeof r),a=n||(r===!0||i===!0?"margin":"border");
                              return Mt(this,function(e,n,r){var i;return it.isWindow(e)?e.document.documentElement["client"+t]:9===e.nodeType?(i=e.documentElement,Math.max(e.body["scroll"+t],i["scroll"+t],e.body["offset"+t],i["offset"+t],i["client"+t])):void 0===r?it.css(e,n,a):it.style(e,n,r,a)},e,o?r:void 0,o,null)
                            }
                          })
                        }),
                        it.fn.size=function(){
                          return this.length
                        },
                        it.fn.andSelf=it.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){
                          return it
                        });
                        var rn=t.jQuery,on=t.$;
                        return it.noConflict=function(e){
                          return t.$===it&&(t.$=on),e&&t.jQuery===it&&(t.jQuery=rn),it
                        },typeof e===kt&&(t.jQuery=t.$=it),it}),+function(t){
                          "use strict";
                          var e='[data-dismiss="alert"]',n=function(n){
                            t(n).on("click",e,this.close)
                          };
                          n.prototype.close=function(e){
                            function n(){
                              o.trigger("closed.bs.alert").remove()
                            }
                          var r=t(this),i=r.attr("data-target");
                          i||(i=r.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,""));
                          var o=t(i);e&&e.preventDefault(),o.length||(o=r.hasClass("alert")?r:r.parent()),o.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(o.removeClass("in"),t.support.transition&&o.hasClass("fade")?o.one(t.support.transition.end,n).emulateTransitionEnd(150):n())};
                          var r=t.fn.alert;
                          t.fn.alert=function(e){
                            return this.each(function(){
                              var r=t(this),i=r.data("bs.alert");
                              i||r.data("bs.alert",i=new n(this)),"string"==typeof e&&i[e].call(r)
                            })
                          },
                          t.fn.alert.Constructor=n,t.fn.alert.noConflict=function(){
                            return t.fn.alert=r,this
                          },
                          t(document).on("click.bs.alert.data-api",e,n.prototype.close)
                        }(jQuery),+function(t){
                          "use strict";
                          var e=function(n,r){
                            this.$element=t(n),this.options=t.extend({},e.DEFAULTS,r),this.isLoading=!1
                          };
                          e.DEFAULTS={
                            loadingText:"loading..."
                          },
                          e.prototype.setState=function(e){
                            var n="disabled",r=this.$element,i=r.is("input")?"val":"html",o=r.data();
                            e+="Text",o.resetText||r.data("resetText",r[i]()),r[i](o[e]||this.options[e]),setTimeout(t.proxy(function(){
                              "loadingText"==e?(this.isLoading=!0,r.addClass(n).attr(n,n)):this.isLoading&&(this.isLoading=!1,r.removeClass(n).removeAttr(n))
                            },this),0)
                          },
                          e.prototype.toggle=function(){
                            var t=!0,e=this.$element.closest('[data-toggle="buttons"]');
                            if(e.length){
                              var n=this.$element.find("input");
                              "radio"==n.prop("type")&&(n.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&n.prop("checked",!this.$element.hasClass("active")).trigger("change")
                            }
                            t&&this.$element.toggleClass("active")
                          };
                          var n=t.fn.button;
                          t.fn.button=function(n){
                            return this.each(function(){
                              var r=t(this),i=r.data("bs.button"),o="object"==typeof n&&n;
                              i||r.data("bs.button",i=new e(this,o)),"toggle"==n?i.toggle():n&&i.setState(n)
                            })
                          },
                          t.fn.button.Constructor=e,t.fn.button.noConflict=function(){
                            return t.fn.button=n,this
                          },
                          t(document).on("click.bs.button.data-api","[data-toggle^=button]",function(e){
                            var n=t(e.target);
                            n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle"),e.preventDefault()
                          })
                        }(jQuery),+function(t){
                          "use strict";
                          var e=function(e,n){
                            this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",t.proxy(this.pause,this)).on("mouseleave",t.proxy(this.cycle,this))
                          };
                          e.DEFAULTS={
                            interval:5e3,
                            pause:"hover",
                            wrap:!0
                          },
                          e.prototype.cycle=function(e){
                            return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this
                          },
                          e.prototype.getActiveIndex=function(){
                            return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)
                          },
                          e.prototype.to=function(e){
                            var n=this,r=this.getActiveIndex();
                            if(!(e>this.$items.length-1||e<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){n.to(e)}):r==e?this.pause().cycle():this.slide(e>r?"next":"prev",t(this.$items[e]))
                          },
                          e.prototype.pause=function(e){
                            return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this
                          },
                          e.prototype.next=function(){
                            if(!this.sliding)return this.slide("next")
                          },
                          e.prototype.prev=function(){
                            if(!this.sliding)return this.slide("prev")
                          },
                          e.prototype.slide=function(e,n){
                            var r=this.$element.find(".item.active"),i=n||r[e](),o=this.interval,a="next"==e?"left":"right",s="next"==e?"first":"last",l=this;
                            if(!i.length){
                              if(!this.options.wrap)return;
                              i=this.$element.find(".item")[s]()
                            }
                            if(i.hasClass("active"))return this.sliding=!1;
                            var u=t.Event("slide.bs.carousel",{relatedTarget:i[0],direction:a});
                            return this.$element.trigger(u),u.isDefaultPrevented()?void 0:(this.sliding=!0,o&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){
                              var e=t(l.$indicators.children()[l.getActiveIndex()]);
                              e&&e.addClass("active")
                            })),t.support.transition&&this.$element.hasClass("slide")?(i.addClass(e),i[0].offsetWidth,r.addClass(a),i.addClass(a),r.one(t.support.transition.end,function(){
                              i.removeClass([e,a].join(" ")).addClass("active"),r.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){
                                l.$element.trigger("slid.bs.carousel")
                              },0)
                            }).emulateTransitionEnd(1e3*r.css("transition-duration").slice(0,-1))):(r.removeClass("active"),i.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),o&&this.cycle(),this)
                          };
                          var n=t.fn.carousel;
                          t.fn.carousel=function(n){
                            return this.each(function(){
                              var r=t(this),i=r.data("bs.carousel"),o=t.extend({},e.DEFAULTS,r.data(),"object"==typeof n&&n),a="string"==typeof n?n:o.slide;
                              i||r.data("bs.carousel",i=new e(this,o)),"number"==typeof n?i.to(n):a?i[a]():o.interval&&i.pause().cycle()
                            })
                          },
                          t.fn.carousel.Constructor=e,t.fn.carousel.noConflict=function(){
                            return t.fn.carousel=n,this
                          },
                          t(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(e){
                            var n,r=t(this),i=t(r.attr("data-target")||(n=r.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"")),o=t.extend({},i.data(),r.data()),a=r.attr("data-slide-to");
                            a&&(o.interval=!1),i.carousel(o),(a=r.attr("data-slide-to"))&&i.data("bs.carousel").to(a),e.preventDefault()
                          }),
                          t(window).on("load",function(){
                            t('[data-ride="carousel"]').each(function(){
                              var e=t(this);
                              e.carousel(e.data())
                            })
                          })
                        }(jQuery),+function(t){
                          function e(e){
                            t(r).remove(),t(i).each(function(){
                              var r=n(t(this)),i={relatedTarget:this};
                              r.hasClass("open")&&(r.trigger(e=t.Event("hide.bs.dropdown",i)),e.isDefaultPrevented()||r.removeClass("open").trigger("hidden.bs.dropdown",i))
                            })
                          }
                          function n(e){
                            var n=e.attr("data-target");
                            n||(n=e.attr("href"),n=n&&/#[A-Za-z]/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,""));
                            var r=n&&t(n);
                            return r&&r.length?r:e.parent()
                          }
                          var r=".dropdown-backdrop",i="[data-toggle=dropdown]",o=function(e){
                            t(e).on("click.bs.dropdown",this.toggle)
                          };
                          o.prototype.toggle=function(r){
                            var i=t(this);
                            if(!i.is(".disabled, :disabled")){
                              var o=n(i),a=o.hasClass("open");
                              if(e(),!a){
                                "ontouchstart"in document.documentElement&&!o.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click",e);
                                var s={relatedTarget:this};
                                if(o.trigger(r=t.Event("show.bs.dropdown",s)),r.isDefaultPrevented())return;
                                o.toggleClass("open").trigger("shown.bs.dropdown",s),i.focus()
                              }return!1
                            }
                          },
                          o.prototype.keydown=function(e){
                            if(/(38|40|27)/.test(e.keyCode)){
                              var r=t(this);
                              if(e.preventDefault(),e.stopPropagation(),!r.is(".disabled, :disabled")){
                                var o=n(r),a=o.hasClass("open");
                                if(!a||a&&27==e.keyCode)return 27==e.which&&o.find(i).focus(),r.click();
                                var s=" li:not(.divider):visible a",l=o.find("[role=menu]"+s+", [role=listbox]"+s);
                                if(l.length){
                                  var u=l.index(l.filter(":focus"));
                                  38==e.keyCode&&u>0&&u--,40==e.keyCode&&u<l.length-1&&u++,~u||(u=0),l.eq(u).focus()
                                }
                              }
                            }
                          };
                          var a=t.fn.dropdown;
                          t.fn.dropdown=function(e){
                            return this.each(function(){
                              var n=t(this),r=n.data("bs.dropdown");
                              r||n.data("bs.dropdown",r=new o(this)),"string"==typeof e&&r[e].call(n)
                            })
                          },
                          t.fn.dropdown.Constructor=o,t.fn.dropdown.noConflict=function(){
                            return t.fn.dropdown=a,this
                          },
                          t(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){
                            t.stopPropagation()
                          }).on("click.bs.dropdown.data-api",i,o.prototype.toggle).on("keydown.bs.dropdown.data-api",i+", [role=menu], [role=listbox]",o.prototype.keydown)
                        }(jQuery),+function(t){
                          "use strict";
                          var e=function(e,n){
                            this.options=n,this.$element=t(e),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){
                              this.$element.trigger("loaded.bs.modal")
                            },this))
                          };
                          e.DEFAULTS={
                            backdrop:!0,
                            keyboard:!0,
                            show:!0
                          },
                          e.prototype.toggle=function(t){
                            return this[this.isShown?"hide":"show"](t)
                          },
                          e.prototype.show=function(e){
                            var n=this,r=t.Event("show.bs.modal",{relatedTarget:e});
                            this.$element.trigger(r),this.isShown||r.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.backdrop(function(){
                              var r=t.support.transition&&n.$element.hasClass("fade");
                              n.$element.parent().length||n.$element.appendTo(document.body),n.$element.show().scrollTop(0),r&&n.$element[0].offsetWidth,n.$element.addClass("in").attr("aria-hidden",!1),n.enforceFocus();
                              var i=t.Event("shown.bs.modal",{relatedTarget:e});
                              r?n.$element.find(".modal-dialog").one(t.support.transition.end,function(){
                                n.$element.focus().trigger(i)}).emulateTransitionEnd(300):n.$element.focus().trigger(i)
                            }))
                          },
                          e.prototype.hide=function(e){
                            e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one(t.support.transition.end,t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())
                          },
                          e.prototype.enforceFocus=function(){
                            t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){
                              this.$element[0]!==t.target&&!this.$element.has(t.target).length&&this.$element.focus()
                            },this))
                          },
                          e.prototype.escape=function(){
                            this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",t.proxy(function(t){
                              27==t.which&&this.hide()
                            },this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")
                          },
                          e.prototype.hideModal=function(){
                            var t=this;
                            this.$element.hide(),this.backdrop(function(){
                              t.removeBackdrop(),t.$element.trigger("hidden.bs.modal")
                            })
                          },
                          e.prototype.removeBackdrop=function(){
                            this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null
                          },
                          e.prototype.backdrop=function(e){
                            var n=this.$element.hasClass("fade")?"fade":"";
                            if(this.isShown&&this.options.backdrop){
                              var r=t.support.transition&&n;
                              if(this.$backdrop=t('<div class="modal-backdrop '+n+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){
                                t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))
                              },this)),r&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;
                              r?this.$backdrop.one(t.support.transition.end,e).emulateTransitionEnd(150):e()
                            }else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(t.support.transition.end,e).emulateTransitionEnd(150):e()):e&&e()};
                            var n=t.fn.modal;
                            t.fn.modal=function(n,r){
                              return this.each(function(){
                                var i=t(this),o=i.data("bs.modal"),a=t.extend({},e.DEFAULTS,i.data(),"object"==typeof n&&n);o||i.data("bs.modal",o=new e(this,a)),"string"==typeof n?o[n](r):a.show&&o.show(r)
                              })
                            },
                            t.fn.modal.Constructor=e,t.fn.modal.noConflict=function(){
                              return t.fn.modal=n,this
                            },
                            t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(e){
                              var n=t(this),r=n.attr("href"),i=t(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),o=i.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(r)&&r},i.data(),n.data());n.is("a")&&e.preventDefault(),i.modal(o,this).one("hide",function(){
                                n.is(":visible")&&n.focus()
                              })
                            }),
                            t(document).on("show.bs.modal",".modal",function(){
                              t(document.body).addClass("modal-open")
                            }).on("hidden.bs.modal",".modal",function(){
                              t(document.body).removeClass("modal-open")
                            })
                        }(jQuery),+function(t){
                          "use strict";
                          var e=function(t,e){
                            this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",t,e)
                          };
                          e.DEFAULTS={
                            animation:!0,
                            placement:"top",
                            selector:!1,
                            template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                            trigger:"hover focus",
                            title:"",
                            delay:0,
                            html:!1,
                            container:!1
                          },
                          e.prototype.init=function(e,n,r){
                            this.enabled=!0,this.type=e,this.$element=t(n),this.options=this.getOptions(r);
                            for(var i=this.options.trigger.split(" "),o=i.length;o--;){
                              var a=i[o];
                              if("click"==a)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));
                              else if("manual"!=a){
                                var s="hover"==a?"mouseenter":"focusin",l="hover"==a?"mouseleave":"focusout";
                                this.$element.on(s+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))
                              }
                            }
                            this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()
                          },
                          e.prototype.getDefaults=function(){
                            return e.DEFAULTS
                          },
                          e.prototype.getOptions=function(e){
                            return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e
                          },
                          e.prototype.getDelegateOptions=function(){
                            var e={},n=this.getDefaults();
                            return this._options&&t.each(this._options,function(t,r){
                              n[t]!=r&&(e[t]=r)
                            }),e
                          },
                          e.prototype.enter=function(e){
                            var n=e instanceof this.constructor?e:t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);
                            return clearTimeout(n.timeout),n.hoverState="in",n.options.delay&&n.options.delay.show?void(n.timeout=setTimeout(function(){"in"==n.hoverState&&n.show()},n.options.delay.show)):n.show()
                          },
                          e.prototype.leave=function(e){
                            var n=e instanceof this.constructor?e:t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);
                            return clearTimeout(n.timeout),n.hoverState="out",n.options.delay&&n.options.delay.hide?void(n.timeout=setTimeout(function(){"out"==n.hoverState&&n.hide()},n.options.delay.hide)):n.hide()
                          },
                          e.prototype.show=function(){
                            var e=t.Event("show.bs."+this.type);
                            if(this.hasContent()&&this.enabled){
                              if(this.$element.trigger(e),e.isDefaultPrevented())return;
                              var n=this,r=this.tip();
                              this.setContent(),this.options.animation&&r.addClass("fade");
                              var i="function"==typeof this.options.placement?this.options.placement.call(this,r[0],this.$element[0]):this.options.placement,o=/\s?auto?\s?/i,a=o.test(i);
                              a&&(i=i.replace(o,"")||"top"),r.detach().css({top:0,left:0,display:"block"}).addClass(i),this.options.container?r.appendTo(this.options.container):r.insertAfter(this.$element);
                              var s=this.getPosition(),l=r[0].offsetWidth,u=r[0].offsetHeight;
                              if(a){
                                var c=this.$element.parent(),d=i,p=document.documentElement.scrollTop||document.body.scrollTop,f="body"==this.options.container?window.innerWidth:c.outerWidth(),h="body"==this.options.container?window.innerHeight:c.outerHeight(),m="body"==this.options.container?0:c.offset().left;
                                i="bottom"==i&&s.top+s.height+u-p>h?"top":"top"==i&&s.top-p-u<0?"bottom":"right"==i&&s.right+l>f?"left":"left"==i&&s.left-l<m?"right":i,r.removeClass(d).addClass(i)
                              }
                              var g=this.getCalculatedOffset(i,s,l,u);this.applyPlacement(g,i),this.hoverState=null;var v=function(){
                                n.$element.trigger("shown.bs."+n.type)
                              };
                              t.support.transition&&this.$tip.hasClass("fade")?r.one(t.support.transition.end,v).emulateTransitionEnd(150):v()
                            }
                          },
                          e.prototype.applyPlacement=function(e,n){
                            var r,i=this.tip(),o=i[0].offsetWidth,a=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),l=parseInt(i.css("margin-left"),10);
                            isNaN(s)&&(s=0),isNaN(l)&&(l=0),e.top=e.top+s,e.left=e.left+l,t.offset.setOffset(i[0],t.extend({using:function(t){
                              i.css({
                                top:Math.round(t.top),
                                left:Math.round(t.left)
                              })
                            }},e),0),i.addClass("in");
                            var u=i[0].offsetWidth,c=i[0].offsetHeight;
                            if("top"==n&&c!=a&&(r=!0,e.top=e.top+a-c),/bottom|top/.test(n)){
                              var d=0;
                              e.left<0&&(d=e.left*-2,e.left=0,i.offset(e),u=i[0].offsetWidth,c=i[0].offsetHeight),this.replaceArrow(d-o+u,u,"left")
                            }else this.replaceArrow(c-a,c,"top");
                            r&&i.offset(e)
                          },
                          e.prototype.replaceArrow=function(t,e,n){
                            this.arrow().css(n,t?50*(1-t/e)+"%":"")
                          },
                          e.prototype.setContent=function(){
                            var t=this.tip(),e=this.getTitle();
                            t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")
                          },
                          e.prototype.hide=function(){
                            function e(){
                              "in"!=n.hoverState&&r.detach(),n.$element.trigger("hidden.bs."+n.type)
                            }
                            var n=this,r=this.tip(),i=t.Event("hide.bs."+this.type);
                            if(this.$element.trigger(i),!i.isDefaultPrevented())return r.removeClass("in"),t.support.transition&&this.$tip.hasClass("fade")?r.one(t.support.transition.end,e).emulateTransitionEnd(150):e(),this.hoverState=null,this},e.prototype.fixTitle=function(){
                              var t=this.$element;
                              (t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")
                            },
                            e.prototype.hasContent=function(){
                              return this.getTitle()
                            },
                            e.prototype.getPosition=function(){
                              var e=this.$element[0];
                              return t.extend({},"function"==typeof e.getBoundingClientRect?e.getBoundingClientRect():{width:e.offsetWidth,height:e.offsetHeight},this.$element.offset())
                            },
                            e.prototype.getCalculatedOffset=function(t,e,n,r){
                              return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-n/2}:"top"==t?{top:e.top-r,left:e.left+e.width/2-n/2}:"left"==t?{top:e.top+e.height/2-r/2,left:e.left-n}:{top:e.top+e.height/2-r/2,left:e.left+e.width}
                            },
                            e.prototype.getTitle=function(){
                              var t,e=this.$element,n=this.options;
                              return t=e.attr("data-original-title")||("function"==typeof n.title?n.title.call(e[0]):n.title)
                            },
                            e.prototype.tip=function(){
                              return this.$tip=this.$tip||t(this.options.template)
                            },
                            e.prototype.arrow=function(){
                              return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")
                            },
                            e.prototype.validate=function(){
                              this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)
                            },
                            e.prototype.enable=function(){
                              this.enabled=!0
                            },
                            e.prototype.disable=function(){
                              this.enabled=!1
                            },
                            e.prototype.toggleEnabled=function(){
                              this.enabled=!this.enabled
                            },
                            e.prototype.toggle=function(e){
                              var n=e?t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;
                              n.tip().hasClass("in")?n.leave(n):n.enter(n)
                            },
                            e.prototype.destroy=function(){
                              clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)
                            };
                            var n=t.fn.tooltip;
                            t.fn.tooltip=function(n){
                              return this.each(function(){
                                var r=t(this),i=r.data("bs.tooltip"),o="object"==typeof n&&n;
                                (i||"destroy"!=n)&&(i||r.data("bs.tooltip",i=new e(this,o)),"string"==typeof n&&i[n]())
                              })
                            },
                            t.fn.tooltip.Constructor=e,t.fn.tooltip.noConflict=function(){
                              return t.fn.tooltip=n,this
                            }
                        }(jQuery),+function(t){
                          "use strict";
                          var e=function(t,e){
                            this.init("popover",t,e)};
                            if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
                            e.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{
                              placement:"right",
                              trigger:"click",
                              content:"",
                              template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                            }),
                            e.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),e.prototype.constructor=e,e.prototype.getDefaults=function(){
                              return e.DEFAULTS
                            },
                            e.prototype.setContent=function(){
                              var t=this.tip(),e=this.getTitle(),n=this.getContent();
                              t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content")[this.options.html?"string"==typeof n?"html":"append":"text"](n),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},e.prototype.hasContent=function(){
                                return this.getTitle()||this.getContent()
                              },
                              e.prototype.getContent=function(){
                                var t=this.$element,e=this.options;
                                return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)
                              },
                              e.prototype.arrow=function(){
                                return this.$arrow=this.$arrow||this.tip().find(".arrow")
                              },
                              e.prototype.tip=function(){
                                return this.$tip||(this.$tip=t(this.options.template)),this.$tip
                              };
                              var n=t.fn.popover;
                              t.fn.popover=function(n){
                                return this.each(function(){
                                  var r=t(this),i=r.data("bs.popover"),o="object"==typeof n&&n;(i||"destroy"!=n)&&(i||r.data("bs.popover",i=new e(this,o)),"string"==typeof n&&i[n]())
                                })
                              },
                              t.fn.popover.Constructor=e,t.fn.popover.noConflict=function(){
                                return t.fn.popover=n,this
                              }
                          }(jQuery),+function(t){
                            "use strict";
                            var e=function(e){
                              this.element=t(e)
                            };
                            e.prototype.show=function(){
                              var e=this.element,n=e.closest("ul:not(.dropdown-menu)"),r=e.data("target");
                              if(r||(r=e.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){
                                var i=n.find(".active:last a")[0],o=t.Event("show.bs.tab",{relatedTarget:i});
                                if(e.trigger(o),!o.isDefaultPrevented()){
                                  var a=t(r);
                                  this.activate(e.parent("li"),n),this.activate(a,a.parent(),function(){
                                    e.trigger({type:"shown.bs.tab",relatedTarget:i})
                                  })
                                }
                              }
                            },
                            e.prototype.activate=function(e,n,r){
                              function i(){
                                o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),e.addClass("active"),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active"),r&&r()
                              }
                              var o=n.find("> .active"),a=r&&t.support.transition&&o.hasClass("fade");
                              a?o.one(t.support.transition.end,i).emulateTransitionEnd(150):i(),o.removeClass("in")};
                              var n=t.fn.tab;t.fn.tab=function(n){
                                return this.each(function(){
                                  var r=t(this),i=r.data("bs.tab");
                                  i||r.data("bs.tab",i=new e(this)),"string"==typeof n&&i[n]()
                                })
                              },t.fn.tab.Constructor=e,t.fn.tab.noConflict=function(){
                                return t.fn.tab=n,this
                              },
                              t(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(e){
                                e.preventDefault(),t(this).tab("show")
                              })
                            }(jQuery),+function(t){
                              "use strict";
                              var e=function(n,r){
                                this.options=t.extend({},e.DEFAULTS,r),this.$window=t(window).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(n),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()
                              };
                              e.RESET="affix affix-top affix-bottom",e.DEFAULTS={offset:0},e.prototype.getPinnedOffset=function(){
                                if(this.pinnedOffset)return this.pinnedOffset;
                                this.$element.removeClass(e.RESET).addClass("affix");
                                var t=this.$window.scrollTop(),n=this.$element.offset();
                                return this.pinnedOffset=n.top-t
                              },
                              e.prototype.checkPositionWithEventLoop=function(){
                                setTimeout(t.proxy(this.checkPosition,this),1)
                              },
                              e.prototype.checkPosition=function(){
                                if(this.$element.is(":visible")){
                                  var n=t(document).height(),r=this.$window.scrollTop(),i=this.$element.offset(),o=this.options.offset,a=o.top,s=o.bottom;
                                  "top"==this.affixed&&(i.top+=r),"object"!=typeof o&&(s=a=o),"function"==typeof a&&(a=o.top(this.$element)),"function"==typeof s&&(s=o.bottom(this.$element));
                                  var l=!(null!=this.unpin&&r+this.unpin<=i.top)&&(null!=s&&i.top+this.$element.height()>=n-s?"bottom":null!=a&&r<=a&&"top");
                                  if(this.affixed!==l){
                                    this.unpin&&this.$element.css("top","");
                                    var u="affix"+(l?"-"+l:""),c=t.Event(u+".bs.affix");
                                    this.$element.trigger(c),c.isDefaultPrevented()||(this.affixed=l,this.unpin="bottom"==l?this.getPinnedOffset():null,this.$element.removeClass(e.RESET).addClass(u).trigger(t.Event(u.replace("affix","affixed"))),"bottom"==l&&this.$element.offset({top:n-s-this.$element.height()}))
                                  }
                                }
                              };
                              var n=t.fn.affix;t.fn.affix=function(n){
                                return this.each(function(){
                                  var r=t(this),i=r.data("bs.affix"),o="object"==typeof n&&n;i||r.data("bs.affix",i=new e(this,o)),"string"==typeof n&&i[n]()
                                })
                              },
                              t.fn.affix.Constructor=e,t.fn.affix.noConflict=function(){
                                return t.fn.affix=n,this
                              },
                              t(window).on("load",function(){
                                t('[data-spy="affix"]').each(function(){
                                  var e=t(this),n=e.data();
                                  n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),e.affix(n)
                                })
                              })
                            }(jQuery),+function(t){
                              "use strict";
                              var e=function(n,r){
                                this.$element=t(n),this.options=t.extend({},e.DEFAULTS,r),this.transitioning=null,this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()
                              };
                              e.DEFAULTS={toggle:!0},
                              e.prototype.dimension=function(){
                                var t=this.$element.hasClass("width");
                                return t?"width":"height"
                              },
                              e.prototype.show=function(){
                                if(!this.transitioning&&!this.$element.hasClass("in")){
                                  var e=t.Event("show.bs.collapse");
                                  if(this.$element.trigger(e),!e.isDefaultPrevented()){
                                    var n=this.$parent&&this.$parent.find("> .panel > .in");
                                    if(n&&n.length){
                                      var r=n.data("bs.collapse");
                                      if(r&&r.transitioning)return;
                                      n.collapse("hide"),r||n.data("bs.collapse",null)
                                    }
                                    var i=this.dimension();
                                    this.$element.removeClass("collapse").addClass("collapsing")[i](0),this.transitioning=1;
                                    var o=function(){
                                      this.$element.removeClass("collapsing").addClass("collapse in")[i]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")
                                    };
                                    if(!t.support.transition)return o.call(this);
                                    var a=t.camelCase(["scroll",i].join("-"));
                                    this.$element.one(t.support.transition.end,t.proxy(o,this)).emulateTransitionEnd(350)[i](this.$element[0][a])
                                  }
                                }
                              },
                              e.prototype.hide=function(){
                                if(!this.transitioning&&this.$element.hasClass("in")){
                                  var e=t.Event("hide.bs.collapse");
                                  if(this.$element.trigger(e),!e.isDefaultPrevented()){
                                    var n=this.dimension();
                                    this.$element[n](this.$element[n]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;
                                    var r=function(){
                                      this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                                    };
                                    return t.support.transition?void this.$element[n](0).one(t.support.transition.end,t.proxy(r,this)).emulateTransitionEnd(350):r.call(this)
                                  }
                                }
                              },
                              e.prototype.toggle=function(){
                                this[this.$element.hasClass("in")?"hide":"show"]()
                              };
                              var n=t.fn.collapse;
                              t.fn.collapse=function(n){
                                return this.each(function(){
                                  var r=t(this),i=r.data("bs.collapse"),o=t.extend({},e.DEFAULTS,r.data(),"object"==typeof n&&n);
                                  !i&&o.toggle&&"show"==n&&(n=!n),i||r.data("bs.collapse",i=new e(this,o)),
                                  "string"==typeof n&&i[n]()
                                })
                              },
                              t.fn.collapse.Constructor=e,t.fn.collapse.noConflict=function(){
                                return t.fn.collapse=n,this
                              },
                              t(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(e){
                                var n,r=t(this),i=r.attr("data-target")||e.preventDefault()||(n=r.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""),o=t(i),a=o.data("bs.collapse"),s=a?"toggle":r.data(),l=r.attr("data-parent"),u=l&&t(l);
                                a&&a.transitioning||(u&&u.find('[data-toggle=collapse][data-parent="'+l+'"]').not(r).addClass("collapsed"),r[o.hasClass("in")?"addClass":"removeClass"]("collapsed")),o.collapse(s)
                              })
                            }(jQuery),+function(t){
                              function e(n,r){
                                var i,o=t.proxy(this.process,this);
                                this.$element=t(t(n).is("body")?window:n),this.$body=t("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",o),this.options=t.extend({},e.DEFAULTS,r),this.selector=(this.options.target||(i=t(n).attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=t([]),this.targets=t([]),this.activeTarget=null,this.refresh(),this.process()
                              }
                              e.DEFAULTS={offset:10},e.prototype.refresh=function(){
                                var e=this.$element[0]==window?"offset":"position";
                                this.offsets=t([]),this.targets=t([]);
                                var n=this;this.$body.find(this.selector).map(function(){
                                  var r=t(this),i=r.data("target")||r.attr("href"),o=/^#./.test(i)&&t(i);
                                  return o&&o.length&&o.is(":visible")&&[[o[e]().top+(!t.isWindow(n.$scrollElement.get(0))&&n.$scrollElement.scrollTop()),i]]||null
                                }).sort(function(t,e){
                                  return t[0]-e[0]
                                }).each(function(){
                                  n.offsets.push(this[0]),n.targets.push(this[1])
                                })
                              },
                              e.prototype.process=function(){
                                var t,e=this.$scrollElement.scrollTop()+this.options.offset,n=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,r=n-this.$scrollElement.height(),i=this.offsets,o=this.targets,a=this.activeTarget;
                                if(e>=r)return a!=(t=o.last()[0])&&this.activate(t);
                                if(a&&e<=i[0])return a!=(t=o[0])&&this.activate(t);
                                for(t=i.length;t--;)a!=o[t]&&e>=i[t]&&(!i[t+1]||e<=i[t+1])&&this.activate(o[t])
                              },
                              e.prototype.activate=function(e){
                                this.activeTarget=e,t(this.selector).parentsUntil(this.options.target,".active").removeClass("active");
                                var n=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',r=t(n).parents("li").addClass("active");
                                r.parent(".dropdown-menu").length&&(r=r.closest("li.dropdown").addClass("active")),r.trigger("activate.bs.scrollspy")};
                                var n=t.fn.scrollspy;
                                t.fn.scrollspy=function(n){
                                  return this.each(function(){
                                    var r=t(this),i=r.data("bs.scrollspy"),o="object"==typeof n&&n;
                                    i||r.data("bs.scrollspy",i=new e(this,o)),"string"==typeof n&&i[n]()
                                  })
                                },
                                t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){
                                  return t.fn.scrollspy=n,this
                                },
                                t(window).on("load",function(){
                                  t('[data-spy="scroll"]').each(function(){
                                    var e=t(this);e.scrollspy(e.data())
                                  })
                                })
                            }(jQuery),+function(t){
                              function e(){
                                var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};
                                for(var n in e)if(void 0!==t.style[n])return{
                                  end:e[n]
                                };
                                return!1
                              }
                              t.fn.emulateTransitionEnd=function(e){
                                var n=!1,r=this;
                                t(this).one(t.support.transition.end,function(){
                                  n=!0
                                });
                                var i=function(){n||t(r).trigger(t.support.transition.end)};
                                return setTimeout(i,e),this
                              },
                              t(function(){
                                t.support.transition=e()
                              })
                            }(jQuery),function(){
                              function t(t){
                                function e(e,n,r,i,o,a){
                                  for(;o>=0&&o<a;o+=t){
                                    var s=i?i[o]:o;
                                    r=n(r,e[s],s,e)}return r
                                  }return function(n,r,i,o){
                                    r=b(r,o,4);
                                    var a=!_(n)&&y.keys(n),s=(a||n).length,l=t>0?0:s-1;
                                    return arguments.length<3&&(i=n[a?a[l]:l],l+=t),e(n,r,i,a,l,s)
                                  }
                                }
                                function e(t){
                                  return function(e,n,r){
                                    n=x(n,r);
                                    for(var i=S(e),o=t>0?0:i-1;o>=0&&o<i;o+=t)if(n(e[o],o,e))return o;
                                    return-1
                                  }
                                }
                                function n(t,e,n){
                                  return function(r,i,o){
                                    var a=0,s=S(r);
                                    if("number"==typeof o)t>0?a=o>=0?o:Math.max(o+s,a):s=o>=0?Math.min(o+1,s):o+s+1;
                                    else if(n&&o&&s)return o=n(r,i),r[o]===i?o:-1;
                                    if(i!==i)return o=e(c.call(r,a,s),y.isNaN),o>=0?o+a:-1;
                                    for(o=t>0?a:s-1;o>=0&&o<s;o+=t)if(r[o]===i)return o;
                                    return-1
                                  }
                                }
                                function r(t,e){
                                  var n=A.length,r=t.constructor,i=y.isFunction(r)&&r.prototype||s,o="constructor";
                                  for(y.has(t,o)&&!y.contains(e,o)&&e.push(o);n--;)o=A[n],o in t&&t[o]!==i[o]&&!y.contains(e,o)&&e.push(o)
                                }
                                var i=this,o=i._,a=Array.prototype,s=Object.prototype,l=Function.prototype,u=a.push,c=a.slice,d=s.toString,p=s.hasOwnProperty,f=Array.isArray,h=Object.keys,m=l.bind,g=Object.create,v=function(){},y=function(t){
                                  return t instanceof y?t:this instanceof y?void(this._wrapped=t):new y(t)
                                };
                                "undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=y),exports._=y):i._=y,y.VERSION="1.8.3";
                                var b=function(t,e,n){
                                  if(void 0===e)return t;
                                  switch(null==n?3:n){
                                    case 1:
                                      return function(n){
                                        return t.call(e,n)
                                      };
                                    case 2:
                                      return function(n,r){
                                        return t.call(e,n,r)
                                      };
                                    case 3:
                                      return function(n,r,i){
                                        return t.call(e,n,r,i)
                                      };
                                    case 4:
                                    return function(n,r,i,o){
                                      return t.call(e,n,r,i,o)
                                    }
                                  }
                                  return function(){
                                    return t.apply(e,arguments)
                                  }
                                },x=function(t,e,n){
                                  return null==t?y.identity:y.isFunction(t)?b(t,e,n):y.isObject(t)?y.matcher(t):y.property(t)};
                                  y.iteratee=function(t,e){
                                    return x(t,e,1/0)};
                                    var w=function(t,e){
                                      return function(n){
                                        var r=arguments.length;
                                        if(r<2||null==n)return n;
                                        for(var i=1;i<r;i++)for(var o=arguments[i],a=t(o),s=a.length,l=0;l<s;l++){
                                          var u=a[l];
                                          e&&void 0!==n[u]||(n[u]=o[u])
                                        }return n
                                      }
                                    },
                                    C=function(t){
                                      if(!y.isObject(t))return{};
                                      if(g)return g(t);
                                      v.prototype=t;
                                      var e=new v;
                                      return v.prototype=null,e
                                    },
                                    k=function(t){
                                      return function(e){
                                        return null==e?void 0:e[t]
                                      }
                                    },
                                    T=Math.pow(2,53)-1,S=k("length"),_=function(t){
                                      var e=S(t);
                                      return"number"==typeof e&&e>=0&&e<=T
                                    };
                                    y.each=y.forEach=function(t,e,n){
                                      e=b(e,n);
                                      var r,i;
                                      if(_(t))for(r=0,i=t.length;r<i;r++)e(t[r],r,t);
                                      else{
                                        var o=y.keys(t);
                                        for(r=0,i=o.length;r<i;r++)e(t[o[r]],o[r],t)
                                      }
                                      return t
                                    },
                                    y.map=y.collect=function(t,e,n){
                                      e=x(e,n);
                                      for(var r=!_(t)&&y.keys(t),i=(r||t).length,o=Array(i),a=0;a<i;a++){
                                        var s=r?r[a]:a;
                                        o[a]=e(t[s],s,t)
                                      }
                                      return o
                                    },
                                    y.reduce=y.foldl=y.inject=t(1),y.reduceRight=y.foldr=t(-1),y.find=y.detect=function(t,e,n){
                                      var r;
                                      if(r=_(t)?y.findIndex(t,e,n):y.findKey(t,e,n),void 0!==r&&r!==-1)return t[r]},y.filter=y.select=function(t,e,n){
                                        var r=[];
                                        return e=x(e,n),y.each(t,function(t,n,i){
                                          e(t,n,i)&&r.push(t)
                                        }),r
                                      },
                                      y.reject=function(t,e,n){
                                        return y.filter(t,y.negate(x(e)),n)
                                      },
                                      y.every=y.all=function(t,e,n){
                                        e=x(e,n);
                                        for(var r=!_(t)&&y.keys(t),i=(r||t).length,o=0;o<i;o++){
                                          var a=r?r[o]:o;
                                          if(!e(t[a],a,t))return!1
                                        }
                                        return!0
                                      },
                                      y.some=y.any=function(t,e,n){
                                        e=x(e,n);
                                        for(var r=!_(t)&&y.keys(t),i=(r||t).length,o=0;o<i;o++){
                                          var a=r?r[o]:o;
                                          if(e(t[a],a,t))return!0
                                        }
                                        return!1
                                      },
                                      y.contains=y.includes=y.include=function(t,e,n,r){
                                        return _(t)||(t=y.values(t)),("number"!=typeof n||r)&&(n=0),y.indexOf(t,e,n)>=0
                                      },
                                      y.invoke=function(t,e){
                                        var n=c.call(arguments,2),r=y.isFunction(e);
                                        return y.map(t,function(t){
                                          var i=r?e:t[e];
                                          return null==i?i:i.apply(t,n)
                                        })
                                      },
                                      y.pluck=function(t,e){
                                        return y.map(t,y.property(e))
                                      },
                                      y.where=function(t,e){
                                        return y.filter(t,y.matcher(e))
                                      },
                                      y.findWhere=function(t,e){
                                        return y.find(t,y.matcher(e))
                                      },
                                      y.max=function(t,e,n){
                                        var r,i,o=-(1/0),a=-(1/0);
                                        if(null==e&&null!=t){
                                          t=_(t)?t:y.values(t);
                                          for(var s=0,l=t.length;s<l;s++)r=t[s],r>o&&(o=r)
                                        }else e=x(e,n),y.each(t,function(t,n,r){
                                          i=e(t,n,r),(i>a||i===-(1/0)&&o===-(1/0))&&(o=t,a=i)});
                                          return o
                                      },
                                      y.min=function(t,e,n){
                                        var r,i,o=1/0,a=1/0;
                                        if(null==e&&null!=t){
                                          t=_(t)?t:y.values(t);
                                          for(var s=0,l=t.length;s<l;s++)r=t[s],r<o&&(o=r)
                                        }else e=x(e,n),y.each(t,function(t,n,r){
                                          i=e(t,n,r),(i<a||i===1/0&&o===1/0)&&(o=t,a=i)
                                        });
                                          return o
                                      },
                                      y.shuffle=function(t){
                                        for(var e,n=_(t)?t:y.values(t),r=n.length,i=Array(r),o=0;o<r;o++)e=y.random(0,o),e!==o&&(i[o]=i[e]),i[e]=n[o];
                                        return i
                                      },
                                      y.sample=function(t,e,n){
                                        return null==e||n?(_(t)||(t=y.values(t)),t[y.random(t.length-1)]):y.shuffle(t).slice(0,Math.max(0,e))
                                      },
                                      y.sortBy=function(t,e,n){
                                        return e=x(e,n),y.pluck(y.map(t,function(t,n,r){
                                          return{
                                            value:t,
                                            index:n,
                                            criteria:e(t,n,r)
                                          }
                                        }).sort(function(t,e){
                                          var n=t.criteria,r=e.criteria;
                                          if(n!==r){
                                            if(n>r||void 0===n)return 1;
                                            if(n<r||void 0===r)return-1
                                          }
                                          return t.index-e.index
                                        }),"value")
                                      };
                                      var $=function(t){
                                        return function(e,n,r){
                                          var i={};
                                          return n=x(n,r),y.each(e,function(r,o){
                                            var a=n(r,o,e);
                                            t(i,r,a)
                                          }),i
                                        }
                                      };
                                      y.groupBy=$(function(t,e,n){
                                        y.has(t,n)?t[n].push(e):t[n]=[e]
                                      }),
                                      y.indexBy=$(function(t,e,n){
                                        t[n]=e
                                      }),
                                      y.countBy=$(function(t,e,n){
                                        y.has(t,n)?t[n]++:t[n]=1
                                      }),
                                      y.toArray=function(t){
                                        return t?y.isArray(t)?c.call(t):_(t)?y.map(t,y.identity):y.values(t):[]
                                      },
                                      y.size=function(t){
                                        return null==t?0:_(t)?t.length:y.keys(t).length
                                      },
                                      y.partition=function(t,e,n){
                                        e=x(e,n);
                                        var r=[],i=[];
                                        return y.each(t,function(t,n,o){
                                          (e(t,n,o)?r:i).push(t)
                                        }),[r,i]
                                      },
                                      y.first=y.head=y.take=function(t,e,n){
                                        if(null!=t)return null==e||n?t[0]:y.initial(t,t.length-e)
                                      },
                                      y.initial=function(t,e,n){
                                        return c.call(t,0,Math.max(0,t.length-(null==e||n?1:e)))
                                      },
                                      y.last=function(t,e,n){
                                        if(null!=t)return null==e||n?t[t.length-1]:y.rest(t,Math.max(0,t.length-e))
                                      },
                                      y.rest=y.tail=y.drop=function(t,e,n){
                                        return c.call(t,null==e||n?1:e)
                                      },
                                      y.compact=function(t){
                                        return y.filter(t,y.identity)
                                      };
                                      var E=function(t,e,n,r){
                                        for(var i=[],o=0,a=r||0,s=S(t);a<s;a++){
                                          var l=t[a];
                                          if(_(l)&&(y.isArray(l)||y.isArguments(l))){
                                            e||(l=E(l,e,n));
                                            var u=0,c=l.length;
                                            for(i.length+=c;u<c;)i[o++]=l[u++]
                                          }else n||(i[o++]=l)
                                        }
                                        return i
                                      };
                                      y.flatten=function(t,e){
                                        return E(t,e,!1)
                                      },
                                      y.without=function(t){
                                        return y.difference(t,c.call(arguments,1))
                                      },
                                      y.uniq=y.unique=function(t,e,n,r){
                                        y.isBoolean(e)||(r=n,n=e,e=!1),null!=n&&(n=x(n,r));
                                        for(var i=[],o=[],a=0,s=S(t);a<s;a++){
                                          var l=t[a],u=n?n(l,a,t):l;
                                          e?(a&&o===u||i.push(l),o=u):n?y.contains(o,u)||(o.push(u),i.push(l)):y.contains(i,l)||i.push(l)
                                        }
                                        return i
                                      },
                                      y.union=function(){
                                        return y.uniq(E(arguments,!0,!0))
                                      },
                                      y.intersection=function(t){
                                        for(var e=[],n=arguments.length,r=0,i=S(t);r<i;r++){
                                          var o=t[r];
                                          if(!y.contains(e,o)){
                                            for(var a=1;a<n&&y.contains(arguments[a],o);a++);a===n&&e.push(o)
                                          }
                                        }
                                        return e
                                      },
                                      y.difference=function(t){
                                        var e=E(arguments,!0,!0,1);
                                        return y.filter(t,function(t){
                                          return!y.contains(e,t)
                                        })
                                      },
                                      y.zip=function(){
                                        return y.unzip(arguments)
                                      },
                                      y.unzip=function(t){
                                        for(var e=t&&y.max(t,S).length||0,n=Array(e),r=0;r<e;r++)n[r]=y.pluck(t,r);
                                        return n
                                      },
                                      y.object=function(t,e){
                                        for(var n={},r=0,i=S(t);r<i;r++)e?n[t[r]]=e[r]:n[t[r][0]]=t[r][1];
                                        return n
                                      },
                                      y.findIndex=e(1),y.findLastIndex=e(-1),y.sortedIndex=function(t,e,n,r){
                                        n=x(n,r,1);
                                        for(var i=n(e),o=0,a=S(t);o<a;){
                                          var s=Math.floor((o+a)/2);
                                          n(t[s])<i?o=s+1:a=s
                                        }
                                        return o
                                      },
                                      y.indexOf=n(1,y.findIndex,y.sortedIndex),y.lastIndexOf=n(-1,y.findLastIndex),y.range=function(t,e,n){
                                        null==e&&(e=t||0,t=0),n=n||1;
                                        for(var r=Math.max(Math.ceil((e-t)/n),0),i=Array(r),o=0;o<r;o++,t+=n)i[o]=t;
                                        return i
                                      };
                                      var M=function(t,e,n,r,i){
                                        if(!(r instanceof e))return t.apply(n,i);
                                        var o=C(t.prototype),a=t.apply(o,i);
                                        return y.isObject(a)?a:o
                                      };
                                      y.bind=function(t,e){
                                        if(m&&t.bind===m)return m.apply(t,c.call(arguments,1));
                                        if(!y.isFunction(t))throw new TypeError("Bind must be called on a function");
                                        var n=c.call(arguments,2),r=function(){
                                          return M(t,r,e,this,n.concat(c.call(arguments)))
                                        };
                                        return r
                                      },
                                      y.partial=function(t){
                                        var e=c.call(arguments,1),n=function(){
                                          for(var r=0,i=e.length,o=Array(i),a=0;a<i;a++)o[a]=e[a]===y?arguments[r++]:e[a];
                                          for(;r<arguments.length;)o.push(arguments[r++]);
                                          return M(t,n,this,this,o)
                                        };
                                        return n
                                      },
                                      y.bindAll=function(t){
                                        var e,n,r=arguments.length;
                                        if(r<=1)throw new Error("bindAll must be passed function names");
                                        for(e=1;e<r;e++)n=arguments[e],t[n]=y.bind(t[n],t);
                                        return t
                                      },
                                      y.memoize=function(t,e){
                                        var n=function(r){
                                          var i=n.cache,o=""+(e?e.apply(this,arguments):r);
                                          return y.has(i,o)||(i[o]=t.apply(this,arguments)),i[o]
                                        };
                                        return n.cache={},n
                                      },
                                      y.delay=function(t,e){
                                        var n=c.call(arguments,2);
                                        return setTimeout(function(){
                                          return t.apply(null,n)
                                        },e)
                                      },
                                      y.defer=y.partial(y.delay,y,1),y.throttle=function(t,e,n){
                                        var r,i,o,a=null,s=0;
                                        n||(n={});
                                        var l=function(){
                                          s=n.leading===!1?0:y.now(),a=null,o=t.apply(r,i),a||(r=i=null)
                                        };
                                        return function(){
                                          var u=y.now();
                                          s||n.leading!==!1||(s=u);
                                          var c=e-(u-s);
                                          return r=this,i=arguments,c<=0||c>e?(a&&(clearTimeout(a),a=null),s=u,o=t.apply(r,i),a||(r=i=null)):a||n.trailing===!1||(a=setTimeout(l,c)),o
                                        }
                                      },
                                      y.debounce=function(t,e,n){
                                        var r,i,o,a,s,l=function(){
                                          var u=y.now()-a;
                                          u<e&&u>=0?r=setTimeout(l,e-u):(r=null,n||(s=t.apply(o,i),r||(o=i=null)))
                                        };
                                        return function(){
                                          o=this,i=arguments,a=y.now();
                                          var u=n&&!r;
                                          return r||(r=setTimeout(l,e)),u&&(s=t.apply(o,i),o=i=null),s
                                        }
                                      },
                                      y.wrap=function(t,e){
                                        return y.partial(e,t)
                                      },
                                      y.negate=function(t){
                                        return function(){
                                          return!t.apply(this,arguments)
                                        }
                                      },
                                      y.compose=function(){
                                        var t=arguments,e=t.length-1;
                                        return function(){
                                          for(var n=e,r=t[e].apply(this,arguments);n--;)r=t[n].call(this,r);
                                          return r
                                        }
                                      },
                                      y.after=function(t,e){
                                        return function(){
                                          if(--t<1)return e.apply(this,arguments)
                                        }
                                      },
                                      y.before=function(t,e){
                                        var n;
                                        return function(){
                                          return--t>0&&(n=e.apply(this,arguments)),t<=1&&(e=null),n
                                        }
                                      },
                                      y.once=y.partial(y.before,2);
                                      var N=!{toString:null}.propertyIsEnumerable("toString"),A=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];
                                      y.keys=function(t){
                                        if(!y.isObject(t))return[];
                                        if(h)return h(t);
                                        var e=[];
                                        for(var n in t)y.has(t,n)&&e.push(n);
                                        return N&&r(t,e),e
                                      },
                                      y.allKeys=function(t){
                                        if(!y.isObject(t))return[];
                                        var e=[];
                                        for(var n in t)e.push(n);
                                        return N&&r(t,e),e
                                      },
                                      y.values=function(t){
                                        for(var e=y.keys(t),n=e.length,r=Array(n),i=0;i<n;i++)r[i]=t[e[i]];
                                        return r
                                      },
                                      y.mapObject=function(t,e,n){
                                        e=x(e,n);
                                        for(var r,i=y.keys(t),o=i.length,a={},s=0;s<o;s++)r=i[s],a[r]=e(t[r],r,t);
                                        return a
                                      },
                                      y.pairs=function(t){
                                        for(var e=y.keys(t),n=e.length,r=Array(n),i=0;i<n;i++)r[i]=[e[i],t[e[i]]];
                                        return r
                                      },
                                      y.invert=function(t){
                                        for(var e={},n=y.keys(t),r=0,i=n.length;r<i;r++)e[t[n[r]]]=n[r];
                                        return e
                                      },
                                      y.functions=y.methods=function(t){
                                        var e=[];
                                        for(var n in t)y.isFunction(t[n])&&e.push(n);
                                        return e.sort()
                                      },
                                      y.extend=w(y.allKeys),y.extendOwn=y.assign=w(y.keys),y.findKey=function(t,e,n){
                                        e=x(e,n);
                                        for(var r,i=y.keys(t),o=0,a=i.length;o<a;o++)if(r=i[o],e(t[r],r,t))return r
                                      },
                                      y.pick=function(t,e,n){
                                        var r,i,o={},a=t;
                                        if(null==a)return o;
                                        y.isFunction(e)?(i=y.allKeys(a),r=b(e,n)):(i=E(arguments,!1,!1,1),r=function(t,e,n){
                                          return e in n
                                        },
                                        a=Object(a));
                                        for(var s=0,l=i.length;s<l;s++){
                                          var u=i[s],c=a[u];
                                          r(c,u,a)&&(o[u]=c)
                                        }
                                        return o
                                      },
                                      y.omit=function(t,e,n){
                                        if(y.isFunction(e))e=y.negate(e);
                                        else{
                                          var r=y.map(E(arguments,!1,!1,1),String);
                                          e=function(t,e){
                                            return!y.contains(r,e)
                                          }
                                        }
                                        return y.pick(t,e,n)
                                      },
                                      y.defaults=w(y.allKeys,!0),y.create=function(t,e){
                                        var n=C(t);
                                        return e&&y.extendOwn(n,e),n
                                      },
                                      y.clone=function(t){
                                        return y.isObject(t)?y.isArray(t)?t.slice():y.extend({},t):t
                                      },
                                      y.tap=function(t,e){
                                        return e(t),t
                                      },
                                      y.isMatch=function(t,e){
                                        var n=y.keys(e),r=n.length;
                                        if(null==t)return!r;
                                        for(var i=Object(t),o=0;o<r;o++){
                                          var a=n[o];
                                          if(e[a]!==i[a]||!(a in i))return!1
                                        }
                                        return!0
                                      };
                                      var D=function(t,e,n,r){
                                        if(t===e)return 0!==t||1/t===1/e;
                                        if(null==t||null==e)return t===e;
                                        t instanceof y&&(t=t._wrapped),e instanceof y&&(e=e._wrapped);
                                        var i=d.call(t);
                                        if(i!==d.call(e))return!1;
                                        switch(i){
                                          case"[object RegExp]":
                                          case"[object String]":
                                            return""+t==""+e;
                                          case"[object Number]":
                                            return+t!==+t?+e!==+e:0===+t?1/+t===1/e:+t===+e;
                                          case"[object Date]":
                                          case"[object Boolean]":
                                            return+t===+e
                                        }
                                        var o="[object Array]"===i;
                                        if(!o){
                                          if("object"!=typeof t||"object"!=typeof e)return!1;
                                          var a=t.constructor,s=e.constructor;
                                          if(a!==s&&!(y.isFunction(a)&&a instanceof a&&y.isFunction(s)&&s instanceof s)&&"constructor"in t&&"constructor"in e)return!1
                                        }
                                        n=n||[],r=r||[];
                                        for(var l=n.length;l--;)if(n[l]===t)return r[l]===e;
                                        if(n.push(t),r.push(e),o){
                                          if(l=t.length,l!==e.length)return!1;
                                          for(;l--;)if(!D(t[l],e[l],n,r))return!1
                                        }else{
                                          var u,c=y.keys(t);
                                          if(l=c.length,y.keys(e).length!==l)return!1;
                                          for(;l--;)if(u=c[l],!y.has(e,u)||!D(t[u],e[u],n,r))return!1
                                        }
                                        return n.pop(),r.pop(),!0
                                      };
                                      y.isEqual=function(t,e){
                                        return D(t,e)
                                      },
                                      y.isEmpty=function(t){
                                        return null==t||(_(t)&&(y.isArray(t)||y.isString(t)||y.isArguments(t))?0===t.length:0===y.keys(t).length)
                                      },
                                      y.isElement=function(t){
                                        return!(!t||1!==t.nodeType)
                                      },
                                      y.isArray=f||function(t){
                                        return"[object Array]"===d.call(t)
                                      },
                                      y.isObject=function(t){
                                        var e=typeof t;
                                        return"function"===e||"object"===e&&!!t
                                      },
                                      y.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(t){
                                        y["is"+t]=function(e){
                                          return d.call(e)==="[object "+t+"]"
                                        }
                                      }),
                                      y.isArguments(arguments)||(y.isArguments=function(t){
                                        return y.has(t,"callee")
                                      }),
                                      "function"!=typeof/./&&"object"!=typeof Int8Array&&(y.isFunction=function(t){
                                        return"function"==typeof t||!1
                                      }),
                                      y.isFinite=function(t){
                                        return isFinite(t)&&!isNaN(parseFloat(t))
                                      },
                                      y.isNaN=function(t){
                                        return y.isNumber(t)&&t!==+t
                                      },
                                      y.isBoolean=function(t){
                                        return t===!0||t===!1||"[object Boolean]"===d.call(t)
                                      },
                                      y.isNull=function(t){
                                        return null===t
                                      },
                                      y.isUndefined=function(t){
                                        return void 0===t
                                      },
                                      y.has=function(t,e){
                                        return null!=t&&p.call(t,e)
                                      },
                                      y.noConflict=function(){
                                        return i._=o,this
                                      },
                                      y.identity=function(t){
                                        return t
                                      },
                                      y.constant=function(t){
                                        return function(){
                                          return t
                                        }
                                      },
                                      y.noop=function(){},y.property=k,y.propertyOf=function(t){
                                        return null==t?function(){}:function(e){
                                          return t[e]
                                        }
                                      },
                                      y.matcher=y.matches=function(t){
                                        return t=y.extendOwn({},t),function(e){
                                          return y.isMatch(e,t)
                                        }
                                      },
                                      y.times=function(t,e,n){
                                        var r=Array(Math.max(0,t));
                                        e=b(e,n,1);
                                        for(var i=0;i<t;i++)r[i]=e(i);
                                        return r
                                      },
                                      y.random=function(t,e){
                                        return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))
                                      },
                                      y.now=Date.now||function(){
                                        return(new Date).getTime()
                                      };
                                      var L={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},j=y.invert(L),P=function(t){
                                        var e=function(e){return t[e]},n="(?:"+y.keys(t).join("|")+")",r=RegExp(n),i=RegExp(n,"g");
                                        return function(t){
                                          return t=null==t?"":""+t,r.test(t)?t.replace(i,e):t
                                        }
                                      };
                                      y.escape=P(L),y.unescape=P(j),y.result=function(t,e,n){
                                        var r=null==t?void 0:t[e];
                                        return void 0===r&&(r=n),y.isFunction(r)?r.call(t):r
                                      };
                                      var O=0;
                                      y.uniqueId=function(t){
                                        var e=++O+"";
                                        return t?t+e:e
                                      },
                                      y.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
                                      var I=/(.)^/,q={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},H=/\\|'|\r|\n|\u2028|\u2029/g,F=function(t){return"\\"+q[t]};
                                      y.template=function(t,e,n){
                                        !e&&n&&(e=n),e=y.defaults({},e,y.templateSettings);
                                        var r=RegExp([(e.escape||I).source,(e.interpolate||I).source,(e.evaluate||I).source].join("|")+"|$","g"),i=0,o="__p+='";
                                        t.replace(r,function(e,n,r,a,s){
                                          return o+=t.slice(i,s).replace(H,F),i=s+e.length,n?o+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?o+="'+\n((__t=("+r+"))==null?'':__t)+\n'":a&&(o+="';\n"+a+"\n__p+='"),e
                                        }),
                                        o+="';\n",e.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";
                                        try{
                                          var a=new Function(e.variable||"obj","_",o)
                                        }catch(t){
                                          throw t.source=o,t
                                        }
                                        var s=function(t){
                                          return a.call(this,t,y)
                                        },
                                        l=e.variable||"obj";
                                        return s.source="function("+l+"){\n"+o+"}",s
                                      },
                                      y.chain=function(t){
                                        var e=y(t);
                                        return e._chain=!0,e
                                      };
                                      var z=function(t,e){
                                        return t._chain?y(e).chain():e
                                      };
                                      y.mixin=function(t){
                                        y.each(y.functions(t),function(e){
                                          var n=y[e]=t[e];
                                          y.prototype[e]=function(){
                                            var t=[this._wrapped];
                                            return u.apply(t,arguments),z(this,n.apply(y,t))
                                          }
                                        })
                                      },
                                      y.mixin(y),y.each(["pop","push","reverse","shift","sort","splice","unshift"],function(t){
                                        var e=a[t];
                                        y.prototype[t]=function(){
                                          var n=this._wrapped;
                                          return e.apply(n,arguments),"shift"!==t&&"splice"!==t||0!==n.length||delete n[0],z(this,n)
                                        }
                                      }),
                                      y.each(["concat","join","slice"],function(t){
                                        var e=a[t];
                                        y.prototype[t]=function(){
                                          return z(this,e.apply(this._wrapped,arguments))
                                        }
                                      }),
                                      y.prototype.value=function(){
                                        return this._wrapped
                                      },
                                      y.prototype.valueOf=y.prototype.toJSON=y.prototype.value,y.prototype.toString=function(){
                                        return""+this._wrapped
                                      },
                                      "function"==typeof define&&define.amd&&define("underscore",[],function(){return y})
                                    }.call(this),$(function(){
                                      function t(t){
                                        var e=$(t).attr("href"),n=/^((http|https|ftp):\/\/www.gob.mx)/;
                                        if(void 0!==e&&""!==e.trim()&&"https://sidec.funcionpublica.gob.mx/"!==e.trim()&&!n.test(e))return!!confirm("Est\xe1s saliendo del sitio www.gob.mx");
                                        $(t).text().replace(/\s/g,"_").replace(/\xf1/g,"n").replace(/\xe1/g,"a").replace(/\xe9/g,"e").replace(/\xed/g,"i").replace(/\xf3/g,"o").replace(/\xfa/g,"u")}function e(){
                                          var t=window.location.pathname;
                                          return t.indexOf("tramites")!==-1?"Tr\xe1mites":t.indexOf("busqueda")!==-1?"Buscador":t.indexOf("gobierno")!==-1?"Gobierno":"Home"
                                        }function n(){
                                          var t=window.location.pathname;
                                          return t.indexOf("tramites")!==-1?"Tr\xe1mites":"N/A"
                                        }function r(t,e,n){
                                          if(rails_env_prod)try{ga("require","ec"),ga("ec:addPromo",{id:"N/A",name:t,creative:"Banner "+n,position:e})}catch(t){console.log(t)}
                                        }function i(t){
                                          $.ajax({
                                            type:"GET",
                                            data:{page:t},
                                            dataType:"json",
                                            url:"/portada/posts"
                                          }).done(function(e){
                                            var n=2===t?4:7,i=$(".actualidad"),o=0,a=$("<div/>");
                                            a.addClass("row small-posts small-bottom-buffer").focus();
                                            for(var s=0;s<e.length;s++){
                                              o=e[s].id;
                                              var l=$("<div/>").addClass("col-md-4"),u=$("<article/>").attr("position",n).appendTo(l),c=new Date(e[s].published_on.substring(0,4),e[s].published_on.substring(5,7)-1,e[s].published_on.substring(8,10));
                                              $("<img/>").addClass("img-responsive").attr("src",void 0!==e[s].main_images?"https://www.gob.mx"+e[s].main_images.main_image.url:"").attr("alt",e[s].main_image_alt).appendTo(u),$("<time/>").text(v[c.getDay()]+e[s].published_on.substring(8,10)+" de "+y[c.getMonth()]+c.getFullYear()).attr("datetime","").appendTo(u),$("<h3/>").text(e[s].title).appendTo(u),$("<a/>").text("Continuar leyendo").click(function(){
                                                try{
                                                  rails_env_prod&&(ga("require","ec"),ga("ec:addPromo",{id:"N/A",name:"Actualidad",creative:"Banner "+$(this).parent().find("img").attr("alt"),position:n}),ga("ec:setAction","promo_click"),ga("send","event","Enhanced Ecommerce","Promotions Click","Actualidad"))
                                                }catch(t){
                                                  console.log(t)
                                                }
                                              }).attr("href","https://www.gob.mx"+e[s].url).attr("title",e[s].title).addClass("small-link").appendTo(u),l.appendTo(a),r("Actualidad",n,e[s].main_image_alt),n++
                                            }p(),$(".get-posts").text(3===t?"Ir a actualidad":"Ver m\xe1s"),a.appendTo(i)
                                          }).fail(function(){})}function o(t){
                                            t.parent().css("border","2px solid"),t.parent().css("border-radius","8px")
                                          }function a(t){
                                            t.parent().css("border","0px"),t.parent().css("border-radius","0px")
                                          }function s(){
                                            var t=1;$(".promo-home-tramites").each(function(){
                                              $(this).find("article").each(function(){
                                                $(this).find("h3").find("a").click(function(){
                                                  try{
                                                    ga("require","ec"),ga("ec:addPromo",{
                                                      id:"N/A",
                                                      name:"Tr\xe1mites",
                                                      creative:"Banner "+$(this).text().trim(),
                                                      position:$(this).parent().parent().attr("position")
                                                    }),ga("ec:setAction","promo_click"),ga("send","event","Enhanced Ecommerce","Promotions Click","Tr\xe1mites")
                                                  }catch(t){
                                                    console.log(t)
                                                  }
                                                }),$(this).attr("position",t),r("Tr\xe1mites",t,$(this).find("h3").find("a").text().trim()),t++
                                              })
                                            })
                                          }function l(){
                                            var t=1;
                                            $(".promo-home-actualidad").each(function(){
                                              $(this).find("article").attr("position",t),r("Actualidad",t,$(this).find("article").find("img").attr("alt").trim()),$(this).find("article").find("a").click(function(){
                                                try{
                                                  ga("require","ec"),ga("ec:addPromo",{
                                                    id:"N/A",
                                                    name:"Actualidad",
                                                    creative:"Banner "+$(this).parent().find("img").attr("alt").trim(),
                                                    position:$(this).parent().attr("position")
                                                  }),ga("ec:setAction","promo_click"),ga("send","event","Enhanced Ecommerce","Promotions Click","Actualidad")
                                                }catch(t){
                                                  console.log(t)
                                                }
                                              }),t++
                                            })
                                          }function u(){
                                            $(".promotion-home-other").each(function(){
                                              var t="";
                                              t=0===$(this).find("img").length?$(this).parent().parent().prev().find("a").find("img").attr("alt").trim():$(this).find("img").attr("alt").trim(),r($(this).attr("bloque"),$(this).attr("position"),t),$(this).click(function(){
                                                try{
                                                  ga("require","ec"),ga("ec:addPromo",{
                                                    id:"N/A",
                                                    name:$(this).attr("bloque"),
                                                    creative:"Banner "+t,
                                                    position:$(this).attr("position")
                                                  }),ga("ec:setAction","promo_click"),ga("send","event","Enhanced Ecommerce","Promotions Click",$(this).attr("bloque"))
                                                }catch(t){
                                                  console.log(t)
                                                }
                                              })
                                            })
                                          }function c(){
                                            $(".promotion-Gob").each(function(){
                                              r("Gobierno",parseInt($(this).attr("position")),$(this).attr("alt").trim()),$(this).click(function(){
                                                try{
                                                  ga("require","ec"),ga("ec:addPromo",{
                                                    id:"N/A",
                                                    name:"Gobierno",
                                                    creative:"Banner "+$(this).attr("alt").trim(),
                                                    position:$(this).attr("position")
                                                  }),ga("ec:setAction","promo_click"),ga("send","event","Enhanced Ecommerce","Promotions Click","Gobierno")
                                                }catch(t){
                                                  console.log(t)
                                                }
                                              })
                                            })
                                          }function d(){
                                            $(".promotion-banner-home").each(function(){
                                              r("Banner",1,$(this).find("div").find("img").attr("alt").trim()),$(this).click(function(){
                                                try{
                                                  ga("require","ec"),ga("ec:addPromo",{
                                                    id:"N/A",
                                                    name:"Banner",
                                                    creative:"Banner "+$(this).find("div").find("img").attr("alt").trim(),
                                                    position:1
                                                  }),ga("ec:setAction","promo_click"),ga("send","event","Enhanced Ecommerce","Promotions Click","Banner")
                                                }catch(t){
                                                  console.log(t)
                                                }
                                              })
                                            })
                                          }function p(){
                                            try{
                                              ga("require","ec"),ga("ec:setAction","promo_impression"),ga("send","event","Enhanced Ecommerce","Promotions Impressions","N/A",{nonInteraction:1})
                                            }catch(t){
                                              console.log(t)
                                            }
                                          }function f(){
                                            var t=(new Date).toISOString().substring(0,11),e="https://api.datos.gob.mx/v1/condiciones-atmosfericas?date-insert=[range:"+t+"00:00%7C"+t+"23:59]&city="+$("#citySelectClima").val().replace(/\s/g,"%20")+"&state="+$("#stateSelectClima").val().replace(/\s/g,"%20");
                                            $.get(e,function(t){
                                              $(".estado-clima").html($("#stateSelectClima").val()),$(".ciudad-clima").html($("#citySelectClima").val()),$(".temperature").html(t.results[t.results.length-1].tempc+"<span>\xb0</span>")
                                            })
                                          }function h(){
                                            var t=(new Date).toISOString().substring(0,11),e="https://api.datos.gob.mx/v1/sinaica?date-insert=[range:"+t+"00:00%7C"+t+"23:59]&state="+$("#stateSelectCalidadAire").val().replace(/\s/g,"%20")+"&city="+$("#citySelectCalidadAire").val().replace(/\s/g,"%20")+"&parametro=PM10";
                                            $.get(e,function(t){
                                              if(t.results.length>0){
                                                t.results[t.results.length-1].valororig;
                                                $(".calidadAire").html(parseInt(t.results[t.results.length-1].valororig)+" <span>pm</span>"),$(".estado-aire").html($("#stateSelectCalidadAire").val()),$(".ciudad-aire").html($("#citySelectCalidadAire").val())
                                              }
                                            })
                                          }function m(){
                                            for(var t=25,r=t,i=100/t,o=new Array,a=0;a<i;a++)o[a]=[r,"false"],r=t+r;
                                            $(document).scroll(function(){
                                              for(var t=0;t<o.length;t++)if($(window).scrollTop()+$(window).height()>=$(document).height()*o[t][0]/100&&"false"===o[t][1]){o[t][1]="true";
                                              try{
                                                $("#categorias-hide").length&&(ga("set","contentGroup4",$("#categorias-hide").val()),ga("set","dimension5",$("#categorias-hide").val())),$("#subcategorias-hide").length&&(ga("set","contentGroup5",$("#subcategorias-hide").val()),ga("set","dimension6",$("#subcategorias-hide").val())),ga("set","dimension14",e()),ga("set","dimension15",""),ga("set","dimension16",n()),ga("send","event","Scroll",o[t][0]+"%",window.location.pathname,{nonInteraction:!0}),ga("set","contentGroup4",null),ga("set","dimension5",null),ga("set","contentGroup5",null),ga("set","dimension6",null),ga("set","dimension14",null),ga("set","dimension15",null),ga("set","dimension16",null)
                                              }catch(t){
                                                console.log(t)
                                              }
                                            }
                                          })
                                        }function g(t){
                                          try{
                                            $("#categorias-hide").length&&(ga("set","contentGroup4",$("#categorias-hide").val()),ga("set","dimension5",$("#categorias-hide").val())),$("#subcategorias-hide").length&&(ga("set","contentGroup5",$("#subcategorias-hide").val()),ga("set","dimension6",$("#subcategorias-hide").val())),ga("set","dimension14",e()),ga("send","event","Timer",t,window.location.pathname,{nonInteraction:!0}),ga("set","contentGroup4",null),ga("set","dimension5",null),ga("set","contentGroup5",null),ga("set","dimension6",null),ga("set","dimension14",null)
                                          }catch(t){
                                            console.log(t)
                                          }
                                        }$(".intro-arrow").find("a").click(function(t){
                                          return t.preventDefault(),$("html, body").animate({scrollTop:window.innerHeight},600),!1
                                        });
                                        var v=["Domingo ","Lunes ","Martes ","Mi\xe9rcoles ","Jueves ","Viernes ","S\xe1bado "],y=["enero de ","febrero de ","marzo de ","abril de ","mayo de ","junio de ","julio de ","agosto de ","septiembre de ","octubre de ","noviembre de ","diciembre de "];
                                        if($("#form-clima")
                                        .submit(function(t){
                                          $(".inputs-clima").addClass("hidden"),$(".show-inputs-clima").removeClass("hidden"),f(),t.preventDefault()
                                        }),$("#form-aire")
                                        .submit(function(t){
                                          $(".inputs-aire").addClass("hidden"),$(".show-inputs-aire").removeClass("hidden"),h(),t.preventDefault()
                                        }),$(".show-inputs-aire")
                                        .click(function(){
                                          $(".inputs-aire").removeClass("hidden"),$(this).addClass("hidden")
                                        }),$(".show-inputs-clima")
                                        .click(function(){
                                          $(".inputs-clima").removeClass("hidden"),$(this).addClass("hidden")
                                        }),rails_env_prod)try{ga("set","contentGroup1",e()),ga("set","contentGroup2","gob.mx"),ga("set","contentGroup3",n()),$("#categorias-hide").length&&(ga("set","contentGroup4",$("#categorias-hide").val()),ga("set","dimension5",$("#categorias-hide").val())),$("#subcategorias-hide").length&&(ga("set","contentGroup5",$("#subcategorias-hide").val()),ga("set","dimension6",$("#subcategorias-hide").val())),$(".tramite-title").length&&ga("set","dimension7",$(".tramite-title").text()),ga("set","dimension14",e()),ga("set","dimension15",""),ga("set","dimension16",n()),ga("set","dimension13","No Registrado"),ga("send","pageview"),ga("set","contentGroup1",null),ga("set","contentGroup2",null),ga("set","contentGroup3",null),ga("set","contentGroup4",null),ga("set","contentGroup5",null),ga("set","dimension5",null),ga("set","dimension6",null),ga("set","dimension14",null),ga("set","dimension15",null),ga("set","dimension16",null),ga("set","dimension13",null)}catch(t){console.log(t)}$("#goSearch").on("blur",function(){this.style.background="#393c3e"}),$(".sectorizadas").click(function(t){t.preventDefault(),$(this).find(".fa").hasClass("fa-chevron-down")?($(this).find(".fa").removeClass("fa-chevron-down").addClass("fa-chevron-up"),$(this).closest("li").find(".list-sectorizadas").removeClass("hidden")):($(this).find(".fa").removeClass("fa-chevron-up").addClass("fa-chevron-down"),$(this).closest("li").find(".list-sectorizadas").addClass("hidden"))});
                                        var b=$("#switch");
                                        if(b.on("click",function(){$
                                          ("#main").toggleClass("main--dia-del-planeta--off")
                                        }),$(".document_group_anchor").click(function(t){
                                          $(".document_group_li").removeClass("active");
                                          var e=$(this);
                                          e.hasClass("active")||(e.addClass("active"),t.preventDefault())
                                        }),$(".sendEstRightColumn").click(function(){
                                          if(rails_env_prod)try{
                                            ga("set","dimension5",$("#categorias-hide").val()),ga("set","dimension6",$("#subcategorias-hide").val()),ga("set","dimension7",$(".tramite-title").text()),ga("send","event","CTA Tr\xe1mite",$(this).attr("data-a").split(".")[1].trim(),window.location.pathname),ga("set","dimension5",null),ga("set","dimension6",null),ga("set","dimension7",null)
                                          }catch(t){
                                            console.log(t)
                                          }
                                          var t=$(this).attr("href"),e=/^((http|https|ftp):\/\/www.gob.mx)/;
                                          if(void 0!==t&&""!==t.trim()&&"https://sidec.funcionpublica.gob.mx/"!==t.trim()&&!e.test(t)){
                                            if(confirm("Est\xe1s saliendo del sitio www.gob.mx")){
                                              $(this).attr("data-a").replace(/\xf1/g,"n").replace(/\xe1/g,"a").replace(/\xe9/g,"e").replace(/\xed/g,"i").replace(/\xf3/g,"o").replace(/\xfa/g,"u");
                                              return!0
                                            }
                                            return!1
                                          }
                                          $(this).text().replace(/\s/g,"_").replace(/\xf1/g,"n").replace(/\xe1/g,"a").replace(/\xe9/g,"e").replace(/\xed/g,"i").replace(/\xf3/g,"o").replace(/\xfa/g,"u")
                                        }),$(".sendEstFooter").click(function(){
                                          if(rails_env_prod)try{
                                            ga("set","dimension14",e()),ga("set","dimension15",""),ga("set","dimension16",n()),ga("send","event","Outbound link - Footer",$(this).text().trim(),window.location.pathname),ga("set","dimension14",null),ga("set","dimension15",null),ga("set","dimension16",null)
                                          }catch(t){
                                            console.log(t)
                                          }
                                          return t(this,$(this).text().trim())
                                        }),
                                        $(".sendEstFooterRs").click(function(){
                                          if(rails_env_prod)try{
                                            ga("set","dimension14",e()),ga("set","dimension15",""),ga("set","dimension16",n()),ga("send","event","Outbound link - Footer",$(".sendEstFooterRs").attr("red"),window.location.pathname),ga("set","dimension14",null),ga("set","dimension15",null),ga("set","dimension16",null)
                                          }catch(t){
                                            console.log(t)
                                          }return t(this,$(".sendEstFooterRs").attr("red"))
                                        }),
                                        $(".sendEstGobierno").click(function(){
                                          var t=$(this).attr("href"),e=/^((http|https|ftp):\/\/www.gob.mx)/;
                                          if(void 0!==t&&""!==t.trim()&&!e.test(t))return confirm("Est\xe1s saliendo del sitio www.gob.mx");
                                          $(this).text().replace(/\s/g,"_").replace(/\xf1/g,"n").replace(/\xe1/g,"a").replace(/\xe9/g,"e").replace(/\xed/g,"i").replace(/\xf3/g,"o").replace(/\xfa/g,"u")
                                        }),
                                        $(".sendEstQuejas").click(function(){
                                          var t=$(this).text().replace(/\s/g,"_").replace(/\xf1/g,"n").replace(/\xe1/g,"a").replace(/\xe9/g,"e").replace(/\xed/g,"i").replace(/\xf3/g,"o").replace(/\xfa/g,"u");
                                          uid_call(t,"clickout")
                                        }),
                                        $(".registerMail").click(function(t){
                                          t.preventDefault();
                                          var r=$("#email").val();
                                          try{
                                            var i="";
                                            if($.ajax({
                                              url:"/subscribe",
                                              type:"post",
                                              dataType:"json",
                                              data:{email:{address:r}},
                                              success:function(t){
                                                $("#responseEmail").html(t.message),i="Exitoso"
                                              },
                                              error:function(t){
                                                $("#responseEmail").html(t.message),i="Error"
                                              }
                                            }),rails_env_prod)try{
                                              ga("set","dimension14",e()),ga("set","dimension15",""),ga("set","dimension16",n()),ga("send","event","Newsletter",i,window.location.pathname),ga("set","dimension14",null),ga("set","dimension15",null),ga("set","dimension16",null)
                                            }catch(t){
                                              console.log(t)
                                            }
                                          }catch(t){
                                            $("#responseEmail").innerText(t)
                                          }
                                        }),
                                        $(".get-posts").click(function(t){
                                          t.preventDefault();
                                          var e=$(".actualidad").find(".row").length+1;
                                          if(rails_env_prod)try{
                                            ga("send","event","Bot\xf3n Actualidad","click",$(".actualidad").find(".row").length<3?"Ver m\xe1s #"+$(".actualidad").find(".row").length:"Ir a actualidad")
                                          }catch(t){
                                            console.log(t)
                                          }
                                          e<=3?i(e,$(this).attr("href")):window.location=$(this).attr("href")
                                        }),
                                        $("form input:radio").focus(function(){
                                          o($(this))
                                        }),
                                        $("form input:radio").blur(function(){
                                          a($(this))
                                        }),
                                        rails_env_prod&&s(),rails_env_prod&&l(),rails_env_prod&&u(),rails_env_prod&&c(),rails_env_prod&&d(),rails_env_prod&&p(),$(".sendEst").click(function(){
                                          var t=$(this).attr("href"),e=/^((http|https|ftp):\/\/www.gob.mx)/;
                                          if(void 0!==t&&""!==t.trim()&&"https://sidec.funcionpublica.gob.mx/"!==t.trim()&&!e.test(t)){
                                            if(confirm("Est\xe1s saliendo del sitio www.gob.mx")){
                                              var n=$(this).attr("data-a").replace(/\xf1/g,"n").replace(/\xe1/g,"a").replace(/\xe9/g,"e").replace(/\xed/g,"i").replace(/\xf3/g,"o").replace(/\xfa/g,"u");
                                              return uid_call(n,$(this).attr("data-b")),!0
                                            }
                                            return!1
                                          }
                                          var n=$(this).text().replace(/\s/g,"_").replace(/\xf1/g,"n").replace(/\xe1/g,"a").replace(/\xe9/g,"e").replace(/\xed/g,"i").replace(/\xf3/g,"o").replace(/\xfa/g,"u");
                                          uid_call(n,"clickout")
                                        }),
                                        $("#stateSelectClima").length>0&&($.getJSON("https://framework-gb.cdn.gob.mx/data/ciudades-estado.json",function(t){
                                          t.length>0&&(jQuery.each(t,function(){
                                            var t=$("<option/>").val(this.state).text(this.state);$("#stateSelectClima").append(t),"Ciudad de Mexico"===this.state&&($("#stateSelectClima").val(this.state),jQuery.each(this.cities.sort(),function(){
                                              var t=$("<option/>").val(this).text(this);
                                              $("#citySelectClima").append(t)
                                            }),
                                            $("#citySelectClima").val("Cuauht\xe9moc"))
                                          }),
                                          f(),$("#stateSelectClima").change(function(){
                                            var e=$(this).val(),n=t.filter(function(t){
                                              return t.state===e
                                            });
                                            n.length>0&&($("#citySelectClima").html(""),$.each(n[0].cities.sort(),function(){
                                              var t=$("<option/>").val(this).text(this);
                                              $("#citySelectClima").append(t)
                                            }))
                                          }))
                                        }),
                                        $.getJSON("https://framework-gb.cdn.gob.mx/data/ciudades-estados-sinaica.json",function(t){
                                          t.length>0&&(jQuery.each(t,function(){
                                            var t=$("<option/>").val(this.state).text(this.state);$("#stateSelectCalidadAire").append(t),"Ciudad de M\xe9xico"===this.state&&($("#stateSelectCalidadAire").val(this.state),jQuery.each(this.cities.sort(),function(){
                                              var t=$("<option/>").val(this).text(this);
                                              $("#citySelectCalidadAire").append(t)
                                            }),$("#citySelectCalidadAire").val("Valle de M\xe9xico"))
                                          }),
                                          h(),$("#stateSelectCalidadAire").change(function(){
                                            var e=$(this).val(),n=t.filter(function(t){
                                              return t.state===e
                                            });
                                            n.length>0&&($("#citySelectCalidadAire").html(""),$.each(n[0].cities.sort(),function(){
                                              var t=$("<option/>").val(this).text(this);
                                              $("#citySelectCalidadAire").append(t)
                                            }))
                                          }))
                                        })),
                                        rails_env_prod){
                                          m();
                                          var x=0,w=[30,60,120,180];
                                          !function t(){
                                            x<4&&setTimeout(function(){
                                              g(w[x-1]),t()
                                            },3e4),x++
                                          }()
                                        }
                                      }),$(function(){
                                        if($(".print a").click(function(t){
                                          t.preventDefault(),window.print()
                                        }),
                                        $(".font-changer").length){
                                          var t=$(".ficha"),e=$(".font-changer"),n=(t.find("p").css("font-size"),0),r=$(window).width(),i=t.find(".container").width();
                                          $(".inc-font").focus(function(){
                                            $(this).css("background-color","#3c3c3c"),$(this).css("color","white")
                                          }),
                                          $(".inc-font").blur(function(){
                                            $(this).css("background-color","white"),$(this).css("color","black")
                                          }),
                                          $(".inc-font").mouseover(function(){
                                            $(this).css("background-color","#3c3c3c"),$(this).css("color","white")
                                          }),$(".inc-font").mouseleave(function(){
                                            $(this).css("background-color","white"),$(this).css("color","black")
                                          }),
                                          $(".inc-font").on("click",function(e){
                                            var r;
                                            if(e.preventDefault(),r=$(this),n=parseInt(t.find("p").css("font-size"))+1,n<=20)return t.find(".field, button, span, p, li, dl, dt, a, h2, h3, h4, h5, td, .form-control").each(function(){return $(this).css("font-size",parseInt($(this).css("font-size"))+1)})
                                          }),
                                          $(".dec-font").focus(function(){
                                            $(this).css("background-color","#3c3c3c"),$(this).css("color","white")
                                          }),
                                          $(".dec-font").blur(function(){
                                            $(this).css("background-color","white"),$(this).css("color","black")
                                          }),
                                          $(".dec-font").mouseover(function(){
                                            $(this).css("background-color","#3c3c3c"),$(this).css("color","white")
                                          }),
                                          $(".dec-font").mouseleave(function(){
                                            $(this).css("background-color","white"),$(this).css("color","black")
                                          }),
                                          $(".dec-font").on("click",function(e){
                                            var r;
                                            if(e.preventDefault(),r=$(this),n=parseInt(t.find("p").css("font-size"))-1,n>=11)return t.find(".field, button, span, p, li, dl, dt, a, h2, h3, h4, h5, td, .form-control").each(function(){return $(this).css("font-size",parseInt($(this).css("font-size"))-1)})
                                          }),
                                          e.stop().css({left:r/2-i/2-(e.width()+20)}),$(window).on("resize",function(){
                                            return r=$(window).width(),i=t.find(".container").width(),e.stop().animate({left:r/2-i/2-(e.width()+20)})
                                          })
                                        }
                                      }),
                                      $(document).ready(function(){
                                        function t(){
                                          i--,i==-1&&(i=n-1),$(".num li").eq(i).addClass("active").siblings().removeClass("active"),$(".img>li").eq(i).fadeIn(300).siblings().fadeOut(300)
                                        }
                                        function e(){
                                          i++,i==n&&(i=0),$(".num li").eq(i).addClass("active").siblings().removeClass("active"),$(".img>li").eq(i).fadeIn(300).siblings().fadeOut(300)
                                        }
                                        for(var n=$(".img>li").size(),r=1;r<=n;r++)$(".num").append("<li>"+r+"</li>");
                                        $(".num li").first().addClass("active"),$(".img>li").first().show(),$(".num li").mouseover(function(){
                                          var t=$(this).index();
                                          i=t,$(".num li").eq(t).addClass("active").siblings().removeClass("active"),$(".img>li").eq(t).stop().fadeIn(300).siblings().stop().fadeOut(300)
                                        });
                                        var i=0,o=setInterval(e,7e3);
                                        $(".banner").hover(function(){
                                          clearInterval(o)
                                        },
                                        function(){
                                          o=setInterval(e,1500)
                                        }),
                                        $(".left").click(function(){
                                          t()
                                        }),
                                        $(".right").click(function(){
                                          e()
                                        })
                                      }),
                                      MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m",MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_="png",MarkerClusterer.prototype.extend=function(t,e){
                                        return function(t){
                                          for(var e in t.prototype)this.prototype[e]=t.prototype[e];
                                          return this
                                        }.apply(t,[e])
                                      },
                                      MarkerClusterer.prototype.onAdd=function(){
                                        this.setReady_(!0)
                                      },
                                      MarkerClusterer.prototype.draw=function(){},MarkerClusterer.prototype.setupStyles_=function(){
                                        if(!this.styles_.length)for(var t,e=0;t=this.sizes[e];e++)this.styles_.push({url:this.imagePath_+(e+1)+"."+this.imageExtension_,height:t,width:t})
                                      },
                                      MarkerClusterer.prototype.fitMapToMarkers=function(){
                                        for(var t,e=this.getMarkers(),n=new google.maps.LatLngBounds,r=0;t=e[r];r++)n.extend(t.getPosition());
                                        this.map_.fitBounds(n)
                                      },
                                      MarkerClusterer.prototype.setStyles=function(t){
                                        this.styles_=t
                                      },
                                      MarkerClusterer.prototype.getStyles=function(){
                                        return this.styles_
                                      },
                                      MarkerClusterer.prototype.isZoomOnClick=function(){
                                        return this.zoomOnClick_
                                      },
                                      MarkerClusterer.prototype.isAverageCenter=function(){
                                        return this.averageCenter_
                                      },
                                      MarkerClusterer.prototype.getMarkers=function(){
                                        return this.markers_
                                      },
                                      MarkerClusterer.prototype.getTotalMarkers=function(){
                                        return this.markers_.length
                                      },
                                      MarkerClusterer.prototype.setMaxZoom=function(t){
                                        this.maxZoom_=t
                                      },
                                      MarkerClusterer.prototype.getMaxZoom=function(){
                                        return this.maxZoom_
                                      },
                                      MarkerClusterer.prototype.calculator_=function(t,e){
                                        for(var n=0,r=t.length,i=r;0!==i;)i=parseInt(i/10,10),n++;
                                        return n=Math.min(n,e),{text:r,index:n}
                                      },
                                      MarkerClusterer.prototype.setCalculator=function(t){
                                        this.calculator_=t
                                      },
                                      MarkerClusterer.prototype.getCalculator=function(){
                                        return this.calculator_
                                      },
                                      MarkerClusterer.prototype.addMarkers=function(t,e){
                                        for(var n,r=0;n=t[r];r++)this.pushMarkerTo_(n);
                                        e||this.redraw()
                                      },
                                      MarkerClusterer.prototype.pushMarkerTo_=function(t){
                                        if(t.isAdded=!1,t.draggable){
                                          var e=this;google.maps.event.addListener(t,"dragend",function(){t.isAdded=!1,e.repaint()})
                                        }
                                        this.markers_.push(t)
                                      },
                                      MarkerClusterer.prototype.addMarker=function(t,e){
                                        this.pushMarkerTo_(t),e||this.redraw()
                                      },
                                      MarkerClusterer.prototype.removeMarker_=function(t){
                                        var e=-1;
                                        if(this.markers_.indexOf)e=this.markers_.indexOf(t);
                                        else for(var n,r=0;n=this.markers_[r];r++)if(n==t){e=r;break}return e!=-1&&(t.setMap(null),this.markers_.splice(e,1),!0)
                                      },
                                      MarkerClusterer.prototype.removeMarker=function(t,e){
                                        var n=this.removeMarker_(t);
                                        return!(e||!n)&&(this.resetViewport(),this.redraw(),!0)
                                      },
                                      MarkerClusterer.prototype.removeMarkers=function(t,e){
                                        for(var n,r=!1,i=0;n=t[i];i++){
                                          var o=this.removeMarker_(n);
                                          r=r||o
                                        }
                                        if(!e&&r)return this.resetViewport(),this.redraw(),!0
                                      },
                                      MarkerClusterer.prototype.setReady_=function(t){
                                        this.ready_||(this.ready_=t,this.createClusters_())
                                      },
                                      MarkerClusterer.prototype.getTotalClusters=function(){
                                        return this.clusters_.length
                                      },MarkerClusterer.prototype.getMap=function(){
                                        return this.map_
                                      },
                                      MarkerClusterer.prototype.setMap=function(t){
                                        this.map_=t
                                      },
                                      MarkerClusterer.prototype.getGridSize=function(){
                                        return this.gridSize_
                                      },
                                      MarkerClusterer.prototype.setGridSize=function(t){
                                        this.gridSize_=t
                                      },
                                      MarkerClusterer.prototype.getMinClusterSize=function(){
                                        return this.minClusterSize_
                                      },
                                      MarkerClusterer.prototype.setMinClusterSize=function(t){
                                        this.minClusterSize_=t
                                      },
                                      MarkerClusterer.prototype.getExtendedBounds=function(t){
                                        var e=this.getProjection(),n=new google.maps.LatLng(t.getNorthEast().lat(),t.getNorthEast().lng()),r=new google.maps.LatLng(t.getSouthWest().lat(),t.getSouthWest().lng()),i=e.fromLatLngToDivPixel(n);
                                        i.x+=this.gridSize_,i.y-=this.gridSize_;
                                        var o=e.fromLatLngToDivPixel(r);
                                        o.x-=this.gridSize_,o.y+=this.gridSize_;
                                        var a=e.fromDivPixelToLatLng(i),s=e.fromDivPixelToLatLng(o);
                                        return t.extend(a),t.extend(s),t
                                      },
                                      MarkerClusterer.prototype.isMarkerInBounds_=function(t,e){
                                        return e.contains(t.getPosition())
                                      },
                                      MarkerClusterer.prototype.clearMarkers=function(){
                                        this.resetViewport(!0),this.markers_=[]
                                      },
                                      MarkerClusterer.prototype.resetViewport=function(t){
                                        for(var e,n=0;e=this.clusters_[n];n++)e.remove();
                                        for(var r,n=0;r=this.markers_[n];n++)r.isAdded=!1,t&&r.setMap(null);
                                        this.clusters_=[]
                                      },
                                      MarkerClusterer.prototype.repaint=function(){
                                        var t=this.clusters_.slice();
                                        this.clusters_.length=0,this.resetViewport(),this.redraw(),window.setTimeout(function(){
                                          for(var e,n=0;e=t[n];n++)e.remove()
                                        },0)
                                      },
                                      MarkerClusterer.prototype.redraw=function(){
                                        this.createClusters_()
                                      },
                                      MarkerClusterer.prototype.distanceBetweenPoints_=function(t,e){
                                        if(!t||!e)return 0;
                                        var n=6371,r=(e.lat()-t.lat())*Math.PI/180,i=(e.lng()-t.lng())*Math.PI/180,o=Math.sin(r/2)*Math.sin(r/2)+Math.cos(t.lat()*Math.PI/180)*Math.cos(e.lat()*Math.PI/180)*Math.sin(i/2)*Math.sin(i/2),a=2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)),s=n*a;
                                        return s
                                      },
                                      MarkerClusterer.prototype.addToClosestCluster_=function(t){
                                        for(var e,n=4e4,r=null,i=(t.getPosition(),0);e=this.clusters_[i];i++){
                                          var o=e.getCenter();
                                          if(o){
                                            var a=this.distanceBetweenPoints_(o,t.getPosition());
                                            a<n&&(n=a,r=e)
                                          }
                                        }
                                        if(r&&r.isMarkerInClusterBounds(t))r.addMarker(t);
                                        else{
                                          var e=new Cluster(this);
                                          e.addMarker(t),this.clusters_.push(e)
                                        }
                                      },
                                      MarkerClusterer.prototype.createClusters_=function(){
                                        if(this.ready_)for(var t,e=new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),this.map_.getBounds().getNorthEast()),n=this.getExtendedBounds(e),r=0;t=this.markers_[r];r++)!t.isAdded&&this.isMarkerInBounds_(t,n)&&this.addToClosestCluster_(t)
                                      },
                                      Cluster.prototype.isMarkerAlreadyAdded=function(t){
                                        if(this.markers_.indexOf)return this.markers_.indexOf(t)!=-1;
                                        for(var e,n=0;e=this.markers_[n];n++)if(e==t)return!0;return!1
                                      },
                                      Cluster.prototype.addMarker=function(t){
                                        if(this.isMarkerAlreadyAdded(t))return!1;
                                        if(this.center_){
                                          if(this.averageCenter_){
                                            var e=this.markers_.length+1,n=(this.center_.lat()*(e-1)+t.getPosition().lat())/e,r=(this.center_.lng()*(e-1)+t.getPosition().lng())/e;
                                            this.center_=new google.maps.LatLng(n,r),this.calculateBounds_()
                                          }
                                        }else this.center_=t.getPosition(),this.calculateBounds_();t.isAdded=!0,this.markers_.push(t);
                                        var i=this.markers_.length;
                                        if(i<this.minClusterSize_&&t.getMap()!=this.map_&&t.setMap(this.map_),i==this.minClusterSize_)for(var o=0;o<i;o++)this.markers_[o].setMap(null);
                                        return i>=this.minClusterSize_&&t.setMap(null),this.updateIcon(),!0
                                      },
                                      Cluster.prototype.getMarkerClusterer=function(){
                                        return this.markerClusterer_
                                      },
                                      Cluster.prototype.getBounds=function(){
                                        for(var t,e=new google.maps.LatLngBounds(this.center_,this.center_),n=this.getMarkers(),r=0;t=n[r];r++)e.extend(t.getPosition());
                                        return e
                                      },
                                      Cluster.prototype.remove=function(){
                                        this.clusterIcon_.remove(),this.markers_.length=0,delete this.markers_
                                      },
                                      Cluster.prototype.getSize=function(){
                                        return this.markers_.length
                                      },
                                      Cluster.prototype.getMarkers=function(){
                                        return this.markers_
                                      },
                                      Cluster.prototype.getCenter=function(){
                                        return this.center_
                                      },
                                      Cluster.prototype.calculateBounds_=function(){
                                        var t=new google.maps.LatLngBounds(this.center_,this.center_);
                                        this.bounds_=this.markerClusterer_.getExtendedBounds(t)
                                      },
                                      Cluster.prototype.isMarkerInClusterBounds=function(t){
                                        return this.bounds_.contains(t.getPosition())
                                      },
                                      Cluster.prototype.getMap=function(){
                                        return this.map_
                                      },
                                      Cluster.prototype.updateIcon=function(){
                                        var t=this.map_.getZoom(),e=this.markerClusterer_.getMaxZoom();
                                        if(e&&t>e)for(var n,r=0;n=this.markers_[r];r++)n.setMap(this.map_);
                                        else{
                                          if(this.markers_.length<this.minClusterSize_)return void this.clusterIcon_.hide();
                                          var i=this.markerClusterer_.getStyles().length,o=this.markerClusterer_.getCalculator()(this.markers_,i);
                                          this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.setSums(o),this.clusterIcon_.show()
                                        }
                                      },
                                      ClusterIcon.prototype.triggerClusterClick=function(){
                                        var t=this.cluster_.getMarkerClusterer();
                                        google.maps.event.trigger(t,"clusterclick",this.cluster_),t.isZoomOnClick()&&this.map_.fitBounds(this.cluster_.getBounds())
                                      },
                                      ClusterIcon.prototype.onAdd=function(){
                                        if(this.div_=document.createElement("DIV"),this.visible_){
                                          var t=this.getPosFromLatLng_(this.center_);
                                          this.div_.style.cssText=this.createCss(t),this.div_.innerHTML=this.sums_.text
                                        }
                                        var e=this.getPanes();
                                        e.overlayMouseTarget.appendChild(this.div_);
                                        var n=this;google.maps.event.addDomListener(this.div_,"click",function(){
                                          n.triggerClusterClick()
                                        })
                                      },
                                      ClusterIcon.prototype.getPosFromLatLng_=function(t){
                                        var e=this.getProjection().fromLatLngToDivPixel(t);
                                        return e.x-=parseInt(this.width_/2,10),e.y-=parseInt(this.height_/2,10),e
                                      },
                                      ClusterIcon.prototype.draw=function(){
                                        if(this.visible_){
                                          var t=this.getPosFromLatLng_(this.center_);
                                          this.div_.style.top=t.y+"px",this.div_.style.left=t.x+"px"
                                        }
                                      },
                                      ClusterIcon.prototype.hide=function(){
                                        this.div_&&(this.div_.style.display="none"),this.visible_=!1
                                      },
                                      ClusterIcon.prototype.show=function(){
                                        if(this.div_){
                                          var t=this.getPosFromLatLng_(this.center_);
                                          this.div_.style.cssText=this.createCss(t),this.div_.style.display=""
                                        }
                                        this.visible_=!0
                                      },
                                      ClusterIcon.prototype.remove=function(){
                                        this.setMap(null)
                                      },
                                      ClusterIcon.prototype.onRemove=function(){
                                        this.div_&&this.div_.parentNode&&(this.hide(),this.div_.parentNode.removeChild(this.div_),this.div_=null)
                                      },
                                      ClusterIcon.prototype.setSums=function(t){
                                        this.sums_=t,this.text_=t.text,this.index_=t.index,this.div_&&(this.div_.innerHTML=t.text),this.useStyle()
                                      },
                                      ClusterIcon.prototype.useStyle=function(){
                                        var t=Math.max(0,this.sums_.index-1);
                                        t=Math.min(this.styles_.length-1,t);
                                        var e=this.styles_[t];
                                        this.url_=e.url,this.height_=e.height,this.width_=e.width,this.textColor_=e.textColor,this.anchor_=e.anchor,this.textSize_=e.textSize,this.backgroundPosition_=e.backgroundPosition
                                      },
                                      ClusterIcon.prototype.setCenter=function(t){
                                        this.center_=t
                                      },
                                      ClusterIcon.prototype.createCss=function(t){
                                        var e=[];
                                        e.push("background-image:url("+this.url_+");");
                                        var n=this.backgroundPosition_?this.backgroundPosition_:"0 0";
                                        e.push("background-position:"+n+";"),"object"==typeof this.anchor_?("number"==typeof this.anchor_[0]&&this.anchor_[0]>0&&this.anchor_[0]<this.height_?e.push("height:"+(this.height_-this.anchor_[0])+"px; padding-top:"+this.anchor_[0]+"px;"):e.push("height:"+this.height_+"px; line-height:"+this.height_+"px;"),"number"==typeof this.anchor_[1]&&this.anchor_[1]>0&&this.anchor_[1]<this.width_?e.push("width:"+(this.width_-this.anchor_[1])+"px; padding-left:"+this.anchor_[1]+"px;"):e.push("width:"+this.width_+"px; text-align:center;")):e.push("height:"+this.height_+"px; line-height:"+this.height_+"px; width:"+this.width_+"px; text-align:center;");
                                        var r=this.textColor_?this.textColor_:"black",i=this.textSize_?this.textSize_:11;
                                        return e.push("cursor:pointer; top:"+t.y+"px; left:"+t.x+"px; color:"+r+"; position:absolute; font-size:"+i+"px; font-family:Arial,sans-serif; font-weight:bold"),e.join("")
                                      },
                                      window.MarkerClusterer=MarkerClusterer,
                                      MarkerClusterer.prototype.addMarker=MarkerClusterer.prototype.addMarker,
                                      MarkerClusterer.prototype.addMarkers=MarkerClusterer.prototype.addMarkers,
                                      MarkerClusterer.prototype.clearMarkers=MarkerClusterer.prototype.clearMarkers,
                                      MarkerClusterer.prototype.fitMapToMarkers=MarkerClusterer.prototype.fitMapToMarkers,
                                      MarkerClusterer.prototype.getCalculator=MarkerClusterer.prototype.getCalculator,
                                      MarkerClusterer.prototype.getGridSize=MarkerClusterer.prototype.getGridSize,
                                      MarkerClusterer.prototype.getExtendedBounds=MarkerClusterer.prototype.getExtendedBounds,
                                      MarkerClusterer.prototype.getMap=MarkerClusterer.prototype.getMap,MarkerClusterer.prototype.getMarkers=MarkerClusterer.prototype.getMarkers,
                                      MarkerClusterer.prototype.getMaxZoom=MarkerClusterer.prototype.getMaxZoom,
                                      MarkerClusterer.prototype.getStyles=MarkerClusterer.prototype.getStyles,
                                      MarkerClusterer.prototype.getTotalClusters=MarkerClusterer.prototype.getTotalClusters,
                                      MarkerClusterer.prototype.getTotalMarkers=MarkerClusterer.prototype.getTotalMarkers,
                                      MarkerClusterer.prototype.redraw=MarkerClusterer.prototype.redraw,
                                      MarkerClusterer.prototype.removeMarker=MarkerClusterer.prototype.removeMarker,
                                      MarkerClusterer.prototype.removeMarkers=MarkerClusterer.prototype.removeMarkers,
                                      MarkerClusterer.prototype.resetViewport=MarkerClusterer.prototype.resetViewport,
                                      MarkerClusterer.prototype.repaint=MarkerClusterer.prototype.repaint,
                                      MarkerClusterer.prototype.setCalculator=MarkerClusterer.prototype.setCalculator,
                                      MarkerClusterer.prototype.setGridSize=MarkerClusterer.prototype.setGridSize,
                                      MarkerClusterer.prototype.setMaxZoom=MarkerClusterer.prototype.setMaxZoom,
                                      MarkerClusterer.prototype.onAdd=MarkerClusterer.prototype.onAdd,
                                      MarkerClusterer.prototype.draw=MarkerClusterer.prototype.draw,
                                      Cluster.prototype.getCenter=Cluster.prototype.getCenter,
                                      Cluster.prototype.getSize=Cluster.prototype.getSize,
                                      Cluster.prototype.getMarkers=Cluster.prototype.getMarkers,
                                      ClusterIcon.prototype.onAdd=ClusterIcon.prototype.onAdd,
                                      ClusterIcon.prototype.draw=ClusterIcon.prototype.draw,
                                      ClusterIcon.prototype.onRemove=ClusterIcon.prototype.onRemove,!function(t){
                                        var e=!0;
                                        t.flexslider=function(n,r){
                                          var i=t(n);
                                          i.vars=t.extend({},t.flexslider.defaults,r);
                                          var o,a=i.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,l=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&i.vars.touch,u="click touchend MSPointerUp keyup",c="",d="vertical"===i.vars.direction,p=i.vars.reverse,f=i.vars.itemWidth>0,h="fade"===i.vars.animation,m=""!==i.vars.asNavFor,g={};
                                          t.data(n,"flexslider",i),g={
                                            init:function(){
                                              i.animating=!1,
                                              i.currentSlide=parseInt(i.vars.startAt?i.vars.startAt:0,10),
                                              isNaN(i.currentSlide)&&(i.currentSlide=0),
                                              i.animatingTo=i.currentSlide,
                                              i.atEnd=0===i.currentSlide||i.currentSlide===i.last,
                                              i.containerSelector=i.vars.selector.substr(0,i.vars.selector.search(" ")),
                                              i.slides=t(i.vars.selector,i),
                                              i.container=t(i.containerSelector,i),
                                              i.count=i.slides.length,
                                              i.syncExists=t(i.vars.sync).length>0,"slide"===i.vars.animation&&(i.vars.animation="swing"),
                                              i.prop=d?"top":"marginLeft",
                                              i.args={},
                                              i.manualPause=!1,
                                              i.stopped=!1,
                                              i.started=!1,
                                              i.startTimeout=null,
                                              i.transitions=!i.vars.video&&!h&&i.vars.useCSS&&function(){
                                                var t=document.createElement("div"),e=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];
                                                for(var n in e)if(void 0!==t.style[e[n]])return i.pfx=e[n].replace("Perspective","").toLowerCase(),i.prop="-"+i.pfx+"-transform",!0;
                                                return!1
                                              }(),
                                              i.ensureAnimationEnd="",
                                              ""!==i.vars.controlsContainer&&(i.controlsContainer=t(i.vars.controlsContainer).length>0&&t(i.vars.controlsContainer)),
                                              ""!==i.vars.manualControls&&(i.manualControls=t(i.vars.manualControls).length>0&&t(i.vars.manualControls)),
                                              ""!==i.vars.customDirectionNav&&(i.customDirectionNav=2===t(i.vars.customDirectionNav).length&&t(i.vars.customDirectionNav)),
                                              i.vars.randomize&&(i.slides.sort(function(){
                                                return Math.round(Math.random())-.5
                                              }),
                                              i.container.empty().append(i.slides)),
                                              i.doMath(),
                                              i.setup("init"),
                                              i.vars.controlNav&&g.controlNav.setup(),
                                              i.vars.directionNav&&g.directionNav.setup(),
                                              i.vars.keyboard&&(1===t(i.containerSelector).length||i.vars.multipleKeyboard)&&t(document).bind("keyup",function(t){
                                                var e=t.keyCode;
                                                if(!i.animating&&(39===e||37===e)){
                                                  var n=39===e?i.getTarget("next"):37===e&&i.getTarget("prev");
                                                  i.flexAnimate(n,i.vars.pauseOnAction)
                                                }
                                              }),
                                              i.vars.mousewheel&&i.bind("mousewheel",function(t,e){
                                                t.preventDefault();
                                                var n=0>e?i.getTarget("next"):i.getTarget("prev");
                                                i.flexAnimate(n,i.vars.pauseOnAction)
                                              }),
                                              i.vars.pausePlay&&g.pausePlay.setup(),
                                              i.vars.slideshow&&i.vars.pauseInvisible&&g.pauseInvisible.init(),
                                              i.vars.slideshow&&(i.vars.pauseOnHover&&i.hover(function(){
                                                i.manualPlay||i.manualPause||i.pause()
                                              },
                                              function(){
                                                i.manualPause||i.manualPlay||i.stopped||i.play()
                                              }),
                                              i.vars.pauseInvisible&&g.pauseInvisible.isHidden()||(i.vars.initDelay>0?i.startTimeout=setTimeout(i.play,i.vars.initDelay):i.play())),
                                              m&&g.asNav.setup(),
                                              l&&i.vars.touch&&g.touch(),
                                              (!h||h&&i.vars.smoothHeight)&&t(window).bind("resize orientationchange focus",g.resize),
                                              i.find("img").attr("draggable","false"),
                                              setTimeout(function(){i.vars.start(i)},200)
                                            },
                                            asNav:{
                                              setup:function(){
                                                i.asNav=!0,
                                                i.animatingTo=Math.floor(i.currentSlide/i.move),
                                                i.currentItem=i.currentSlide,
                                                i.slides.removeClass(a+"active-slide").eq(i.currentItem).addClass(a+"active-slide"),
                                                s?(n._slider=i,i.slides.each(function(){
                                                  var e=this;
                                                  e._gesture=new MSGesture,
                                                  e._gesture.target=e,e.addEventListener("MSPointerDown",function(t){
                                                    t.preventDefault(),t.currentTarget._gesture&&t.currentTarget._gesture.addPointer(t.pointerId)
                                                  },!1),
                                                  e.addEventListener("MSGestureTap",function(e){
                                                    e.preventDefault();
                                                    var n=t(this),r=n.index();
                                                    t(i.vars.asNavFor).data("flexslider").animating||n.hasClass("active")||(i.direction=i.currentItem<r?"next":"prev",i.flexAnimate(r,i.vars.pauseOnAction,!1,!0,!0))
                                                  })
                                                })):i.slides.on(u,function(e){
                                                  e.preventDefault();
                                                  var n=t(this),r=n.index(),o=n.offset().left-t(i).scrollLeft();
                                                  0>=o&&n.hasClass(a+"active-slide")?i.flexAnimate(i.getTarget("prev"),!0):t(i.vars.asNavFor).data("flexslider").animating||n.hasClass(a+"active-slide")||(i.direction=i.currentItem<r?"next":"prev",i.flexAnimate(r,i.vars.pauseOnAction,!1,!0,!0))
                                                })
                                              }
                                            },
                                            controlNav:{
                                              setup:function(){
                                                i.manualControls?g.controlNav.setupManual():g.controlNav.setupPaging()
                                              },
                                              setupPaging:function(){
                                                var e,n,r="thumbnails"===i.vars.controlNav?"control-thumbs":"control-paging",o=1;
                                                if(i.controlNavScaffold=t('<ol class="'+a+"control-nav "+a+r+'"></ol>'),i.pagingCount>1)for(var s=0;s<i.pagingCount;s++){if(n=i.slides.eq(s),void 0===n.attr("data-thumb-alt")&&n.attr("data-thumb-alt",""),altText=""!==n.attr("data-thumb-alt")?altText=' alt="'+n.attr("data-thumb-alt")+'"':"",e="thumbnails"===i.vars.controlNav?'<img src="'+n.attr("data-thumb")+'"'+altText+"/>":'<a href="#">'+o+"</a>","thumbnails"===i.vars.controlNav&&!0===i.vars.thumbCaptions){var l=n.attr("data-thumbcaption");""!==l&&void 0!==l&&(e+='<span class="'+a+'caption">'+l+"</span>")}i.controlNavScaffold.append("<li>"+e+"</li>"),o++}i.controlsContainer?t(i.controlsContainer).append(i.controlNavScaffold):i.append(i.controlNavScaffold),g.controlNav.set(),g.controlNav.active(),i.controlNavScaffold.delegate("a, img",u,function(e){if(e.preventDefault(),""===c||c===e.type){var n=t(this),r=i.controlNav.index(n);n.hasClass(a+"active")||(i.direction=r>i.currentSlide?"next":"prev",i.flexAnimate(r,i.vars.pauseOnAction))}""===c&&(c=e.type),g.setToClearWatchedEvent()})
                                              },
                                              setupManual:function(){
                                                i.controlNav=i.manualControls,g.controlNav.active(),
                                                i.controlNav.bind(u,function(e){
                                                  if(e.preventDefault(),""===c||c===e.type){
                                                    var n=t(this),r=i.controlNav.index(n);
                                                    n.hasClass(a+"active")||(r>i.currentSlide?i.direction="next":i.direction="prev",i.flexAnimate(r,i.vars.pauseOnAction))
                                                  }
                                                  ""===c&&(c=e.type),g.setToClearWatchedEvent()
                                                })
                                              },
                                              set:function(){
                                                var e="thumbnails"===i.vars.controlNav?"img":"a";
                                                i.controlNav=t("."+a+"control-nav li "+e,i.controlsContainer?i.controlsContainer:i)
                                              },
                                              active:function(){
                                                i.controlNav.removeClass(a+"active").eq(i.animatingTo).addClass(a+"active")
                                              },
                                              update:function(e,n){
                                                i.pagingCount>1&&"add"===e?i.controlNavScaffold.append(t('<li><a href="#">'+i.count+"</a></li>")):1===i.pagingCount?i.controlNavScaffold.find("li").remove():i.controlNav.eq(n).closest("li").remove(),g.controlNav.set(),i.pagingCount>1&&i.pagingCount!==i.controlNav.length?i.update(n,e):g.controlNav.active()
                                              }
                                            },
                                            directionNav:{
                                              setup:function(){
                                                var e=t('<ul class="'+a+'direction-nav"><li class="'+a+'nav-prev"><a class="'+a+'prev" href="#">'+i.vars.prevText+'</a></li><li class="'+a+'nav-next"><a class="'+a+'next" href="#">'+i.vars.nextText+"</a></li></ul>");
                                                i.customDirectionNav?i.directionNav=i.customDirectionNav:i.controlsContainer?(t(i.controlsContainer).append(e),
                                                i.directionNav=t("."+a+"direction-nav li a",i.controlsContainer)):(i.append(e),i.directionNav=t("."+a+"direction-nav li a",i)),
                                                g.directionNav.update(),
                                                i.directionNav.bind(u,function(e){
                                                  e.preventDefault();
                                                  var n;
                                                  (""===c||c===e.type)&&(n=t(this).hasClass(a+"next")?i.getTarget("next"):i.getTarget("prev"),i.flexAnimate(n,i.vars.pauseOnAction)),""===c&&(c=e.type),g.setToClearWatchedEvent()
                                                })
                                              },
                                              update:function(){
                                                var t=a+"disabled";
                                                1===i.pagingCount?i.directionNav.addClass(t).attr("tabindex","-1"):i.vars.animationLoop?i.directionNav.removeClass(t).removeAttr("tabindex"):0===i.animatingTo?i.directionNav.removeClass(t).filter("."+a+"prev").addClass(t).attr("tabindex","-1"):i.animatingTo===i.last?i.directionNav.removeClass(t).filter("."+a+"next").addClass(t).attr("tabindex","-1"):i.directionNav.removeClass(t).removeAttr("tabindex")
                                              }
                                            },
                                            pausePlay:{
                                              setup:function(){
                                                var e=t('<div class="'+a+'pauseplay"><a href="#"></a></div>');
                                                i.controlsContainer?(i.controlsContainer.append(e),
                                                i.pausePlay=t("."+a+"pauseplay a",i.controlsContainer)):(i.append(e),i.pausePlay=t("."+a+"pauseplay a",i)),
                                                g.pausePlay.update(i.vars.slideshow?a+"pause":a+"play"),
                                                i.pausePlay.bind(u,function(e){
                                                  e.preventDefault(),(""===c||c===e.type)&&(t(this).hasClass(a+"pause")?(i.manualPause=!0,i.manualPlay=!1,i.pause()):(i.manualPause=!1,i.manualPlay=!0,i.play())),""===c&&(c=e.type),g.setToClearWatchedEvent()
                                                })
                                              },
                                              update:function(t){
                                                "play"===t?i.pausePlay.removeClass(a+"pause").addClass(a+"play").html(i.vars.playText):i.pausePlay.removeClass(a+"play").addClass(a+"pause").html(i.vars.pauseText)
                                              }
                                            },
                                            touch:function(){
                                              function t(t){
                                                t.stopPropagation(),i.animating?t.preventDefault():(i.pause(),n._gesture.addPointer(t.pointerId),C=0,u=d?i.h:i.w,m=Number(new Date),l=f&&p&&i.animatingTo===i.last?0:f&&p?i.limit-(i.itemW+i.vars.itemMargin)*i.move*i.animatingTo:f&&i.currentSlide===i.last?i.limit:f?(i.itemW+i.vars.itemMargin)*i.move*i.currentSlide:p?(i.last-i.currentSlide+i.cloneOffset)*u:(i.currentSlide+i.cloneOffset)*u)
                                              }
                                              function e(t){
                                                t.stopPropagation();
                                                var e=t.target._slider;
                                                if(e){
                                                  var r=-t.translationX,i=-t.translationY;
                                                  return C+=d?i:r,c=C,b=d?Math.abs(C)<Math.abs(-r):Math.abs(C)<Math.abs(-i),t.detail===t.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){n._gesture.stop()}):void((!b||Number(new Date)-m>500)&&(t.preventDefault(),!h&&e.transitions&&(e.vars.animationLoop||(c=C/(0===e.currentSlide&&0>C||e.currentSlide===e.last&&C>0?Math.abs(C)/u+2:1)),e.setProps(l+c,"setTouch"))))
                                                }
                                              }
                                              function r(t){
                                                t.stopPropagation();
                                                var e=t.target._slider;
                                                if(e){
                                                  if(e.animatingTo===e.currentSlide&&!b&&null!==c){
                                                    var n=p?-c:c,r=n>0?e.getTarget("next"):e.getTarget("prev");
                                                    e.canAdvance(r)&&(Number(new Date)-m<550&&Math.abs(n)>50||Math.abs(n)>u/2)?e.flexAnimate(r,e.vars.pauseOnAction):h||e.flexAnimate(e.currentSlide,e.vars.pauseOnAction,!0)
                                                  }
                                                  o=null,a=null,c=null,l=null,C=0
                                                }
                                              }
                                              var o,a,l,u,c,m,g,v,y,b=!1,x=0,w=0,C=0;
                                              s?(n.style.msTouchAction="none",n._gesture=new MSGesture,n._gesture.target=n,n.addEventListener("MSPointerDown",t,!1),n._slider=i,n.addEventListener("MSGestureChange",e,!1),n.addEventListener("MSGestureEnd",r,!1)):(g=function(t){
                                                i.animating?t.preventDefault():(window.navigator.msPointerEnabled||1===t.touches.length)&&(i.pause(),
                                                u=d?i.h:i.w,
                                                m=Number(new Date),
                                                x=t.touches[0].pageX,w=t.touches[0].pageY,
                                                l=f&&p&&i.animatingTo===i.last?0:f&&p?i.limit-(i.itemW+i.vars.itemMargin)*i.move*i.animatingTo:f&&i.currentSlide===i.last?i.limit:f?(i.itemW+i.vars.itemMargin)*i.move*i.currentSlide:p?(i.last-i.currentSlide+i.cloneOffset)*u:(i.currentSlide+i.cloneOffset)*u,o=d?w:x,a=d?x:w,n.addEventListener("touchmove",v,!1),n.addEventListener("touchend",y,!1))
                                              },
                                              v=function(t){
                                                x=t.touches[0].pageX,w=t.touches[0].pageY,c=d?o-w:o-x,b=d?Math.abs(c)<Math.abs(x-a):Math.abs(c)<Math.abs(w-a);
                                                var e=500;
                                                (!b||Number(new Date)-m>e)&&(t.preventDefault(),!h&&i.transitions&&(i.vars.animationLoop||(c/=0===i.currentSlide&&0>c||i.currentSlide===i.last&&c>0?Math.abs(c)/u+2:1),i.setProps(l+c,"setTouch")))
                                              },
                                              y=function(){
                                                if(n.removeEventListener("touchmove",v,!1),i.animatingTo===i.currentSlide&&!b&&null!==c){
                                                  var t=p?-c:c,e=t>0?i.getTarget("next"):i.getTarget("prev");
                                                  i.canAdvance(e)&&(Number(new Date)-m<550&&Math.abs(t)>50||Math.abs(t)>u/2)?i.flexAnimate(e,i.vars.pauseOnAction):h||i.flexAnimate(i.currentSlide,i.vars.pauseOnAction,!0)
                                                }
                                                n.removeEventListener("touchend",y,!1),o=null,a=null,c=null,l=null
                                              },
                                              n.addEventListener("touchstart",g,!1))
                                            },
                                            resize:function(){
                                              !i.animating&&i.is(":visible")&&(f||i.doMath(),h?g.smoothHeight():f?(i.slides.width(i.computedW),i.update(i.pagingCount),i.setProps()):d?(i.viewport.height(i.h),i.setProps(i.h,"setTotal")):(i.vars.smoothHeight&&g.smoothHeight(),i.newSlides.width(i.computedW),i.setProps(i.computedW,"setTotal")))
                                            },
                                            smoothHeight:function(t){
                                              if(!d||h){
                                                var e=h?i:i.viewport;
                                                t?e.animate({height:i.slides.eq(i.animatingTo).height()},t):e.height(i.slides.eq(i.animatingTo).height())
                                              }
                                            },
                                            sync:function(e){
                                              var n=t(i.vars.sync).data("flexslider"),r=i.animatingTo;
                                              switch(e){
                                                case"animate":
                                                  n.flexAnimate(r,i.vars.pauseOnAction,!1,!0);
                                                  break;
                                                case"play":
                                                  n.playing||n.asNav||n.play();
                                                  break;
                                                case"pause":
                                                  n.pause()
                                              }
                                            },
                                            uniqueID:function(e){
                                              return e.filter("[id]").add(e.find("[id]")).each(function(){
                                                var e=t(this);
                                                e.attr("id",e.attr("id")+"_clone")
                                              }),e
                                            },
                                            pauseInvisible:{
                                              visProp:null,init:function(){
                                                var t=g.pauseInvisible.getHiddenProp();
                                                if(t){
                                                  var e=t.replace(/[H|h]idden/,"")+"visibilitychange";
                                                  document.addEventListener(e,function(){
                                                    g.pauseInvisible.isHidden()?i.startTimeout?clearTimeout(i.startTimeout):i.pause():i.started?i.play():i.vars.initDelay>0?setTimeout(i.play,i.vars.initDelay):i.play()
                                                  })
                                                }
                                              },
                                              isHidden:function(){
                                                var t=g.pauseInvisible.getHiddenProp();
                                                return!!t&&document[t]
                                              },
                                              getHiddenProp:function(){
                                                var t=["webkit","moz","ms","o"];
                                                if("hidden"in document)return"hidden";
                                                for(var e=0;e<t.length;e++)if(t[e]+"Hidden"in document)return t[e]+"Hidden";
                                                return null
                                              }
                                            },
                                            setToClearWatchedEvent:function(){
                                              clearTimeout(o),o=setTimeout(function(){
                                                c=""
                                              },3e3)
                                            }
                                          },
                                          i.flexAnimate=function(e,n,r,o,s){
                                            if(i.vars.animationLoop||e===i.currentSlide||(i.direction=e>i.currentSlide?"next":"prev"),m&&1===i.pagingCount&&(i.direction=i.currentItem<e?"next":"prev"),!i.animating&&(i.canAdvance(e,s)||r)&&i.is(":visible")){
                                              if(m&&o){
                                                var u=t(i.vars.asNavFor).data("flexslider");
                                                if(i.atEnd=0===e||e===i.count-1,u.flexAnimate(e,!0,!1,!0,s),i.direction=i.currentItem<e?"next":"prev",u.direction=i.direction,Math.ceil((e+1)/i.visible)-1===i.currentSlide||0===e)return i.currentItem=e,i.slides.removeClass(a+"active-slide").eq(e).addClass(a+"active-slide"),!1;
                                                i.currentItem=e,i.slides.removeClass(a+"active-slide").eq(e).addClass(a+"active-slide"),e=Math.floor(e/i.visible)
                                              }
                                              if(i.animating=!0,i.animatingTo=e,n&&i.pause(),i.vars.before(i),i.syncExists&&!s&&g.sync("animate"),i.vars.controlNav&&g.controlNav.active(),f||i.slides.removeClass(a+"active-slide").eq(e).addClass(a+"active-slide"),i.atEnd=0===e||e===i.last,i.vars.directionNav&&g.directionNav.update(),e===i.last&&(i.vars.end(i),i.vars.animationLoop||i.pause()),h)l?(i.slides.eq(i.currentSlide).css({opacity:0,zIndex:1}),i.slides.eq(e).css({opacity:1,zIndex:2}),i.wrapup(b)):(i.slides.eq(i.currentSlide).css({zIndex:1}).animate({opacity:0},i.vars.animationSpeed,i.vars.easing),i.slides.eq(e).css({zIndex:2}).animate({opacity:1},i.vars.animationSpeed,i.vars.easing,i.wrapup));
                                              else{
                                                var c,v,y,b=d?i.slides.filter(":first").height():i.computedW;
                                                f?(c=i.vars.itemMargin,y=(i.itemW+c)*i.move*i.animatingTo,v=y>i.limit&&1!==i.visible?i.limit:y):v=0===i.currentSlide&&e===i.count-1&&i.vars.animationLoop&&"next"!==i.direction?p?(i.count+i.cloneOffset)*b:0:i.currentSlide===i.last&&0===e&&i.vars.animationLoop&&"prev"!==i.direction?p?0:(i.count+1)*b:p?(i.count-1-e+i.cloneOffset)*b:(e+i.cloneOffset)*b,
                                                i.setProps(v,"",i.vars.animationSpeed),i.transitions?(i.vars.animationLoop&&i.atEnd||(i.animating=!1,i.currentSlide=i.animatingTo),i.container.unbind("webkitTransitionEnd transitionend"),i.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(i.ensureAnimationEnd),i.wrapup(b)}),clearTimeout(i.ensureAnimationEnd),i.ensureAnimationEnd=setTimeout(function(){i.wrapup(b)},i.vars.animationSpeed+100)):i.container.animate(i.args,i.vars.animationSpeed,i.vars.easing,function(){i.wrapup(b)})
                                              }
                                              i.vars.smoothHeight&&g.smoothHeight(i.vars.animationSpeed)
                                            }
                                          },
                                          i.wrapup=function(t){
                                            h||f||(0===i.currentSlide&&i.animatingTo===i.last&&i.vars.animationLoop?i.setProps(t,"jumpEnd"):i.currentSlide===i.last&&0===i.animatingTo&&i.vars.animationLoop&&i.setProps(t,"jumpStart")),i.animating=!1,i.currentSlide=i.animatingTo,i.vars.after(i)
                                          },
                                          i.animateSlides=function(){
                                            !i.animating&&e&&i.flexAnimate(i.getTarget("next"))
                                          },
                                          i.pause=function(){
                                            clearInterval(i.animatedSlides),i.animatedSlides=null,i.playing=!1,i.vars.pausePlay&&g.pausePlay.update("play"),i.syncExists&&g.sync("pause")
                                          },
                                          i.play=function(){
                                            i.playing&&clearInterval(i.animatedSlides),i.animatedSlides=i.animatedSlides||setInterval(i.animateSlides,i.vars.slideshowSpeed),i.started=i.playing=!0,i.vars.pausePlay&&g.pausePlay.update("pause"),i.syncExists&&g.sync("play")
                                          },
                                          i.stop=function(){
                                            i.pause(),i.stopped=!0
                                          },
                                          i.canAdvance=function(t,e){
                                            var n=m?i.pagingCount-1:i.last;
                                            return!!e||(!(!m||i.currentItem!==i.count-1||0!==t||"prev"!==i.direction)||(!m||0!==i.currentItem||t!==i.pagingCount-1||"next"===i.direction)&&(!(t===i.currentSlide&&!m)&&(!!i.vars.animationLoop||(!i.atEnd||0!==i.currentSlide||t!==n||"next"===i.direction)&&(!i.atEnd||i.currentSlide!==n||0!==t||"next"!==i.direction))))
                                          },
                                          i.getTarget=function(t){
                                            return i.direction=t,"next"===t?i.currentSlide===i.last?0:i.currentSlide+1:0===i.currentSlide?i.last:i.currentSlide-1
                                          },
                                          i.setProps=function(t,e,n){
                                            var r=function(){
                                              var n=t?t:(i.itemW+i.vars.itemMargin)*i.move*i.animatingTo,r=function(){
                                                if(f)return"setTouch"===e?t:p&&i.animatingTo===i.last?0:p?i.limit-(i.itemW+i.vars.itemMargin)*i.move*i.animatingTo:i.animatingTo===i.last?i.limit:n;
                                                switch(e){
                                                  case"setTotal":
                                                    return p?(i.count-1-i.currentSlide+i.cloneOffset)*t:(i.currentSlide+i.cloneOffset)*t;
                                                  case"setTouch":
                                                    return p?t:t;
                                                  case"jumpEnd":
                                                    return p?t:i.count*t;
                                                  case"jumpStart":
                                                    return p?i.count*t:t;
                                                  default:
                                                    return t
                                                }
                                              }();
                                              return-1*r+"px"
                                            }();
                                            i.transitions&&(r=d?"translate3d(0,"+r+",0)":"translate3d("+r+",0,0)",n=void 0!==n?n/1e3+"s":"0s",i.container.css("-"+i.pfx+"-transition-duration",n),i.container.css("transition-duration",n)),i.args[i.prop]=r,(i.transitions||void 0===n)&&i.container.css(i.args),i.container.css("transform",r)
                                          },
                                          i.setup=function(e){
                                            if(h)i.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(l?i.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+i.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(i.currentSlide).css({opacity:1,zIndex:2}):0==i.vars.fadeFirstSlide?i.slides.css({opacity:0,display:"block",zIndex:1}).eq(i.currentSlide).css({zIndex:2}).css({opacity:1}):i.slides.css({opacity:0,display:"block",zIndex:1}).eq(i.currentSlide).css({zIndex:2}).animate({opacity:1},i.vars.animationSpeed,i.vars.easing)),i.vars.smoothHeight&&g.smoothHeight();
                                            else{
                                              var n,r;
                                              "init"===e&&(i.viewport=t('<div class="'+a+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(i).append(i.container),i.cloneCount=0,i.cloneOffset=0,p&&(r=t.makeArray(i.slides).reverse(),i.slides=t(r),i.container.empty().append(i.slides))),i.vars.animationLoop&&!f&&(i.cloneCount=2,i.cloneOffset=1,"init"!==e&&i.container.find(".clone").remove(),i.container.append(g.uniqueID(i.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(g.uniqueID(i.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),i.newSlides=t(i.vars.selector,i),n=p?i.count-1-i.currentSlide+i.cloneOffset:i.currentSlide+i.cloneOffset,d&&!f?(i.container.height(200*(i.count+i.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){i.newSlides.css({display:"block"}),i.doMath(),i.viewport.height(i.h),i.setProps(n*i.h,"init")},"init"===e?100:0)):(i.container.width(200*(i.count+i.cloneCount)+"%"),i.setProps(n*i.computedW,"init"),setTimeout(function(){i.doMath(),i.newSlides.css({width:i.computedW,marginRight:i.computedM,"float":"left",display:"block"}),i.vars.smoothHeight&&g.smoothHeight()},"init"===e?100:0))
                                            }
                                            f||i.slides.removeClass(a+"active-slide").eq(i.currentSlide).addClass(a+"active-slide"),i.vars.init(i)
                                          },
                                          i.doMath=function(){
                                            var t=i.slides.first(),e=i.vars.itemMargin,n=i.vars.minItems,r=i.vars.maxItems;
                                            i.w=void 0===i.viewport?i.width():i.viewport.width(),
                                            i.h=t.height(),
                                            i.boxPadding=t.outerWidth()-t.width(),
                                            f?(i.itemT=i.vars.itemWidth+e,i.itemM=e,i.minW=n?n*i.itemT:i.w,i.maxW=r?r*i.itemT-e:i.w,i.itemW=i.minW>i.w?(i.w-e*(n-1))/n:i.maxW<i.w?(i.w-e*(r-1))/r:i.vars.itemWidth>i.w?i.w:i.vars.itemWidth,i.visible=Math.floor(i.w/i.itemW),i.move=i.vars.move>0&&i.vars.move<i.visible?i.vars.move:i.visible,i.pagingCount=Math.ceil((i.count-i.visible)/i.move+1),i.last=i.pagingCount-1,i.limit=1===i.pagingCount?0:i.vars.itemWidth>i.w?i.itemW*(i.count-1)+e*(i.count-1):(i.itemW+e)*i.count-i.w-e):(i.itemW=i.w,i.itemM=e,i.pagingCount=i.count,i.last=i.count-1),i.computedW=i.itemW-i.boxPadding,i.computedM=i.itemM
                                          },
                                          i.update=function(t,e){
                                            i.doMath(),f||(t<i.currentSlide?i.currentSlide+=1:t<=i.currentSlide&&0!==t&&(i.currentSlide-=1),i.animatingTo=i.currentSlide),i.vars.controlNav&&!i.manualControls&&("add"===e&&!f||i.pagingCount>i.controlNav.length?g.controlNav.update("add"):("remove"===e&&!f||i.pagingCount<i.controlNav.length)&&(f&&i.currentSlide>i.last&&(i.currentSlide-=1,i.animatingTo-=1),g.controlNav.update("remove",i.last))),i.vars.directionNav&&g.directionNav.update()
                                          },
                                          i.addSlide=function(e,n){
                                            var r=t(e);
                                            i.count+=1,i.last=i.count-1,d&&p?void 0!==n?i.slides.eq(i.count-n).after(r):i.container.prepend(r):void 0!==n?i.slides.eq(n).before(r):i.container.append(r),i.update(n,"add"),i.slides=t(i.vars.selector+":not(.clone)",i),i.setup(),i.vars.added(i)
                                          },
                                          i.removeSlide=function(e){
                                            var n=isNaN(e)?i.slides.index(t(e)):e;i.count-=1,i.last=i.count-1,isNaN(e)?t(e,i.slides).remove():d&&p?i.slides.eq(i.last).remove():i.slides.eq(e).remove(),i.doMath(),i.update(n,"remove"),i.slides=t(i.vars.selector+":not(.clone)",i),i.setup(),i.vars.removed(i)
                                          },
                                          g.init()
                                        },
                                        t(window).blur(function(){e=!1}).focus(function(){e=!0}),t.flexslider.defaults={
                                          namespace:"flex-",
                                          selector:".slides > li",
                                          animation:"fade",
                                          easing:"swing",
                                          direction:"horizontal",
                                          reverse:!1,
                                          animationLoop:!0,
                                          smoothHeight:!1,
                                          startAt:0,
                                          slideshow:!0,
                                          slideshowSpeed:7e3,
                                          animationSpeed:600,
                                          initDelay:0,
                                          randomize:!1,
                                          fadeFirstSlide:!0,
                                          thumbCaptions:!1,
                                          pauseOnAction:!0,
                                          pauseOnHover:!1,
                                          pauseInvisible:!0,
                                          useCSS:!0,
                                          touch:!0,
                                          video:!1,
                                          controlNav:!0,
                                          directionNav:!0,
                                          prevText:"Previous",
                                          nextText:"Next",
                                          keyboard:!0,
                                          multipleKeyboard:!1,
                                          mousewheel:!1,
                                          pausePlay:!1,
                                          pauseText:"Pause",
                                          playText:"Play",
                                          controlsContainer:"",
                                          manualControls:"",
                                          customDirectionNav:"",
                                          sync:"",
                                          asNavFor:"",
                                          itemWidth:0,
                                          itemMargin:0,
                                          minItems:1,
                                          maxItems:0,
                                          move:0,
                                          allowOneSlide:!0,
                                          start:function(){},
                                          before:function(){},
                                          after:function(){},
                                          end:function(){},
                                          added:function(){},
                                          removed:function(){},
                                          init:function(){}},
                                          t.fn.flexslider=function(e){
                                            if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var n=t(this),r=e.selector?e.selector:".slides > li",i=n.find(r);1===i.length&&e.allowOneSlide===!0||0===i.length?(i.fadeIn(400),e.start&&e.start(n)):void 0===n.data("flexslider")&&new t.flexslider(this,e)});
                                            var n=t(this).data("flexslider");
                                            switch(e){
                                              case"play":
                                                n.play();
                                                break;
                                              case"pause":
                                                n.pause();
                                                break;
                                              case"stop":
                                                n.stop();
                                                break;
                                              case"next":
                                                n.flexAnimate(n.getTarget("next"),!0);
                                                break;
                                              case"prev":
                                              case"previous":
                                                n.flexAnimate(n.getTarget("prev"),!0);
                                                break;
                                              default:"number"==typeof e&&n.flexAnimate(e,!0)
                                            }
                                          }
                                    }(jQuery),function(t){
                                      t.fn.resizeAndCrop=function(e){
                                        function n(){
                                          for(var t=o.renderBatchSize||a.length,e=0;e<t&&a.length;e++)r(a.shift());
                                          a.length&&setTimeout(n,o.renderBatchPause||0)
                                        }
                                        function r(e){
                                          var n=t(e),r=n.attr("realsrc")||n.attr("src");
                                          if(r){
                                            var o=t(document.createElement("img"));
                                            o.bind("load",{img:e},i);
                                            var a,s;
                                            "undefined"!=typeof(a=n.attr("alt"))&&o.attr("alt",a),"undefined"!=typeof(s=n.attr("title"))&&o.attr("title",s),o.attr("src",r)
                                          }
                                        }
                                        function i(e){
                                          var n,r=t(this),i=this.width,a=this.height,s=e.data.img,l=t(s),u=o.width||s.width,c=o.height||s.height,d=o.forceResize?u:Math.min(i,u),p=o.forceResize?c:Math.min(a,c);
                                          if(i&&a){
                                            if(!o.crop&&u==i&&c==a)return void l.attr("src",r.attr("src"));
                                            if(d*a<p*i?(this.width=Math.round(i*p/a),this.height=p):(this.width=d,this.height=Math.round(a*d/i)),o.imgClass&&r.addClass(o.imgClass),!o.crop)return void l.replaceWith(r);
                                            n=t(document.createElement("div")),n.addClass("resize-and-crop"),o.preserveSize?n.width(u).height(c):(n.width(d).height(p),o.center&&(r.css("left",-Math.max(0,Math.round((this.width-d)/2))),o.smart&&this.height/this.width>1.2?r.css("top",0):r.css("top",-Math.max(0,Math.round((this.height-p)/2))))),o.contClass&&n.addClass(o.contClass),n.append(r),l.replaceWith(n)
                                          }
                                        }
                                        var o={width:0,height:0,crop:!0,center:!0,smart:!0,preserveSize:!1,forceResize:!1,imgClass:"",contClass:"",renderStartDelay:50,renderBatchSize:10,renderBatchPause:200},a=[];
                                        return e&&t.extend(o,e),this.each(function(){a.push(this)}),setTimeout(n,o.renderStartDelay||0),this
                                      }
                                    }(jQuery),
                                    function(){
                                      var t,e,n,r,i,o,a,s,l,u,c,d,p,f,h,m,g,v,y,b,x,w,C,k,T,S,_,$,E,M,N,A,D,L,j,P,O,I,q,H,F,z,B,W,R,G,U,X,V,Q=[].slice,Z={}.hasOwnProperty,J=function(t,e){
                                        function n(){
                                          this.constructor=t
                                        }
                                        for(var r in e)Z.call(e,r)&&(t[r]=e[r]);
                                        return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},K=[].indexOf||function(t){
                                          for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;
                                          return-1
                                        };
                                        for(x={catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},E=function(){var t;return null!=(t="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?t:+new Date},N=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,b=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==N&&(N=function(t){return setTimeout(t,50)},b=function(t){return clearTimeout(t)}),D=function(t){var e,n;return e=E(),(n=function(){var r;return r=E()-e,r>=33?(e=E(),t(r,function(){return N(n)})):setTimeout(n,33-r)})()},A=function(){var t,e,n;return n=arguments[0],e=arguments[1],t=3<=arguments.length?Q.call(arguments,2):[],"function"==typeof n[e]?n[e].apply(n,t):n[e]},w=function(){var t,e,n,r,i,o,a;for(e=arguments[0],r=2<=arguments.length?Q.call(arguments,1):[],o=0,a=r.length;o<a;o++)if(n=r[o])for(t in n)Z.call(n,t)&&(i=n[t],null!=e[t]&&"object"==typeof e[t]&&null!=i&&"object"==typeof i?w(e[t],i):e[t]=i);return e},g=function(t){var e,n,r,i,o;for(n=e=0,i=0,o=t.length;i<o;i++)r=t[i],n+=Math.abs(r),e++;return n/e},k=function(t,e){var n,r,i;if(null==t&&(t="options"),null==e&&(e=!0),i=document.querySelector("[data-pace-"+t+"]")){if(n=i.getAttribute("data-pace-"+t),!e)return n;try{return JSON.parse(n)}catch(t){return r=t,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",r):void 0}}},a=function(){function t(){}return t.prototype.on=function(t,e,n,r){var i;return null==r&&(r=!1),null==this.bindings&&(this.bindings={}),null==(i=this.bindings)[t]&&(i[t]=[]),this.bindings[t].push({handler:e,ctx:n,once:r})},t.prototype.once=function(t,e,n){return this.on(t,e,n,!0)},t.prototype.off=function(t,e){var n,r,i;if(null!=(null!=(r=this.bindings)?r[t]:void 0)){if(null==e)return delete this.bindings[t];for(n=0,i=[];n<this.bindings[t].length;)this.bindings[t][n].handler===e?i.push(this.bindings[t].splice(n,1)):i.push(n++);return i}},t.prototype.trigger=function(){var t,e,n,r,i,o,a,s,l;if(n=arguments[0],t=2<=arguments.length?Q.call(arguments,1):[],null!=(a=this.bindings)?a[n]:void 0){for(i=0,l=[];i<this.bindings[n].length;)s=this.bindings[n][i],r=s.handler,e=s.ctx,o=s.once,r.apply(null!=e?e:this,t),o?l.push(this.bindings[n].splice(i,1)):l.push(i++);return l}},t}(),u=window.Pace||{},window.Pace=u,w(u,a.prototype),M=u.options=w({},x,window.paceOptions,k()),U=["ajax","document","eventLag","elements"],B=0,R=U.length;B<R;B++)O=U[B],M[O]===!0&&(M[O]=x[O]);
                                        l=function(t){
                                          function e(){
                                            return X=e.__super__.constructor.apply(this,arguments)
                                          }
                                          return J(e,t),e
                                        }
                                        (Error),e=function(){
                                          function t(){this.progress=0}return t.prototype.getElement=function(){
                                            var t;
                                            if(null==this.el){
                                              if(t=document.querySelector(M.target),!t)throw new l;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=t.firstChild?t.insertBefore(this.el,t.firstChild):t.appendChild(this.el)
                                            }
                                            return this.el
                                          },
                                          t.prototype.finish=function(){
                                            var t;
                                            return t=this.getElement(),t.className=t.className.replace("pace-active",""),t.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"
                                          },
                                          t.prototype.update=function(t){
                                            return this.progress=t,this.render()
                                          },
                                          t.prototype.destroy=function(){
                                            try{
                                              this.getElement().parentNode.removeChild(this.getElement())
                                            }catch(t){l=t}
                                            return this.el=void 0
                                          },
                                          t.prototype.render=function(){
                                            var t,e,n,r,i,o,a;
                                            if(null==document.querySelector(M.target))return!1;
                                            for(t=this.getElement(),r="translate3d("+this.progress+"%, 0, 0)",a=["webkitTransform","msTransform","transform"],i=0,o=a.length;i<o;i++)e=a[i],t.children[0].style[e]=r;
                                            return(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(t.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?n="99":(n=this.progress<10?"0":"",n+=0|this.progress),t.children[0].setAttribute("data-progress",""+n)),this.lastRenderedProgress=this.progress
                                          },
                                          t.prototype.done=function(){
                                            return this.progress>=100
                                          },t
                                        }(),
                                        s=function(){
                                          function t(){
                                            this.bindings={}
                                          }
                                          return t.prototype.trigger=function(t,e){
                                            var n,r,i,o,a;
                                            if(null!=this.bindings[t]){
                                              for(o=this.bindings[t],a=[],r=0,i=o.length;r<i;r++)n=o[r],a.push(n.call(this,e));
                                              return a
                                            }
                                          },
                                          t.prototype.on=function(t,e){
                                            var n;
                                            return null==(n=this.bindings)[t]&&(n[t]=[]),this.bindings[t].push(e)
                                          },t
                                        }(),
                                        z=window.XMLHttpRequest,
                                        F=window.XDomainRequest,
                                        H=window.WebSocket,
                                        C=function(t,e){
                                          var n,r,i;
                                          i=[];
                                          for(r in e.prototype)try{null==t[r]&&"function"!=typeof e[r]?"function"==typeof Object.defineProperty?i.push(Object.defineProperty(t,r,{get:function(){return e.prototype[r]},configurable:!0,enumerable:!0})):i.push(t[r]=e.prototype[r]):i.push(void 0)}catch(t){n=t}return i
                                        },
                                        _=[],u.ignore=function(){
                                          var t,e,n;
                                          return e=arguments[0],t=2<=arguments.length?Q.call(arguments,1):[],_.unshift("ignore"),n=e.apply(null,t),_.shift(),n
                                        },
                                        u.track=function(){
                                          var t,e,n;
                                          return e=arguments[0],t=2<=arguments.length?Q.call(arguments,1):[],_.unshift("track"),n=e.apply(null,t),_.shift(),n
                                        },
                                        P=function(t){
                                          var e;
                                          if(null==t&&(t="GET"),"track"===_[0])return"force";
                                          if(!_.length&&M.ajax){
                                            if("socket"===t&&M.ajax.trackWebSockets)return!0;
                                            if(e=t.toUpperCase(),K.call(M.ajax.trackMethods,e)>=0)return!0
                                          }
                                          return!1
                                        },
                                        c=function(t){
                                          function e(){
                                            var t,n=this;
                                            e.__super__.constructor.apply(this,arguments),t=function(t){
                                              var e;
                                              return e=t.open,t.open=function(r,i){
                                                return P(r)&&n.trigger("request",{type:r,url:i,request:t}),e.apply(t,arguments)
                                              }
                                            },
                                            window.XMLHttpRequest=function(e){
                                              var n;
                                              return n=new z(e),t(n),n
                                            };
                                            try{
                                              C(window.XMLHttpRequest,z)
                                            }catch(t){}
                                            if(null!=F){
                                              window.XDomainRequest=function(){
                                                var e;
                                                return e=new F,t(e),e
                                              };
                                              try{
                                                C(window.XDomainRequest,F)
                                              }catch(t){}
                                            }
                                            if(null!=H&&M.ajax.trackWebSockets){
                                              window.WebSocket=function(t,e){
                                                var r;
                                                return r=null!=e?new H(t,e):new H(t),P("socket")&&n.trigger("request",{type:"socket",url:t,protocols:e,request:r}),r
                                              };
                                              try{
                                                C(window.WebSocket,H)
                                              }catch(t){}
                                            }
                                          }
                                          return J(e,t),e}(s),W=null,T=function(){return null==W&&(W=new c),W},j=function(t){
                                            var e,n,r,i;
                                            for(i=M.ajax.ignoreURLs,n=0,r=i.length;n<r;n++)if(e=i[n],"string"==typeof e){if(t.indexOf(e)!==-1)return!0}else if(e.test(t))return!0;return!1
                                          },T().on("request",function(e){
                                            var n,r,i,o,a;
                                            if(o=e.type,i=e.request,a=e.url,!j(a))return u.running||M.restartOnRequestAfter===!1&&"force"!==P(o)?void 0:(r=arguments,n=M.restartOnRequestAfter||0,"boolean"==typeof n&&(n=0),setTimeout(function(){var e,n,a,s,l,c;if(e="socket"===o?i.readyState<2:0<(s=i.readyState)&&s<4){for(u.restart(),l=u.sources,c=[],n=0,a=l.length;n<a;n++){if(O=l[n],O instanceof t){O.watch.apply(O,r);break}c.push(void 0)}return c}},n))
                                          }),
                                          t=function(){
                                            function t(){
                                              var t=this;
                                              this.elements=[],T().on("request",function(){return t.watch.apply(t,arguments)})
                                            }
                                            return t.prototype.watch=function(t){
                                              var e,n,r,i;
                                              if(r=t.type,e=t.request,i=t.url,!j(i))return n="socket"===r?new f(e):new h(e),this.elements.push(n)
                                            },t
                                          }(),
                                          h=function(){
                                            function t(t){
                                              var e,n,r,i,o,a,s=this;
                                              if(this.progress=0,null!=window.ProgressEvent)for(n=null,t.addEventListener("progress",function(t){return t.lengthComputable?s.progress=100*t.loaded/t.total:s.progress=s.progress+(100-s.progress)/2},!1),a=["load","abort","timeout","error"],r=0,i=a.length;r<i;r++)e=a[r],t.addEventListener(e,function(){return s.progress=100},!1);
                                              else o=t.onreadystatechange,t.onreadystatechange=function(){
                                                var e;
                                                return 0===(e=t.readyState)||4===e?s.progress=100:3===t.readyState&&(s.progress=50),"function"==typeof o?o.apply(null,arguments):void 0
                                              }
                                            }
                                            return t
                                          }(),
                                          f=function(){
                                            function t(t){
                                              var e,n,r,i,o=this;
                                              for(this.progress=0,i=["error","open"],n=0,r=i.length;n<r;n++)e=i[n],t.addEventListener(e,function(){return o.progress=100},!1)
                                            }
                                            return t
                                          }(),
                                          r=function(){
                                            function t(t){
                                              var e,n,r,o;
                                              for(null==t&&(t={}),this.elements=[],null==t.selectors&&(t.selectors=[]),o=t.selectors,n=0,r=o.length;n<r;n++)e=o[n],this.elements.push(new i(e))
                                            }
                                            return t
                                          }(),
                                          i=function(){
                                            function t(t){
                                              this.selector=t,this.progress=0,this.check()
                                            }
                                            return t.prototype.check=function(){
                                              var t=this;
                                              return document.querySelector(this.selector)?this.done():setTimeout(function(){return t.check()},M.elements.checkInterval)
                                            },t.prototype.done=function(){return this.progress=100},t
                                          }(),
                                          n=function(){
                                            function t(){
                                              var t,e,n=this;
                                              this.progress=null!=(e=this.states[document.readyState])?e:100,t=document.onreadystatechange,document.onreadystatechange=function(){return null!=n.states[document.readyState]&&(n.progress=n.states[document.readyState]),"function"==typeof t?t.apply(null,arguments):void 0}
                                            }
                                            return t.prototype.states={loading:0,interactive:50,complete:100},t
                                          }(),
                                          o=function(){
                                            function t(){
                                              var t,e,n,r,i,o=this;
                                              this.progress=0,t=0,i=[],r=0,n=E(),e=setInterval(function(){
                                                var a;
                                                return a=E()-n-50,n=E(),i.push(a),i.length>M.eventLag.sampleCount&&i.shift(),t=g(i),++r>=M.eventLag.minSamples&&t<M.eventLag.lagThreshold?(o.progress=100,clearInterval(e)):o.progress=100*(3/(t+3))
                                              },50)
                                            }
                                            return t
                                          }(),
                                          p=function(){
                                            function t(t){
                                              this.source=t,this.last=this.sinceLastUpdate=0,this.rate=M.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=A(this.source,"progress"))
                                            }
                                            return t.prototype.tick=function(t,e){
                                              var n;
                                              return null==e&&(e=A(this.source,"progress")),e>=100&&(this.done=!0),e===this.last?this.sinceLastUpdate+=t:(this.sinceLastUpdate&&(this.rate=(e-this.last)/this.sinceLastUpdate),this.catchup=(e-this.progress)/M.catchupTime,this.sinceLastUpdate=0,this.last=e),e>this.progress&&(this.progress+=this.catchup*t),n=1-Math.pow(this.progress/100,M.easeFactor),this.progress+=n*this.rate*t,this.progress=Math.min(this.lastProgress+M.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress
                                            },t
                                          }(),
                                          I=null,L=null,v=null,q=null,m=null,y=null,u.running=!1,S=function(){
                                            if(M.restartOnPushState)return u.restart()
                                          },
                                          null!=window.history.pushState&&(G=window.history.pushState,window.history.pushState=function(){
                                            return S(),G.apply(window.history,arguments)
                                          }),
                                          null!=window.history.replaceState&&(V=window.history.replaceState,window.history.replaceState=function(){
                                            return S(),V.apply(window.history,arguments)
                                          }),
                                          d={ajax:t,elements:r,document:n,eventLag:o},($=function(){
                                            var t,n,r,i,o,a,s,l;
                                            for(u.sources=I=[],a=["ajax","elements","document","eventLag"],n=0,i=a.length;n<i;n++)t=a[n],M[t]!==!1&&I.push(new d[t](M[t]));
                                            for(l=null!=(s=M.extraSources)?s:[],r=0,o=l.length;r<o;r++)O=l[r],I.push(new O(M));
                                            return u.bar=v=new e,L=[],q=new p
                                          })(),
                                          u.stop=function(){
                                            return u.trigger("stop"),u.running=!1,v.destroy(),y=!0,null!=m&&("function"==typeof b&&b(m),m=null),$()
                                          },
                                          u.restart=function(){
                                            return u.trigger("restart"),u.stop(),u.start()
                                          },
                                          u.go=function(){
                                            var t;
                                            return u.running=!0,v.render(),t=E(),y=!1,m=D(function(e,n){
                                              var r,i,o,a,s,l,c,d,f,h,m,g,b,x,w,C;
                                              for(d=100-v.progress,i=m=0,o=!0,l=g=0,x=I.length;g<x;l=++g)for(O=I[l],h=null!=L[l]?L[l]:L[l]=[],s=null!=(C=O.elements)?C:[O],c=b=0,w=s.length;b<w;c=++b)a=s[c],f=null!=h[c]?h[c]:h[c]=new p(a),o&=f.done,f.done||(i++,m+=f.tick(e));
                                              return r=m/i,v.update(q.tick(e,r)),v.done()||o||y?(v.update(100),u.trigger("done"),setTimeout(function(){return v.finish(),u.running=!1,u.trigger("hide")},Math.max(M.ghostTime,Math.max(M.minTime-(E()-t),0)))):n()
                                            })
                                          },
                                          u.start=function(t){
                                            w(M,t),u.running=!0;
                                            try{
                                              v.render()
                                            }catch(t){l=t}
                                            return document.querySelector(".pace")?(u.trigger("start"),u.go()):setTimeout(u.start,50)
                                          },
                                          "function"==typeof define&&define.amd?define(["pace"],function(){return u}):"object"==typeof exports?module.exports=u:M.startOnPageLoad&&u.start()
                                        }.call(this);
