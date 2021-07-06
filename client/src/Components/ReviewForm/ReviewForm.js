import React from 'react';
import Container from '../Container/Container';

const ReviewForm = ({ children, className, style }) => {
    return (
        <form>
        <Container topBorder variant='shadow' className={className} style={{
            ...style
        }}>
            <span>Leave a review!</span>
        </Container>
        </form>
    )
}

export default ReviewForm;