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
    // Inject styles once on mount (or first call)
    injectStyles();

    const prevPropsRef = useRef<P | null>(null);
    const [shouldFlash, setShouldFlash] = useState(false);

    // Use a ref to track if the flash timeout is active to avoid overlapping timeouts
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Helper to filter props based on ignoreKeys
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

    const currentFilteredProps = getFilteredProps(props);

    if (prevPropsRef.current) {
        const prevFilteredProps = getFilteredProps(prevPropsRef.current);

        // Check if props are deeply equal (meaning re-render was likely unnecessary)
        const isDeepEqual = equal(prevFilteredProps, currentFilteredProps);

        if (isDeepEqual) {
            // If we are here, it means the component re-rendered but the relevant props didn't change.
            // We should flash.
            // We set state during render to trigger a re-render with the class? 
            // Wait, setting state during render is dangerous. 
            // But the requirement says: "Acknowledge shouldFlash=true, if cleaned currentProps and prevProps are deeply equal, but component renders."
            // And "Return object { className: string } containing class render-peek-flash if shouldFlash is active."

            // If we detect it NOW, we want to return the class NOW.
            // But we also need to clear it after 500ms.

            // If we use useEffect to set state, the flash will happen on the NEXT render (double render).
            // If we want it to happen on THIS render, we can't use state for the *trigger*, but we need state for the *cleanup*.

            // Actually, if we are inside the render function, and we detect equality, we know this CURRENT render is unnecessary.
            // So we can return the class immediately.
            // BUT, we need to trigger a re-render to REMOVE the class after 500ms.

            // Let's try this logic:
            // 1. Detect equality.
            // 2. If equal, set a flag `isUnnecessary` = true.
            // 3. If `isUnnecessary`, we return the class.
            // 4. We also need to schedule a cleanup. We can use useEffect for that.

            // However, if we simply return the class based on comparison, that works for the *current* render.
            // But we need to make sure `shouldFlash` turns off.

            // Let's refine the state usage.
            // The prompt says: "Use useState to control shouldFlash and setTimeout to automatically reset flash after 500ms."

            // If I set state in useEffect, I get a flash on the *next* frame (or immediate re-render).
            // "Acknowledge shouldFlash=true... but component renders".

            // If I do:
            // if (equal) setShouldFlash(true) -> this causes infinite loop if not careful.

            // Correct approach for "flash on this render":
            // We can't easily "flash on this render" with state if the state wasn't already true.
            // But we can derive `isUnnecessary` from props comparison.

            // Let's look at the requirement again: "Use useState to control shouldFlash".
            // This implies the flash state is managed by React state.

            // Implementation:
            // useEffect(() => {
            //   if (prevProps) { compare... if equal -> setShouldFlash(true) }
            //   prevProps = currentProps
            // })
            // This would cause the flash to appear AFTER the render has committed, causing a second render with the flash.
            // This is acceptable and standard for such tools (you see the update, then the flash appears).
            // Trying to flash *during* the unnecessary render is hard because the render is already happening.
            // Actually, if the render is unnecessary, the DOM might not update, but we want to force an update to show the flash.
            // So a second render is required to show the flash anyway (since the first render had no visual changes by definition of "unnecessary").

            // So:
            // 1. Render happens.
            // 2. Effect runs.
            // 3. Effect compares props.
            // 4. If equal, setShouldFlash(true).
            // 5. Re-render with flash class.
            // 6. Timeout clears flash.

            // Wait, the prompt says: "If prevProps exists, before comparison props must be cleaned... Activate shouldFlash=true if cleaned currentProps and prevProps are deep equal".

            // I will implement it inside useEffect to avoid side-effects during render.
        }
    }

    useEffect(() => {
        const currentFiltered = getFilteredProps(props);

        if (prevPropsRef.current) {
            const prevFiltered = getFilteredProps(prevPropsRef.current);

            if (equal(prevFiltered, currentFiltered)) {
                setShouldFlash(true);

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
    }, [props, options]); // Dependencies: props change triggers this.

    return {
        className: shouldFlash ? 'render-peek-flash' : '',
    };
}
