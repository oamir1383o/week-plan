// variables
var addBTN = document.getElementById('addBTN');
var addMenu = document.getElementsByClassName('add')[0];
var backBTN = document.getElementById('backBTN');
var inp1 = document.getElementById('one');
var inp2 = document.getElementById('two');
var inp3 = document.getElementById('three');
var inp4 = document.getElementById('four');
var inp5 = document.getElementById('five');
var submit = document.getElementById('sub');
var items = document.getElementsByClassName('items')[0];

//Events
addBTN.addEventListener("click" , openAdd );
backBTN.addEventListener("click" , backPage);
submit.addEventListener("click" , limit);


//functions
// برای باز کردن منوی وارد کردن اطلاعات ماموریت
function openAdd(){
addMenu.classList.toggle('hidden');
if(addBTN.getAttribute('src') === 'icons/add.png'){
addBTN.setAttribute('src', 'icons/close.png');
addBTN.style.boxShadow = '2px 2px 4px inset';}
else if(addBTN.getAttribute('src') !== 'icons/add.png'){
    addBTN.setAttribute('src', 'icons/add.png');
    addBTN.style.boxShadow = 'none';}
}
// برای برگشتن به صفحه ی اول برنامه
function backPage(){
    window.location.href="index.html"
}
// برای محدودیت های ورودی ها
function limit(){
    var a = inp2.value.length
    var b = inp4.value.length
    var yekaWord = inp3.value.split(' ').length;
    var nameWord = inp1.value.split(' ').length;
    if (a > 2 || b > 2 ||
        inp1.value === "" ||
        inp2.value === "" || inp2.value < 1 ||
        inp3.value === "" ||
        inp4.value === "" || inp4.value < 1 ||
        inp5.value === "" 
        ){
        alert("  واحد و تکرار نمیتوانند بیشتر از 2 رقم، منفی، خالی یا اعشاری باشند همچنین تمام فیلد ها باید پر شوند. ")}
    else if (yekaWord > 1){alert(' یکا نمیتواند بیشتر از یک کلمه باشد ')}
    else if (nameWord > 3){alert('نام ماموریت نمیتواند بیشتر از 3 کلمه باشد ')}
    else { creatItem();addMenu.classList.toggle('hidden');
            addBTN.setAttribute('src', 'icons/add.png');
            addBTN.style.boxShadow = 'none';
}
}

// برای ساختن یک ماموریت هفتگی با اطلاعاتی که کاربر داده
function creatItem(){
    // ساخت دیو و اسپن اول
    var newItem = document.createElement('div');
    newItem.setAttribute('class', 'item');
    newItem.style.order = -Number(inp5.value);
    items.append(newItem);
    var span1 = document.createElement('span');
    span1.setAttribute('class', 'itemInfo');
    newItem.append(span1);
    // ساخت دکمه ی افزایش و کاهش
    var plusBTN = document.createElement('img');
    plusBTN.setAttribute('class', 'plus');
    plusBTN.setAttribute('src', 'icons/plus.png');
    span1.append(plusBTN);
    var subtracBTN = document.createElement('img');
    subtracBTN.setAttribute('class', 'subtrac');
    subtracBTN.setAttribute('src', 'icons/subtrac.png');
    span1.append(subtracBTN);
    // قرار دادن اطلاعات ماموریت در اسپن اول
    var p = document.createElement('p');
    var inp = inp2.value*inp4.value ;
    p.append(inp + ' ' , inp3.value + " " , inp1.value);
    p.setAttribute('class' , 'textInfo');
    span1.append(p);
    // ساخت دکمه ی حذف و ویرایش
    var editBTN = document.createElement('img');
    editBTN.setAttribute('class' , 'edit')
    editBTN.setAttribute('src' , 'icons/edit.png');
    span1.append(editBTN);
    var delBTN = document.createElement('img');
    delBTN.setAttribute('class' , 'del')
    delBTN.setAttribute('src' , 'icons/delete.png');
    span1.append(delBTN);
    // ساخت اسپن دوم با اطلاعاتی که کاربر داده
    var span2 = document.createElement('span');
    span2.setAttribute('class', 'navar');
    span2.style.gridTemplateColumns= 'repeat('+inp4.value+', 1fr)';
    newItem.append(span2);
    // تعاملی کردن دکمه های ساخته شده
    plusBTN.addEventListener('click' , plus);
    subtracBTN.addEventListener('click' , subtrac);
    editBTN.addEventListener('click' , edit);
    delBTN.addEventListener('click' , del);
    // Local Storage
    var obj = {
        i1: inp1.value,
        i2: inp2.value,
        i3: inp3.value,
        i4: inp4.value,
        i5: inp5.value
    } ;
    ls.setData(obj);
    ls.setDone(obj , 0);
    // پاک کردن ورودی ها
    inp1.value = "";
    inp2.value = "";
    inp3.value = "";
    inp4.value = "";
    inp5.value = "";
}



