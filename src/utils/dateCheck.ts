import { BadRequestException } from '@nestjs/common';
import { parse, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';


export const checkValideDate = (startDate:string,endDate:string) => {
    const parsedStartDate = parse(startDate, 'd MMMM yyyy', new Date(), { locale: fr });
    const parsedEndDate = parse(endDate, 'd MMMM yyyy', new Date(), { locale: fr });
    console.log('parsed')
    console.log(parsedEndDate,parsedStartDate)
    if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
      throw new BadRequestException('Invalid date format');
    }


    if (parsedStartDate >= parsedEndDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    if (parsedStartDate < new Date()) {
      throw new BadRequestException('Start date must be in the future');
    }
    
}