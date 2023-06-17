import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusLoggerService } from './terminus-logger.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        TerminusModule.forRoot({
          logger: TerminusLoggerService,
          errorLogStyle: 'pretty',
        }),
      ],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
