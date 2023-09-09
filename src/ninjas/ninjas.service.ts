import { Injectable } from '@nestjs/common';
import { CreateNinjaDto} from './dto/create-ninja.dto';
import { updateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
    private ninjas = [
        {'id': 0, name:'ninjaA', weapon: 'stars' },
        {'id': 1, name:'ninjaB', weapon: 'nunchuks'}
    ]

    getNinjas(id:number) {
        if (id){
            return this.ninjas.filter((ninja)=>ninja.id === id);
        }

        return this.ninjas;
    }

    getNinja(id:number){
        const ninja = this.ninjas.find((ninja)=> ninja.id === id);

        if(!ninja){
            throw new Error('ninja not found');
        }

        return ninja;
    }

    createNinja(createNinjaDto: CreateNinjaDto){
        const newNinja = {
            ...createNinjaDto,
            id: Date.now()
        }
        this.ninjas.push(newNinja)
        
        return newNinja
    }

    updateNinja(id:number, updateNinjaDto:updateNinjaDto){
        this.ninjas = this.ninjas.map((ninja)=>{
            if (ninja.id === id){
                return {...ninja, ...updateNinjaDto};
            }
            
            return ninja;
        });

        return this.getNinja(id);

    }

    removeNinja(id: number){
        const toBeRemoved = this.getNinjas(id);
        this.ninjas = this.ninjas.filter((ninja)=>ninja.id !== id);

        return toBeRemoved;
    }
}