// تابع دکمه ی افزایش
function plus(e){
    //Local Storage
    //گرفتن مقادیر آیتم و ساخت آبجکت برای ارسال به بخش حذف
    var pTag = e.target.parentElement.children[2]
    var p = e.target.parentElement.children[2].textContent.split(' ') ;
    if (p.length === 3){var name = p[2];}
    else if (p.length === 4){var name = p[2]+' '+p[3];}
    else if (p.length === 5){var name = p[2]+' '+p[3]+' '+p[4];}
    var yeka = p[1];
    var span2 = e.target.parentElement.parentElement.children[1];
    var num0 = span2.style.gridTemplateColumns;
    var tekrar = Number(num0.match(/\d{1,3}/)[0]);
    var vahed = Number(p[0])/tekrar;
    var olaviyat = -e.target.parentElement.parentElement.style.order

    var mainObj = {
        i1: name ,
        i2: vahed ,
        i3: yeka ,
        i4: tekrar ,
        i5: olaviyat
    };
   
    // متغیر های مورد نیاز
    var haveDiv = e.target.parentElement.parentElement.children[1].children.length
    
    // دستگاه تشخیص اعداد تا دو رقم برای ظرفیت اسپن دوم
    var num0 = span2.style.gridTemplateColumns;
    var num1 = Number(num0.match(/\d{1,3}/)[0]); 
    // اگه نوار وظیفه وجود نداره
    // با اولین کلیک رو دکمه ی افزایش یدونه بساز
    if(haveDiv === 0){
        var div = document.createElement('div');
        div.setAttribute('class' , 'fraktion');
        div.style.gridColumn = "span 1";
        span2.append(div);
        percent(span2 , num1 , 0, e);
        if (num1 === 1){
            span2.children[0].style.backgroundColor = "goldenrod";
        }
        ls.setDone(mainObj , 1)
    // اگه نوار وظیفه وجود داشت، اونو یه واحد بیشتر کن
    }else{
        // دستگاه تشخیص اعداد تا دو رقم برای مقدار نوار وظیفه
        var num = span2.children[0].style.gridColumn;
        var num2 = Number(num.match(/\d{1,3}/)[0]);
        // اگه نوار وظیفه از ظرفیتش کمتر بود یدونه بیشترش کن
        if (num2 < num1-1){
        var newNum = num2+1;
        span2.children[0].style.gridColumn = 'span '+ newNum;
        percent(span2 , num1 , num2, e);
        ls.setDone(mainObj , newNum);
        // وقتی ظرفیت نوار وظیفه پر شد، رنگشو عوض کن
        }else if (num2 < num1){
        var newNum = num2+1;
        span2.children[0].style.gridColumn = 'span '+ newNum;
        span2.children[0].style.backgroundColor = "goldenrod";
        percent(span2 , num1 , num2 , e);
        ls.setDone(mainObj , newNum);
        }
    }
}


