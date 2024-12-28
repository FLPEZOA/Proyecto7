import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductItem = ({ product, onAdd }) => {
    return (
        <Card style={{
            borderColor: 'var(--color-text) '
        }}>
            < Card.Img variant="top" src={product.imageUrl} alt={product.name} />
            <Card.Body>
                <Card.Title style={{ color: 'var(--color-text)' }}>{product.name}</Card.Title>
                <Card.Text>Precio: ${(product.price)}</Card.Text>
                <Button variant="primary" style={{ backgroundColor: 'var(--color-button)' }} onClick={() => onAdd(product)}>Agregar al Carrito</Button>
            </Card.Body>
        </Card >
    );
};
export default ProductItem;