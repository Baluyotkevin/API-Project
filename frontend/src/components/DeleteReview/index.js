import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteReview } from '../../store/review';
import { useModal } from "../../context/Modal";
import { thunkSingleSpot } from '../../store/spot';

const DeleteReview = ({reviewId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    // const spotId = useSelector(state => {
    //     console.log("THIS IS MY STATE", state)
    //     return Object.values(state.reviews.spot)
    // })

    // useEffect(() => {
        
    // })
    
    const handleDelete = (e) => {
        // e.preventDefault()
        // history.push(`/spots/${review.spotId}`)
        dispatch(thunkDeleteReview(reviewId.id))
        dispatch(thunkSingleSpot(reviewId.spotId))
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