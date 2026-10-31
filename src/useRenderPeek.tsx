import { useRef, useState, useEffect } from 'react';
import equal from 'fast-deep-equal';
import { injectStyles } from './utils/injectStyles';

export interface RenderPeekOptions<P> {
    ignoreKeys?: (keyof P)[];
}

export function useRenderPeek<P extends object>(
    props: P,
    options?: RenderPeekOptions<P>
): { className: string } {
    injectStyles();

    const prevPropsRef = useRef<P | null>(null);
    const [shouldFlash, setShouldFlash] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getFilteredProps = (p: P) => {
        if (!options?.ignoreKeys || options.ignoreKeys.length === 0) {
            return p;
        }
        const filtered: any = { ...p };
        options.ignoreKeys.forEach((key) => {
            delete filtered[key];
        });
        return filtered;
    };

    // Compared after commit, not during render: setting state in render would loop.
    // An unnecessary render changes nothing in the DOM, so a second render is needed
    // to show the flash anyway.
    useEffect(() => {
        const currentFiltered = getFilteredProps(props);

        if (prevPropsRef.current) {
            const prevFiltered = getFilteredProps(prevPropsRef.current);

            if (equal(prevFiltered, currentFiltered)) {
                setShouldFlash(true);

                // Restart the timer so back-to-back wasted renders keep one flash going.
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = setTimeout(() => {
                    setShouldFlash(false);
                    timeoutRef.current = null;
                }, 500);
            }
        }

        prevPropsRef.current = props;
    }, [props, options]);

    return {
        className: shouldFlash ? 'render-peek-flash' : '',
    };
}
