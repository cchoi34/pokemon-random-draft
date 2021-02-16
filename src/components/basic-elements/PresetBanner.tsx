import React from 'react';
import { PresetBannerData } from '../../utils/dataTypes';
import '../../styles/preset-banner.css';
import '../../styles/text.css';

function PresetBanner(
  { 
    generation, 
    legendaries, 
    hinderingAbilities, 
    wonderGuard,
  }: PresetBannerData,
) {
  const legendariesText = legendaries ? 'Legendaries' : 'No legendaries';
  const hinderingAbilitiesText = hinderingAbilities ? 'Hindering abilities' : 'No hindering abilities';
  const wonderGuardText = wonderGuard ? 'Wonder guard' : 'No wonder guard';

  return (
    <div className="preset-banner-container">
      <p>{generation} | {legendariesText} | {hinderingAbilitiesText} | {wonderGuardText}</p>
    </div>
  );
}

export default PresetBanner;