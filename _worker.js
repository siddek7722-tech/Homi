// HOMI BACKEND — Cloudflare Pages Advanced Mode
// Upload this file as "_worker.js" beside "index.html" in the GitHub root.
// Cloudflare production configuration: HOMI_DB D1 binding, ADMIN_PASSWORD,
// ADMIN_SESSION_SECRET encrypted secrets. Never put passwords in this file.
// Orders cannot be submitted before database + secrets are configured.
// Automatically initializes empty D1 databases with the starter 23 products.


const HOMI_DATABASE_SCHEMA = `-- Homi Cloudflare D1 database schema and initial 23 products.
-- Product prices deliberately start NULL; set real prices in the admin panel.
-- Safe for repeated execution: initial product rows use INSERT OR IGNORE.
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '🛍️',
  color TEXT NOT NULL DEFAULT '#E5F1E5',
  description TEXT DEFAULT '',
  price REAL DEFAULT NULL,
  stock_status TEXT NOT NULL DEFAULT 'available',
  featured INTEGER NOT NULL DEFAULT 0,
  display_order INTEGER NOT NULL DEFAULT 999,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  items_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'নতুন',
  subtotal REAL DEFAULT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE TABLE IF NOT EXISTS admin_attempts (
  ip_key TEXT PRIMARY KEY,
  failures INTEGER NOT NULL DEFAULT 0,
  locked_until INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('potato','আলু','সবজি','কেজি','🥔','#F6E6C8','প্রতিদিনের রান্নার জন্য',NULL,'available',1,1);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('onion','পেঁয়াজ','মসলা','কেজি','🧅','#F9E1DF','রান্নার নিত্যসঙ্গী',NULL,'available',1,2);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('ginger','আদা','মসলা','২৫০ গ্রাম','🫚','#F7E8C8','রান্না ও চায়ের জন্য',NULL,'available',0,3);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('garlic','রসুন','মসলা','২৫০ গ্রাম','🧄','#F0E8E2','রান্নার স্বাদ বাড়াতে',NULL,'available',0,4);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('hen-egg','মুরগির ডিম','ডিম','হালি (৪টি)','🥚','#F5E8D5','প্রতি হালিতে চারটি',NULL,'available',1,5);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('duck-egg','হাঁসের ডিম','ডিম','হালি (৪টি)','🥚','#E3EDF0','প্রতি হালিতে চারটি',NULL,'available',0,6);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('bottle-leaf','লাউশাক','শাক','আঁটি','🥬','#E7F1D7','সবুজ শাকপাতা',NULL,'available',0,7);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('water-spinach','কলমিশাক','শাক','আঁটি','🌿','#DFF2E1','সবুজ শাকপাতা',NULL,'available',0,8);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('malabar-spinach','পুঁইশাক','শাক','আঁটি','🥬','#E5F3D9','সবুজ শাকপাতা',NULL,'available',0,9);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('red-spinach','লালশাক','শাক','আঁটি','🍃','#F6DCE6','পুষ্টিকর শাকপাতা',NULL,'available',0,10);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('eggplant','বেগুন','সবজি','কেজি','🍆','#EDE3F7','বিভিন্ন রান্নায়',NULL,'available',1,11);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('tomato','টমেটো','সবজি','কেজি','🍅','#FFE1D8','সালাদ ও রান্নায়',NULL,'available',1,12);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('cucumber','শসা','সবজি','কেজি','🥒','#E3F1D8','সালাদে দারুণ',NULL,'available',0,13);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('ash-gourd','চালকুমড়া','সবজি','পিস','🎃','#E5F1DD','ঘরোয়া রান্নায়',NULL,'available',0,14);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('carrot','গাজর','সবজি','কেজি','🥕','#FFE8D6','সালাদ ও রান্নায়',NULL,'available',0,15);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('bottle-gourd','লাউ','সবজি','পিস','🥒','#E5F2D8','প্রিয় দেশি সবজি',NULL,'available',1,16);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('beans','শিম','সবজি','কেজি','🫛','#E6F3DC','রান্নার জন্য',NULL,'available',0,17);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('bitter-gourd','করলা','সবজি','কেজি','🥒','#DBECCD','দেশি সবজি',NULL,'available',0,18);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('okra','ঢেঁড়স','সবজি','কেজি','🌿','#E1F0D8','ভাজি ও তরকারিতে',NULL,'available',0,19);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('pointed-gourd','পটল','সবজি','কেজি','🥒','#E5F2D7','দেশি সবজি',NULL,'available',0,20);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('lemon','লেবু','অন্যান্য','হালি (৪টি)','🍋','#FCF2CE','ভাত ও সালাদে',NULL,'available',0,21);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('green-chili','কাঁচামরিচ','মসলা','২৫০ গ্রাম','🌶️','#E4F1DB','রান্নার ঝাঁজ বাড়াতে',NULL,'available',0,22);
INSERT OR IGNORE INTO products (id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES ('raw-papaya','কাঁচা পেঁপে','সবজি','কেজি','🥭','#ECF2D6','তরকারি ও রান্নায়',NULL,'available',0,23);
`;

