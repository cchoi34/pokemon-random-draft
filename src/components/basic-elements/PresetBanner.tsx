import React from 'react';
import '../../styles/preset-banner.css';
import '../../styles/text.css';

type PresetBannerProps = {
  generation: string,
  legendaries: boolean,
  hinderingAbilities: boolean,
  wonderGuard: boolean,

}

function PresetBanner(
  { 
    generation, 
    legendaries, 
    hinderingAbilities, 
    wonderGuard,
  }: PresetBannerProps,
) {
  const legendariesText = legendaries ? 'Legendaries' : 'No legendaries';
  const hinderingAbilitiesText = hinderingAbilities ? 'Hindering abilities' : 'No hindering abilities';
  const wonderGuardText = wonderGuard ? 'Wonder guard' : 'No wonder guard';

  return (
    <div className="preset-banner-container text-paragraph">
      <p>{generation} | {legendariesText} | {hinderingAbilitiesText} | {wonderGuardText}</p>
    </div>
  );
}

export default PresetBanner;