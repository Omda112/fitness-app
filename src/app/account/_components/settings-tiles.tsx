import * as React from 'react';
import { Lock, Globe, Moon, Shield, FileText, LifeBuoy, LogOut } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ActionTile } from './action-tile';
import { useLogout } from '../_hooks/use-logout';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function SettingsTiles() {
  const { t } = useTranslation();
  const { mutate: logoutMutate, isPending } = useLogout();

  // لو عندك /:locale في الروت
  const { locale } = useParams<{ locale: 'en' | 'ar' }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [dark, setDark] = React.useState(true);

  const currentLocale = locale === 'ar' ? 'ar' : 'en';
  const langLabel = currentLocale === 'ar' ? 'العربية' : 'English';

  const handleToggleLanguage = () => {
    const nextLocale = currentLocale === 'en' ? 'ar' : 'en';

    i18n.changeLanguage(nextLocale);
    const segments = location.pathname.split('/');
    // ["", "en", "account"] مثلاً
    segments[1] = nextLocale;
    navigate(segments.join('/') + location.search, { replace: true });
  };

  return (
    <div className="grid gap-7 px-22 md:grid-cols-3">
      {/* Row 1 */}
      <ActionTile icon={<Lock />} title={t('settings.changePassword')} />

      <ActionTile
        icon={<Globe />}
        title={t('settings.selectLanguage')}
        subtitle={`(${langLabel})`}
        onClick={handleToggleLanguage}
      />

      <ActionTile
        icon={<Moon />}
        title={
          <span>
            {t('settings.mood.label')}{' '}
            <span className="text-orange-400">
              ({dark ? t('settings.mood.dark') : t('settings.mood.light')})
            </span>
          </span>
        }
        rightSlot={<Switch checked={dark} onCheckedChange={setDark} />}
      />

      {/* Row 2 */}
      <ActionTile icon={<Shield />} title={t('settings.security')} />
      <ActionTile icon={<FileText />} title={t('settings.privacyPolicy')} />
      <ActionTile icon={<LifeBuoy />} title={t('settings.help')} />

      {/* Row 3 */}
      <ActionTile
        className="md:col-start-2"
        icon={<LogOut />}
        title={
          <span className="text-orange-400">
            {isPending ? t('settings.logout.logging') : t('settings.logout.label')}
          </span>
        }
        onClick={() => logoutMutate()}
      />
    </div>
  );
}
