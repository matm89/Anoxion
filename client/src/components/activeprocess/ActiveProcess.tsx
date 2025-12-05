import { useLiveData } from '../../services/mock';
import { LiveCharts } from '../livecharts/Livecharts';

export function ActiveProcess() {
  const data = useLiveData();

  return (
    <div>
      <h2 className="text-brand-700">🔴 Live process data</h2>

      {data.length > 0 && (
        <>
          <p>O2: {data.at(-1)?.values?.O2}%</p>
          <p>Temp: {data.at(-1)?.values?.temp}°C</p>
          <p>Hum: {data.at(-1)?.values?.hum}%</p>
        </>
      )}

      {data.length > 0 && <LiveCharts processes={data} />}
    </div>
  );
}
