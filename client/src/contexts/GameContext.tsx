import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GameStatus =
  | 'draft'
  | 'pending'
  | 'active'
  | 'completed'
  | 'archived';
export type GamePhase =
  | 'focalTopic'
  | 'themeAssignment'
  | 'challengeCreation'
  | 'voting'
  | 'scoring'
  | 'reporting'
  | 'consolidation';

export interface Theme {
  id: string;
  name: string;
  nameAr: string;
  color: string;
  challengeCount: number;
}

export interface Challenge {
  id: string;
  themeId: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  createdBy: string;
  votes: number;
  impactScore?: number;
  probabilityScore?: number;
}

export interface FocalTopic {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  submittedBy: string;
  votes: number;
  isSelected: boolean;
}

export interface Game {
  id: string;
  code: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  focalIssue: string;
  focalIssueAr: string;
  status: GameStatus;
  phase: GamePhase;
  createdBy: string;
  department: string;
  themes: Theme[];
  participants: string[];
  focalTopics: FocalTopic[];
  challenges: Challenge[];
  startDate: string;
  endDate: string;
  createdAt: string;
  phaseDeadline?: string;
}

interface GameContextType {
  games: Game[];
  currentGame: Game | null;
  setCurrentGame: (game: Game | null) => void;
  createGame: (game: Partial<Game>) => Game;
  updateGame: (id: string, updates: Partial<Game>) => void;
  joinGame: (code: string) => Game | null;
  submitFocalTopic: (gameId: string, topic: Partial<FocalTopic>) => void;
  voteFocalTopic: (gameId: string, topicId: string) => void;
  selectFocalTopic: (gameId: string, topicId: string) => void;
  submitChallenge: (gameId: string, challenge: Partial<Challenge>) => void;
  voteChallenge: (gameId: string, challengeId: string) => void;
  scoreChallenge: (
    gameId: string,
    challengeId: string,
    impact: number,
    probability: number,
  ) => void;
  advancePhase: (gameId: string) => void;
}

const mockThemes: Theme[] = [
  {
    id: 't1',
    name: 'Technological',
    nameAr: 'تكنولوجي',
    color: '#05868E',
    challengeCount: 0,
  },
  {
    id: 't2',
    name: 'Security',
    nameAr: 'أمني',
    color: '#008556',
    challengeCount: 0,
  },
  {
    id: 't3',
    name: 'Social',
    nameAr: 'اجتماعي',
    color: '#00426A',
    challengeCount: 0,
  },
  {
    id: 't4',
    name: 'Economic',
    nameAr: 'اقتصادي',
    color: '#FFD700',
    challengeCount: 0,
  },
  {
    id: 't5',
    name: 'Environmental',
    nameAr: 'بيئي',
    color: '#26D07C',
    challengeCount: 0,
  },
  {
    id: 't6',
    name: 'Political',
    nameAr: 'سياسي',
    color: '#A60A3D',
    challengeCount: 0,
  },
];

