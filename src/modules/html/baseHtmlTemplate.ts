import baseJsonTemplate from '@/modules/json/baseJsonTemplate';

export default `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>PatronSchemeEditor</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/patron-scheme-editor/dist/style.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      window.content = '${baseJsonTemplate}';
      window.content = fromBase64(window.content);

      fetch('https://raw.githubusercontent.com/kosukhin/patron-scheme-editor/refs/heads/issue-28/embedable/dist/assets/index.js')
      .then(r => r.text())
      .then((scriptText) => {
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = scriptText;
        document.body.appendChild(script);
      });

      function fromBase64(binstr) {
        const safeStr = atob(binstr);
        const arr = new Uint8Array(safeStr.length);
        for (let i = 0; i < safeStr.length; i += 1) {
          arr[i] = safeStr.charCodeAt(i);
        }
        return new TextDecoder().decode(arr);
      }
    </script>
  </body>
</html>`;
