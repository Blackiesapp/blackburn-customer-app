(function(){
var ua=navigator.userAgent||'';
var sa=(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)
  ||navigator.standalone===true;
var force=/[?&]welcome/.test(location.search);
if(sa&&!force)return;
try{if(!force&&localStorage.getItem('bw_skip')==='1')return;}catch(e){}
var ios=/iPhone|iPad|iPod/.test(ua)
  ||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);
var android=/Android/.test(ua);
if(!ios&&!android&&!force)return;
var inApp=/FBAN|FBAV|Instagram|Messenger|Line\/|Snapchat|TikTok/i.test(ua);
var gold='#d4af37';
var st=document.createElement('style');
st.textContent='#bw-wel{position:fixed;top:0;left:0;right:0;bottom:0;'
+'z-index:99999;background:#000;color:#fff;display:none;'
+'flex-direction:column;align-items:center;justify-content:center;'
+'text-align:center;padding:24px;'
+'font-family:-apple-system,Segoe UI,Roboto,sans-serif}'
+'#bw-wel img{width:96px;height:96px;border-radius:22px;margin-bottom:16px}'
+'#bw-wel h2{margin:0 0 8px;font-size:24px;color:'+gold+'}'
+'#bw-wel p{margin:6px 0;font-size:17px;line-height:1.4;max-width:340px}'
+'#bw-wel ol{text-align:left;font-size:17px;line-height:1.6;'
+'max-width:340px;padding-left:22px;margin:10px 0}'
+'#bw-wel .bw-btn{margin-top:18px;background:'+gold+';color:#000;border:0;'
+'border-radius:14px;font-size:19px;font-weight:700;padding:14px 28px;'
+'width:100%;max-width:340px}'
+'#bw-wel .bw-skip{margin-top:14px;background:none;border:0;'
+'color:#aaa;font-size:16px;padding:10px}'
+'#bw-wel svg{vertical-align:middle;width:22px;height:22px}';
document.head.appendChild(st);
var el=document.createElement('div');
el.id='bw-wel';
el.innerHTML='<img src="icon-192.png" alt="">'
+'<h2>Get the Blackburn Leisure app</h2>'
+'<div id="bw-body"></div>'
+'<button class="bw-skip" id="bw-skip">Not now</button>';
function add(){document.body.appendChild(el);}
if(document.body)add();else document.addEventListener('DOMContentLoaded',add);
var share='<svg viewBox="0 0 24 24" fill="none" stroke="'+gold+'" '
+'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
+'<path d="M12 15V3M8 7l4-4 4 4"/>'
+'<path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8'
+'a1 1 0 0 0-1-1h-1"/></svg>';
function body(){return document.getElementById('bw-body');}
var deferred=null;
function show(){el.style.display='flex';}
function hide(skip){
  el.style.display='none';
  if(skip){try{localStorage.setItem('bw_skip','1');}catch(e){}}
}
el.querySelector('#bw-skip').onclick=function(){hide(true);};
function manual(){
  body().innerHTML='<p>Add it to your Home Screen in 2 taps:</p><ol>'
  +'<li>Tap the <b>&#8942;</b> menu (top right of Chrome)</li>'
  +'<li>Tap <b>Install app</b> or <b>Add to Home screen</b></li></ol>';
}
function go(){
if(inApp){
  body().innerHTML='<p>To add the app to your Home Screen, first open '
  +'this page in your phone\'s main browser.</p><ol>'
  +'<li>Tap the menu (<b>&#8943;</b> or <b>&#8942;</b>)</li>'
  +'<li>Tap <b>Open in Safari</b> (iPhone) or <b>Open in Chrome</b> '
  +'(Android)</li></ol>';
  show();
}else if(ios){
  body().innerHTML='<p>Add it to your Home Screen in 2 taps:</p><ol>'
  +'<li>Tap the <b>Share</b> button '+share+' in Safari</li>'
  +'<li>Scroll down and tap <b>Add to Home Screen</b></li></ol>'
  +'<p style="color:#aaa;font-size:15px">Then tap <b>Add</b>.</p>';
  show();
}else{
  window.addEventListener('beforeinstallprompt',function(e){
    e.preventDefault();deferred=e;
    body().innerHTML='<p>Add it to your Home Screen for quick access to '
    +'events, opening times and more.</p>'
    +'<button class="bw-btn" id="bw-inst">Install app</button>';
    document.getElementById('bw-inst').onclick=function(){
      if(!deferred)return;
      deferred.prompt();
      deferred.userChoice.then(function(){deferred=null;hide(false);});
    };
    show();
  });
  window.addEventListener('appinstalled',function(){hide(false);});
  setTimeout(function(){
    if(!deferred&&el.style.display!=='flex'){manual();show();}
  },2500);
}
}
if(document.body)go();else document.addEventListener('DOMContentLoaded',go);
})();
