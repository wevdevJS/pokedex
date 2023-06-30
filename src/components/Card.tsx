import styles from '@/styles/styles.module.css'
import Image from 'next/image'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CardI } from '@/interfaces';

const Card = ({ name, url }: CardI) => {

    const [pokemon, setPokemon] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const getPokemons = async () => {
            const response = await axios.get(url)
            setPokemon(response.data)

        }
        getPokemons()
    }, [url])

    const toDetailPokemon = (id: string) => {
        router.push(`/DetailPokemon/${id}`)
    }

    return (
        <>
            {
                pokemon ?
                    <div className={styles.card} onClick={() => toDetailPokemon(pokemon?.id)}>
                        <h2>{name}</h2>
                        <p>{pokemon?.id}</p>
                        <Image
                            width={200}
                            height={200}
                            className={styles.card_image}
                            src={pokemon?.sprites?.other?.dream_world?.front_default}
                            alt="Pokemon"
                        />
                        <div className={styles.card_types}>
                            {pokemon?.types.map((value: any) => (
                                <p key={value.type.name} className={styles.card_pokemon_type}>{value.type.name}</p>
                            ))
                            }
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

export default Card

Card.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}