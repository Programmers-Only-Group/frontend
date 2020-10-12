import styled from 'styled-components';
import colors from 'styles/colors';
import typography from 'styles/typography';

export const StyledYearBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  height: 23px;
`;

export const StyledYear = styled.p`
  ${typography.body.L}
  display: flex;
  align-items: center;
  color: ${colors.background.Neutral20};

  &.first {
    color: ${colors.background.Neutral40};
  }

  &.second {
    color: ${colors.background.Neutral60};
  }
`;

export const StyledGradient = styled.span`
  position: absolute;
  width: 39px;
  height: 22px;

  &.left {
    left: 0;
    background: linear-gradient(90deg, #ffffff 0%, #ffffff 22.92%, rgba(255, 255, 255, 0) 100%);
  }
  &.right {
    right: 0;
    background: linear-gradient(-90deg, #ffffff 0%, #ffffff 22.92%, rgba(255, 255, 255, 0) 100%);
  }
`;
