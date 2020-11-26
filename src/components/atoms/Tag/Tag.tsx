import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { TagElement } from './Tag.styled';
import { IProps } from './Tag.model';

const Tag = ({ children, bgColor, fontColor, getWidth }: IProps): JSX.Element => {
  const elementsRef = useRef<HTMLInputElement>(null);
  const getWidthAfterDOMLoad = useCallback(() => {
    getWidth(elementsRef.current?.getBoundingClientRect().width || 0);
  }, [getWidth]);

  useLayoutEffect(() => {
    window.addEventListener('load', getWidthAfterDOMLoad);
  }, [getWidthAfterDOMLoad]);
  return (
    <TagElement ref={elementsRef} bgColor={bgColor} fontColor={fontColor}>
      {children}
    </TagElement>
  );
};

export default Tag;
