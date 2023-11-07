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
        <div>
            <h1 className='text-xl font-bold'>Park Reviews</h1>
            <button
                onClick={toggleCreateForm}
                className=""
            >
                {btnText}
            </button>
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="">
                    <input
                        name="name"
                        className=""
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="content"
                        className=""
                        placeholder="Share your thoughts!"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="">
                        Post
                    </button>
                </form>
            }
            {reviewElements}
        </div>
    )
}