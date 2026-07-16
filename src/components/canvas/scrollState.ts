// Global mutable states to share scroll & mouse coordinates with R3F Canvas at 60fps

export const scrollState = {
  currentProgress: 0,  // lerped value
  targetProgress: 0,   // scroll ratio (0 to 1)
  currentY: 0,         // lerped scroll y
  targetY: 0,          // window scroll y
  activeSection: 0,    // active section index (0-14)
};

export const mouseState = {
  currentX: 0,         // lerped x
  currentY: 0,         // lerped y
  targetX: 0,          // target mouse x normalized (-1 to 1)
  targetY: 0,          // target mouse y normalized (-1 to 1)
};

if (typeof window !== "undefined") {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.targetY = window.scrollY;
    scrollState.targetProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Dynamically calculate active section index (0 to 14)
    const sectionIndex = Math.min(14, Math.floor(scrollState.targetProgress * 15));
    scrollState.activeSection = sectionIndex;
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouseState.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseState.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
}
