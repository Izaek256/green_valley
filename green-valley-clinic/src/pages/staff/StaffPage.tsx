import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useToast';
import { mockStore } from '../../data/mockStore';
import { StaffTable } from '../../components/staff/StaffTable';

export const StaffPage: React.FC = () => {
  const { staff, refreshAll } = useAppContext();
  const { addToast } = useToast();

  const handleToggleStatus = (member: typeof staff[0]) => {
    mockStore.updateStaff(member.id, { isActive: !member.isActive });
    
    // Also update the user
    const user = mockStore.getUserByEmail(member.email);
    if (user) {
      mockStore.updateUser(user.id, { isActive: !member.isActive });
    }
    
    refreshAll();
    addToast(
      `Staff member ${member.isActive ? 'deactivated' : 'activated'} successfully`,
      'success'
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1E2A6E] mb-6">Staff Management</h1>
      <StaffTable staff={staff} onToggleStatus={handleToggleStatus} />
    </div>
  );
};
