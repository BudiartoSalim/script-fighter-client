import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Table, ProgressBar, Button, Card } from 'react-bootstrap';
import axios from 'axios';

export default function ShopContent(props) {
  const [userStatus, setUserStatus] = useState({})

  useEffect(() => {

    setUserStatus(JSON.parse(localStorage.getItem('userStatus')))

  }, [])

  async function buyItem() {
    try {
      const { data } = await axios({
        method: 'PUT',
        url: `http://localhost:3000/shop/${props.item.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      
      if (data.userStatus) {
        console.log(data.userStatus)
        props.setPurchaseStatus('success')
        localStorage.setItem('userStatus', JSON.stringify(data.userStatus));
        props.setStatUser(data.userStatus)
        setUserStatus(data.userStatus)
        props.setBuyCount(props.buyCount + 1)
      } else {
        props.setPurchaseStatus(data.message)
      }
    } catch (err) {
      props.setPurchaseStatus(err.response.data.message)
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            {props.item.item_name}
          </Card.Title>
          <Card.Text>
            {props.item.description}
          </Card.Text>
          <Row>
            <Col sm={5} md={5} lg={5} xl={5}>
              <Card.Text>
                Price:
              </Card.Text>
            </Col>
            <Col sm={7} md={7} lg={7} xl={7}>
              <Card.Text>
                {props.item.price}
              </Card.Text>
            </Col>
            {
              props.item.hp > 0 && (
                <>
                  <Col sm={5} md={5} lg={5} xl={5}>
                    <Card.Text>
                      Hp:
                  </Card.Text>
                  </Col>
                  <Col sm={7} md={7} lg={7} xl={7}>
                    <Card.Text>
                      +{props.item.hp}
                    </Card.Text>
                  </Col>
                </>
              )
            }
            {
              props.item.atk > 0 && (
                <>
                  <Col sm={5} md={5} lg={5} xl={5}>
                    <Card.Text>
                      Atk:
                  </Card.Text>
                  </Col>
                  <Col sm={7} md={7} lg={7} xl={7}>
                    <Card.Text>
                      +{props.item.atk}
                    </Card.Text>
                  </Col>
                </>
              )
            }
            {
              props.item.def > 0 && (
                <>
                  <Col sm={5} md={5} lg={5} xl={5}>
                    <Card.Text>
                      Def:
                  </Card.Text>
                  </Col>
                  <Col sm={7} md={7} lg={7} xl={7}>
                    <Card.Text>
                      +{props.item.def}
                    </Card.Text>
                  </Col>
                </>
              )
            }
            {
              props.item.difficulty > userStatus.maxDifficulty && (
                <>
                  <Col>
                    <Card.Text>
                      Unlocks higher difficulty!
                  </Card.Text>
                  </Col>
                </>
              )
            }
          </Row>
          <Button variant="primary" onClick={buyItem}>Buy!</Button>
        </Card.Body>
      </Card>
    </>
  )
}