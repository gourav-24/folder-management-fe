export interface TreeNode {
    id: string;
    name: string;
    parentData:string,
    parentId:string,
    depth:number,
    children?: TreeNode[];
  }

export interface FileTreeNodeProps {
    node: TreeNode;
//    onAddChild: (parentId: string, childName: string) => void;
    expandAll: boolean;
    collapseAll: boolean;
  }
  