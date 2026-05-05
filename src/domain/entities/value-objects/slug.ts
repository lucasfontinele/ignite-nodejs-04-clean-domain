export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Creates a slug from the given text.
   *
   * Example: "An example question title" -> "an-example-question-title"
   *
   * @param text The text to create a slug from.
   * @returns A new Slug instance.
   */
  static createFromText(text: string) {
    const slug = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return new Slug(slug);
  }
}
