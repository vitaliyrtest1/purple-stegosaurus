import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { classNames, markdownify } from '../utils';
import SectionActions from './SectionActions';

export const query = graphql`
    fragment CtaSectionFragment on ContentfulCtaSection {
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
        background_color
        title {
            title
        }
        content {
            content
        }
        actions {
            ...ActionFragment
        }
    }
`;

export default class CtaSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id.section_id');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const backgroundColor = _.get(section, 'background_color', 'none');

        return (
            <section
                {...(sectionId ? ({id: sectionId}) : null)}
                className={classNames('section', 'section--cta', {
                    'bg-light': backgroundColor === 'light',
                    'bg-dark': backgroundColor === 'dark',
                    'inverse': backgroundColor === 'dark',
                    'pt-3': paddingTop === 'small',
                    'pt-4': paddingTop === 'medium' || paddingTop === 'large',
                    'pt-sm-5': paddingTop === 'large',
                    'pb-3': paddingBottom === 'small',
                    'pb-4': paddingBottom === 'medium' || paddingBottom === 'large',
                    'pb-sm-5': paddingBottom === 'large'
                })}
            >
                <div className="container">
                    <div className="section__body maxw-medium mx-sm-auto text-sm-center">
                        {_.get(section, 'title.title') && (
                            <h2 className="section__title h6">{_.get(section, 'title.title')}</h2>
                        )}
                        {_.get(section, 'content.content') && (
                            <div className="section__copy">
                                {markdownify(_.get(section, 'content.content'))}
                            </div>
                        )}
                        {!_.isEmpty(_.get(section, 'actions')) && (
                            <div className="section__actions button-group">
                                <SectionActions actions={_.get(section, 'actions')} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
