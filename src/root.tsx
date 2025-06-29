import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.body);

const App: React.FC = () => {
    return <div style={{ display: "flex", flexDirection: "column" }}>
        {pages.map(page => <a key={page} href={page}>{page.split(/[\\\/]/g).slice(1, -1).join("/")}</a>)}
    </div>
};
root.render(<App />);