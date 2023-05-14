import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkEditReview } from '../../store/review';
import { useModal } from "../../context/Modal";

const EditReview = ({review, disabled}) => {
    // why didn't i create a form for both cases again dang it
    const history = useHistory()
    const [rev, setRev] = useState(review.review);
    const [stars, setStars] = useState(review.stars);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleEdit = async (e) => {
        e.preventDefault()
        setErrors({})
        const revObj = {
            // ...review,
            spotId: review.spotId,
            review: rev,
            stars: stars
        }

        const edittedReview = await dispatch(thunkEditReview(revObj))
        console.log(edittedReview)
        if (edittedReview.errors) {
            setErrors(edittedReview.errors)
            // dispatch(thunkAllReviewsSpot()
        } else {
            closeModal()
        }

    }
    
    return (
        <div>
                <form onSubmit={handleEdit}>
                <h1>How was your stay?</h1>
                <textarea 
                placeholder='Leave your review here...'
                type='text'
                value={rev}
                onChange={(e) => setRev(e.target.value)}
                cols='30'
                rows='5'
                />
                <div className='errors'>{errors.review}</div>
            <div className='star-input'>
                <div
            className={stars >= 1 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(1)} }
            onMouseLeave={() => { if (!disabled) setStars(1)} }
            onClick={() => { if (!disabled) parseInt(1)} }
            // value={stars}
            >
                <i className="fa-regular fa-star"></i>
      </div>
                 <div
            className={stars >= 2 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(2)} }
            onMouseLeave={() => { if (!disabled) setStars(2)} }
            onClick={() => { if (!disabled) parseInt(2)} }
            // value={stars}
            >
        <i className="fa-regular fa-star"></i>
                </div>
                <div
            className={stars >= 3? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(3)} }
            onMouseLeave={() => { if (!disabled) setStars(3)} }
            onClick={() => { if (!disabled) parseInt(3)} }
            // value={stars}
            >
        <i className="fa-regular fa-star"></i>
      </div>
                <div
            className={stars >= 4 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(4)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(4)} }
            // value={stars}
            >
        <i className="fa-regular fa-star"></i>
      </div>
                <div
            className={stars >= 5 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(5)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(5)} }
            // value={stars}
            >
        <i className="fa-regular fa-star"></i>
      </div> 
      </div>
      <div className='errors'>{errors.stars}</div>
                <div>
                <button type="submit" >Submit Your Review</button>
                </div>
                </form>
            </div>
    )

}

export default EditReview;