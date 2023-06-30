import styles from '@/styles/styles.module.css'
import Image from 'next/image'
import Avatar from '@/assets/images/avatar.png'
import Logo from '@/assets/images/logo.png'
import Logout from '@/assets/images/Logout.svg'
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const Sidebar = () => {
    const router = useRouter();

    const logout = (event: any) => {
        Cookies.remove('token')
        Cookies.remove('id')
        router.push(`/login`)
    }
    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_header}>
                    <Image
                        className={styles.logo}
                        src={Logo}
                        alt="Pokemon"
                    />
                    <Image
                        className={styles.avatar}
                        src={Avatar}
                        alt="Pokemon"
                    />
                    <h2>ASHK123</h2>
                    <p>Level 1</p>
                    <p>"Work hard in your test</p>
                </div>
                <button className={styles.content_logout} onClick={logout}>
                    <Image
                        className={styles.logout}
                        src={Logout}
                        alt="Pokemon"
                    />
                    <p>Log out</p>
                </button>
            </div>
        </>
    )
}

export default Sidebar