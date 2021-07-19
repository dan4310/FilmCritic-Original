import React, { useState, useEffect } from "react";

const IconRating = ({ className, children, style, handleChange }) => {
    const [rating, setRating] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [wasClicked, setWasClicked] = useState(false);

    

    useEffect(() => {
        const temp = [];
        [1,2,3,4,5].map((item, indx) => {
            temp.push({
                id: indx,
                isHovered: false,
            })
            return item;
        });
        setRating(temp);
    }, []);

    const onHover = (id, value) => {
        var temp = [...rating];
        setIsHovered(value);
        if (wasClicked) return;

        if (value === false) {
            temp = temp.map(item => {
                if (item.id > id) {
                    return {...item, isHovered: value};
                } else {
                    return {...item, isHovered: !value};
                }
                
            })
        } else {
            temp = temp.map((item) => {
                if (item.id <= id) {
                    return {...item, isHovered: value};
                } else {
                    return {...item, isHovered: !value};
                }
                
            })
            handleChange(temp)
        }
        setRating(temp);
        
    }


    return (
        <div className={'d-flex align-items-center'+className} style={{
            ...style,
            border: isHovered ? '2px solid white' : '2px solid transparent',
            borderRadius: '18px',
            padding: '6px',
        }}>
            {rating.map((item, ind) => {
                return (
                    <i className="fa fa-star px-1 d-flex align-items-center" aria-hidden="true" style={{
                        color: !item.isHovered ? (wasClicked ? 'rgba(1,1,1,0)' : 'white') : 'rgba(225, 202, 240, 1)',
                        textShadow: !item.isHovered ? 'none' : '2px 2px black',
                        transition: 'all 0.1s',
                        fontSize: '20px'
                    }}
                    onMouseEnter={() => onHover(ind, true)}
                    onMouseLeave={() => onHover(ind, false)}
                    onClick={() => {
                        setWasClicked(!wasClicked);
                    }}
                    ></i>
                )
            })}
        </div>
    )
}

export default IconRating;