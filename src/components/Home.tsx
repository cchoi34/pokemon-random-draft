import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firestore';
import RuleCard from './basic-elements/RuleCard';
import { RuleCardData } from '../utils/dataTypes';
import * as componentUtils from '../utils/componentUtils';
import '../styles/home.css';

function Home() {
  const [cardInfoOne, setCardInfoOne] = useState<RuleCardData>(
    {
      title: 'Draft your team',
      description: 'Start',
      color: 'green',
    },
  );
  const [cardInfoTwo, setCardInfoTwo] = useState<RuleCardData>(
    {
      title: 'Draft your team',
      description: 'Start by drafting your Pokemon team from a selection of random Pokemon, moves and abilities. The draft will commence in a round-based manner, where 3 unique Pokemon will be shown, each with a random ability and 4 random moves (not limited to the Pokemon). Choose your favorite out of the three!',
      color: 'green',
    },
  );
  const [cardInfoThree, setCardInfoThree] = useState<RuleCardData>(
    {
      title: 'Draft your team',
      description: 'Start by drafting your Pokemon team from a selection of random Pokemon, moves and abilities. The draft will commence in a round-based manner, where 3 unique Pokemon will be shown, each with a random ability and 4 random moves (not limited to the Pokemon). Choose your favorite out of the three!',
      color: 'green',
    },
  );

  useEffect(() => {
    async function getRuleData() {
      const ruleCardOne = await db.collection('rules').doc('1').get();
      const ruleCardTwo = await db.collection('rules').doc('2').get();
      const ruleCardThree = await db.collection('rules').doc('3').get();
      const ruleCardOneData = ruleCardOne.data();
      const ruleCardTwoData = ruleCardTwo.data();
      const ruleCardThreeData = ruleCardThree.data();
      if (ruleCardOneData) {
        const data = componentUtils.modifyDataForHomeState(
          ruleCardOneData.title,
          ruleCardOneData.description,
          ruleCardOneData.color,
        );
        setCardInfoOne(data);
      }
      if (ruleCardTwoData) {
        const data = componentUtils.modifyDataForHomeState(
          ruleCardTwoData.title,
          ruleCardTwoData.description,
          ruleCardTwoData.color,
        );
        setCardInfoTwo(data);
      }
      if (ruleCardThreeData) {
        const data = componentUtils.modifyDataForHomeState(
          ruleCardThreeData.title,
          ruleCardThreeData.description,
          ruleCardThreeData.color,
        );
        setCardInfoThree(data);
      }
    }

    getRuleData();
  });

  return (
    <div className="home-container">
      <section className="home-section">
        <RuleCard
          title={cardInfoOne.title}
          description={cardInfoOne.description}
          color={cardInfoOne.color}
        />
      </section>
      <section className="home-section home-mirrored">
        <RuleCard
          title={cardInfoTwo.title}
          description={cardInfoTwo.description}
          color={cardInfoTwo.color}
        />
      </section>
      <section className="home-section">
        <RuleCard
          title={cardInfoThree.title}
          description={cardInfoThree.description}
          color={cardInfoThree.color}
        />
      </section>
    </div>
  );
}

export default Home;