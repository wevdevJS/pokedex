import styles from '@/styles/styles.module.css'
import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

import Like from '@/assets/images/like.png'
import PageNotFund from './PageNotFund';
import { DetailPokemonI } from '@/interfaces';

const DetailPokemonComponent = ({ pokemon }: DetailPokemonI) => {
    const [snackbar, setSnackbar] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('ss')
    const router = useRouter();

    useEffect(() => {
        if (snackbar) {
          const timeout = setTimeout(() => setSnackbar(false), 3000);
          return () => {
            clearTimeout(timeout);
          };
        }
      }, [snackbar]);

    const handleLike = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
            const body = { user_id: Cookies.get('id'), pokemon_id: pokemon?.id.toString() }
            await axios.post(`${process.env.URL_BASE_API}/users/pokemon-likes`, body, {headers});
            setMessageSnackbar('I love this pokemon too')
            setSnackbar(true)
        } catch (error: any) {
            const statusCode = error.response?.data?.error.statusCode;
            const message = error.response?.data?.error.message;
            if(statusCode === 401){
                Cookies.remove('id')
                Cookies.remove('token')
                router.push('/login')
            }
            setMessageSnackbar(message)
            setSnackbar(true)
        }
    }

    return (
        <>
            {pokemon ?
                <div className={styles.detail_pokemon}>
                    <div className={snackbar === true ? styles.toast_visible : styles.toast_hidden}>
                        {messageSnackbar}
                    </div>
                    <div className={styles.detail_pokemon_image}>
                        <div>
                            <Image
                                width={200}
                                height={200}
                                className={styles.card_image}
                                src={pokemon?.sprites?.other?.dream_world?.front_default}
                                alt="Pokemon"
                            />
                        </div>
                        <div className={styles.detail_pokemon_image_default}>
                            <Image
                                width={200}
                                height={200}
                                className={styles.card_image_default}
                                src={pokemon?.sprites?.front_default}
                                alt="Pokemon"
                            />
                            <Image
                                width={200}
                                height={200}
                                className={styles.card_image_default}
                                src={pokemon?.sprites?.back_default}
                                alt="Pokemon"
                            />
                        </div>
                    </div>
                    <div className={styles.detail_pokemon_description}>
                        <Image
                            onClick={handleLike}
                            width={200}
                            height={200}
                            className={styles.image_like}
                            src={Like}
                            alt="Pokemon"
                        />
                        <h1>{pokemon?.name}</h1>
                        <div className={styles.card_types}>
                            {pokemon?.types.map((value: any) => (
                                <p key={value.type.name} className={styles.card_pokemon_type}>{value.type.name}</p>
                            ))
                            }
                        </div>
                        <h2>Pokedex number</h2>
                        <p className={styles.detail_pokemon_description_text}>{pokemon?.id}</p>
                        <hr className={styles.hr} />
                        <h2>Height</h2>
                        <p className={styles.detail_pokemon_description_text}>{pokemon?.height}</p>
                        <hr className={styles.hr} />
                        <h2>Weight</h2>
                        <p className={styles.detail_pokemon_description_text}>{pokemon?.weight}</p>
                        <hr className={styles.hr} />
                        <h2>Shiny</h2>
                        <div className={styles.detail_pokemon_image_default}>
                            <Image
                                width={200}
                                height={200}
                                className={styles.card_image_default}
                                src={pokemon?.sprites?.front_shiny}
                                alt="Pokemon"
                            />
                            <Image
                                width={200}
                                height={200}
                                className={styles.card_image_default}
                                src={pokemon?.sprites?.back_shiny}
                                alt="Pokemon"
                            />
                        </div>
                    </div>
                </div>
                :
                <PageNotFund />
            }
        </>
    )
}

export default DetailPokemonComponent

