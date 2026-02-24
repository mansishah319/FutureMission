import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.games': 'Games',
    'nav.reports': 'Reports',
    'nav.users': 'Users',
    'nav.settings': 'Settings',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',

    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.create': 'Create',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.next': 'Next',
    'common.back': 'Back',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.status': 'Status',
    'common.actions': 'Actions',
    'common.view': 'View',
    'common.approve': 'Approve',
    'common.reject': 'Reject',

    // Login
    'login.title': 'Strategic Foresight Game',
    'login.subtitle': 'Dubai Police Future Intelligence Platform',
    'login.employeeId': 'Employee ID',
    'login.password': 'Password',
    'login.signIn': 'Sign In',
    'login.selectRole': 'Select Your Role',
    'login.forgotPassword': 'Forgot Password?',

    // Roles
    'role.superAdmin': 'Super Admin',
    'role.admin': 'Admin (SFD)',
    'role.gameMaster': 'Game Master',
    'role.participant': 'Participant',

    // Dashboard
    'dashboard.welcome': 'Welcome Back',
    'dashboard.activeGames': 'Active Games',
    'dashboard.totalParticipants': 'Total Participants',
    'dashboard.completedGames': 'Completed Games',
    'dashboard.pendingApprovals': 'Pending Approvals',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.createGame': 'Create New Game',
    'dashboard.joinGame': 'Join Game',
    'dashboard.viewReports': 'View Reports',

    // Games
    'game.title': 'Game Title',
    'game.description': 'Description',
    'game.focalIssue': 'Focal Issue',
    'game.themes': 'Themes',
    'game.participants': 'Participants',
    'game.status': 'Status',
    'game.startDate': 'Start Date',
    'game.endDate': 'End Date',
    'game.create': 'Create Game',
    'game.join': 'Join Game',
    'game.code': 'Game Code',
    'game.enterCode': 'Enter Game Code',

    // Game Status
    'status.draft': 'Draft',
    'status.pending': 'Pending Approval',
    'status.active': 'Active',
    'status.completed': 'Completed',
    'status.archived': 'Archived',

    // Game Phases
    'phase.focalTopic': 'Focal Topic',
    'phase.themeAssignment': 'Theme Assignment',
    'phase.challengeCreation': 'Challenge Creation',
    'phase.voting': 'Voting',
    'phase.scoring': 'Impact/Probability Scoring',
    'phase.reporting': 'Key Event Reporting',
    'phase.consolidation': 'Final Report',

    // Themes
    'theme.technological': 'Technological',
    'theme.security': 'Security',
    'theme.social': 'Social',
    'theme.economic': 'Economic',
    'theme.environmental': 'Environmental',
    'theme.political': 'Political',

    // Scoring
    'score.impact': 'Impact',
    'score.probability': 'Probability',
    'score.readiness': 'Readiness',

    // Tour
    'tour.welcome': 'Welcome to SFG',
    'tour.start': 'Start Tour',
    'tour.skip': 'Skip Tour',
    'tour.next': 'Next',
    'tour.previous': 'Previous',
    'tour.finish': 'Finish',

    // Footer
    'footer.copyright': '© 2026 Dubai Police. All rights reserved.',
    'footer.version': 'Version 1.0',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.games': 'الألعاب',
    'nav.reports': 'التقارير',
    'nav.users': 'المستخدمين',
    'nav.settings': 'الإعدادات',
    'nav.profile': 'الملف الشخصي',
    'nav.logout': 'تسجيل الخروج',

    // Common
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.create': 'إنشاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.submit': 'إرسال',
    'common.next': 'التالي',
    'common.back': 'السابق',
    'common.close': 'إغلاق',
    'common.loading': 'جاري التحميل...',
    'common.status': 'الحالة',
    'common.actions': 'الإجراءات',
    'common.view': 'عرض',
    'common.approve': 'موافقة',
    'common.reject': 'رفض',

    // Login
    'login.title': 'لعبة الاستشراف الاستراتيجي',
    'login.subtitle': 'منصة استخبارات المستقبل - شرطة دبي',
    'login.employeeId': 'رقم الموظف',
    'login.password': 'كلمة المرور',
    'login.signIn': 'تسجيل الدخول',
    'login.selectRole': 'اختر دورك',
    'login.forgotPassword': 'نسيت كلمة المرور؟',

    // Roles
    'role.superAdmin': 'المشرف العام',
    'role.admin': 'المسؤول',
    'role.gameMaster': 'مدير اللعبة',
    'role.participant': 'مشارك',

    // Dashboard
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.activeGames': 'الألعاب النشطة',
    'dashboard.totalParticipants': 'إجمالي المشاركين',
    'dashboard.completedGames': 'الألعاب المكتملة',
    'dashboard.pendingApprovals': 'في انتظار الموافقة',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.quickActions': 'إجراءات سريعة',
    'dashboard.createGame': 'إنشاء لعبة جديدة',
    'dashboard.joinGame': 'الانضمام للعبة',
    'dashboard.viewReports': 'عرض التقارير',

    // Games
    'game.title': 'عنوان اللعبة',
    'game.description': 'الوصف',
    'game.focalIssue': 'القضية المحورية',
    'game.themes': 'المحاور',
    'game.participants': 'المشاركين',
    'game.status': 'الحالة',
    'game.startDate': 'تاريخ البداية',
    'game.endDate': 'تاريخ النهاية',
    'game.create': 'إنشاء لعبة',
    'game.join': 'انضمام للعبة',
    'game.code': 'رمز اللعبة',
    'game.enterCode': 'أدخل رمز اللعبة',

    // Game Status
    'status.draft': 'مسودة',
    'status.pending': 'في انتظار الموافقة',
    'status.active': 'نشطة',
    'status.completed': 'مكتملة',
    'status.archived': 'مؤرشفة',

    // Game Phases
    'phase.focalTopic': 'الموضوع المحوري',
    'phase.themeAssignment': 'تعيين المحاور',
    'phase.challengeCreation': 'إنشاء التحديات',
    'phase.voting': 'التصويت',
    'phase.scoring': 'تقييم التأثير/الاحتمالية',
    'phase.reporting': 'تقارير الأحداث الرئيسية',
    'phase.consolidation': 'التوحيد',

    // Themes
    'theme.technological': 'تكنولوجي',
    'theme.security': 'أمني',
    'theme.social': 'اجتماعي',
    'theme.economic': 'اقتصادي',
    'theme.environmental': 'بيئي',
    'theme.political': 'سياسي',

    // Scoring
    'score.impact': 'التأثير',
    'score.probability': 'الاحتمالية',
    'score.readiness': 'الجاهزية',

    // Tour
    'tour.welcome': 'مرحباً بك في SFG',
    'tour.start': 'بدء الجولة',
    'tour.skip': 'تخطي الجولة',
    'tour.next': 'التالي',
    'tour.previous': 'السابق',
    'tour.finish': 'إنهاء',

    // Footer
    'footer.copyright': '© 2026 شرطة دبي. جميع الحقوق محفوظة.',
    'footer.version': 'الإصدار 1.0',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('sfg-language') as Language;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sfg-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
