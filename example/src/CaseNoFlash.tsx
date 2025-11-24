import React from 'react';
import { useRenderPeek } from 'render-peek';

interface Props {
    count: number;
}

export const CaseNoFlash: React.FC<Props> = (props) => {
    const { className } = useRenderPeek(props);

    return (
        <div className={className} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h4>Case 2: No Flash Expected</h4>
            <p>My prop 'count' changes every render: {props.count}</p>
            <p>This is a necessary re-render.</p>
        </div>
    );
};
