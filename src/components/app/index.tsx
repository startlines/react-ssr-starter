import * as React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { Link, Router } from 'react-router-dom';

export interface AppProps extends RouteConfigComponentProps<any> { }

export class App extends React.Component<any> {
    render() {
        const { route = {} } = this.props;
        return (
            <div className="app-wrap">
                app

                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/user">User</Link>
                        </li>
                    </ul>
                </nav>
                {renderRoutes(route.routes)}
            </div>
        );
    }
}
