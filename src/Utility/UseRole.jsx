import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import UseAxios from "./UseAxios";
import { useQuery } from "@tanstack/react-query";

const UseRole = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: dataName = [] , isLoading} = useQuery({
        queryKey: ['dataName', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            return data
        }
    })

    return [dataName.role,isLoading]
};

export default UseRole;