import React from "react";
import { thunkSingleSpot } from '../../store/spot';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './SingleSpot.css'

function DisplaySingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams()
    const singleSpot = useSelector(state=> {

        console.log("single spottt", state.spots.singleSpot[spotId])
        return state.spots.singleSpot[spotId]
    })
        
    // console.log("state:", singleSpot)
    
    useEffect(() => {
        dispatch(thunkSingleSpot(spotId))
    }, [dispatch])
    
    if(!singleSpot) return <p>PLEASE WAIT I"M LOADING</p>

    return (
        <div>
            <ul className='spot-image-list'>
                <li className='main-image'><img src={singleSpot.SpotImages[0].url}/></li>
        {singleSpot.SpotImages.slice(1).map(spotImage => {
            return (
                <li className='allOther-images' key={spotImage.id}><img src={spotImage.url} alt='house image'/></li>
            )
        })}
            </ul>
        <div className='div-p-container'>
            <div className='owner-descrip-container'>
                <p>Hosted By {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</p>
                <p>{singleSpot.description}</p>
            </div>
            <div className='price-container'>
                    <div className='reviewPrice-container'>
                        <p>{singleSpot.price}</p>
                        <p>{singleSpot.avgStarRating}</p>
                        <p>number of reviews</p>
                    </div>
                        <div className='button-container'>
                    <button>Reserve</button>
                    </div>
            </div>
        </div>
        <div className='star-container'>
            {singleSpot.avgStarRating}
        </div>

        </div>
    )
}


export default DisplaySingleSpot;