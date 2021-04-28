import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { graphql} from 'gatsby';

import { Layout } from '../components/index';
import { markdownify } from '../utils';
import BlogPostCategory from '../components/BlogPostCategory';
import BlogPostAuthor from '../components/BlogPostAuthor';

export const query = graphql`
    query PostQuery($contentfulId: String!) {
        contentfulConfig {
            ...LayoutFragment
        }
        contentfulPost(contentful_id: { eq: $contentfulId }) {
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
            date
            author {
                author_id {
                    author_id
                }
                link {
                    link
                }
                last_name {
                    last_name
                }
                first_name {
                    first_name
                }
            }
            category {
                category_id {
                    category_id
                }
                link {
                    link
                }
                title {
                    title
                }
            }
            image {
                file {
                    url
                }
            }
            image_alt {
                image_alt
            }
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

export default class Post extends React.Component {
    render() {
        const config = _.get(this.props, 'data.contentfulConfig');
        const page = _.get(this.props, 'data.contentfulPost');


        console.log(_.get(page, 'author'))

        return (
            <Layout page={page} config={config} path={this.props.path}>
                <article className="post py-3 py-sm-4">
                    <header className="post__header mb-3 mb-sm-4">
                        <div className="container">
                            <div className="text-sm-center maxw-medium mx-auto">
                                {_.get(page, 'category') && (
                                    <div className="post__category mb-2 mb-sm-3">
                                        <BlogPostCategory category={_.get(page, 'category')} />
                                    </div>
                                )}
                                <h1 className="post__title m-0">{_.get(page, 'title.title')}</h1>
                                <div className="post__meta mt-3 mt-sm-4">
                                    {_.get(page, 'author') && (
                                        <React.Fragment>
                                            <BlogPostAuthor author={_.get(page, 'author')} />
                                            <span className="sep">|</span>
                                        </React.Fragment>
                                    )}
                                    <time dateTime={moment(_.get(page, 'date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(page, 'date')).strftime('%B %d, %Y')}</time>
                                </div>
                            </div>
                        </div>
                    </header>
                    {_.get(page, 'image') && (
                        <div className="post__image mb-3 mb-sm-4">
                            <img src={_.get(page, 'image.file.url')} alt={_.get(page, 'image_alt.image_alt', '')} />
                        </div>
                    )}
                    <div className="post__copy mb-3 mb-sm-4">
                        <div className="container">
                            <div className="maxw-small mx-auto">
                                {markdownify(_.get(page, 'content.content'))}
                            </div>
                        </div>
                    </div>
                </article>
            </Layout>
        );
    }
}
