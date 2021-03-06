import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Col, Form, Image, ListGroup, Row, Spinner} from "react-bootstrap";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen({match, history}) {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const [qty, setQty] = useState(1)

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-2'>Назад</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'/> :
                (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant={"flush"}>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} обзоров`}/>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Цена: {product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Описание: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant={"flush"}>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Цена</Col>
                                            <Col><strong>{product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Статус</Col>
                                            <Col><strong>{product.countInStock > 0 ? 'В наличии' : 'Нет в наличии'}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Количество</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Control as="select" value={qty}
                                                                  onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button disabled={product.countInStock <= 0} className="btn-block"
                                                type="button" onClick={addToCartHandler}>В корзину</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }
        </div>
    );
}

export default ProductScreen;