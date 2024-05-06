export function convertTypeToString(type: number) {
  switch (type) {
    case 3:
      return 'Complete';
    case 2:
      return 'Under review';
    case 1:
      return 'In Progress';
    default:
      return 'To Do';
  }
}
