import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

export function StadaProjectForm() {
  const [chartData] = useState({
    labels: ['Almennt', 'Læknamál', 'Skólamál'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726"
            ],
            hoverBackgroundColor: [
                "#64B5F6",
                "#81C784",
                "#FFB74D"
            ]
        }
    ]
  });

  const [lightOptions] = useState({
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      }
  });

  return(
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl text-900 font-medium">Staða túlkaverkefna</span>
      </div>
        <div className="card flex justify-content-center p-3 p-fluid">
          <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '30%' }} />
        </div>
    </div>
  )
}