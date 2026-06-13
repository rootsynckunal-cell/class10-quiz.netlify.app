function shuffle(a){var s=a.slice();for(var i=s.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=s[i];s[i]=s[j];s[j]=t}return s}
function shuffleOpts(q){return{q:q.q,o:shuffle(q.o.slice()),a:q.a}}
function formatTime(s){return Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60}
function getGrade(p){if(p>=90)return'A+';if(p>=80)return'A';if(p>=70)return'B+';if(p>=60)return'B';if(p>=50)return'C';if(p>=40)return'D';return'F'}
function getMsg(p){if(p>=90)return'Outstanding! 🌟';if(p>=80)return'Excellent! 🎉';if(p>=70)return'Good job! 👍';if(p>=60)return'Well done! 💪';if(p>=50)return'You passed!';return'Keep practicing! 📚'}