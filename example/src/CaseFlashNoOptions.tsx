import React from 'react';
import { useRenderPeek } from 'render-peek';

interface Props {
    staticObj: { id: number };
}

export const CaseFlashNoOptions: React.FC<Props> = (props) => {
    const { className } = useRenderPeek(props);

    return (
        <div className={className} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h4>Case 3: Flash Expected (No Options)</h4>
            <p>I receive a DEEP EQUAL object every render.</p>
            <p><code>{JSON.stringify(props.staticObj)}</code></p>
            <p>The reference changes, but content is same. I should flash.</p>
        </div>
    );
};
