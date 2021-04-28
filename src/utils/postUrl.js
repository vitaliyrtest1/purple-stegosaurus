import _ from 'lodash';
import withPrefix from './withPrefix';

export default function postUrl(post) {
    const slug = _.trim(_.get(post, 'slug'), '/');
    return withPrefix(`blog/${slug}`);
}
