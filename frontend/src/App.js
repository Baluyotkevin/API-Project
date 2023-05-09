import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpots';
import SingleSpot from './components/SingleSpot';
import CreateSpotForm from './components/CreateSpotForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
      <Route exact path='/' component={AllSpots} />
      <Route exact path='/spots/new' component={CreateSpotForm} />
      <Route exact path='/spots/:spotId' component={SingleSpot} />
        </Switch>}
    </>
  );
}

export default App;