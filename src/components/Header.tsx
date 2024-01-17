import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import './style.css'

type Props = {}

const Header = (props: Props) => {

    const customButtonStyle = {
        maxWidth: "10em", // Set your desired width
      };

    return (
        <Container fluid className="bg-image-container  mb-5">
      

            <Row>
                <Col sm={6} className="black-bg-opacity">
                    <div className="text-container">
                        <Stack  gap={3}>
                            <h1>HYDRAFloods</h1>
                            <h4>HYDrologic Remote Sensing Analysis for Floods</h4>
                            <Button style={customButtonStyle} type='button' variant="warning">Launch Tool</Button>
                            <h5>The publicly available, web-based service delivering near real-time information for improved flood monitoring. </h5>

                               <h5> Designed to provide information on flood location and extent to assist with flood preparedness, emergency response and relief efforts.</h5>

                        </Stack>

                    </div>
                </Col>

                <Col sm={6}></Col>
            </Row>


            
        </Container>
    )
}

export default Header