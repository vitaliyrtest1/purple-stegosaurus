import React from 'react';
import _ from 'lodash';

import {classNames} from '../utils';
import Action from './Action';

export default class HeaderMenu extends React.Component {
    render() {
        const menu = _.get(this.props, 'menu');
        const menuClass = _.get(this.props, 'menuClass');
        return (
            <ul className={`navbar__list list-none pl-0 mb-0 flex-md items-md-center ${menuClass ? menuClass : ''}`}>
                {_.map(menu, (item, index) => {
                    const pageUrl = _.trim(_.get(this.props, 'pageUrl'), '/');
                    const itemUrl = _.trim(_.get(item, 'url.url'), '/');
                    return (
                        <li
                            key={index}
                            className={classNames('navbar__item', {'is-active': pageUrl === itemUrl})}
                        >
                            <Action action={item} />
                        </li>
                    )
                })}
            </ul>
        );
    }
}
