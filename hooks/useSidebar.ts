import { useSidebarStore } from "@/store/useSidebarStore";

export const useSidebar = () => {
  const { isOpen, toggle, setOpen } = useSidebarStore();

  return {
    isOpen,
    toggle,
    setOpen,
    collapsed: !isOpen, // optional derived state (useful for UI)
  };
}; 