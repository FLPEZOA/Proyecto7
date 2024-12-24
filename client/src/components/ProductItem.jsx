import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductItem = ({ product, onAdd }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Precio: ${(product.price / 100).toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={() => onAdd(product)}>Agregar al Carrito</Button>
            </Card.Body>
        </Card>
    );
};
export default ProductItem;