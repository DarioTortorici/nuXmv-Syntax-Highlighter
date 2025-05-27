const vscode = require("vscode");

// Static hover info for known nuXmv keywords
const hoverInfo = {
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
  "init": "Assign the initial value of a variable.",
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider("nuxmv", {
      provideHover(document, position) {
        const wordRange = document.getWordRangeAtPosition(position, /\b[A-Za-z_][A-Za-z0-9_]*\b/);
        if (!wordRange) return null;

        const word = document.getText(wordRange);

        if (hoverInfo[word]) {
          return new vscode.Hover(`**${word}**: ${hoverInfo[word]}`);
        }

        return null;
      }
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
