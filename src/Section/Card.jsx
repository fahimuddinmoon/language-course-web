import { Link } from "react-router-dom";


const Card = ({info}) => {
    
    const {Image,bayerEmail,bayerImg,bayerName,location,maxPrice,minPrice,status,title,_id} = info
    return (
        <div className="card card-compact bg-yellow-700 shadow-xl border my-3">
            <figure>
                <img
                    className="w-56 h-56 object-cover p-3 rounded-3xl"
                    src={Image}
                    alt="" />
            </figure>
            <div className="card-body">
                <div className="flex gap-6 justify-between">
                    <img className="w-12 h-12 rounded-full" src={bayerImg} referrerPolicy="no-referrer" alt="" />
                    <div>
                    <h2 className="text-sm font-semibold mb-2">Seller Name :- {bayerName} </h2>
                    <p className="text-sm font-semibold  mb-2">Seller Email :- {bayerEmail} </p>
                    </div>
                </div>
                <p className="card-title text-2xl font-bold">Property Name :- {title}  </p>
                <p className="text-xl font-semibold mb-2">Property Location :- {location}  </p>
                <p className="text-xl font-semibold mb-2">Price :- {minPrice} - {maxPrice} </p>
                <p className="text-xl font-semibold mb-2">Status :- {status} </p>
                <div className="card-actions justify-end">
                    <Link to={`/detail/${_id}`}  className="btn btn-primary">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;