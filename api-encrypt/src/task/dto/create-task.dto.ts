import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  description: string;
}
