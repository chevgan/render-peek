import React from 'react';
import { useRenderPeek } from 'render-peek';

interface ChildProps {
    stableId: string;
    unstableCallback: () => void;
}

export const ChildComponent: React.FC<ChildProps> = (props) => {
    const { className } = useRenderPeek(props, {
        ignoreKeys: ['unstableCallback'],
    });

    return (
        <div
            className={className}
            style={{
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                margin: '20px 0',
            }}
        >
            <h3>Child Component</h3>
            <p>Stable ID: {props.stableId}</p>
            <p>
                I receive a new callback on every render, but I ignore it.
                <br />
                So I should <strong>FLASH</strong> because my relevant props haven't changed!
            </p>
        </div>
    );
};
