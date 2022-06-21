export class Book {
  title;
  isbn;
  coverSrc;
  constructor(title: string, isbn: string, coverSrc: string) {
    this.title = title;
    this.isbn = isbn;
    this.coverSrc = coverSrc;
  }
}
