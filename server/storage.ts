import {
  type User,
  type InsertUser,
  type Game,
  type InsertGame,
  type Challenge,
  type InsertChallenge,
  type ChallengeVote,
  type InsertChallengeVote,
  type PlayerReport,
  type InsertPlayerReport,
  type ConsolidatedReport,
  type InsertConsolidatedReport,
  type GameParticipant,
  type InsertGameParticipant,
  type ThemeScore,
  type LeaderboardEntry,
  type FocalIssue,
  type InsertFocalIssue,
  type FocalIssueVote,
  type InsertFocalIssueVote,
  type KeyEventReport,
  type InsertKeyEventReport,
  type GameHistory,
  type PlayerStats,
  type Retreat,
  type InsertRetreat,
  type RetreatTable,
  type InsertRetreatTable,
  type RetreatTableEntry,
  type InsertRetreatTableEntry,
  type RetreatEntryVote,
  type InsertRetreatEntryVote,
  type RetreatParticipant,
  type InsertRetreatParticipant,
  type RetreatTableReport,
  type InsertRetreatTableReport,
  type RetreatConsolidatedReport,
  type InsertRetreatConsolidatedReport,
  type RetreatEntryScored,
  type RetreatStageProgress,
  type InsertRetreatStageProgress,
  type RetreatStageSubmission,
  type InsertRetreatStageSubmission,
  type RetreatStageConsolidation,
  type InsertRetreatStageConsolidation,
  type RetreatConsolidationVote,
  type InsertRetreatConsolidationVote,
  type RetreatStageReport,
  type InsertRetreatStageReport,
  THEMES,
} from '@shared/schema';
import { randomUUID } from 'crypto';

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUsersByDepartment(department: string): Promise<User[]>;
  updateUserPoints(userId: string, points: number): Promise<User | undefined>;

  createGame(game: InsertGame): Promise<Game>;
  getGame(id: string): Promise<Game | undefined>;
  updateGame(id: string, updates: Partial<Game>): Promise<Game | undefined>;
  getAllGames(): Promise<Game[]>;
  getGamesByStatus(status: string): Promise<Game[]>;

  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  getChallenge(id: string): Promise<Challenge | undefined>;
  getChallengesByGame(gameId: string): Promise<Challenge[]>;
  getChallengesByGameAndTheme(
    gameId: string,
    theme: string,
  ): Promise<Challenge[]>;
  updateChallengeStatus(
    id: string,
    status: string,
  ): Promise<Challenge | undefined>;

  createVote(vote: InsertChallengeVote): Promise<ChallengeVote>;
  getVotesByChallenge(challengeId: string): Promise<ChallengeVote[]>;
  getVotesByGame(gameId: string): Promise<ChallengeVote[]>;
  getThemeScores(gameId: string): Promise<ThemeScore[]>;

  createPlayerReport(report: InsertPlayerReport): Promise<PlayerReport>;
  getPlayerReport(id: string): Promise<PlayerReport | undefined>;
  getPlayerReportsByGame(gameId: string): Promise<PlayerReport[]>;

  createConsolidatedReport(
    report: InsertConsolidatedReport,
  ): Promise<ConsolidatedReport>;
  getConsolidatedReport(id: string): Promise<ConsolidatedReport | undefined>;
  getConsolidatedReportByGame(
    gameId: string,
  ): Promise<ConsolidatedReport | undefined>;
  updateConsolidatedReport(
    id: string,
    updates: Partial<ConsolidatedReport>,
  ): Promise<ConsolidatedReport | undefined>;
  submitConsolidatedReport(id: string): Promise<ConsolidatedReport | undefined>;

  addGameParticipant(
    participant: InsertGameParticipant,
  ): Promise<GameParticipant>;
  getGameParticipants(gameId: string): Promise<GameParticipant[]>;
  updateParticipantPoints(
    gameId: string,
    userId: string,
    points: number,
  ): Promise<GameParticipant | undefined>;

  getLeaderboard(): Promise<LeaderboardEntry[]>;
  getLeaderboardByDepartment(): Promise<Record<string, LeaderboardEntry[]>>;

  createFocalIssue(issue: InsertFocalIssue): Promise<FocalIssue>;
  getFocalIssuesByGame(gameId: string): Promise<FocalIssue[]>;
  incrementFocalIssueVoteCount(focalIssueId: string): Promise<void>;
  createFocalIssueVote(vote: InsertFocalIssueVote): Promise<FocalIssueVote>;

  createKeyEventReport(report: InsertKeyEventReport): Promise<KeyEventReport>;
  getKeyEventReportsByGame(gameId: string): Promise<KeyEventReport[]>;

  getPlayerGameHistory(playerId: string): Promise<GameHistory[]>;
  getPlayerStats(playerId: string): Promise<PlayerStats>;

  // Retreat operations
  createRetreat(retreat: InsertRetreat): Promise<Retreat>;
  getRetreat(id: string): Promise<Retreat | undefined>;
  getAllRetreats(): Promise<Retreat[]>;
  getRetreatsByStatus(status: string): Promise<Retreat[]>;
  updateRetreat(
    id: string,
    updates: Partial<Retreat>,
  ): Promise<Retreat | undefined>;
  approveRetreat(id: string, approvedBy: string): Promise<Retreat | undefined>;
  getRetreatByJoinCode(joinCode: string): Promise<Retreat | undefined>;

  createRetreatTable(table: InsertRetreatTable): Promise<RetreatTable>;
  getRetreatTable(id: string): Promise<RetreatTable | undefined>;
  getRetreatTables(retreatId: string): Promise<RetreatTable[]>;
  updateRetreatTable(
    id: string,
    updates: Partial<RetreatTable>,
  ): Promise<RetreatTable | undefined>;

  createRetreatTableEntry(
    entry: InsertRetreatTableEntry,
  ): Promise<RetreatTableEntry>;
  getRetreatTableEntries(tableId: string): Promise<RetreatTableEntry[]>;
  getRetreatTableEntriesByType(
    tableId: string,
    entryType: string,
  ): Promise<RetreatTableEntry[]>;
  updateRetreatTableEntry(
    id: string,
    updates: Partial<RetreatTableEntry>,
  ): Promise<RetreatTableEntry | undefined>;
  deleteRetreatTableEntry(id: string): Promise<void>;

  createRetreatEntryVote(
    vote: InsertRetreatEntryVote,
  ): Promise<RetreatEntryVote>;
  getRetreatEntryVotes(entryId: string): Promise<RetreatEntryVote[]>;
  getScoredEntriesByTable(tableId: string): Promise<RetreatEntryScored[]>;

  addRetreatParticipant(
    participant: InsertRetreatParticipant,
  ): Promise<RetreatParticipant>;
  getRetreatParticipants(retreatId: string): Promise<RetreatParticipant[]>;
  getTableParticipants(tableId: string): Promise<RetreatParticipant[]>;
  removeRetreatParticipant(id: string): Promise<void>;

  createRetreatTableReport(
    report: InsertRetreatTableReport,
  ): Promise<RetreatTableReport>;
  getRetreatTableReport(
    tableId: string,
  ): Promise<RetreatTableReport | undefined>;
  updateRetreatTableReport(
    id: string,
    updates: Partial<RetreatTableReport>,
  ): Promise<RetreatTableReport | undefined>;
  submitRetreatTableReport(
    id: string,
    submittedBy: string,
  ): Promise<RetreatTableReport | undefined>;

  createRetreatConsolidatedReport(
    report: InsertRetreatConsolidatedReport,
  ): Promise<RetreatConsolidatedReport>;
  getRetreatConsolidatedReport(
    retreatId: string,
  ): Promise<RetreatConsolidatedReport | undefined>;
  updateRetreatConsolidatedReport(
    id: string,
    updates: Partial<RetreatConsolidatedReport>,
  ): Promise<RetreatConsolidatedReport | undefined>;
  submitRetreatConsolidatedReport(
    id: string,
    submittedBy: string,
  ): Promise<RetreatConsolidatedReport | undefined>;
  approveRetreatConsolidatedReport(
    id: string,
    approvedBy: string,
  ): Promise<RetreatConsolidatedReport | undefined>;

  // Future Retreat Game Stage operations
  createStageProgress(
    progress: InsertRetreatStageProgress,
  ): Promise<RetreatStageProgress>;
  getStageProgress(
    tableId: string,
    stage: string,
  ): Promise<RetreatStageProgress | undefined>;
  getTableStageProgress(tableId: string): Promise<RetreatStageProgress[]>;
  updateStageProgress(
    id: string,
    updates: Partial<RetreatStageProgress>,
  ): Promise<RetreatStageProgress | undefined>;
  lockStage(
    id: string,
    lockedBy: string,
  ): Promise<RetreatStageProgress | undefined>;

  createStageSubmission(
    submission: InsertRetreatStageSubmission,
  ): Promise<RetreatStageSubmission>;
  getStageSubmissions(
    stageProgressId: string,
  ): Promise<RetreatStageSubmission[]>;
  getPlayerStageSubmissions(
    stageProgressId: string,
    playerId: string,
  ): Promise<RetreatStageSubmission[]>;
  updateStageSubmission(
    id: string,
    updates: Partial<RetreatStageSubmission>,
  ): Promise<RetreatStageSubmission | undefined>;

  createStageConsolidation(
    consolidation: InsertRetreatStageConsolidation,
  ): Promise<RetreatStageConsolidation>;
  getStageConsolidations(
    stageProgressId: string,
  ): Promise<RetreatStageConsolidation[]>;
  updateStageConsolidation(
    id: string,
    updates: Partial<RetreatStageConsolidation>,
  ): Promise<RetreatStageConsolidation | undefined>;

  createConsolidationVote(
    vote: InsertRetreatConsolidationVote,
  ): Promise<RetreatConsolidationVote>;
  getConsolidationVotes(
    consolidationId: string,
  ): Promise<RetreatConsolidationVote[]>;

  createStageReport(
    report: InsertRetreatStageReport,
  ): Promise<RetreatStageReport>;
  getStageReport(
    stageProgressId: string,
  ): Promise<RetreatStageReport | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private games: Map<string, Game>;
  private challenges: Map<string, Challenge>;
  private votes: Map<string, ChallengeVote>;
  private playerReports: Map<string, PlayerReport>;
  private consolidatedReports: Map<string, ConsolidatedReport>;
  private gameParticipants: Map<string, GameParticipant>;
  private focalIssues: Map<string, FocalIssue>;
  private focalIssueVotes: Map<string, FocalIssueVote>;
  private keyEventReports: Map<string, KeyEventReport>;
  private retreats: Map<string, Retreat>;
  private retreatTables: Map<string, RetreatTable>;
  private retreatTableEntries: Map<string, RetreatTableEntry>;
  private retreatEntryVotes: Map<string, RetreatEntryVote>;
  private retreatParticipants: Map<string, RetreatParticipant>;
  private retreatTableReports: Map<string, RetreatTableReport>;
  private retreatConsolidatedReports: Map<string, RetreatConsolidatedReport>;
  private stageProgress: Map<string, RetreatStageProgress>;
  private stageSubmissions: Map<string, RetreatStageSubmission>;
  private stageConsolidations: Map<string, RetreatStageConsolidation>;
  private consolidationVotes: Map<string, RetreatConsolidationVote>;
  private stageReports: Map<string, RetreatStageReport>;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.challenges = new Map();
    this.votes = new Map();
    this.playerReports = new Map();
    this.consolidatedReports = new Map();
    this.gameParticipants = new Map();
    this.focalIssues = new Map();
    this.focalIssueVotes = new Map();
    this.keyEventReports = new Map();
    this.retreats = new Map();
    this.retreatTables = new Map();
    this.retreatTableEntries = new Map();
    this.retreatEntryVotes = new Map();
    this.retreatParticipants = new Map();
    this.retreatTableReports = new Map();
    this.retreatConsolidatedReports = new Map();
    this.stageProgress = new Map();
    this.stageSubmissions = new Map();
    this.stageConsolidations = new Map();
    this.consolidationVotes = new Map();
    this.stageReports = new Map();

    this.seedMockData();
  }

  private seedMockData() {
    const departments = [
      'Security Operations',
      'Traffic Division',
      'Cyber Crime',
      'Community Relations',
      'Strategic Planning',
      'Intelligence',
    ];

    // Comprehensive user seed data covering all roles and departments
    const mockUsers: User[] = [
      // Super Admin
      {
        id: 'u0',
        username: 'superadmin',
        password: 'super123',
        role: 'super_admin',
        department: 'Strategic Planning',
        displayName: 'Brig. Gen. Rashid Al Falasi',
        totalPoints: 0,
      },
      // Admin
      {
        id: 'u1',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        department: 'Strategic Planning',
        displayName: 'Col. Mariam Al Suwaidi',
        totalPoints: 0,
      },

      // Game Masters (one per department)
      {
        id: 'u2',
        username: 'gm1',
        password: 'gm123',
        role: 'gm',
        department: 'Strategic Planning',
        displayName: 'Ahmed Al Mansouri',
        totalPoints: 520,
      },
      {
        id: 'u20',
        username: 'gm2',
        password: 'gm123',
        role: 'gm',
        department: 'Security Operations',
        displayName: 'Lt. Col. Nasser Al Shamsi',
        totalPoints: 480,
      },
      {
        id: 'u21',
        username: 'gm3',
        password: 'gm123',
        role: 'gm',
        department: 'Cyber Crime',
        displayName: 'Maj. Youssef Al Kaabi',
        totalPoints: 445,
      },
      {
        id: 'u22',
        username: 'gm4',
        password: 'gm123',
        role: 'gm',
        department: 'Traffic Division',
        displayName: 'Capt. Aisha Al Mazrouei',
        totalPoints: 390,
      },

      // Deputy Game Masters
      {
        id: 'u30',
        username: 'dgm1',
        password: 'dgm123',
        role: 'dgm',
        department: 'Strategic Planning',
        displayName: 'Capt. Saeed Al Nuaimi',
        totalPoints: 340,
      },
      {
        id: 'u31',
        username: 'dgm2',
        password: 'dgm123',
        role: 'dgm',
        department: 'Security Operations',
        displayName: 'Lt. Hamad Al Dhaheri',
        totalPoints: 310,
      },
      {
        id: 'u32',
        username: 'dgm3',
        password: 'dgm123',
        role: 'dgm',
        department: 'Cyber Crime',
        displayName: 'Capt. Noora Al Blooshi',
        totalPoints: 285,
      },

      // Game Coordinators
      {
        id: 'u40',
        username: 'gc1',
        password: 'gc123',
        role: 'GC',
        department: 'Strategic Planning',
        displayName: 'Sgt. Majid Al Ketbi',
        totalPoints: 420,
      },
      {
        id: 'u41',
        username: 'gc2',
        password: 'gc123',
        role: 'GC',
        department: 'Security Operations',
        displayName: 'Sgt. Hessa Al Mheiri',
        totalPoints: 380,
      },
      {
        id: 'u42',
        username: 'gc3',
        password: 'gc123',
        role: 'GC',
        department: 'Traffic Division',
        displayName: 'Cpl. Rashed Al Suwaidi',
        totalPoints: 350,
      },
      {
        id: 'u43',
        username: 'gc4',
        password: 'gc123',
        role: 'GC',
        department: 'Cyber Crime',
        displayName: 'Sgt. Dana Al Hashemi',
        totalPoints: 295,
      },

      // Future Designers
      {
        id: 'u50',
        username: 'fd1',
        password: 'fd123',
        role: 'FD',
        department: 'Strategic Planning',
        displayName: 'Eng. Salem Al Romaithi',
        totalPoints: 310,
      },
      {
        id: 'u51',
        username: 'fd2',
        password: 'fd123',
        role: 'FD',
        department: 'Intelligence',
        displayName: 'Dr. Fatima Al Jaberi',
        totalPoints: 275,
      },

      // Deputy Coordinators
      {
        id: 'u10',
        username: 'dc1',
        password: 'dc123',
        role: 'DC',
        department: 'Traffic Division',
        displayName: 'Col. Hassan Al Banna',
        totalPoints: 380,
      },
      {
        id: 'u11',
        username: 'dc2',
        password: 'dc123',
        role: 'DC',
        department: 'Security Operations',
        displayName: 'Lt. Col. Moza Al Falasi',
        totalPoints: 355,
      },

      // Experts
      {
        id: 'u7',
        username: 'expert1',
        password: 'expert123',
        role: 'expert',
        department: 'Intelligence',
        displayName: 'Dr. Amira Hassan',
        totalPoints: 410,
      },
      {
        id: 'u60',
        username: 'expert2',
        password: 'expert123',
        role: 'expert',
        department: 'Strategic Planning',
        displayName: 'Prof. Khalid Al Muhairi',
        totalPoints: 385,
      },

      // Experts across all departments
      // Security Operations
      {
        id: 'u3',
        username: 'player1',
        password: 'player123',
        role: 'player',
        department: 'Security Operations',
        displayName: 'Fatima Al Hashimi',
        totalPoints: 320,
      },
      {
        id: 'u8',
        username: 'player5',
        password: 'player123',
        role: 'player',
        department: 'Security Operations',
        displayName: 'Omar Al Falasi',
        totalPoints: 175,
      },
      {
        id: 'u70',
        username: 'player10',
        password: 'player123',
        role: 'player',
        department: 'Security Operations',
        displayName: 'Rashid Al Mansoori',
        totalPoints: 265,
      },
      {
        id: 'u71',
        username: 'player11',
        password: 'player123',
        role: 'player',
        department: 'Security Operations',
        displayName: 'Noura Al Zaabi',
        totalPoints: 210,
      },

      // Cyber Crime
      {
        id: 'u4',
        username: 'player2',
        password: 'player123',
        role: 'player',
        department: 'Cyber Crime',
        displayName: 'Mohammed Rashid',
        totalPoints: 280,
      },
      {
        id: 'u9',
        username: 'player6',
        password: 'player123',
        role: 'player',
        department: 'Cyber Crime',
        displayName: 'Layla Mahmoud',
        totalPoints: 225,
      },
      {
        id: 'u72',
        username: 'player12',
        password: 'player123',
        role: 'player',
        department: 'Cyber Crime',
        displayName: 'Sultan Al Dhaheri',
        totalPoints: 195,
      },
      {
        id: 'u73',
        username: 'player13',
        password: 'player123',
        role: 'player',
        department: 'Cyber Crime',
        displayName: 'Mariam Al Ketbi',
        totalPoints: 240,
      },

      // Traffic Division
      {
        id: 'u5',
        username: 'player3',
        password: 'player123',
        role: 'player',
        department: 'Traffic Division',
        displayName: 'Sara Al Maktoum',
        totalPoints: 195,
      },
      {
        id: 'u74',
        username: 'player14',
        password: 'player123',
        role: 'player',
        department: 'Traffic Division',
        displayName: 'Hamdan Al Blooshi',
        totalPoints: 230,
      },
      {
        id: 'u75',
        username: 'player15',
        password: 'player123',
        role: 'player',
        department: 'Traffic Division',
        displayName: 'Shamma Al Mheiri',
        totalPoints: 185,
      },

      // Community Relations
      {
        id: 'u6',
        username: 'player4',
        password: 'player123',
        role: 'player',
        department: 'Community Relations',
        displayName: 'Khalid Ibrahim',
        totalPoints: 240,
      },
      {
        id: 'u76',
        username: 'player16',
        password: 'player123',
        role: 'player',
        department: 'Community Relations',
        displayName: 'Amna Al Suwaidi',
        totalPoints: 220,
      },
      {
        id: 'u77',
        username: 'player17',
        password: 'player123',
        role: 'player',
        department: 'Community Relations',
        displayName: 'Tariq Al Romaithi',
        totalPoints: 190,
      },

      // Strategic Planning
      {
        id: 'u78',
        username: 'player18',
        password: 'player123',
        role: 'player',
        department: 'Strategic Planning',
        displayName: 'Abdullah Al Shamsi',
        totalPoints: 305,
      },
      {
        id: 'u79',
        username: 'player19',
        password: 'player123',
        role: 'player',
        department: 'Strategic Planning',
        displayName: 'Maha Al Kaabi',
        totalPoints: 275,
      },

      // Intelligence
      {
        id: 'u80',
        username: 'player20',
        password: 'player123',
        role: 'player',
        department: 'Intelligence',
        displayName: 'Saif Al Nuaimi',
        totalPoints: 290,
      },
      {
        id: 'u81',
        username: 'player21',
        password: 'player123',
        role: 'player',
        department: 'Intelligence',
        displayName: 'Latifa Al Mazrouei',
        totalPoints: 255,
      },
    ];

    mockUsers.forEach((user) => this.users.set(user.id, user));

    // Multiple games across departments
    const mockGames: Game[] = [
      {
        id: 'g1',
        title: 'Future of Transportation 2030',
        description:
          "Strategic planning session for Dubai's transportation infrastructure",
        status: 'in_progress',
        gameMasterId: 'u2',
        currentStage: 'voting',
        selectedThemes: null,
        createdAt: new Date(),
      },
      {
        id: 'g2',
        title: 'Cyber Threat Landscape 2035',
        description:
          'Identifying emerging cyber threats and defensive strategies',
        status: 'completed',
        gameMasterId: 'u21',
        currentStage: 'summary',
        selectedThemes: ['Technology', 'Security'],
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'g3',
        title: 'Smart City Security Integration',
        description:
          'Planning for integrated security in smart city ecosystems',
        status: 'completed',
        gameMasterId: 'u20',
        currentStage: 'summary',
        selectedThemes: ['Technology', 'Environmental'],
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'g4',
        title: 'Community Trust Initiative 2030',
        description:
          'Building stronger community relationships through technology',
        status: 'in_progress',
        gameMasterId: 'u2',
        currentStage: 'challenges',
        selectedThemes: null,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'g5',
        title: 'Traffic Management AI Evolution',
        description: 'AI-driven traffic management for Dubai 2035',
        status: 'completed',
        gameMasterId: 'u22',
        currentStage: 'summary',
        selectedThemes: ['Technology', 'Economic'],
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      },
    ];
    mockGames.forEach((game) => this.games.set(game.id, game));

    const mockChallenges: Challenge[] = [
      {
        id: 'c1',
        gameId: 'g1',
        theme: 'Technology',
        content:
          'Rapid obsolescence of current security hardware due to quantum computing advancements.',
        submittedBy: 'u3',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c2',
        gameId: 'g1',
        theme: 'Technology',
        content:
          'Integration challenges between legacy systems and AI-powered surveillance networks.',
        submittedBy: 'u4',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c3',
        gameId: 'g1',
        theme: 'Social',
        content:
          'Public resistance to biometric surveillance in residential zones.',
        submittedBy: 'u5',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c4',
        gameId: 'g1',
        theme: 'Social',
        content:
          'Generational gap in technology adoption among senior citizens.',
        submittedBy: 'u6',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c5',
        gameId: 'g1',
        theme: 'Economic',
        content:
          'High infrastructure costs for implementing smart city solutions.',
        submittedBy: 'u7',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c6',
        gameId: 'g1',
        theme: 'Economic',
        content:
          'Dependency on foreign technology suppliers affecting budget planning.',
        submittedBy: 'u8',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c7',
        gameId: 'g1',
        theme: 'Environmental',
        content:
          'Carbon footprint of data centers required for smart infrastructure.',
        submittedBy: 'u9',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c8',
        gameId: 'g1',
        theme: 'Political',
        content:
          'Cross-border data jurisdiction conflicts in cloud-based evidence storage.',
        submittedBy: 'u3',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c9',
        gameId: 'g1',
        theme: 'Security',
        content:
          'Vulnerability of IoT devices in connected transportation systems.',
        submittedBy: 'u4',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: 'c10',
        gameId: 'g1',
        theme: 'Security',
        content:
          'Cybersecurity threats from state-sponsored actors targeting critical infrastructure.',
        submittedBy: 'u7',
        status: 'approved',
        createdAt: new Date(),
      },
    ];

    mockChallenges.forEach((challenge) =>
      this.challenges.set(challenge.id, challenge),
    );

    const mockVotes: ChallengeVote[] = [
      {
        id: 'v1',
        challengeId: 'c1',
        gameId: 'g1',
        voterId: 'u3',
        impact: 5,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v2',
        challengeId: 'c1',
        gameId: 'g1',
        voterId: 'u4',
        impact: 4,
        probability: 5,
        createdAt: new Date(),
      },
      {
        id: 'v3',
        challengeId: 'c1',
        gameId: 'g1',
        voterId: 'u5',
        impact: 5,
        probability: 5,
        createdAt: new Date(),
      },
      {
        id: 'v4',
        challengeId: 'c2',
        gameId: 'g1',
        voterId: 'u3',
        impact: 4,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v5',
        challengeId: 'c2',
        gameId: 'g1',
        voterId: 'u6',
        impact: 3,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v6',
        challengeId: 'c3',
        gameId: 'g1',
        voterId: 'u4',
        impact: 4,
        probability: 3,
        createdAt: new Date(),
      },
      {
        id: 'v7',
        challengeId: 'c3',
        gameId: 'g1',
        voterId: 'u5',
        impact: 5,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v8',
        challengeId: 'c4',
        gameId: 'g1',
        voterId: 'u7',
        impact: 3,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v9',
        challengeId: 'c5',
        gameId: 'g1',
        voterId: 'u3',
        impact: 5,
        probability: 5,
        createdAt: new Date(),
      },
      {
        id: 'v10',
        challengeId: 'c5',
        gameId: 'g1',
        voterId: 'u8',
        impact: 4,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v11',
        challengeId: 'c6',
        gameId: 'g1',
        voterId: 'u9',
        impact: 3,
        probability: 3,
        createdAt: new Date(),
      },
      {
        id: 'v12',
        challengeId: 'c7',
        gameId: 'g1',
        voterId: 'u4',
        impact: 4,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v13',
        challengeId: 'c8',
        gameId: 'g1',
        voterId: 'u5',
        impact: 5,
        probability: 3,
        createdAt: new Date(),
      },
      {
        id: 'v14',
        challengeId: 'c9',
        gameId: 'g1',
        voterId: 'u6',
        impact: 5,
        probability: 5,
        createdAt: new Date(),
      },
      {
        id: 'v15',
        challengeId: 'c9',
        gameId: 'g1',
        voterId: 'u7',
        impact: 5,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v16',
        challengeId: 'c10',
        gameId: 'g1',
        voterId: 'u3',
        impact: 5,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'v17',
        challengeId: 'c10',
        gameId: 'g1',
        voterId: 'u8',
        impact: 4,
        probability: 5,
        createdAt: new Date(),
      },
    ];

    mockVotes.forEach((vote) => this.votes.set(vote.id, vote));

    const mockReports: PlayerReport[] = [
      {
        id: 'pr1',
        gameId: 'g1',
        playerId: 'u3',
        theme: 'Technology',
        content:
          'The technology challenges identified require immediate action...',
        risks: 'Legacy system incompatibility',
        opportunities: 'Early adoption advantage',
        recommendations: 'Phase out legacy systems within 3 years',
        createdAt: new Date(),
      },
      {
        id: 'pr2',
        gameId: 'g1',
        playerId: 'u4',
        theme: 'Security',
        content:
          'Security vulnerabilities in IoT networks pose significant risks...',
        risks: 'State-sponsored attacks',
        opportunities: 'Advanced threat detection systems',
        recommendations: 'Implement zero-trust architecture',
        createdAt: new Date(),
      },
      {
        id: 'pr3',
        gameId: 'g1',
        playerId: 'u5',
        theme: 'Social',
        content:
          'Public acceptance is crucial for successful implementation...',
        risks: 'Community backlash',
        opportunities: 'Educational programs',
        recommendations: 'Launch public awareness campaigns',
        createdAt: new Date(),
      },
      {
        id: 'pr4',
        gameId: 'g1',
        playerId: 'u7',
        theme: 'Economic',
        content: 'Infrastructure costs need careful consideration...',
        risks: 'Budget overruns',
        opportunities: 'Public-private partnerships',
        recommendations: 'Develop phased investment strategy',
        createdAt: new Date(),
      },
    ];

    mockReports.forEach((report) => this.playerReports.set(report.id, report));

    // Expanded game participants across all games
    const mockParticipants: GameParticipant[] = [
      // Game 1: Future of Transportation 2030
      {
        id: 'gp1',
        gameId: 'g1',
        userId: 'u3',
        role: 'player',
        pointsEarned: 85,
        joinedAt: new Date(),
      },
      {
        id: 'gp2',
        gameId: 'g1',
        userId: 'u4',
        role: 'player',
        pointsEarned: 70,
        joinedAt: new Date(),
      },
      {
        id: 'gp3',
        gameId: 'g1',
        userId: 'u5',
        role: 'player',
        pointsEarned: 65,
        joinedAt: new Date(),
      },
      {
        id: 'gp4',
        gameId: 'g1',
        userId: 'u6',
        role: 'player',
        pointsEarned: 55,
        joinedAt: new Date(),
      },
      {
        id: 'gp5',
        gameId: 'g1',
        userId: 'u7',
        role: 'expert',
        pointsEarned: 95,
        joinedAt: new Date(),
      },
      {
        id: 'gp6',
        gameId: 'g1',
        userId: 'u8',
        role: 'player',
        pointsEarned: 50,
        joinedAt: new Date(),
      },
      {
        id: 'gp7',
        gameId: 'g1',
        userId: 'u9',
        role: 'player',
        pointsEarned: 45,
        joinedAt: new Date(),
      },
      {
        id: 'gp8',
        gameId: 'g1',
        userId: 'u40',
        role: 'GC',
        pointsEarned: 80,
        joinedAt: new Date(),
      },
      {
        id: 'gp9',
        gameId: 'g1',
        userId: 'u78',
        role: 'player',
        pointsEarned: 75,
        joinedAt: new Date(),
      },

      // Game 2: Cyber Threat Landscape 2035
      {
        id: 'gp10',
        gameId: 'g2',
        userId: 'u4',
        role: 'player',
        pointsEarned: 90,
        joinedAt: new Date(),
      },
      {
        id: 'gp11',
        gameId: 'g2',
        userId: 'u9',
        role: 'player',
        pointsEarned: 85,
        joinedAt: new Date(),
      },
      {
        id: 'gp12',
        gameId: 'g2',
        userId: 'u72',
        role: 'player',
        pointsEarned: 70,
        joinedAt: new Date(),
      },
      {
        id: 'gp13',
        gameId: 'g2',
        userId: 'u73',
        role: 'player',
        pointsEarned: 65,
        joinedAt: new Date(),
      },
      {
        id: 'gp14',
        gameId: 'g2',
        userId: 'u43',
        role: 'GC',
        pointsEarned: 75,
        joinedAt: new Date(),
      },
      {
        id: 'gp15',
        gameId: 'g2',
        userId: 'u32',
        role: 'dgm',
        pointsEarned: 80,
        joinedAt: new Date(),
      },

      // Game 3: Smart City Security Integration
      {
        id: 'gp16',
        gameId: 'g3',
        userId: 'u3',
        role: 'player',
        pointsEarned: 95,
        joinedAt: new Date(),
      },
      {
        id: 'gp17',
        gameId: 'g3',
        userId: 'u70',
        role: 'player',
        pointsEarned: 80,
        joinedAt: new Date(),
      },
      {
        id: 'gp18',
        gameId: 'g3',
        userId: 'u71',
        role: 'player',
        pointsEarned: 75,
        joinedAt: new Date(),
      },
      {
        id: 'gp19',
        gameId: 'g3',
        userId: 'u8',
        role: 'player',
        pointsEarned: 65,
        joinedAt: new Date(),
      },
      {
        id: 'gp20',
        gameId: 'g3',
        userId: 'u41',
        role: 'GC',
        pointsEarned: 85,
        joinedAt: new Date(),
      },
      {
        id: 'gp21',
        gameId: 'g3',
        userId: 'u31',
        role: 'dgm',
        pointsEarned: 90,
        joinedAt: new Date(),
      },
      {
        id: 'gp22',
        gameId: 'g3',
        userId: 'u11',
        role: 'DC',
        pointsEarned: 70,
        joinedAt: new Date(),
      },

      // Game 4: Community Trust Initiative 2030
      {
        id: 'gp23',
        gameId: 'g4',
        userId: 'u6',
        role: 'player',
        pointsEarned: 60,
        joinedAt: new Date(),
      },
      {
        id: 'gp24',
        gameId: 'g4',
        userId: 'u76',
        role: 'player',
        pointsEarned: 55,
        joinedAt: new Date(),
      },
      {
        id: 'gp25',
        gameId: 'g4',
        userId: 'u77',
        role: 'player',
        pointsEarned: 50,
        joinedAt: new Date(),
      },
      {
        id: 'gp26',
        gameId: 'g4',
        userId: 'u78',
        role: 'player',
        pointsEarned: 70,
        joinedAt: new Date(),
      },
      {
        id: 'gp27',
        gameId: 'g4',
        userId: 'u79',
        role: 'player',
        pointsEarned: 65,
        joinedAt: new Date(),
      },

      // Game 5: Traffic Management AI Evolution
      {
        id: 'gp28',
        gameId: 'g5',
        userId: 'u5',
        role: 'player',
        pointsEarned: 75,
        joinedAt: new Date(),
      },
      {
        id: 'gp29',
        gameId: 'g5',
        userId: 'u74',
        role: 'player',
        pointsEarned: 80,
        joinedAt: new Date(),
      },
      {
        id: 'gp30',
        gameId: 'g5',
        userId: 'u75',
        role: 'player',
        pointsEarned: 60,
        joinedAt: new Date(),
      },
      {
        id: 'gp31',
        gameId: 'g5',
        userId: 'u42',
        role: 'GC',
        pointsEarned: 85,
        joinedAt: new Date(),
      },
      {
        id: 'gp32',
        gameId: 'g5',
        userId: 'u10',
        role: 'DC',
        pointsEarned: 90,
        joinedAt: new Date(),
      },

      // Cross-department participation
      {
        id: 'gp33',
        gameId: 'g2',
        userId: 'u80',
        role: 'player',
        pointsEarned: 75,
        joinedAt: new Date(),
      },
      {
        id: 'gp34',
        gameId: 'g2',
        userId: 'u81',
        role: 'player',
        pointsEarned: 70,
        joinedAt: new Date(),
      },
      {
        id: 'gp35',
        gameId: 'g3',
        userId: 'u7',
        role: 'expert',
        pointsEarned: 100,
        joinedAt: new Date(),
      },
      {
        id: 'gp36',
        gameId: 'g5',
        userId: 'u60',
        role: 'expert',
        pointsEarned: 95,
        joinedAt: new Date(),
      },
    ];

    mockParticipants.forEach((p) => this.gameParticipants.set(p.id, p));

    // Seed Future Retreat data
    const mockRetreats: Retreat[] = [
      {
        id: 'r1',
        title: 'Dubai Police Digital Transformation 2030',
        description:
          'Strategic foresight session to identify future challenges and opportunities in digital transformation',
        department: 'Strategic Planning',
        subDepartments: ['Cyber Crime', 'Intelligence', 'Community Relations'],
        linkedSourceType: 'scenario_report',
        linkedSourceId: 'g1',
        status: 'in_progress',
        createdBy: 'u2',
        approvedBy: 'u1',
        joinCode: 'DPDT2030',
        createdAt: new Date(),
        approvedAt: new Date(),
        completedAt: null,
      },
      {
        id: 'r2',
        title: 'Traffic Safety Innovation Summit',
        description:
          'Exploring future technologies and strategies for traffic management',
        department: 'Traffic Division',
        subDepartments: ['Operations', 'Technology Unit', 'Public Outreach'],
        linkedSourceType: 'standalone',
        linkedSourceId: null,
        status: 'pending_approval',
        createdBy: 'u2',
        approvedBy: null,
        joinCode: 'TSIS2030',
        createdAt: new Date(),
        approvedAt: null,
        completedAt: null,
      },
      {
        id: 'r3',
        title: 'Community Policing Future Vision',
        description:
          'Envisioning the future of community engagement and public safety',
        department: 'Community Relations',
        subDepartments: [
          'Youth Programs',
          'Neighborhood Watch',
          'Social Media',
        ],
        linkedSourceType: 'standalone',
        linkedSourceId: null,
        status: 'completed',
        createdBy: 'u2',
        approvedBy: 'u1',
        joinCode: 'CPFV2030',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        approvedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ];
    mockRetreats.forEach((r) => this.retreats.set(r.id, r));

    // Retreat Tables for active retreat
    const mockRetreatTables: RetreatTable[] = [
      {
        id: 'rt1',
        retreatId: 'r1',
        name: 'Cyber Crime',
        subDepartment: 'Cyber Crime',
        status: 'active',
        currentStage: 'obstacles',
        fdId: 'u2',
        gcId: 'u43',
        gmId: 'u21',
        createdAt: new Date(),
      },
      {
        id: 'rt2',
        retreatId: 'r1',
        name: 'Intelligence',
        subDepartment: 'Intelligence',
        status: 'active',
        currentStage: 'registration',
        fdId: 'u2',
        gcId: null,
        gmId: null,
        createdAt: new Date(),
      },
      {
        id: 'rt3',
        retreatId: 'r1',
        name: 'Community Relations',
        subDepartment: 'Community Relations',
        status: 'active',
        currentStage: 'registration',
        fdId: 'u2',
        gcId: null,
        gmId: null,
        createdAt: new Date(),
      },
      {
        id: 'rt4',
        retreatId: 'r3',
        name: 'Youth Programs',
        subDepartment: 'Youth Programs',
        status: 'completed',
        currentStage: 'completed',
        fdId: 'u2',
        gcId: null,
        gmId: null,
        createdAt: new Date(),
      },
      {
        id: 'rt5',
        retreatId: 'r3',
        name: 'Neighborhood Watch',
        subDepartment: 'Neighborhood Watch',
        status: 'completed',
        currentStage: 'completed',
        fdId: 'u2',
        gcId: null,
        gmId: null,
        createdAt: new Date(),
      },
    ];
    mockRetreatTables.forEach((t) => this.retreatTables.set(t.id, t));

    // Retreat Table Entries
    const mockRetreatEntries: RetreatTableEntry[] = [
      // Cyber Crime table entries
      {
        id: 're1',
        tableId: 'rt1',
        retreatId: 'r1',
        category: 'work_issues',
        title: 'Outdated forensic tools',
        description:
          'Current digital forensics tools cannot handle encrypted mobile devices',
        theme: 'technology',
        status: 'active',
        createdBy: 'u4',
        impactScore: 4.2,
        probabilityScore: 4.5,
        voteCount: 5,
        createdAt: new Date(),
      },
      {
        id: 're2',
        tableId: 'rt1',
        retreatId: 'r1',
        category: 'future_challenges',
        title: 'AI-generated deepfakes',
        description:
          'Difficulty distinguishing real evidence from AI-manipulated content',
        theme: 'technology',
        status: 'active',
        createdBy: 'u4',
        impactScore: 4.8,
        probabilityScore: 4.2,
        voteCount: 5,
        createdAt: new Date(),
      },
      {
        id: 're3',
        tableId: 'rt1',
        retreatId: 'r1',
        category: 'opportunities',
        title: 'Blockchain evidence chain',
        description: 'Using blockchain for tamper-proof evidence management',
        theme: 'technology',
        status: 'active',
        createdBy: 'u9',
        impactScore: 3.8,
        probabilityScore: 3.5,
        voteCount: 4,
        createdAt: new Date(),
      },
      {
        id: 're4',
        tableId: 'rt1',
        retreatId: 'r1',
        category: 'risks',
        title: 'Talent shortage',
        description: 'Difficulty recruiting qualified cybersecurity experts',
        theme: 'social',
        status: 'active',
        createdBy: 'u4',
        impactScore: 4.5,
        probabilityScore: 4.8,
        voteCount: 5,
        createdAt: new Date(),
      },
      // Intelligence table entries
      {
        id: 're5',
        tableId: 'rt2',
        retreatId: 'r1',
        category: 'work_issues',
        title: 'Data silos',
        description:
          'Intelligence data scattered across multiple incompatible systems',
        theme: 'technology',
        status: 'active',
        createdBy: 'u7',
        impactScore: 4.0,
        probabilityScore: 4.5,
        voteCount: 4,
        createdAt: new Date(),
      },
      {
        id: 're6',
        tableId: 'rt2',
        retreatId: 'r1',
        category: 'future_challenges',
        title: 'Cross-border data sharing',
        description:
          'Legal complexities in sharing intelligence with international partners',
        theme: 'political',
        status: 'active',
        createdBy: 'u7',
        impactScore: 4.3,
        probabilityScore: 3.8,
        voteCount: 4,
        createdAt: new Date(),
      },
      {
        id: 're7',
        tableId: 'rt2',
        retreatId: 'r1',
        category: 'opportunities',
        title: 'Predictive analytics',
        description: 'Using AI for predictive crime analysis and prevention',
        theme: 'technology',
        status: 'active',
        createdBy: 'u7',
        impactScore: 4.6,
        probabilityScore: 4.0,
        voteCount: 5,
        createdAt: new Date(),
      },
      // Community Relations entries
      {
        id: 're8',
        tableId: 'rt3',
        retreatId: 'r1',
        category: 'work_issues',
        title: 'Social media monitoring',
        description: 'Lack of real-time social media monitoring capabilities',
        theme: 'technology',
        status: 'active',
        createdBy: 'u6',
        impactScore: 3.5,
        probabilityScore: 4.2,
        voteCount: 4,
        createdAt: new Date(),
      },
      {
        id: 're9',
        tableId: 'rt3',
        retreatId: 'r1',
        category: 'future_challenges',
        title: 'Trust deficit',
        description: 'Declining public trust in law enforcement institutions',
        theme: 'social',
        status: 'active',
        createdBy: 'u6',
        impactScore: 4.7,
        probabilityScore: 3.5,
        voteCount: 5,
        createdAt: new Date(),
      },
      {
        id: 're10',
        tableId: 'rt3',
        retreatId: 'r1',
        category: 'risks',
        title: 'Misinformation spread',
        description:
          'Rapid spread of false information about police activities',
        theme: 'social',
        status: 'active',
        createdBy: 'u6',
        impactScore: 4.4,
        probabilityScore: 4.6,
        voteCount: 5,
        createdAt: new Date(),
      },
    ];
    mockRetreatEntries.forEach((e) => this.retreatTableEntries.set(e.id, e));

    // Retreat Entry Votes
    const mockRetreatVotes: RetreatEntryVote[] = [
      {
        id: 'rev1',
        entryId: 're1',
        tableId: 'rt1',
        voterId: 'u3',
        impact: 4,
        probability: 5,
        createdAt: new Date(),
      },
      {
        id: 'rev2',
        entryId: 're1',
        tableId: 'rt1',
        voterId: 'u4',
        impact: 5,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'rev3',
        entryId: 're2',
        tableId: 'rt1',
        voterId: 'u3',
        impact: 5,
        probability: 4,
        createdAt: new Date(),
      },
      {
        id: 'rev4',
        entryId: 're2',
        tableId: 'rt1',
        voterId: 'u9',
        impact: 5,
        probability: 5,
        createdAt: new Date(),
      },
      {
        id: 'rev5',
        entryId: 're4',
        tableId: 'rt1',
        voterId: 'u4',
        impact: 5,
        probability: 5,
        createdAt: new Date(),
      },
      {
        id: 'rev6',
        entryId: 're4',
        tableId: 'rt1',
        voterId: 'u9',
        impact: 4,
        probability: 5,
        createdAt: new Date(),
      },
    ];
    mockRetreatVotes.forEach((v) => this.retreatEntryVotes.set(v.id, v));

    // Retreat Participants
    const mockRetreatParticipants: RetreatParticipant[] = [
      {
        id: 'rp1',
        retreatId: 'r1',
        tableId: 'rt1',
        userId: 'u4',
        role: 'facilitator',
        joinedAt: new Date(),
      },
      {
        id: 'rp2',
        retreatId: 'r1',
        tableId: 'rt1',
        userId: 'u9',
        role: 'participant',
        joinedAt: new Date(),
      },
      {
        id: 'rp3',
        retreatId: 'r1',
        tableId: 'rt2',
        userId: 'u7',
        role: 'facilitator',
        joinedAt: new Date(),
      },
      {
        id: 'rp4',
        retreatId: 'r1',
        tableId: 'rt3',
        userId: 'u6',
        role: 'facilitator',
        joinedAt: new Date(),
      },
      {
        id: 'rp5',
        retreatId: 'r1',
        tableId: 'rt3',
        userId: 'u5',
        role: 'participant',
        joinedAt: new Date(),
      },
    ];
    mockRetreatParticipants.forEach((p) =>
      this.retreatParticipants.set(p.id, p),
    );
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.role || 'player',
      department: insertUser.department || null,
      displayName: insertUser.displayName || null,
      totalPoints: 0,
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUsersByDepartment(department: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (u) => u.department === department,
    );
  }

  async updateUserPoints(
    userId: string,
    points: number,
  ): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.totalPoints += points;
      this.users.set(userId, user);
    }
    return user;
  }

  async createGame(game: InsertGame): Promise<Game> {
    const id = randomUUID();
    const newGame: Game = {
      ...game,
      id,
      createdAt: new Date(),
      status: game.status || 'draft',
      currentStage: game.currentStage || 'config',
      selectedThemes: game.selectedThemes || null,
      gameMasterId: game.gameMasterId || null,
      description: game.description || null,
    };
    this.games.set(id, newGame);
    return newGame;
  }

  async getGame(id: string): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async updateGame(
    id: string,
    updates: Partial<Game>,
  ): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (game) {
      const updated = { ...game, ...updates };
      this.games.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGamesByStatus(status: string): Promise<Game[]> {
    return Array.from(this.games.values()).filter((g) => g.status === status);
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const id = randomUUID();
    const newChallenge: Challenge = {
      ...challenge,
      id,
      createdAt: new Date(),
      status: challenge.status || 'pending',
      submittedBy: challenge.submittedBy || null,
    };
    this.challenges.set(id, newChallenge);
    return newChallenge;
  }

  async getChallenge(id: string): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }

  async getChallengesByGame(gameId: string): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(
      (c) => c.gameId === gameId,
    );
  }

  async getChallengesByGameAndTheme(
    gameId: string,
    theme: string,
  ): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(
      (c) => c.gameId === gameId && c.theme === theme,
    );
  }

  async updateChallengeStatus(
    id: string,
    status: string,
  ): Promise<Challenge | undefined> {
    const challenge = this.challenges.get(id);
    if (challenge) {
      challenge.status = status;
      this.challenges.set(id, challenge);
    }
    return challenge;
  }

  async createVote(vote: InsertChallengeVote): Promise<ChallengeVote> {
    const id = randomUUID();
    const newVote: ChallengeVote = {
      ...vote,
      id,
      createdAt: new Date(),
    };
    this.votes.set(id, newVote);
    return newVote;
  }

  async getVotesByChallenge(challengeId: string): Promise<ChallengeVote[]> {
    return Array.from(this.votes.values()).filter(
      (v) => v.challengeId === challengeId,
    );
  }

  async getVotesByGame(gameId: string): Promise<ChallengeVote[]> {
    return Array.from(this.votes.values()).filter((v) => v.gameId === gameId);
  }

  async getThemeScores(gameId: string): Promise<ThemeScore[]> {
    const challenges = await this.getChallengesByGame(gameId);
    const votes = await this.getVotesByGame(gameId);

    const themeScores: ThemeScore[] = THEMES.map((theme) => {
      const themeChallenges = challenges.filter(
        (c) => c.theme === theme && c.status === 'approved',
      );
      const challengeIds = themeChallenges.map((c) => c.id);
      const themeVotes = votes.filter((v) =>
        challengeIds.includes(v.challengeId),
      );

      const totalImpact = themeVotes.reduce((sum, v) => sum + v.impact, 0);
      const totalProbability = themeVotes.reduce(
        (sum, v) => sum + v.probability,
        0,
      );
      const voteCount = themeVotes.length;

      return {
        theme,
        totalImpact,
        totalProbability,
        averageImpact: voteCount > 0 ? totalImpact / voteCount : 0,
        averageProbability: voteCount > 0 ? totalProbability / voteCount : 0,
        totalScore: totalImpact + totalProbability,
        voteCount,
      };
    });

    return themeScores.sort((a, b) => b.totalScore - a.totalScore);
  }

  async createPlayerReport(report: InsertPlayerReport): Promise<PlayerReport> {
    const id = randomUUID();
    const newReport: PlayerReport = {
      ...report,
      id,
      createdAt: new Date(),
      risks: report.risks || null,
      opportunities: report.opportunities || null,
      recommendations: report.recommendations || null,
    };
    this.playerReports.set(id, newReport);
    return newReport;
  }

  async getPlayerReport(id: string): Promise<PlayerReport | undefined> {
    return this.playerReports.get(id);
  }

  async getPlayerReportsByGame(gameId: string): Promise<PlayerReport[]> {
    return Array.from(this.playerReports.values()).filter(
      (r) => r.gameId === gameId,
    );
  }

  async createConsolidatedReport(
    report: InsertConsolidatedReport,
  ): Promise<ConsolidatedReport> {
    const id = randomUUID();
    const newReport: ConsolidatedReport = {
      ...report,
      id,
      createdAt: new Date(),
      submittedAt: null,
      status: report.status || 'draft',
      executiveSummary: report.executiveSummary || null,
      keyFindings: report.keyFindings || null,
      risks: report.risks || null,
      opportunities: report.opportunities || null,
      recommendations: report.recommendations || null,
    };
    this.consolidatedReports.set(id, newReport);
    return newReport;
  }

  async getConsolidatedReport(
    id: string,
  ): Promise<ConsolidatedReport | undefined> {
    return this.consolidatedReports.get(id);
  }

  async getConsolidatedReportByGame(
    gameId: string,
  ): Promise<ConsolidatedReport | undefined> {
    return Array.from(this.consolidatedReports.values()).find(
      (r) => r.gameId === gameId,
    );
  }

  async updateConsolidatedReport(
    id: string,
    updates: Partial<ConsolidatedReport>,
  ): Promise<ConsolidatedReport | undefined> {
    const report = this.consolidatedReports.get(id);
    if (report) {
      const updated = { ...report, ...updates };
      this.consolidatedReports.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async submitConsolidatedReport(
    id: string,
  ): Promise<ConsolidatedReport | undefined> {
    const report = this.consolidatedReports.get(id);
    if (report) {
      report.status = 'submitted';
      report.submittedAt = new Date();
      this.consolidatedReports.set(id, report);
    }
    return report;
  }

  async addGameParticipant(
    participant: InsertGameParticipant,
  ): Promise<GameParticipant> {
    const id = randomUUID();
    const newParticipant: GameParticipant = {
      ...participant,
      id,
      joinedAt: new Date(),
      pointsEarned: participant.pointsEarned || 0,
      role: participant.role || 'player',
    };
    this.gameParticipants.set(id, newParticipant);
    return newParticipant;
  }

  async getGameParticipants(gameId: string): Promise<GameParticipant[]> {
    return Array.from(this.gameParticipants.values()).filter(
      (p) => p.gameId === gameId,
    );
  }

  async updateParticipantPoints(
    gameId: string,
    oderId: string,
    points: number,
  ): Promise<GameParticipant | undefined> {
    const participant = Array.from(this.gameParticipants.values()).find(
      (p) => p.gameId === gameId && p.userId === oderId,
    );
    if (participant) {
      participant.pointsEarned += points;
      this.gameParticipants.set(participant.id, participant);
    }
    return participant;
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const users = await this.getAllUsers();
    const participants = Array.from(this.gameParticipants.values());
    const games = await this.getAllGames();

    const leaderboard: LeaderboardEntry[] = users
      .filter((u) => u.role !== 'admin')
      .map((user) => {
        const userParticipations = participants.filter(
          (p) => p.userId === user.id,
        );
        const gameDetails = userParticipations.map((p) => {
          const game = games.find((g) => g.id === p.gameId);
          return {
            gameId: p.gameId,
            gameTitle: game?.title || 'Unknown Game',
            pointsEarned: p.pointsEarned,
          };
        });

        return {
          userId: user.id,
          username: user.username,
          displayName: user.displayName || undefined,
          department: user.department || undefined,
          role: user.role,
          totalPoints: user.totalPoints,
          gamesParticipated: userParticipations.length,
          gameDetails,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return leaderboard;
  }

  async getLeaderboardByDepartment(): Promise<
    Record<string, LeaderboardEntry[]>
  > {
    const leaderboard = await this.getLeaderboard();
    const byDepartment: Record<string, LeaderboardEntry[]> = {};

    leaderboard.forEach((entry) => {
      const dept = entry.department || 'Unassigned';
      if (!byDepartment[dept]) {
        byDepartment[dept] = [];
      }
      byDepartment[dept].push(entry);
    });

    Object.keys(byDepartment).forEach((dept) => {
      byDepartment[dept].sort((a, b) => b.totalPoints - a.totalPoints);
    });

    return byDepartment;
  }

  async createFocalIssue(issue: InsertFocalIssue): Promise<FocalIssue> {
    const id = randomUUID();
    const newIssue: FocalIssue = {
      ...issue,
      id,
      voteCount: 0,
      status: issue.status || 'pending',
      createdAt: new Date(),
    };
    this.focalIssues.set(id, newIssue);
    return newIssue;
  }

  async getFocalIssuesByGame(gameId: string): Promise<FocalIssue[]> {
    return Array.from(this.focalIssues.values()).filter(
      (i) => i.gameId === gameId,
    );
  }

  async incrementFocalIssueVoteCount(focalIssueId: string): Promise<void> {
    const issue = this.focalIssues.get(focalIssueId);
    if (issue) {
      issue.voteCount += 1;
      this.focalIssues.set(focalIssueId, issue);
    }
  }

  async createFocalIssueVote(
    vote: InsertFocalIssueVote,
  ): Promise<FocalIssueVote> {
    const id = randomUUID();
    const newVote: FocalIssueVote = {
      ...vote,
      id,
      createdAt: new Date(),
    };
    this.focalIssueVotes.set(id, newVote);
    return newVote;
  }

  async createKeyEventReport(
    report: InsertKeyEventReport,
  ): Promise<KeyEventReport> {
    const id = randomUUID();
    const newReport: KeyEventReport = {
      ...report,
      id,
      risks: report.risks || null,
      opportunities: report.opportunities || null,
      narrative: report.narrative || null,
      createdAt: new Date(),
    };
    this.keyEventReports.set(id, newReport);
    return newReport;
  }

  async getKeyEventReportsByGame(gameId: string): Promise<KeyEventReport[]> {
    return Array.from(this.keyEventReports.values()).filter(
      (r) => r.gameId === gameId,
    );
  }

  async getPlayerGameHistory(playerId: string): Promise<GameHistory[]> {
    const participations = Array.from(this.gameParticipants.values()).filter(
      (p) => p.userId === playerId,
    );
    const games = await this.getAllGames();

    return participations.map((p) => {
      const game = games.find((g) => g.id === p.gameId);
      return {
        gameId: p.gameId,
        gameTitle: game?.title || 'Unknown Game',
        datePlayed: game?.createdAt?.toISOString() || new Date().toISOString(),
        rolePlayed: p.role,
        pointsEarned: p.pointsEarned,
        status: game?.status || 'unknown',
      };
    });
  }

  async getPlayerStats(playerId: string): Promise<PlayerStats> {
    const user = await this.getUser(playerId);
    const history = await this.getPlayerGameHistory(playerId);

    const bestGame =
      history.length > 0
        ? history.reduce(
            (best, game) =>
              game.pointsEarned > best.pointsEarned ? game : best,
            history[0],
          )
        : undefined;

    return {
      userId: playerId,
      username: user?.username || 'unknown',
      displayName: user?.displayName || undefined,
      department: user?.department || undefined,
      totalGamesPlayed: history.length,
      totalPointsEarned: user?.totalPoints || 0,
      bestPerformingGame: bestGame
        ? {
            gameId: bestGame.gameId,
            gameTitle: bestGame.gameTitle,
            pointsEarned: bestGame.pointsEarned,
          }
        : undefined,
      highestScoringStage: 'Voting',
      gameBreakdown: history.map((h) => ({
        gameId: h.gameId,
        gameTitle: h.gameTitle,
        pointsEarned: h.pointsEarned,
        datePlayed: h.datePlayed,
      })),
    };
  }

  // ============ RETREAT OPERATIONS ============

  private generateJoinCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  async createRetreat(retreat: InsertRetreat): Promise<Retreat> {
    const id = randomUUID();
    const newRetreat: Retreat = {
      ...retreat,
      id,
      joinCode: this.generateJoinCode(),
      status: retreat.status || 'draft',
      linkedSourceType: retreat.linkedSourceType || 'standalone',
      linkedSourceId: retreat.linkedSourceId || null,
      description: retreat.description || null,
      approvedBy: retreat.approvedBy || null,
      approvedAt: null,
      completedAt: null,
      createdAt: new Date(),
    };
    this.retreats.set(id, newRetreat);
    return newRetreat;
  }

  async getRetreat(id: string): Promise<Retreat | undefined> {
    return this.retreats.get(id);
  }

  async getAllRetreats(): Promise<Retreat[]> {
    return Array.from(this.retreats.values());
  }

  async getRetreatsByStatus(status: string): Promise<Retreat[]> {
    return Array.from(this.retreats.values()).filter(
      (r) => r.status === status,
    );
  }

  async updateRetreat(
    id: string,
    updates: Partial<Retreat>,
  ): Promise<Retreat | undefined> {
    const retreat = this.retreats.get(id);
    if (retreat) {
      const updated = { ...retreat, ...updates };
      this.retreats.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async approveRetreat(
    id: string,
    approvedBy: string,
  ): Promise<Retreat | undefined> {
    const retreat = this.retreats.get(id);
    if (retreat) {
      retreat.status = 'approved';
      retreat.approvedBy = approvedBy;
      retreat.approvedAt = new Date();

      // Auto-create tables for each sub-department
      for (const subDept of retreat.subDepartments) {
        await this.createRetreatTable({
          retreatId: id,
          subDepartment: subDept,
          name: `${subDept} Table`,
          status: 'pending',
          fdId: null,
          gcId: null,
          gmId: null,
        });
      }

      this.retreats.set(id, retreat);
      return retreat;
    }
    return undefined;
  }

  async getRetreatByJoinCode(joinCode: string): Promise<Retreat | undefined> {
    return Array.from(this.retreats.values()).find(
      (r) => r.joinCode === joinCode,
    );
  }

  async createRetreatTable(table: InsertRetreatTable): Promise<RetreatTable> {
    const id = randomUUID();
    const newTable: RetreatTable = {
      ...table,
      id,
      status: table.status || 'pending',
      currentStage: table.currentStage || 'registration',
      fdId: table.fdId || null,
      gcId: table.gcId || null,
      gmId: table.gmId || null,
      createdAt: new Date(),
    };
    this.retreatTables.set(id, newTable);
    return newTable;
  }

  async getRetreatTable(id: string): Promise<RetreatTable | undefined> {
    return this.retreatTables.get(id);
  }

  async getRetreatTables(retreatId: string): Promise<RetreatTable[]> {
    return Array.from(this.retreatTables.values()).filter(
      (t) => t.retreatId === retreatId,
    );
  }

  async updateRetreatTable(
    id: string,
    updates: Partial<RetreatTable>,
  ): Promise<RetreatTable | undefined> {
    const table = this.retreatTables.get(id);
    if (table) {
      const updated = { ...table, ...updates };
      this.retreatTables.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async createRetreatTableEntry(
    entry: InsertRetreatTableEntry,
  ): Promise<RetreatTableEntry> {
    const id = randomUUID();
    const newEntry: RetreatTableEntry = {
      ...entry,
      id,
      description: entry.description ?? null,
      status: entry.status || 'active',
      impactScore: entry.impactScore ?? null,
      probabilityScore: entry.probabilityScore ?? null,
      voteCount: entry.voteCount ?? 0,
      createdAt: new Date(),
    };
    this.retreatTableEntries.set(id, newEntry);
    return newEntry;
  }

  async getRetreatTableEntries(tableId: string): Promise<RetreatTableEntry[]> {
    return Array.from(this.retreatTableEntries.values()).filter(
      (e) => e.tableId === tableId,
    );
  }

  async getRetreatTableEntriesByType(
    tableId: string,
    category: string,
  ): Promise<RetreatTableEntry[]> {
    return Array.from(this.retreatTableEntries.values()).filter(
      (e) => e.tableId === tableId && e.category === category,
    );
  }

  async updateRetreatTableEntry(
    id: string,
    updates: Partial<RetreatTableEntry>,
  ): Promise<RetreatTableEntry | undefined> {
    const entry = this.retreatTableEntries.get(id);
    if (entry) {
      const updated = { ...entry, ...updates };
      this.retreatTableEntries.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteRetreatTableEntry(id: string): Promise<void> {
    this.retreatTableEntries.delete(id);
  }

  async createRetreatEntryVote(
    vote: InsertRetreatEntryVote,
  ): Promise<RetreatEntryVote> {
    const id = randomUUID();
    const newVote: RetreatEntryVote = {
      ...vote,
      id,
      createdAt: new Date(),
    };
    this.retreatEntryVotes.set(id, newVote);
    return newVote;
  }

  async getRetreatEntryVotes(entryId: string): Promise<RetreatEntryVote[]> {
    return Array.from(this.retreatEntryVotes.values()).filter(
      (v) => v.entryId === entryId,
    );
  }

  async getScoredEntriesByTable(
    tableId: string,
  ): Promise<RetreatEntryScored[]> {
    const entries = await this.getRetreatTableEntries(tableId);
    const scoredEntries: RetreatEntryScored[] = [];

    for (const entry of entries) {
      const votes = await this.getRetreatEntryVotes(entry.id);
      const voteCount = votes.length;
      const avgImpact =
        voteCount > 0
          ? votes.reduce((sum, v) => sum + v.impact, 0) / voteCount
          : 0;
      const avgProbability =
        voteCount > 0
          ? votes.reduce((sum, v) => sum + v.probability, 0) / voteCount
          : 0;
      const totalScore = avgImpact * avgProbability;

      scoredEntries.push({
        ...entry,
        avgImpact: Math.round(avgImpact * 100) / 100,
        avgProbability: Math.round(avgProbability * 100) / 100,
        totalScore: Math.round(totalScore * 100) / 100,
        voteCount,
      });
    }

    // Sort by total score descending and assign ranks
    scoredEntries.sort((a, b) => b.totalScore - a.totalScore);
    scoredEntries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return scoredEntries;
  }

  async addRetreatParticipant(
    participant: InsertRetreatParticipant,
  ): Promise<RetreatParticipant> {
    const id = randomUUID();
    const newParticipant: RetreatParticipant = {
      ...participant,
      id,
      tableId: participant.tableId || null,
      role: participant.role || 'player',
      joinedAt: new Date(),
    };
    this.retreatParticipants.set(id, newParticipant);
    return newParticipant;
  }

  async getRetreatParticipants(
    retreatId: string,
  ): Promise<RetreatParticipant[]> {
    return Array.from(this.retreatParticipants.values()).filter(
      (p) => p.retreatId === retreatId,
    );
  }

  async getTableParticipants(tableId: string): Promise<RetreatParticipant[]> {
    return Array.from(this.retreatParticipants.values()).filter(
      (p) => p.tableId === tableId,
    );
  }

  async removeRetreatParticipant(id: string): Promise<void> {
    this.retreatParticipants.delete(id);
  }

  async createRetreatTableReport(
    report: InsertRetreatTableReport,
  ): Promise<RetreatTableReport> {
    const id = randomUUID();
    const newReport: RetreatTableReport = {
      ...report,
      id,
      summary: report.summary || null,
      keyFindings: report.keyFindings || null,
      rankings: report.rankings || null,
      notes: report.notes || null,
      decisions: report.decisions || null,
      status: report.status || 'draft',
      submittedBy: report.submittedBy || null,
      submittedAt: null,
      createdAt: new Date(),
    };
    this.retreatTableReports.set(id, newReport);
    return newReport;
  }

  async getRetreatTableReport(
    tableId: string,
  ): Promise<RetreatTableReport | undefined> {
    return Array.from(this.retreatTableReports.values()).find(
      (r) => r.tableId === tableId,
    );
  }

  async updateRetreatTableReport(
    id: string,
    updates: Partial<RetreatTableReport>,
  ): Promise<RetreatTableReport | undefined> {
    const report = this.retreatTableReports.get(id);
    if (report) {
      const updated = { ...report, ...updates };
      this.retreatTableReports.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async submitRetreatTableReport(
    id: string,
    submittedBy: string,
  ): Promise<RetreatTableReport | undefined> {
    const report = this.retreatTableReports.get(id);
    if (report) {
      report.status = 'submitted';
      report.submittedBy = submittedBy;
      report.submittedAt = new Date();
      this.retreatTableReports.set(id, report);
      return report;
    }
    return undefined;
  }

  async createRetreatConsolidatedReport(
    report: InsertRetreatConsolidatedReport,
  ): Promise<RetreatConsolidatedReport> {
    const id = randomUUID();
    const newReport: RetreatConsolidatedReport = {
      ...report,
      id,
      executiveSummary: report.executiveSummary || null,
      crossTablePatterns: report.crossTablePatterns || null,
      keyFindings: report.keyFindings || null,
      strategicRecommendations: report.strategicRecommendations || null,
      status: report.status || 'draft',
      submittedBy: report.submittedBy || null,
      submittedAt: null,
      approvedBy: report.approvedBy || null,
      approvedAt: null,
      createdAt: new Date(),
    };
    this.retreatConsolidatedReports.set(id, newReport);
    return newReport;
  }

  async getRetreatConsolidatedReport(
    retreatId: string,
  ): Promise<RetreatConsolidatedReport | undefined> {
    return Array.from(this.retreatConsolidatedReports.values()).find(
      (r) => r.retreatId === retreatId,
    );
  }

  async updateRetreatConsolidatedReport(
    id: string,
    updates: Partial<RetreatConsolidatedReport>,
  ): Promise<RetreatConsolidatedReport | undefined> {
    const report = this.retreatConsolidatedReports.get(id);
    if (report) {
      const updated = { ...report, ...updates };
      this.retreatConsolidatedReports.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async submitRetreatConsolidatedReport(
    id: string,
    submittedBy: string,
  ): Promise<RetreatConsolidatedReport | undefined> {
    const report = this.retreatConsolidatedReports.get(id);
    if (report) {
      report.status = 'submitted';
      report.submittedBy = submittedBy;
      report.submittedAt = new Date();
      this.retreatConsolidatedReports.set(id, report);
      return report;
    }
    return undefined;
  }

  async approveRetreatConsolidatedReport(
    id: string,
    approvedBy: string,
  ): Promise<RetreatConsolidatedReport | undefined> {
    const report = this.retreatConsolidatedReports.get(id);
    if (report) {
      report.status = 'approved';
      report.approvedBy = approvedBy;
      report.approvedAt = new Date();
      this.retreatConsolidatedReports.set(id, report);

      // Also mark the retreat as completed
      const retreat = await this.getRetreat(report.retreatId);
      if (retreat) {
        await this.updateRetreat(retreat.id, {
          status: 'completed',
          completedAt: new Date(),
        });
      }

      return report;
    }
    return undefined;
  }

  // ============ FUTURE RETREAT GAME STAGE OPERATIONS ============

  async createStageProgress(
    progress: InsertRetreatStageProgress,
  ): Promise<RetreatStageProgress> {
    const id = randomUUID();
    const newProgress: RetreatStageProgress = {
      ...progress,
      id,
      status: progress.status || 'pending',
      maxSubmissionsPerPlayer: progress.maxSubmissionsPerPlayer || 3,
      submissionDeadline: progress.submissionDeadline || null,
      votingDeadline: progress.votingDeadline || null,
      lockedAt: null,
      lockedBy: progress.lockedBy || null,
      createdAt: new Date(),
    };
    this.stageProgress.set(id, newProgress);
    return newProgress;
  }

  async getStageProgress(
    tableId: string,
    stage: string,
  ): Promise<RetreatStageProgress | undefined> {
    return Array.from(this.stageProgress.values()).find(
      (p) => p.tableId === tableId && p.stage === stage,
    );
  }

  async getTableStageProgress(
    tableId: string,
  ): Promise<RetreatStageProgress[]> {
    return Array.from(this.stageProgress.values()).filter(
      (p) => p.tableId === tableId,
    );
  }

  async updateStageProgress(
    id: string,
    updates: Partial<RetreatStageProgress>,
  ): Promise<RetreatStageProgress | undefined> {
    const progress = this.stageProgress.get(id);
    if (progress) {
      const updated = { ...progress, ...updates };
      this.stageProgress.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async lockStage(
    id: string,
    lockedBy: string,
  ): Promise<RetreatStageProgress | undefined> {
    const progress = this.stageProgress.get(id);
    if (progress) {
      progress.status = 'locked';
      progress.lockedAt = new Date();
      progress.lockedBy = lockedBy;
      this.stageProgress.set(id, progress);
      return progress;
    }
    return undefined;
  }

  async createStageSubmission(
    submission: InsertRetreatStageSubmission,
  ): Promise<RetreatStageSubmission> {
    const id = randomUUID();
    const newSubmission: RetreatStageSubmission = {
      ...submission,
      id,
      description: submission.description || null,
      theme: submission.theme || null,
      priority: submission.priority || 0,
      status: submission.status || 'active',
      createdAt: new Date(),
    };
    this.stageSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getStageSubmissions(
    stageProgressId: string,
  ): Promise<RetreatStageSubmission[]> {
    return Array.from(this.stageSubmissions.values()).filter(
      (s) => s.stageProgressId === stageProgressId,
    );
  }

  async getPlayerStageSubmissions(
    stageProgressId: string,
    playerId: string,
  ): Promise<RetreatStageSubmission[]> {
    return Array.from(this.stageSubmissions.values()).filter(
      (s) => s.stageProgressId === stageProgressId && s.playerId === playerId,
    );
  }

  async updateStageSubmission(
    id: string,
    updates: Partial<RetreatStageSubmission>,
  ): Promise<RetreatStageSubmission | undefined> {
    const submission = this.stageSubmissions.get(id);
    if (submission) {
      const updated = { ...submission, ...updates };
      this.stageSubmissions.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async createStageConsolidation(
    consolidation: InsertRetreatStageConsolidation,
  ): Promise<RetreatStageConsolidation> {
    const id = randomUUID();
    const newConsolidation: RetreatStageConsolidation = {
      ...consolidation,
      id,
      description: consolidation.description || null,
      mergedFromIds: consolidation.mergedFromIds || null,
      groupName: consolidation.groupName || null,
      avgImpact: consolidation.avgImpact || null,
      avgProbability: consolidation.avgProbability || null,
      totalVotes: consolidation.totalVotes || 0,
      rank: consolidation.rank || null,
      isSelected: consolidation.isSelected || false,
      createdAt: new Date(),
    };
    this.stageConsolidations.set(id, newConsolidation);
    return newConsolidation;
  }

  async getStageConsolidations(
    stageProgressId: string,
  ): Promise<RetreatStageConsolidation[]> {
    return Array.from(this.stageConsolidations.values()).filter(
      (c) => c.stageProgressId === stageProgressId,
    );
  }

  async updateStageConsolidation(
    id: string,
    updates: Partial<RetreatStageConsolidation>,
  ): Promise<RetreatStageConsolidation | undefined> {
    const consolidation = this.stageConsolidations.get(id);
    if (consolidation) {
      const updated = { ...consolidation, ...updates };
      this.stageConsolidations.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async createConsolidationVote(
    vote: InsertRetreatConsolidationVote,
  ): Promise<RetreatConsolidationVote> {
    const id = randomUUID();
    const newVote: RetreatConsolidationVote = {
      ...vote,
      id,
      createdAt: new Date(),
    };
    this.consolidationVotes.set(id, newVote);

    // Update consolidation vote count and averages
    const consolidation = this.stageConsolidations.get(vote.consolidationId);
    if (consolidation) {
      const allVotes = await this.getConsolidationVotes(vote.consolidationId);
      const totalVotes = allVotes.length;
      const avgImpact =
        allVotes.reduce((sum, v) => sum + v.impact, 0) / totalVotes;
      const avgProbability =
        allVotes.reduce((sum, v) => sum + v.probability, 0) / totalVotes;
      await this.updateStageConsolidation(vote.consolidationId, {
        totalVotes,
        avgImpact,
        avgProbability,
      });
    }

    return newVote;
  }

  async getConsolidationVotes(
    consolidationId: string,
  ): Promise<RetreatConsolidationVote[]> {
    return Array.from(this.consolidationVotes.values()).filter(
      (v) => v.consolidationId === consolidationId,
    );
  }

  async createStageReport(
    report: InsertRetreatStageReport,
  ): Promise<RetreatStageReport> {
    const id = randomUUID();
    const newReport: RetreatStageReport = {
      ...report,
      id,
      selectedItems: report.selectedItems || null,
      summary: report.summary || null,
      createdAt: new Date(),
    };
    this.stageReports.set(id, newReport);
    return newReport;
  }

  async getStageReport(
    stageProgressId: string,
  ): Promise<RetreatStageReport | undefined> {
    return Array.from(this.stageReports.values()).find(
      (r) => r.stageProgressId === stageProgressId,
    );
  }
}

export const storage = new MemStorage();
