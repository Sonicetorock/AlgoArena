export const apiAuth = axios.create({
    baseURL: "http://127.0.0.1:8000" + "/api/auth",
    withCredentials: true,
  });
export const apiUser = axioscreate({
    baseURL: "http://127.0.0.1:8000" + "/api/user",
    withCredentials: true,
})
export const apiAdmin = axios.create({
    baseURL: "http://127.0.0.1:8000"+ "/api/admin",
    withCredentials: true,
  });

