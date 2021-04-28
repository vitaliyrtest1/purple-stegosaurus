import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { classNames, htmlToReact, markdownify } from '../utils';
import SectionActions from './SectionActions';

export const query = graphql`
    fragment HeroSectionFragment on ContentfulHeroSection {
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
        background_image {
            file {
                url
            }
        }
        background_image_opacity
        background_image_position
        background_image_repeat
        background_image_size
        align
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

export default class HeroSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id.section_id');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const alignX = _.get(section, 'align', 'left');
        const backgroundColor = _.get(section, 'background_color', 'none');
        const backgroundImage = _.get(section, 'background_image');
        const backgroundImageOpacity = _.get(section, 'background_image_opacity', 100) * 0.01;
        const backgroundImageSize = _.get(section, 'background_image_size', 'auto');
        const backgroundImagePosition = _.get(section, 'background_image_position', 'center center');
        const backgroundImageRepeat = _.get(section, 'background_image_repeat', 'no-repeat');

        return (
            <section
                {...(sectionId ? ({id: sectionId}) : null)}
                className={classNames('section', 'hero', {
                    'bg-image': backgroundImage,
                    'bg-light': backgroundColor === 'light',
                    'bg-dark': backgroundColor === 'dark',
                    'inverse': backgroundColor === 'dark',
                    'pt-3': paddingTop === 'small',
                    'pt-4': (paddingTop === 'medium') || (paddingTop === 'large'),
                    'pt-sm-5': paddingTop === 'large',
                    'pb-3': paddingBottom === 'small',
                    'pb-4': (paddingBottom === 'medium') || (paddingBottom === 'large'),
                    'pb-sm-5': paddingBottom === 'large'
                })}
            >
                {backgroundImage && (
                    <div
                        className="bg-image__image"
                        style={{
                            backgroundImage: `url('${backgroundImage.file.url}')`,
                            opacity: backgroundImageOpacity,
                            backgroundSize: backgroundImageSize,
                            backgroundPosition: backgroundImagePosition,
                            backgroundRepeat: backgroundImageRepeat
                        }}
                    />
                )}
                <div className="container">
                    <div className={classNames('section__body', { 'text-center': alignX === 'center' })}>
                        {_.get(section, 'title.title') && (
                            <h1 className={classNames('section__title', 'maxw-medium', { 'mx-auto': alignX === 'center' })}>{htmlToReact(_.get(section, 'title.title'))}</h1>
                        )}
                        {_.get(section, 'content.content') && (
                            <div className={classNames('section__copy', 'maxw-small', { 'mx-auto': alignX === 'center' })}>
                                {markdownify(_.get(section, 'content.content'))}
                            </div>
                        )}
                        {!_.isEmpty(_.get(section, 'actions')) && (
                            <div className={classNames('section__actions', 'button-group', 'maxw-small', 'mt-3', 'mt-sm-4', { 'mx-auto': alignX === 'center' })}>
                                <SectionActions actions={_.get(section, 'actions')} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
