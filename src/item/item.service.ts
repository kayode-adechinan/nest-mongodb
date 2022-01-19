import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FindConditions, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PageMetaDto,
  PageOptionsDto,
  PaginatedResponseDto,
} from '../shared/dto/paginated-response.dto';
import { SearchItemArgsDto } from './dto/ search-item-args.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './entities/item.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  async findAll(
    searchItemArgsDto: SearchItemArgsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    return this.itemModel.find().exec();
  }
}
