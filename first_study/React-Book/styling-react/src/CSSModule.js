import styles from './CSSModule.module.scss';

console.log(styles);

// className={[styles.wrapper, styles.inverted].join(' ')}

const CSSModule = () => {
    return (
        <div className={`${styles.wrapper} ${styles.inverted}`}>
            안녕하세요, 저는 <span className="something">CSS Module!</span>
        </div>
    );
};

export default CSSModule;