import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://final-project-server-coral.vercel.app'
}) 
const UseAxios = () => {
 return axiosSecure;
};

export default UseAxios;