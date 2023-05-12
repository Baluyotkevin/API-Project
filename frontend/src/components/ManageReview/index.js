import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCurrUserReviews } from "../../store/review";
import OpenModalButton from '../OpenModalButton'
import EditReview from '../EditReview'
import DeleteReview from '../DeleteReview'


const DisplayCurrUserReviews = () => {
    const dispatch = useDispatch()
    const currUserReviews = useSelector(state => {
        return state.reviews.user
    })
    console.log(currUserReviews)
    useEffect(() => {
        dispatch(thunkCurrUserReviews())
    }, [dispatch])

    if(!currUserReviews) return <>I AM LOADING</>
    
    return (
        <div>
            <h2>Manage your Reviews</h2>
            <ul>
                {Object.values(currUserReviews).map(review => {
                    // console.log("THIS IS IT",review)
                    return (
                        <div key={review.id}>
                                <h3>{review.Spot.name}</h3>
                                <p>{review.updatedAt.slice(0, 10)}</p>
                                <p>{review.review}</p>
                            <div>
                                <OpenModalButton
                                buttonText='Update'
                                modalComponent={<EditReview review={review}/>}
                                />
                                <OpenModalButton
                                buttonText='Delete'
                                modalComponent={<DeleteReview reviewId={review.id} />}
                                 />
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default DisplayCurrUserReviews;