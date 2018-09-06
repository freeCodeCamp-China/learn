import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

import ga from '../analytics';

import Header from '../components/Header';
import DonationModal from '../components/Donation';
import { fetchUser, userSelector } from '../redux/app';

import 'prismjs/themes/prism.css';
import 'react-reflex/styles.css';
import './global.css';
import './layout.css';
import { createSelector } from 'reselect';

const metaKeywords = [
  'javascript',
  'js',
  'website',
  'web',
  'development',
  'free',
  'code',
  'camp',
  'course',
  'courses',
  'html',
  'css',
  'react',
  'redux',
  'api',
  'front',
  'back',
  'end',
  'learn',
  'tutorial',
  'programming',
  'freecodecamp',
  'FCC',
  'FCC 中文社区',
  'Web 前端开发',
  '编程',
  '前端',
  '后端',
  '免费学编程'
];

const mapStateToProps = createSelector(
  userSelector,
  ({ theme = 'default' }) => ({ theme })
);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchUser }, dispatch);

const propTypes = {
  children: PropTypes.func,
  fetchUser: PropTypes.func.isRequired,
  theme: PropTypes.string
};

class Layout extends PureComponent {
  state = {
    location: ''
  };
  componentDidMount() {
    this.props.fetchUser();
    const url = window.location.pathname + window.location.search;
    ga.pageview(url);
    /* eslint-disable react/no-did-mount-set-state */
    // this is for local location tracking only, no re-rendering required
    this.setState(state => ({
      ...state,
      location: url
    }));
  }
  componentDidUpdate() {
    const url = window.location.pathname + window.location.search;
    if (url !== this.state.location) {
      ga.pageview(url);
      /* eslint-disable react/no-did-update-set-state */
      // this is for local location tracking only, no re-rendering required
      this.setState(state => ({
        ...state,
        location: url
      }));
    }
  }
  render() {
    const { children, theme } = this.props;
    return (
      <Fragment>
        <Helmet
          meta={[
            {
              name: 'description',
              content:
                '免费在线学编程、项目实战、面试攻略、找到一份好工作。'
            },
            { name: 'keywords', content: metaKeywords.join(', ') }
          ]}
        />
        <Header />
        <div className={'app-wrapper ' + theme}>
          <main>{children()}</main>
        </div>
        <DonationModal />
      </Fragment>
    );
  }
}

Layout.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
