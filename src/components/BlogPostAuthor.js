import React from 'react';
import _ from 'lodash';

import { Link, withPrefix } from '../utils';

export default class BlogPostAuthor extends React.Component {
    render() {
        const author = _.get(this.props, 'author');
        const authorLink = _.get(author, 'link.link');
        const authorFirstName = _.get(author, 'first_name.first_name', '');
        const authorLastName = _.get(author, 'last_name.last_name', '');
        const authorName = _.trim(`${authorFirstName} ${authorLastName}`);

        return (
            (authorLink) ? (
                <span>By <Link to={withPrefix(authorLink)}>{authorName}</Link></span>
            ) : (
                <span>By {authorName}</span>
            )
        );
    }
}
