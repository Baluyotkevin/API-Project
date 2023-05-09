const GET_ALL_REVIEWS_USER = 'spot/loadCurrUserReviews';
const GET_ALL_REVIEWS_SPOT = 'spot/loadSpotReviews'

const loadCurrUserReviews= (reviews) => {
    return {
        type: GET_ALL_REVIEWS_USER,
        reviews
    }
}

const loadSpotReviews = (spot) => {
    return {
        type: GET_ALL_REVIEWS_SPOT,
        spot
    }
}


export const thunkAllReviewsCurrUser = () => async dispatch => {
    const res = await fetch('/api/reviews/current')
    if(res.ok) {
        const allReviews = await res.json()
        dispatch(loadCurrUserReviews(allReviews))
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

const allReviewsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_ALL_REVIEWS_SPOT: 
        const newSpotReview = {};
        const reviews = action.spot.Reviews
        // console.log("review: ", reviews)
        // console.log(action.spot)
        reviews.forEach(review => {
            newSpotReview[review.id] = review
        })
        return {
            ...state,
            spotReviews: newSpotReview
        }
        default: 
        return state;
    }
}

export default allReviewsReducer