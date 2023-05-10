import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCurrUserSpot } from "../../store/spot";
import  DeleteSpot from '../DeleteSpot'

const DisplayCurrUserSpots = () => {
    const dispatch = useDispatch()
    const currUserSpots = useSelector(state => {
        return Object.values(state.spots.allSpots)
    })
    
    useEffect(() => {
        dispatch(thunkCurrUserSpot())
    }, [dispatch])

    


    return (
        <div>
            <div>
                <h1>Manage Spots</h1>
                    <Link exact to='/spots/new'>
                        <button>Create a New Spot</button>
                    </Link>
            </div>
            <ul className='allSpots-container'>
                {currUserSpots.map(spot => {
                    return (
                        <div className='oneSpot-container'>
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
                            </div>
                            <div>
                                <Link exact to={`/spots/${spot.id}/edit`}>
                                    <button>Update</button>
                                </Link>
                                    <DeleteSpot spotId={spot.id}/>
                            </div>
                        
                        </div>
                        
                    )
                })}
            </ul>
        </div>
    )
}

export default DisplayCurrUserSpots