async function ensureDatabase(db) {
  const result = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('products','orders','admin_attempts')").all();
  const names = new Set((result.results || []).map(row => row.name));
  if (['products','orders','admin_attempts'].some(name => !names.has(name))) {
    await db.exec(HOMI_DATABASE_SCHEMA);
  }
}

// Homi Cloudflare Pages Function: /api/*
// Bind a Cloudflare D1 database to the variable HOMI_DB.
// Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET as encrypted environment secrets.
// This file is server-side only. Never move credentials into index.html.

const CATEGORIES = ['সবজি', 'শাক', 'ডিম', 'মসলা', 'অন্যান্য'];
const STATUSES = ['নতুন', 'নিশ্চিত', 'প্রস্তুত হচ্ছে', 'ডেলিভারিতে', 'সম্পন্ন', 'বাতিল'];
const COOKIE = 'homi_admin';
const SESSION_SECONDS = 8 * 60 * 60;
const encoder = new TextEncoder();

function reply(data, status=200, headers={}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      ...headers,
    },
  });
}
const fail = (message,status=400) => reply({error:message},status);
const str = (value, max=500) => String(value??'').trim().slice(0,max+1);
const normalizePhone = value => String(value??'')
  .replace(/[০-৯]/g, n => String('০১২৩৪৫৬৭৮৯'.indexOf(n)))
  .replace(/[\s-]/g,'').replace(/^\+88/,'').replace(/^88(?=01)/,'');
