import React, { useEffect, useState } from 'react';
import { Container, Row, Col , Button, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import ShopContent from '../component/ShopContent';
import LoadingDisplay from '../component/LoadingDisplay.js';
import ShopSound from '../assets/audio/shop.mp3'

export default function ShopScene() {
  
  const [shopContents, setShopContents] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);
  const [userStatus, setUserStatus] = useState({})
  const [purchaseStatus, setPurchaseStatus] = useState('')
  const [buyCount, setBuyCount] = useState(0)
  const history = useHistory()
  
  const shopSound = new Audio(ShopSound)
  //adding audio
  useEffect(() => {
    shopSound.play()

    return () => {
      shopSound.pause()
    }
  }, [])

  //on page load, fetch item list based on current player stats
  useEffect(() => {
    setUserStatus(JSON.parse(localStorage.getItem('userStatus')))
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
      console.log(data)
      setShopContents(data);
      setLoadingStatus(false);
      setErrorStatus(false);
    }).catch((err) => {
      setErrorStatus(err.response.data.message);
      setLoadingStatus(false);
    })

  }, [buyCount])

  useEffect(() => {

    let timeout = setTimeout(() => {
      setPurchaseStatus(false)
    }, 2000)

  }, [purchaseStatus])

  function BackToGame() {
    history.push('/game')
  }

  return (
    <>
      <Container className="f-dogicabold bg-black">
        <Row style={{alignContent: 'center', textAlign: 'center'}}>
          <div style={{ width: '100%'}}>
            <h1>
              Shop
            </h1> 
          </div>
          <div className="upper-body-shopScene">
              {
                userStatus && 
                <h4>$ : {userStatus.money}</h4>
              }
              <Button onClick={BackToGame} variant={'danger'} >Exit</Button>
          </div>
          <div style={{height:'40px', width: '100%', textAlign:'center'}}>
              {
                (purchaseStatus === 'success') &&
                <h3 style={{color:'green'}}>Successful Buying Item</h3>
              }
              {
                (purchaseStatus && purchaseStatus != 'success') &&
                <h3 style={{color:'red'}}>{purchaseStatus}</h3>
              }
          </div>
        </Row>
        <Row >
          { loadingStatus && (
            <>
              <LoadingDisplay />
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
                  <ShopContent  item={content}  userStat={userStatus} setStatUser={setUserStatus} setPurchaseStatus={setPurchaseStatus} buyCount={buyCount} setBuyCount={setBuyCount}/>
                </Col>
              )
            })
          )}
        </Row>
      </Container>
    </>
  )
}