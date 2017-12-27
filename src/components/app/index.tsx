import * as React from 'react';

export class App extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className="app-wrap">
                {children}
            </div>
        );
    }
}
