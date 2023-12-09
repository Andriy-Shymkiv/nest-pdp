import { Test, TestingModule } from '@nestjs/testing';
import { TodoEntityService } from '../todo-entity.service';

describe('TodoEntityService', () => {
  let service: TodoEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoEntityService],
    }).compile();

    service = module.get<TodoEntityService>(TodoEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
