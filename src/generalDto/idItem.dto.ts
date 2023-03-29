import { IsNotEmpty, IsString } from 'class-validator';

export class IdItemDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
