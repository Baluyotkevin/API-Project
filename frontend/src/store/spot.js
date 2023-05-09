const GET_ALL_SPOTS = 'spot/loadAllSpots';
const GET_SINGLE_SPOT = 'spot/loadSingleSpot';
const CREATE_SPOT = 'spot/createSpot';
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

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
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

export const thunkCreateSpot = (spot) => async dispatch => {
    const res = await fetch('/api/spots', {
        methods: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });

    if(res.ok) {
        const newSpot = await res.json()
        dispatch(createSpot(newSpot))
        return newSpot
    } else {
        const errors = await res.json();
        return errors
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
                return { 
                    ...state,
                    singleSpot: newSpot
                }
            case CREATE_SPOT: {
                const newSpot = {}
                const createdSpot = action.spot
                newSpot[createdSpot.id] = createdSpot
                return {
                    ...state,
                    singleSpot: newSpot
                }
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