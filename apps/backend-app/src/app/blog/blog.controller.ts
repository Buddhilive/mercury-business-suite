import { Controller, Get } from '@nestjs/common';

@Controller('blog')
export class BlogController {
    @Get()
    getData() {
        return { message: 'Blog Works'};
    }
}
