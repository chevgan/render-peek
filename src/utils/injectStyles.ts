const css = `
@keyframes peek-flash-anim {
  0% {
    box-shadow: inset 0 0 0 2px #ff4500;
  }
  100% {
    box-shadow: inset 0 0 0 2px transparent;
  }
}

.render-peek-flash {
  animation: peek-flash-anim 0.5s ease-out forwards;
}
`;

let injected = false;

export function injectStyles() {
    if (typeof document === 'undefined' || injected) return;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.head.appendChild(style);
    injected = true;
}
