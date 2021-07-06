import React from 'react';

const Rating = ({ style, children, score, variant, size, className }) => {

    const baseStyles = {
        borderRadius: '50%',
        background: 'rgba(80, 80, 100, 1)',
        boxShadow: '-2px -2px rgba(225, 202, 240, 1)',
        background: 'rgba(80, 80, 100, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    
    const containerStyleSmall = {
        width: '36px',
        height: '36px',
        padding: '8px',
        fontSize: '14px',
        fontWeight: '500',
        textShadow: '1px 1px rgba(29, 29, 35, 1)'
    }
    const containerStyleLarge = {
        width: '66px',
        height: '66px',
        fontWeight: '800',
        padding: '12px',
        fontSize: '24px',
        textShadow: '2px 2px rgba(29, 29, 35, 1)'
    }

    const sizeStyles = (size) => {
        switch (size) {
            case 'small':
                return containerStyleSmall;
            case 'large':
                return containerStyleLarge;
            default:
                return containerStyleSmall;
        }
    }
   

    const ratingColor = (score) => {
        if (score <= 0) {
            return "white";
        } else if (score < 6) {
            return "red";
        } else if (score < 8) {
            return "orange";
        } else {
            return "lightgreen";
        }
    }

    return (
        <div className={"rating-container" + " " + className} style={{
            color: ratingColor(score),
            ...baseStyles,
            ...sizeStyles(size),
            ...style,
        }}>
            {score === 0 ? "N/A" : score}
        </div>
    )
}

export default Rating;