// Runs Pyodide + SymPy off the UI thread so a slow integral cannot freeze the page.
let runF, prevF, stepsF, chemF;
self.onmessage = async ({ data }) => {
  if (data.type === "init") {
    try {
      importScripts("pyodide/pyodide.js");
      const base = new URL("pyodide/", self.location.href).href;
      const py = await loadPyodide({ indexURL: base, stdLibURL: base + "python_stdlib.woff2" });
      // Archives are published with a font extension because the host serves no .zip or .whl.
      for (const n of ["mpmath", "sympy"]) py.unpackArchive(await (await fetch(base + n + ".woff2")).arrayBuffer(), "wheel");
      py.runPython(await (await fetch("engine.txt")).text());
      py.runPython(await (await fetch("steps.txt")).text());
      py.runPython(await (await fetch("chem_data.txt")).text());
      py.runPython(await (await fetch("chem.txt")).text());
      runF = py.globals.get("run"); prevF = py.globals.get("preview"); stepsF = py.globals.get("steps"); chemF = py.globals.get("chem");
      postMessage({ type: "ready", version: py.runPython("import sympy; sympy.__version__") });
    } catch (e) { postMessage({ type: "fail", error: String(e) }); }
  } else if (data.type === "call") {
    try { postMessage({ type: "result", id: data.id, value: (data.fn === "run" ? runF : data.fn === "steps" ? stepsF : data.fn === "chem" ? chemF : prevF)(...data.args) }); }
    catch (e) { postMessage({ type: "result", id: data.id, error: String(e).split("\n").filter(Boolean).pop() }); }
  }
};
