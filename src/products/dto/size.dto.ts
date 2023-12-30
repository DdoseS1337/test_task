import { IsString } from 'class-validator';

export class SizeDTO {
    @IsString()
    sizeValue: string;
}
