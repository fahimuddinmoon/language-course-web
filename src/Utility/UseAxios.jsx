import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:9000'
}) 
const UseAxios = () => {
 return axiosSecure;
};

export default UseAxios;