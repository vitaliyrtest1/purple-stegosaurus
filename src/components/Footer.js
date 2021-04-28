import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { Link, withPrefix, htmlToReact } from '../utils';
import FooterMenu from './FooterMenu';
import Action from './Action';

export const query = graphql`
    fragment FooterFragment on ContentfulConfig {
        footer {
            logo {
                file {
                    url
                }
            }
            logo_alt {
                logo_alt
            }
            contact_details {
                contact_details
            }
            nav_columns {
                nav_title {
                    nav_title
                }
                nav_links {
                    ...ActionFragment
                }
            }
            has_social
            social_links {
                ...ActionFragment
            }
            copyright_text {
                copyright_text
            }
            links {
                ...ActionFragment
            }
        }
    }
`;

export default class Footer extends React.Component {
    render() {
        const footer = _.get(this.props, 'config.footer');
        const navColumns = _.get(footer, 'nav_columns');
        const hasSocial = _.get(footer, 'has_social');
        const socialLinks = _.get(footer, 'social_links');
        const bottomLinks = _.get(footer, 'links');

        return (
            <footer className="footer bg-dark inverse py-4">
                <div className="container">
                    <div className="footer__cols grid">
                        {!_.isEmpty(navColumns) && (
                            _.map(navColumns, (navColumn, navColumnIndex) => (
                                <div key={navColumnIndex} className="footer__col cell-6 cell-md mb-4">
                                    {_.get(navColumn, 'nav_title.nav_title') && (
                                        <h2 className="footer__title h6 mb-3">{_.get(navColumn, 'nav_title.nav_title')}</h2>
                                    )}
                                    {!_.isEmpty(_.get(navColumn, 'nav_links')) && (
                                        <FooterMenu menu={_.get(navColumn, 'nav_links')} />
                                    )}
                                </div>
                            ))
                        )}
                        {(_.get(footer, 'logo') || _.get(footer, 'contact_details.contact_details') || (hasSocial && !_.isEmpty(socialLinks))) && (
                            <div className="footer__col cell-12 cell-lg text-lg-right mb-4 ml-lg-auto">
                                {_.get(footer, 'logo') && (
                                    <p className="mb-3 mb-sm-4">
                                        <Link to={withPrefix('/')}>
                                            <img src={_.get(footer, 'logo.file.url')} alt={_.get(footer, 'logo_alt.logo_alt', '')} />
                                        </Link>
                                    </p>
                                )}
                                {_.get(footer, 'contact_details.contact_details') && (
                                    <p className="footer__contact mb-3 mb-sm-4">
                                        {htmlToReact(_.get(footer, 'contact_details.contact_details'))}
                                    </p>
                                )}
                                {hasSocial && !_.isEmpty(socialLinks) && (
                                    <ul className="footer__social list-none pl-0 m-0 flex flex-wrap items-center justify-lg-end">
                                        {_.map(socialLinks, (socialLink, socialLinkIndex) => (
                                            <li key={socialLinkIndex} className="mb-2 mr-3 mr-lg-0 ml-lg-3">
                                                <Action action={socialLink} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                    {(!_.isEmpty(bottomLinks) || _.get(footer, 'copyright_text.copyright_text')) && (
                        <div className="footer__bottom">
                            {!_.isEmpty(bottomLinks) && (
                                <ul className="footer__links list-none pl-0 m-0 flex flex-wrap">
                                    {_.map(bottomLinks, (bottomLink, bottomLinkIndex) => (
                                        <li key={bottomLinkIndex} className="mr-2">
                                            <Action action={bottomLink} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {_.get(footer, 'copyright_text.copyright_text') && (
                                <p>{htmlToReact(_.get(footer, 'copyright_text.copyright_text'))}</p>
                            )}
                        </div>
                    )}
                </div>
            </footer>
        );
    }
}
