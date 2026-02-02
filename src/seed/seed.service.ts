import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) { }

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {

    /** Consulta al api pokeApi */
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      //console.log({ name, no });

      try {
        await this.pokemonModel.create({
          name,
          no,
        });
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(`Cant create pokemon - Check server log`);
      }

    });

    return 'Seed executed!';
  }

}
