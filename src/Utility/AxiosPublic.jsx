import axios from "axios";
export const axiosPublic = axios.create({
    baseURL: 'https://final-project-server-coral.vercel.app'
}) 
const AxiosPublic = () => {
    return axiosPublic
};

export default AxiosPublic;




