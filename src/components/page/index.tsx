import * as React from 'react';

export interface PageProps {
    name: string;
}

export class Page extends React.Component<PageProps, {}> {
    render() {
        const { name, children } = this.props;
        return (
            <div className={`page ${name}-page`}>
                {children}
            </div>
        );
    }
}
