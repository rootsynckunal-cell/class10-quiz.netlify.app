function selectSubject(s){
    localStorage.setItem('selectedSubject',s);
    window.location.href='pages/quiz.html';
}
function toggleTheme(){
    var body=document.body;
    var current=body.getAttribute('data-theme')||'dark';
    var newTheme=current==='light'?'dark':'light';
    body.setAttribute('data-theme',newTheme);
    localStorage.setItem('quizhub_theme',newTheme);
}
window.onload=function(){
    var saved=localStorage.getItem('quizhub_theme');
    if(saved){
        document.body.setAttribute('data-theme',saved);
    }else{
        document.body.setAttribute('data-theme','dark');
    }
    var c=localStorage.getItem('quizhub_count')||0;
    var h=localStorage.getItem('quizhub_highscore')||0;
    var e1=document.getElementById('total-quizzes');
    var e2=document.getElementById('high-score');
    if(e1)e1.innerHTML=c;
    if(e2)e2.innerHTML=h+'%';
}