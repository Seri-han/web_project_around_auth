export default class Section {
  constructor(items, renderer, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item) {
    this._items.push(item);
    const element = this._renderer(item); 
    this._container.append(element); 
  }
}