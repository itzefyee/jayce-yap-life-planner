export const profile = {
  name: 'Jayce Yap Zi Wen',
  shortName: 'Jayce Yap',
  phone: '+60 14-611 3822',
  whatsapp: '60146113822',
  country: 'Malaysia',
};

export const whatsappUrl = (message: string) =>
  `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`;
export const helloUrl = whatsappUrl(
  "Hi Jayce, I'd like to understand my insurance options. Could we have a conversation?",
);

export const coverage = [
  {
    id: 'medical',
    label: 'Medical protection',
    short: 'Your health',
    title: 'Care for your health.\nProtect your savings.',
    description:
      'A medical plan helps with eligible hospital and treatment costs. The details matter: your annual limit, room entitlement, deductible, co-payment, and exclusions.',
    question: 'If I needed treatment tomorrow, what would I pay myself?',
    points: [
      'Understand your medical card',
      'Look beyond the annual limit',
      'Review employer and personal cover',
    ],
    source: 'https://www.aia.com.my/en/our-products/health-protection/medical-protection.html',
    color: '#697865',
  },
  {
    id: 'critical',
    label: 'Critical illness',
    short: 'Your recovery',
    title: 'Space to recover.\nRoom to breathe.',
    description:
      'A covered critical illness can affect more than medical bills. A lump-sum benefit may help with everyday costs during recovery, subject to your policy terms.',
    question: 'How would my everyday commitments be managed while I recover?',
    points: [
      'Separate treatment costs from living costs',
      'Understand covered illness definitions',
      'Check waiting periods and exclusions',
    ],
    source:
      'https://www.aia.com.my/en/our-products/health-protection/critical-illness-protection.html',
    color: '#a1253b',
  },
  {
    id: 'family',
    label: 'Life & family',
    short: 'Your people',
    title: 'Because their future\nis part of yours.',
    description:
      'Life protection can help support the people who depend on you if a covered event happens. A useful review starts with your responsibilities, existing cover, and budget.',
    question: 'Who depends on my income, and what would they need without it?',
    points: [
      'Map your financial responsibilities',
      'Review existing life benefits',
      'Keep nominations up to date',
    ],
    source: 'https://www.aia.com.my/en/help-support/faq/insurance-takaful-plans.html',
    color: '#987247',
  },
  {
    id: 'review',
    label: 'Policy review',
    short: 'Your next chapter',
    title: 'A fresh look at\nwhat you already have.',
    description:
      'New job, new home, growing family? Your existing policies deserve a closer look before you add anything. We can organise the details and identify questions worth asking.',
    question: 'Does my current protection still fit the life I have today?',
    points: [
      'Make sense of existing policies',
      'Spot possible overlaps and gaps',
      'Discuss a budget you can sustain',
    ],
    source: 'https://www.aia.com.my/en/help-support/faq/insurance-takaful-plans.html',
    color: '#78684e',
  },
];

export const articles = [
  {
    title: 'A medical card isn’t the whole picture.',
    category: 'THE BASICS',
    time: '2 MIN READ',
    image: '/images/journal-health.webp',
    alt: 'Sunlight falling through a green forest',
    intro: 'Treatment costs and everyday commitments are two different conversations.',
    paragraphs: [
      'Medical protection helps with eligible treatment and hospital costs, subject to limits and policy terms. Critical illness protection can pay a lump sum when a covered illness meets the policy definition.',
      'Start by listing what your medical plan covers and what you might still need to pay. Then think about the expenses that continue during recovery, such as household bills and family commitments.',
      'The useful question is not simply whether you have a medical card. It is whether you understand each part of your protection, including exclusions, deductibles, co-payments, and waiting periods.',
    ],
    source:
      'https://www.aia.com.my/en/our-products/health-protection/critical-illness-protection.html',
  },
  {
    title: 'New chapter? Give your cover a fresh look.',
    category: 'LIFE & MONEY',
    time: '2 MIN READ',
    image: '/images/journal-life.webp',
    alt: 'A warm sunlit home with natural furnishings',
    intro: 'Your protection deserves a place on your life-admin list.',
    paragraphs: [
      'A change in your responsibilities is a good prompt to review your existing cover. Starting a family, changing jobs, or taking on a home loan may change the questions you need to ask.',
      'Bring your latest policy summaries and any employer benefit information. It helps to separate the protection you own personally from benefits linked to your current job.',
      'A review does not automatically mean buying more. It is an opportunity to understand what you have, discuss affordability, and decide whether anything needs attention.',
    ],
    source: 'https://www.aia.com.my/en/help-support/faq/insurance-takaful-plans.html',
  },
  {
    title: 'Your first insurance conversation, simplified.',
    category: 'GETTING STARTED',
    time: '2 MIN READ',
    image: '/images/journal-notes.webp',
    alt: 'A fountain pen resting on handwritten notes',
    intro: 'You do not need to know the jargon before you begin.',
    paragraphs: [
      'Start with three things: who depends on you, what you already have, and what you can comfortably set aside. Those details make the conversation more useful than starting with a product name.',
      'Ask how a benefit is paid, when it does not apply, and whether premiums can change. Request the relevant product disclosure sheet and policy wording before making a decision.',
      'Take your time to understand the explanation. Your needs, circumstances, eligibility, and the policy terms should guide any recommendation.',
    ],
    source: 'https://www.aia.com.my/en/help-support/faq/insurance-takaful-plans.html',
  },
];

export const faqs = [
  {
    q: 'Do I need to know what insurance I want first?',
    a: 'Not at all. We can start with your current responsibilities, what you already have, and the questions on your mind. You do not need a product shortlist or any insurance knowledge to begin.',
  },
  {
    q: 'Can we review policies I already have?',
    a: 'Yes. Bring your latest policy summaries and employer benefits information to the conversation. We can work through what the documents say and identify questions to clarify with the relevant insurer. Do not cancel existing cover before understanding the consequences and any replacement terms.',
  },
  {
    q: 'How much insurance do I actually need?',
    a: 'There is no single number that fits everyone. Your dependants, commitments, existing cover, savings, health, and budget all matter. The planning check on this page helps you prepare questions; a personalised assessment is needed before any recommendation.',
  },
  {
    q: 'What happens in our first conversation?',
    a: 'We will talk about your priorities and questions, take a look at your existing protection if you have it, and agree on useful next steps. The consultation request lets you suggest a preferred date and format. Jayce will confirm the arrangements with you on WhatsApp.',
  },
  {
    q: 'Can we meet online?',
    a: 'You can request an online conversation or a phone call. If you prefer an in-person meeting in Malaysia, choose that option and Jayce will discuss a suitable location and time with you.',
  },
];
