import { IsNumberString, IsOptional, IsString } from 'class-validator';


export class QueryValidator {
    @IsNumberString()
    @IsOptional()
    size?: string;

    @IsString()
    @IsOptional()
    model?: string;
}