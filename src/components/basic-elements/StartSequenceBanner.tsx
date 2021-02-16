import React from 'react';
import StartSequenceHeader from './StartSequenceHeader';
import PresetBanner from './PresetBanner';
import YourPokemonDraftProgressBar from './YourPokemonDraftProgressBar';
import { PresetBannerData, YourPokemonDraftProgressBarData } from '../../utils/dataTypes';
import '../../styles/start-sequence-banner.css';
import '../../styles/text.css';

type StartSequenceBannerProps = {
  header: string,
  subheader: string | null,
  presets: PresetBannerData,
  draftProgressBar: YourPokemonDraftProgressBarData | null,
}

function StartSequenceBanner({ 
  header, 
  subheader, 
  presets, 
  draftProgressBar, 
}: StartSequenceBannerProps) {
  function getHeader() {
    return (
      <div className="start-sequence-banner-header">
        <StartSequenceHeader header={header} subheader={subheader} />
      </div>
    );
  }

  function getPresetBanner() {
    return (
      <div className="start-sequence-preset-banner">
        <PresetBanner 
          generation={presets.generation}
          legendaries={presets.legendaries}
          hinderingAbilities={presets.hinderingAbilities}
          wonderGuard={presets.wonderGuard} 
        />
      </div>
    );
  }

  function getDraftProgressBar() {
    if (draftProgressBar) {
      return (
        <div className="start-sequence-draft-progress-bar">
          <YourPokemonDraftProgressBar 
            pokemonDraftedImages={draftProgressBar.pokemonDraftedImages} 
          />
        </div>
      );
    }
    return <div />;
  }

  return (
    <div className="start-sequence-banner-container">
      {getPresetBanner()}
      {getHeader()}
      {getDraftProgressBar()}
    </div>
  );
}

export default StartSequenceBanner;