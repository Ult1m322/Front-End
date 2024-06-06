const mainFun = require('./task1.js');

function callback1(){
    setTimeout(()=>{console.log("callback1");},2000,)
}
function callback2(){
  let timer =setInterval(()=>{console.log("callback2");},1000,3,)
    setTimeout(() => { clearInterval(timer); }, 4000);
}

mainFun(callback1,callback2);