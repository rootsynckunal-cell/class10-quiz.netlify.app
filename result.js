document.addEventListener('DOMContentLoaded',function(){
    var r=JSON.parse(sessionStorage.getItem('quizResult')||'{}');
    if(!r.pct){window.location.href='../index.html';return}
    var nm={maths:'Maths',science:'Science',english:'English',hindi:'Hindi',sst:'Social',mixed:'Mixed'};
    document.getElementById('result-subject-badge').innerHTML=nm[r.subject]||r.subject;
    document.getElementById('total-questions').innerHTML=r.count;
    document.getElementById('correct-answers').innerHTML=r.correct;
    document.getElementById('wrong-answers').innerHTML=r.wrong;
    document.getElementById('percentage').innerHTML=r.pct+'%';
    document.getElementById('time-taken').innerHTML=Math.floor(r.time/60)+'m '+(r.time%60)+'s';
    document.getElementById('grade').innerHTML=getGrade(r.pct);
    document.getElementById('performance-message').innerHTML=getMsg(r.pct);
    var sc=document.getElementById('score-circle');
    sc.style.background='conic-gradient(var(--primary) '+(r.pct*3.6)+'deg,var(--surface) '+(r.pct*3.6)+'deg)';
});
function retakeQuiz(){
    var r=JSON.parse(sessionStorage.getItem('quizResult')||'{}');
    if(r.subject){
        localStorage.setItem('selectedSubject',r.subject);
        window.location.href='quiz.html';
    }else{
        window.location.href='../index.html';
    }
}
function goHome(){
    window.location.href='../index.html';
}