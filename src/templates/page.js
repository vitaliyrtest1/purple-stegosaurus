import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { Layout } from '../components/index';
import { markdownify } from '../utils';

export const query = graphql`
    query PageQuery($contentfulId: String!) {
        contentfulConfig {
            ...LayoutFragment
        }
        contentfulPage(contentful_id: { eq: $contentfulId }) {
            sys {
                contentType {
                    sys {
                        id
                    }
                }
            }
            title {
                title
            }
            slug
            content {
                content
            }
            seo {
                title {
                    title
                }
                description {
                    description
                }
                extra {
                    name {
                        name
                    }
                    value {
                        value
                    }
                    keyName {
                        keyName
                    }
                    relativeUrl
                }
            }
        }
    }
`;

export default class Page extends React.Component {
    render() {
        const config = _.get(this.props, 'data.contentfulConfig');
        const page = _.get(this.props, 'data.contentfulPage');

        return (
            <Layout page={page} config={config} path={this.props.path}>
                <article className="page py-3 py-sm-4">
                    <div className="container">
                        <div className="maxw-small mx-auto">
                            <header className="page__header text-center mb-3 mb-sm-4">
                                <h1 className="page__title">{_.get(page, 'title.title')}</h1>
                            </header>
                            <div className="page__copy mb-3 mb-sm-4">
                                {markdownify(_.get(page, 'content.content'))}
                            </div>
                        </div>
                    </div>
                </article>
            </Layout>
        );
    }
}
