import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';

export const query = graphql`
    fragment ActionFragment on ContentfulAction {
        label {
            label
        }
        url {
            url
        }
        style
        has_icon
        icon
        icon_position
    }
`;

export default class Action extends React.Component {
    render() {
        const action = _.get(this.props, 'action');
        const style = _.get(action, 'style', 'link');
        const hasIcon = _.get(action, 'has_icon');
        const icon = _.get(action, 'icon', 'arrow-left');
        const iconPosition = _.get(action, 'icon_position', 'left');

        return (
            <Link
                to={withPrefix(_.get(action, 'url.url'))}
                className={classNames({
                    'button': style === 'primary' || style === 'secondary' || hasIcon,
                    'button--secondary': style === 'secondary',
                    'button--icon': hasIcon && iconPosition === 'center',
                    'button--clear': hasIcon && style === 'link'
                })}
            >
                {hasIcon ? (
                    <React.Fragment>
                        <Icon icon={icon} />
                        <span
                            className={classNames({
                                'order-first': iconPosition === 'right',
                                'mr-1': iconPosition === 'right',
                                'ml-1': iconPosition === 'left',
                                'sr-only': iconPosition === 'center'
                            })}
                        >
                            {_.get(action, 'label.label')}
                        </span>
                    </React.Fragment>
                ) : (
                    _.get(action, 'label.label')
                )}
            </Link>
        );
    }
}
