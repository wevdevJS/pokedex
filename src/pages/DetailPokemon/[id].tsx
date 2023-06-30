import styles from '@/styles/styles.module.css'
import Sidebar from '@/components/Sidebar'
import Search from '@/components/Search'
import Header from '@/components/Header'
import DetailPokemonComponent from '@/components/DetailPokemonComponent'
import { useRouter } from 'next/router';
import axios from 'axios'
import { DetailPokemonI } from '@/interfaces'

const DetailPokemon = ({pokemon}: DetailPokemonI) => {
    const router = useRouter();
    return (
        <>
            {router.isReady ?
                <div className={styles.home}>
                    <Header />
                    <div className={styles.hone_}>
                        <Sidebar />
                        <div className={styles.main}>
                            <main className={styles.content}>
                                <Search back/>
                                <DetailPokemonComponent pokemon={pokemon} />
                            </main>
                        </div>
                    </div>
                </div>
                : null}
        </>

    )
}

export default DetailPokemon

export async function getServerSideProps({query}: any){
    try {
        const id = query.id
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return {
            props: {
                pokemon: response.data
            }
        }
    } catch (error: any) {
        return {
            props: {
                pokemon: null
            }
        }
    }
}