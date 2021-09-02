export const pageVariant = {
  initial: {
    opacity: 0,
    scale: 1.05
  },
  final: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      duration: 1
    }
  }
};

export const sectionVariant = {
  hover: {
    scale: 0.95,
    borderRadius: '10px',
    border: '2px solid #50d450'
  },
  transition: {
    duration: 1
  }
};

export const eventVariant = {
  hover: {
    scale: 1.05,
    borderRadius: '10px',
    border: '2px solid #50d450',
    transition: {
      duration: 0.5
    }
  },
  transition: {
    duration: 0.5
  }
};

export const videoVariant = {
  hover: {
    scale: 1.02,
    borderColor: '#fff',
    transition: { type: 'tween', duration: 0.8 }
  },
  transition: { type: 'tween', duration: 0.8 }
};
