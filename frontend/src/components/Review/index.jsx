import { useState } from "react";
import { updateReview, deleteReview } from "../../../utils/backend";

export default function Review({ data, refreshReviews }) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        content: data.content
    });

    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setShowEditForm(false);
        updateReview(editFormData, data._id)
            .then(() => refreshReviews());
    }

    function handleDelete() {
        deleteReview(data._id)
            .then(() => refreshReviews());
    }

    let reviewElement = (
        <div className="p-4 border border-gray-200 rounded-lg">
            <p className="font-bold">{data.name}</p>
            <p className="my-2">{data.content}</p>
            <div className="flex justify-start space-x-2">
                <button onClick={() => setShowEditForm(true)} className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                    Edit
                </button>
                <button onClick={handleDelete} className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                    Delete
                </button>
            </div>
        </div>
    );

    if (showEditForm) {
        reviewElement = (
            <form onSubmit={handleSubmit} className="p-4 mt-4 border border-gray-200 rounded-lg">
                <input
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="Your name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                />
                <textarea
                    name="content"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="Share your thoughts!"
                    value={editFormData.content}
                    onChange={handleInputChange}
                />
                <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={() => setShowEditForm(false)} className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                        Close
                    </button>
                    <button type="submit" className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                        Post
                    </button>
                </div>
            </form>
        );
    }

    return reviewElement;
}
