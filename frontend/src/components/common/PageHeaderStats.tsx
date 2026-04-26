import React from 'react';
import { motion } from 'framer-motion';
import './PageHeaderStats.css';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'indigo' | 'emerald' | 'rose' | 'amber' | 'sky';
}

interface PageHeaderStatsProps {
  stats: Stat[];
}

const PageHeaderStats: React.FC<PageHeaderStatsProps> = ({ stats }) => {
  return (
    <div className="page-stats-grid">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`page-stat-card ${stat.color}`}
        >
          <div className="page-stat-icon">{stat.icon}</div>
          <div className="page-stat-content">
            <span className="page-stat-label">{stat.label}</span>
            <h4 className="page-stat-value">{stat.value}</h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PageHeaderStats;
