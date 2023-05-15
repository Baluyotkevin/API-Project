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
    
    const handleDelete = (e) => {
        e.preventDefault()
        // history.push(`/spots/${review.spotId}`)
        dispatch(thunkDeleteReview(reviewId.id))
        dispatch(thunkSingleSpot(reviewId.spotId))
        .then(closeModal)
    }


    return (
        <>
        <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete?</p>
        <button className='spotDeleteYas' onClick={handleDelete}>Yes (Delete Reiew)</button>
        <button className='spotDeleteKeep'onClick={closeModal}>No (Keep Review)</button>
        </>
    )
}

export default DeleteReview;