
import { differenceInMonths, differenceInYears } from 'date-fns';
import type { CreditCardData, ScoreFactors, Insight, ScoreFactorName } from './types';

const FACTOR_WEIGHTS: Record<ScoreFactorName, number> = {
  'Payment History': 0.40,
  'Credit Utilization': 0.30,
  'Credit Age': 0.15,
  'Recent Inquiries': 0.10,
  'Credit Mix': 0.05,
};

// --- Factor Calculation Functions ---

function calculatePaymentHistory(cards: CreditCardData[]): { score: number; details: string } {
  const totalMissedPayments = cards.reduce((sum, card) => sum + card.missedPayments, 0);
  let score: number;

  if (totalMissedPayments === 0) score = 100;
  else if (totalMissedPayments === 1) score = 60;
  else if (totalMissedPayments === 2) score = 40;
  else score = 20;

  return { score, details: `${totalMissedPayments} missed payments in the last 12 months.` };
}

function calculateUtilization(cards: CreditCardData[]): { score: number; details: string } {
  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);

  if (totalLimit === 0) {
    return { score: 100, details: 'No credit limit reported.' };
  }

  const utilization = (totalBalance / totalLimit) * 100;
  let score: number;

  if (utilization <= 10) score = 100;
  else if (utilization <= 30) score = 90;
  else if (utilization <= 50) score = 70;
  else if (utilization <= 75) score = 50;
  else score = 20;

  return { score, details: `You are using ${utilization.toFixed(0)}% of your available credit.` };
}

function calculateCreditAge(cards: CreditCardData[]): { score: number; details: string } {
  if (cards.length === 0) {
    return { score: 0, details: 'No credit cards added.' };
  }
  
  const now = new Date();
  const oldestCard = cards.reduce((oldest, card) => {
    const cardDate = new Date(card.openDate);
    return cardDate < new Date(oldest.openDate) ? card : oldest;
  });

  const ageInYears = differenceInYears(now, new Date(oldestCard.openDate));
  let score: number;

  if (ageInYears >= 9) score = 100;
  else if (ageInYears >= 7) score = 90;
  else if (ageInYears >= 5) score = 80;
  else if (ageInYears >= 3) score = 70;
  else if (ageInYears >= 1) score = 50;
  else score = 30;

  return { score, details: `Your oldest card is ${ageInYears} years old.` };
}

function calculateInquiries(applications: number): { score: number; details: string } {
  let score: number;

  if (applications === 0) score = 100;
  else if (applications <= 2) score = 80;
  else if (applications <= 4) score = 60;
  else score = 40;

  return { score, details: `${applications} new applications in the last 6 months.` };
}

function calculateCreditMix(cards: CreditCardData[], hasOtherLoans: boolean): { score: number; details: string } {
  const hasMultipleCards = cards.length > 1;
  let score: number;
  let details: string;

  if (hasMultipleCards && hasOtherLoans) {
    score = 100;
    details = 'Excellent mix of cards and other loans.';
  } else if (hasMultipleCards || hasOtherLoans) {
    score = 80;
    details = 'Good mix of credit types.';
  } else {
    score = 50;
    details = 'Your credit mix could be improved.';
  }
  
  return { score, details };
}

// --- Main Calculation Engine ---

export function calculateScore(
  cards: CreditCardData[],
  applications: number,
  hasOtherLoans: boolean
): { score: number; factors: ScoreFactors } {

  const paymentHistory = calculatePaymentHistory(cards);
  const utilization = calculateUtilization(cards);
  const creditAge = calculateCreditAge(cards);
  const inquiries = calculateInquiries(applications);
  const creditMix = calculateCreditMix(cards, hasOtherLoans);

  const factors: ScoreFactors = {
    'Payment History': { name: 'Payment History', value: paymentHistory.score, weight: FACTOR_WEIGHTS['Payment History'], details: paymentHistory.details },
    'Credit Utilization': { name: 'Credit Utilization', value: utilization.score, weight: FACTOR_WEIGHTS['Credit Utilization'], details: utilization.details },
    'Credit Age': { name: 'Credit Age', value: creditAge.score, weight: FACTOR_WEIGHTS['Credit Age'], details: creditAge.details },
    'Recent Inquiries': { name: 'Recent Inquiries', value: inquiries.score, weight: FACTOR_WEIGHTS['Recent Inquiries'], details: inquiries.details },
    'Credit Mix': { name: 'Credit Mix', value: creditMix.score, weight: FACTOR_WEIGHTS['Credit Mix'], details: creditMix.details },
  };

  if (cards.length === 0) {
      return { score: 300, factors };
  }

  const weightedScore = Object.values(factors).reduce((sum, factor) => sum + factor.value * factor.weight, 0);

  // Scale the 0-100 score to the 300-900 range
  const finalScore = 300 + (weightedScore / 100) * 600;

  return { score: finalScore, factors };
}


// --- Insights Generation ---

export function generateInsights(factors: ScoreFactors): Insight[] {
    const insights: Insight[] = [];

    // Payment History
    if (factors['Payment History'].value < 100) {
        insights.push({
            text: "Late payments significantly hurt your score. Focus on paying every bill on time, every time.",
            priority: 'High'
        });
    } else {
         insights.push({
            text: "Excellent payment history! Keep up the great work.",
            priority: 'Low'
        });
    }

    // Utilization
    const utilizationValue = parseFloat(factors['Credit Utilization'].details.match(/(\d+)/)?.[0] || '0');
    if (utilizationValue > 30) {
        insights.push({
            text: `Your credit utilization is high at ${utilizationValue}%. Aim to keep it below 30% for a better score.`,
            priority: 'High'
        });
    }
    if (utilizationValue > 10 && utilizationValue <= 30) {
        insights.push({
            text: `Your utilization is good, but lowering it below 10% could improve your score further.`,
            priority: 'Medium'
        });
    }

    // Credit Age
    if (factors['Credit Age'].value < 70) {
        insights.push({
            text: "Your credit history is still young. Avoid closing your oldest credit cards to help increase the average age of your accounts over time.",
            priority: 'Medium'
        });
    }
    
    // Inquiries
    if (factors['Recent Inquiries'].value < 80) {
        insights.push({
            text: "You have a few recent credit applications. Avoid applying for new credit for a while to let your score recover.",
            priority: 'Medium'
        });
    }
    
    return insights;
}
