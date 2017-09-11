import * as cp from 'child_process';
import { Task } from './common';

export default class ServerTask implements Task<any> {

    private _server: cp.ChildProcess;

    private _peddng = false;

    constructor() {
        process.on('exit', this._kill);
    }

    run() {
        return new Promise((resolve, reject) => {

            function _stdOutHandler(data) {
                const time = new Date().toTimeString();
                const match = data.toString().match(/a/);        // todo

                process.stdout.write(time);        // todo
                process.stdout.write(data);

                if (match) {
                    // this._server.host = match[1];
                    this._server.stdout.removeListener('data', this._stdOutHandler);
                    this._server.stdout.on('data', d => process.stdout.write(d));
                    this._peddng = false;
                    resolve(this._server);
                }
            }

        });
    }

    private _kill() {
        this._server && this._server.kill('SIGTERM');
    }
}
