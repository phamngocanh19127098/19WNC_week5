import { Test, TestingModule } from '@nestjs/testing';
import { ActorsGateway } from './actors.gateway';
import { ActorsService } from './actors.service';

describe('ActorsGateway', () => {
  let gateway: ActorsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActorsGateway, ActorsService],
    }).compile();

    gateway = module.get<ActorsGateway>(ActorsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
