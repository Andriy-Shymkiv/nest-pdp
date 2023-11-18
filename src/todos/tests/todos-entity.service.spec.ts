import { Test, TestingModule } from '@nestjs/testing';
import { TodosEntityService } from '../todos-entity.service';

describe('TodoEntityService', () => {
  let service: TodosEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosEntityService],
    }).compile();

    service = module.get<TodosEntityService>(TodosEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
