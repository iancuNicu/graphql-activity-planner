
import React from 'react';
import {Route} from 'react-router-dom';

import VenueList from '../presentational/venue-list/venue-list';
import VenuePage from '../presentational/venue-page/venue-page'
import UserPage from '../containers/user/user-page';

const routes = [
    {
        path: '/user-page',
        component: UserPage,
        exact: true,
        key: 'user-page'
    },
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