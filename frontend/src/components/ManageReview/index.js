import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCurrUserReviews } from "../../store/review";
import OpenModalButton from '../OpenModalButton'

const DisplayCurrUserReviews = () => {
    const dispatch = useDispatch()
    const currUserReviews = useSelector(state => {
        return Object.values(state.reviews)
    })

    useEffect(() => {
        dispatch(thunkCurrUserReviews())
    }, [dispatch])

    return (
        <div>
            <h1>Manage your Reviews</h1>
            <ul>
                {Object.values(currUserReviews).map(review => {
                    return (
                        <div>
                            <h4>{}</h4>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default DisplayCurrUserReviews;