import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  AlertTriangle, 
  Lightbulb, 
  Radio, 
  CheckCircle,
  Save
} from 'lucide-react';

interface ReportData {
  situation: string;
  risks: string;
  opportunities: string;
  signals: string;
  recommendations: string;
}

interface ReportEditorProps {
  theme: string;
  initialData?: Partial<ReportData>;
  onSave: (data: ReportData) => void;
  onAutoSave?: (data: ReportData) => void;
  readOnly?: boolean;
}

const SECTIONS = [
  { 
    key: 'situation' as const, 
    title: 'Current Situation', 
    icon: FileText,
    placeholder: 'Describe the current state and context...',
    color: 'text-blue-400'
  },
  { 
    key: 'risks' as const, 
    title: 'Risks', 
    icon: AlertTriangle,
    placeholder: 'What are the key risks and threats?',
    color: 'text-red-400'
  },
  { 
    key: 'opportunities' as const, 
    title: 'Opportunities', 
    icon: Lightbulb,
    placeholder: 'What opportunities exist?',
    color: 'text-green-400'
  },
  { 
    key: 'signals' as const, 
    title: 'Signals', 
    icon: Radio,
    placeholder: 'What weak signals or trends are emerging?',
    color: 'text-purple-400'
  },
  { 
    key: 'recommendations' as const, 
    title: 'Recommendations', 
    icon: CheckCircle,
    placeholder: 'What actions should be taken?',
    color: 'text-brand-bright-green'
  },
];

export function ReportEditor({
  theme,
  initialData,
  onSave,
  onAutoSave,
  readOnly = false,
}: ReportEditorProps) {
  const [data, setData] = useState<ReportData>({
    situation: initialData?.situation || '',
    risks: initialData?.risks || '',
    opportunities: initialData?.opportunities || '',
    signals: initialData?.signals || '',
    recommendations: initialData?.recommendations || '',
  });

  const calculateProgress = () => {
    const filledSections = SECTIONS.filter(s => data[s.key].trim().length > 20).length;
    return Math.round((filledSections / SECTIONS.length) * 100);
  };

  const progress = calculateProgress();

  useEffect(() => {
    if (onAutoSave) {
      const timer = setTimeout(() => {
        onAutoSave(data);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data, onAutoSave]);

  const handleChange = (key: keyof ReportData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-500/20 text-purple-400 text-sm">
            {theme} Report
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Report {progress}% complete
          </span>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isFilled = data[section.key].trim().length > 20;
          
          return (
            <Card 
              key={section.key} 
              className={`bg-white/5 border-white/10 ${isFilled ? 'border-brand-green/30' : ''}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className={`w-4 h-4 ${section.color}`} />
                  <span className="text-white">{section.title}</span>
                  {isFilled && (
                    <CheckCircle className="w-4 h-4 text-brand-bright-green ml-auto" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={section.placeholder}
                  value={data[section.key]}
                  onChange={(e) => handleChange(section.key, e.target.value)}
                  className="bg-white/5 border-white/20 min-h-[100px] resize-none"
                  readOnly={readOnly}
                  data-testid={`input-report-${section.key}`}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!readOnly && (
        <div className="flex justify-end">
          <Button 
            className="gap-2" 
            onClick={() => onSave(data)}
            data-testid="button-save-report"
          >
            <Save className="w-4 h-4" />
            Save Report
          </Button>
        </div>
      )}
    </div>
  );
}
