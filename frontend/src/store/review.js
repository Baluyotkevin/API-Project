const GET_ALL_REVIEWS_USER = 'spot/loadCurrUserReviews'

const loadCurrUserReviews= (reviews) => {
    return {
        type: GET_ALL_REVIEWS_USER,
        reviews
    }
}


export const thunkAllCurrUserReviews = () => async dispatch => {
    const res = await fetch('/api/reviews/current')
    if(res.ok) {
        const allReviews = await res.json()
        dispatch(loadCurrUserReviews(allReviews))
    }
}