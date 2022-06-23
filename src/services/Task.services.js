import axiosInstance from "../core/apis/axios";

export const getTasks = async () => {
  const { company_id } = JSON.parse(localStorage.getItem("user_data"));
  const res = await axiosInstance.get(
    `/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`
  );
  return res?.data || res;
};

export const getUsers = async () => {
  const { company_id } = JSON.parse(localStorage.getItem("user_data"));
  const res = await axiosInstance.get(
    `/team?product=outreach&company_id=${company_id}`
  );
  return res?.data || res;
};

export const addTask = async (data) => {
  const { company_id } = JSON.parse(localStorage.getItem("user_data"));
  const res = await axiosInstance.post(
    `/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
    data
  );
  return res?.data || res;
};

export const putTask = async ({ task_id, data }) => {
  const { company_id } = JSON.parse(localStorage.getItem("user_data"));
  const res = await axiosInstance.put(
    `/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`,
    data
  );
  return res?.data || res;
};

export const deleteTask = async (task_id) => {
  const { company_id } = JSON.parse(localStorage.getItem("user_data"));
  const res = await axiosInstance.delete(
    `/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`
  );
  return res?.data || res;
};
