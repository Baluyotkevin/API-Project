import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateSpot } from '../../store/spot'

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
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
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
            price
        }
        if (formType === 'Update your Spot') {
            
        } else if (formType === 'Create a new Spot') {
            const newSpot = await dispatch(thunkCreateSpot(spot))
            spot = newSpot
        } 
        
        
        if(spot.errors) {
            setErrors(spot.errors)
        } else {
            history.push(`/api/spot/${spot.id}`)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <div className='errors'>{errors.country}</div>
            <label>
                Country
                <input 
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            <div className='errors'>{errors.address}</div>
            <label>
                Street Adress
                <input 
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <div className='errors'>{errors.city}</div>
            <label>
                City
                <input 
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>
            <div className='errors'>{errors.state}</div>
            <label>
                State
                <input 
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </label>
            <div className='errors'>{errors.lat}</div>
            <label>
                Latitude
                <input 
                    type='text'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
            </label>
            <div className='errors'>{errors.lng}</div>
            <label>
                Longitude
                <input 
                    type='text'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
            </label>
            <div className='errors'>{errors.description}</div>
            <label>
                <h4>Describe your place to guests</h4>
                <input 
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <div className='errors'>{errors.name}</div>
            <label>
                Create a title for your Spot
                <input 
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <div className='errors'>{errors.price}</div>
            <label>
                Set a base price for your spot
                <input 
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <button type="submit">Create Spot</button>
        </form>
    )
}

export default SpotForm