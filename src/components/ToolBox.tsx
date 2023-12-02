import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PlayArrow from '@mui/icons-material/PlayArrow';

const ToolBox: React.FC<IToolBox> = ({ focusState }) => {
  const toolBoxRef = useRef<any>(null);
  const [toolBoxControllVisibility, setToolBoxControllVisibility] =
    useState(false);

  useEffect(() => {
    const toolBox = toolBoxRef.current!;
    const parent = toolBox.parentElement?.children;
    const childToFocus = parent[focusState];

    toolBox.style.setProperty(
      '--top-pos',
      `${childToFocus?.offsetTop ? childToFocus?.offsetTop : '58'}px`
    );
  }, [focusState]);

  return (
    <ToolBoxDiv
      ref={toolBoxRef}
      onClick={() => setToolBoxControllVisibility(!toolBoxControllVisibility)}
    >
      <IconBox
        className={toolBoxControllVisibility ? 'toolbox-controlling-icon' : ''}
      >
        <CloseIcon />
      </IconBox>
      <ToolBoxControls
        className={toolBoxControllVisibility ? 'show-toolbox-controls' : ''}
      >
        <IconBox
          style={{ animationDelay: '100ms' }}
          className={
            toolBoxControllVisibility ? 'toolbox-controls-icon-animate' : ''
          }
          onClick={(e) => e.stopPropagation()}
        >
          <PhotoCameraIcon />
        </IconBox>

        <IconBox
          style={{ animationDelay: '150ms' }}
          className={
            toolBoxControllVisibility ? 'toolbox-controls-icon-animate' : ''
          }
          onClick={(e) => e.stopPropagation()}
        >
          <PlayArrow />
        </IconBox>
        <IconBox
          style={{ animationDelay: '200ms' }}
          className={
            toolBoxControllVisibility ? 'toolbox-controls-icon-animate' : ''
          }
          onClick={(e) => e.stopPropagation()}
        >
          <InsertLinkIcon />
        </IconBox>
      </ToolBoxControls>
    </ToolBoxDiv>
  );
};

export default ToolBox;

// === interface
interface IToolBox {
  focusState: number;
}

// === style
const ToolBoxDiv = styled.div`
  --top-pos: 36px;
  --left-pos: 8px;
  position: absolute;
  top: var(--top-pos);
  left: var(--left-pos);

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  color: grey;

  transition: top 0.3s ease;
`;

const IconBox = styled.div`
  border: 1px solid grey;
  border-radius: 50%;
  padding: 3px 4px 1px;
  margin-right: 8px;
  background-color: white;

  rotate: 0deg;
  transition: rotate 0.3s ease;

  &:hover {
    color: black;
    border: 1px solid black;
  }

  &.toolbox-controls-icon-animate {
    scale: 0.5;
    opacity: 0;
    animation: scallingAnimation 0.2s forwards;
  }

  @keyframes scallingAnimation {
    from {
      scale: 0.5;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }

  &.toolbox-controlling-icon {
    rotate: 45deg;
  }
`;

const ToolBoxControls = styled.div`
  display: none;
  pointer-events: none;
  grid-auto-flow: column;
  grid-template-columns: max-content;
  place-content: center;

  &.show-toolbox-controls {
    display: grid;
    visibility: unset;
    pointer-events: auto;
  }
`;
