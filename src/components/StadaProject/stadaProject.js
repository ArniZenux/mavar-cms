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
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Staða túlkaverkefna</div>
          <div className="surface-card flex justify-content-center p-3 shadow-2 border-round p-fluid">
              <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '30%' }} />
          </div>
       </div>
    </div>
  )
}