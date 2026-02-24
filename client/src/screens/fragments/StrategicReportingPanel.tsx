import { GlassCard } from '@/components/ui/glass-card';

const reports = [
  { title: 'Future Mobility 2035', readiness: 'Ready for Review' },
  { title: 'AI & Cyber Risk 2030', readiness: 'Drafting' },
  { title: 'Urban Expansion Scenarios', readiness: 'Pending Validation' },
];

export function StrategicReportingPanel() {
  return (
    <GlassCard className='p-6'>
      <h3 className='text-lg font-semibold mb-4'>
        📑 Strategic Reporting Status
      </h3>

      <div className='space-y-3'>
        {reports.map((r) => (
          <div
            key={r.title}
            className='p-3 rounded-lg bg-muted/30'
          >
            <div className='font-medium'>{r.title}</div>
            <div className='text-xs text-muted-foreground'>
              Status: {r.readiness}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
