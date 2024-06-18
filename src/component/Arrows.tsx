import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';
interface props {
    className: string | undefined,
    style?: React.CSSProperties;
    onClick?: () => void;

}
const NextArrow = (props: props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ ...style, display: 'block' }} // Customize arrow style here
            onClick={onClick}
        >
            <RightOutlined/>
        </button>
    );
};

const PrevArrow = (props: props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ ...style, display: 'block' }} // Customize arrow style here
            onClick={onClick}
        >
              <LeftOutlined className='text-dark '/>
          
        </button>
    );
};
export { NextArrow, PrevArrow };