// تابع دکمه ی کاهش 
function subtrac(e){
    //Local Storage
    //گرفتن مقادیر آیتم و ساخت آبجکت برای ارسال به بخش حذف
    var pTag = e.target.parentElement.children[2]
    var p = e.target.parentElement.children[2].textContent.split(' ') ;
    if (p.length === 3){var name = p[2];}
    else if (p.length === 4){var name = p[2]+' '+p[3];}
    else if (p.length === 5){var name = p[2]+' '+p[3]+' '+p[4];}
    var yeka = p[1];
    var span2 = e.target.parentElement.parentElement.children[1];
    var num0 = span2.style.gridTemplateColumns;
    var tekrar = Number(num0.match(/\d{1,3}/)[0]);
    var vahed = Number(p[0])/tekrar;
    var olaviyat = -e.target.parentElement.parentElement.style.order

    var mainObj = {
        i1: name ,
        i2: vahed ,
        i3: yeka ,
        i4: tekrar ,
        i5: olaviyat
    };

    // متغیر های مورد نیاز
    var haveDiv = e.target.parentElement.parentElement.children[1].children.length
    // دستگاه تشخیص اعداد تا دو رقم برای ظرفیت اسپن دوم
    var num0 = span2.style.gridTemplateColumns;
    var  num1 = Number(num0.match(/\d{1,3}/)[0]);
    // اگه نوار وظیفه وجود داشت یه واحد کمترش کن
    if (haveDiv !== 0){
        // دستگاه تشخیص اعداد تا دو رقم برای مقدار نوار وظیفه
        var num = span2.children[0].style.gridColumn;
        var num2 = Number(num.match(/\d{1,3}/)[0]);
        // اگه ظرفیت پر بود، موقع کم کردن، رنگ نوار رو برگردون
        if (num2 === num1 && num1 !== 1){
        var newNum = num2-1;
        span2.children[0].style.gridColumn = 'span '+ newNum;
        span2.children[0].style.backgroundColor = "blue";
        var num3 = newNum - 1;
        percent(span2 , num1 , num3 , e);
        ls.setDone(mainObj , newNum);
        // اگه نوار وظیفه فقط یدونه پر بود، کلا حذفش کن
        }else if (num2 === 1){
            span2.children[0].remove();
            ls.setDone(mainObj , 0);
        // اگه هیچکدوم از دو شرط بالا رو نداشت، فقط یدونه کمش کن
        }else{
        var newNum = num2-1;
        span2.children[0].style.gridColumn = 'span '+ newNum;
        var num3 = newNum - 1;
        percent(span2 , num1 , num3 , e);
        ls.setDone(mainObj , newNum);
        }
    }
}


// درصد گیری وظایف
function percent(span2 , num1 , num2 , e){
var p = e.target.parentElement.children[2].textContent.split(' ');
var vahed = p[0]/num1;
var num = num2+1;
var per = '('+ '%'+ Math.floor((num/num1)*100) + ')';
var doing = vahed*num + ' ' + p[1];
span2.children[0].innerHTML= doing +' '+ per;
}


