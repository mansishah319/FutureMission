import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Badge {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  points: number;
  progress: number;
  target: number;
  completed: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  oderId: string;
  name: string;
  nameAr: string;
  points: number;
  badges: number;
  gamesPlayed: number;
  avatar?: string;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  xpToNextLevel: number;
  currentXp: number;
  gamesParticipated: number;
  topicsSubmitted: number;
  challengesCreated: number;
  votescast: number;
  badges: Badge[];
  achievements: Achievement[];
}

interface GamificationContextType {
  userStats: UserStats;
  leaderboard: LeaderboardEntry[];
  addPoints: (points: number, reason: string) => void;
  unlockBadge: (badgeId: string) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
  getLeaderboard: () => LeaderboardEntry[];
}

const defaultBadges: Badge[] = [
  {
    id: 'b1',
    name: 'First Steps',
    nameAr: 'الخطوات الأولى',
    description: 'Joined your first game',
    descriptionAr: 'انضممت للعبتك الأولى',
    icon: '🎯',
    rarity: 'common',
  },
  {
    id: 'b2',
    name: 'Visionary',
    nameAr: 'صاحب رؤية',
    description: 'Submitted 5 focal topics',
    descriptionAr: 'قدمت 5 مواضيع محورية',
    icon: '🔮',
    rarity: 'rare',
  },
  {
    id: 'b3',
    name: 'Challenge Master',
    nameAr: 'سيد التحديات',
    description: 'Created 10 challenges',
    descriptionAr: 'أنشأت 10 تحديات',
    icon: '⚡',
    rarity: 'epic',
  },
  {
    id: 'b4',
    name: 'Top Analyst',
    nameAr: 'أفضل محلل',
    description: 'Highest scorer in a game',
    descriptionAr: 'أعلى درجة في لعبة',
    icon: '🏆',
    rarity: 'legendary',
  },
  {
    id: 'b5',
    name: 'Voter',
    nameAr: 'المصوت',
    description: 'Cast 50 votes',
    descriptionAr: 'أدليت بـ50 صوت',
    icon: '🗳️',
    rarity: 'common',
  },
  {
    id: 'b6',
    name: 'Reporter',
    nameAr: 'المراسل',
    description: 'Submitted 3 reports',
    descriptionAr: 'قدمت 3 تقارير',
    icon: '📝',
    rarity: 'rare',
  },
];

