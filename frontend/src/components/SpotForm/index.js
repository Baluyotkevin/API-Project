import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateSpot, thunkEditSpot, thunkSingleSpot } from '../../store/spot'

import './SpotForm.css'

const SpotForm = ({ spot, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [country, setCountry] = useState(spot?.country)
    const [lat, setLat] = useState(spot?.lat)
    const [lng, setLng] = useState(spot?.lng)
    const [name, setName] = useState(spot?.name)
    const [description, setDescription] = useState(spot?.description)
    const [price, setPrice] = useState(spot?.price)
    // i thought this would work but it actually does not 
    const [url, setUrl] = useState(spot?.url)
    const [urlTwo, setUrlTwo] = useState(spot?.urlTwo)
    const [urlThree, setUrlThree] = useState(spot?.urlThree)
    const [urlFour, setUrlFour] = useState(spot?.urlFour)
    const [urlFive, setUrlFive] = useState(spot?.urlFive)
    const [errors, setErrors] = useState({})
    const [customErr, setCustomErr] = useState({})
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors({})
        setCustomErr({})
        const err = {};
        const SpotImages = [];
        spot = {
            ...spot,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            SpotImages: [
                {
                    url: url,
                    preview:true 
                },
                {
                    url: urlTwo,
                    preview: false 
                },
                {
                    url: urlThree,
                    preview: false 
                },
                {
                    url: urlFour,
                    preview:false 
                },
                {
                    url: urlFive,
                    preview: false
                }
            ]
        }

        if (formType === 'Update your Spot') {
            const editSpot = await dispatch(thunkEditSpot(spot))

            spot = editSpot
        } else if (formType === 'Create a new Spot') {
            const newSpot = await dispatch(thunkCreateSpot(spot))
            spot = newSpot
        }
    

        if (!url) {
            // spot.errors.previewImage = "Preview image is required"
            // spot.errors.previewImage = "Preview image is required"
            err.previewImage = "Preview image is required"

        }
        
        if (urlTwo) {
            if(!urlTwo.endsWith('.jpg')) {
                if (!urlTwo.endsWith('.jpeg')) {
                    if (!urlTwo.endsWith('.png')) {
                        // spot.errors.
                        err.imageUrl = "Image URL must end in .png, .jpg or .jpeg"
                    }
                } 
            }
        }
        // if (!urlTwo) {
        //     spot.errors.imageUrl = "Image URL must end in .png, .jpg or .jpeg"
        // }
        if(err) {
            setCustomErr(err)
        }
        
        if(spot.errors) {
            console.log("THIS MY SPOT THO", spot)
            // spot.errors.previewImage = 'hello'
            // if (!spot.spotImages.length) {
            //     console.log('hellllooo')
            //     spot.errors.previewImage = "Preview Image is required"
            // }
            // console.log("THIS SAFTER", spot.errors)
            // spot.spotImages.forEach(spot => {
            //     if (spot.endsWith('.jpg') || spot.endsWith('png' || spot.endsWith('.jpeg'))) {
            //         spot.errors.imageUrl = "Image URL must end in .png, .jpg, or .jpeg"
            //     }
            // })
            // console.log(spot.errors)
            // setCustomErr(err)
            setErrors(spot.errors)
        } else {
            history.push(`/spots/${spot.id}`)
        }

    }

    return (
        <div className='form-container'>
        <form onSubmit={handleSubmit}>
            <div className='insideForm-container'>
            
            <h2>{formType}</h2>

            <h3>Wheres your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <div className='errors'>{errors.country}</div>
                <label>Country</label>
                <input 
                    placeholder ='Country'
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            <div className='errors'>{errors.address}</div>
            <label>
                Street Address
            </label>
                <input 
                    placeholder ='Address'
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            <div className='errors'>{errors.city}</div>
            <label>
                City
            </label>
                <input className='city-input'
                    placeholder ='City'
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
            <div className='errors'>{errors.state}</div>
            <label>
                State
            </label>
                <input 
                    placeholder ='STATE'
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            <div className='errors'>{errors.lat}</div>
            <label>
                Latitude
            </label>
                <input 
                    placeholder ='Latitude'
                    type='text'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
            <div className='errors'>{errors.lng}</div>
            <label>
                Longitude
            </label>
                <input 
                    placeholder ='Longitude'
                    type='text'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
            <label>
                <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
            </label>
                <textarea
                placeholder ='Description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols='30'
                rows='5'
                />
            <div className='errors'>{errors.description}</div>
            <label>
                <h3>Create a title for your Spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
            </label>
                <input 
                    placeholder ='Name of your spot'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            <div className='errors'>{errors.name}</div>
            <label>
                <h3>Set a base price for your spot</h3>
                <p> Competitive pricing can help your listing stand out and rank higher in search results.</p>
            </label>
                <div className='inputPrice-container'>
                    $ <input 
                    placeholder ='Price per night (USD)'
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            <div className='errors'>{errors.price}</div>
            <label>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <div className='image-cont'>
                    <div className='errors'>{customErr.previewImage}</div>
                    <input 
                    placeholder ='Preview Image URL'
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    />
                    <div className='errors'>{customErr.imageUrl}</div>
                    <input 
                    placeholder ='Image URL'
                    type='text'
                    value={urlTwo}
                    onChange={(e) => setUrlTwo(e.target.value)}
                    />
                    <input 
                    placeholder ='Image URL'
                    type='text'
                    value={urlThree}
                    onChange={(e) => setUrlThree(e.target.value)}
                    />
                    <input 
                    placeholder ='Image URL'
                    type='text'
                    value={urlFour}
                    onChange={(e) => setUrlFour(e.target.value)}
                    />
                    <input 
                    placeholder ='Image URL'
                    type='text'
                    value={urlFive}
                    onChange={(e) => setUrlFive(e.target.value)}
                    />
                    </div>
            </label>

            <button type="submit" className='spot-button'>Create Spot</button>
            </div>
        </form>
        </div>
    )
}

export default SpotForm