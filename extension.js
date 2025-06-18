const vscode = require("vscode");

function parseDefines(documentText) {
  const defineRegex = /DEFINE\s+((?:.|\n)*?)(?=(?:MODULE|VAR|IVAR|FROZENVAR|INIT|TRANS|ASSIGN|$))/gi;
  const defines = {};
  let match;
  while ((match = defineRegex.exec(documentText)) !== null) {
    const lines = match[1].split("\n").map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      const parts = line.split(":=");
      if (parts.length === 2) {
        const key = parts[0].trim();
        const value = parts[1].replace(/;$/, '').trim();
        defines[key] = value;
      }
    }
  }
  return defines;
}

function parseModules(documentText) {
  const moduleParamRegex = /MODULE\s+(\w+)\s*\(([^)]*)\)/g;
  const modules = {};
  let match;
  while ((match = moduleParamRegex.exec(documentText)) !== null) {
    const name = match[1];
    const params = match[2].split(',').map(p => p.trim()).filter(Boolean);
    modules[name] = params;
  }
  return modules;
}

function parseDocument(document) {
  const text = document.getText();
  return {
    defines: parseDefines(text),
    modules: parseModules(text),
  };
}

function activate(context) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider("nuxmv", {
      provideHover(document, position) {
        const wordRange = document.getWordRangeAtPosition(position, /[\w.]+/);
        if (!wordRange) return null;

        const word = document.getText(wordRange);
        const { defines, modules } = parseDocument(document);

        if (defines[word]) {
          return new vscode.Hover(`**${word}** (defined in DEFINE): ${defines[word]}`);
        }

        // Handle nested access like mod1.submod.var
        const parts = word.split(".");
        if (parts.length > 1) {
          const last = parts[parts.length - 1];
          if (defines[last]) {
            return new vscode.Hover(`**${last}** (defined in DEFINE): ${defines[last]}`);
          }
        }

        // Check if it's a known module name
        if (modules[word]) {
          const params = modules[word].join(", ");
          return new vscode.Hover(`**${word}** (module): Parameters = [${params}]`);
        }

        const keywordDocs = {
          "MODULE": "Defines a module block.",
          "VAR": "Declares state variables.",
          "IVAR": "Declares input variables.",
          "FROZENVAR": "Declares frozen variables (unchanging over time).",
          "DEFINE": "Defines constants or macro expressions.",
          "INIT": "Initial state assignment.",
          "TRANS": "Transition relation.",
          "INVAR": "Invariant conditions.",
          "ASSIGN": "Assignment block.",
          "TRUE": "Boolean constant: true.",
          "FALSE": "Boolean constant: false.",
          "SPEC": "Property to be checked.",
          "LTLSPEC": "Linear Temporal Logic specification.",
          "CTLSPEC": "Computation Tree Logic specification.",
          "PSLSPEC": "Property Specification Language specification.",
          "init": "Assign the initial value of a variable."
        };

        if (keywordDocs[word]) {
          return new vscode.Hover(`**${word}**: ${keywordDocs[word]}`);
        }

        return null;
      }
    })
  );

  context.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider("nuxmv", {
      provideDocumentSymbols(document) {
        const symbols = [];
        const regex = /^(MODULE|VAR|DEFINE|INIT|TRANS|ASSIGN|LTLSPEC|CTLSPEC)\b.*$/gm;
        const text = document.getText();
        let match;
        while ((match = regex.exec(text))) {
          const line = document.positionAt(match.index).line;
          const range = new vscode.Range(line, 0, line, match[0].length);
          symbols.push(new vscode.DocumentSymbol(
            match[0], '', vscode.SymbolKind.Namespace, range, range
          ));
        }
        return symbols;
      }
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
