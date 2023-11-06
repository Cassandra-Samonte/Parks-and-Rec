import { useState, useEffect } from "react"
import { postReview, getReviews } from "../../../utils/backend"
import Review from "../Review"

export default function reviewSection({ parkId }) {
    // Save reviews queried from the database in state
    const [reviews, setReviews] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        name: '',
        content: ''
    })

    // Query the database for all reviews that pertain to this park
    useEffect(() => {
        getReviews(parkId)
            .then(reviews => setReviews(reviews))
    }, [])


    // Update the form fields as the user types
    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    // Render a form that allows a user to create a review on submit
    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    // Update the reviews in the review section after a database transaction
    function refreshReviews() {
        getReviews(parkId)
            .then(newReviewData => setReviews(newReviewData))
    }

    // Execute form submission logic
    function handleSubmit(event) {
        // prevent the page from reloading
        event.preventDefault()
        // clear the form
        setCreateFormData({
            name: '',
            content: ''
        })
        // close the form
        setShowCreateForm(false)
        // create the review in the backend
        postReview({ ...createFormData, parkId: parkId })
            .then(() => refreshReviews())
    }


    // conditionally render reviews
    let reviewElements = [<p key='0' className='text-center'>No reviews yet. Be the first to review!</p>]
    if (reviews.length > 0) {
        reviewElements = reviews.map(review => {
            return <Review
                key={review._id}
                data={review}
                refreshReviews={refreshReviews}
            />
        })
    }

    // conditionally display the text of the create form button
    let btnText = 'Create'
    if (showCreateForm) {
        btnText = 'Close'
    }

    return (
        <div className='review-section bg-gray-300 rounded-lg p-4 pb-10 mt-4 space-y-4 relative'>
            <h1 className='text-xl font-bold'>Viewer Insights</h1>
            <button
                onClick={toggleCreateForm}
                className="top-0 right-5 absolute text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                    <input
                        name="name"
                        className="px-2 py-1 w-full bg-gray-100"
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="content"
                        className="p-2 my-2 h-[100px] w-full bg-gray-100"
                        placeholder="Share your thoughts!"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </form>
            }
            {reviewElements}
        </div>
    )
}