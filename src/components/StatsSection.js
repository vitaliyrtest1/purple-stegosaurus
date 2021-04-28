import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { classNames } from '../utils';
import SectionActions from './SectionActions';

export const query = graphql`
    fragment StatsSectionFragment on ContentfulStatsSection {
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
        items {
            figure {
                figure
            }
            description {
                description
            }
            actions {
                ...ActionFragment
            }
        }
    }
`;

export default class StatsSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id.section_id');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const backgroundColor = _.get(section, 'background_color', 'none');

        return (
            <section
                {...(sectionId ? ({id: sectionId}) : null)}
                className={classNames('section', 'section--stats', {
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
                    <div className="grid">
                        {_.map(_.get(section, 'items'), (item, index) => (
                            <div key={index} className="stats-item cell-12 cell-sm-4 text-center text-sm-left mb-3 mb-sm-0">
                                {_.get(item, 'figure.figure') && (
                                    <div className="stats-item__figure h1 mb-1">
                                        {_.get(item, 'figure.figure')}
                                    </div>
                                )}
                                {_.get(item, 'description.description') && (
                                    <p className="stats-item__description">
                                        {_.get(item, 'description.description')}
                                    </p>
                                )}
                                {!_.isEmpty(_.get(item, 'actions')) && (
                                    <div className="stats-item__actions button-group">
                                        <SectionActions actions={_.get(item, 'actions')} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}
