
import React from 'react';
import {Route} from 'react-router-dom';

import VenueList from '../presentational/venue-list/venue-list';
import UserPage from '../containers/user/user-page';
import VenuePageWrapper from '../presentational/venue-page/venue-page-wrapper';

const routes = [
    {
        path: '/venue-list',
        component: VenueList,
        exact: true,
        key: 'venue-list'
    },
    {
        path: '/venue/:id',
        component: VenuePageWrapper,
        exact: true,
        key: `venue/${Math.random()*100/100}`
    },
    {
        path: '/user-page',
        component: UserPage,
        exact: true,
        key: 'user-page'
    }
];

const mappedRoutes = routes.map(route => {
    return <Route {...route} />;
});

export default mappedRoutes;