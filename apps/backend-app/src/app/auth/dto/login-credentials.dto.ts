import { PartialType } from '@nestjs/mapped-types';
import { CredentialsDto } from './credentials.dto';

export class LoginCredentialsDto extends PartialType(CredentialsDto) {}