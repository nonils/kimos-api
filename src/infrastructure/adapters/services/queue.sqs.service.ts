import { IQueueService } from '../../../domain/ports';
import { ProjectM } from '../../../domain/models';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../../config/env.enum';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class QueueSqsService implements IQueueService {
  private readonly queueUrl: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly sqsRegion: string;
  private readonly sqs: SQSClient;
  constructor(private configService: ConfigService) {
    this.queueUrl = this.configService.get(Configuration.AWS_SQS_QUEUE_URL);
    this.accessKeyId = this.configService.get(Configuration.AWS_ACCESS_KEY_ID);
    this.sqsRegion = this.configService.get(Configuration.AWS_SQS_REGION);
    this.secretAccessKey = this.configService.get(
      Configuration.AWS_SECRET_ACCESS_KEY,
    );
    this.sqs = new SQSClient({
      region: this.sqsRegion,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  sendProjectCreatedEvent(project: ProjectM): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      //CHANGE for job id
      MessageBody: JSON.stringify(project),
    });
    return this.sqs.send(command).then(() => undefined);
  }
}
