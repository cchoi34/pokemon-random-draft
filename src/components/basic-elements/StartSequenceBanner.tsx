import React from 'react';
import StartSequenceHeader from './StartSequenceHeader';
import PresetBanner from './PresetBanner';
import YourPokemonDraftProgressBar from './YourPokemonDraftProgressBar';
import { PresetBannerData, SelectedPokemonData, YourPokemonDraftProgressBarData } from '../../utils/dataTypes';
import '../../styles/start-sequence-banner.css';
import '../../styles/text.css';

type StartSequenceBannerProps = {
  header: string,
  subheader: string | null,
  presets: PresetBannerData,
  progressBar?: YourPokemonDraftProgressBarData | null,
}

function StartSequenceBanner({ 
  header, 
  subheader, 
  presets, 
  progressBar, 
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
    if (progressBar) {
      return (
        <div className="start-sequence-draft-progress-bar">
          <YourPokemonDraftProgressBar 
            allSelectedPokemon={progressBar.allSelectedPokemon} 
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