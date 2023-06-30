import styles from '@/styles/styles.module.css'
import Image from 'next/image'
import SearchIcon from '@/assets/images/Search.svg'
import Back from '@/assets/images/Back.svg'
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchI } from '@/interfaces';

const Search = ({ back }: SearchI) => {
    const router = useRouter();
    const [pokemonId, setPokemonId] = useState();

    const goToBack = ()=> {
        router.push(`/`)

    }

    const handleSearch = (event: any) => {
        event.preventDefault();
        setPokemonId(event.target.value)
    }

    const searchPokemon = () => {
        router.push(`/DetailPokemon/${pokemonId}`)
    }
    return (
        <div className={styles.search} >
            {back ?
                <div className={styles.content_image_back} onClick={goToBack}>
                    <Image
                        src={Back}
                        alt="Pokemon"
                    />
                </div>
                : null}
            <div className={styles.content_search}>
                <input placeholder='Search' className={styles.search_input} onChange={handleSearch} name='search'/>
                <button  onClick={searchPokemon}>
                    <Image
                        src={SearchIcon}
                        alt="Pokemon"
                    />
                </button>
            </div>
        </div>
    )
}

export default Search

Search.propTypes = {
    back: PropTypes.bool
}