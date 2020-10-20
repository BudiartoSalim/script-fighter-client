import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Table, ProgressBar, Button, Card } from 'react-bootstrap';
import axios from 'axios';

export default function ShopContent(props) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        setSuccess('Successful Buying Item')
        localStorage.setItem('userStatus', JSON.stringify(data.userStatus));
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  useEffect(() => {
    
    setTimeout(() => {
      setError('')
      setSuccess('')
    }, 2000)

  }, [error, success])

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            {props.item.item_name}
            <div style={{height: "50px"}}>
            {
              success &&
              <h3 style={{fontSize: '24px', color: 'green'}}>{success}</h3>
            }
            {
              error &&
              <h3 style={{fontSize: '24px', color: 'red'}}>{error}</h3>
            }
            </div>
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
              props.item.difficulty > 0 && (
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