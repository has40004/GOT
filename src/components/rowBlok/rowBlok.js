import React from 'react';
import {Col, Row} from 'reactstrap';

const RowBlok = ({left, rghit}) => {
    return (
        <Row>
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {rghit}
            </Col>
        </Row>
    )
}

export default RowBlok; 