import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { graphql, StaticQuery } from 'gatsby';

import { classNames, Link, postUrl } from '../utils';
import BlogPostCategory from '../components/BlogPostCategory';
import BlogPostAuthor from '../components/BlogPostAuthor';

export const query = graphql`
    fragment BlogFeedSectionFragment on ContentfulBlogFeedSection {
        sys {
            contentType {
                sys {
                    id
                }
            }
        }
        section_id {
            section_id
        }
        padding_bottom
        padding_top
        show_recent
        recent_count
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
    }
`;

const staticPostGraphQLQuery = graphql`
    query PostsQuery {
        allContentfulPost(sort: { fields: [date], order: DESC }) {
            edges {
                node {
                    image {
                        file {
                            url
                        }
                    }
                    slug
                    title {
                        title
                    }
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
                }
            }
        }
    }
`;

export default class BlogFeedSection extends React.Component {
    renderPosts(section, posts) {
        const showRecent = _.get(section, 'show_recent');
        const recentCount = _.get(section, 'recent_count', 3);
        posts = _.orderBy(posts, 'date', 'desc');
        if (showRecent) {
            posts = _.take(posts, recentCount);
        }
        return _.map(posts, (post, index) => {
            return <React.Fragment key={index}>{this.renderBlogFeedItemFilter(section, post)}</React.Fragment>;
        });
    }

    renderBlogFeedItemFilter(section, post) {
        const sectionAuthorId = _.get(section, 'author.author_id.author_id');
        const sectionCategoryId = _.get(section, 'category.category_id.category_id');
        if (sectionAuthorId) {
            const postAuthorId = _.get(post, 'author.author_id.author_id');
            if (postAuthorId === sectionAuthorId) {
                return this.renderBlogFeedItem(section, post);
            }
        } else if (sectionCategoryId) {
            const postCategoryId = _.get(post, 'category.category_id.category_id');
            if (postCategoryId === sectionCategoryId) {
                return this.renderBlogFeedItem(section, post);
            }
        } else {
            return this.renderBlogFeedItem(section, post);
        }
        return null;
    }

    renderBlogFeedItem(section, post) {
        return (
            <article className="post-card cell-12 cell-sm-6 cell-md-4 mb-3 mb-sm-4">
                {_.get(post, 'image') && (
                    <Link className="post-card__image mb-3" to={postUrl(post)}>
                        <img src={_.get(post, 'image.file.url')} alt={_.get(post, 'image_alt.image_alt', '')} />
                    </Link>
                )}
                <header className="post-card__header">
                    {_.get(post, 'category') && (
                        <div className="post-card__category mb-1">
                            <BlogPostCategory category={_.get(post, 'category')} />
                        </div>
                    )}
                    <h2 className="post-card__title h4 m-0">
                        <Link to={postUrl(post)}>{_.get(post, 'title.title')}</Link>
                    </h2>
                    <div className="post-card__meta mt-3">
                        {_.get(post, 'author') && (
                            <React.Fragment>
                                <BlogPostAuthor author={_.get(post, 'author')} />
                                <span className="sep">|</span>
                            </React.Fragment>
                        )}
                        <time dateTime={moment(_.get(post, 'date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'date')).strftime('%B %d, %Y')}</time>
                    </div>
                </header>
            </article>
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id.section_id');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');

        return (
            <StaticQuery
                query={staticPostGraphQLQuery}
                render={(data) => (
                    <section
                        {...(sectionId ? ({id: sectionId}) : null)}
                        className={classNames('section', 'section--posts', {
                            'pt-3': paddingTop === 'small',
                            'pt-4': paddingTop === 'medium' || paddingTop === 'large',
                            'pt-sm-5': paddingTop === 'large',
                            'pb-3': paddingBottom === 'small',
                            'pb-4': paddingBottom === 'medium' || paddingBottom === 'large',
                            'pb-sm-5': paddingBottom === 'large'
                        })}
                    >
                        <div className="container">
                            <div className="grid">
                                {this.renderPosts(section, _.map(data.allContentfulPost.edges, ({ node }) => node))}
                            </div>
                        </div>
                    </section>
                )}
            />
        );
    }
}
