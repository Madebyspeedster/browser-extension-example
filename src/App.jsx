import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [collectedTexts, setCollectedTexts] = useState({});
  const [expandedSites, setExpandedSites] = useState({});

  useEffect(() => {
    chrome.storage.local.get(["collectedTexts"], (result) => {
      setCollectedTexts(result.collectedTexts || {});
    });
  }, []);

  const toggleSite = (site) => {
    setExpandedSites((prev) => ({
      ...prev,
      [site]: !prev[site],
    }));
  };

  const removeText = (site, index) => {
    const updatedTexts = { ...collectedTexts };

    if (Array.isArray(updatedTexts[site])) {
      updatedTexts[site].splice(index, 1);

      if (updatedTexts[site].length === 0) {
        delete updatedTexts[site];
      }

      chrome.storage.local.set({ collectedTexts: updatedTexts }, () => {
        setCollectedTexts(updatedTexts);
      });
    }
  };

  return (
    <div>
      <h1>Collected Texts</h1>
      {Object.keys(collectedTexts).length > 0 ? (
        Object.keys(collectedTexts).map((site) => (
          <div key={site} className="site-group">
            <h2 onClick={() => toggleSite(site)} className="site-header">
              {site}
              <span className="toggle-icon">
                {expandedSites[site] ? "-" : "+"}
              </span>
            </h2>
            {expandedSites[site] && (
              <ul className="text-list">
                {Array.isArray(collectedTexts[site])
                  ? collectedTexts[site].map((text, index) => (
                      <li key={index} className="text-item">
                        <p>{text}</p>
                        <button
                          className="remove-btn"
                          onClick={() => removeText(site, index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))
                  : null}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>No texts collected yet.</p>
      )}
    </div>
  );
}

export default App;
