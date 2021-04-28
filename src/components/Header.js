import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { classNames, Link, withPrefix } from '../utils';
import Icon from './Icon';
import HeaderMenu from './HeaderMenu';

export const query = graphql`
    fragment HeaderFragment on ContentfulConfig {
        header {
            logo {
                file {
                    url
                }
            }
            logo_inverse {
                file {
                    url
                }
            }
            logo_alt {
                logo_alt
            }
            has_primary_nav
            primary_nav_links {
                ...ActionFragment
            }
            has_secondary_nav
            secondary_nav_links {
                ...ActionFragment
            }
          }
    }
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.menuOpenRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize, true);
        window.addEventListener('popstate', this.handleRouteChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize, true);
        window.removeEventListener('popstate', this.handleRouteChange);
    }

    handleWindowResize() {
        if (_.get(this.menuOpenRef, 'current.offsetParent') === null) {
            document.body.classList.remove('js-nav-open');
        }
    }

    handleRouteChange() {
        document.body.classList.remove('js-nav-open');
    }

    handleMenuToggle(event) {
        event.preventDefault();
        document.body.classList.toggle('js-nav-open');
    }

    render() {
        const config = _.get(this.props, 'config');
        const page = _.get(this.props, 'page');
        const hasInverseHeader = _.get(page, 'has_inverse_header');
        const header = _.get(config, 'header');
        const hasPrimaryNav = _.get(header, 'has_primary_nav');
        const primaryNavLinks = _.get(header, 'primary_nav_links');
        const hasSecondaryNav = _.get(header, 'has_secondary_nav');
        const secondaryNavLinks = _.get(header, 'secondary_nav_links');

        return (
            <header className={classNames('masthead', 'py-2', 'py-sm-3', {'inverse': hasInverseHeader})}>
                <div className="container">
                    <nav className="navbar flex items-center" aria-label="Main Navigation">
                        <Link className="sr-only" to="#content">Skip to main content</Link>
                        {hasInverseHeader ? (
                            _.get(header, 'logo_inverse') ? (
                                <Link className="navbar__logo mr-auto" to={withPrefix('/')}>
                                    <img src={_.get(header, 'logo_inverse.file.url')} alt={_.get(header, 'logo_alt.logo_alt', '')} />
                                </Link>
                            ) : (
                                <Link className="navbar__title h4 mr-auto" to={withPrefix('/')}>{_.get(config, 'title.title')}</Link>
                            )
                        ) : (
                            _.get(header, 'logo') ? (
                                <Link className="navbar__logo mr-auto" to={withPrefix('/')}>
                                    <img src={_.get(header, 'logo.file.url')} alt={_.get(header, 'logo_alt.logo_alt', '')} />
                                </Link>
                            ) : (
                                <Link className="navbar__title h4 mr-auto" to={withPrefix('/')}>{_.get(config, 'title.title')}</Link>
                            )
                        )}
                        {(hasPrimaryNav || hasSecondaryNav) && (
                            <React.Fragment>
                                <button aria-label="Menu" className="navbar__hamburger-button js-nav-toggle ml-3" ref={this.menuOpenRef} onClick={this.handleMenuToggle.bind(this)}>
                                    <Icon icon="menu" />
                                </button>
                                <div className="navbar__menu ml-md-auto">
                                    <div className="navbar__scroller">
                                        <div className="navbar__inner flex-md items-md-center">
                                            <button aria-label="Close" className="navbar__close-button js-nav-toggle" onClick={this.handleMenuToggle.bind(this)}>
                                                <Icon icon="close" />
                                            </button>
                                            {hasPrimaryNav && !_.isEmpty(primaryNavLinks) && (
                                                <HeaderMenu menu={primaryNavLinks} pageUrl={_.get(this.props, 'path')} menuClass="navbar__list--primary" />
                                            )}
                                            {hasSecondaryNav && !_.isEmpty(secondaryNavLinks) && (
                                                <HeaderMenu menu={secondaryNavLinks} pageUrl={_.get(this.props, 'path')} menuClass="navbar__list--secondary" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </nav>
                </div>
            </header>
        );
    }
}
