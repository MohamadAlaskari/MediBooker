declare module 'jquery' {
  interface JQuery<TElement = HTMLElement> {
    modal(options?: any): JQuery;
  }
}
