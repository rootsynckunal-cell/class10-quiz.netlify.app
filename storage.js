// STORAGE.JS - Local Storage Manager

var Storage = {
    // Get value from localStorage
    get: function(key) {
        try {
            var val = localStorage.getItem(key);
            return val ? JSON.parse(val) : null;
        } catch (e) {
            return null;
        }
    },
    
    // Set value in localStorage
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },
    
    // Get quiz count
    getQuizCount: function() {
        return this.get('quizhub_count') || 0;
    },
    
    // Increment quiz count
    incrementQuizCount: function() {
        var count = this.getQuizCount() + 1;
        this.set('quizhub_count', count);
        return count;
    },
    
    // Get high score
    getHighScore: function() {
        return this.get('quizhub_highscore') || 0;
    },
    
    // Set high score if new score is higher
    setHighScore: function(score) {
        var current = this.getHighScore();
        if (score > current) {
            this.set('quizhub_highscore', score);
            return true;
        }
        return false;
    },
    
    // Save quiz result to history
    saveQuizResult: function(result) {
        var history = this.get('quizhub_history') || [];
        history.push({
            subject: result.subject,
            questionCount: result.questionCount,
            correct: result.correct,
            percentage: result.percentage,
            date: new Date().toISOString()
        });
        // Keep only last 50 results
        if (history.length > 50) {
            history = history.slice(-50);
        }
        this.set('quizhub_history', history);
    },
    
    // Get quiz history
    getQuizHistory: function() {
        return this.get('quizhub_history') || [];
    },
    
    // Clear all storage
    clear: function() {
        localStorage.clear();
    }
};