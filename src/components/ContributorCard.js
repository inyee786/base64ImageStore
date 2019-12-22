import React from 'react'
import Card  from 'react-bootstrap/Card';

export default function ContributorCard(props) {
    const { login, image: { base64, imageFormat } } = props.contributor;
    return (
        <Card style={{ width: '8rem' }}>
            <Card.Img variant="top" style={{borderRadius : '50%'}} src={`data:image/${imageFormat};base64,${base64}`} />
            <Card.Body>
                <Card.Title>{login}</Card.Title>
            </Card.Body>
        </Card>
    )
}
