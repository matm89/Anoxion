import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RunningDevicesPanel } from './RunningDevicesPanel';
import type { Device } from '../../types/device';

vi.mock('../activeprocess/ActiveProcess', () => ({
  ActiveProcess: () => <div data-testid="mock-active-process">Mock Graph</div>,
}));

describe('RunningDevicesPanel', () => {
  const mockDevices = [
    {
      device: 'Device_Running',
      state: { status: 'running', 'e-stop': false, last_check: new Date() },
    },
    {
      device: 'Device_Stopped',
      state: { status: 'stopped', 'e-stop': false, last_check: new Date() },
    },
  ] as Device[];

  it('renders ONLY running devices', () => {
    render(<RunningDevicesPanel devices={mockDevices} />);

    expect(screen.getByText('Live Data Stream')).toBeInTheDocument();

    expect(screen.getByText('Device_Running')).toBeInTheDocument();

    expect(screen.queryByText('Device_Stopped')).not.toBeInTheDocument();
  });

  it('renders nothing if no devices are running', () => {
    const stoppedDevices = [{ device: 'Device_A', state: { status: 'stopped' } }] as Device[];

    const { container } = render(<RunningDevicesPanel devices={stoppedDevices} />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText('Live Data Stream')).not.toBeInTheDocument();
  });
});
