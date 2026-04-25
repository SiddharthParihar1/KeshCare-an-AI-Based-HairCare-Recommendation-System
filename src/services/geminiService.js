import {
  HAIR_PROBLEMS,
  HAIR_TYPES,
  HAIR_TEXTURES,
  LIFESTYLE_FACTORS,
  SCALP_CONDITIONS,
  WASH_FREQUENCIES,
  WATER_TYPES,
} from '../constants/hairData';

function mapLabel(collection, id, fallback = 'Not specified') {
  return collection.find((item) => item.id === id)?.label || fallback;
}

function mapLabels(collection, ids = []) {
  return ids.map((id) => mapLabel(collection, id, id));
}

function getPrimaryConcern(profile) {
  if (profile.problems?.includes('hair_fall') || profile.problems?.includes('thinning')) {
    return 'Hair fall and root weakness';
  }

  if (profile.problems?.includes('dandruff') || profile.scalpCondition === 'dandruff') {
    return 'Scalp imbalance and dandruff recurrence';
  }

  if (profile.problems?.includes('dryness') || profile.problems?.includes('split_ends')) {
    return 'Dryness, rough texture, and breakage';
  }

  if (profile.problems?.includes('oiliness') || profile.scalpCondition === 'oily') {
    return 'Excess oil and scalp buildup';
  }

  return 'Scalp and strand balance';
}

function buildWeeklySchedule(profile) {
  const washFrequency = mapLabel(WASH_FREQUENCIES, profile.washFrequency, '2-3x Per Week');
  const waterType = mapLabel(WATER_TYPES, profile.waterType, 'Not Sure').toLowerCase();

  return [
    {
      day: 'Monday',
      morning: 'Apply warm bhringraj-coconut oil to scalp for 8 minutes. Keep for 60-90 minutes before wash.',
      evening: 'After wash, air-dry 80% and apply 2-3 drops lightweight serum on ends only.',
    },
    {
      day: 'Tuesday',
      morning: 'No wash day. Gentle scalp stimulation massage for 3 minutes using fingertips (no nails).',
      evening: 'Protective hairstyle (loose braid). Sleep on cotton or satin pillowcase.',
    },
    {
      day: 'Wednesday',
      morning: 'Use the scalp mask (neem/amla + aloe + curd) for 20 minutes, then rinse with lukewarm water.',
      evening: 'Hydration check: if ends feel dry, apply 3 drops aloe-based leave-in on mid-lengths to ends.',
    },
    {
      day: 'Thursday',
      morning: `No treatment day. Keep scalp dry and clean. If you use ${waterType} water, finish with filtered water rinse.`,
      evening: 'Eat one high-protein dinner (dal/paneer/eggs) plus leafy greens to support keratin cycle.',
    },
    {
      day: 'Friday',
      morning: 'Herbal rinse day (diluted ACV or rosemary water) after cleansing. Leave 2 minutes and rinse lightly.',
      evening: 'Avoid heat styling. Detangle with wide-tooth comb from ends upward.',
    },
    {
      day: 'Saturday',
      morning: 'Optional mini oiling (1 teaspoon total) only on dry areas. Keep for 45 minutes, then mild cleanse if needed.',
      evening: 'Scalp reset: check flakes, oil level, itching. Note changes in a weekly hair log.',
    },
    {
      day: 'Sunday',
      morning: `Recovery day. Follow your normal wash rhythm (${washFrequency}) and avoid over-washing.`,
      evening: 'Prepare ingredients for next week and trim split ends every 8-10 weeks.',
    },
  ];
}

