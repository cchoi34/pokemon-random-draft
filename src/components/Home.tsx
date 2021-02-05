import React, { useState } from 'react';
import RuleCard from './basic-elements/RuleCard';
import '../styles/home.css';

function Home() {
  const [cardInfo] = useState([
    {
      title: 'Draft your team',
      description: 'Start by drafting your Pokemon team from a selection of random Pokemon, moves and abilities. The draft will commence in a round-based manner, where 3 unique Pokemon will be shown, each with a random ability and 4 random moves (not limited to the Pokemon). Choose your favorite out of the three!',
      color: 'green',
    },
    {
      title: 'Build your team',
      description: 'Once you have gone through 10 rounds of drafting, you now have 10 potential candidates for your 6 slot Pokemon team. Out of the 40 moves and 10 random abilities, assemble the best team you can think of. Abilities and moves are not limited to the Pokemon they came with; you can mix and match them as you please!',
      color: 'orange',
    },
    {
      title: 'Export your team',
      description: 'Once you have settled on 6 Pokemon each with an ability and 4 unique moves, you can then export your team. This allows you to import it into Pokemon Showdown and you can now play against your friends. See who drafted the best team!',
      color: 'blue',
    },
  ]);

  return (
    <div className="home-container">
      <section className="home-section">
        <RuleCard
          title={cardInfo[0].title}
          description={cardInfo[0].description}
          color={cardInfo[0].color}
        />
      </section>
      <section className="home-section home-mirrored">
        <RuleCard
          title={cardInfo[1].title}
          description={cardInfo[1].description}
          color={cardInfo[1].color}
        />
      </section>
      <section className="home-section">
        <RuleCard
          title={cardInfo[2].title}
          description={cardInfo[2].description}
          color={cardInfo[2].color}
        />
      </section>
    </div>
  );
}

export default Home;