// تابع دکمه ی ویرایش 
function edit(e){
    // گرفتن مقادیر قبلی آیتم برای نمایش در ورودی ها
    var pTag = e.target.parentElement.children[2]
    var p = e.target.parentElement.children[2].textContent.split(' ') ;
    if (p.length === 3){var name = p[2];}
    else if (p.length === 4){var name = p[2]+' '+p[3];}
    else if (p.length === 5){var name = p[2]+' '+p[3]+' '+p[4];}
    var yeka = p[1];
    var span2 = e.target.parentElement.parentElement.children[1];
    var num0 = span2.style.gridTemplateColumns;
    var tekrar = Number(num0.match(/\d{1,3}/)[0]);
    var vahed = Number(p[0])/tekrar;
    var olaviyat = -e.target.parentElement.parentElement.style.order
    // Local Storage
    var mainObj = {
        i1: name ,
        i2: vahed ,
        i3: yeka ,
        i4: tekrar ,
        i5: olaviyat
    };
    // ساخت تمام عنصر های لازم
    var editPage = document.createElement('div');
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');
    var p4 = document.createElement('p');
    var p5 = document.createElement('p');
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var inputText1 = document.createElement('input');
    var inputText2 = document.createElement('input');
    var inputNum1 = document.createElement('input');
    var inputNum2 = document.createElement('input');
    var inputNum3 = document.createElement('input');
    var hr1 = document.createElement('hr');
    var hr2 = document.createElement('hr');
    var hr3 = document.createElement('hr');
    var submit = document.createElement('input');
    var cancel = document.createElement('input');
    // تایین ویژگی های عناصر ساخته شده
    editPage.className = 'editPage';
    p1.innerHTML = "نام ماموریت: ";
    p2.innerHTML = "واحد: ";
    p3.innerHTML = "یکا: ";
    p4.innerHTML = "تکرار: ";
    p5.innerHTML = "اولویت: ";
    p1.className = "add_p";
    p2.className = "add_p";
    p3.className = "add_p";
    p4.className = "add_p";
    p5.className = "add_p";
    div1.className = "top1";
    div2.className = "top1";
    inputNum1.setAttribute('type' , 'number');
    inputNum2.setAttribute('type' , 'number');
    inputNum3.setAttribute('type' , 'number');
    inputText1.setAttribute('id' , 'one');
    inputText2.setAttribute('id' , 'three');
    inputNum1.value = vahed;
    inputNum2.value = tekrar;
    inputNum3.value = olaviyat;
    inputText1.value = name;
    inputText2.value = yeka;
    inputNum1.className = "add_input";
    inputNum2.className = "add_input";
    inputNum3.className = "add_input";
    inputText2.className = "add_input";
    submit.setAttribute("id" , "sub");
    cancel.setAttribute("id" , "can");
    submit.setAttribute("value" , " ویرایش ");
    cancel.setAttribute("value" , " لغو ");
    submit.setAttribute('type' , 'submit');
    cancel.setAttribute('type' , 'submit');
    // جایگذاری عناصر ساخته شده
    document.body.append(editPage);
    editPage.append(p1 , inputText1 , hr1 , div1 , hr2, div2, hr3 , submit , cancel);
    p2.append(inputNum1);
    p3.append(inputText2);
    p4.append(inputNum2);
    p5.append(inputNum3);
    div1.append(p2 , p3);
    div2.append(p4 , p5);
    // تعاملی کردن دکمه ها 
    cancel.addEventListener('click' , laghv);
    submit.addEventListener('click' , editLimit);
    // محدودیت های ورودی های ویرایش 
    function editLimit(){
        var a = inputNum1.value.length
        var b = inputNum2.value.length
        var yekaWord = inputText2.value.split(' ').length;
        var nameWord = inputText1.value.split(' ').length;

        if (a > 2 || b > 2 ||
            inputText1.value === "" ||
            inputNum1.value === "" || inputNum1.value < 1 ||
            inputText2.value === "" ||
            inputNum2.value === "" || inputNum2.value < 1 ||
            inputNum3.value === "" 
            ){alert("  واحد و تکرار نمیتوانند بیشتر از 2 رقم، منفی، خالی یا اعشاری باشند همچنین تمام فیلد ها باید پر شوند. ")
       } else if (yekaWord > 1){alert(' یکا نمیتواند بیشتر از یک کلمه باشد ')}
         else if (nameWord > 3){alert('نام ماموریت نمیتواند بیشتر از 3 کلمه باشد ')}
       else {submitEdit();}
    }
    // ثبت ویرایش
    function submitEdit() {
        pTag.innerHTML = "";
        var inp = inputNum1.value*inputNum2.value ;
        pTag.append(inp + ' ' , inputText2.value + " " , inputText1.value)
        span2.parentElement.style.order = -inputNum3.value;
        span2.style.gridTemplateColumns =  'repeat('+inputNum2.value+', 1fr)';
        if (span2.children.length !== 0){span2.children[0].remove();}
        // Local Storage
        var obj = {
            i1: inputText1.value,
            i2: inputNum1.value,
            i3: inputText2.value,
            i4: inputNum2.value,
            i5: inputNum3.value
        } ;
        ls.deleteData(mainObj);
        ls.setData(obj);
        laghv()  
    }
    // بستن صفحه ی ویرایش 
    function laghv(){cancel.parentElement.remove();}
}


