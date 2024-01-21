import {ButtonHTMLAttributes} from 'react'
import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
  const {children,
    ...otherProps} = props

  return (
    <button
      {...otherProps}
      className={styles.button}
    >
      {children}
    </button>
  )
}

export default Button