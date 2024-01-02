import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
    @IsString()
    @IsNotEmpty()
    cvc: string; // The card's CVC.

    @IsNumber()
    expireMonth: number; // Two-digit number representing the card's expiration month.

    @IsNumber()
    expireYear: number; // Four-digit number representing the card's expiration year.

    @IsCreditCard()
    number: string; // The card number, as string without any separators.
}
