

const SingleReview = ({ data }) => {
    const { propertyTitle, review, reviewerEmail, reviewerImg, reviewerName } = data
    return (
        <div className="bg-gray-700 p-1 sm:p-4 text-white rounded-xl my-3">
            <div className="flex  items-center gap-3 sm:gap-7">
                <img className="w-9 h-9 sm:w-12 rounded-full sm:h-12 object-cover" src={reviewerImg} alt="" />
                <div className="my-3">
                   <p className="sm:text-sm sm:font-bold">{reviewerName}</p>
                   <p className="sm:text-lg sm:font-bold lg:text-sm lg:font-semibold">{reviewerEmail}</p>
                </div>
            </div>
            <div>
                <p className="sm:text-xl sm:font-bold my-1">Property Name :- {propertyTitle}...</p>
                <p className="text-lg font-bold">{review}</p>
            </div>
        </div>
    );
};

export default SingleReview; 