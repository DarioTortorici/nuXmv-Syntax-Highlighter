# nuXmv Syntax Highlighter VSCode Extension

A Visual Studio Code extension for **nuXmv**, providing syntax highlighting, hovers, and code snippets to streamline your formal modeling workflow.

## ✨ Features

- Syntax highlighting for `.smv` files
- Auto-closing brackets and quotes
- Hover information for keywords
- Code Snippets for quick module and construct insertion

### 🚀 Snippets Available

You can now insert common nuXmv constructs using predefined snippets. Try typing the following prefixes in a `.smv` file and hit `Tab` or use `Ctrl+Space`:

| Prefix   | Description                   |
|----------|-------------------------------|
| `mod`    | Module template               |
| `var`    | Variable declaration          |
| `ivar`   | Input variable declaration    |
| `def`    | Define macro                  |
| `init`   | INIT block                    |
| `trans`  | TRANS block                   |
| `ltl`    | LTL specification             |
| `ctl`    | CTL specification             |
| `case`   | Case statement                |

---

## 📦 Release Notes

### 0.2.0

- Added support for code snippets

### 0.1.1

- Added hover support for common nuXmv keywords

## Missing Features

- Recognizion of fractional reals
- Code Completion Proposals

---

## Contributing

We welcome contributions!

### How to Contribute

1. **Fork** this repository
2. **Clone** your fork:  
   ```bash
   git clone https://github.com/your-username/nuXmv-Syntax-Highlighter.git
    ```
3. **Create a new branch** for your changes:

   ```bash
   git checkout -b feature/new-feature
   ```
4. Make your changes
5. **Test** your extension in VSCode using the debugger (`F5`)
6. **Commit** and **push**:
   ```bash
   git commit -m "Add: new feature"
   git push origin feature/new-feature
   ```
7. **Open a pull request** describing your changes

### Contribution Guidelines

- Use clear and descriptive commit messages
- Follow the structure and formatting of existing code
- Try to keep pull requests focused (one fix or feature at a time)
- Check for spelling and grammar if editing documentation
- If you're adding a new keyword or feature, update the syntax files as needed

## Maintainers

- [Dario Tortorici](https://github.com/DarioTortorici)

## License

Fork of the inactive [Felix Engl](https://github.com/FelixEngl/SimpleNuxmvLanguageSupport) repository.
The Simple nuXmv Language Support extension is subject to [these license terms](https://github.com/DarioTortorici/nuXmv-Syntax-Highlighter/blob/master/LICENCE.txt).
