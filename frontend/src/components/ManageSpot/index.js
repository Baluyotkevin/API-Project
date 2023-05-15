import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCurrUserSpot } from "../../store/spot";
import DeleteSpot from '../DeleteSpot'
import OpenModalButton from '../OpenModalButton'
import './ManageSpot.css'

const DisplayCurrUserSpots = () => {
    const dispatch = useDispatch()
    const currUserSpots = useSelector(state => {
        return state.spots.allSpots
    })
    
    useEffect(() => {
        dispatch(thunkCurrUserSpot())
    }, [dispatch])


    return (
        <div className='manageSpotTop'>
            <div className='manageSpot-header'>
                <h1>Manage Spots</h1>
                    <Link exact to='/spots/new'>
                        <button className='manageSpot-button'>Create a New Spot</button>
                    </Link>
            </div>
                <div className='allSpots-allSpots-container'>
            <ul className='allSpots-container'>
                {Object.values(currUserSpots).map(spot => {
                    console.log(spot)
                    return (
                        <div key={spot.id} className='oneSpot-container'>
                            <div className="preview-image">
                                <Link exact to={`/spots/${spot.id}`}>
                                    <img src={spot.previewImage} />
                                </Link>
                            </div>
                            <div className='spotDetails-container'>
                                <div>
                                    <p>{spot.city}, {spot.state}</p>
                                    <p>$ {spot.price} night</p>
                                </div>
                                    <div className='rating-container'>
                                    <p>{spot.avgRating}</p>
                                </div>
                            <div className='manageSpot-updateDelete'> 
                                <Link exact to={`/spots/${spot.id}/edit`}>
                                    <button className='updateBut'>Update</button>
                                </Link>
                                        <OpenModalButton 
                                        buttonText='Delete'
                                        modalComponent={<DeleteSpot spotId={spot.id} />}
                                        />
                            </div>
                            </div>
                        
                        </div>


)
})}
            </ul>
        </div>
        </div>
    )
}

export default DisplayCurrUserSpots