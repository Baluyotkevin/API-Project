import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spot/loadAllSpots';
const GET_SINGLE_SPOT = 'spot/loadSingleSpot';
const CREATE_SPOT = 'spot/createSpot';
const CREATE_SPOT_IMAGES = 'spot/createSpotImages'
const UPDATE_SPOT = 'spot/updateSpot';
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
    console.log("THIS IS THE ACTION CREATOR, WHAT I GOT SENT FROM THE BACK END NOW BECOMES MY SPOT,", spot)
    return {
        type: CREATE_SPOT,
        spot
    }
}

const createSpotImages = (image, spotId) => {
    console.log("I HIT THE CREATE SPOT IMAGES ACTION CREATOR AND THE IMAGE NOW BECOMES MY NEW OBJECT", image, spotId)
    return {
        type: CREATE_SPOT_IMAGES,
        image,
        spotId
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
    console.log("I AM HERE BECAUSE THE COMPONENT CREATE SPOT DISPATCHED/CALLED ME", spot)
    try {
        res = await csrfFetch('/api/spots', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(spot)
        });

            const newSpot = await res.json()
            console.log("THIS IS WHAT I GET BACK FORM THE BACKEND AFTER SUBMITTING WHAT HAS BEEN SUBMITTED", newSpot)
            dispatch(createSpot(newSpot))
            console.log("THIS MY NEW SPOT THO", newSpot)
            newSpot.SpotImages = spot.SpotImages.forEach(image => {
                console.log("THIS ISSS MY SPOOOOOT", spot)
                dispatch(thunkCreateSpotImages(image, newSpot.id))
                })
                console.log("MY NEW SPOTIMAGES ARRAY ", newSpot)
            return newSpot
    } catch (err) {
        const errors = await err.json();
        return errors
    }   
}

export const thunkCreateSpotImages = (image, spotId) => async dispatch => {
    let res;
    console.log("I HAVE BEEN CALLED HERE BY THE CREATE SPOT THUNK", image)
    try {
        res = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: image.url,
                preview: image.preview
            })
        });
        const newImage = await res.json()
        console.log("I WAIT FOR THIS newImage I GOT FROM THE BACKEND", newImage)
        dispatch(createSpotImages(image, spotId))
        return newImage
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

        // console.log("THIS IS MY RES", spot)
        const updatedSpot = await res.json()
        // console.log("THIS WHAT IM LOOKIN AT THO", updatedSpot)
            dispatch(editSpot(updatedSpot))
            // dispatch(thunkSingleSpot)
            return updatedSpot
        } catch (err) {
            const errors = await err.json();
            return errors
    }
}

export const thunkDeleteSpot = (spotId) => async dispatch => {
    let res;
    try {
        // console.log("THIS IS MY SPOT ID", spotId)
        res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        })
        const deletedSpot = await res.json()
        dispatch(deleteSpot(spotId))
        // dispatch(thunkCurrUserSpot())
        // console.log("THIS IS MY deletedSpot", deletedSpot)
        // return deletedSpot
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
        case GET_ALL_SPOTS: {
            const newSpots = {};
            const spotsArray = action.spots.Spots;
            spotsArray.forEach(spot => {
                newSpots[spot.id] = spot
            })
                return {
                    ...state,
                    allSpots: newSpots
                }
        }

        case GET_CURR_USER_SPOT: {
            const newSpots = {}
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
                console.log('THSI IS WHAT IM LOOKING AT AS OF NOW', action)
                console.log("THSI AS WELLLL", state)
                const singleSpot = action.spot;
                console.log("THIS MY SINGLE SPOOOOT", singleSpot)
                newSpot[singleSpot.id] = singleSpot
                return { 
                    ...state,
                    singleSpot: newSpot
                }
        case CREATE_SPOT: {
            const newSpot = {}
            const createdSpot = action.spot
            newSpot[createdSpot.id] = createdSpot
            console.log('I HIT THIS CREATE Spot CASE NOW and this is my new STATE', newSpot)
                return {
                    ...state,
                    singleSpot: newSpot
                }
            }
        case CREATE_SPOT_IMAGES: {
            const newSpot = { ...state.singleSpot }
            console.log('THIS IS MY STATE IF THERE IT IS AN INSTANCE OF AN ARRAY I SHALL PUSH', newSpot)
            if (newSpot.SpotImages instanceof Array) {
                newSpot.SpotImages.push(action.image)
            } else {
                console.log("IF THERE IS NO ARRAY THEN I SHALL MAKE ONE")
                newSpot.SpotImages = [action.image];
            }
            console.log("I HIT THIS CREATE SPOT IMAGES CASE", newSpot)
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
            const newSpot = { ...state.allSpots };
            delete newSpot[action.spotId]
            return {
                ...state,
                allSpots: newSpot
            }
            }  
        default:
            return state;

    }
}



export default allSpotsReducer