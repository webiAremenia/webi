export interface Menu {
  id: number;
  title: {
    en: string,
    ru: string,
    am: string
  };
  type : string;
  typeId : string;
  parent: number;
  order: number;
}
