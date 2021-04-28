import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { classNames, markdownify } from '../utils';
import SectionActions from './SectionActions';

export const query = graphql`
    fragment FeatureSectionFragment on ContentfulFeatureSection {
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
        actions {
            ...ActionFragment
        }
        image {
            file {
                url
            }
        }
        image_alt {
            image_alt
        }
        image_position
    }
`;

export default class FeatureSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id.section_id');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const hasTextContent = _.get(section, 'title.title') || _.get(section, 'subtitle.subtitle') || _.get(section, 'content.content') || !_.isEmpty(_.get(section, 'actions'));
        const imagePosition = _.get(section, 'image_position', 'left');

        return (
            <section
                {...(sectionId ? ({id: sectionId}) : null)}
                className={classNames('section', 'section--feature', {
                    'pt-3': paddingTop === 'small',
                    'pt-4': paddingTop === 'medium' || paddingTop === 'large',
                    'pt-sm-5': paddingTop === 'large',
                    'pb-3': paddingBottom === 'small',
                    'pb-4': paddingBottom === 'medium' || paddingBottom === 'large',
                    'pb-sm-5': paddingBottom === 'large'
                })}
            >
                <div className="container">
                    <div className="grid items-center justify-center">
                        {_.get(section, 'image') && (
                            <div
                                className={classNames('section__image', 'cell-12', {
                                    'cell-sm-7': hasTextContent,
                                    'mb-3': hasTextContent,
                                    'mb-sm-0': hasTextContent
                                })}
                            >
                                <img src={_.get(section, 'image.file.url')} alt={_.get(section, 'image_alt.image_alt', '')} />
                            </div>
                        )}
                        {hasTextContent && (
                            <div
                                className={classNames('section__body', 'cell-12', {
                                    'cell-sm-5': _.get(section, 'image'),
                                    'order-sm-first': imagePosition === 'right'
                                })}
                            >
                                {_.get(section, 'title.title') && (
                                    <h2 className="section__title">{_.get(section, 'title.title')}</h2>
                                )}
                                {_.get(section, 'subtitle.subtitle') && (
                                    <div className="section__subtitle">
                                        {_.get(section, 'subtitle.subtitle')}
                                    </div>
                                )}
                                {_.get(section, 'content.content') && (
                                    <div className="section__copy">
                                        {markdownify(_.get(section, 'content.content'))}
                                    </div>
                                )}
                                {!_.isEmpty(_.get(section, 'actions')) && (
                                    <div className="section__actions button-group mt-3">
                                        <SectionActions actions={_.get(section, 'actions')} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
