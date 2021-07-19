import React from 'react';

const Container = ({ children, style, topBorder, variant, backgroundColor, className }) => {

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

    const backgroundStyle = (backgroundColor) => {
        switch (backgroundColor) {
            case 'primary':
                return 'rgba(225, 202, 240, 1)';
            default:
                return 'rgba(80, 80, 100, 1)';
        }
    }

    return (
        <div className={"container-fluid py-2 " + className} style={{
            backgroundColor: backgroundStyle(backgroundColor),
            borderTop: topBorder && '4px solid rgba(225, 202, 240, 1)',
            boxShadow: shadowStyle(variant),
            borderRadius: '3px',
            ...style,
        }}
        >
            {children}
        </div>
    )
}

export default Container;