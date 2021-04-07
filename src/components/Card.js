import React, { useState } from "react";
import Card from 'react-bootstrap/Card'
import { Button, Col, Container, Modal, Row} from 'react-bootstrap';
import { Fragment } from 'react';

export const LaunchCard = ({launch}) => {
    var details;
    if(launch.details === null)
    details = "No details are available";
    else if(launch.details.length <= 150)
    details = launch.details;
    else
        details = launch.details.substring(0,147)+'...';

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
        <Fragment>
            <Col lg={3} md={4} sm={6} xs={12}>
            <Card border="warning" className="card">
                <Card.Img className="cardImage" variant="top" src={(launch.links.flickr_images.length === 0) ?  (process.env.PUBLIC_URL+'./No_image_Available.jpg') : launch.links.flickr_images[0]} />
                <Card.Body>
                <Card.Title>{launch.mission_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{launch.rocket.rocket_name}</Card.Subtitle>
                <Card.Text>
                    {details}
                </Card.Text>
                <Button onClick={handleShow} variant="info">More Info</Button>
                </Card.Body>
            </Card>
            </Col> 

            <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {launch.mission_name}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                        <h4>Details</h4>
                        <p>{launch.details === null ? details : launch.details}</p>
                </Container>
                
                <Container>
                    <Row>
                        <Col lg={4} md={3} sm={3}>
                            <h4>Launch Year</h4>
                            <p>{launch.launch_year}</p>
                        </Col>
                        <Col lg={4} md={3} sm={3}>
                            <h4>Launch Site</h4>
                            <p>{launch.launch_site.site_name}</p>
                        </Col>
                        <Col lg={4} md={3} sm={3}>
                            <h4>Manufacturer</h4>
                            <p>{launch.rocket.second_stage.payloads[0].manufacturer}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={3} sm={3}>
                            <h4>Cargo Load</h4>
                            <p>{launch.rocket.second_stage.payloads[0].payload_mass_kg === null ? "Not Available" : launch.rocket.second_stage.payloads[0].payload_mass_kg+' kg'}</p>
                        </Col>
                        <Col lg={4} md={3} sm={3}>
                            <h4>Flight Time</h4>
                            <p>{isNaN(launch.rocket.second_stage.payloads[0].flight_time_sec) === true ? "Not Available" : ((launch.rocket.second_stage.payloads[0].flight_time_sec)/3600).toFixed(2)+' hrs'}</p>
                        </Col>
                        <Col lg={4} md={3} sm={3}>
                            <h4>Wikipedia</h4>
                            <a href={launch.links.wikipedia}><p>Link</p></a>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
        </Fragment>
    );
}