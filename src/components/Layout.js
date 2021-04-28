import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { withPrefix } from '../utils';
import '../sass/main.scss';
import Header from './Header';
import Footer from './Footer';

export const query = graphql`
    fragment LayoutFragment on ContentfulConfig {
        title {
            title
        }
        domain {
            domain
        }
        ...HeaderFragment
        ...FooterFragment
    }
`;

export default class Body extends React.Component {
    render() {
        const page = _.get(this.props, 'page');
        const pageTitle = _.get(page, 'title.title');
        const pageTemplate = _.get(page, 'sys.contentType.sys.id');
        const config = _.get(this.props, 'config');
        const configTitle = _.get(config, 'title.title');
        const domain = _.trim(_.get(config, 'domain.domain', ''), '/');
        const seo = _.get(page, 'seo');
        const seoTitle = _.get(seo, 'title.title');
        const title = seoTitle ? seoTitle : [pageTitle, configTitle].join(' | ');
        const seoDescription = _.get(seo, 'description.description', '');
        const seoRobots = _.get(seo, 'robots', []).join(',');
        const seoExtra = _.get(seo, 'extra', []).map((meta, index) => {
            const keyName = _.get(meta, 'keyName.keyName', 'name');
            const name = _.get(meta, 'name.name');
            if (!name) {
                return null;
            }
            const nameAttr = { [keyName]: name };
            const relativeUrl = _.get(meta, 'relativeUrl');
            let value = _.get(meta, 'value.value');
            if (!value) {
                return null;
            }
            if (relativeUrl) {
                if (!domain) {
                    return null;
                }
                value = domain + withPrefix(value);
            }
            return <meta key={index} {...nameAttr} content={value} />;
        });

        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={seoDescription} />
                    {!_.isEmpty(seoRobots) && <meta name="robots" content={seoRobots} />}
                    {seoExtra}
                    {_.get(config, 'favicon') && <link rel="icon" href={_.get(config, 'favicon.file.url')}/>}
                    <body className={`template-${pageTemplate}`} />
                </Helmet>
                <div id="site-wrap" className="site">
                    <Header {...this.props} />
                    <main id="content" className="site-content">
                        {this.props.children}
                    </main>
                    <Footer {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}
