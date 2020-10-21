import React from 'react';
import {Spinner, Row, Col} from 'react-bootstrap';

export default function LoadingDisplay(){

  return (
    <>
      <Row className="justify-content-center align-items-center" style={{objectFit:"fill", backgroundColor:"black"}}>
        <Col sm={10} md={10} lg={10} xl={10} className="text-center">
          <Spinner animation="border" variant="primary" />
        </Col>
        <Col sm={10} md={10} lg={10} xl={10} className="text-center">
          <h4 style={{color:"white"}}>Loading...</h4>
        </Col>
      </Row>
    </>
  )
}