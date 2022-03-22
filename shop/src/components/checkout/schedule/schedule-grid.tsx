import { RadioGroup } from '@headlessui/react';
import { useAtom } from 'jotai';
import ScheduleCard from './schedule-card';
import { deliveryTimeAtom } from '@store/checkout';
import { useEffect } from 'react';
import { useSettings } from '@components/settings/settings.context';
import { useTranslation } from 'next-i18next';

interface ScheduleProps {
  label: string;
  className?: string;
  count?: number;
}

export const ScheduleGrid: React.FC<ScheduleProps> = ({
  label,
  className,
  count,
}) => {
  const { t } = useTranslation('common');
  const { deliveryTime: schedules } = useSettings();

  const [selectedSchedule, setSchedule] = useAtom(deliveryTimeAtom);
  useEffect(() => {
    if (schedules?.length) {
      if (selectedSchedule?.id) {
        const index = schedules.findIndex(
          (a: any) => a.title === selectedSchedule.title
        );
        setSchedule(schedules[index]);
      } else {
        setSchedule(schedules[0]);
      }
    }
  }, [
    schedules,
    schedules?.length,
    selectedSchedule?.id,
    selectedSchedule?.title,
    setSchedule,
  ]);
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div className="flex items-center space-s-3 md:space-s-4">
          {count && (
            <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
              {count}
            </span>
          )}
          <p className="text-lg lg:text-xl text-heading capitalize">{label}</p>
        </div>
      </div>

      {schedules && schedules?.length ? (
        <RadioGroup value={selectedSchedule} onChange={setSchedule}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {schedules?.map((schedule: any, idx: number) => (
              <RadioGroup.Option value={schedule} key={idx}>
                {({ checked }) => (
                  <ScheduleCard checked={checked} schedule={schedule} />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative px-5 py-6 text-base text-center bg-gray-100 rounded border border-border-200">
            {t('text-no-delivery-time-found')}
          </span>
        </div>
      )}
    </div>
  );
};
export default ScheduleGrid;
