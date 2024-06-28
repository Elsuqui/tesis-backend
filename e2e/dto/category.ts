export class Category {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    id: number;
  
    constructor(data: any) {
      this.name = data.name;
      this.createdAt = new Date(data.createdAt);
      this.updatedAt = new Date(data.updatedAt);
      this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
      this.id = data.id;
    }
  }
