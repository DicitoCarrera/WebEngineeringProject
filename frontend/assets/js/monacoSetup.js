document.addEventListener('DOMContentLoaded', function() {
    if (typeof Sk === 'undefined') {
        console.error('Skulpt is not defined. Make sure Skulpt is loaded before this script.');
    } else {
        console.log('Sk:', typeof Sk);
    }

    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' }});

    require(['vs/editor/editor.main'], function() {
        const editorContainer = document.getElementById('editor-container');
        const languageSelector = document.getElementById('language-selector');
        let editor;

        function createEditor(language) {
            editor = monaco.editor.create(editorContainer, {
                value: [
                    'function helloWorld() {',
                    '\tconsole.log("Hello, world!");',
                    '}'
                ].join('\n'),
                language: language,
                theme: 'vs-dark'
            });
        }

        if (editorContainer) {
            createEditor('javascript');

            languageSelector.addEventListener('change', function() {
                const selectedLanguage = languageSelector.value;
                monaco.editor.setModelLanguage(editor.getModel(), selectedLanguage);
            });

            document.getElementById('run-code').addEventListener('click', function () {
                const code = editor.getValue();
                const language = languageSelector.value;
                const outputElement = document.getElementById('output');

                console.log(`Running code in ${language}`);
                console.log(`Code: ${code}`);

                if (language === 'javascript') {
                    try {
                        const result = eval(code);
                        outputElement.innerText = result !== undefined ? result : 'Code executed successfully!';
                    } catch (error) {
                        outputElement.innerText = 'Error: ' + error.message;
                    }
                } else if (language === 'python') {
                    // Используйте библиотеку Skulpt для выполнения Python кода
                    console.log('Executing Python code with Skulpt');
                    outputElement.innerText = ''; // Очистите вывод перед выполнением
                    if (typeof Sk === 'undefined') {
                        console.error('Skulpt is not defined');
                    } else {
                        Sk.configure({ output: (text) => outputElement.innerText += text });
                        Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true))
                            .then(() => {
                                console.log('Python code executed successfully');
                                outputElement.innerText = 'Code executed successfully!';
                            })
                            .catch((error) => {
                                console.error('Error executing Python code:', error);
                                outputElement.innerText = 'Error: ' + error.toString();
                            });
                    }
                } else {
                    outputElement.innerText = 'Language not supported yet.';
                }
            });
        }
    });
});