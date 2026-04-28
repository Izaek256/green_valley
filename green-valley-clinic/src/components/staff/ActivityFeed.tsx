import React from 'react';
import type { ActivityLogEntry } from '../../data/types';

interface ActivityFeedProps {
  activityLog: ActivityLogEntry[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activityLog }) => {
  // Get the 10 most recent activities
  const recentActivities = activityLog.slice(0, 10);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return 'fa-plus-circle text-green-500';
      case 'update': return 'fa-edit text-blue-500';
      case 'delete': return 'fa-trash text-red-500';
      case 'auth': return 'fa-sign-in-alt text-purple-500';
      default: return 'fa-info-circle text-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Recent Activity</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentActivities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        ) : (
          recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                <i className={`fas ${getActivityIcon(activity.type)} text-lg`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
