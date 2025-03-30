
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalyticsChartProps {
  title: string;
  description?: string;
  type: 'area' | 'pie' | 'bar';
  data: any[];
  dataKeys: {
    x?: string;
    y?: string | string[];
    value?: string;
    name?: string;
    category?: string;
  };
  colors?: string[];
}

const defaultColors = [
  '#8b5cf6', // primary
  '#ec4899',
  '#14b8a6',
  '#f43f5e',
  '#f97316',
  '#06b6d4'
];

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  description,
  type,
  data,
  dataKeys,
  colors = defaultColors,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey={dataKeys.x} 
                tick={{ fontSize: 12 }}
                stroke="#888888"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
              />
              {Array.isArray(dataKeys.y) ? (
                dataKeys.y.map((key, index) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stackId="1"
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                    opacity={0.8}
                  />
                ))
              ) : (
                <Area
                  type="monotone"
                  dataKey={dataKeys.y}
                  stroke={colors[0]}
                  fill={colors[0]}
                  opacity={0.8}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8b5cf6"
                dataKey={dataKeys.value}
                nameKey={dataKeys.name}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}`, '']}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: 'none'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey={dataKeys.category || dataKeys.x} 
                tick={{ fontSize: 12 }}
                stroke="#888888"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
              />
              <Legend />
              {Array.isArray(dataKeys.y) ? (
                dataKeys.y.map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={colors[index % colors.length]}
                    radius={[4, 4, 0, 0]}
                  />
                ))
              ) : (
                <Bar
                  dataKey={dataKeys.y || dataKeys.value}
                  fill={colors[0]}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
};

export default AnalyticsChart;
