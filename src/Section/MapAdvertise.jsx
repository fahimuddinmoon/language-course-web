

const MapAdvertise = ({ data }) => {
    
    const { propertyTitle, advertise,propertyLocation, adminEmail, reviewerName ,adminIMG} = data
    return (
        <div className="p-6 text-center items-center bg-gray-200 text-gray-700 rounded-xl my-4">
            <img className="w-24 h-24 rounded-full object-cover mx-auto hover:border-4 hover:border-yellow-800" src={adminIMG} alt="" />
            <p className="text-lg font-semibold m-2">{adminEmail}</p>
            <p className="text-lg font-semibold m-2">Title:- {propertyTitle}..</p>
            <p className="text-lg font-semibold m-2">Location:- {propertyLocation}..</p>
            <p className="text-lg font-semibold m-2">{advertise}...</p>
        </div>
    );
};

export default MapAdvertise;