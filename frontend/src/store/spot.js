import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spot/loadAllSpots';
const GET_SINGLE_SPOT = 'spot/loadSingleSpot';
const CREATE_SPOT = 'spot/createSpot';
const UPDATE_SPOT = 'spot/editSpot';
const DELETE_SPOT = 'spot/deleteSpot';
const GET_CURR_USER_SPOT = 'spot/loadCurrUserSpot';
// all action creators


const loadAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots,
    }
}

const loadCurrUserSpot = (userId) => {
    return {
        type: GET_CURR_USER_SPOT,
        userId
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

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
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

export const thunkCurrUserSpot = () => async dispatch => {
    let res;
    try {
        res = await csrfFetch('/api/spots/current')
        const currUserSpots = await res.json()
        console.log("THIS IS MY UPDATED SPOOOOT", currUserSpots)
        dispatch(loadCurrUserSpot(currUserSpots))
        return currUserSpots
    } catch (err) {
        const errors = await err.json()
        return errors
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
    try {
        res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(spot)
        })
            const updatedSpot = await res.json()
            dispatch(editSpot(updatedSpot))
            return updatedSpot
        } catch (err) {
            const errors = await err.json();
            return errors
    }
}

export const thunkDeleteSpot = (spot) => async dispatch => {
    let res;
    try {
        res = await csrfFetch(`/api/spots/${spot.id}`), {
            method: 'DELETE'
        }
        const deletedSpot = await res.json()
        dispatch(deleteSpot(deletedSpot))
        return deletedSpot
    } catch (err) {
        const errors = await res.json()
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

        case GET_CURR_USER_SPOT: {
            const newSpots = {}
            console.log("SECOND IS WHAT IM LOOKING:", action.userId)
            const spotsArray = action.userId.Spots
            spotsArray.forEach(spot => {
                newSpots[spot.id] = spot
            })
            return {
                ...state,
                allSpots: newSpots
            }
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
            case DELETE_SPOT: {
                const newSpot = { ...state }
                console.log(newSpot)
                delete newSpot[action.spotId]
                return newSpot
            }  
        default:
            return state;

    }
}



export default allSpotsReducer