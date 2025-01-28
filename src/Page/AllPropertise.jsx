import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import Card from "../Section/Card";
import Loading from "./Loading";
import { useState } from "react";

const AllPropertise = () => {
    const axiosSecure = UseAxios()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)
    const { data: infos = [], isLoading } = useQuery({
        queryKey: ['infos',search,sort],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/verifyProperty?search=${search}&sort=${sort}`)
            return data
        }
    })
    if (isLoading) return <Loading></Loading>
    return (
        <div className="py-32">
            <h2 className='text-3xl font-bold my-2 text-center'>
                Buying a Home Made Easy
            </h2>
            <p className='text-sm font-bold my-3 text-gray-400 text-center p-3'>
                Making the right choice for your new home is crucial. Our consultants will guide you in finding the perfect property.
            </p>

            <div className="my-8 flex justify-between w-11/12 mx-auto">
                 <button onClick={()=>setSort(true)} className="px-3 rounded-xl text-sm font-bold bg-blue-600">Sort By Price</button>
                <label className="input input-bordered flex items-center gap-2 text-black">
                    <input type="text" onBlur={e => setSearch(e.target.value)} className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </div>

            <div className=" sm:grid lg:grid-cols-4 sm:grid-cols-2 gap-8 px-9 my-12">

                {
                    Array.isArray(infos) && infos.map(info => <Card key={info._id} info={info}></Card>)
                }
            </div>
        </div>

    );
};

export default AllPropertise;