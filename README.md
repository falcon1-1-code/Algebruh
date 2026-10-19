# Algebruh

A maths calculator that runs entirely in your browser (no server, no account). It factors, expands, solves, differentiates and integrates, checks a worked answer, and shows the steps. Built for IB-level algebra and calculus homework, on a phone first.

Open it in Safari, then Share → Add to Home Screen for a full-screen app. It works offline after the first load (about 18 MB).

- Fractions and decimals mix freely, with a one-tap Fraction / Decimal switch on every result.
- DEG / RAD switch for angles (calculus is always in radians). `log` is base 10, `ln` is natural.
- Live typeset preview of what you type, and a built-in keypad.
- "Show steps" for factoring, expanding, fraction sums, linear and quadratic equations, derivatives and integrals. A chain of steps is only shown if it checks out against the answer.

## How it works

[Pyodide](https://pyodide.org) (Python in WebAssembly) runs [SymPy](https://www.sympy.org) in a Web Worker, so a slow calculation can be cancelled without freezing the page. Maths is typeset with [KaTeX](https://katex.org). `engine.txt` and `steps.txt` are the Python engine; `index.html` is the interface.

## Licences

Original code: MIT. Bundled: Pyodide (MPL-2.0), SymPy and mpmath (BSD-3-Clause), KaTeX (MIT).
