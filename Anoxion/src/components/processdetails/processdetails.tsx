import Box from '@mui/material/Box';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { LineChart, LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import type { Process } from '../../types/process';
import { format } from 'date-fns';

export function ProcessDetails({ processes }: { processes: Process[] }) {

  // console.log(processes);

  if (!processes || processes.length === 0) {
    return <div>No process data available</div>;
  }

  const start = processes[0];
  const finish = processes[processes.length - 1];

  const formatedDate = processes.map((process) => format(process.timestamp, "do',' HH':'mm"));

  // console.log(formatedDate);
  // console.log(start, finish);

  const margin = { right: 24 };
  // Prepare numeric series for charts
  const oData = processes.map((process) => process.values.O2);
  const hData = processes.map((process) => process.values.hum);
  console.log(hData);
  const xLabels = formatedDate;

function o2LineChart() {
    return (
      <Box sx={{ width: '100%', height: 300 }}>
        <LineChart
          series={[
            { data: oData, label: 'O2', type: 'line' },
          ]}
          xAxis={[{id:"time" , scaleType: 'point', data: xLabels }]}
          yAxis={[{ width: 50 }]}
          margin={margin}
        >
          <LinePlot />
          <MarkPlot />
          <ChartsReferenceLine
            x="Page C"
            label="Max PV PAGE"
            lineStyle={{ stroke: 'red' }}
          />
          <ChartsReferenceLine y={9800} label="Max" lineStyle={{ stroke: 'red' }} />
          <ChartsXAxis />
          <ChartsYAxis />
        </LineChart>
      </Box>
    );
  }

  function humLineChart() {
    return (
      <Box sx={{ width: '100%', height: 300 }}>
        <ChartContainer
          series={[
            { data: hData, label: 'hum%', type: 'line', area:true },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          yAxis={[{ width: 50 }]}
          margin={margin}
        >
          <LinePlot />
          <MarkPlot />
          <ChartsReferenceLine
            x="Page C"
            label="Max PV PAGE"
            lineStyle={{ stroke: 'red' }}
          />
          <ChartsReferenceLine y={9800} label="Max" lineStyle={{ stroke: 'red' }} />
          <ChartsXAxis />
          <ChartsYAxis />
        </ChartContainer>
      </Box>
    );
  }


  return (
    <>
      <div className="grid grid-cols-1 gap-2 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-brand-700 aling-self:center"> Process details </h1> 
        <div id="O2linechar" className="bg-white/80">
          {o2LineChart()}      
        </div>
        <div id="humlinechar" className="bg-white/80">
          {humLineChart()}      
        </div>
      </div>
    </>

  );
}