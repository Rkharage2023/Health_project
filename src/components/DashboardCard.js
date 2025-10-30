import React from 'react';
import Card from '../components/Card';
import './DashboardCard.css';

const DashboardCard = ({ title, content, icon: Icon, color }) => (
  <Card className="dashboard-card">
    <div className="dashboard-card-header">
      <Icon size={24} className={color} />
      <h3 className={`dashboard-card-title ${color}`}>{title}</h3>
    </div>
    <p className="dashboard-card-content">{content}</p>
  </Card>
);

export default DashboardCard;