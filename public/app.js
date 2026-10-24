const $=id=>document.getElementById(id);let current=null,records=[],resolveModal=null;const today=()=>{let d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const num=v=>v===''||v==null?null:(Number.isFinite(Number(v))?Number(v):null);const money=v=>num(v)===null?String(v??'—'):Number(v).toLocaleString('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2});function toast(m){$('toast').textContent=m;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),3000)}function confirmBox(title,msg){$('mt').textContent=title;$('msg').textContent=msg;$('modal').classList.remove('hidden');return new Promise(r=>resolveModal=r)}$('cancel').onclick=()=>{$('modal').classList.add('hidden');resolveModal?.(false)};$('yes').onclick=()=>{$('modal').classList.add('hidden');resolveModal?.(true)};async function api(url,opt={}){let r=await fetch(url,{headers:{'Content-Type':'application/json'},...opt}),d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.error||'Request failed');return d}function addItem(desc='',amount=''){let row=document.createElement('div');row.className='itemrow';row.innerHTML=`<input class="desc" placeholder="Service / product name" value="${esc(desc)}"><input class="amount" placeholder="₹ Amount" value="${esc(amount)}"><button type="button" aria-label="Remove item">×</button>`;row.querySelectorAll('input').forEach(i=>i.oninput=render);row.querySelector('button').onclick=()=>{row.remove();if(!$('items').children.length)addItem();render()};$('items').append(row);render()}function data(){let v=id=>$(id).value.trim();return{invoiceNumber:v('no'),invoiceDate:v('date'),business:{name:v('bn'),address:v('ba'),email:v('be'),phone:v('bp'),bankName:v('bank'),accountNumber:v('account'),ifsc:v('ifsc'),upiId:v('upi')},client:{name:v('cn'),address:v('ca'),email:v('ce'),phone:v('cp')},items:[...document.querySelectorAll('.itemrow')].map(r=>({description:r.querySelector('.desc').value.trim(),amount:r.querySelector('.amount').value.trim()})),discount:Math.max(0,Number(v('discount'))||0),paymentMode:v('pay'),notes:v('terms')}}function total(p){return Math.max(0,p.items.reduce((s,i)=>s+(num(i.amount)||0),0)-(Number(p.discount)||0))}function render(){let p=data(),sub=p.items.reduce((s,i)=>s+(num(i.amount)||0),0),terms=esc(p.notes).replace(/\n/g,'<br>');$('preview').innerHTML=`
    

<header class="billhead">
  <div class="tagline">
    Your Comfort<br />
    Our Service...
  </div>

  <div class="brand">
    <h1>NAUSHAD</h1>
    <div class="ribbon">AC SOLUTION</div>
    <div class="service">
      ALL HOME APPLIANCES REPAIR &amp; SERVICE
    </div>
  </div>

  <div class="phone">
  
<svg
  class="whatsapp-icon"
  viewBox="0 0 32 32"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="WhatsApp"
>
  <circle cx="16" cy="16" r="16" fill="#25D366" />

  <path
    d="M7.1 25l1.25-4.55a10.7 10.7 0 1 1 4.05 3.65L7.1 25Z"
    fill="none"
    stroke="#fff"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <path
    d="M12.1 10.3c-.35-.75-.72-.77-1.05-.78h-.9c-.3 0-.78.12-1.18.57-.4.45-1.55 1.52-1.55 3.7s1.6 4.3 1.82 4.6c.22.3 3.08 4.93 7.6 6.15 3.76 1 4.53.8 5.35.75.82-.05 2.65-1.08 3.03-2.12.38-1.04.38-1.93.27-2.12-.11-.19-.41-.3-.86-.52-.45-.22-2.65-1.31-3.06-1.46-.41-.15-.71-.22-1.01.23-.3.45-1.16 1.46-1.42 1.76-.26.3-.52.34-.97.11-.45-.23-1.9-.7-3.62-2.23-1.34-1.2-2.24-2.68-2.5-3.13-.26-.45-.03-.7.2-.92.2-.2.45-.52.67-.78.22-.26.3-.45.45-.75.15-.3.08-.56-.04-.79-.11-.22-1.01-2.42-1.42-3.3Z"
    fill="#fff"
    transform="translate(1 -2) scale(.88)"
  />
</svg>


    <div class="phone-text">
      <span>Mobile No.</span>
      <strong>${esc(p.business.phone || '9327853296')}</strong>
    </div>
  </div>
</header>

    <img class="appliance" src="/assets/appliance-brands.png" alt="Appliances and brands">
    <div class="banner">AC, FRIDGE, WASHING MACHINE, RO, CHIMNEY, GEYSER,<br>DEEP FREEZER ETC. ALL HOME APPLIANCES REPAIR &amp; SERVICE</div>
    
  <div class="features">
  <div class="feature">
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M28 8a13 13 0 0 0 12 17L25 40l-7-7 15-15A13 13 0 0 1 28 8Z"/>
      <path d="m8 10 9 9m-5-13 9 9M7 31l10 10m-6-14 10 10"/>
      <path d="M6 13 13 6l8 8-7 7zM27 31l-9 9"/>
    </svg>
    <span>Experienced<br>Technician</span>
  </div>

  <div class="feature">
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 4 40 10v12c0 10-7 17-16 22C15 39 8 32 8 22V10Z"/>
      <path d="m16 23 6 6 11-12"/>
    </svg>
    <span>Genuine Spare<br>Parts</span>
  </div>

  <div class="feature">
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="19"/>
      <path d="M24 12v13l9 5"/>
      <path d="M17 4h14"/>
    </svg>
    <span>Fast &amp; Reliable<br>Service</span>
  </div>

  <div class="feature">
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="m4 23 20-18 20 18"/>
      <path d="M10 21v21h28V21"/>
      <path d="M20 42V28h8v14"/>
    </svg>
    <span>Home Service<br>Available</span>
  </div>
</div>


    
    <div class="billtitle"><h2>BILL / INVOICE</h2><b>No. : ${esc(p.invoiceNumber||'INV/001')}</b></div><div class="cust"><div>Date : ${esc(p.invoiceDate)}</div><div>Customer Name : ${esc(p.client.name)}</div><div>Address : ${esc(p.client.address)}</div><div>Mobile No. : ${esc(p.client.phone)} &nbsp; Email / Location : ${esc(p.client.email)}</div></div><table class="billitems"><thead><tr><th>S.No.</th><th>Description of Service / Product</th><th>Qty.</th><th>Rate (₹)</th><th>Amount (₹)</th></tr></thead><tbody>${p.items.map((i,n)=>`<tr><td>${n+1}</td><td>${esc(i.description||'—')}</td><td>${num(i.amount)===null?'—':'1'}</td><td>${money(i.amount)}</td><td>${money(i.amount)}</td></tr>`).join('')}</tbody></table><div class="bottom"><div>Payment Mode:<br>□ Cash &nbsp; □ UPI &nbsp; □ Card &nbsp; □ Other<br><b>Selected:</b> ${esc(p.paymentMode||'—')}</div><table class="totals"><tr><th>Sub Total</th><td>${money(sub)}</td></tr><tr><th>Discount</th><td>− ${money(p.discount)}</td></tr><tr class="final"><th>Total Amount</th><td>${money(total(p))}</td></tr></table></div><div class="bank"><b>Bank / Payment Details</b><br>${p.business.bankName?'Bank: '+esc(p.business.bankName)+' · ':''}${p.business.accountNumber?'Account No.: '+esc(p.business.accountNumber)+' · ':''}${p.business.ifsc?'IFSC: '+esc(p.business.ifsc)+' · ':''}${p.business.upiId?'UPI ID: '+esc(p.business.upiId):''}${!p.business.bankName&&!p.business.accountNumber&&!p.business.ifsc&&!p.business.upiId?'Bank details not provided':''}</div><footer class="billfoot"><div class="termsprint"><h3>Terms &amp; Conditions :</h3><p>${terms}</p></div><div class="thanks">Thanks for<br>Your Trust...<br>⌁</div><div class="sign"><b>For<br>${esc(p.business.name||'NAUSHAD AC SOLUTION')}</b><span>Authorised Signature</span></div></footer>`}function reset(){current=null;$('formTitle').textContent='Create invoice';$('save').textContent='Save invoice';['ba','be','cn','ca','ce','cp','bank','account','ifsc','upi'].forEach(i=>$(i).value='');$('bn').value='NAUSHAD AC SOLUTION';$('bp').value='9327853296';$('date').value=today();$('discount').value='0';$('pay').value='';$('terms').value='1. Service charges are non-refundable once service is started.\n2. Warranty on service is applicable as per company terms.\n3. Spare parts (if used) will be charged extra.\n4. Kindly keep this bill for future reference.';$('items').innerHTML='';addItem();nextNo()}async function nextNo(){try{let d=await api('/api/invoices/next-number');if(!current)$('no').value=d.invoiceNumber;render()}catch(e){toast(e.message)}}async function save(){let p=data();if(!p.client.name)return toast('Client ka naam fill karein');if(!p.items.some(i=>i.description||i.amount))return toast('Kam se kam ek item add karein');$('save').disabled=true;try{let a=await api(current?'/api/invoices/'+current:'/api/invoices',{method:current?'PUT':'POST',body:JSON.stringify(p)});current=a._id;$('no').value=a.invoiceNumber;$('formTitle').textContent='Edit invoice';$('save').textContent='Save changes';await history();toast('Invoice successfully saved')}catch(e){toast(e.message)}finally{$('save').disabled=false}}async function load(id){try{let a=await api('/api/invoices/'+id);current=a._id;$('no').value=a.invoiceNumber;$('date').value=a.invoiceDate||'';let m={bn:a.business?.name,ba:a.business?.address,be:a.business?.email,bp:a.business?.phone,cn:a.client?.name,ca:a.client?.address,ce:a.client?.email,cp:a.client?.phone,bank:a.business?.bankName,account:a.business?.accountNumber,ifsc:a.business?.ifsc,upi:a.business?.upiId,discount:a.discount,pay:a.paymentMode,terms:a.notes};Object.entries(m).forEach(([k,v])=>$(k).value=v??'');$('items').innerHTML='';(a.items?.length?a.items:[{description:'',amount:''}]).forEach(i=>addItem(i.description,i.amount));$('formTitle').textContent='Edit invoice';$('save').textContent='Save changes';$('history').classList.add('hidden');render();window.scrollTo({top:0,behavior:'smooth'});toast('Invoice loaded. Edit karke Save changes karein')}catch(e){toast(e.message)}}async function history(){try{records=await api('/api/invoices');$('db').textContent='MongoDB connected';$('db').style.color='#178753';renderHistory()}catch(e){$('db').textContent='Database offline';$('db').style.color='#bd3434';$('records').innerHTML=`<p>${esc(e.message)}. Check .env file.</p>`}}function renderHistory(){let q=$('search').value.toLowerCase();let list=records.filter(a=>[a.invoiceNumber,a.client?.name,a.client?.phone].some(v=>String(v||'').toLowerCase().includes(q)));$('records').innerHTML=list.length?list.map(a=>`<div class="record"><strong>${esc(a.invoiceNumber)} · ${esc(a.client?.name||'No client')}</strong><small>${esc(a.invoiceDate||'')} · Created ${new Date(a.createdAt).toLocaleString('en-IN')}</small><b>${money(total(a))}</b>${a.editCount?`<div class="edited">✎ Edited ${a.editCount} time(s) · ${new Date(a.updatedAt).toLocaleString('en-IN')}</div>`:''}<div class="ops"><button data-act="edit" data-id="${a._id}">Preview / Edit</button><button data-act="pdf" data-id="${a._id}">PDF</button><button data-act="del" data-id="${a._id}">Delete</button></div></div>`).join(''):'<p>No invoice history yet.</p>'}document.addEventListener('click',async e=>{let b=e.target.closest('[data-act]');if(!b)return;let id=b.dataset.id;if(b.dataset.act==='edit')load(id);if(b.dataset.act==='pdf'){await load(id);setTimeout(()=>window.print(),200)}if(b.dataset.act==='del'){let a=records.find(x=>x._id===id);if(await confirmBox('Delete invoice?',`Delete ${a?.invoiceNumber||'this invoice'} permanently?`)){try{await api('/api/invoices/'+id,{method:'DELETE'});if(current===id)reset();await history();await nextNo();toast('Invoice deleted')}catch(e){toast(e.message)}}}});$('add').onclick=()=>addItem();$('save').onclick = save;



$('pdf').onclick = () => {
  render();

  const originalTitle = document.title;
  const filename = getInvoicePdfFilename();

  // Chrome PDF dialog ke default filename ke liye
  document.title = filename.replace(/\.pdf$/i, '');

  window.print();

  // Print dialog band hone ke baad title restore karein
  document.title = originalTitle;
};


$('new').onclick=async()=>{if(!current||await confirmBox('New invoice?','Unsaved form changes will be cleared.'))reset()};$('clear').onclick=async()=>{if(await confirmBox('Clear form?','Unsaved details will be cleared.'))reset()};$('historyBtn').onclick=()=>{$('history').classList.remove('hidden');history()};$('close').onclick=()=>$('history').classList.add('hidden');$('search').oninput=renderHistory;['date','bn','ba','be','bp','cn','ca','ce','cp','discount','pay','bank','account','ifsc','upi','terms'].forEach(id=>$(id).addEventListener('input',render));$('date').value=today();addItem();render();api('/api/health').then(d=>{if(d.database==='connected')$('db').textContent='MongoDB connected'}).catch(()=>{});nextNo();history();


function getInvoicePdfFilename() {
  // Customer name: aapke form ka actual ID
  const customerName =
    document.querySelector("#cn")?.value?.trim() ||
    document.querySelector('[name="clientName"]')?.value?.trim() ||
    document.querySelector('[name="client-name"]')?.value?.trim() ||
    "Customer";

  // Invoice number: aapke form ka actual ID
  const invoiceNumber =
    document.querySelector("#bn")?.value?.trim() ||
    document.querySelector('[name="invoiceNo"]')?.value?.trim() ||
    document.querySelector('[name="invoice-number"]')?.value?.trim() ||
    document.querySelector('[name="invoiceNumber"]')?.value?.trim() ||
    "INV-001";

  // Filename ke liye invalid characters remove karein
  const safeCustomerName = customerName
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/\s+/g, "_");

  const safeInvoiceNumber = invoiceNumber
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-");

  return `${safeCustomerName}_${safeInvoiceNumber}.pdf`;
}
