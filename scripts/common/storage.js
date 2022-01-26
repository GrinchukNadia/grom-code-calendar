const baseUrl = `https://61eaff907ec58900177cdb49.mockapi.io/api/v1/calendarStorage/`;

export const createTask = (taskData) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(taskData),
  });
};

export const getTasksList = () => fetch(baseUrl).then((response) => response.json());

export const getTask = (taskId) =>
  fetch(`${baseUrl}/${taskId}`).then((response) => response.json());

export const updateTask = (updatedTaskData, taskId) => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(updatedTaskData),
  });
};

export const deleteTask = (taskId) => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: 'DELETE',
  });
};