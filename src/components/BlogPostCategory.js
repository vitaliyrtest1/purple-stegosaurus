import React from 'react';
import _ from 'lodash';

import { Link, withPrefix } from '../utils';

export default class BlogPostCategory extends React.Component {
    render() {
        const category = _.get(this.props, 'category');
        const categoryLink = _.get(category, 'link.link');
        const categoryTitle = _.get(category, 'title.title');

        return (
            categoryLink ? (
                <Link to={withPrefix(categoryLink)}>{categoryTitle}</Link>
            ) : (
                <span>{categoryTitle}</span>
            )
        );
    }
}
