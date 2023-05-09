import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spot/loadAllSpots';
const GET_SINGLE_SPOT = 'spot/loadSingleSpot';
const CREATE_SPOT = 'spot/createSpot';
const UPDATE_SPOT = 'spot/editSpot';
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

const editSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
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
    let res;
    try {
        res = await csrfFetch('/api/spots', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(spot)
        });
            const newSpot = await res.json()
            dispatch(createSpot(newSpot))
            return newSpot
    } catch (err) {
        const errors = await err.json();
        return errors
    }   
}

export const thunkEditSpot = (spot) => async dispatch => {
    let res;
    console.log("THIS MY SPOT RIGHT HEEEEE", spot)
    try {
        res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(spot)
        })

        console.log("THIS IS MY REEEES:", res)

            const updatedSpot = await res.json()
            dispatch(editSpot(updatedSpot))
            return updatedSpot
        } catch (err) {
            const errors = await err.json();
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
            case UPDATE_SPOT: {
                const newSpot = {};
                const updatedSpot = action.spot
                newSpot[updatedSpot.id] = updatedSpot
                return {
                    ...state,
                    singleSpot: newSpot
                }
            }
        default:
            return state;

    }
}



export default allSpotsReducer