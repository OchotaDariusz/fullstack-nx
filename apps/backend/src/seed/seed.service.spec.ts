import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        UsersService,
        {
          provide: Repository<UserEntity>,
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
