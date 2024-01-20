import React, {ChangeEvent, InputHTMLAttributes} from 'react'
import styles from './Input.module.scss'
import clsx from 'clsx'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value?: string
    onChange?: (value: string) => void
    textAlign?: 'left' | 'center' | 'right'
}

const Input = (props: InputProps) => {
  const {
    value,
    onChange,
    type = 'text',
    textAlign,
    ...otherProps} = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <input
      className={clsx(styles.input, {
        [styles.center]: textAlign === 'center',
        [styles.right]: textAlign === 'right',
      })}
      value={value}
      onChange={onChangeHandler}
      type={type}
      {...otherProps}
    />
  )
}

export default Input