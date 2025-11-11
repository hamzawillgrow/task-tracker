import axios from "axios";
const BASE_URL = "http://localhost:3000/api/tasks";

export async function getTasks() {
    const res = await axios.get(BASE_URL);
    return res.data;
}

export async function addTask(title) {
    const res = await axios.post(BASE_URL, { title });
    return res.data;
}

export async function deleteTask(id) {
    await axios.delete(`${BASE_URL}/${id}`);
}

export async function toggleTaskFlag(id) {
    const res = await axios.patch(`${BASE_URL}/${id}/flag`);
    return res.data;
}
