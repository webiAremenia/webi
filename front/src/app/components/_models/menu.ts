export interface Menu {
  id: number;
  title: {
    en: string,
    ru: string,
    am: string
  };
  parent: number;
  position: number;
  url: string;
}
