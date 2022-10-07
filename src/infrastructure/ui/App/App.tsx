import React, { useEffect } from "react";
import "./App.scss";
import { palette } from "../../../domain";
import { initStore } from "../store";
import { Link, Route, Router, useRoute } from "wouter";
import { Groceries, ItemCRUD, SettingsCRUD } from "../views";

function App() {
  const [match] = useRoute("/groceries");
  useEffect(() => {
    initStore();
  }, []);

  return (
    <Router base="/groceries">
      <div className="App">
        <header
          className="App-header"
          style={{
            backgroundColor: palette.purple,
            color: palette.white,
          }}
        >
          <span>{!match && <Link to="/">🔙</Link>}</span>
          <span>🛒 Groceries list 🛒</span>
          <span>
            <Link to="/settings">⚙️</Link>
          </span>
        </header>
        <main className="App-main">
          <Route path="/" component={Groceries} />
          <Route path="/settings" component={SettingsCRUD} />
          <Route path="/items/:id" component={ItemCRUD} />
        </main>
      </div>
    </Router>
  );
}

export default App;
