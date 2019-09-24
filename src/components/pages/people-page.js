import React from 'react';
import {withRouter} from 'react-router-dom';
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';

const PeoplePage = ({history, match}) => {
    return (
        <Row
            left={<PersonList onItemSelected={(id) => history.push(`/people/${id}`)} />}
            right={<PersonDetails itemId={match.params.id} />} />
    );

};

export default withRouter(PeoplePage);