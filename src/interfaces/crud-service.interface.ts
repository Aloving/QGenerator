interface ExpectedFields {
  id: string | number;
}

export interface ICrudService<Entity extends ExpectedFields, CreateDto> {
  create(payload: CreateDto): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  update(id: Entity['id'], payload: Partial<CreateDto>): Promise<Entity>;
  remove(id: Entity['id']): Promise<boolean>;
  findOne(id: Entity['id']): Promise<Entity>;
}
