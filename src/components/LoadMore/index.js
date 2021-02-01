import React from 'react';
import Button from "../forms/Button";

const LoadMore = ({onLoadMoreEvt = () => {}}) => {
    return (
        <div>
            <Button onClick={() => onLoadMoreEvt()}>
                Load more
            </Button>
        </div>
    );
};

export default LoadMore;