// تابع دکمه ی حذف
function del(e){
    //Local Storage
    //گرفتن مقادیر آیتم و ساخت آبجکت برای ارسال به بخش حذف
    var pTag = e.target.parentElement.children[2]
    var p = e.target.parentElement.children[2].textContent.split(' ') ;
    if (p.length === 3){var name = p[2];}
    else if (p.length === 4){var name = p[2]+' '+p[3];}
    else if (p.length === 5){var name = p[2]+' '+p[3]+' '+p[4];}
    var yeka = p[1];
    var span2 = e.target.parentElement.parentElement.children[1];
    var num0 = span2.style.gridTemplateColumns;
    var tekrar = Number(num0.match(/\d{1,3}/)[0]);
    var vahed = Number(p[0])/tekrar;
    var olaviyat = -e.target.parentElement.parentElement.style.order
    // Local Storage
    var mainObj = {
        i1: name ,
        i2: vahed ,
        i3: yeka ,
        i4: tekrar ,
        i5: olaviyat
    };
    // ساخت تمام عنصر های لازم
    var deletePage = document.createElement('div');
    var sub = document.createElement('input'); 
    var can = document.createElement('input');
    var div = document.createElement('div');
    var p = document.createElement('p');
    var pTag = e.target.parentElement.children[2].textContent;
    // ویژگی های عناصر
    deletePage.className = "delPage";
    sub.className = "subDel";
    can.className = "canDel";
    sub.setAttribute('type' , 'submit');
    can.setAttribute('type' , 'submit');
    sub.value = "حذف" ;
    can.value = "لغو" ;
    p.innerHTML = "آیا از حذف این آیتم ("+pTag+") اطمینان دارید؟";
    

    // جاگذاری عناصر 
    document.body.append(deletePage);
    div.append(sub , can);
    deletePage.append(p ,div);
    can.addEventListener('click' , laghv);
    sub.addEventListener('click' , subDelete);

    function subDelete(){
        e.target.parentElement.parentElement.remove()
        ls.deleteData(mainObj);
        ls.deleteDone(mainObj);
        laghv();
    }
    
    function laghv(){deletePage.remove();}

}


