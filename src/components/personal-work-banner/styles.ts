import styled from 'styled-components';
import { Wrap } from '~/components/wrap';
import { fromTablet } from '~/styles/breakpoints';

export const Banner = styled.section`
  text-align: center;
  padding: 4rem 0;
`;

export const Container = styled(Wrap)`
  max-width: 102.4rem;
`;

export const Description = styled.p`
  font-size: 1.4rem;
  max-width: 82rem;
  margin: 0 auto;
`;

export const Projects = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Link = styled.a`
  font-size: 1.4rem;
  color: inherit;
  text-decoration: inherit;
`;

export const ProjectImage = styled.img`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  transition: opacity 0.2s ease;
`;

export const Project = styled.article`
  width: 48%;
  margin-top: 2rem;

  &:hover {
    ${ProjectImage} {
      opacity: 0.9;
    }
  }

  &:nth-child(-n + 2) {
    margin-top: 0;
  }

  @media ${fromTablet} {
    width: 24%;
    margin-top: 0;
  }
`;