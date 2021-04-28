import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import components, { Layout } from '../components/index';

export const query = graphql`
    query AdvancedQuery($contentfulId: String!) {
        contentfulConfig {
            ...LayoutFragment
        }
        contentfulAdvanced(contentful_id: { eq: $contentfulId }) {
            sys {
                contentType {
                    sys {
                        id
                    }
                }
            }
            has_inverse_header
            title {
                title
            }
            slug
            sections {
                ... on ContentfulBlogFeedSection {
                    ...BlogFeedSectionFragment
                }
                ... on ContentfulContentSection {
                    ...ContentSectionFragment
                }
                ... on ContentfulCtaSection {
                    ...CtaSectionFragment
                }
                ... on ContentfulFeatureSection {
                    ...FeatureSectionFragment
                }
                ... on ContentfulHeroSection {
                    ...HeroSectionFragment
                }
                ... on ContentfulStatsSection {
                    ...StatsSectionFragment
                }
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

export default class Advanced extends React.Component {
    render() {
        const config = _.get(this.props, 'data.contentfulConfig');
        const page = _.get(this.props, 'data.contentfulAdvanced');

        return (
            <Layout page={page} config={config} path={this.props.path}>
                {_.map(_.get(page, 'sections'), (section, index) => {
                    const component = _.upperFirst(_.camelCase(_.get(section, 'sys.contentType.sys.id')));
                    const Component = components[component];
                    return (
                        <Component key={index} {...this.props} section={section} />
                    )
                })}
            </Layout>
        );
    }
}
