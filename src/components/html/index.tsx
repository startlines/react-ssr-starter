// tslint:disable:max-line-length
import * as React from 'react';

export interface HtmlProps {
    title?: string;
    description?: string;
    scripts: string[];
    styles: string[];
    data?: any[];
}

export class Html extends React.Component<HtmlProps> {
    render() {
        const {
            title = '',
            description = '',
            scripts = [],
            children,
            data = [],
         } = this.props;

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <base href="/" />
                    {/* {scripts.map(script => (
                        <link key={script} rel="preload" href={script} as="script" />
                    ))} */}
                    {/* {styles.map(style => (
                        <style
                            key={style.id}
                            id={style.id}
                            dangerouslySetInnerHTML={{ __html: style.cssText }}
                        />
                    ))} */}
                </head>
                <body>
                    <div id="app">{children}</div>
                    <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(data)};` }} />
                    {scripts.map(script => <script key={script} src={script} />)}
                </body>
            </html>
        );
    }
}
