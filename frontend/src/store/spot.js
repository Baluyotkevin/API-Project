import { csrfFetch } from './csrf'
const GET_ALL_SPOTS = 'spot/loadAllSpots'

// all action creators

const loadAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        // payload: spots
        // allSpots
    }
}

// all thunks
export const thunkAllSpots = () => async dispatch => {
    const res = await fetch('/api/spots')
    console.log(res)
    if(res.ok) {
        const allSpots = await res.json();
        dispatch(loadAllSpots(allSpots))
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
};

// all reducers
const allSpotsReducer = (state = initialState, action) => {
    // console.trace(action)
    // switch (action.type) {
    //     case GET_ALL_SPOTS:
    //         const newAllSpots = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}};
    //     action.allSpots.map(spot => {
    //         newAllSpots[spot.id] = spot
    //     })
    //     return {
    //         ...state,
    //         ...newAllSpots
    //     }
        // default:
            return state;

    }
// }



export default allSpotsReducer