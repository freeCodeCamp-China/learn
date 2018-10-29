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
    <Helmet title='freeCodecamp 中文社区' />
    <Spacer />
    <Spacer />
    <h2>欢迎体验 freeCodeCamp 2018 年新版课程</h2>
    <p>我们准备了成千上万个编程关卡来帮助提升你的编程技能。</p>
    <p>每当独立完成 5 个终极项目，你就可以获得一个免费证书。</p>
    <p>是的，关卡、项目、证书、服务器 这些都是 100% 免费的。</p>
    <p>这一切都要感谢{' '}
      <a href='Https://github.com/freeCodeCamp' target='_blank'>
        freeCodeCamp 
      </a>{' '}
      和 <a href='Https://netlify.com' target='_blank'>
        netlify 
      </a>。
    </p>
    <p>
      如果你是编程新手，我们推荐你{' '}
      <Link to={slug}>从头开始</Link>。
    </p>
    <p>
      如果你是编程老手，我们推荐你 自由跳跃。
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
