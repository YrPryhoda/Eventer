import React from 'react'
import styles from './styles.module.scss'

const Spinner = () => <div className={styles.spinnerWrapper}>
  <div className={styles.lds_facebook}>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
export default Spinner
