import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { classNames, markdownify } from '../utils';

export const query = graphql`
    fragment ContentSectionFragment on ContentfulContentSection {
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
        title {
            title
        }
        content {
            content
        }
    }
`;

export default class ContentSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id.section_id');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');

        return (
            <section
                {...(sectionId ? ({id: sectionId}) : null)}
                className={classNames('section', 'section--text', {
                    'pt-3': paddingTop === 'small',
                    'pt-4': paddingTop === 'medium' || paddingTop === 'large',
                    'pt-sm-5': paddingTop === 'large',
                    'pb-3': paddingBottom === 'small',
                    'pb-4': paddingBottom === 'medium' || paddingBottom === 'large',
                    'pb-sm-5': paddingBottom === 'large'
                })}
            >
                <div className="container">
                    <div className="section__body maxw-small mx-auto">
                        {_.get(section, 'title.title') && (
                            <h2 className="section__title align-center">{_.get(section, 'title.title')}</h2>
                        )}
                        {_.get(section, 'content.content') && (
                            <div className="section__copy">
                                {markdownify(_.get(section, 'content.content'))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
