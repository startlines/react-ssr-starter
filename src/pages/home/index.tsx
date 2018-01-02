import * as React from 'react';
import { Page } from '../../components';

export interface HomePageProps {
    data: any;
}

export interface HomePageState {
    data: any;
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {

    static async initFetch() {
        const data = await Promise.resolve('111');
        return data;
    }

    constructor(props: any) {
        super(props);
    }

    async componentWillMount() {
        const data = await HomePage.initFetch();
        this.setState({ data });
    }

    render() {
        const data = this.props.data || this.state.data;
        return (
            <Page name="home">
                home page
                data: {data}
            </Page>
        );
    }
}
