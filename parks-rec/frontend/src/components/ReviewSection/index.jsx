import { useState, useEffect } from "react";
import { postReview, getReviews } from "../../../utils/backend";
import Review from "../Review";

export default function reviewSection({ parkId }) {
    const [reviews, setReviews] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        name: '',
        content: ''
    });

    useEffect(() => {
        getReviews(parkId).then(reviews => setReviews(reviews));
    }, [parkId]);

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        });
    }

    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm);
    }

    function refreshReviews() {
        getReviews(parkId).then(newReviewData => setReviews(newReviewData));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setCreateFormData({ name: '', content: '' });
        setShowCreateForm(false);
        postReview({ ...createFormData, parkId: parkId }).then(() => refreshReviews());
    }

    let reviewElements = reviews.length > 0 
        ? reviews.map(review => <Review key={review._id} data={review} refreshReviews={refreshReviews} />)
        : [<p key='0' className='text-center'>No reviews yet. Be the first to review!</p>];

    let btnText = showCreateForm ? 'Close' : 'Create';

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Park Reviews</h1>
            <button onClick={toggleCreateForm} className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                {btnText}
            </button>
            {showCreateForm && (
                <form onSubmit={handleSubmit} className="p-4 mt-4 border border-gray-200 rounded-lg">
                    <input
                        name="name"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="content"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        placeholder="Share your thoughts!"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 mt-2">
                        Post
                    </button>
                </form>
            )}
            <div className="space-y-2">
                {reviewElements}
            </div>
        </div>
    );
}
