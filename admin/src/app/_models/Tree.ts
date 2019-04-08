export interface Tree {
  name: string ;
  id: number;
  _id? : string;
  parentId : number;
  parent? : Tree;
  childrens: Tree[];
  options?: TreeItemOptions;
}

export interface TreeItemOptions {
  // item options
  href?: string;
  hidden?: boolean;
  hideChildrens?: boolean;
  draggable?: boolean;
  position?: number;
  edit?: boolean;
  disabled?: boolean;
  // item buttons
  showDropChildZone?: boolean;
  showActionButtons?: boolean;
  showDeleteButton?: boolean;
  showExpandButton?: boolean;
}
