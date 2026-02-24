import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Share2, Search, Filter, Eye } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const reports = [
  {
    title: 'Annual Foresight Review 2026',
    type: 'PDF',
    size: '4.2 MB',
    date: 'Dec 31, 2026',
    author: 'Strategic Planning Unit',
    tags: ['Annual', 'Strategy', 'Public'],
  },
  {
    title: 'Q1 Cyber Threats Analysis and Report',
    type: 'PDF',
    size: '2.8 MB',
    date: 'Mar 15, 2026',
    author: 'Cyber Security Dept',
    tags: ['Security', 'Cyber', 'Confidential'],
  },
  {
    title: 'Autonomous Mobility Impact Assessment',
    type: 'PDF',
    size: '1.5 MB',
    date: 'Apr 02, 2026',
    author: 'Future Mobility Team',
    tags: ['Transport', 'AI', 'Internal'],
  },
  {
    title: 'Community Safety Trends Report',
    type: 'PDF',
    size: '3.1 MB',
    date: 'May 10, 2026',
    author: 'Social Research Unit',
    tags: ['Community', 'Social', 'Public'],
  },
  {
    title: 'Emerging Technologies Radar',
    type: 'PDF',
    size: '8.5 MB',
    date: 'Jun 01, 2026',
    author: 'Innovation Lab',
    tags: ['Tech', 'Radar', 'Internal'],
  },
  {
    title: 'Smart City Infrastructure Vulnerabilities',
    type: 'PDF',
    size: '5.2 MB',
    date: 'Jun 20, 2026',
    author: 'Infrastructure Security',
    tags: ['Infrastructure', 'Smart City', 'Classified'],
  },
  {
    title: 'Autonomous Mobility Impact Assessment',
    type: 'PDF',
    size: '1.5 MB',
    date: 'Apr 02, 2026',
    author: 'Future Mobility Team',
    tags: ['Transport', 'AI', 'Internal'],
  },
  {
    title: 'Community Safety Trends Report',
    type: 'PDF',
    size: '3.1 MB',
    date: 'May 10, 2026',
    author: 'Social Research Unit',
    tags: ['Community', 'Social', 'Public'],
  },
];

export default function ReportsLibrary() {
  return (
    <Layout>
      <div className='space-y-8'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-2'>
              Reports Library
            </h1>
            <p className='text-muted-foreground'>
              Access generated insights and strategic documents
            </p>
          </div>
          <div className='flex gap-2'>
            {/* <div className='relative w-full md:w-64'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search reports...'
                className='pl-10 bg-secondary/30 border-white/10 focus:border-primary/50'
              />
            </div> */}
            <Button
              variant='tertiary'
              className='border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white'
            >
              <Filter className='w-4 h-4' />
            </Button>
          </div>
        </div>

        <Tabs defaultValue='approval' className='w-full space-y-6'>
          <TabsList className='bg-white/5 border border-white/10 p-1 w-auto inline-flex rounded-lg'>
            <TabsTrigger
              value='approval'
              className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2'
            >
              Future Scenario
            </TabsTrigger>
            <TabsTrigger
              value='published'
              className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2'
            >
              Future Retreat
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {reports.map((report, i) => (
            <Card
              key={i}
              className='glass-card group hover:border-primary/30 transition-all duration-300'
            >
              <CardContent className='p-5 flex flex-col h-full'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='p-3 rounded bg-white/5 group-hover:bg-primary/10 transition-colors'>
                    <FileText className='w-6 h-6 text-primary' />
                  </div>
                  <Badge
                    variant='secondary'
                    className='bg-white/5 hover:bg-white/10 text-muted-foreground text-xs font-mono'
                  >
                    {report.type}
                  </Badge>
                </div>

                <h3 className='text-lg font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors'>
                  {report.title}
                </h3>

                <div className='flex flex-wrap gap-2 mb-4'>
                  {report.tags.map((tag, t) => (
                    <span
                      key={t}
                      className='text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-muted-foreground'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className='mt-auto space-y-4'>
                  <div className='flex justify-between text-xs text-muted-foreground border-t border-white/5 pt-3'>
                    <span>{report.date}</span>
                    <span>{report.size}</span>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='bg-white/5 hover:bg-white/10 h-8'
                    >
                      <Eye className='w-3.5 h-3.5' />
                    </Button>
                    {/* <Button
                      variant='ghost'
                      size='sm'
                      className='bg-white/5 hover:bg-white/10 h-8'
                    >
                      <Share2 className='w-3.5 h-3.5' />
                    </Button> */}
                    <Button
                      size='sm'
                      className='bg-primary hover:bg-primary/90 text-primary-foreground h-8 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    >
                      <Download className='w-3.5 h-3.5' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
