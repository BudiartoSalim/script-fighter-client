import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, ProgressBar, Button } from 'react-bootstrap';
import axios from 'axios';
import ShopContent from '../component/ShopContent';

export default function ShopScene() {
  const [shopContents, setShopContents] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);

  //on page load, fetch item list based on current player stats
  useEffect(() => {
    setLoadingStatus(true);
    setErrorStatus(false);
    axios({
      method: 'GET',
      url: `http://localhost:3000/shop`,
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    }
    ).then(({ data }) => {
      setShopContents(data);
      setLoadingStatus(false);
      setErrorStatus(false);
    }).catch((err) => {
      setErrorStatus(err.response);
    })

  }, [])

  return (
    <>
      <Container>
        <Row style={{ backgroundColor: 'black', padding: '20px' }}>
          {!loadingStatus && !errorStatus && (
            shopContents.map((content) => {
              return (
                <Col sm={4} md={4} lg={4} xl={4}>
                  <ShopContent key={content.id} item={content} />
                </Col>
              )
            })
          )}
        </Row>
      </Container>
    </>
  )
}