import styles from '@/styles/styles.module.css'
import Logo from '@/assets/images/logo.png'
import Menu from '@/assets/images/Menu.svg'
import Image from 'next/image'

const Header = () => {
    return (
        <div className={styles.header}>
            <Image
                    className={styles.header_image_menu}
                    src={Menu}
                    alt="Pokemon"
                />
            <div className={styles.header_container}>
                <Image
                    className={styles.header_image_logo}
                    src={Logo}
                    alt="Pokemon"
                />
            </div>
        </div>
    )
}

export default Header