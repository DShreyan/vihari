function PValidation(){
    var pass = document.getElementById('password');
    const ip=document.getElementById('invalid-password');
    if( pass.value=="" ||pass.value==null){
        ip.innerHTML="Password required";
        ip.style.display="block";
        return false;
        }
    if(pass.value.length<5){
        ip.innerHTML="Password is too short";
        ip.style.display="block";
        return false;
    } 
    if(pass.value.length>15){
        ip.innerHTML="Password is too long";
        ip.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!pass.value.match(pattern)){
        ip.innerHTML="Atleast one special character needed";
        ip.style.display="block";
        return false;
    }
    else {
        ip.style.display="none";
        return true; 
    }
}

function FnameValidation(){
    var fname = document.getElementById('f-name');
    const ifname = document.getElementById('invalid-fname');
    if(fname.value==""|| fname.value==null){
        ifname.innerHTML="First name required";
        ifname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(fname.value.match(pattern)){
        ifname.innerHTML="No special characters are allowed ";
        ifname.style.display="block";
        return false;
    }
   else {
    ifname.style.display="none";
    return true;
   }
}
function LnameValidation(){
    var lname = document.getElementById('lname');
    var ilname = document.getElementById('invalid-lname');
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(lname.value.match(pattern)){
        ilname.innerHTML="No special characters are allowed ";
        ilname.style.display="block";
        return false; 
    } 
    else {
        ilname.style.display="none";
        return true;
       } 
}
function CPValidation(){
    var cpname = document.getElementById('cpassword');
    var icpname = document.getElementById('invalid-cp');
    var pass = document.getElementById('password');
    if(cpname.value=="" || cpname.value==null){
        icpname.innerHTML="*Required field ";
        icpname.style.display="block";
        return false;
    }
    if(pass.value != cpname.value){
        icpname.innerHTML="*Password mismatch";
        icpname.style.display="block";
        return false; 
    }
    else {
        icpname.style.display="none";
        return true;
       }
    }
  function EmailValidation(){
    var email = document.getElementById('email');
    var iemail = document.getElementById('invalid-email');
    if(email.value==null || email.value==''){
     iemail.style.display="block";
     iemail.innerHTML="Required field";
     return false;
    }
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!(email.value.match(pattern))){
     iemail.style.display="block";
     iemail.innerHTML="Invalid email format";
     return false;
    }
    else {
     iemail.style.display="none";
     return true;
    }
   }
function tnamevalidation(){
    var tname = document.getElementById('t-name');
    const itname = document.getElementById('invalid-tname');
    if(tname.value==""|| tname.value==null){
        itname.innerHTML="All fields required";
        itname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(tname.value.match(pattern)){
        itname.innerHTML="No special characters are allowed ";
        itname.style.display="block";
        return false;
    }
   else {
    itname.style.display="none";
    return true;
   }
}
function visitingplace1validation(){
    var vname = document.getElementById('vp1');
    const ivname = document.getElementById('invalid-vp1');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(vname.value.match(pattern)){
        ivname.innerHTML="No special characters are allowed ";
        ivname.style.display="block";
        return false;
    }
   else {
    ivname.style.display="none";
    return true;
   }
}
function visitingplace2validation(){
    var vname = document.getElementById('vp2');
    const ivname = document.getElementById('invalid-vp2');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(vname.value.match(pattern)){
        ivname.innerHTML="No special characters are allowed ";
        ivname.style.display="block";
        return false;
    }
   else {
    ivname.style.display="none";
    return true;
   }
}
function description1validation(){
    var vname = document.getElementById('d1');
    const ivname = document.getElementById('invalid-d1');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    
   else {
    ivname.style.display="none";
    return true;
   }
}
function description2validation(){
    var vname = document.getElementById('d2');
    const ivname = document.getElementById('invalid-d2');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    
   else {
    ivname.style.display="none";
    return true;
   }
}
function sourcevalidation(){
    var vname = document.getElementById('source');
    const ivname = document.getElementById('invalid-source');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(vname.value.match(pattern)){
        ivname.innerHTML="No special characters are allowed ";
        ivname.style.display="block";
        return false;
    }
   else {
    ivname.style.display="none";
    return true;
   }
}
function destinationvalidation(){
    var vname = document.getElementById('destination');
    const ivname = document.getElementById('invalid-destination');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(vname.value.match(pattern)){
        ivname.innerHTML="No special characters are allowed ";
        ivname.style.display="block";
        return false;
    }
   else {
    ivname.style.display="none";
    return true;
   }
}
function travelsvalidation(){
    var vname = document.getElementById('trname');
    const ivname = document.getElementById('invalid-trname');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(vname.value.match(pattern)){
        ivname.innerHTML="No special characters are allowed ";
        ivname.style.display="block";
        return false;
    }
   else {
    ivname.style.display="none";
    return true;
   }
}
function tktpricevalidation(){
    var vname = document.getElementById('tktprice');
    const ivname = document.getElementById('invalid-tktprice');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(vname.value.match(pattern)){
        ivname.innerHTML="No special characters are allowed ";
        ivname.style.display="block";
        return false;
    }
   else {
    ivname.style.display="none";
    return true;
   }
}
function bustypevalidation(){
    var vname = document.getElementById('bustype');
    const ivname = document.getElementById('invalid-bustype');
    if(vname.value==""|| vname.value==null){
        ivname.innerHTML="All fields required";
        ivname.style.display="block";
        return false;
    }
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(vname.value.match(pattern)){
        ivname.innerHTML="No special characters are allowed ";
        ivname.style.display="block";
        return false;
    }
   else {
    ivname.style.display="none";
    return true;
   }
}
function pnumvalidation(){
    var pnum = document.getElementById('mnum');
    var ipnum = document.getElementById('invalid-mnum');
    if(pnum.value==""|| pnum.value==null){
        ipnum.innerHTML="All fields required";
        ipnum.style.display="block";
        return false;
    }
    var pattern = /^\d{10}$/;
    if(!pnum.value.match(pattern)){
        ipnum.innerHTML="Length should be 10 digits";
        ipnum.style.display="block";
        return false;
    }
   else {
    ipnum.style.display="none";
    return true;
   }
}
function msgvalidation(){
    var msg = document.getElementById('msg');
    var imsg = document.getElementById('invalid-msg');
    if(msg.value==""|| msg.value==null){
        imsg.innerHTML="All fields required";
        imsg.style.display="block";
        return false;
    }
   else {
    imsg.style.display="none";
    return true;
   }
}