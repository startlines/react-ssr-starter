import { Http } from '../common';
import { APIs } from '../config';

export class BaseAPI {
    protected http = new Http({

    });

    protected apis = APIs;
}