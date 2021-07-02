import React from 'react';

const Container = ({ children, style, topBorder, variant, outline }) => {

    const shadowStyle = (variant) => {
        switch (variant) {
            case 'shadow':
                return '10px 10px 20px black';
            case 'primary':
                return '10px 10px black';
            default:
                return '';
        }
    }

    const borderStyle = (outline) => {
        switch (outline) {
            case 'white':
                return '2px solid white';
            default:
                return '';
        }
    }

    return (
        <div className="container-fluid py-2" style={{
            backgroundColor: 'rgba(80, 80, 100, 1)',
            borderTop: topBorder && '4px solid rgba(225, 202, 240, 1)',
            border: borderStyle(outline),
            boxShadow: shadowStyle(variant),
            borderRadius: '3px',
            ...style,
        }}>
            {children}
        </div>
    )
}

export default Container;