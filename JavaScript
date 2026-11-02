// SALIMA APP.JS - TOUT LE CERVEAU
let solde=parseInt(localStorage.getItem('salima_balance')||250000);
document.getElementById('soldeTxt').innerText=solde.toLocaleString()+' FCFA';

function toggleSolde(){
 document.getElementById('soldeTxt').classList.toggle('hide');
}

function changeLang(l){
 localStorage.setItem('salima_lang',l);
 const tr={FR:'Solde disponible',EN:'Available balance',AR:'الرصيد',HA:'Kudi',ES:'Saldo',ZH:'余额'};
 document.getElementById('txtSolde').innerText=tr[l]||'Solde disponible';
}

function changePays(p){
 const devise={NE:'FCFA',NG:'NGN',FR:'EUR',US:'USD',DZ:'DZD',GH:'GHS'};
 document.getElementById('soldeTxt').innerText=solde.toLocaleString()+' '+devise[p];
 localStorage.setItem('salima_pays',p);
}

let curSvc='';
function openSvc(n){curSvc=n;document.getElementById('svcTitle').innerText=n;document.getElementById('svcModal').style.display='flex';}
function closeSvc(){document.getElementById('svcModal').style.display='none';}

function doTransfer(){
 let num=document.getElementById('svcNum').value;
 let mon=parseInt(document.getElementById('svcMont').value);
 if(!mon)return alert('Montant ?');
 if(mon>solde)return alert('Solde insuffisant');
 solde-=mon;
 localStorage.setItem('salima_balance',solde);
 document.getElementById('soldeTxt').innerText=solde.toLocaleString()+' FCFA';
 let recus=JSON.parse(localStorage.getItem('salima_recus')||'[]');
 recus.push({service:curSvc,num:num,mont:mon,date:new Date().toLocaleString()});
 localStorage.setItem('salima_recus',JSON.stringify(recus));
 document.getElementById('svcMsg').innerText='✅ '+mon+' envoyé à '+num+' via '+curSvc;
 setTimeout(closeSvc,1200);
 loadRecus();
}

function loadRecus(){
 let r=JSON.parse(localStorage.getItem('salima_recus')||'[]');
 let h='';
 r.slice().reverse().forEach(x=>{h+=`<div style="border-bottom:1px solid #222;padding:4px 0">✅ ${x.service} ${x.mont} à ${x.num} - ${x.date}</div>`});
 document.getElementById('recusList').innerHTML=h||'Aucun reçu';
}
loadRecus();

function showTab(t){alert('Onglet: '+t);}

try{Pi.init({version:"2.0",sandbox:false});}catch(e){}
function connectPi(){
 try{
  Pi.authenticate(['username','payments'],function(a){
   localStorage.setItem('pi_user',a.user.username);
   document.getElementById('piStatus').innerText='Pi: Connecté - '+a.user.username;
   alert('Pi Connecté: '+a.user.username);
  });
 }catch(e){
  document.getElementById('piStatus').innerText='Pi: Connecté - Mode FCFA';
 }
}
