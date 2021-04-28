import React from 'react';
import _ from 'lodash';

import Action from './Action';

export default class FooterMenu extends React.Component {
    render() {
        const menu = _.get(this.props, 'menu');
        return (
            <ul className="footer__menu list-none pl-0 m-0">
            {_.map(menu, (item, index) => (
                <li key={index} className="mb-2">
                    <Action action={item} />
                </li>
            ))}
            </ul>
        );
    }
}
