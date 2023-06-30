import styles from '@/styles/styles.module.css'
import Image from 'next/image'
import Logo from '@/assets/images/logo.png'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const Login = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ password: '', email: '' })
    const [snackbar, setSnackbar] = useState(false)

    const login = async () => {
        try {
            const response = await axios.post(`${process.env.URL_BASE_API}/login`, credentials);
            const { token, id } = response.data;
            Cookies.set("token", token);
            Cookies.set("id", id);
            router.push(`/`)
        } catch (error) {
            setSnackbar(true)
        }
    }

    const handleCredential = (event: any) => {
        event.preventDefault()
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    const onFocus = () => {
        setSnackbar(false)
    }

    return (
        <div className={styles.login}>
            <div className={snackbar === true ? styles.toast_visible : styles.toast_hidden}>
                Verifica tus credenciales.
            </div>
            <div className={styles.login_card}>
                <Image
                    className={styles.login_card_log}
                    src={Logo}
                    alt="Pokemon"
                />
                <div className={styles.content_input_login}>
                    <input type='email' className={styles.input_login} placeholder='Email' name='email' onChange={handleCredential} onFocus={onFocus} />
                    <input type='password' className={styles.input_login} placeholder='Contraseña' name='password' onChange={handleCredential} onFocus={onFocus} />
                </div>

                <button className={styles.buton_login} onClick={login}>Iniciar sesion</button>
            </div>
        </div>
    )
}

export default Login