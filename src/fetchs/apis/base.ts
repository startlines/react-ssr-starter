import { APIs } from '../../config';
import { Http } from '../common';

export class BaseAPI {
    protected http = new Http({

    });

    protected apis = APIs;
}
