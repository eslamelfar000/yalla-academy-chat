import { useMemo } from 'react';

/**
 * Custom hook for creating index-based animation delays
 * @param {number} index - The index of the item
 * @param {number} baseDelay - Base delay in seconds (default: 0.1)
 * @param {number} staggerDelay - Additional delay per index (default: 0.1)
 * @returns {Object} Animation configuration object
 */
export const useIndexAnimation = (index, baseDelay = 0.1, staggerDelay = 0.1) => {
  return useMemo(() => {
    const delay = baseDelay + (index * staggerDelay);
    
    return {
      delay,
      transition: {
        delay,
        duration: 0.6,
        ease: "easeOut"
      }
    };
  }, [index, baseDelay, staggerDelay]);
};

/**
 * Hook for creating staggered grid animations
 * @param {number} totalItems - Total number of items in the grid
 * @param {number} baseDelay - Base delay in seconds (default: 0.1)
 * @param {number} staggerDelay - Additional delay per index (default: 0.1)
 * @returns {Object} Container and item animation variants
 */
export const useStaggeredGridAnimation = (totalItems, baseDelay = 0.1, staggerDelay = 0.1) => {
  return useMemo(() => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.8,
          staggerChildren: staggerDelay,
          delayChildren: baseDelay
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 50, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    };

    return { containerVariants, itemVariants };
  }, [totalItems, baseDelay, staggerDelay]);
};

/**
 * Hook for creating row-based staggered animations
 * @param {number} rowIndex - Current row index
 * @param {number} columnIndex - Current column index
 * @param {number} baseDelay - Base delay in seconds (default: 0.1)
 * @param {number} rowDelay - Delay per row (default: 0.2)
 * @param {number} columnDelay - Delay per column (default: 0.1)
 * @returns {Object} Animation configuration object
 */
export const useGridPositionAnimation = (rowIndex, columnIndex, baseDelay = 0.1, rowDelay = 0.2, columnDelay = 0.1) => {
  return useMemo(() => {
    const delay = baseDelay + (rowIndex * rowDelay) + (columnIndex * columnDelay);
    
    return {
      delay,
      transition: {
        delay,
        duration: 0.6,
        ease: "easeOut"
      }
    };
  }, [rowIndex, columnIndex, baseDelay, rowDelay, columnDelay]);
};
