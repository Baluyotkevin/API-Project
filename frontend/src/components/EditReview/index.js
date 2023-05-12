import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkEditReview } from '../../store/review';
import { useModal } from "../../context/Modal";

const EditReview = ({review}) => {
    const history = useHistory()
    const actualReview = review.review
    // const [review, setReview] = useState()
    // const [reviewDescrip, setReviewDescrip] = useState(review?.reviewDescrip)
    console.log("WHAT IS THIS THOUGH", review.review)
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleEdit = (e) => {
        e.preventDefault()
        history.push('/reviews/current')
        dispatch(thunkEditReview(review))
        .then(closeModal)
    }
    
    return (
        <>
            <h1>How was your stay at</h1>
            <textarea
            placeholder='Just a quick review'
            type='text'
            value={actualReview}
            // onChange={(e) => setReviewDescrip(e.target.value)}
            />
            <div></div>
            <button onClick={handleEdit}>Update Your Review</button>
        </>
    )

}

export default EditReview;