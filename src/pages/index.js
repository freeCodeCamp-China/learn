/* global graphql */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  ChallengeNode,
  AllChallengeNode,
  AllMarkdownRemark
} from '../redux/propTypes';
import Spacer from '../components/util/Spacer';
import Map from '../components/Map';

import './index.css';

const mapStateToProps = () => ({});

const propTypes = {
  data: PropTypes.shape({
    challengeNode: ChallengeNode,
    allChallengeNode: AllChallengeNode,
    allMarkdownRemark: AllMarkdownRemark
  })
};

const IndexPage = ({
  data: {
    challengeNode: { fields: { slug } },
    allChallengeNode: { edges },
    allMarkdownRemark: { edges: mdEdges }
  }
}) => (
  <div className='index-page-wrapper'>
    <Helmet title='FCC 中文社区' />
    <Spacer />
    <Spacer />
    <h2>欢迎来到 freeCodeCamp 2018年新版课程</h2>
    <p>我们准备了成千上万的编程挑战来帮助提升你的编程技能。</p>
    <p>每当独立完成5个终极项目，你就可以获得一个免费证书。</p>
    <p>是的，你没看错，所有的课程都是免费的。</p>
    <p>这一切要感谢成千上万的学员{' '}
      <a href='https://donate.freecodecamp.org' target='_blank'>
        捐款
      </a>{' '}
      给我们。
    </p>
    <p>
      如果你是编程新手，我们推荐你{' '}
      <Link to={slug}>从头开始</Link>。
    </p>
    <Spacer />
    <Map
      introNodes={mdEdges.map(({ node }) => node)}
      nodes={edges
        .map(({ node }) => node)
        .filter(({ isPrivate }) => !isPrivate)}
    />
  </div>
);

IndexPage.displayName = 'IndexPage';
IndexPage.propTypes = propTypes;

export default connect(mapStateToProps)(IndexPage);

export const query = graphql`
  query FirstChallenge {
    challengeNode(order: { eq: 0 }, suborder: { eq: 1 }) {
      fields {
        slug
      }
    }
    allChallengeNode(
      filter: { isPrivate: { eq: false } }
      sort: { fields: [superOrder, order, suborder] }
    ) {
      edges {
        node {
          fields {
            slug
            blockName
          }
          id
          block
          title
          isRequired
          isPrivate
          superBlock
          dashedName
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { block: { ne: null } } }) {
      edges {
        node {
          frontmatter {
            title
            block
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
