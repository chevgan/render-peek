interface RenderPeekOptions<P> {
    ignoreKeys?: (keyof P)[];
}
declare function useRenderPeek<P extends object>(props: P, options?: RenderPeekOptions<P>): {
    className: string;
};

export { type RenderPeekOptions, useRenderPeek };
