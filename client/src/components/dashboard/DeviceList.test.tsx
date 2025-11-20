import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DeviceList } from './DeviceList';
import type { Device } from '../../types/device';

const mockDevices: Device[] = [
  {
    device: 'Test_ESP32_Unit',
    state: {
      'e-stop': false,
      status: 'running',
      last_check: new Date(),
    },
  },
];

describe('DeviceList Component', () => {
  it('renders device cards when data is provided', () => {
    render(<DeviceList devices={mockDevices} />);

    expect(screen.getByText('Test_ESP32_Unit')).toBeInTheDocument();
  });

  it('renders the correct status', () => {
    render(<DeviceList devices={mockDevices} />);

    expect(screen.getByText('running')).toBeInTheDocument();
  });
});
