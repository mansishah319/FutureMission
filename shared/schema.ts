import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  real,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull().default('player'),
  department: text('department'),
  displayName: text('display_name'),
  totalPoints: integer('total_points').notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  department: true,
  displayName: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const THEMES = [
  'Technology',
  'Social',
  'Economic',
  'Environmental',
  'Political',
  'Security',
] as const;

export type ThemeType = (typeof THEMES)[number];

export const games = pgTable('games', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').notNull().default('draft'),
  gameMasterId: varchar('game_master_id').references(() => users.id),
  currentStage: text('current_stage').notNull().default('config'),
  selectedThemes: text('selected_themes').array(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
  createdAt: true,
});

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

export const challenges = pgTable('challenges', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => games.id)
    .notNull(),
  theme: text('theme').notNull(),
  content: text('content').notNull(),
  submittedBy: varchar('submitted_by').references(() => users.id),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
  createdAt: true,
});

export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challenges.$inferSelect;

export const challengeVotes = pgTable('challenge_votes', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  challengeId: varchar('challenge_id')
    .references(() => challenges.id)
    .notNull(),
  gameId: varchar('game_id')
    .references(() => games.id)
    .notNull(),
  voterId: varchar('voter_id')
    .references(() => users.id)
    .notNull(),
  impact: integer('impact').notNull(),
  probability: integer('probability').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertChallengeVoteSchema = createInsertSchema(
  challengeVotes,
).omit({
  id: true,
  createdAt: true,
});

export type InsertChallengeVote = z.infer<typeof insertChallengeVoteSchema>;
export type ChallengeVote = typeof challengeVotes.$inferSelect;

export const playerReports = pgTable('player_reports', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => games.id)
    .notNull(),
  playerId: varchar('player_id')
    .references(() => users.id)
    .notNull(),
  theme: text('theme').notNull(),
  content: text('content').notNull(),
  risks: text('risks'),
  opportunities: text('opportunities'),
  recommendations: text('recommendations'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertPlayerReportSchema = createInsertSchema(playerReports).omit({
  id: true,
  createdAt: true,
});

export type InsertPlayerReport = z.infer<typeof insertPlayerReportSchema>;
export type PlayerReport = typeof playerReports.$inferSelect;

export const consolidatedReports = pgTable('consolidated_reports', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => games.id)
    .notNull(),
  gameMasterId: varchar('game_master_id')
    .references(() => users.id)
    .notNull(),
  executiveSummary: text('executive_summary'),
  keyFindings: text('key_findings'),
  risks: text('risks'),
  opportunities: text('opportunities'),
  recommendations: text('recommendations'),
  status: text('status').notNull().default('draft'),
  submittedAt: timestamp('submitted_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertConsolidatedReportSchema = createInsertSchema(
  consolidatedReports,
).omit({
  id: true,
  createdAt: true,
  submittedAt: true,
});

export type InsertConsolidatedReport = z.infer<
  typeof insertConsolidatedReportSchema
>;
export type ConsolidatedReport = typeof consolidatedReports.$inferSelect;

export const gameParticipants = pgTable('game_participants', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => games.id)
    .notNull(),
  userId: varchar('user_id')
    .references(() => users.id)
    .notNull(),
  role: text('role').notNull().default('player'),
  pointsEarned: integer('points_earned').notNull().default(0),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const insertGameParticipantSchema = createInsertSchema(
  gameParticipants,
).omit({
  id: true,
  joinedAt: true,
});

export type InsertGameParticipant = z.infer<typeof insertGameParticipantSchema>;
export type GameParticipant = typeof gameParticipants.$inferSelect;

export const themeScoresSchema = z.object({
  theme: z.enum(THEMES),
  totalImpact: z.number(),
  totalProbability: z.number(),
  averageImpact: z.number(),
  averageProbability: z.number(),
  totalScore: z.number(),
  voteCount: z.number(),
});

export type ThemeScore = z.infer<typeof themeScoresSchema>;

export const leaderboardEntrySchema = z.object({
  userId: z.string(),
  username: z.string(),
  displayName: z.string().optional(),
  department: z.string().optional(),
  role: z.string(),
  totalPoints: z.number(),
  gamesParticipated: z.number(),
  gameDetails: z.array(
    z.object({
      gameId: z.string(),
      gameTitle: z.string(),
      pointsEarned: z.number(),
    }),
  ),
});

export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;

export const focalIssues = pgTable('focal_issues', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => games.id)
    .notNull(),
  playerId: varchar('player_id')
    .references(() => users.id)
    .notNull(),
  content: text('content').notNull(),
  voteCount: integer('vote_count').notNull().default(0),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertFocalIssueSchema = createInsertSchema(focalIssues).omit({
  id: true,
  createdAt: true,
  voteCount: true,
});

export type InsertFocalIssue = z.infer<typeof insertFocalIssueSchema>;
export type FocalIssue = typeof focalIssues.$inferSelect;

export const focalIssueVotes = pgTable('focal_issue_votes', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  focalIssueId: varchar('focal_issue_id')
    .references(() => focalIssues.id)
    .notNull(),
  gameId: varchar('game_id')
    .references(() => games.id)
    .notNull(),
  voterId: varchar('voter_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertFocalIssueVoteSchema = createInsertSchema(
  focalIssueVotes,
).omit({
  id: true,
  createdAt: true,
});

export type InsertFocalIssueVote = z.infer<typeof insertFocalIssueVoteSchema>;
export type FocalIssueVote = typeof focalIssueVotes.$inferSelect;

export const keyEventReports = pgTable('key_event_reports', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => games.id)
    .notNull(),
  playerId: varchar('player_id')
    .references(() => users.id)
    .notNull(),
  risks: text('risks'),
  opportunities: text('opportunities'),
  narrative: text('narrative'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertKeyEventReportSchema = createInsertSchema(
  keyEventReports,
).omit({
  id: true,
  createdAt: true,
});

export type InsertKeyEventReport = z.infer<typeof insertKeyEventReportSchema>;
export type KeyEventReport = typeof keyEventReports.$inferSelect;

export const gameHistorySchema = z.object({
  gameId: z.string(),
  gameTitle: z.string(),
  datePlayed: z.string(),
  rolePlayed: z.string(),
  pointsEarned: z.number(),
  status: z.string(),
});

export type GameHistory = z.infer<typeof gameHistorySchema>;

export const playerStatsSchema = z.object({
  userId: z.string(),
  username: z.string(),
  displayName: z.string().optional(),
  department: z.string().optional(),
  totalGamesPlayed: z.number(),
  totalPointsEarned: z.number(),
  bestPerformingGame: z
    .object({
      gameId: z.string(),
      gameTitle: z.string(),
      pointsEarned: z.number(),
    })
    .optional(),
  highestScoringStage: z.string().optional(),
  gameBreakdown: z.array(
    z.object({
      gameId: z.string(),
      gameTitle: z.string(),
      pointsEarned: z.number(),
      datePlayed: z.string(),
    }),
  ),
});

export type PlayerStats = z.infer<typeof playerStatsSchema>;

// ============ FUTURE RETREAT MODULE ============

export const RETREAT_ENTRY_TYPES = [
  'work_issue',
  'future_challenge',
  'future_opportunity',
  'future_risk',
] as const;

export type RetreatEntryType = (typeof RETREAT_ENTRY_TYPES)[number];

export const RETREAT_STATUS = [
  'draft',
  'pending_approval',
  'approved',
  'in_progress',
  'completed',
  'rejected',
] as const;

export type RetreatStatus = (typeof RETREAT_STATUS)[number];

export const LINKED_SOURCE_TYPES = [
  'scenario_planning',
  'sfa_collateral',
  'standalone',
] as const;

export type LinkedSourceType = (typeof LINKED_SOURCE_TYPES)[number];

// Main Retreat Session
export const retreats = pgTable('retreats', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description'),
  department: text('department').notNull(),
  subDepartments: text('sub_departments').array().notNull(),
  linkedSourceType: text('linked_source_type').notNull().default('standalone'),
  linkedSourceId: varchar('linked_source_id'),
  joinCode: varchar('join_code', { length: 8 }),
  status: text('status').notNull().default('draft'),
  createdBy: varchar('created_by')
    .references(() => users.id)
    .notNull(),
  approvedBy: varchar('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertRetreatSchema = createInsertSchema(retreats).omit({
  id: true,
  createdAt: true,
  approvedAt: true,
  completedAt: true,
  joinCode: true,
});

export type InsertRetreat = z.infer<typeof insertRetreatSchema>;
export type Retreat = typeof retreats.$inferSelect;

// Retreat Tables (one per sub-department / team)
export const retreatTables = pgTable('retreat_tables', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  retreatId: varchar('retreat_id')
    .references(() => retreats.id)
    .notNull(),
  subDepartment: text('sub_department').notNull(),
  name: text('name').notNull(),
  status: text('status').notNull().default('pending'),
  currentStage: text('current_stage').notNull().default('registration'),
  fdId: varchar('fd_id').references(() => users.id),
  gcId: varchar('gc_id').references(() => users.id), // Coordinator
  gmId: varchar('gm_id').references(() => users.id), // Game Master
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertRetreatTableSchema = createInsertSchema(retreatTables).omit({
  id: true,
  createdAt: true,
});

export type InsertRetreatTable = z.infer<typeof insertRetreatTableSchema>;
export type RetreatTable = typeof retreatTables.$inferSelect;

// Retreat Table Entries (Work Issues, Challenges, Opportunities, Risks)
export const retreatTableEntries = pgTable('retreat_table_entries', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  tableId: varchar('table_id')
    .references(() => retreatTables.id)
    .notNull(),
  retreatId: varchar('retreat_id')
    .references(() => retreats.id)
    .notNull(),
  category: text('category').notNull(), // work_issues, future_challenges, opportunities, risks
  title: text('title').notNull(),
  description: text('description'),
  theme: text('theme').notNull(), // technology, social, economic, environmental, political, security
  createdBy: varchar('created_by')
    .references(() => users.id)
    .notNull(),
  impactScore: real('impact_score'),
  probabilityScore: real('probability_score'),
  voteCount: integer('vote_count').default(0),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertRetreatTableEntrySchema = createInsertSchema(
  retreatTableEntries,
).omit({
  id: true,
  createdAt: true,
});

export type InsertRetreatTableEntry = z.infer<
  typeof insertRetreatTableEntrySchema
>;
export type RetreatTableEntry = typeof retreatTableEntries.$inferSelect;

// Retreat Entry Votes (Impact & Probability)
export const retreatEntryVotes = pgTable('retreat_entry_votes', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  entryId: varchar('entry_id')
    .references(() => retreatTableEntries.id)
    .notNull(),
  tableId: varchar('table_id')
    .references(() => retreatTables.id)
    .notNull(),
  voterId: varchar('voter_id')
    .references(() => users.id)
    .notNull(),
  impact: integer('impact').notNull(),
  probability: integer('probability').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertRetreatEntryVoteSchema = createInsertSchema(
  retreatEntryVotes,
).omit({
  id: true,
  createdAt: true,
});

export type InsertRetreatEntryVote = z.infer<
  typeof insertRetreatEntryVoteSchema
>;
export type RetreatEntryVote = typeof retreatEntryVotes.$inferSelect;

// Retreat Participants
export const retreatParticipants = pgTable('retreat_participants', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  retreatId: varchar('retreat_id')
    .references(() => retreats.id)
    .notNull(),
  tableId: varchar('table_id').references(() => retreatTables.id),
  userId: varchar('user_id')
    .references(() => users.id)
    .notNull(),
  role: text('role').notNull().default('player'),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const insertRetreatParticipantSchema = createInsertSchema(
  retreatParticipants,
).omit({
  id: true,
  joinedAt: true,
});

export type InsertRetreatParticipant = z.infer<
  typeof insertRetreatParticipantSchema
>;
export type RetreatParticipant = typeof retreatParticipants.$inferSelect;

// Table-Level Reports
export const retreatTableReports = pgTable('retreat_table_reports', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  tableId: varchar('table_id')
    .references(() => retreatTables.id)
    .notNull(),
  retreatId: varchar('retreat_id')
    .references(() => retreats.id)
    .notNull(),
  summary: text('summary'),
  keyFindings: text('key_findings'),
  rankings: jsonb('rankings'),
  notes: text('notes'),
  decisions: text('decisions'),
  status: text('status').notNull().default('draft'),
  submittedBy: varchar('submitted_by').references(() => users.id),
  submittedAt: timestamp('submitted_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertRetreatTableReportSchema = createInsertSchema(
  retreatTableReports,
).omit({
  id: true,
  createdAt: true,
  submittedAt: true,
});

export type InsertRetreatTableReport = z.infer<
  typeof insertRetreatTableReportSchema
>;
export type RetreatTableReport = typeof retreatTableReports.$inferSelect;

// Consolidated Retreat Report
export const retreatConsolidatedReports = pgTable(
  'retreat_consolidated_reports',
  {
    id: varchar('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    retreatId: varchar('retreat_id')
      .references(() => retreats.id)
      .notNull(),
    executiveSummary: text('executive_summary'),
    crossTablePatterns: text('cross_table_patterns'),
    keyFindings: text('key_findings'),
    strategicRecommendations: text('strategic_recommendations'),
    status: text('status').notNull().default('draft'),
    submittedBy: varchar('submitted_by').references(() => users.id),
    submittedAt: timestamp('submitted_at'),
    approvedBy: varchar('approved_by').references(() => users.id),
    approvedAt: timestamp('approved_at'),
    createdAt: timestamp('created_at').defaultNow(),
  },
);

export const insertRetreatConsolidatedReportSchema = createInsertSchema(
  retreatConsolidatedReports,
).omit({
  id: true,
  createdAt: true,
  submittedAt: true,
  approvedAt: true,
});

export type InsertRetreatConsolidatedReport = z.infer<
  typeof insertRetreatConsolidatedReportSchema
>;
export type RetreatConsolidatedReport =
  typeof retreatConsolidatedReports.$inferSelect;

// ============ FUTURE RETREAT GAME STAGES ============

export const RETREAT_GAME_STAGES = [
  'registration',
  'obstacles',
  'challenges',
  'risks',
  'opportunities',
  'priorities',
  'goals',
  'partnerships',
  'services',
  'projects',
  'report_compilation',
  'completed',
] as const;

export type RetreatGameStage = (typeof RETREAT_GAME_STAGES)[number];

// Stage progress per team (table)
export const retreatStageProgress = pgTable('retreat_stage_progress', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  tableId: varchar('table_id')
    .references(() => retreatTables.id)
    .notNull(),
  retreatId: varchar('retreat_id')
    .references(() => retreats.id)
    .notNull(),
  stage: text('stage').notNull(),
  status: text('status').notNull().default('pending'), // pending, active, voting, consolidating, locked
  maxSubmissionsPerPlayer: integer('max_submissions_per_player').default(3),
  submissionDeadline: timestamp('submission_deadline'),
  votingDeadline: timestamp('voting_deadline'),
  lockedAt: timestamp('locked_at'),
  lockedBy: varchar('locked_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertRetreatStageProgressSchema = createInsertSchema(
  retreatStageProgress,
).omit({
  id: true,
  createdAt: true,
  lockedAt: true,
});

export type InsertRetreatStageProgress = z.infer<
  typeof insertRetreatStageProgressSchema
>;
export type RetreatStageProgress = typeof retreatStageProgress.$inferSelect;

// Expert submissions per stage (max 3 per player per stage)
export const retreatStageSubmissions = pgTable('retreat_stage_submissions', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  stageProgressId: varchar('stage_progress_id')
    .references(() => retreatStageProgress.id)
    .notNull(),
  tableId: varchar('table_id')
    .references(() => retreatTables.id)
    .notNull(),
  retreatId: varchar('retreat_id')
    .references(() => retreats.id)
    .notNull(),
  stage: text('stage').notNull(),
  playerId: varchar('player_id')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull(),
  description: text('description'),
  theme: text('theme'),
  priority: integer('priority').default(0),
  status: text('status').notNull().default('active'), // active, merged, archived
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertRetreatStageSubmissionSchema = createInsertSchema(
  retreatStageSubmissions,
).omit({
  id: true,
  createdAt: true,
});

export type InsertRetreatStageSubmission = z.infer<
  typeof insertRetreatStageSubmissionSchema
>;
export type RetreatStageSubmission =
  typeof retreatStageSubmissions.$inferSelect;

// Coordinator consolidations (merged/grouped items)
export const retreatStageConsolidations = pgTable(
  'retreat_stage_consolidations',
  {
    id: varchar('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    stageProgressId: varchar('stage_progress_id')
      .references(() => retreatStageProgress.id)
      .notNull(),
    tableId: varchar('table_id')
      .references(() => retreatTables.id)
      .notNull(),
    stage: text('stage').notNull(),
    coordinatorId: varchar('coordinator_id')
      .references(() => users.id)
      .notNull(),
    title: text('title').notNull(),
    description: text('description'),
    mergedFromIds: text('merged_from_ids').array(), // IDs of original submissions that were merged
    groupName: text('group_name'),
    avgImpact: real('avg_impact'),
    avgProbability: real('avg_probability'),
    totalVotes: integer('total_votes').default(0),
    rank: integer('rank'),
    isSelected: boolean('is_selected').default(false),
    createdAt: timestamp('created_at').defaultNow(),
  },
);

export const insertRetreatStageConsolidationSchema = createInsertSchema(
  retreatStageConsolidations,
).omit({
  id: true,
  createdAt: true,
});

export type InsertRetreatStageConsolidation = z.infer<
  typeof insertRetreatStageConsolidationSchema
>;
export type RetreatStageConsolidation =
  typeof retreatStageConsolidations.$inferSelect;

// Votes on consolidations
export const retreatConsolidationVotes = pgTable(
  'retreat_consolidation_votes',
  {
    id: varchar('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    consolidationId: varchar('consolidation_id')
      .references(() => retreatStageConsolidations.id)
      .notNull(),
    tableId: varchar('table_id')
      .references(() => retreatTables.id)
      .notNull(),
    voterId: varchar('voter_id')
      .references(() => users.id)
      .notNull(),
    impact: integer('impact').notNull(), // 1-5
    probability: integer('probability').notNull(), // 1-5
    createdAt: timestamp('created_at').defaultNow(),
  },
);

export const insertRetreatConsolidationVoteSchema = createInsertSchema(
  retreatConsolidationVotes,
).omit({
  id: true,
  createdAt: true,
});

export type InsertRetreatConsolidationVote = z.infer<
  typeof insertRetreatConsolidationVoteSchema
>;
export type RetreatConsolidationVote =
  typeof retreatConsolidationVotes.$inferSelect;

// Team stage reports (per stage per team)
export const retreatStageReports = pgTable('retreat_stage_reports', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  stageProgressId: varchar('stage_progress_id')
    .references(() => retreatStageProgress.id)
    .notNull(),
  tableId: varchar('table_id')
    .references(() => retreatTables.id)
    .notNull(),
  stage: text('stage').notNull(),
  selectedItems: jsonb('selected_items'), // Top voted/selected consolidations
  summary: text('summary'),
  createdBy: varchar('created_by')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertRetreatStageReportSchema = createInsertSchema(
  retreatStageReports,
).omit({
  id: true,
  createdAt: true,
});

export type InsertRetreatStageReport = z.infer<
  typeof insertRetreatStageReportSchema
>;
export type RetreatStageReport = typeof retreatStageReports.$inferSelect;

// Scored entry with vote aggregation
export const retreatEntryScoredSchema = z.object({
  id: z.string(),
  tableId: z.string(),
  retreatId: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  theme: z.string(),
  createdBy: z.string(),
  status: z.string(),
  impactScore: z.number().nullable(),
  probabilityScore: z.number().nullable(),
  createdAt: z.date().nullable(),
  avgImpact: z.number(),
  avgProbability: z.number(),
  totalScore: z.number(),
  voteCount: z.number(),
  rank: z.number().optional(),
});

export type RetreatEntryScored = z.infer<typeof retreatEntryScoredSchema>;

// Strategic Foresight Game Schema
export const FORESIGHT_PHASES = [
  'lobby',
  'focal_topics',
  'focal_voting',
  'theme_assignment',
  'challenges',
  'challenge_voting',
  'reports',
  'completed',
] as const;

export type ForesightPhase = (typeof FORESIGHT_PHASES)[number];

export const STEEP_THEMES = [
  'Social',
  'Technological',
  'Economic',
  'Environmental',
  'Political',
  'Security',
] as const;

export type SteepTheme = (typeof STEEP_THEMES)[number];

export const foresightGames = pgTable('foresight_games', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description'),
  objective: text('objective'),
  status: text('status').notNull().default('draft'),
  gameMasterId: varchar('game_master_id').references(() => users.id),
  currentPhase: text('current_phase').notNull().default('lobby'),
  phaseTimeLimit: integer('phase_time_limit').default(15),
  totalDuration: integer('total_duration').default(120),
  joinCode: text('join_code'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertForesightGameSchema = createInsertSchema(
  foresightGames,
).omit({
  id: true,
  createdAt: true,
});

export type InsertForesightGame = z.infer<typeof insertForesightGameSchema>;
export type ForesightGame = typeof foresightGames.$inferSelect;

export const foresightParticipants = pgTable('foresight_participants', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => foresightGames.id)
    .notNull(),
  userId: varchar('user_id')
    .references(() => users.id)
    .notNull(),
  assignedTheme: text('assigned_theme'),
  status: text('status').notNull().default('joined'),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const insertForesightParticipantSchema = createInsertSchema(
  foresightParticipants,
).omit({
  id: true,
  joinedAt: true,
});

export type InsertForesightParticipant = z.infer<
  typeof insertForesightParticipantSchema
>;
export type ForesightParticipant = typeof foresightParticipants.$inferSelect;

export const focalTopics = pgTable('focal_topics', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => foresightGames.id)
    .notNull(),
  title: text('title').notNull(),
  description: text('description'),
  submittedBy: varchar('submitted_by')
    .references(() => users.id)
    .notNull(),
  status: text('status').notNull().default('submitted'),
  isSelected: boolean('is_selected').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertFocalTopicSchema = createInsertSchema(focalTopics).omit({
  id: true,
  createdAt: true,
});

export type InsertFocalTopic = z.infer<typeof insertFocalTopicSchema>;
export type FocalTopic = typeof focalTopics.$inferSelect;

export const focalTopicVotes = pgTable('focal_topic_votes', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  topicId: varchar('topic_id')
    .references(() => focalTopics.id)
    .notNull(),
  gameId: varchar('game_id')
    .references(() => foresightGames.id)
    .notNull(),
  voterId: varchar('voter_id')
    .references(() => users.id)
    .notNull(),
  impact: integer('impact').notNull(),
  uncertainty: integer('uncertainty').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertFocalTopicVoteSchema = createInsertSchema(
  focalTopicVotes,
).omit({
  id: true,
  createdAt: true,
});

export type InsertFocalTopicVote = z.infer<typeof insertFocalTopicVoteSchema>;
export type FocalTopicVote = typeof focalTopicVotes.$inferSelect;

export const foresightChallenges = pgTable('foresight_challenges', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => foresightGames.id)
    .notNull(),
  theme: text('theme').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  whyItMatters: text('why_it_matters'),
  timeHorizon: text('time_horizon'),
  submittedBy: varchar('submitted_by')
    .references(() => users.id)
    .notNull(),
  status: text('status').notNull().default('submitted'),
  consolidatedInto: varchar('consolidated_into'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertForesightChallengeSchema = createInsertSchema(
  foresightChallenges,
).omit({
  id: true,
  createdAt: true,
});

export type InsertForesightChallenge = z.infer<
  typeof insertForesightChallengeSchema
>;
export type ForesightChallenge = typeof foresightChallenges.$inferSelect;

export const foresightChallengeVotes = pgTable('foresight_challenge_votes', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  challengeId: varchar('challenge_id')
    .references(() => foresightChallenges.id)
    .notNull(),
  gameId: varchar('game_id')
    .references(() => foresightGames.id)
    .notNull(),
  voterId: varchar('voter_id')
    .references(() => users.id)
    .notNull(),
  impact: integer('impact').notNull(),
  uncertainty: integer('uncertainty').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertForesightChallengeVoteSchema = createInsertSchema(
  foresightChallengeVotes,
).omit({
  id: true,
  createdAt: true,
});

export type InsertForesightChallengeVote = z.infer<
  typeof insertForesightChallengeVoteSchema
>;
export type ForesightChallengeVote =
  typeof foresightChallengeVotes.$inferSelect;

export const foresightReports = pgTable('foresight_reports', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => foresightGames.id)
    .notNull(),
  playerId: varchar('player_id')
    .references(() => users.id)
    .notNull(),
  theme: text('theme').notNull(),
  situation: text('situation'),
  risks: text('risks'),
  opportunities: text('opportunities'),
  signals: text('signals'),
  recommendations: text('recommendations'),
  completionPercent: integer('completion_percent').default(0),
  status: text('status').notNull().default('draft'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const insertForesightReportSchema = createInsertSchema(
  foresightReports,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertForesightReport = z.infer<typeof insertForesightReportSchema>;
export type ForesightReport = typeof foresightReports.$inferSelect;

export const timeExtensionRequests = pgTable('time_extension_requests', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: varchar('game_id')
    .references(() => foresightGames.id)
    .notNull(),
  phase: text('phase').notNull(),
  requestedBy: varchar('requested_by')
    .references(() => users.id)
    .notNull(),
  reason: text('reason'),
  status: text('status').notNull().default('pending'),
  approvedMinutes: integer('approved_minutes'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertTimeExtensionRequestSchema = createInsertSchema(
  timeExtensionRequests,
).omit({
  id: true,
  createdAt: true,
});

export type InsertTimeExtensionRequest = z.infer<
  typeof insertTimeExtensionRequestSchema
>;
export type TimeExtensionRequest = typeof timeExtensionRequests.$inferSelect;
