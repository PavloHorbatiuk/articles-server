import { PartialType } from '@nestjs/swagger';
import { CreateRssparserDto } from './create-rssparser.dto';

export class UpdateRssparserDto extends PartialType(CreateRssparserDto) {}
