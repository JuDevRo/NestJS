import { Controller, Get, Query, Param, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';

import {ParseIntPipe} from '../common/parse-int.pipe'

import {ProductService} from './../services/product.service'

import {CreateProductDto, UpdateProductDto} from '../dtos/products.dto'

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductService){

    }

    @Get()
    getProducts(
    @Query('limit') limit: number, 
    @Query('offset') offset: number, 
    @Query ('brand') brand: string
    ) {
        //return {
        //    message: `products: limit => ${limit} offset => ${offset} brand => ${brand}`};
        return this.productService.findAll()
    }

    @Get('filter')
    getProductFilter() {
        return {message: `yo soy un filter`};
    }

    @Get(':productId')
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('productId', ParseIntPipe) productId: number) {
        //return {message: `product ${productId}`};
        return this.productService.findOne(productId)
    }

    @Post()
    create(@Body() payload: CreateProductDto) {
        //return{
        //    message: 'accion de crear',
        //    payload,
        //}
        return this.productService.create(payload)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateProductDto){
        //return{
        //    id,
        //    payload,
        //}
        return this.productService.update(+id, payload)
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        //return id;
        return this.productService.remove(+id)
    }

}

