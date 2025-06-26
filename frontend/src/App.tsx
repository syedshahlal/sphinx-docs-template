import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MarkdownPage from "./components/features/MarkdownPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/platform-introduction" element={<MarkdownPage />} />
        <Route path="/getting-started" element={<MarkdownPage />} />
        <Route path="/api-reference" element={<MarkdownPage />} />
      </Routes>
    </Router>
  )
}

export default App
