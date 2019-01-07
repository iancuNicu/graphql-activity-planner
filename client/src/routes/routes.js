
import React from 'react';
import {Route} from 'react-router-dom';

import VenueList from '../presentational/venue-list/venue-list';
import VenuePage from '../presentational/venue-page/venue-page'

const routes = [
    {
        path: '/venue/:id',
        component: VenuePage,
        exact:true,
        key:`venue${Math.random()*1000}`
    },
    {
        path:'/venue-list',
        component: VenueList,
        exact:true,
        key:'venue-list'
    }
];

const mappedRoutes = routes.map(route => (<Route {...route} />));

export default mappedRoutes;