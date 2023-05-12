import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeleteReview } from '../../store/review';

const DeleteReview = ({reviewId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(thunkDeleteReview(reviewId))
        // history.push('/reviews/current')
    }

    return (
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default DeleteReview;