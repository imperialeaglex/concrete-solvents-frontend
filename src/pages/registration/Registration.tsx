// Libraries
import { faAt, faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Enums
import { FormErrors } from '@Enums/formErrors.enum';
import { Language } from '@Enums/language.enum';

// Hooks
import { useTriggerValidateOnChangeLanguage } from '@Hooks/useTriggerValidateOnChangeLanguage/useTriggerValidateOnChangeLanguage';

// Components
import { Button } from '@Components/Button/Button';
import { SelectLanguage } from '@Components/SelectLanguage/SelectLanguage';

// Styles
import styles from './registration.module.css';

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Registration: FC<ChildrenNever> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    watch,
    setError,
    clearErrors,
  } = useForm({ mode: 'onChange' });
  const password = watch('password');
  const { t: translate } = useTranslation('registration');
  useTriggerValidateOnChangeLanguage(i18n.language, errors, trigger);

  function handleFormSubmit() {}

  function handleTogglePasswordVisible() {
    setIsPasswordVisible((value) => !value);
  }

  function handleTogglePasswordConfirmationVisible() {
    setIsPasswordConfirmationVisible((value) => !value);
  }

  /**
   * @description: Set an error if the password and password confirmation are not equal, or clear the equality
   * confirmation error if they equal
   */
  useEffect(() => {
    if (!password) return;
    if (errors.passwordConfirmation?.message === translate(FormErrors.MustFill)) return;
    if (password !== getValues('passwordConfirmation')) {
      setError('passwordConfirmation', {
        message: translate('passwordShouldBeEquals'),
      });
    } else {
      clearErrors('passwordConfirmation');
    }
  }, [password]);

  return (
    <div className={styles.container}>
      <SelectLanguage />
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <section className={styles.inputsContainer}>
          {errors.username ? (
            <span className={styles.inputError} role='alert'>{errors.username.message}</span>
          ) : null}
          <section className={styles.inputContainer}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="text"
              className={`${errors.username ? styles.invalidInput : ''} ${styles.input}`}
              placeholder={translate('username')}
              aria-label={translate('username')}
              aria-invalid={errors.username ? 'true' : 'false'}
              {...register('username', {
                required: {
                  value: true,
                  message: translate(FormErrors.MustFill),
                },
                minLength: {
                  value: 3,
                  message:
                    i18n.language === Language.Russian
                      ? 'Имя пользователя должно быть больше 3 символов'
                      : 'Username must be more that 3 characters long',
                },
                maxLength: {
                  value: 25,
                  message:
                    i18n.language === Language.Russian
                      ? 'Имя пользователя должно быть не больше 25 символов'
                      : 'Username must be less that 25 characters long',
                },
                pattern: {
                  value: /^[A-z0-9]+$/,
                  message: translate('onlyLatinAndNumbers'),
                },
              })}
            />
          </section>
          {errors.email ? (
            <span className={styles.inputError} role='alert'>{errors.email.message}</span>
          ) : null}
          <section className={styles.inputContainer}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faAt} />
            </div>
            <input
              type="email"
              className={`${errors.email ? styles.invalidInput : ''} ${styles.input}`}
              placeholder={translate('email')}
              aria-label={translate('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: {
                  value: true,
                  message: translate(FormErrors.MustFill),
                },
                pattern: {
                  value: EMAIL_PATTERN,
                  message: translate('wrongEmail'),
                },
              })}
            />
          </section>
          {errors.password ? (
            <span className={styles.inputError} role='alert'>{errors.password.message}</span>
          ) : null}
          <section className={styles.inputContainer}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              className={`${errors.password ? styles.invalidInput : ''} ${styles.input}`}
              placeholder={translate('password')}
              aria-label={translate('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: {
                  value: true,
                  message: translate(FormErrors.MustFill),
                },
                minLength: {
                  value: 3,
                  message:
                    i18n.language === Language.Russian
                      ? 'Пароль должен быть больше 3 символов'
                      : 'Password must be more that 3 characters long',
                },
                maxLength: {
                  value: 64,
                  message:
                    i18n.language === Language.Russian
                      ? 'Пароль должен быть меньше 64 символов'
                      : 'Password must be less that 64 characters long',
                },
              })}
            />
            <Button className={styles.changePasswordVisibility} onClick={handleTogglePasswordVisible}>
              {isPasswordVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </Button>
          </section>
          {errors.passwordConfirmation ? (
            <span className={styles.inputError} role='alert'>{errors.passwordConfirmation.message}</span>
          ) : null}
          <section className={styles.inputContainer}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type={isPasswordConfirmationVisible ? 'text' : 'password'}
              className={`${errors.passwordConfirmation ? styles.invalidInput : ''} ${styles.input}`}
              placeholder={translate('passwordConfirmation')}
              aria-label={translate('passwordConfirmation')}
              aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
              {...register('passwordConfirmation', {
                validate: (value) => value === getValues('password') || translate('passwordShouldBeEquals'),
                required: {
                  value: true,
                  message: translate(FormErrors.MustFill),
                },
              })}
            />
            <Button className={styles.changePasswordVisibility} onClick={handleTogglePasswordConfirmationVisible}>
              {isPasswordConfirmationVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </Button>
          </section>
          <Button className={styles.registration} type="submit">
            {translate('signUp')}
          </Button>
          <p className={styles.alreadyHaveAccount}>
            {translate('alreadyHaveAccount')} <Link to={'/login'}>{translate('signIn')}</Link>
          </p>
        </section>
      </form>
    </div>
  );
};

export { Registration };
