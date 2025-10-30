import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SkillMatchChart = ({ matched, missing, partial }) => {
  const pieData = [
    { name: 'Matched', value: matched, color: '#10B981' },
    { name: 'Missing', value: missing, color: '#EF4444' },
    { name: 'Partial', value: partial, color: '#F59E0B' }
  ];

  const barData = [
    { category: 'Matched Skills', count: matched, fill: '#10B981' },
    { category: 'Missing Skills', count: missing, fill: '#EF4444' },
    { category: 'Partial Matches', count: partial, fill: '#F59E0B' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show labels for very small slices

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Pie Chart */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-center text-gray-700 font-medium mb-4">Skill Distribution</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex justify-center space-x-4 mt-2">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-gray-600">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-center text-gray-700 font-medium mb-4">Skill Counts</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 10 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillMatchChart;