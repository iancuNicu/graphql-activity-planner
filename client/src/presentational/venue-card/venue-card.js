import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import {NavLink} from 'react-router-dom';

const VenueCard = ({venue}) => {
    return(
        <NavLink to={{
            pathname: `/venue/${venue.id}`,
            state: venue.id
        }}>
            <Card>
                <CardBody>
                    <CardTitle>{venue.name}</CardTitle>
                    <CardText>{`${venue.location.address} ${venue.location.city}`}</CardText>
                </CardBody>
            </Card>
        </NavLink>    
    );
}

export default VenueCard;