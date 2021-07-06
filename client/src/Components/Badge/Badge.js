import React from 'react';

const Badge = ({ key, children, className, styles }) => {

    return (
        <div className={className} style={{
            color: 'white',
            borderRadius: '18px',
            fontSize: '14px',
            fontWeight: '400',
            border: '2px solid white',
            padding: '6px',
            ...styles
        }}>
            <span>{children}</span>
        </div>
    )
}

export default Badge;