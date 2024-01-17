import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Image, Button, Stack } from 'react-bootstrap';
import mapImage from '../assets/images/flash.jpg'
import sig from '../assets/images/sig.png'
import deltares from '../assets/images/deltares.jpg'
import sei from '../assets/images/sei.png'
import wfp from '../assets/images/wfp-logo.png'
import sevir from '../assets/images/servir-sea.png'


type Props = {}

const FloodMaps = (props: Props) => {
    const logos = [sig, sei, deltares, wfp]


    const logoStyle = {
        maxWidth: '16em',
        maxHeight: '3em',
    };

    const customButtonStyle = {
        maxWidth: "15em", // Set your desired width
      };

    return (
        <Container >
            <Row>
                <Col lg={4} sm={12}>
                    <h6>Floods in Chaiyaphum, Thailand | 27 September 2021</h6>
                    <Image className='mb-4' src={mapImage} fluid />
                    <Button className='mb-4' variant='outline-secondary' >View Details</Button>
                </Col>

                <Col lg={4} sm={12}>
                    <h6>Floods in Chaiyaphum, Thailand | 27 September 2021</h6>
                    <Image className='mb-4' src={mapImage} fluid />
                    <Button className='mb-4' variant='outline-secondary' >View Details</Button>
                </Col>

                <Col lg={4} sm={12}>
                    <h6>Floods in Chaiyaphum, Thailand | 27 September 2021</h6>
                    <Image className='mb-4' src={mapImage} fluid />
                    <Button className='mb-4' variant='outline-secondary' >View Details</Button>
                </Col>

            </Row>

          

            <Row className="justify-content-between">
                {logos.map((logo, index) => (
                    <Col key={index} xs={6} md={3} lg={2} className="mb-4">
                        <Image src={logo} alt={`Logo ${index + 1}`} style={logoStyle} fluid />
                    </Col>
                ))}
            </Row>


            <Row> 
                <Col className='my-4'>
                <Stack gap={2}>
                <Image  style={logoStyle} src={ sevir}/>
                <h5>ASIAN DISASTER PREPAREDNESS CENTER (ADPC)</h5>
                <p>SM Tower, 24th Floor, 979/69 Paholyothin Road, Samsen Nai Phayathai,</p>
                <p>Bangkok 10400 Thailand</p>
                <p>BTS Skytrain: Sanam Pao, Exit 1</p>
                <p> <strong>Phone:</strong> +66 2 298 0681-92</p>
                <p> <strong>Fax:</strong> +66 2 298 0012</p>

                <Button type='button' variant='primary' style={customButtonStyle}>Request Technical Assisitance</Button>

                </Stack>
               

                </Col>

                <Col className='justify-content-end'>
                <p><strong>Disclaimer</strong></p>
                <p>SERVIR-SEA, NASA, USAID and ADPC make no express or implied warranty of this data as to the merchantability or fitness for a particular purpose.
                     SERVIR-SEA, NASA, USAID and ADPC make no express or implied warranty as to the accuracy of the map or as to the merchantability or fitness for a particular purpose of the data.
                     Neither the US Government nor its contractors shall be liable for special, consequential or incidental damages attributed to this data.</p>


                </Col>
            </Row>
        </Container>

    )
}

export default FloodMaps