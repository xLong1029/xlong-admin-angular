import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
  constructor(public http: _HttpClient) {}
}
