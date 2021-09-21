export const trimFileName = (fileName: string): string => fileName.split('/').pop()!.split('.')[0];