const validPhone = value => /^01[3-9][0-9]{8}$/.test(value);
const expectedOrigin = request => new URL(request.url).origin;
function validOrigin(request) {
  const origin=request.headers.get('Origin');
  return !origin || origin===expectedOrigin(request);
}
async function bodyJson(request) {
  const length = Number(request.headers.get('Content-Length')||0);
  if(length>20000)throw new Error('অনুরোধ অনেক বড় হয়েছে।');
  const raw = await request.text();
  if(raw.length>20000)throw new Error('অনুরোধ অনেক বড় হয়েছে।');
  try{return JSON.parse(raw)}catch{throw new Error('সঠিক তথ্য পাঠানো হয়নি।')}
}
function base64url(bytes) {
  const array=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes);
  let binary='';for(const b of array)binary+=String.fromCharCode(b);
  return btoa(binary).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
}
async function mac(secret,message) {
  const key=await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  return base64url(await crypto.subtle.sign('HMAC',key,encoder.encode(message)));
}
function safeEquals(a,b){
  if(typeof a!=='string'||typeof b!=='string')return false;
  const x=encoder.encode(a),y=encoder.encode(b);
  if(x.length!==y.length)return false;
  let diff=0;for(let i=0;i<x.length;i++)diff|=x[i]^y[i];
  return diff===0;
}
async function makeSession(secret) {
  const payload=base64url(encoder.encode(JSON.stringify({v:1,exp:Math.floor(Date.now()/1000)+SESSION_SECONDS})));
  const signature=await mac(secret,payload);
  return `${payload}.${signature}`;
}
async function verifySession(request,secret) {
  if(!secret)return false;
  const cookie=request.headers.get('Cookie')||'';
  const token=cookie.split(';').map(p=>p.trim()).find(p=>p.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);
  if(!token)return false;
  const [encoded,signature,...extra]=token.split('.');
  if(!encoded||!signature||extra.length)return false;
  const check=await mac(secret,encoded);
  if(!safeEquals(check,signature))return false;
  try{
    const raw=atob(encoded.replaceAll('-','+').replaceAll('_','/') + '='.repeat((4-encoded.length%4)%4));
    const data=JSON.parse(raw);
    return data.v===1 && Number.isInteger(data.exp) && data.exp>Math.floor(Date.now()/1000);
  }catch{return false;}
}
function isConfigured(env) {return !!(env.HOMI_DB && env.ADMIN_PASSWORD && env.ADMIN_SESSION_SECRET && env.ADMIN_PASSWORD.length>=12 && env.ADMIN_SESSION_SECRET.length>=32);}
function orderFromRow(row) {
  return {...row,items:JSON.parse(row.items_json||'[]'),items_json:undefined};
}
function orderId(){
  const day=new Date().toISOString().slice(0,10).replaceAll('-','');
  const random=[...crypto.getRandomValues(new Uint8Array(7))].map(n=>n.toString(16).padStart(2,'0')).join('').toUpperCase();
  return `HM-${day}-${random}`;
}
async function listProducts(db) {
  const {results}=await db.prepare('SELECT id,name,category,unit,emoji,color,description AS "desc",price,stock_status,featured,display_order FROM products ORDER BY display_order ASC,id ASC').all();
  return results.map(p=>({...p,featured:!!p.featured}));
}
async function createOrder(db,input) {
  const name=str(input?.name,100),phone=normalizePhone(input?.phone),address=str(input?.address,500),note=str(input?.note,500);
  if(name.length<2||name.length>100)return fail('নাম সঠিকভাবে লিখুন।');
  if(!validPhone(phone))return fail('সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন।');
  if(address.length<10||address.length>500)return fail('সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন।');
  if(note.length>500)return fail('নির্দেশনা ৫০০ অক্ষরের মধ্যে লিখুন।');
  if(input?.delivery_area_confirmed!==true)return fail('বরিশাল শহরের ডেলিভারি শর্ত নিশ্চিত করুন।');
  const items=input?.items;
  if(!Array.isArray(items)||items.length===0||items.length>30)return fail('কার্টের পণ্য সঠিক নয়।');
  const clean=[];const seen=new Set();
  for(const it of items) {
    if(!it||typeof it.id!=='string'||it.id.length>90||!Number.isInteger(it.qty)||it.qty<1||it.qty>30||seen.has(it.id))return fail('কার্টের পণ্যের পরিমাণ সঠিক নয়।');
    seen.add(it.id);clean.push({id:it.id,qty:it.qty});
  }
  if(clean.reduce((n,it)=>n+it.qty,0)>120)return fail('একটি অর্ডারে সর্বোচ্চ ১২০টি ইউনিট দেওয়া যাবে।');
  const placeholders=clean.map(()=>'?').join(',');
  const {results}=await db.prepare(`SELECT id,name,unit,price,stock_status FROM products WHERE id IN (${placeholders})`).bind(...clean.map(it=>it.id)).all();
  const records=new Map(results.map(p=>[p.id,p]));
  const lines=[];let subtotal=0,missingPrice=false;
  for(const item of clean){
    const p=records.get(item.id);
    if(!p)return fail('কার্টে এমন পণ্য আছে যা বর্তমানে পাওয়া যাচ্ছে না।');
    if(p.stock_status==='out_of_stock')return fail(`${p.name} আপাতত স্টকে নেই। কার্ট থেকে সরিয়ে আবার অর্ডার দিন।`);
    const price=typeof p.price==='number'&&Number.isFinite(p.price)&&p.price>0?p.price:null;
    lines.push({id:p.id,name:p.name,unit:p.unit,qty:item.qty,price});
    if(price===null)missingPrice=true;else subtotal+=price*item.qty;
  }
  const actualTotal=missingPrice?null:Math.round(subtotal*100)/100;
  const id=orderId();
  const now=new Date().toISOString();
  await db.prepare('INSERT INTO orders(id,customer_name,phone,address,note,items_json,status,subtotal,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)')
    .bind(id,name,phone,address,note,JSON.stringify(lines),'নতুন',actualTotal,now,now).run();
  return reply({order:{id,customer_name:name,phone,items:lines,status:'নতুন',subtotal:actualTotal,created_at:now}},201);
}
async function getTracking(db,query) {
  const id=str(query.searchParams.get('id'),60).toUpperCase();
  const phone=normalizePhone(query.searchParams.get('phone'));
  if(!id||!validPhone(phone))return fail('সঠিক অর্ডার নম্বর ও মোবাইল নম্বর লিখুন।');
  const row=await db.prepare('SELECT id,status,subtotal,items_json,created_at FROM orders WHERE id=? AND phone=? LIMIT 1').bind(id,phone).first();
  if(!row)return fail('অর্ডার পাওয়া যায়নি।',404);
  const items=JSON.parse(row.items_json||'[]');
  return reply({order:{id:row.id,status:row.status,subtotal:row.subtotal,created_at:row.created_at,items_count:items.length}});
}
async function login(request,env) {
  if(!env.ADMIN_PASSWORD||!env.ADMIN_SESSION_SECRET)return fail('অ্যাডমিন সার্ভার প্রস্তুত নয়।',503);
  const incoming=await bodyJson(request);
  const provided=str(incoming?.password,300);
  const remoteIp=request.headers.get('CF-Connecting-IP')||request.headers.get('X-Real-IP')||'unknown';
  const ipHash=await mac(env.ADMIN_SESSION_SECRET,remoteIp);
  const now=Math.floor(Date.now()/1000);
  const guard=await env.HOMI_DB.prepare('SELECT failures,locked_until FROM admin_attempts WHERE ip_key=?').bind(ipHash).first();
  if(guard && guard.locked_until>now)return fail('অতিরিক্ত লগইন চেষ্টা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।',429);
  if(!provided||!safeEquals(provided,env.ADMIN_PASSWORD)){
    const failures=(guard?.failures||0)+1;
    const lockedUntil=failures>=5?now+900:0;
    await env.HOMI_DB.prepare('INSERT INTO admin_attempts(ip_key,failures,locked_until,updated_at) VALUES(?,?,?,?) ON CONFLICT(ip_key) DO UPDATE SET failures=excluded.failures,locked_until=excluded.locked_until,updated_at=excluded.updated_at')
      .bind(ipHash,failures>=5?0:failures,lockedUntil,now).run();
    return fail('ভুল পাসওয়ার্ড।',401);
  }
  await env.HOMI_DB.prepare('DELETE FROM admin_attempts WHERE ip_key=?').bind(ipHash).run();
  const token=await makeSession(env.ADMIN_SESSION_SECRET);
  const cookie=`${COOKIE}=${token}; Max-Age=${SESSION_SECONDS}; Path=/api; HttpOnly; Secure; SameSite=Strict`;
  return reply({ok:true},200,{'Set-Cookie':cookie});
}
async function adminGetOrders(db) {
  const {results}=await db.prepare('SELECT id,customer_name,phone,address,note,items_json,status,subtotal,created_at FROM orders ORDER BY created_at DESC LIMIT 100').all();
  return reply({orders:results.map(orderFromRow)});
}
async function adminUpdateStatus(db,input) {
  const id=str(input?.id,80);const status=str(input?.status,40);
  if(!id||!STATUSES.includes(status))return fail('স্ট্যাটাস সঠিক নয়।');
  const result=await db.prepare('UPDATE orders SET status=?,updated_at=? WHERE id=?').bind(status,new Date().toISOString(),id).run();
  if(!result.meta?.changes)return fail('অর্ডার পাওয়া যায়নি।',404);
  return reply({ok:true});
}
async function adminUpdateProduct(db,input) {
  const id=str(input?.id,90);const stock=str(input?.stock_status,30);
  const price=input?.price;
  if(!id || !['available','out_of_stock'].includes(stock))return fail('পণ্যের তথ্য সঠিক নয়।');
  if(price!==null && (typeof price!=='number'||!Number.isFinite(price)||price<=0||price>100000))return fail('দাম সঠিক নয়।');
  const result=await db.prepare('UPDATE products SET price=?,stock_status=? WHERE id=?').bind(price,stock,id).run();
  if(!result.meta?.changes)return fail('পণ্য পাওয়া যায়নি।',404);
  return reply({ok:true});
}
async function adminAddProduct(db,input) {
  const id=str(input?.id,90),name=str(input?.name,70),unit=str(input?.unit,30),category=str(input?.category,30);
  const desc=str(input?.desc,80),emoji=str(input?.emoji,8)||'🛍️';
  const color=String(input?.color||'#E5F1E5');
  const price=input?.price;
  if(!/^item-[a-z0-9-]{5,75}$/i.test(id)||name.length<2||name.length>70||unit.length<1||unit.length>30||!CATEGORIES.includes(category)||desc.length>80||!/^(#[0-9a-f]{6})$/i.test(color))return fail('নতুন পণ্যের তথ্য সঠিক নয়।');
  if(price!==null&&(typeof price!=='number'||!Number.isFinite(price)||price<=0||price>100000))return fail('দাম সঠিক নয়।');
  try{
    await db.prepare('INSERT INTO products(id,name,category,unit,emoji,color,description,price,stock_status,featured,display_order) VALUES(?,?,?,?,?,?,?,?,?,?,?)')
      .bind(id,name,category,unit,emoji,color,desc,price,'available',0,999).run();
  }catch{return fail('এই পণ্যটি যোগ করা যায়নি। আবার চেষ্টা করুন।',409);}
  return reply({product:{id,name,category,unit,emoji,color,desc,price,stock_status:'available',featured:false,display_order:999}},201);
}
async function onRequest(context) {
  const {request,env}=context;
  const url=new URL(request.url);
  const path=url.pathname.replace(/^\/api\/?/,'').replace(/\/$/,'');
  const method=request.method.toUpperCase();
  if(method==='OPTIONS')return fail('এই রুটে CORS অনুমোদিত নয়।',405);
  if(!['GET','HEAD'].includes(method)&&!validOrigin(request))return fail('এই উৎস থেকে অনুরোধ অনুমোদিত নয়।',403);
  if(!isConfigured(env))return fail('সার্ভার কনফিগারেশন সম্পূর্ণ হয়নি।',503);
  try{
    await ensureDatabase(env.HOMI_DB);
    if(path==='health'&&method==='GET')return reply({ready:true,version:1});
    if(path==='products'&&method==='GET')return reply({products:await listProducts(env.HOMI_DB)});
    if(path==='orders'&&method==='POST')return createOrder(env.HOMI_DB,await bodyJson(request));
    if(path==='track'&&method==='GET')return getTracking(env.HOMI_DB,url);
    if(path==='admin/login'&&method==='POST')return login(request,env);
    if(path==='admin/logout'&&method==='POST')return reply({ok:true},200,{'Set-Cookie':`${COOKIE}=; Max-Age=0; Path=/api; HttpOnly; Secure; SameSite=Strict`});
    if(path.startsWith('admin/')){
      if(!(await verifySession(request,env.ADMIN_SESSION_SECRET)))return fail('লগইন করুন।',401);
      if(path==='admin/session'&&method==='GET')return reply({ok:true});
      if(path==='admin/orders'&&method==='GET')return adminGetOrders(env.HOMI_DB);
      if(path==='admin/order-status'&&method==='PATCH')return adminUpdateStatus(env.HOMI_DB,await bodyJson(request));
      if(path==='admin/products'&&method==='PATCH')return adminUpdateProduct(env.HOMI_DB,await bodyJson(request));
      if(path==='admin/products'&&method==='POST')return adminAddProduct(env.HOMI_DB,await bodyJson(request));
    }
    return fail('অনুরোধটি পাওয়া যায়নি।',404);
  }catch(error){
    console.error('Homi API error:',String(error?.message||error));
    if(error?.message?.includes('অনুরোধ অনেক বড়')||error?.message?.includes('সঠিক তথ্য'))return fail(error.message,400);
    return fail('সার্ভারে সাময়িক সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।',500);
  }
}


// Advanced mode handles only /api/*; Cloudflare serves the site's HTML and assets.
export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    if (path === '/api' || path.startsWith('/api/')) {
      return onRequest({ request, env, ctx });
    }
    return env.ASSETS.fetch(request);
  },
};
