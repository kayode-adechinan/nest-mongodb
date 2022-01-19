import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../shared/dto/paginated-response.dto';
import { SearchItemArgsDto } from './dto/ search-item-args.dto';
import { ApiPaginatedResponse } from '../shared/decorators/api-paginated-response.decorator';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Item } from './entities/item.schema';
import MongooseClassSerializerInterceptor from './mongooseClassSerializer.interceptor';

@ApiTags('Items')
@Controller('items')
@UseInterceptors(MongooseClassSerializerInterceptor(Item))
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The ONE item just created',
    type: Item,
  })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() searchItemArgsDto: SearchItemArgsDto,
  ) {
    return this.itemService.findAll(searchItemArgsDto, pageOptionsDto);
  }
}
