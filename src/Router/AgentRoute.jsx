import React from 'react';
import UseRole from '../Utility/UseRole';
import Loading from '../Page/Loading';
import { Navigate } from 'react-router-dom';

const AgentRoute = ({children}) => {
   const  [dataName,isLoading] = UseRole()
   if(isLoading) return <Loading></Loading>
   if(dataName === 'agent') return children
    return <Navigate to='/dashboard'></Navigate>
};

export default AgentRoute;