const defaultAchievements: Achievement[] = [
  {
    id: 'a1',
    title: 'Getting Started',
    titleAr: 'البداية',
    description: 'Join your first game',
    descriptionAr: 'انضم للعبتك الأولى',
    points: 100,
    progress: 1,
    target: 1,
    completed: true,
  },
  {
    id: 'a2',
    title: 'Topic Creator',
    titleAr: 'منشئ المواضيع',
    description: 'Submit 5 focal topics',
    descriptionAr: 'قدم 5 مواضيع',
    points: 250,
    progress: 3,
    target: 5,
    completed: false,
  },
  {
    id: 'a3',
    title: 'Challenge Expert',
    titleAr: 'خبير التحديات',
    description: 'Create 10 challenges',
    descriptionAr: 'أنشئ 10 تحديات',
    points: 500,
    progress: 7,
    target: 10,
    completed: false,
  },
  {
    id: 'a4',
    title: 'Active Voter',
    titleAr: 'المصوت النشط',
    description: 'Cast 50 votes',
    descriptionAr: 'أدلِ بـ50 صوت',
    points: 300,
    progress: 23,
    target: 50,
    completed: false,
  },
  {
    id: 'a5',
    title: 'Game Veteran',
    titleAr: 'محترف اللعبة',
    description: 'Complete 5 games',
    descriptionAr: 'أكمل 5 ألعاب',
    points: 1000,
    progress: 2,
    target: 5,
    completed: false,
  },
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    oderId: 'pt-001',
    name: 'Ahmed Al Mansouri',
    nameAr: 'أحمد المنصوري',
    points: 4520,
    badges: 8,
    gamesPlayed: 12,
  },
  {
    rank: 2,
    oderId: 'pt-002',
    name: 'Fatima Al Hashimi',
    nameAr: 'فاطمة الهاشمي',
    points: 3890,
    badges: 6,
    gamesPlayed: 10,
  },
  {
    rank: 3,
    oderId: 'pt-003',
    name: 'Khalid Al Rashid',
    nameAr: 'خالد الراشد',
    points: 3450,
    badges: 5,
    gamesPlayed: 9,
  },
  {
    rank: 4,
    oderId: 'pt-004',
    name: 'Sara Al Maktoum',
    nameAr: 'سارة المكتوم',
    points: 2980,
    badges: 4,
    gamesPlayed: 8,
  },
  {
    rank: 5,
    oderId: 'pt-005',
    name: 'Omar Al Suwaidi',
    nameAr: 'عمر السويدي',
    points: 2340,
    badges: 3,
    gamesPlayed: 7,
  },
  {
    rank: 6,
    oderId: 'pt-006',
    name: 'Layla Al Nuaimi',
    nameAr: 'ليلى النعيمي',
    points: 1890,
    badges: 3,
    gamesPlayed: 6,
  },
  {
    rank: 7,
    oderId: 'pt-007',
    name: 'Yousef Al Ketbi',
    nameAr: 'يوسف الكتبي',
    points: 1560,
    badges: 2,
    gamesPlayed: 5,
  },
  {
    rank: 8,
    oderId: 'pt-008',
    name: 'Mariam Al Shamsi',
    nameAr: 'مريم الشامسي',
    points: 1230,
    badges: 2,
    gamesPlayed: 4,
  },
];

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined,
);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 2340,
    level: 5,
    xpToNextLevel: 500,
    currentXp: 340,
    gamesParticipated: 7,
    topicsSubmitted: 12,
    challengesCreated: 18,
    votescast: 45,
    badges: defaultBadges
      .slice(0, 3)
      .map((b) => ({ ...b, unlockedAt: '2026-01-15' })),
    achievements: defaultAchievements,
  });

  const [leaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);

  const addPoints = (points: number, reason: string) => {
    setUserStats((prev) => {
      const newXp = prev.currentXp + points;
      const levelUp = newXp >= prev.xpToNextLevel;

      if (levelUp) {
        toast.success(`Level Up! You are now level ${prev.level + 1}!`, {
          icon: '🎉',
          duration: 5000,
        });
      }

      toast.success(`+${points} points: ${reason}`, {
        icon: '⭐',
      });

      return {
        ...prev,
        totalPoints: prev.totalPoints + points,
        currentXp: levelUp ? newXp - prev.xpToNextLevel : newXp,
        level: levelUp ? prev.level + 1 : prev.level,
        xpToNextLevel: levelUp
          ? Math.floor(prev.xpToNextLevel * 1.5)
          : prev.xpToNextLevel,
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    const badge = defaultBadges.find((b) => b.id === badgeId);
    if (badge && !userStats.badges.find((b) => b.id === badgeId)) {
      setUserStats((prev) => ({
        ...prev,
        badges: [
          ...prev.badges,
          { ...badge, unlockedAt: new Date().toISOString() },
        ],
      }));
      toast.success(`Badge Unlocked: ${badge.name}!`, {
        icon: badge.icon,
        duration: 5000,
      });
    }
  };

  const updateAchievementProgress = (
    achievementId: string,
    progress: number,
  ) => {
    setUserStats((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => {
        if (a.id === achievementId) {
          const newProgress = Math.min(a.progress + progress, a.target);
          const justCompleted = newProgress >= a.target && !a.completed;

          if (justCompleted) {
            toast.success(`Achievement Unlocked: ${a.title}!`, {
              icon: '🏆',
              duration: 5000,
            });
            addPoints(a.points, `Achievement: ${a.title}`);
          }

          return {
            ...a,
            progress: newProgress,
            completed: newProgress >= a.target,
          };
        }
        return a;
      }),
    }));
  };

  const getLeaderboard = () => leaderboard;

  return (
    <GamificationContext.Provider
      value={{
        userStats,
        leaderboard,
        addPoints,
        unlockBadge,
        updateAchievementProgress,
        getLeaderboard,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error(
      'useGamification must be used within a GamificationProvider',
    );
  }
  return context;
}
