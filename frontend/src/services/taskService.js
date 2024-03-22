import axios from "axios";


const API_URL = 'http://127.0.0.1:8000/tasks/'; 


export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};


export const createTask = async (taskData) => {
    try {
        const response = await axios.post(API_URL, taskData);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
    }
};

export const updateTask = async (taskId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}${taskId}/`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}${taskId}/`);
        return response.data;  
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};


export const getTaskPriorityCounts = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/task-priority-counts/');
        return response.data;
    } catch (error) {
        console.error("Error fetching task priority counts:", error);
    }
};

export const getTaskAssigneeCounts = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/task-assignee-counts/');
        return response.data;
    } catch (error) {
        console.error("Error fetching task assignee counts:", error);
    }
};

