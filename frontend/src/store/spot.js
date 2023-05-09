const GET_ALL_SPOTS = 'spot/loadAllSpots'
const GET_SINGLE_SPOT = 'spot/loadSingleSpot'
// all action creators

const loadAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots,
    }
}

const loadSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    }
}

// all thunks
export const thunkAllSpots = () => async dispatch => {
    const res = await fetch('/api/spots')
    if(res.ok) {
        const allSpots = await res.json();
        dispatch(loadAllSpots(allSpots))
    }
}

export const thunkSingleSpot = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`)
    if(res.ok) {
        const singleSpot = await res.json();
        dispatch(loadSingleSpot(singleSpot))
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
};

// all reducers
const allSpotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            const newSpots = {};
            const spotsArray = action.spots.Spots;
            // console.log("spotsArray:", spotsArray)
            spotsArray.forEach(spot => {
                newSpots[spot.id] = spot
            })
                return {
                    ...state,
                    allSpots: newSpots
                }
            case GET_SINGLE_SPOT:
                const newSpot = {}
                const singleSpot = action.spot;
                newSpot[singleSpot.id] = singleSpot
                // newSpot[singleSpot.id] = singleSpot
                // newSpot = singleSpot
                // console.log("newSPot: ", singleSpot)
                return { 
                    ...state,
                    singleSpot: newSpot
                }
            // const newAllSpots = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}};
        // action.spots.Spots.map(spot => {
            // console.log("newAllSpots:", newAllSpots)
        //     newAllSpots[spot.id] = spot
        // })
        // return {
        //     ...state,
        //     ...newAllSpots
        // }
        default:
            return state;

    }
}



export default allSpotsReducer