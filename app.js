var Questionarr = [






]


function qstnadding() {

    firebase.database().ref('quizdata').on('child_added', function(data) {

        Questionarr.push(data.val())
    })
}

var nxtbtn = document.getElementById('nextbtn')
var bakbtn= document.getElementById('backbtn')
bakbtn.hidden = true;


var quest = document.getElementById('question');

function show(e) {
if (Questionarr.length==0) {
alert('Refresh it and try again or ask your teacher to add some questions')
stopit()
bakbtn.hidden=false
nxtbtn.hidden=true
}else{

    quest.innerHTML = Questionarr[e].question
    var optlen = Questionarr[e].options
    var btn;
    var datadiv = document.getElementById('datadiv')


    for (var i = 0; i < optlen.length; i++) {
        btn = document.createElement('button')
        btn.setAttribute('id', 'options')
        btn.setAttribute('onclick', 'checkOne(this)')
        li = document.createElement('li')
           
        li.appendChild(btn)
        datadiv.appendChild(li)
        btn.innerHTML = Questionarr[e].options[i]





    }
    var Num = document.getElementById('count')
    Num.innerHTML = e + 1;
    var Total = document.getElementById('total_No')
    Total.innerHTML = Questionarr.length;
}}
var e = 0;





function count() {
    checkresult()
    if (Questionarr.length - 1 == e) {
        var nxtbtn = document.getElementById('nextbtn')
        nxtbtn.disabled = true;
        var subbtn = document.createElement('button')
        var subbtnText = document.createTextNode('Submit')
        subbtn.appendChild(subbtnText)
        subbtn.setAttribute('onclick', 'final()')

        subbtn.setAttribute('id', 'submitbutton')
        var roW = document.getElementById('row')
        roW.appendChild(subbtn)
            // alert("thank you press the submit button")
    } else {
        datadiv.innerHTML = '';
        e++
        show(e)


    }

}

function checkOne(b) {
    removecheckOne()
    b.setAttribute('class', 'active')

}

function removecheckOne() {
    var active = document.getElementsByClassName('active')
    for (var i = 0; i < active.length; i++) {
        active[i].classList.remove("active")
    }

}







var points = 0
var result = 0;
var wrong = 0;
var notatempt = 0;

function checkresult() {
    var active = document.getElementsByClassName('active')
    if (active[0].innerHTML == Questionarr[e].answer) {
        // result += 5;
        result ++;
    } else {
        wrong++
    }
}



var maind = document.getElementById('main')

function final() {

    var rightresult = document.createTextNode('Total Right Answers:' + (result))
    var rightans = document.createElement('div')
    rightans.setAttribute('class', 'rresultdiv')
    rightans.appendChild(rightresult)
    maind.appendChild(rightans)
    var wrongans = document.createElement('div')
    wrongans.setAttribute('class', 'wresultdiv')
    var wrongresult = document.createTextNode('Total Wrong Answers:' + (wrong))
    wrongans.appendChild(wrongresult)
    maind.appendChild(wrongans)
        // var submitbtndisable = document.getElementById('submitbutton')


    stopit()
    bakbtn.hidden=false

}

















var minu = document.getElementById('min')
var seco = document.getElementById('sec')

minu.innerHTML = '1';
seco.innerHTML = '30';
var Minterval;

function countertwo() {
    if (minu.innerHTML == 0 && seco.innerHTML == 1) {
        seco.innerHTML = ("Timess Up")
        var nxtbtn = document.getElementById('nextbtn')
        nxtbtn.disabled = true;
        final()
            // clearInterval(interval)
    } else if (seco.innerHTML == 0) {
        minu.innerHTML--
            seco.innerHTML = 59;
    } else {
        seco.innerHTML--
    }
}

var startbtn = document.getElementById('startbtn')
var stopbtn = document.getElementById('nextbtn')
stopbtn.disabled = true

function trie() {
    Minterval = setInterval(countertwo, 1000)
    show(e)
    stopbtn.disabled = false
    startbtn.disabled = true
}



function stopit() {
    clearInterval(Minterval)
    var nxtbtn = document.getElementById('nextbtn')
    nxtbtn.disabled = true;
    var subbtn = document.createElement('button')
    subbtn.disabled = true;
}