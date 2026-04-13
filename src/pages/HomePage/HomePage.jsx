import { Button } from '../../components'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Growup</h1>
      <p className={styles.subtitle}>Ton jardin en micro-espace</p>

      <div className={styles.actions}>
        <Button variant="primary" fill="contained">Commencer</Button>
        <Button variant="secondary" fill="contained">Découvrir</Button>
        <Button variant="primary" fill="outlined">En savoir plus</Button>
      </div>
    </main>
  )
}
