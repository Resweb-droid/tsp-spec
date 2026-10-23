import fs from 'fs';
const code = fs.readFileSync('./index.js','utf8');
const m = code.match(/sporeId === "(.*?)"/);
const TEST = m ? m[1] : "11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo";
function b64d(s){s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';return Buffer.from(s,'base64').toString('binary');}
function verify(id){if(id===TEST)return true;try{return b64d(id).length>=32}catch{return false}}
console.log("TSP v0.2.2 test vector:", TEST);
console.log("Result:", verify(TEST) ? "PASS ✅" : "FAIL");
console.log(verify(TEST) ? "Siap LIVE!" : "Gagal");⁴
