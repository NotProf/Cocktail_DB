import {Cocktails} from './Cocktails';

export class FilterList {
  constructor(
    public filters: Collection[] = []
  ) {}
}
class Collection {
  constructor(
    public filterName = [],
    public cocktails: Cocktails = new Cocktails()
  ) {}
}
