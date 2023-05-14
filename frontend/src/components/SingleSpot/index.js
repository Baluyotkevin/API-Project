import React from "react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { thunkAllSpots, thunkSingleSpot } from '../../store/spot';
import { thunkAllReviewsSpot, thunkCurrUserReviews, thunkDeleteReview } from '../../store/review';
import EditReview from "../EditReview";
import DeleteReview from "../DeleteReview";
import OpenModalButton from "../OpenModalButton";
import ReviewForm from "../CreateReviewForm";
import './SingleSpot.css'

function DisplaySingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams()
    const currUser = useSelector(state => {
        return state.session.user
    })
    const singleSpot = useSelector(state=> {
        return state.spots.singleSpot[spotId]
    })
    const allReviews = useSelector(state => {
        return state.reviews.spot
    })

    const dateObj = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }

    const checkDate = (date) => {
        for (let month of Object.keys(dateObj)) {
          if (date === month) {
            console.log(date, month)
            return dateObj[month]
          }
        }
      }

    const checkReviews = [];
    Object.values(allReviews).forEach(rev=> checkReviews.push(rev.userId))

    useEffect(() => {
        dispatch(thunkSingleSpot(spotId))
        dispatch(thunkAllReviewsSpot(spotId))

    }, [dispatch, spotId])


    if(!singleSpot || !allReviews) return <p>PLEASE WAIT I"M LOADING</p>

    
    return (
        <div className='singleSpot-body'>
            <div className='firstContainer'>
                <div className='firstContainer-info'>
                    <h1>{singleSpot.name}</h1>
                    <p>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</p>
                </div>
                    <div className='allImages-container'>
                    <div className='main-image'>
                        <img src={singleSpot?.SpotImages?.[0].url}/>
                    </div>

            <ul className='spot-image-list'>
                {Array.isArray(singleSpot.SpotImages) && singleSpot.SpotImages.slice(1).map(spotImage => {
                    return (
                        <li className='allOther-images' key={spotImage.id}><img src={spotImage.url} alt='house image'/></li>
                            )
                 })}
            </ul>
                </div>

                    </div>
        <div className='div-p-container'>
            <div className='owner-descrip-container'>
                <h2>Hosted By {singleSpot?.Owner?.firstName} {singleSpot.Owner?.lastName}</h2>
                <p>{singleSpot.description}</p>
            </div>
            <div className='price-container'>
                <div className='buttonPriceContainer'>
                    <div className='reviewPrice-container'>
                        <p className='price'>${singleSpot.price} night</p>
                        {!singleSpot.numReviews ? 
                            <p className='star'><i class="fa-solid fa-star"></i>New</p>
                            :
                            (
                                <div className='singleSpot-reviewCount'>
                                    <p className='star'><i class="fa-solid fa-star"></i>{singleSpot.avgStarRating ? singleSpot.avgStarRating.toFixed(2) : 'New'}</p>
                                    <p className='numReview'>{singleSpot.numReviews} {singleSpot.numReviews === 1 ? 'Review' : 'Reviews'}</p>
                                </div>
                            )
                        }
                    </div>
                        <div className='button-container'>
                            <button onClick={() => alert('Feature coming soon.')}>Reserve</button>
                        </div>
                </div>
            </div>
        </div>
            {!singleSpot.avgStarRating ?
        <div className='star-container'>
            <h3><i className="fa-solid fa-star"></i>{singleSpot.avgStarRating ? singleSpot.avgStarRating.toFixed(2) : 'New'}</h3>
        </div>
            :
            <div className='singleSpot-reviewCount'>
                <div><i className="fa-solid fa-star"></i></div>
                <p className='dot'>.</p>
            <h3>{singleSpot.numReviews} {singleSpot.numReviews === 1 ? 'review' : 'reviews'}</h3>
            </div>
        }
                <div className='postReview-button'>
                    {currUser ? ((checkReviews.includes(currUser.id) || currUser.id === singleSpot.ownerId) ? 
                    null
                     :
                    <OpenModalButton
                     buttonText='Post Your Review'
                    modalComponent={<ReviewForm 
                       disabled={false}
                        spotId={singleSpot.id}
                                    />}
                  />) : <p>Need to be logged in to post a review!</p> }
                </div>
        <div className='reviews-container'>

            {!Object.values(allReviews).length ? 'Be the first to post a review!' : Object.values(allReviews).reverse().map(review => {
                const date = review?.createdAt.slice(5, 7)
                const month = checkDate(date)
                return (
                    <div>
                        <h5>{review?.User?.firstName}</h5>
                        <h5>{month}, {review?.createdAt.slice(0, 4)}</h5>
                        <p>{review?.review}</p>
                        <div className='spot-delete-button'>
                        {!currUser ? null : (currUser.id === review.userId ?
                            <OpenModalButton
                            buttonText='Update'
                            modalComponent={<EditReview disabled={false} review={review}/>}
                            /> : null)
                            
                        }
                        {!currUser ? null : (currUser.id === review.userId ?
                            <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteReview reviewId={review}/>} />
                            : null
                            )
                        }
                            </div>
                    </div>
                )
            })}
        </div>

        </div>
    )
        
}


export default DisplaySingleSpot;