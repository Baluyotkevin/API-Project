import React from "react";
import { thunkSingleSpot } from '../../store/spot';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

function DisplaySingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams()
    const singleSpot = useSelector(state=> {
        console.log("single spot", state.spots.singleSpot.SpotImages)
        return state.spots.singleSpot
    })
        
        console.log("state:", singleSpot)
        
        useEffect(() => {
            dispatch(thunkSingleSpot(spotId))
        }, [dispatch, spotId])
        
        if(!singleSpot) return <p>PLEASE WAIT I"M LOADING</p>

    return (
        <div>
        {/* {singleSpot.SpotImages.map(spotImage => {
            return (
            <ul>
                <li key={spotImage.id}><img src={spotImage.url}/></li>
            </ul>
            )
        })}
        <div>
            <div>
                <p>Hosted By {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</p>
                <p>{singleSpot.description}</p>
            </div>
            <div>
                <p>{singleSpot.price}</p>
            </div>
        </div>

        <div>
            {singleSpot.avgStarRating}
        </div> */}

        </div>
    )
}


export default DisplaySingleSpot;