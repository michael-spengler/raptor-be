export interface Trail {
  _id: { $oid: string };
  title: string;
  description: string;
  length: number;
}