
import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Page/Home";
import AllPropertise from "../Page/AllPropertise";
import Dashbord from "../Dashbord/Dashbord";
import Login from "../Page/Login";
import Register from "../Page/Register";
import MyProfile from "../CustomerRoute/MyProfile";
import MyReviews from "../CustomerRoute/MyReviews";
import PropertyBought from "../CustomerRoute/PropertyBought";
import Wishlist from "../CustomerRoute/Wishlist";
import AddProperty from "../AgentRoute/AddProperty";
import AgentProfile from "../AgentRoute/AgentProfile";
import MyAddedProperties from "../AgentRoute/MyAddedProperties";
import RequestedProperties from "../AgentRoute/RequestedProperties";
import MySoldProperties from "../AgentRoute/MySoldProperties";
import AdminProfile from '../AdminRoute/AdminProfile';
import ManageProperties from '../AdminRoute/ManageProperties';
import ManageReviews from '../AdminRoute/ManageReviews';
import ManageUsers from '../AdminRoute/ManageUsers'
import CardDetails from "../Page/CardDetails";
import UpdatePage from "../Page/UpdatePage";
import Offer from "../Page/Offer";
import PrivateRoute from "./PrivateRoute";
import AgentRoute from "./AgentRoute";
import AdminRoute from "./AdminRoute";
import Advertise from "../AdminRoute/Advertise";
import Advertisement from "../Page/Advertisement";
import Payment from "../Page/Payment";
import ErrorPage from "../Page/ErrorPage";
import UserRoute from "./UserRoute";
import AllReview from "../Page/AllReview";
import AllAdvertise from "../Page/AllAdvertise";
import DashHome from "../Page/DashHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage> ,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allproperties',
                element: <PrivateRoute><AllPropertise></AllPropertise></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/detail/:id',
                element: <PrivateRoute><CardDetails></CardDetails></PrivateRoute>
            },
            {
                path: '/allReview',
                element: <PrivateRoute><AllReview></AllReview></PrivateRoute>
            },
            {
                path: '/allAdvertise',
                element: <PrivateRoute><AllAdvertise></AllAdvertise></PrivateRoute>
            },
           
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashbord></Dashbord></PrivateRoute>,
        children: [
            {
                path: 'userProfile',
                element: <UserRoute><PrivateRoute><MyProfile></MyProfile></PrivateRoute></UserRoute> 
            },
            {
                index: true,
                element: <PrivateRoute><DashHome></DashHome></PrivateRoute> 
            },
            {
                path: 'myReview',
                element: <UserRoute> <PrivateRoute><MyReviews></MyReviews></PrivateRoute></UserRoute> 
            },
            {
                path: 'propertyBought',
                element: <UserRoute> <PrivateRoute><PropertyBought></PropertyBought></PrivateRoute></UserRoute> 
            },
            {
                path: 'propertyBought/:id',
                element: <UserRoute> <PrivateRoute><Payment></Payment></PrivateRoute></UserRoute> 
            },

            {
                path: 'wishlist',
                element: <UserRoute>  <PrivateRoute><Wishlist></Wishlist></PrivateRoute></UserRoute>
            },

            {
                path: 'offer/:id',
                element: <UserRoute> <PrivateRoute><Offer></Offer></PrivateRoute> </UserRoute>
            },
              //agent route
            {
                path: 'addProperty',
                element:<AgentRoute><PrivateRoute> <AddProperty></AddProperty></PrivateRoute></AgentRoute>
            },
          
            {
                path: 'agentProfile',
                element:<AgentRoute><PrivateRoute> <AgentProfile></AgentProfile></PrivateRoute></AgentRoute>
            },
            {
                path: 'myAddProperties',
                element:<AgentRoute><PrivateRoute> <MyAddedProperties></MyAddedProperties></PrivateRoute></AgentRoute>
            },
            {
                path: 'myAddProperties/:id',
                element:<AgentRoute><PrivateRoute> <UpdatePage></UpdatePage></PrivateRoute></AgentRoute>
            },
            {
                path: 'requestProperty',
                element:<AgentRoute><PrivateRoute><RequestedProperties></RequestedProperties></PrivateRoute> </AgentRoute>
            },

            {
                path: 'soldProperty',
                element:<AgentRoute><PrivateRoute><MySoldProperties></MySoldProperties></PrivateRoute> </AgentRoute>
            },
            // admin route
            {
                path: 'adminProfile',
                element:<AdminRoute><PrivateRoute> <AdminProfile></AdminProfile></PrivateRoute></AdminRoute> 
            },
            {
                path: 'manageProperties',
                element:<AdminRoute><PrivateRoute> <ManageProperties></ManageProperties></PrivateRoute></AdminRoute>
            },
            {
                path: 'manageReview',
                element:<AdminRoute><PrivateRoute><ManageReviews></ManageReviews></PrivateRoute></AdminRoute> 
            },
            {
                path: 'manageUser',
                element:<AdminRoute><PrivateRoute><ManageUsers></ManageUsers></PrivateRoute> </AdminRoute> 
            },
            {
                path: 'advertise',
                element:<AdminRoute><PrivateRoute><Advertise></Advertise></PrivateRoute> </AdminRoute> 
            },
            {
                path: 'advertise/:id',
                element:<AdminRoute><PrivateRoute><Advertisement></Advertisement></PrivateRoute> </AdminRoute> 
            }
        ]
    }

]);