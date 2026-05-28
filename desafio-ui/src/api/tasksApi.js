import axios from "axios";
import { TASK_STATUS } from "../constants/taskStatus";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/tasks",
});

export const tasksApi = {
  async list(status) {
    const params = status && status !== TASK_STATUS.all ? { status } : {};
    const response = await api.get("", { params });
    return response.data;
  },

  async create(task) {
    const response = await api.post("", task);
    return response.data;
  },

  async update(id, task) {
    const response = await api.put(`/${id}`, task);
    return response.data;
  },

  async remove(id) {
    await api.delete(`/${id}`);
  },
};
