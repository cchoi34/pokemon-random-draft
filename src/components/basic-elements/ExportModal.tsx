import React, { useState, useEffect } from 'react';
import { YourPokemonDraftItemData } from '../../utils/dataTypes';
import Button from './Button';
import '../../styles/export-modal.css';
import '../../styles/text.css';
import { MAX_CHOSEN_POKEMON } from '../../utils/componentUtils';

type ExportModalProps = {
  PokemonData: YourPokemonDraftItemData[],
  onCloseModal: () => void,
}

function ExportModal({ PokemonData, onCloseModal }: ExportModalProps) {
  const [textValue, setTextValue] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  function capitalizeFirstLetters(name: string): string {
    if (name.includes('-')) {
      const words = name.split('-');
      const capitalizedFirstLetterWord = words.map((word) => {
        const firstLetter = word[0];
        return `${firstLetter.toUpperCase()}${word.substr(1)}`;
      });
      return capitalizedFirstLetterWord.join('-');
    }
    const words = name.split(' ');
    const capitalizedFirstLetterWord = words.map((word) => {
      const firstLetter = word[0];
      return `${firstLetter.toUpperCase()}${word.substr(1)}`;
    });
    return capitalizedFirstLetterWord.join(' ');
  }

  function formatPokemonDataToText() {
    if (PokemonData.length <= MAX_CHOSEN_POKEMON) {
      const dataToParse = PokemonData.map((item) => {
        const pokemonName = capitalizeFirstLetters(item.pokemonName);
        const abilityName = capitalizeFirstLetters(item.abilityName);
        const moveNames = item.moves.map((move) => {
          return capitalizeFirstLetters(move.name);
        });
        const itemStrings = [
          pokemonName,
          `Ability: ${abilityName}`,
          `- ${moveNames[0]}`,
          `- ${moveNames[1]}`,
          `- ${moveNames[2]}`,
          `- ${moveNames[3]}\n`,
        ];
        return itemStrings.join('\n');
      });
      return dataToParse.join('\n');
    }
    return null;
  }

  function onCopyClick() {
    const textArea = document.getElementById('export-modal-text-value') as HTMLInputElement;
    if (textArea) {
      textArea.focus();
      textArea.select(); 
      document.execCommand('copy');
      setCopiedMessage('Copied to clipboard!');
      setTimeout(() => {
        setCopiedMessage(null);
      }, 3000);
    }
  }

  useEffect(() => {
    setTextValue(formatPokemonDataToText());
  }, []);

  return (
    <div className="export-modal-background-container">
      <div className="export-modal-container">
        <button 
          type="button"
          className="export-modal-close-button"
          onClick={(() => {
            onCloseModal();
          })}>
          x
        </button>
        {
          textValue !== null 
            ? (
              <div className="export-modal-success-elements">
                <h3 className="export-modal-header">Copy and Paste this text into Pokemon Showdown!</h3>
                <textarea 
                  id="export-modal-text-value"
                  readOnly={true}
                  value={textValue} 
                  className="export-modal-text-box"
                />
                <div className="export-modal-copied-message-container">
                  {
                    copiedMessage && <p className="export-modal-copied-message">{copiedMessage}</p>
                  }
                </div>
                <div className="export-modal-copy-button">
                  <Button 
                    text="Copy" 
                    onClick={(() => {
                      onCopyClick();
                    })} />
                </div>
              </div>
            )
            : (
              <div className="export-modal-error-elements">
                <h3 className="export-modal-header">Error exporting data!</h3>
                <p>Make sure you are exporting a team of 6 Pokemon</p>
              </div>
            )
        }
      </div>
    </div>
  );
}

export default ExportModal;