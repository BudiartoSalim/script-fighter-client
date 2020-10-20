import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
      setLoadingStatus(false);
    })

  }, [])

  return (
    <>
      <Container style={{ marginTop: '5%'}}>
        <Row style={{alignContent: 'center'}}>
          <div style={{ width: '100%', textAlign: 'center'}}>
            <h1>Shop</h1>
          </div>
        </Row>
        <Row >
          { loadingStatus && (
            <>
              <h1>Loading shop...</h1>
            </>
          )
          }
          {
            errorStatus && (
              <>
                <h1>{errorStatus}</h1>
              </>
            )
          }
          {!loadingStatus && !errorStatus && (
            shopContents.map((content) => {
              return (
                <Col sm={4} md={4} lg={4} xl={4} key={content.id}> 
                  <ShopContent  item={content} />
                </Col>
              )
            })
          )}
        </Row>
      </Container>
    </>
  )
}