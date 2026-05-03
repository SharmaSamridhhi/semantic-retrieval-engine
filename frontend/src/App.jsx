import { useState } from "react";
import axios from "axios";

const GATEWAY = "http://localhost:3000";

function App() {
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${GATEWAY}/upload`, formData);
    setDocumentId(res.data.document_id);
  };
  const handleSearch = async () => {
    const res = await axios.post(`${GATEWAY}/search`, {
      query,
      document_id: documentId,
    });
    setResults(res.data.results);
  };
  return (
    <div>
      <h1>Upload + Search</h1>
      <input type='file' onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {documentId && <p>ID: {documentId}</p>}
      <input
        type='text'
        placeholder='Enter query'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {results.map((r, i) => (
        <div key={i}>
          <p>{r.text}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
