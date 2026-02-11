/**
 * Proxy for the Stockfish web worker to circumvent same-origin policy.
 * Loads the actual engine from CDN using importScripts.
 */
importScripts("https://cdn.jsdelivr.net/npm/cm-engine-runner@1.2.2/engines/stockfish-v10-niklasf.js");
