import * as webpack from 'webpack';
import { Client, Server } from '../webpack.config';
import { Task } from './common';

export default class BundleTask implements Task<{}> {

    run() {
        return new Promise((resolve, reject) =>
            webpack([Client, Server]).run((err, stats) => {
                if (err) return reject(err);
                this._log(stats);
                return resolve();
            }),
        );
    }

    private _log(stats: webpack.Stats) {
        // tslint:disable-next-line:no-console
        console.log(stats.toString(Client.stats));
    }

}
