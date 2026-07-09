/**
 * FocusHub - Storage Utility
 * 
 * Provides unified helper functions to save and load data (tasks, goals, planner events,
 * pomodoro settings, theme, etc.) using localStorage.
 */

const storageModule = {
    save(key, data) {
        
        localStorage.setItem(key ,JSON.stringify(data))
    },
    
    load(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
        return null;
    }
};