var ls = {

    getData: function(){
        var dataArray ;
        var dataString = localStorage.getItem('itm');
        if (dataString === null){dataArray = []}
        else {dataArray = JSON.parse(dataString)};
        return dataArray;
    },

    setData: function(obj){
        var dataArray = ls.getData()
        dataArray.push(obj);
        localStorage.setItem("itm" , JSON.stringify(dataArray));
    },

    showData: function(){
        var dataArray = ls.getData()
        for(var i = 0 ; i <dataArray.length ; i++){
            ls.createAgain(dataArray[i]);
        }
    },

    createAgain: function(a){
         // ساخت دیو و اسپن اول
        var newItem = document.createElement('div');
        newItem.setAttribute('class', 'item');
        newItem.style.order = -Number(a.i5);
        items.append(newItem);
        var span1 = document.createElement('span');
        span1.setAttribute('class', 'itemInfo');
        newItem.append(span1);
        // ساخت دکمه ی افزایش و کاهش
        var plusBTN = document.createElement('img');
        plusBTN.setAttribute('class', 'plus');
        plusBTN.setAttribute('src', 'icons/plus.png');
        span1.append(plusBTN);
        var subtracBTN = document.createElement('img');
        subtracBTN.setAttribute('class', 'subtrac');
        subtracBTN.setAttribute('src', 'icons/subtrac.png');
        span1.append(subtracBTN);
        // قرار دادن اطلاعات ماموریت در اسپن اول
        var p = document.createElement('p');
        var inp = a.i2*a.i4 ;
        p.append(inp + ' ' , a.i3 + " " , a.i1);
        p.setAttribute('class' , 'textInfo');
        span1.append(p);
        // ساخت دکمه ی حذف و ویرایش
        var editBTN = document.createElement('img');
        editBTN.setAttribute('class' , 'edit')
        editBTN.setAttribute('src' , 'icons/edit.png');
        span1.append(editBTN);
        var delBTN = document.createElement('img');
        delBTN.setAttribute('class' , 'del')
        delBTN.setAttribute('src' , 'icons/delete.png');
        span1.append(delBTN);
        // ساخت اسپن دوم با اطلاعاتی که کاربر داده
        var span2 = document.createElement('span');
        span2.setAttribute('class', 'navar');
        span2.style.gridTemplateColumns= 'repeat('+a.i4+', 1fr)';
        newItem.append(span2);
        // تعاملی کردن دکمه های ساخته شده
        plusBTN.addEventListener('click' , plus);
        subtracBTN.addEventListener('click' , subtrac);
        editBTN.addEventListener('click' , edit);
        delBTN.addEventListener('click' , del);
        // ارسال اطلاعات برای پر کردن نوار وظیفه ی آیتم ساخته شده
        var mainObj = {
            i1: a.i1 ,
            i2: a.i2 ,
            i3: a.i3 ,
            i4: a.i4 ,
            i5: a.i5
        };
        ls.showDone(mainObj , plusBTN);
        },

    deleteData: function(obj){
        var dataArray = ls.getData();
        var index = dataArray.findIndex(function(ar){   
            return (ar.i1 == obj.i1 &&
            ar.i2 == obj.i2 &&
            ar.i3 == obj.i3 &&
            ar.i4 == obj.i4 &&
            ar.i5 == obj.i5)});
        dataArray.splice(index , 1);
        localStorage.setItem("itm" , JSON.stringify(dataArray));
    },

    getDone: function(){
        var doneArray ;
        var doneString = localStorage.getItem("done");
        if(doneString === null){doneArray = []}
        else {doneArray = JSON.parse(doneString)};
        return doneArray;
    }, 

    setDone: function(obj , doNum){
        var doneArray = ls.getDone();
        var dataArray = ls.getData();
        var index = dataArray.findIndex(function(ar){   
            return (ar.i1 == obj.i1 &&
            ar.i2 == obj.i2 &&
            ar.i3 == obj.i3 &&
            ar.i4 == obj.i4 &&
            ar.i5 == obj.i5)});
        var indexOfDone = doneArray.findIndex(function(da){
                return da.ind == index ; });
        if (indexOfDone === -1){
            var doneObj = {ind: index , val: doNum};
            doneArray.push(doneObj);
            localStorage.setItem("done" , JSON.stringify(doneArray));
        }else{
            doneArray.splice(indexOfDone , 1);
            var doneObj = {ind: index , val: doNum};
            doneArray.push(doneObj);
            localStorage.setItem("done" , JSON.stringify(doneArray));
        }
        
        
    },

    showDone: function(obj , plusBTN){
        var doneArray = ls.getDone();
        var dataArray = ls.getData();
        var index = dataArray.findIndex(function(ar){   
            return (ar.i1 == obj.i1 &&
            ar.i2 == obj.i2 &&
            ar.i3 == obj.i3 &&
            ar.i4 == obj.i4 &&
            ar.i5 == obj.i5)});
        var indexOfDone = doneArray.findIndex(function(da){
            return da.ind == index ; })
        if (indexOfDone !== -1){
            var doNum = doneArray[indexOfDone].val
            if(doNum !== 0){
                var myEvent = new CustomEvent("auto");
                plusBTN.addEventListener("auto" , plus);
                for(var i = 0; i < doNum; i++){
                plusBTN.dispatchEvent(myEvent);
                };
            }
        }
    },

    deleteDone: function(obj){
        var doneArray = ls.getDone();
        var dataArray = ls.getData();
        var index = dataArray.findIndex(function(ar){   
            return (ar.i1 == obj.i1 &&
            ar.i2 == obj.i2 &&
            ar.i3 == obj.i3 &&
            ar.i4 == obj.i4 &&
            ar.i5 == obj.i5)});
        var indexOfDone = doneArray.findIndex(function(da){
            return da.ind == index ; });
        doneArray.splice(indexOfDone , 1);
        localStorage.setItem("done" , JSON.stringify(doneArray));
    }
   
}
document.addEventListener("DOMContentLoaded" , ls.showData);

