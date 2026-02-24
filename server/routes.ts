import type { Express } from 'express';
import { createServer, type Server } from 'http';
import { storage } from './storage';
import {
  insertChallengeVoteSchema,
  insertPlayerReportSchema,
  insertConsolidatedReportSchema,
  insertFocalIssueSchema,
  insertFocalIssueVoteSchema,
  insertKeyEventReportSchema,
  insertChallengeSchema,
  insertRetreatSchema,
  insertRetreatTableEntrySchema,
  insertRetreatEntryVoteSchema,
  insertRetreatParticipantSchema,
  insertRetreatTableReportSchema,
  insertRetreatConsolidatedReportSchema,
  insertRetreatStageProgressSchema,
  insertRetreatStageSubmissionSchema,
  insertRetreatStageConsolidationSchema,
  insertRetreatConsolidationVoteSchema,
  RETREAT_GAME_STAGES,
} from '@shared/schema';

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get('/api/games', async (req, res) => {
    const games = await storage.getAllGames();
    res.json(games);
  });

  app.get('/api/games/:id', async (req, res) => {
    const game = await storage.getGame(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  });

  app.patch('/api/games/:id', async (req, res) => {
    const game = await storage.updateGame(req.params.id, req.body);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  });

  app.patch('/api/games/:id/select-themes', async (req, res) => {
    const { themes } = req.body;
    if (!Array.isArray(themes) || themes.length !== 2) {
      return res
        .status(400)
        .json({ message: 'Exactly 2 themes must be selected' });
    }
    const game = await storage.updateGame(req.params.id, {
      selectedThemes: themes,
      currentStage: 'reports',
    });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  });

  app.get('/api/games/:gameId/challenges', async (req, res) => {
    const challenges = await storage.getChallengesByGame(req.params.gameId);
    res.json(challenges);
  });

  app.get('/api/games/:gameId/challenges/:theme', async (req, res) => {
    const challenges = await storage.getChallengesByGameAndTheme(
      req.params.gameId,
      req.params.theme,
    );
    res.json(challenges);
  });

  app.post('/api/votes', async (req, res) => {
    try {
      const validated = insertChallengeVoteSchema.parse(req.body);
      const vote = await storage.createVote(validated);
      res.status(201).json(vote);
    } catch (error) {
      res.status(400).json({ message: 'Invalid vote data' });
    }
  });

  app.get('/api/games/:gameId/votes', async (req, res) => {
    const votes = await storage.getVotesByGame(req.params.gameId);
    res.json(votes);
  });

  app.get('/api/games/:gameId/theme-scores', async (req, res) => {
    const scores = await storage.getThemeScores(req.params.gameId);
    res.json(scores);
  });

  app.get('/api/games/:gameId/player-reports', async (req, res) => {
    const reports = await storage.getPlayerReportsByGame(req.params.gameId);
    const users = await storage.getAllUsers();

    const enrichedReports = reports.map((report) => {
      const player = users.find((u) => u.id === report.playerId);
      return {
        ...report,
        playerName: player?.displayName || player?.username || 'Unknown',
        playerDepartment: player?.department || 'Unassigned',
        playerRole: player?.role || 'player',
      };
    });

    res.json(enrichedReports);
  });

  app.post('/api/player-reports', async (req, res) => {
    try {
      const validated = insertPlayerReportSchema.parse(req.body);
      const report = await storage.createPlayerReport(validated);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ message: 'Invalid report data' });
    }
  });

  app.get('/api/games/:gameId/consolidated-report', async (req, res) => {
    let report = await storage.getConsolidatedReportByGame(req.params.gameId);

    if (!report) {
      const playerReports = await storage.getPlayerReportsByGame(
        req.params.gameId,
      );
      const game = await storage.getGame(req.params.gameId);

      const combinedContent = playerReports.map((r) => r.content).join('\n\n');
      const combinedRisks = playerReports
        .map((r) => r.risks)
        .filter(Boolean)
        .join('\n');
      const combinedOpportunities = playerReports
        .map((r) => r.opportunities)
        .filter(Boolean)
        .join('\n');
      const combinedRecommendations = playerReports
        .map((r) => r.recommendations)
        .filter(Boolean)
        .join('\n');

      report = await storage.createConsolidatedReport({
        gameId: req.params.gameId,
        gameMasterId: game?.gameMasterId || '',
        executiveSummary: `Strategic Foresight Report for "${game?.title || 'Game Session'}"\n\nThis consolidated report combines insights from ${playerReports.length} participant submissions.`,
        keyFindings: combinedContent,
        risks: combinedRisks,
        opportunities: combinedOpportunities,
        recommendations: combinedRecommendations,
        status: 'draft',
      });
    }

    res.json(report);
  });

  app.patch('/api/consolidated-reports/:id', async (req, res) => {
    const report = await storage.updateConsolidatedReport(
      req.params.id,
      req.body,
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  });

  app.post('/api/consolidated-reports/:id/submit', async (req, res) => {
    const report = await storage.submitConsolidatedReport(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const game = await storage.getGame(report.gameId);
    if (game) {
      await storage.updateGame(game.id, {
        currentStage: 'completed',
        status: 'completed',
      });
    }

    res.json(report);
  });

  app.get('/api/games/:gameId/participants', async (req, res) => {
    const participants = await storage.getGameParticipants(req.params.gameId);
    const users = await storage.getAllUsers();

    const enrichedParticipants = participants.map((p) => {
      const user = users.find((u) => u.id === p.userId);
      return {
        ...p,
        displayName: user?.displayName || user?.username || 'Unknown',
        department: user?.department || 'Unassigned',
      };
    });

    res.json(enrichedParticipants);
  });

  app.get('/api/leaderboard', async (req, res) => {
    const leaderboard = await storage.getLeaderboard();
    res.json(leaderboard);
  });

  app.get('/api/leaderboard/by-department', async (req, res) => {
    const leaderboard = await storage.getLeaderboardByDepartment();
    res.json(leaderboard);
  });

  // Department analytics for admin/super admin leaderboard
  app.get('/api/leaderboard/department-analytics', async (req, res) => {
    const users = await storage.getAllUsers();
    const games = await storage.getAllGames();
    const retreats = await storage.getAllRetreats();
    const participants = await Promise.all(
      games.map((g) => storage.getGameParticipants(g.id)),
    );
    const allParticipants = participants.flat();

    const departments = [
      'Security Operations',
      'Traffic Division',
      'Cyber Crime',
      'Community Relations',
      'Strategic Planning',
      'Intelligence',
    ];

    const analytics = departments.map((dept) => {
      const deptUsers = users.filter((u) => u.department === dept);
      const deptParticipants = allParticipants.filter((p) => {
        const user = users.find((u) => u.id === p.userId);
        return user?.department === dept;
      });

      const totalPoints = deptUsers.reduce(
        (sum, u) => sum + (u.totalPoints || 0),
        0,
      );
      const gamesParticipated = new Set(deptParticipants.map((p) => p.gameId))
        .size;
      const retreatsInDept = retreats.filter(
        (r) => r.department === dept,
      ).length;
      const topPerformer = deptUsers.sort(
        (a, b) => (b.totalPoints || 0) - (a.totalPoints || 0),
      )[0];

      return {
        department: dept,
        totalPoints,
        participantCount: deptUsers.length,
        gamesParticipated,
        retreatsCount: retreatsInDept,
        topPerformer: topPerformer
          ? {
              id: topPerformer.id,
              displayName: topPerformer.displayName,
              points: topPerformer.totalPoints,
            }
          : null,
        avgScore:
          deptUsers.length > 0 ? Math.round(totalPoints / deptUsers.length) : 0,
      };
    });

    res.json(analytics.sort((a, b) => b.totalPoints - a.totalPoints));
  });

  // Leaderboard overview with role-based stats
  app.get('/api/leaderboard/overview', async (req, res) => {
    const { department } = req.query;
    const users = await storage.getAllUsers();
    const games = await storage.getAllGames();
    const retreats = await storage.getAllRetreats();
    const allParticipants = (
      await Promise.all(games.map((g) => storage.getGameParticipants(g.id)))
    ).flat();

    // If department filter, show only that department's participants
    let filteredUsers = users;
    if (department && typeof department === 'string') {
      filteredUsers = users.filter((u) => u.department === department);
    }

    const completedGames = games.filter((g) => g.status === 'completed').length;
    const activeGames = games.filter((g) => g.status === 'in_progress').length;
    const activeRetreats = retreats.filter(
      (r) => r.status === 'in_progress',
    ).length;

    // Calculate highest scorer
    const sortedUsers = [...filteredUsers].sort(
      (a, b) => (b.totalPoints || 0) - (a.totalPoints || 0),
    );
    const highestScorer = sortedUsers[0];

    // Build participant list with game details
    const participantList = filteredUsers
      .filter((u) => !['admin', 'super_admin'].includes(u.role || ''))
      .map((user) => {
        const userParticipations = allParticipants.filter(
          (p) => p.userId === user.id,
        );
        const gameDetails = userParticipations.map((p) => {
          const game = games.find((g) => g.id === p.gameId);
          return {
            gameId: p.gameId,
            gameTitle: game?.title || 'Unknown',
            pointsEarned: p.pointsEarned || 0,
          };
        });

        return {
          userId: user.id,
          username: user.username,
          displayName: user.displayName,
          department: user.department,
          role: user.role,
          totalPoints: user.totalPoints || 0,
          gamesParticipated: gameDetails.length,
          gameDetails,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);

    res.json({
      summary: {
        totalGames: games.length,
        completedGames,
        activeGames,
        activeRetreats,
        totalParticipants: participantList.length,
        highestScorer: highestScorer
          ? {
              displayName: highestScorer.displayName,
              points: highestScorer.totalPoints,
              department: highestScorer.department,
            }
          : null,
      },
      participants: participantList,
    });
  });

  app.get('/api/users', async (req, res) => {
    const users = await storage.getAllUsers();
    const safeUsers = users.map(({ password, ...rest }) => rest);
    res.json(safeUsers);
  });

  app.get('/api/games/:gameId/focal-issues', async (req, res) => {
    const issues = await storage.getFocalIssuesByGame(req.params.gameId);
    const users = await storage.getAllUsers();

    const enrichedIssues = issues.map((issue) => {
      const player = users.find((u) => u.id === issue.playerId);
      return {
        ...issue,
        playerName: player?.displayName || player?.username || 'Anonymous',
      };
    });

    res.json(enrichedIssues);
  });

  app.post('/api/focal-issues', async (req, res) => {
    try {
      const validated = insertFocalIssueSchema.parse(req.body);
      const issue = await storage.createFocalIssue(validated);
      res.status(201).json(issue);
    } catch (error) {
      res.status(400).json({ message: 'Invalid focal issue data' });
    }
  });

  app.post('/api/focal-issue-votes', async (req, res) => {
    try {
      const validated = insertFocalIssueVoteSchema.parse(req.body);
      await storage.createFocalIssueVote(validated);
      await storage.incrementFocalIssueVoteCount(validated.focalIssueId);
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(400).json({ message: 'Invalid vote data' });
    }
  });

  app.post('/api/challenges', async (req, res) => {
    try {
      const validated = insertChallengeSchema.parse(req.body);
      const challenge = await storage.createChallenge(validated);
      res.status(201).json(challenge);
    } catch (error) {
      res.status(400).json({ message: 'Invalid challenge data' });
    }
  });

  app.post('/api/key-event-reports', async (req, res) => {
    try {
      const validated = insertKeyEventReportSchema.parse(req.body);
      const report = await storage.createKeyEventReport(validated);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ message: 'Invalid report data' });
    }
  });

  app.get('/api/games/:gameId/key-event-reports', async (req, res) => {
    const reports = await storage.getKeyEventReportsByGame(req.params.gameId);
    res.json(reports);
  });

  app.get('/api/players/:playerId/game-history', async (req, res) => {
    const history = await storage.getPlayerGameHistory(req.params.playerId);
    res.json(history);
  });

  app.get('/api/players/:playerId/stats', async (req, res) => {
    const stats = await storage.getPlayerStats(req.params.playerId);
    res.json(stats);
  });

  // ============ RETREAT ROUTES ============

  app.get('/api/retreats', async (req, res) => {
    const { status } = req.query;
    const retreats = status
      ? await storage.getRetreatsByStatus(status as string)
      : await storage.getAllRetreats();
    res.json(retreats);
  });

  app.get('/api/retreats/:id', async (req, res) => {
    const retreat = await storage.getRetreat(req.params.id);
    if (!retreat) {
      return res.status(404).json({ message: 'Retreat not found' });
    }
    res.json(retreat);
  });

  app.post('/api/retreats', async (req, res) => {
    try {
      const validated = insertRetreatSchema.parse(req.body);
      const retreat = await storage.createRetreat(validated);
      res.status(201).json(retreat);
    } catch (error) {
      res.status(400).json({ message: 'Invalid retreat data' });
    }
  });

  app.patch('/api/retreats/:id', async (req, res) => {
    const retreat = await storage.updateRetreat(req.params.id, req.body);
    if (!retreat) {
      return res.status(404).json({ message: 'Retreat not found' });
    }
    res.json(retreat);
  });

  app.post('/api/retreats/:id/submit-for-approval', async (req, res) => {
    const retreat = await storage.updateRetreat(req.params.id, {
      status: 'pending_approval',
    });
    if (!retreat) {
      return res.status(404).json({ message: 'Retreat not found' });
    }
    res.json(retreat);
  });

  app.post('/api/retreats/:id/approve', async (req, res) => {
    const { approvedBy } = req.body;
    if (!approvedBy) {
      return res.status(400).json({ message: 'approvedBy is required' });
    }
    const retreat = await storage.approveRetreat(req.params.id, approvedBy);
    if (!retreat) {
      return res.status(404).json({ message: 'Retreat not found' });
    }
    res.json(retreat);
  });

  app.post('/api/retreats/:id/reject', async (req, res) => {
    const retreat = await storage.updateRetreat(req.params.id, {
      status: 'rejected',
    });
    if (!retreat) {
      return res.status(404).json({ message: 'Retreat not found' });
    }
    res.json(retreat);
  });

  app.post('/api/retreats/:id/start', async (req, res) => {
    const retreat = await storage.updateRetreat(req.params.id, {
      status: 'in_progress',
    });
    if (!retreat) {
      return res.status(404).json({ message: 'Retreat not found' });
    }
    res.json(retreat);
  });

  app.get('/api/retreats/join/:code', async (req, res) => {
    const retreat = await storage.getRetreatByJoinCode(req.params.code);
    if (!retreat) {
      return res.status(404).json({ message: 'Invalid join code' });
    }
    res.json(retreat);
  });

  // Retreat Tables
  app.get('/api/retreat-tables', async (req, res) => {
    const retreats = await storage.getAllRetreats();
    const allTables: any[] = [];
    for (const retreat of retreats) {
      const tables = await storage.getRetreatTables(retreat.id);
      allTables.push(...tables);
    }
    res.json(allTables);
  });

  app.get('/api/retreats/:retreatId/tables', async (req, res) => {
    const tables = await storage.getRetreatTables(req.params.retreatId);
    res.json(tables);
  });

  app.get('/api/retreat-tables/:id', async (req, res) => {
    const table = await storage.getRetreatTable(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.json(table);
  });

  app.patch('/api/retreat-tables/:id', async (req, res) => {
    const table = await storage.updateRetreatTable(req.params.id, req.body);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.json(table);
  });

  app.post('/api/retreat-tables/:id/join', async (req, res) => {
    try {
      const { playerId } = req.body;
      if (!playerId) {
        return res.status(400).json({ message: 'Expert ID is required' });
      }
      const table = await storage.getRetreatTable(req.params.id);
      if (!table) {
        return res.status(404).json({ message: 'Table not found' });
      }
      const existingParticipants = await storage.getTableParticipants(
        req.params.id,
      );
      const alreadyJoined = existingParticipants.some(
        (p) => p.userId === playerId,
      );
      if (alreadyJoined) {
        return res
          .status(400)
          .json({ message: 'Already a member of this table' });
      }
      const participant = await storage.addRetreatParticipant({
        retreatId: table.retreatId,
        tableId: req.params.id,
        userId: playerId,
        role: 'player',
      });
      res.json(participant);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || 'Failed to join table' });
    }
  });

  // Retreat Table Entries
  app.get('/api/retreat-tables/:tableId/entries', async (req, res) => {
    const { category } = req.query;
    const entries = category
      ? await storage.getRetreatTableEntriesByType(
          req.params.tableId,
          category as string,
        )
      : await storage.getRetreatTableEntries(req.params.tableId);
    res.json(entries);
  });

  app.post('/api/retreat-tables/:tableId/entries', async (req, res) => {
    try {
      const validated = insertRetreatTableEntrySchema.parse({
        ...req.body,
        tableId: req.params.tableId,
      });
      const entry = await storage.createRetreatTableEntry(validated);
      res.status(201).json(entry);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Invalid entry data' });
    }
  });

  app.get('/api/retreat-tables/:tableId/scored-entries', async (req, res) => {
    const scoredEntries = await storage.getScoredEntriesByTable(
      req.params.tableId,
    );
    res.json(scoredEntries);
  });

  app.post('/api/retreat-entries', async (req, res) => {
    try {
      const validated = insertRetreatTableEntrySchema.parse(req.body);
      const entry = await storage.createRetreatTableEntry(validated);
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({ message: 'Invalid entry data' });
    }
  });

  app.patch('/api/retreat-entries/:id', async (req, res) => {
    const entry = await storage.updateRetreatTableEntry(
      req.params.id,
      req.body,
    );
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(entry);
  });

  app.delete('/api/retreat-entries/:id', async (req, res) => {
    await storage.deleteRetreatTableEntry(req.params.id);
    res.status(204).send();
  });

  // Retreat Entry Votes
  app.get('/api/retreat-entries/:entryId/votes', async (req, res) => {
    const votes = await storage.getRetreatEntryVotes(req.params.entryId);
    res.json(votes);
  });

  app.post('/api/retreat-entry-votes', async (req, res) => {
    try {
      const validated = insertRetreatEntryVoteSchema.parse(req.body);
      const vote = await storage.createRetreatEntryVote(validated);
      res.status(201).json(vote);
    } catch (error) {
      res.status(400).json({ message: 'Invalid vote data' });
    }
  });

  // Retreat Participants
  app.get('/api/retreats/:retreatId/participants', async (req, res) => {
    const participants = await storage.getRetreatParticipants(
      req.params.retreatId,
    );
    const users = await storage.getAllUsers();

    const enrichedParticipants = participants.map((p) => {
      const user = users.find((u) => u.id === p.userId);
      return {
        ...p,
        displayName: user?.displayName || user?.username || 'Unknown',
        department: user?.department || 'Unassigned',
      };
    });

    res.json(enrichedParticipants);
  });

  app.get('/api/retreat-tables/:tableId/participants', async (req, res) => {
    const participants = await storage.getTableParticipants(req.params.tableId);
    const users = await storage.getAllUsers();

    const enrichedParticipants = participants.map((p) => {
      const user = users.find((u) => u.id === p.userId);
      return {
        ...p,
        displayName: user?.displayName || user?.username || 'Unknown',
        department: user?.department || 'Unassigned',
      };
    });

    res.json(enrichedParticipants);
  });

  app.get('/api/users/:userId/retreat-participations', async (req, res) => {
    const retreats = await storage.getAllRetreats();
    const allParticipants: any[] = [];
    for (const retreat of retreats) {
      const participants = await storage.getRetreatParticipants(retreat.id);
      const userParticipations = participants.filter(
        (p) => p.userId === req.params.userId,
      );
      allParticipants.push(...userParticipations);
    }
    res.json(allParticipants);
  });

  app.post('/api/retreat-participants', async (req, res) => {
    try {
      const validated = insertRetreatParticipantSchema.parse(req.body);
      const participant = await storage.addRetreatParticipant(validated);
      res.status(201).json(participant);
    } catch (error) {
      res.status(400).json({ message: 'Invalid participant data' });
    }
  });

  app.delete('/api/retreat-participants/:id', async (req, res) => {
    await storage.removeRetreatParticipant(req.params.id);
    res.status(204).send();
  });

  // Retreat Table Reports
  app.get('/api/retreat-tables/:tableId/report', async (req, res) => {
    let report = await storage.getRetreatTableReport(req.params.tableId);

    if (!report) {
      const table = await storage.getRetreatTable(req.params.tableId);
      const scoredEntries = await storage.getScoredEntriesByTable(
        req.params.tableId,
      );

      report = await storage.createRetreatTableReport({
        tableId: req.params.tableId,
        retreatId: table?.retreatId || '',
        summary: `Table Report for ${table?.name || 'Unknown Table'}`,
        keyFindings: '',
        rankings: scoredEntries.slice(0, 10),
        notes: '',
        decisions: '',
        status: 'draft',
        submittedBy: null,
      });
    }

    res.json(report);
  });

  app.patch('/api/retreat-table-reports/:id', async (req, res) => {
    const report = await storage.updateRetreatTableReport(
      req.params.id,
      req.body,
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  });

  app.post('/api/retreat-table-reports', async (req, res) => {
    try {
      const report = await storage.createRetreatTableReport(req.body);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ message: 'Invalid report data' });
    }
  });

  app.post('/api/retreat-table-reports/:id/submit', async (req, res) => {
    const submittedBy = req.body.submittedBy || 'current-user';
    const report = await storage.submitRetreatTableReport(
      req.params.id,
      submittedBy,
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  });

  // Retreat Consolidated Reports
  app.get('/api/retreats/:retreatId/consolidated-report', async (req, res) => {
    let report = await storage.getRetreatConsolidatedReport(
      req.params.retreatId,
    );

    if (!report) {
      const retreat = await storage.getRetreat(req.params.retreatId);
      const tables = await storage.getRetreatTables(req.params.retreatId);

      const tableReports = await Promise.all(
        tables.map(async (t) => await storage.getRetreatTableReport(t.id)),
      );

      const validReports = tableReports.filter(Boolean);
      const combinedFindings = validReports
        .map((r) => r?.keyFindings)
        .filter(Boolean)
        .join('\n\n');

      report = await storage.createRetreatConsolidatedReport({
        retreatId: req.params.retreatId,
        executiveSummary: `Consolidated Report for "${retreat?.title || 'Retreat Session'}"\n\nThis report consolidates findings from ${tables.length} retreat tables.`,
        crossTablePatterns: '',
        keyFindings: combinedFindings,
        strategicRecommendations: '',
        status: 'draft',
        submittedBy: null,
        approvedBy: null,
      });
    }

    res.json(report);
  });

  app.patch('/api/retreat-consolidated-reports/:id', async (req, res) => {
    const report = await storage.updateRetreatConsolidatedReport(
      req.params.id,
      req.body,
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  });

  app.post('/api/retreat-consolidated-reports/:id/submit', async (req, res) => {
    const { submittedBy } = req.body;
    if (!submittedBy) {
      return res.status(400).json({ message: 'submittedBy is required' });
    }
    const report = await storage.submitRetreatConsolidatedReport(
      req.params.id,
      submittedBy,
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  });

  app.post(
    '/api/retreat-consolidated-reports/:id/approve',
    async (req, res) => {
      const { approvedBy } = req.body;
      if (!approvedBy) {
        return res.status(400).json({ message: 'approvedBy is required' });
      }
      const report = await storage.approveRetreatConsolidatedReport(
        req.params.id,
        approvedBy,
      );
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.json(report);
    },
  );

  // ============ FUTURE RETREAT GAME STAGES API ============

  // Get available stages for reference
  app.get('/api/retreat-stages', async (req, res) => {
    res.json({ stages: RETREAT_GAME_STAGES });
  });

  // Stage Progress - Get team's stage progress
  app.get('/api/retreat-tables/:tableId/stage-progress', async (req, res) => {
    const progress = await storage.getTableStageProgress(req.params.tableId);
    res.json(progress);
  });

  // Get specific stage progress for a team
  app.get('/api/retreat-tables/:tableId/stages/:stage', async (req, res) => {
    let progress = await storage.getStageProgress(
      req.params.tableId,
      req.params.stage,
    );

    // Auto-create if doesn't exist
    if (!progress) {
      const table = await storage.getRetreatTable(req.params.tableId);
      if (!table) {
        return res.status(404).json({ message: 'Table not found' });
      }

      progress = await storage.createStageProgress({
        tableId: req.params.tableId,
        retreatId: table.retreatId,
        stage: req.params.stage,
        status: 'pending',
        maxSubmissionsPerPlayer: 3,
        lockedBy: null,
      });
    }

    res.json(progress);
  });

  // Advance team to next stage (GM/Coordinator action)
  app.post('/api/retreat-tables/:tableId/advance-stage', async (req, res) => {
    const table = await storage.getRetreatTable(req.params.tableId);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    const currentIndex = RETREAT_GAME_STAGES.indexOf(table.currentStage as any);
    if (currentIndex === -1 || currentIndex >= RETREAT_GAME_STAGES.length - 1) {
      return res.status(400).json({ message: 'Cannot advance further' });
    }

    const nextStage = RETREAT_GAME_STAGES[currentIndex + 1];
    const updated = await storage.updateRetreatTable(table.id, {
      currentStage: nextStage,
    });

    // Create stage progress for new stage
    await storage.createStageProgress({
      tableId: table.id,
      retreatId: table.retreatId,
      stage: nextStage,
      status: 'active',
      maxSubmissionsPerPlayer: 3,
      lockedBy: null,
    });

    res.json(updated);
  });

  // Lock a stage (GM/Coordinator action)
  app.post('/api/stage-progress/:id/lock', async (req, res) => {
    const { lockedBy } = req.body;
    if (!lockedBy) {
      return res.status(400).json({ message: 'lockedBy is required' });
    }
    const progress = await storage.lockStage(req.params.id, lockedBy);
    if (!progress) {
      return res.status(404).json({ message: 'Stage progress not found' });
    }
    res.json(progress);
  });

  // Update stage progress status
  app.patch('/api/stage-progress/:id', async (req, res) => {
    const progress = await storage.updateStageProgress(req.params.id, req.body);
    if (!progress) {
      return res.status(404).json({ message: 'Stage progress not found' });
    }
    res.json(progress);
  });

  // ============ PLAYER SUBMISSIONS ============

  // Get all submissions for a stage
  app.get(
    '/api/stage-progress/:stageProgressId/submissions',
    async (req, res) => {
      const submissions = await storage.getStageSubmissions(
        req.params.stageProgressId,
      );
      const users = await storage.getAllUsers();

      const enriched = submissions.map((s) => {
        const player = users.find((u) => u.id === s.playerId);
        return {
          ...s,
          playerName: player?.displayName || player?.username || 'Anonymous',
          playerDepartment: player?.department || 'Unknown',
        };
      });

      res.json(enriched);
    },
  );

  // Get player's submissions for a stage (to check max limit)
  app.get(
    '/api/stage-progress/:stageProgressId/submissions/player/:playerId',
    async (req, res) => {
      const submissions = await storage.getPlayerStageSubmissions(
        req.params.stageProgressId,
        req.params.playerId,
      );
      res.json(submissions);
    },
  );

  // Create a submission (player action)
  app.post('/api/stage-submissions', async (req, res) => {
    try {
      const validated = insertRetreatStageSubmissionSchema.parse(req.body);

      // Check max submissions per player
      const existing = await storage.getPlayerStageSubmissions(
        validated.stageProgressId,
        validated.playerId,
      );

      const stageProgress = await storage.getTableStageProgress(
        validated.tableId,
      );
      const currentStage = stageProgress.find(
        (p) => p.id === validated.stageProgressId,
      );
      const maxSubmissions = currentStage?.maxSubmissionsPerPlayer || 3;

      if (existing.length >= maxSubmissions) {
        return res.status(400).json({
          message: `Maximum ${maxSubmissions} submissions allowed per player`,
        });
      }

      const submission = await storage.createStageSubmission(validated);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ message: 'Invalid submission data' });
    }
  });

  // Update a submission
  app.patch('/api/stage-submissions/:id', async (req, res) => {
    const submission = await storage.updateStageSubmission(
      req.params.id,
      req.body,
    );
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  });

  // ============ COORDINATOR CONSOLIDATIONS ============

  // Get all consolidations for a stage
  app.get(
    '/api/stage-progress/:stageProgressId/consolidations',
    async (req, res) => {
      const consolidations = await storage.getStageConsolidations(
        req.params.stageProgressId,
      );
      const users = await storage.getAllUsers();

      const enriched = consolidations.map((c) => {
        const coordinator = users.find((u) => u.id === c.coordinatorId);
        return {
          ...c,
          coordinatorName:
            coordinator?.displayName || coordinator?.username || 'Unknown',
        };
      });

      // Sort by total votes (highest first)
      enriched.sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0));

      res.json(enriched);
    },
  );

  // Create a consolidation (coordinator action)
  app.post('/api/stage-consolidations', async (req, res) => {
    try {
      const validated = insertRetreatStageConsolidationSchema.parse(req.body);
      const consolidation = await storage.createStageConsolidation(validated);

      // Mark merged submissions as merged
      if (validated.mergedFromIds && validated.mergedFromIds.length > 0) {
        for (const subId of validated.mergedFromIds) {
          await storage.updateStageSubmission(subId, { status: 'merged' });
        }
      }

      res.status(201).json(consolidation);
    } catch (error) {
      res.status(400).json({ message: 'Invalid consolidation data' });
    }
  });

  // Update a consolidation
  app.patch('/api/stage-consolidations/:id', async (req, res) => {
    const consolidation = await storage.updateStageConsolidation(
      req.params.id,
      req.body,
    );
    if (!consolidation) {
      return res.status(404).json({ message: 'Consolidation not found' });
    }
    res.json(consolidation);
  });

  // Select consolidations for final report (coordinator action)
  app.post('/api/stage-consolidations/:id/select', async (req, res) => {
    const consolidation = await storage.updateStageConsolidation(
      req.params.id,
      { isSelected: true },
    );
    if (!consolidation) {
      return res.status(404).json({ message: 'Consolidation not found' });
    }
    res.json(consolidation);
  });

  // ============ CONSOLIDATION VOTING ============

  // Get votes for a consolidation
  app.get(
    '/api/stage-consolidations/:consolidationId/votes',
    async (req, res) => {
      const votes = await storage.getConsolidationVotes(
        req.params.consolidationId,
      );
      res.json(votes);
    },
  );

  // Cast a vote on consolidation (player action)
  app.post('/api/consolidation-votes', async (req, res) => {
    try {
      const validated = insertRetreatConsolidationVoteSchema.parse(req.body);

      // Check if already voted
      const existingVotes = await storage.getConsolidationVotes(
        validated.consolidationId,
      );
      const alreadyVoted = existingVotes.some(
        (v) => v.voterId === validated.voterId,
      );

      if (alreadyVoted) {
        return res.status(400).json({ message: 'Already voted on this item' });
      }

      const vote = await storage.createConsolidationVote(validated);
      res.status(201).json(vote);
    } catch (error) {
      res.status(400).json({ message: 'Invalid vote data' });
    }
  });

  // ============ STAGE REPORTS ============

  // Get stage report
  app.get('/api/stage-progress/:stageProgressId/report', async (req, res) => {
    const report = await storage.getStageReport(req.params.stageProgressId);
    res.json(report || null);
  });

  // Create/save stage report (coordinator action)
  app.post('/api/stage-reports', async (req, res) => {
    try {
      const {
        stageProgressId,
        tableId,
        stage,
        selectedItems,
        summary,
        createdBy,
      } = req.body;

      const report = await storage.createStageReport({
        stageProgressId,
        tableId,
        stage,
        selectedItems,
        summary,
        createdBy,
      });

      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ message: 'Invalid report data' });
    }
  });

  return httpServer;
}