const mockGames: Game[] = [
  {
    id: 'g1',
    code: 'SFG-2035-AI',
    title: 'Future Cybercrime Patterns in Dubai (2035)',
    titleAr: 'أنماط الجرائم الإلكترونية المستقبلية في دبي (2035)',
    description:
      'Exploring the evolution of AI-driven identity fraud and cybercrime patterns expected in Dubai by 2035.',
    descriptionAr:
      'استكشاف تطور عمليات الاحتيال في الهوية المدفوعة بالذكاء الاصطناعي وأنماط الجرائم الإلكترونية المتوقعة في دبي بحلول عام 2035.',
    focalIssue: 'Rise of AI-driven identity fraud',
    focalIssueAr: 'ارتفاع احتيال الهوية المدفوع بالذكاء الاصطناعي',
    status: 'active',
    phase: 'challengeCreation',
    createdBy: 'gm-001',
    department: 'Cybercrime Division',
    themes: mockThemes.slice(0, 3),
    participants: ['pt-001', 'pt-002', 'pt-003', 'pt-004', 'pt-005'],
    focalTopics: [
      {
        id: 'ft1',
        title: 'Identity hacking using synthetic avatars',
        titleAr: 'اختراق الهوية باستخدام الصور الرمزية الاصطناعية',
        description:
          'The use of AI-generated synthetic avatars to impersonate individuals',
        descriptionAr:
          'استخدام الصور الرمزية الاصطناعية المولدة بالذكاء الاصطناعي لانتحال شخصية الأفراد',
        submittedBy: 'pt-001',
        votes: 15,
        isSelected: true,
      },
    ],
    challenges: [
      {
        id: 'ch1',
        themeId: 't1',
        title: 'AI-generated police badge forgery',
        titleAr: 'تزوير شارات الشرطة بالذكاء الاصطناعي',
        description:
          'Creation of convincing fake police credentials using generative AI',
        descriptionAr:
          'إنشاء بيانات اعتماد شرطة مزيفة مقنعة باستخدام الذكاء الاصطناعي التوليدي',
        createdBy: 'pt-002',
        votes: 8,
        impactScore: 85,
        probabilityScore: 72,
      },
    ],
    startDate: '2026-01-15',
    endDate: '2026-03-15',
    createdAt: '2026-01-10',
    phaseDeadline: '2026-02-01',
  },
  {
    id: 'g2',
    code: 'SFG-2030-SM',
    title: 'Smart City Security Challenges',
    titleAr: 'تحديات أمن المدينة الذكية',
    description:
      'Identifying security vulnerabilities in Dubai smart city infrastructure.',
    descriptionAr:
      'تحديد نقاط الضعف الأمنية في البنية التحتية للمدينة الذكية في دبي.',
    focalIssue: 'IoT device vulnerabilities',
    focalIssueAr: 'نقاط ضعف أجهزة إنترنت الأشياء',
    status: 'pending',
    phase: 'focalTopic',
    createdBy: 'gm-001',
    department: 'Smart City Division',
    themes: mockThemes.slice(0, 4),
    participants: [],
    focalTopics: [],
    challenges: [],
    startDate: '2026-02-01',
    endDate: '2026-04-01',
    createdAt: '2026-01-20',
  },
  {
    id: 'g3',
    code: 'SFG-2040-DR',
    title: 'Drone Security Framework 2040',
    titleAr: 'إطار أمن الطائرات بدون طيار 2040',
    description:
      'Developing security protocols for autonomous drone operations.',
    descriptionAr:
      'تطوير بروتوكولات الأمان لعمليات الطائرات بدون طيار المستقلة.',
    focalIssue: 'Autonomous drone threats',
    focalIssueAr: 'تهديدات الطائرات بدون طيار المستقلة',
    status: 'completed',
    phase: 'consolidation',
    createdBy: 'gm-001',
    department: 'Aviation Security',
    themes: mockThemes.slice(0, 2),
    participants: ['pt-001', 'pt-002', 'pt-003'],
    focalTopics: [],
    challenges: [],
    startDate: '2023-10-01',
    endDate: '2023-12-15',
    createdAt: '2023-09-25',
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const generateCode = () => {
    const prefix = 'SFG';
    const year = new Date().getFullYear();
    const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${year}-${suffix}`;
  };

  const createGame = (gameData: Partial<Game>): Game => {
    const newGame: Game = {
      id: `g${games.length + 1}`,
      code: generateCode(),
      title: gameData.title || '',
      titleAr: gameData.titleAr || '',
      description: gameData.description || '',
      descriptionAr: gameData.descriptionAr || '',
      focalIssue: gameData.focalIssue || '',
      focalIssueAr: gameData.focalIssueAr || '',
      status: 'draft',
      phase: 'focalTopic',
      createdBy: gameData.createdBy || '',
      department: gameData.department || '',
      themes: gameData.themes || mockThemes.slice(0, 3),
      participants: [],
      focalTopics: [],
      challenges: [],
      startDate: gameData.startDate || new Date().toISOString().split('T')[0],
      endDate: gameData.endDate || '',
      createdAt: new Date().toISOString(),
    };
    setGames([...games, newGame]);
    return newGame;
  };

  const updateGame = (id: string, updates: Partial<Game>) => {
    setGames(games.map((g) => (g.id === id ? { ...g, ...updates } : g)));
    if (currentGame?.id === id) {
      setCurrentGame({ ...currentGame, ...updates });
    }
  };

  const joinGame = (code: string): Game | null => {
    const game = games.find((g) => g.code === code && g.status === 'active');
    if (game) {
      setCurrentGame(game);
      return game;
    }
    return null;
  };

  const submitFocalTopic = (gameId: string, topic: Partial<FocalTopic>) => {
    const newTopic: FocalTopic = {
      id: `ft${Date.now()}`,
      title: topic.title || '',
      titleAr: topic.titleAr || '',
      description: topic.description || '',
      descriptionAr: topic.descriptionAr || '',
      submittedBy: topic.submittedBy || '',
      votes: 0,
      isSelected: false,
    };
    updateGame(gameId, {
      focalTopics: [
        ...(games.find((g) => g.id === gameId)?.focalTopics || []),
        newTopic,
      ],
    });
  };

  const voteFocalTopic = (gameId: string, topicId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      updateGame(gameId, {
        focalTopics: game.focalTopics.map((t) =>
          t.id === topicId ? { ...t, votes: t.votes + 1 } : t,
        ),
      });
    }
  };

  const selectFocalTopic = (gameId: string, topicId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      updateGame(gameId, {
        focalTopics: game.focalTopics.map((t) => ({
          ...t,
          isSelected: t.id === topicId,
        })),
      });
    }
  };

  const submitChallenge = (gameId: string, challenge: Partial<Challenge>) => {
    const newChallenge: Challenge = {
      id: `ch${Date.now()}`,
      themeId: challenge.themeId || '',
      title: challenge.title || '',
      titleAr: challenge.titleAr || '',
      description: challenge.description || '',
      descriptionAr: challenge.descriptionAr || '',
      createdBy: challenge.createdBy || '',
      votes: 0,
    };
    const game = games.find((g) => g.id === gameId);
    if (game) {
      updateGame(gameId, {
        challenges: [...game.challenges, newChallenge],
        themes: game.themes.map((t) =>
          t.id === challenge.themeId
            ? { ...t, challengeCount: t.challengeCount + 1 }
            : t,
        ),
      });
    }
  };

  const voteChallenge = (gameId: string, challengeId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      updateGame(gameId, {
        challenges: game.challenges.map((c) =>
          c.id === challengeId ? { ...c, votes: c.votes + 1 } : c,
        ),
      });
    }
  };

  const scoreChallenge = (
    gameId: string,
    challengeId: string,
    impact: number,
    probability: number,
  ) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      updateGame(gameId, {
        challenges: game.challenges.map((c) =>
          c.id === challengeId
            ? { ...c, impactScore: impact, probabilityScore: probability }
            : c,
        ),
      });
    }
  };

  const phaseOrder: GamePhase[] = [
    'focalTopic',
    'themeAssignment',
    'challengeCreation',
    'voting',
    'scoring',
    'reporting',
    'consolidation',
  ];

  const advancePhase = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      const currentIndex = phaseOrder.indexOf(game.phase);
      if (currentIndex < phaseOrder.length - 1) {
        updateGame(gameId, { phase: phaseOrder[currentIndex + 1] });
      } else {
        updateGame(gameId, { status: 'completed' });
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        games,
        currentGame,
        setCurrentGame,
        createGame,
        updateGame,
        joinGame,
        submitFocalTopic,
        voteFocalTopic,
        selectFocalTopic,
        submitChallenge,
        voteChallenge,
        scoreChallenge,
        advancePhase,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
