import { useState, useCallback } from 'react';


function useHover() {
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnter = useCallback(() => setIsHovered(true), []);
    const onMouseLeave = useCallback(() => setIsHovered(false), []);

    return {
    isHovered,
    hoverProps: {
        onMouseEnter,
        onMouseLeave,
    },
    };
}


export default useHover;