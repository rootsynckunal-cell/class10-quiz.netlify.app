var qd={subject:'maths',questions:[],currentIndex:0,answers:[],timer:null,startTime:null};
document.addEventListener('DOMContentLoaded',function(){
    // Apply saved theme
    var savedTheme=localStorage.getItem('quizhub_theme')||'dark';
    document.body.setAttribute('data-theme',savedTheme);
    
    var s=localStorage.getItem('selectedSubject')||'maths';
    qd.subject=s;
    var nm={maths:'Maths',science:'Science',english:'English',hindi:'Hindi',sst:'Social',mixed:'Mixed'};
    var dn=document.getElementById('subject-name');
    if(dn)dn.innerHTML=nm[s]||'Quiz';
    var sb=document.getElementById('start-quiz-btn');
    if(sb)sb.onclick=startQuiz;
});
function startQuiz(){
    var cnt=parseInt(document.getElementById('q-count').value)||10;
    var sub=qd.subject;
    var pool=[];
    if(sub==='mixed'){for(var k in QUESTION_BANK)if(k!=='mixed')pool=pool.concat(QUESTION_BANK[k])}else{pool=QUESTION_BANK[sub]||[]}
    var qs=shuffle(pool).slice(0,cnt).map(shuffleOpts);
    qd.questions=qs;qd.currentIndex=0;qd.answers=new Array(cnt).fill(null);qd.startTime=Date.now();
    document.getElementById('setup-panel').style.display='none';
    document.getElementById('quiz-panel').style.display='block';
    render();startTimer();
}
function render(){
    var q=qd.questions[qd.currentIndex];
    var tot=qd.questions.length;
    var cur=qd.currentIndex;
    document.getElementById('progress-fill').style.width=((cur+1)/tot*100)+'%';
    document.getElementById('question-progress').innerHTML=cur+1;
    document.getElementById('total-questions').innerHTML=tot;
    document.getElementById('q-number').innerHTML=cur+1;
    document.getElementById('question-text').innerHTML=q.q;
    var OC=document.getElementById('options-container');
    OC.innerHTML='';
    var L=['A','B','C','D'];
    q.o.forEach(function(opt,i){
        var btn=document.createElement('button');
        btn.className='option-btn'+(qd.answers[cur]===opt?' selected':'');
        btn.innerHTML='<span class="option-label">'+L[i]+'</span>'+opt;
        btn.onclick=function(){selectOpt(opt)};
        OC.appendChild(btn);
    });
    document.getElementById('prev-btn').disabled=cur===0;
    document.getElementById('prev-btn').onclick=prevQ;
    var nb=document.getElementById('next-btn');
    if(cur===tot-1){nb.innerHTML='Submit ✓';nb.onclick=submitQuiz}else{nb.innerHTML='Next →';nb.onclick=nextQ}
}
function selectOpt(o){qd.answers[qd.currentIndex]=o;render()}
function prevQ(){if(qd.currentIndex>0){qd.currentIndex--;render()}}
function nextQ(){if(qd.currentIndex<qd.questions.length-1){qd.currentIndex++;render()}}
function startTimer(){
    var tl=qd.questions.length*60;
    var te=document.getElementById('timer');
    qd.timer=setInterval(function(){
        te.innerHTML=Math.floor(tl/60)+':'+(tl%60<10?'0':'')+tl%60;
        if(tl<=30)te.className='timer danger';else if(tl<=60)te.className='timer warning';
        if(tl<=0){clearInterval(qd.timer);submitQuiz()}
        tl--;
    },1000);
}
function submitQuiz(){
    clearInterval(qd.timer);
    var correct=0;
    qd.questions.forEach(function(q,i){if(qd.answers[i]===q.a)correct++});
    var tot=qd.questions.length;
    var pct=Math.round((correct/tot)*100);
    var time=Math.round((Date.now()-qd.startTime)/1000);
    var res={subject:qd.subject,count:tot,correct:correct,wrong:tot-correct,pct:pct,time:time,questions:qd.questions,answers:qd.answers};
    sessionStorage.setItem('quizResult',JSON.stringify(res));
    localStorage.setItem('quizhub_count',(parseInt(localStorage.getItem('quizhub_count')||0)+1));
    var hs=parseInt(localStorage.getItem('quizhub_highscore')||0);
    if(pct>hs)localStorage.setItem('quizhub_highscore',pct);
    window.location.href='result.html';
}