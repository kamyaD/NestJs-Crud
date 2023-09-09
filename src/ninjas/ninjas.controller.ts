import { Body, Controller, Get, Param, Post, Query, Put, Delete, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { updateNinjaDto } from './dto/update-ninja.dto';
import {NinjasService} from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService){}
    // GET /ninjas?weapon --> []
    @Get()
    getNinjas(@Query('id') id: number) {
        return this.ninjaService.getNinjas(id);
    }
    // GET /ninjas/:id --> { ... }
    @Get(':id')
    getOneNinja(@Param('id')  id:string) {
        try{
            return this.ninjaService.getNinja(+id);
        } catch (err){
            throw new NotFoundException();
        }
    }
    // POST /ninjas 
    @Post()
    createNinja(@Body() createNinjaDto:CreateNinjaDto){
        return this.ninjaService.createNinja(createNinjaDto);
    }
    // PUT /ninjas/:id --> { ... }
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjarDto:updateNinjaDto){
        console.log("here===>")
        return this.ninjaService.updateNinja(+id,updateNinjarDto);
    }
    // DELETE /ninjas:id
    @Delete(':id')
    removeNinja(@Param('id') id:string){
        return this.ninjaService.removeNinja(+id);

    }




}

