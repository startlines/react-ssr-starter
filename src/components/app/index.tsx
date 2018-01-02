import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Link } from 'react-router-dom';

export interface AppProps {
    route: RouteConfig;
    data: any[];
}

export class App extends React.Component<any> {
    render() {
        const { route = {}, data = [] } = this.props;
        console.log(this.props);

        const childData = data.slice(1);

        return (
            <div className="app-wrap">
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
                {renderRoutes(route.routes, { data: childData.length > 1 ? childData : childData[0] })}
            </div>
        );
    }
}
