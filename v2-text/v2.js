function changeTextSize() {
    const size = prompt("Enter the text size (1-7)");
    if (size) {
        document.execCommand('fontSize', false, size);
    }
}
        function getSelectedTable() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let node = range.startContainer;
        while (node && node.nodeName !== 'TABLE') {
            node = node.parentNode;
        }
        return node;
    }
    return null;
}

function addRow() {
    const table = getSelectedTable();
    if (table) {
        const newRow = table.insertRow();
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            newRow.insertCell().innerHTML = '&nbsp;';
        }
    }
}

function deleteRow() {
    const table = getSelectedTable();
    if (table && table.rows.length > 0) {
        table.deleteRow(-1);
    }
}

function addColumn() {
    const table = getSelectedTable();
    if (table) {
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].insertCell().innerHTML = '&nbsp;';
        }
    }
}

function deleteColumn() {
    const table = getSelectedTable();
    if (table && table.rows[0].cells.length > 0) {
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].deleteCell(-1);
        }
    }
}

        function printDocument() {
    const content = document.getElementById('editor').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Document</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

        function autoSave() {
    const content = document.getElementById('editor').innerHTML;
    localStorage.setItem('autosaveContent', content);
}

function loadAutoSavedContent() {
    const savedContent = localStorage.getItem('autosaveContent');
    if (savedContent) {
        document.getElementById('editor').innerHTML = savedContent;
    }
}

setInterval(autoSave, 30000); // Autosave every 30 seconds
window.onload = loadAutoSavedContent;

        function changeTextColor() {
    const color = prompt("Enter the text color (e.g., red, blue, #123456)");
    if (color) {
        document.execCommand('foreColor', false, color);
    }
}
function changeFontFamily() {
    const font = prompt("Enter the font family (e.g., Arial, Courier, Times New Roman)");
    if (font) {
        document.execCommand('fontName', false, font);
    }
}

                function createLink() {
            const url = prompt("Right Click Link to open");
            if (url) {
                document.execCommand('createLink', false, url);
            }
        }
                function highlightText() {
            const color = prompt("Enter the highlight color (e.g., yellow, pink)");
            if (color) {
                document.execCommand('hiliteColor', false, color);
            }
        }
        function clearText() { const editor = document.getElementById('editor'); editor.innerHTML = ''; updateWordCount();}
        function execCmd(command) {
            document.execCommand(command, false, null);
        }

        function insertImage(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                document.execCommand('insertHTML', false, img.outerHTML);
            };
            reader.readAsDataURL(file);
        }

        function insertTable() {
            const rows = prompt("Enter the number of rows", 2);
            const cols = prompt("Enter the number of columns", 2);
            if (rows && cols) {
                let table = '<table border="1">';
                for (let i = 0; i < rows; i++) {
                    table += '<tr>';
                    for (let j = 0; j < cols; j++) {
                        table += '<td>&nbsp;</td>';
                    }
                    table += '</tr>';
                }
                table += '</table>';
                document.execCommand('insertHTML', false, table);
            }
        }

        function updateWordCount() {
            const text = document.getElementById('editor').innerText || '';
            const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
            document.getElementById('wordCount').innerText = `Word Count: ${wordCount}`;
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const editor = document.getElementById('editor');
            editor.classList.toggle('dark-mode');
        }

        function saveHTML() {
            const editorContent = document.getElementById('editor').innerHTML;
            const blob = new Blob([editorContent], { type: "text/html;charset=utf-8" });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "document.html";
            link.click();
        }

        function uploadHTML(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('editor').innerHTML = e.target.result;
                updateWordCount();
            };
            reader.readAsText(file);
        }