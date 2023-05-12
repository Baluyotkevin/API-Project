import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteReview } from '../../store/review';
import { useModal } from "../../context/Modal";

const DeleteReview = ({review}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    // const spotId = useSelector(state => {
    //     console.log("THIS IS MY STATE", state)
    //     return Object.values(state.reviews.spot)
    // })
    
    const handleDelete = (e) => {
        e.preventDefault()
        // history.push(`/spots/${review.spotId}`)
        dispatch(thunkDeleteReview(review.id))
        .then(closeModal)
    }

    return (
        <>
        <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={closeModal}>No</button>
        </>
    )
}

export default DeleteReview;