import { useState } from 'react'
import Card from './Card'
import styles from '@/styles/styles.module.css'
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { GridI } from '@/interfaces';

const Grid = ({ pokemons }: GridI) => {
    const router = useRouter();

    const [offset, setOffset] = useState(0)
    const nextPagination = () => {
        const newOffset = offset + 20;
        setOffset(newOffset)
        router.push(`/?limit=20&offset=${newOffset}`)
    }

    const previousPagination = () => {
        if(offset === 0){
            const newOffset =0;
            setOffset(newOffset)
            router.push(`/?limit=20&offset=${newOffset}`)
        }else{
            const newOffset =  offset - 20;
            setOffset(newOffset)
            router.push(`/?limit=20&offset=${newOffset}`)
        }
    }
    return (
        <>
            <div className={styles.grid}>
                {pokemons.length > 0 ?
                    pokemons.map((value: any) => (
                        <Card name={value.name} url={value.url} key={value.name}/>
                    ))
                    :
                    <p>Loading</p>
                }

            </div>
            <div className={styles.pagination_section}>
                <a onClick={previousPagination}>Previous</a>
                <p>{offset} - {offset + 20}</p>
                <a onClick={nextPagination}>Next</a>
            </div>
        </>
    )
}
export default Grid

Grid.propTypes = {
    pokemons: PropTypes.array,
}

Grid.defaultProps = {
    pokemons: [],
};
