# Cross Window Communication Demo

Demo project that draws a complete graph between windows. Demonstrates two
approaches to communicating across browser windows of the same origin: shared
memory (`localStorage`) and message passing (`BroadcastChannel`).

![Demo](./example.gif)

## Local setup

To run:

```
pnpm install
pnpm dev
```

The message-passing hooks are under
`packages/cross-window-communication/src/hooks/message-passing`, and the
shared-memory hooks are under
`packages/cross-window-communication/src/hooks/shared-memory`. You can swap
between these two methods by changing the imports in
`packages/cross-window-communication/src/App.tsx`
