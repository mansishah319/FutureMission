import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TourStep {
  id: string;
  target: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface TourContextType {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: () => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  hasSeenTour: boolean;
  markTourAsSeen: () => void;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    target: '[data-tour="welcome"]',
    title: 'Welcome to Strategic Foresight Game',
    titleAr: 'مرحباً بك في لعبة الاستشراف الاستراتيجي',
    content: 'This platform helps Dubai Police explore future scenarios through collaborative gameplay. Let\'s take a quick tour!',
    contentAr: 'تساعد هذه المنصة شرطة دبي على استكشاف السيناريوهات المستقبلية من خلال اللعب التعاوني. دعنا نأخذ جولة سريعة!',
    placement: 'bottom',
  },
  {
    id: 'dashboard',
    target: '[data-tour="dashboard"]',
    title: 'Your Dashboard',
    titleAr: 'لوحة التحكم الخاصة بك',
    content: 'View active games, your statistics, and quick actions from here. Monitor all game activities in real-time.',
    contentAr: 'عرض الألعاب النشطة وإحصائياتك والإجراءات السريعة من هنا. راقب جميع أنشطة اللعبة في الوقت الفعلي.',
    placement: 'bottom',
  },
  {
    id: 'create-game',
    target: '[data-tour="create-game"]',
    title: 'Create a New Game',
    titleAr: 'إنشاء لعبة جديدة',
    content: 'Game Masters can create new foresight games here. Define focal issues, themes, and invite participants.',
    contentAr: 'يمكن لمديري الألعاب إنشاء ألعاب استشرافية جديدة هنا. حدد القضايا المحورية والمحاور وادعو المشاركين.',
    placement: 'right',
  },
  {
    id: 'games-list',
    target: '[data-tour="games-list"]',
    title: 'Active Games',
    titleAr: 'الألعاب النشطة',
    content: 'See all ongoing games, their status, and progress. Click any game to view details or participate.',
    contentAr: 'شاهد جميع الألعاب الجارية وحالتها وتقدمها. انقر على أي لعبة لعرض التفاصيل أو المشاركة.',
    placement: 'left',
  },
  {
    id: 'game-phases',
    target: '[data-tour="game-phases"]',
    title: 'Game Phases',
    titleAr: 'مراحل اللعبة',
    content: 'Each game progresses through phases: Focal Topics → Theme Assignment → Challenges → Voting → Scoring → Reporting.',
    contentAr: 'تتقدم كل لعبة عبر مراحل: الموضوعات المحورية ← تعيين المحاور ← التحديات ← التصويت ← التقييم ← التقارير.',
    placement: 'bottom',
  },
  {
    id: 'submit-topic',
    target: '[data-tour="submit-topic"]',
    title: 'Submit Focal Topics',
    titleAr: 'إرسال الموضوعات المحورية',
    content: 'Participants propose focal topics related to the game\'s central issue. The best topics are voted on.',
    contentAr: 'يقترح المشاركون موضوعات محورية متعلقة بالقضية المركزية للعبة. يتم التصويت على أفضل الموضوعات.',
    placement: 'right',
  },
  {
    id: 'voting',
    target: '[data-tour="voting"]',
    title: 'Voting System',
    titleAr: 'نظام التصويت',
    content: 'Vote on topics and challenges. Your votes help identify the most impactful scenarios for analysis.',
    contentAr: 'صوت على الموضوعات والتحديات. تساعد أصواتك في تحديد السيناريوهات الأكثر تأثيراً للتحليل.',
    placement: 'left',
  },
  {
    id: 'scoring',
    target: '[data-tour="scoring"]',
    title: 'Impact & Probability Scoring',
    titleAr: 'تقييم التأثير والاحتمالية',
    content: 'Rate challenges based on their potential impact and probability of occurrence. This data drives strategic insights.',
    contentAr: 'قيم التحديات بناءً على تأثيرها المحتمل واحتمالية حدوثها. تدفع هذه البيانات الرؤى الاستراتيجية.',
    placement: 'top',
  },
  {
    id: 'reports',
    target: '[data-tour="reports"]',
    title: 'Final Reports',
    titleAr: 'التقارير النهائية',
    content: 'Game Masters consolidate findings into comprehensive reports. Admins review and approve for publication.',
    contentAr: 'يجمع مديرو الألعاب النتائج في تقارير شاملة. يراجع المسؤولون ويوافقون على النشر.',
    placement: 'bottom',
  },
  {
    id: 'complete',
    target: '[data-tour="complete"]',
    title: 'You\'re Ready!',
    titleAr: 'أنت جاهز!',
    content: 'You now understand the basics. Start exploring games or create your first scenario. Good luck, Futurist!',
    contentAr: 'أنت الآن تفهم الأساسيات. ابدأ في استكشاف الألعاب أو أنشئ السيناريو الأول الخاص بك. حظاً سعيداً، أيها المستقبلي!',
    placement: 'bottom',
  },
];

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    return localStorage.getItem('sfg-tour-seen') === 'true';
  });

  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < tourSteps.length) {
      setCurrentStep(step);
    }
  };

  const markTourAsSeen = () => {
    setHasSeenTour(true);
    localStorage.setItem('sfg-tour-seen', 'true');
  };

  return (
    <TourContext.Provider value={{
      isActive,
      currentStep,
      steps: tourSteps,
      startTour,
      endTour,
      nextStep,
      prevStep,
      goToStep,
      hasSeenTour,
      markTourAsSeen,
    }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
