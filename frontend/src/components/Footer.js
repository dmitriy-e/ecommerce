import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className={"text-center py-3"}>
                        <p>Ecommerce Shop made with Django and React</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;