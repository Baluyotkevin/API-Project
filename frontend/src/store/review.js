import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS_CURR_USER = 'spot/loadCurrUserReviews';
const GET_ALL_REVIEWS_SPOT = 'spot/loadSpotReviews'

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


export const thunkCurrUserReviews = () => async dispatch => {
    let res;
    try {
        res = await csrfFetch('/api/reviews/current')
            const allReviews = await res.json()
            dispatch(loadCurrUserReviews(allReviews))
            return allReviews
    } catch (err) {
        const errors = await err.json();
        return errors
    }
}

export const thunkAllReviewsSpot = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const allReviewsSpot = await res.json()
        // console.log(allReviewsSpot)
            dispatch(loadSpotReviews(allReviewsSpot))
    }
}

const initialState = {
    spot: {},
    user: {}
}

const allReviewsReducer = (state = {}, action) => {
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
            reviewsArr.forEach(review => {
                newReviews[review.id] = review
            })
            return {
                ...state,
                user: newReviews
            }
        }

        default: 
        return state;
    }
}

export default allReviewsReducer