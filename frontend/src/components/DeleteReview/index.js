import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeleteReview } from '../../store/review';
import { useModal } from "../../context/Modal";

const DeleteReview = ({reviewId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleDelete = (e) => {
        e.preventDefault()
        history.push('/reviews/current')
        dispatch(thunkDeleteReview(reviewId))
    }

    return (
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default DeleteReview;