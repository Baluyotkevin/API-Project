import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS_CURR_USER = 'review/loadCurrUserReviews';
const GET_ALL_REVIEWS_SPOT = 'review/loadSpotReviews';
const CREATE_REVIEW = 'review/createReview';
const UPDATE_REVIEW = 'review/updateReview';
const DELETE_REVIEW = 'review/deleteReview';

const loadCurrUserReviews= (userId) => {
    return {
        type: GET_ALL_REVIEWS_CURR_USER,
        userId
    }
}

const loadSpotReviews = (spot) => {
    return {
        type: GET_ALL_REVIEWS_SPOT,
        spot
    }
}

const createReviews = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const editReviews = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

const deleteReviews = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}


export const thunkAllReviewsSpot = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const allReviewsSpot = await res.json()
            dispatch(loadSpotReviews(allReviewsSpot))
    }
}

export const thunkCurrUserReviews = () => async dispatch => {
    let res;
    try {
        res = await csrfFetch('/api/reviews/current')
            const allReviews = await res.json()
            dispatch(loadCurrUserReviews(allReviews))
            
    } catch (err) {
        const errors = await err.json();
        return errors
    }
}


export const thunkCreateReview = (review) => async dispatch => {
    let res;
    // console.log("WHAT IS THIS ", review)
    try {
        res = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json'},
           body: JSON.stringify(review)
       })
       const newReview = await res.json()
    //    dispatch(loadSpotReviews(newReview.spotId))
       dispatch(createReviews(newReview))
       return newReview
    } catch (err) {
        const errors = await err.json()
        return errors
    }
}

export const thunkEditReview = (review) => async dispatch => {
    let res;
    try {
        res = await csrfFetch(`/api/reviews/${review.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        })
        const updatedReview = await res.json()
        dispatch(editReviews(updatedReview))
    } catch (err) {
        const errors = await err.json();
        return errors
    }
}

export const thunkDeleteReview = (reviewId) => async dispatch => {
    let res;
    try {
        res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        })
        const deletedReview = await res.json()
        dispatch(deleteReviews(reviewId))
        return deletedReview
    } catch (err) {
        const errors = await err.json()
        return errors
    }
}

const initialState = {
    spot: {},
    user: {}
}

const allReviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_REVIEWS_SPOT: {
            const newSpotReviews = {};
            const reviews = action.spot.Reviews
            reviews.forEach(review => {
                newSpotReviews[review.id] = review
            })
            return {
                ...state,
                spot: newSpotReviews
            }
        }
        case GET_ALL_REVIEWS_CURR_USER: {
            const newReviews = {};
            const reviewsArr = action.userId.Reviews
            console.log("WHAT IS THIS", action)
            reviewsArr.forEach(review => {
                newReviews[review.id] = review
            })
            return {
                ...state,
                user: newReviews
            }
        }
        case CREATE_REVIEW: {
            const newReview =  {};
            const review = action.review
            console.log("THIS IS IT", review)
            console.log("THIS IS BEFORE ", review.spot)
            newReview[review.id] = review
        
            return {
                ...state,
                spot: { ...state.spot, newReview }
            }
        }
        case UPDATE_REVIEW: {
            const newReview = {};

            const updatedReview = action.review
            newReview[updatedReview.id] = updatedReview
            return {
                ...state,
                user: newReview
                // { ...state.user, newReview}
            }
        }
        case DELETE_REVIEW: {
            // console.log("THIS IS CURRENTLY MY STATE", state)
            const newReview = { ...state.spot};
            const newUser= { ...state.user } 

            delete newReview[action.reviewId]
            delete newUser[action.reviewId]
            return {
                spot: newReview,
                user: newUser
            }
        }

        // const newReview = { ...state.spot.user };
        //     console.log("THIS IS MY STAAATE ", state)
        //     console.log("THIS RIGHT HEREEEEEE", newReview)
        //     delete newReview[action.reviewId]
        //     console.log("THIUS IS WRIGHT HEREEE", newReview)
        //     console.log("THSI MY NEW STAATE",)
        //     return {
        //         ...state,
        //         spot: newReview
        //     }

        default: 
        return state;
    }
}

export default allReviewsReducer