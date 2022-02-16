export interface Values {
  book: string;
  member: string;
  issueDate: Date;
  dueDate: Date;
  status: string;
}

export interface AuditLogsModel {
  _id: string;
  entityName: string;
  entityId: string;
  action: string;
  values: Values;
  timestamp: Date;
  createdById: string;
  createdByEmail: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}
