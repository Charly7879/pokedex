import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) { }


  async executeSeed() {

    /** Consulta al api pokeApi */
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=30');

    /** Vaciar tabla pokemons */
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    /** Opción 2: Colección de pokemons */
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });

      /** Opción: 1 Colección de promesas pokemonModel.create */
      /* const insertPromisesArray: Promise<Pokemon>[] = [];

      insertPromisesArray.push(this.pokemonModel.create({ name, no }));

      try {
        await Promise.all(insertPromisesArray);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(`Cant create pokemon - Check server log`);
      } */

    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed!';
  }

}
