'use client';


/* all paths 
{ icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
{ icon: <VscArchive size={18} />, label: 'Archive', onClick: () => navigate('/processes') },
{ icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/user') },
*/

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'motion/react';

import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import type { DockIconProps, DockItemProps, DockLabelProps, DockProps } from '../../types/docktypes';



function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-white/90 border-neutral-200 border shadow-md hover:bg-white ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: -35 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute left-1/2 w-fit whitespace-pre rounded-md border-neutral-200 bg-white/95 px-3 py-1 text-sm font-medium text-neutral-800 shadow-lg`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center  ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.2, stiffness: 100, damping: 15 },
  magnification = 60,
  distance = 100,
  panelHeight = 72,
  dockHeight = 72,
  baseItemSize = 45
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: 'none' }}
      className="mx-2 flex max-w-full items-center"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`
          ${className}
          flex items-center gap-4 px-6 py-3 mb-2
          rounded-2xl border-neutral-200
          bg-white/95 backdrop-blur-lg
          shadow-lg
          transition-all duration-300
        `}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Anoxion Dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon className="text-neutral-800 drop-shadow-sm">{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}




