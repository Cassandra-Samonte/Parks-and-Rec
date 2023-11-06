import { useState } from "react"
import { updateReview, deleteReview } from "../../../utils/backend"

export default function Review({ data, refreshReviews }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        content: data.content
    })

    // Update the form fields as the user types
    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    // Execute form submission logic
    function handleSubmit(event) {
        // prevent the page from reloading
        event.preventDefault()
        // close the form
        setShowEditForm(false)
        // update the review in the backend
        updateReview(editFormData, data._id)
            .then(() => refreshReviews())
    }

    // Delete a review
    function handleDelete() {
        deleteReview(data._id)
            .then(() => refreshReviews())
    }


    //  Default JSX of each review
    let reviewElement = <div
        className="">
        <p className="font-bold">{data.name}</p>
        <p className="my-2">{data.content}</p>
        <div className="">
            <button
                onClick={() => { setShowEditForm(true) }}
                className="">
                Edit
            </button>
            <button
                onClick={handleDelete}
                className="">
                Delete
            </button>
        </div>
    </div>

    // Change the review to a form if the showEditForm state variable is true
    if (showEditForm) {
        reviewElement = <form
            onSubmit={handleSubmit}
            className="">
            <input
                name="name"
                className=""
                placeholder="Your name"
                value={editFormData.name}
                onChange={handleInputChange}
            />
            <br />
            <textarea
                name="content"
                className=""
                placeholder="Share your thoughts!"
                value={editFormData.content}
                onChange={handleInputChange}
            />
            <div>
                <button
                    onClick={() => { setShowEditForm(false) }}
                    className="">
                    Close
                </button>
                <button
                    type="submit"
                    className="">
                    Post
                </button>
            </div>
        </form>
    }

    return reviewElement
}