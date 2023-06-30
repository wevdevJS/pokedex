import styles from '@/styles/styles.module.css'
import Sidebar from '@/components/Sidebar'
import Search from '@/components/Search'
import Grid from '@/components/Grid'
import Header from '@/components/Header'
import axios from 'axios'
import { HomeI } from '@/interfaces'

const Home = ({pokemons}: HomeI) => {
    return (
        <div className={styles.home}>
            <Header />
            <div className={styles.hone_}>
                <Sidebar />
                <div className={styles.main}>
                    <main className={styles.content}>
                        <Search back={false}/>
                        <Grid pokemons={pokemons}/>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Home

export async function getServerSideProps({query}: any){
    const limit = query.limit;
    const offset = query.offset;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    const { results } = response.data;
    return {
        props: {
            pokemons: results
        }
    }
}