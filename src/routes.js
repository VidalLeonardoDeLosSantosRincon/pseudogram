//dependencies
import React from 'react';
import {Route, Switch} from 'react-router-dom';

//components
import App from './components/App';
import Home from './components/Home';
import Start from './components/Start';


const AppRoutes = () =>
<App>
    <Switch>
        <Route exact path="/home" component={Home}/>
       
        <Route  exact path="/" component={Start}/>
       
    </Switch>
</App>;

export default AppRoutes;