function buildHardcodedPlan(profile) {
  const hairType = mapLabel(HAIR_TYPES, profile.hairType, 'your hair type');
  const hairTexture = mapLabel(HAIR_TEXTURES, profile.hairTexture, 'your texture');
  const scalp = mapLabel(SCALP_CONDITIONS, profile.scalpCondition, 'your scalp profile');
  const problems = mapLabels(HAIR_PROBLEMS, profile.problems);
  const lifestyle = mapLabels(LIFESTYLE_FACTORS, profile.lifestyle);
  const concern = getPrimaryConcern(profile);

  const hasHairFall = profile.problems?.includes('hair_fall') || profile.problems?.includes('thinning');
  const hasDandruff = profile.problems?.includes('dandruff') || profile.scalpCondition === 'dandruff';
  const hasDryness = profile.problems?.includes('dryness') || profile.problems?.includes('split_ends');
  const hasOiliness = profile.problems?.includes('oiliness') || profile.scalpCondition === 'oily';

  return {
    summary: `Based on your profile (${hairType}, ${hairTexture}, ${scalp}), the current pattern shows that your scalp barrier and strand strength need structured weekly care. Your top reported concerns (${problems.length ? problems.join(', ') : 'general maintenance'}) are often worsened by lifestyle factors like ${lifestyle.length ? lifestyle.join(', ') : 'daily stress and routine inconsistency'}. This plan is intentionally detailed and repeatable so you can follow it without guesswork and start tracking visible improvements in 3-4 weeks.`,
    primaryConcern: concern,
    tips: [
      'Keep wash days fixed each week instead of changing daily; consistency improves scalp recovery.',
      'Use lukewarm water only. Hot water increases frizz, dryness, and post-wash oil rebound.',
      'Do not scratch scalp with nails; use fingertip pressure for 2-3 minutes to improve circulation safely.',
      'Apply products in this order: scalp treatment -> cleanse -> rinse -> leave-in on lengths only.',
      'Take progress photos every Sunday under the same lighting to measure shedding and density changes objectively.',
    ],
    remedies: [
      {
        id: 1,
        name: hasOiliness || hasDandruff ? 'Neem-Aloe Scalp Clarifying Mask' : 'Amla-Aloe Root Nourishing Mask',
        category: 'Hair Mask',
        targetProblems: hasOiliness || hasDandruff ? ['dandruff', 'oiliness', 'itchiness'] : ['dryness', 'split_ends', 'frizz'],
        difficulty: 'Easy',
        frequency: 'Twice weekly (Wednesday and Sunday)',
        prepTime: '10-12 minutes',
        resultTimeline: 'Visible scalp comfort in 2-3 weeks; texture gains in 4 weeks',
        ingredients: [
          { name: hasOiliness || hasDandruff ? 'Neem powder' : 'Amla powder', quantity: '2 tablespoons', role: hasOiliness || hasDandruff ? 'Helps reduce scalp buildup and flaking tendency' : 'Supports stronger-looking roots and shine' },
          { name: 'Fresh aloe vera gel', quantity: '3 tablespoons', role: 'Calms irritation and hydrates scalp barrier' },
          { name: 'Curd', quantity: '2 tablespoons', role: 'Adds mild lactic conditioning for scalp and roots' },
          { name: 'Water', quantity: '1-2 tablespoons (as needed)', role: 'Adjusts consistency for easy even application' },
        ],
        instructions: [
          { step: 1, action: 'Mix all ingredients in a non-metal bowl until smooth and lump-free.' },
          { step: 2, action: 'Part hair in sections and apply directly to scalp first, then remaining paste on roots.' },
          { step: 3, action: 'Leave for 20 minutes only (do not let it fully dry and crack).' },
          { step: 4, action: 'Rinse with lukewarm water and cleanse once with a mild sulfate-free shampoo.' },
        ],
        benefits: [
          'Reduces recurrence of flakes and greasy scalp patches',
          'Improves root freshness and decreases scalp irritation',
        ],
        warnings: ['Patch test on inner arm 24 hours before first use, especially for sensitive skin.'],
        ayurvedicBasis: 'Neem and amla are classic Ayurvedic scalp herbs used for balancing kapha accumulation and supporting healthier follicles. Aloe helps soothe pitta irritation and maintain scalp hydration without adding heavy residue.',
      },
      {
        id: 2,
        name: hasHairFall ? 'Bhringraj-Methi Strengthening Oil Protocol' : 'Coconut-Hibiscus Repair Oil Protocol',
        category: 'Oil Treatment',
        targetProblems: hasHairFall ? ['hair_fall', 'thinning', 'slow_growth'] : ['dryness', 'frizz', 'breakage'],
        difficulty: 'Medium',
        frequency: '1-2 times weekly (Monday and Saturday)',
        prepTime: '15 minutes',
        resultTimeline: 'Less shedding in 4-6 weeks with consistent use',
        ingredients: [
          { name: hasHairFall ? 'Bhringraj oil' : 'Cold-pressed coconut oil', quantity: '2 tablespoons', role: 'Primary scalp nourishment base' },
          { name: 'Fenugreek seeds', quantity: '1 teaspoon, lightly crushed', role: 'Supports slip and reduces breakage while combing' },
          { name: hasHairFall ? 'Coconut oil' : 'Hibiscus petals', quantity: '1 tablespoon / 4 petals', role: hasHairFall ? 'Balances oil potency for regular use' : 'Supports smoother strands and moisture retention' },
        ],
        instructions: [
          { step: 1, action: 'Warm oil on very low heat for 20-30 seconds; it should be lukewarm, never hot.' },
          { step: 2, action: 'Apply with fingertips section-wise, then massage gently for 8 minutes.' },
          { step: 3, action: 'Leave for 60-90 minutes before wash. For oily scalp, avoid overnight oiling.' },
          { step: 4, action: 'Wash with diluted shampoo (1 part shampoo + 2 parts water) to avoid over-stripping.' },
        ],
        benefits: [
          'Improves scalp circulation and root conditioning',
          'Reduces friction-related breakage and roughness',
        ],
        warnings: ['Skip oiling on active scalp infection, open wounds, or severe inflammatory flare-ups.'],
        ayurvedicBasis: 'Bhringraj is traditionally used as a keshya dravya (hair-supportive herb) in Ayurveda. Combined with a stable carrier oil, it supports scalp conditioning and helps maintain healthier follicular function over time.',
      },
      {
        id: 3,
        name: hasDandruff ? 'Diluted ACV Scalp Rebalancing Rinse' : 'Rosemary-Mint Freshness Rinse',
        category: 'Herbal Rinse',
        targetProblems: hasDandruff ? ['dandruff', 'itching', 'oiliness'] : ['frizz', 'dullness', 'slow_growth'],
        difficulty: 'Easy',
        frequency: 'Once weekly (Friday)',
        prepTime: '5-7 minutes',
        resultTimeline: 'Scalp freshness in 1-2 weeks',
        ingredients: [
          { name: hasDandruff ? 'Apple cider vinegar' : 'Dried rosemary leaves', quantity: hasDandruff ? '1 tablespoon' : '1 tablespoon', role: hasDandruff ? 'Helps reduce residue and rebalance scalp surface' : 'Supports scalp refresh and shine' },
          { name: 'Water', quantity: '1 cup', role: 'Ensures safe dilution for scalp application' },
          { name: 'Mint leaves (optional)', quantity: '4-5 leaves', role: 'Adds cooling comfort for itchy scalp' },
        ],
        instructions: [
          { step: 1, action: 'Prepare and cool the rinse fully before applying.' },
          { step: 2, action: 'After shampoo, pour slowly over scalp and lengths.' },
          { step: 3, action: 'Leave for 2 minutes and rinse lightly (or leave in if scalp tolerates).' },
        ],
        benefits: [
          'Improves post-wash scalp cleanliness without harsh chemicals',
          'Makes hair feel lighter and easier to manage',
        ],
        warnings: ['Never use undiluted vinegar directly on scalp. Stop if burning occurs.'],
        ayurvedicBasis: 'Mild herbal and acidic rinses help maintain scalp cleanliness and reduce sticky buildup that can obstruct follicles. This supports a healthier scalp microenvironment and better hair manageability.',
      },
      {
        id: 4,
        name: 'Daily Nutrition and Recovery Plan',
        category: 'Dietary',
        targetProblems: ['hair_fall', 'slow_growth', 'thinning', 'dryness'],
        difficulty: 'Easy',
        frequency: 'Daily',
        prepTime: '0 minutes',
        resultTimeline: 'Early changes in 4 weeks, stronger progress by 8-10 weeks',
        ingredients: [
          { name: 'Protein source', quantity: '1 serving every meal', role: 'Provides amino acids for keratin synthesis' },
          { name: 'Iron-rich foods', quantity: '1 serving daily', role: 'Supports oxygen supply to follicles' },
          { name: 'Seeds and nuts', quantity: '1-2 tablespoons daily', role: 'Adds zinc, vitamin E, and healthy fats' },
          { name: 'Hydration', quantity: '2-2.5 liters water daily', role: 'Improves scalp moisture balance and nutrient transport' },
        ],
        instructions: [
          { step: 1, action: 'Build each meal plate with protein + greens + healthy fat source.' },
          { step: 2, action: 'Keep one fixed bedtime target to improve hormonal and recovery support for follicles.' },
          { step: 3, action: 'Track consistency daily, not perfection; 80% adherence gives measurable outcomes.' },
        ],
        benefits: [
          'Builds stronger internal support for hair growth cycle',
          'Improves resilience against stress-related shedding',
        ],
        warnings: ['If you have medical deficiencies or thyroid/PCOS concerns, consult a doctor for blood work.'],
        ayurvedicBasis: 'Ayurveda emphasizes ahara (nutrition), nidra (sleep), and stress regulation as core pillars of hair health. Internal nourishment and routine stability are essential for durable long-term improvement.',
      },
      {
        id: 5,
        name: 'Damage-Control Styling Routine',
        category: 'Hair Mask',
        targetProblems: ['frizz', 'split_ends', 'breakage'],
        difficulty: 'Easy',
        frequency: 'Daily micro-routine',
        prepTime: '3-5 minutes',
        resultTimeline: 'Less frizz and breakage in 2-3 weeks',
        ingredients: [
          { name: 'Wide-tooth comb', quantity: '1', role: 'Reduces mechanical breakage during detangling' },
          { name: 'Microfiber towel / cotton T-shirt', quantity: '1', role: 'Reduces friction while drying' },
          { name: 'Leave-in conditioner', quantity: '2-3 pea-sized amounts', role: 'Protects cuticle and reduces roughness' },
        ],
        instructions: [
          { step: 1, action: 'Detangle only when damp with leave-in; start from ends and move upward.' },
          { step: 2, action: 'Avoid high heat; if needed, use coolest effective setting and heat protectant.' },
          { step: 3, action: 'Use loose braid or low-tension style before bed to prevent overnight tangles.' },
        ],
        benefits: [
          'Directly reduces day-to-day breakage triggers',
          'Maintains smoother texture between treatment days',
        ],
        warnings: ['Avoid tight ponytails and rubber bands that create repeated tension points.'],
        ayurvedicBasis: 'In practical Ayurvedic care, preserving the integrity of the hair shaft is as important as nourishing the scalp. Gentle handling lowers vata aggravation associated with dryness and brittleness.',
      },
    ],
    dietaryAdvice: 'Prioritize eggs/paneer/dal/chickpeas for protein, spinach and beetroot for iron, pumpkin and sesame seeds for zinc, and walnuts/flax for omega-3 fats. Add one vitamin C source daily (amla, lemon, orange) to improve iron absorption. Keep caffeine moderate and avoid meal skipping if shedding is active.',
    avoidList: [
      'Frequent sulfate-heavy shampoos and high-fragrance products that can irritate scalp barrier.',
      'Hot-water washes, aggressive towel rubbing, and daily heat styling without protection.',
      'Very tight hairstyles and wet-hair combing with fine brushes, which increase tension breakage.',
      'Inconsistent sleep and prolonged unmanaged stress, which can worsen shedding cycles.',
    ],
    weeklySchedule: buildWeeklySchedule(profile),
    followUpIn: '6 weeks',
  };
}

export async function getHaircareRecommendations(userProfile) {
  return buildHardcodedPlan(userProfile);
}
