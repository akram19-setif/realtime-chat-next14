import { create } from "zustand";

interface ActiveListProps {
  members: string[];
  addMember: (email: string) => void;
  removeMember: (email: string) => void;
  setMembers: (emails: string[]) => void;
}

export const useActiveList = create<ActiveListProps>((set) => ({
  members: [],
  addMember: (id) =>
    set((state) => ({
      members: [...state.members, id],
    })),

  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((memberId) => memberId !== id),
    })),
  setMembers: (ids) => set({ members: ids }),
}));
