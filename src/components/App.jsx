import { useState, useEffect } from "react"
import Editor from "./editor"
import Uselocalestorage from "./hooks/uselocalestorage"

function App() {
  const [html, setHtml] = Uselocalestorage('html','')
  const [css, setCss] = Uselocalestorage('css','')
  const [js, setJs] = Uselocalestorage('js','')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `)
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language='xml'
          displayName='HTML'
          value={html}
          onChange={setHtml}
        />
        <Editor
          language='css'
          displayName='CSS'
          value={css}
          onChange={setCss} />
        <Editor
          language='javascript'
          displayName='JS'
          value={js}
          onChange={setJs} />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          style={{ border: "none" }}
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App
