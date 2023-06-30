import styles from '@/styles/styles.module.css'
import Image from 'next/image'
import Pikachu from '@/assets/images/pikachuTriste.png'

const PageNotFund = () => {
    return (
        <div className={styles.page_not_found}>
            <div className={styles.page_not_found_card}>
                <h2>This pokemon does not exist</h2>
                <Image
                    width={200}
                    height={200}
                    className={styles.card_image_default}
                    src={Pikachu}
                    alt="Pokemon"
                />
            </div>
        </div>
    )
}

export default PageNotFund