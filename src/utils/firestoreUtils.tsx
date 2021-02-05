import React from 'react';
import db from '../firebase/firestore';
import * as componentUtils from './componentUtils';
import { RuleCardData, AllRuleCardData } from './dataTypes';

// export async function getRuleData(): Promise<AllRuleCardData> {
//   const ruleCardOne = await db.collection('rules').doc('1').get();
//   const ruleCardTwo = await db.collection('rules').doc('2').get();
//   const ruleCardThree = await db.collection('rules').doc('3').get();
//   const ruleCardOneData = ruleCardOne.data();
//   const ruleCardTwoData = ruleCardTwo.data();
//   const ruleCardThreeData = ruleCardThree.data();
//   let dataOne;
//   let dataTwo;
//   let dataThree;
//   if (ruleCardOneData) {
//     dataOne = componentUtils.modifyDataForHomeState(
//       ruleCardOneData.title,
//       ruleCardOneData.description,
//       ruleCardOneData.color,
//     );
//   }
//   if (ruleCardTwoData) {
//     dataTwo = componentUtils.modifyDataForHomeState(
//       ruleCardTwoData.title,
//       ruleCardTwoData.description,
//       ruleCardTwoData.color,
//     );
//   }
//   if (ruleCardThreeData) {
//     dataThree = componentUtils.modifyDataForHomeState(
//       ruleCardThreeData.title,
//       ruleCardThreeData.description,
//       ruleCardThreeData.color,
//     );
//   }
//   return {
//     dataOne,
//     dataTwo,
//     dataThree,
//   };
// }