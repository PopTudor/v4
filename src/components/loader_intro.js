import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { IconLoaderIntro } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins } from '@styles';
const { colors } = theme;

const LoaderContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.bodyBackground};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;
const LogoWrapper = styled.div`
  ${mixins.flexCenter};
  width: max-content;
  max-width: 100px;
  transition: ${theme.transition};
  opacity: ${props => (props.isMounted ? 1 : 0)};
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    fill: none;
    user-select: none;
    #B {
      opacity: 0;
    }
  }
`;
const LoaderText = styled.div`
  color: ${colors.offWhite};
  font-size: 2em;
`;
const LoaderIntro = ({ finishLoading }) => {
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '#logo path',
        delay: 10,
        duration: 200,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #B',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo',
        delay: 200,
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <LoaderContainer className="loader">
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <LogoWrapper isMounted={isMounted}>
        <LoaderText>Loading</LoaderText>
      </LogoWrapper>
    </LoaderContainer>
  );
};

LoaderIntro.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default LoaderIntro;
