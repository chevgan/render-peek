declare module 'render-peek' {
    export interface RenderPeekOptions<P> {
        ignoreKeys?: (keyof P)[];
    }
    export function useRenderPeek<P extends object>(
        props: P,
        options?: RenderPeekOptions<P>
    ): { className: string };
}
