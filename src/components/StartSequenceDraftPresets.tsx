import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase/firestore';
import Button from './basic-elements/Button';
import '../styles/start-sequence.css';
import '../styles/text.css';

function StartSequenceDraftPresets() {
  return (
    <div className="draft-presets-container text-subheader">
      <div className="draft-presets-card">
        <h2>Draft Presets</h2>
        <div className="draft-presets-form-element text-eyebrow">
          <label htmlFor="generation">Generation</label>
          <select name="generation" id="generation">
            <option value="gen-3">Gen 3</option>
          </select>
        </div>
        <div className="draft-presets-form-element text-eyebrow">
          <label htmlFor="legendaries">Legendaries</label>
          <select name="legendaries" id="legendaries">
            <option value="allowed">Allowed</option>
            <option value="not-allowed">Not allowed</option>
          </select>
        </div>
        <div className="draft-presets-form-element text-eyebrow">
          <label htmlFor="hindering-abilities">Hindering abilities</label>
          <select name="hindering-abilities" id="hindering-abilities">
            <option value="allowed">Allowed</option>
            <option value="not-allowed">Not allowed</option>
          </select>
        </div>
        <div className="draft-presets-form-element text-eyebrow">
          <label htmlFor="wonder-guard">Wonder guard</label>
          <select name="wonder-guard" id="wonder-guard">
            <option value="allowed">Allowed</option>
            <option value="not-allowed">Not allowed</option>
          </select>
        </div>
        <div className="draft-presets-button">
          <Button text="Start draft" />
        </div>
      </div>

    </div>
  );
}

export default StartSequenceDraftPresets;