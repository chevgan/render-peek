import React from 'react';
import { useRenderPeek } from 'render-peek';

interface Props {
    label: string;
    unstableProp: object;
}

export const CaseFlashExpected: React.FC<Props> = (props) => {
    const { className } = useRenderPeek(props, {
        ignoreKeys: ['unstableProp'],
    });

    return (
        <div className={className} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h4>Case 1: Flash Expected</h4>
            <p>I receive a new object every render, but I ignore it.</p>
            <p>My relevant props are stable.</p>
        </div>
    );
};
